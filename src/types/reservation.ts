// 예약 상태 타입
export type ReservationStatus = 
	| 'pending'      // 예약 대기
	| 'confirmed'    // 예약 확정
	| 'cancelled'    // 예약 취소
	| 'completed'    // 이용 완료
	| 'no_show';     // 노쇼

// 결제 상태 타입
export type PaymentStatus = 
	| 'pending'      // 결제 대기
	| 'paid'         // 결제 완료
	| 'refunded'     // 환불 완료
	| 'failed';      // 결제 실패

// 예약 정보 타입
export interface Reservation {
	id: number;
	orderNumber: string;          // 주문번호 (예: WMD20240125001)
	userId?: number;              // 회원 ID (비회원은 null)
	
	// 고객 정보
	customerName: string;
	customerPhone: string;
	customerEmail?: string;
	
	// 상품 정보
	productId: number;
	productName: string;
	productImage?: string;
	
	// 예약 상세
	reservationDate: string;      // 이용일자 (YYYY-MM-DD)
	reservationTime: string;      // 이용시간 (HH:mm)
	adultCount: number;           // 대인 수
	childCount: number;           // 소인 수
	infantCount: number;          // 유아 수
	
	// 가격 정보
	adultPrice: number;           // 대인 단가
	childPrice: number;           // 소인 단가
	totalAmount: number;          // 총 결제금액
	
	// 상태
	status: ReservationStatus;
	paymentStatus: PaymentStatus;
	
	// 메모/요청사항
	memo?: string;
	
	// 날짜 정보
	createdAt: string;            // 예약 생성일
	updatedAt: string;            // 수정일
	cancelledAt?: string;         // 취소일
	cancelReason?: string;        // 취소 사유
}

// 예약 조회 요청 타입
export interface ReservationSearchRequest {
	orderNumber: string;
	customerName?: string;
	customerPhone?: string;
}

// 예약 목록 응답 타입
export interface ReservationListResponse {
	reservations: Reservation[];
	total: number;
	page: number;
	limit: number;
	totalPages: number;
}

// 예약 필터 타입
export interface ReservationFilter {
	page?: number;
	limit?: number;
	status?: ReservationStatus;
	paymentStatus?: PaymentStatus;
	dateFrom?: string;
	dateTo?: string;
	productId?: number;
}


