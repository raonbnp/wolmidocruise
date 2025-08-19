// 토스페이먼츠 결제 모듈

export interface PaymentRequest {
  orderId: string;
  orderName: string;
  amount: number;
  customerName: string;
  customerEmail?: string;
  customerMobilePhone?: string;
  successUrl: string;
  failUrl: string;
}

export interface PaymentResponse {
  success: boolean;
  paymentKey?: string;
  orderId?: string;
  amount?: number;
  error?: string;
}

// 결제 요청
export const requestPayment = async (paymentData: PaymentRequest): Promise<PaymentResponse> => {
  try {
    // 토스페이먼츠 SDK 사용
    const tossPayments = (window as typeof window & { TossPayments: (key: string) => any }).TossPayments(process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY);

    await tossPayments.requestPayment('카드', {
      amount: paymentData.amount,
      orderId: paymentData.orderId,
      orderName: paymentData.orderName,
      customerName: paymentData.customerName,
      customerEmail: paymentData.customerEmail,
      customerMobilePhone: paymentData.customerMobilePhone,
      successUrl: paymentData.successUrl,
      failUrl: paymentData.failUrl,
    });

    return { success: true };
  } catch (error: unknown) {
    console.error('결제 요청 실패:', error);
    return { 
      success: false, 
      error: (error as Error).message || '결제 요청에 실패했습니다.' 
    };
  }
};

// 결제 승인 (서버에서 호출)
export const confirmPayment = async (
  paymentKey: string, 
  orderId: string, 
  amount: number
): Promise<PaymentResponse> => {
  try {
    const response = await fetch('/api/payment/confirm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        paymentKey,
        orderId,
        amount,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.error || '결제 승인에 실패했습니다.'
      };
    }

    return {
      success: true,
      paymentKey: result.paymentKey,
      orderId: result.orderId,
      amount: result.totalAmount,
    };
  } catch (error: unknown) {
    console.error('결제 승인 실패:', error);
    return {
      success: false,
      error: (error as Error).message || '결제 승인에 실패했습니다.'
    };
  }
};

// 결제 취소
export const cancelPayment = async (
  paymentKey: string,
  cancelReason: string,
  cancelAmount?: number
): Promise<PaymentResponse> => {
  try {
    const response = await fetch('/api/payment/cancel', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        paymentKey,
        cancelReason,
        cancelAmount,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.error || '결제 취소에 실패했습니다.'
      };
    }

    return {
      success: true,
      paymentKey: result.paymentKey,
      orderId: result.orderId,
      amount: result.cancelAmount,
    };
  } catch (error: unknown) {
    console.error('결제 취소 실패:', error);
    return {
      success: false,
      error: (error as Error).message || '결제 취소에 실패했습니다.'
    };
  }
};

// 결제 내역 조회
export const getPayment = async (paymentKey: string) => {
  try {
    const response = await fetch(`/api/payment/${paymentKey}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.error || '결제 내역 조회에 실패했습니다.'
      };
    }

    return {
      success: true,
      data: result,
    };
  } catch (error: unknown) {
    console.error('결제 내역 조회 실패:', error);
    return {
      success: false,
      error: (error as Error).message || '결제 내역 조회에 실패했습니다.'
    };
  }
};
