import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const { paymentKey, cancelReason, cancelAmount } = await request.json();

    if (!paymentKey || !cancelReason) {
      return NextResponse.json(
        { error: '필수 파라미터가 누락되었습니다.' },
        { status: 400 }
      );
    }

    // 토스페이먼츠 결제 취소 API 호출
    const tossResponse = await fetch(`https://api.tosspayments.com/v1/payments/${paymentKey}/cancel`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(process.env.TOSS_SECRET_KEY + ':').toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cancelReason,
        ...(cancelAmount && { cancelAmount })
      }),
    });

    const tossResult = await tossResponse.json();

    if (!tossResponse.ok) {
      console.error('토스페이먼츠 결제 취소 실패:', tossResult);
      return NextResponse.json(
        { error: tossResult.message || '결제 취소에 실패했습니다.' },
        { status: 400 }
      );
    }

    // 데이터베이스에서 예약 정보 조회 및 업데이트
    const supabase = createClient();
    const { data: reservation, error: reservationError } = await supabase
      .from('reservations')
      .select('*')
      .eq('order_number', tossResult.orderId)
      .single();

    if (reservationError || !reservation) {
      console.error('예약 정보 조회 실패:', reservationError);
      // 결제 취소는 성공했지만 예약 정보를 찾을 수 없음
      return NextResponse.json({
        success: true,
        paymentKey: tossResult.paymentKey,
        orderId: tossResult.orderId,
        cancelAmount: tossResult.cancelAmount,
        canceledAt: tossResult.canceledAt,
        warning: '예약 정보를 찾을 수 없어 수동 처리가 필요합니다.'
      });
    }

    // 예약 상태 업데이트
    const { error: updateError } = await supabase
      .from('reservations')
      .update({
        status: 'cancelled',
        payment_status: 'refunded',
        cancelled_at: new Date().toISOString(),
        cancel_reason: cancelReason,
        updated_at: new Date().toISOString()
      })
      .eq('id', reservation.id);

    if (updateError) {
      console.error('예약 상태 업데이트 실패:', updateError);
      // 결제 취소는 성공했지만 DB 업데이트 실패
      return NextResponse.json({
        success: true,
        paymentKey: tossResult.paymentKey,
        orderId: tossResult.orderId,
        cancelAmount: tossResult.cancelAmount,
        canceledAt: tossResult.canceledAt,
        warning: '결제 취소는 완료되었으나 예약 상태 업데이트에 실패했습니다.'
      });
    }

    // 성공 응답
    return NextResponse.json({
      success: true,
      paymentKey: tossResult.paymentKey,
      orderId: tossResult.orderId,
      cancelAmount: tossResult.cancelAmount,
      canceledAt: tossResult.canceledAt,
      receipt: tossResult.receipt,
    });

  } catch (error) {
    console.error('결제 취소 처리 중 오류:', error);
    return NextResponse.json(
      { error: '서버 내부 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
