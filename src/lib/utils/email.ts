// 이메일 발송 유틸리티

interface EmailData {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

interface ReservationEmailData {
  customerName: string;
  customerEmail: string;
  orderNumber: string;
  productName: string;
  reservationDate: string;
  reservationTime: string;
  adultCount: number;
  childCount: number;
  infantCount: number;
  totalAmount: number;
  status: 'confirmed' | 'cancelled';
}

// 예약 확인 이메일 템플릿
const getReservationConfirmTemplate = (data: ReservationEmailData) => {
  const formatPrice = (price: number) => price.toLocaleString('ko-KR');
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'short'
    });
  };

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>예약 확인</title>
      <style>
        body { font-family: 'Malgun Gothic', sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #005BAC; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; border: 1px solid #ddd; }
        .info-row { display: flex; justify-content: space-between; margin: 10px 0; padding: 10px 0; border-bottom: 1px solid #eee; }
        .info-label { font-weight: bold; color: #005BAC; }
        .total { background: #f8f9fa; padding: 15px; margin: 20px 0; border-radius: 5px; }
        .footer { text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>월미도 해양관광</h1>
          <p>예약이 확정되었습니다</p>
        </div>
        
        <div class="content">
          <h2>예약 확인서</h2>
          
          <div class="info-row">
            <span class="info-label">주문번호</span>
            <span>${data.orderNumber}</span>
          </div>
          
          <div class="info-row">
            <span class="info-label">예약자명</span>
            <span>${data.customerName}</span>
          </div>
          
          <div class="info-row">
            <span class="info-label">상품명</span>
            <span>${data.productName}</span>
          </div>
          
          <div class="info-row">
            <span class="info-label">이용일시</span>
            <span>${formatDate(data.reservationDate)} ${data.reservationTime}</span>
          </div>
          
          <div class="info-row">
            <span class="info-label">인원</span>
            <span>
              성인 ${data.adultCount}명
              ${data.childCount > 0 ? `, 소인 ${data.childCount}명` : ''}
              ${data.infantCount > 0 ? `, 유아 ${data.infantCount}명` : ''}
            </span>
          </div>
          
          <div class="total">
            <div class="info-row" style="border: none; font-size: 18px; font-weight: bold;">
              <span>총 결제금액</span>
              <span style="color: #005BAC;">${formatPrice(data.totalAmount)}원</span>
            </div>
          </div>
          
          <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #856404;">이용 안내</h3>
            <ul style="margin: 0; padding-left: 20px;">
              <li>이용일 30분 전까지 월미도 선착장에 도착해 주세요.</li>
              <li>기상 상황에 따라 운항이 취소될 수 있습니다.</li>
              <li>예약 변경은 이용일 1일 전까지 가능합니다.</li>
              <li>유아는 만 3세 미만으로 무료입니다.</li>
            </ul>
          </div>
        </div>
        
        <div class="footer">
          <p><strong>월미도 해양관광</strong></p>
          <p>인천광역시 중구 월미문화로 81</p>
          <p>전화: 032-123-4567 | 이메일: info@wolmido-cruise.com</p>
          <p>사업자등록번호: 123-45-67890</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// 예약 취소 이메일 템플릿
const getReservationCancelTemplate = (data: ReservationEmailData) => {
  const formatPrice = (price: number) => price.toLocaleString('ko-KR');
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'short'
    });
  };

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>예약 취소</title>
      <style>
        body { font-family: 'Malgun Gothic', sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #dc3545; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; border: 1px solid #ddd; }
        .info-row { display: flex; justify-content: space-between; margin: 10px 0; padding: 10px 0; border-bottom: 1px solid #eee; }
        .info-label { font-weight: bold; color: #dc3545; }
        .footer { text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>월미도 해양관광</h1>
          <p>예약이 취소되었습니다</p>
        </div>
        
        <div class="content">
          <h2>예약 취소 확인서</h2>
          
          <div class="info-row">
            <span class="info-label">주문번호</span>
            <span>${data.orderNumber}</span>
          </div>
          
          <div class="info-row">
            <span class="info-label">예약자명</span>
            <span>${data.customerName}</span>
          </div>
          
          <div class="info-row">
            <span class="info-label">상품명</span>
            <span>${data.productName}</span>
          </div>
          
          <div class="info-row">
            <span class="info-label">이용일시</span>
            <span>${formatDate(data.reservationDate)} ${data.reservationTime}</span>
          </div>
          
          <div class="info-row">
            <span class="info-label">취소 금액</span>
            <span style="color: #dc3545; font-weight: bold;">${formatPrice(data.totalAmount)}원</span>
          </div>
          
          <div style="background: #f8d7da; border: 1px solid #f5c6cb; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #721c24;">환불 안내</h3>
            <ul style="margin: 0; padding-left: 20px;">
              <li>환불은 영업일 기준 3-5일 소요됩니다.</li>
              <li>카드 결제의 경우 카드사 정책에 따라 환불 기간이 달라질 수 있습니다.</li>
              <li>환불 관련 문의사항은 고객센터로 연락주세요.</li>
            </ul>
          </div>
        </div>
        
        <div class="footer">
          <p><strong>월미도 해양관광</strong></p>
          <p>인천광역시 중구 월미문화로 81</p>
          <p>전화: 032-123-4567 | 이메일: info@wolmido-cruise.com</p>
          <p>사업자등록번호: 123-45-67890</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// 이메일 발송 함수 (실제 운영시에는 SendGrid, AWS SES 등 사용)
export const sendEmail = async (emailData: EmailData): Promise<boolean> => {
  try {
    // 개발 환경에서는 콘솔에 로그만 출력
    if (process.env.NODE_ENV === 'development') {
      console.log('📧 이메일 발송 (개발 모드):', {
        to: emailData.to,
        subject: emailData.subject,
        htmlLength: emailData.html.length
      });
      return true;
    }

    // 실제 이메일 발송 로직
    // 예: SendGrid, AWS SES, Nodemailer 등 사용
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    });

    return response.ok;
  } catch (error) {
    console.error('이메일 발송 실패:', error);
    return false;
  }
};

// 예약 확인 이메일 발송
export const sendReservationConfirmEmail = async (data: ReservationEmailData): Promise<boolean> => {
  const emailData: EmailData = {
    to: data.customerEmail,
    subject: `[월미도 해양관광] 예약 확정 - ${data.orderNumber}`,
    html: getReservationConfirmTemplate(data),
    text: `예약이 확정되었습니다. 주문번호: ${data.orderNumber}`
  };

  return await sendEmail(emailData);
};

// 예약 취소 이메일 발송
export const sendReservationCancelEmail = async (data: ReservationEmailData): Promise<boolean> => {
  const emailData: EmailData = {
    to: data.customerEmail,
    subject: `[월미도 해양관광] 예약 취소 - ${data.orderNumber}`,
    html: getReservationCancelTemplate(data),
    text: `예약이 취소되었습니다. 주문번호: ${data.orderNumber}`
  };

  return await sendEmail(emailData);
};
