import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { updatePaymentStatus } from '@/lib/api/reservation';

export async function POST(request: NextRequest) {
  try {
    const { paymentKey, orderId, amount } = await request.json();

    if (!paymentKey || !orderId || !amount) {
      return NextResponse.json(
        { error: '필수 파라미터가 누락되었습니다.' },
        { status: 400 }
      );
    }

    // 토스페이먼츠 결제 승인 API 호출
    const tossResponse = await fetch('https://api.tosspayments.com/v1/payments/confirm', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(process.env.TOSS_SECRET_KEY + ':').toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        paymentKey,
        orderId,
        amount,
      }),
    });

    const tossResult = await tossResponse.json();

    if (!tossResponse.ok) {
      console.error('토스페이먼츠 결제 승인 실패:', tossResult);
      return NextResponse.json(
        { error: tossResult.message || '결제 승인에 실패했습니다.' },
        { status: 400 }
      );
    }

    // 데이터베이스에서 예약 정보 조회
    const supabase = createClient();
    const { data: reservation, error: reservationError } = await supabase
      .from('reservations')
      .select('*')
      .eq('order_number', orderId)
      .single();

    if (reservationError || !reservation) {
      console.error('예약 정보 조회 실패:', reservationError);
      return NextResponse.json(
        { error: '예약 정보를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // 금액 검증
    if (reservation.total_amount !== amount) {
      console.error('결제 금액 불일치:', {
        expected: reservation.total_amount,
        actual: amount
      });
      return NextResponse.json(
        { error: '결제 금액이 일치하지 않습니다.' },
        { status: 400 }
      );
    }

    // 예약 상태 및 결제 상태 업데이트
    const { error: updateError } = await supabase
      .from('reservations')
      .update({
        status: 'confirmed',
        payment_status: 'completed',
        updated_at: new Date().toISOString()
      })
      .eq('id', reservation.id);

    if (updateError) {
      console.error('예약 상태 업데이트 실패:', updateError);
      // 결제는 성공했지만 DB 업데이트 실패 - 수동 처리 필요
      return NextResponse.json(
        { 
          error: '결제는 완료되었으나 예약 상태 업데이트에 실패했습니다. 고객센터로 문의해주세요.',
          paymentKey: tossResult.paymentKey,
          orderId: tossResult.orderId
        },
        { status: 500 }
      );
    }

    // 성공 응답
    return NextResponse.json({
      success: true,
      paymentKey: tossResult.paymentKey,
      orderId: tossResult.orderId,
      totalAmount: tossResult.totalAmount,
      method: tossResult.method,
      approvedAt: tossResult.approvedAt,
      receipt: tossResult.receipt,
    });

  } catch (error) {
    console.error('결제 승인 처리 중 오류:', error);
    return NextResponse.json(
      { error: '서버 내부 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
