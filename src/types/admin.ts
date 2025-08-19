// 관리자 권한 타입
export type AdminRole = 
	| 'super_admin'    // 최고 관리자 (모든 권한)
	| 'admin'          // 일반 관리자 (대부분 권한)
	| 'operator'       // 운영자 (제한적 권한)
	| 'viewer';        // 조회자 (읽기 전용)

// 관리자 권한별 접근 가능 메뉴
export interface AdminPermissions {
	dashboard: boolean;       // 대시보드
	cruise: boolean;          // 크루즈 상품 관리
	reservation: boolean;     // 예약 관리
	user: boolean;            // 회원 관리
	notice: boolean;          // 공지사항 관리
	faq: boolean;             // FAQ 관리
	qna: boolean;             // Q&A 관리
	eventSns: boolean;        // 이벤트SNS 관리
	cruiseReview: boolean;    // 크루즈 리뷰 관리
	statistics: boolean;      // 통계 조회
	popup: boolean;           // 팝업 관리
	system: boolean;          // 시스템 설정
}

// 관리자 정보 타입
export interface AdminUser {
	id: number;
	username: string;
	email: string;
	name: string;
	role: AdminRole;
	permissions: AdminPermissions;
	isActive: boolean;
	lastLoginAt?: string;
	createdAt: string;
	updatedAt: string;
}

// 관리자 로그인 요청
export interface AdminLoginRequest {
	username: string;
	password: string;
}

// 관리자 인증 응답
export interface AdminAuthResponse {
	success: boolean;
	admin: AdminUser;
	accessToken: string;
	refreshToken: string;
	expiresIn: number;
}

// 대시보드 통계 데이터
export interface DashboardStats {
	// 예약 통계
	totalReservations: number;
	todayReservations: number;
	pendingReservations: number;
	cancelledReservations: number;
	
	// 매출 통계
	totalRevenue: number;
	todayRevenue: number;
	monthlyRevenue: number;
	
	// 회원 통계
	totalUsers: number;
	newUsersToday: number;
	newUsersThisMonth: number;
	
	// 상품 통계
	totalProducts: number;
	activeProducts: number;
	
	// 게시판 통계
	totalNotices: number;
	totalQnas: number;
	unansweredQnas: number;
	
	// 최근 활동
	recentReservations: unknown[];
	recentUsers: unknown[];
	recentQnas: unknown[];
}

// 관리자 활동 로그
export interface AdminActivityLog {
	id: number;
	adminId: number;
	adminName: string;
	action: string;           // 액션 타입 (CREATE, UPDATE, DELETE 등)
	target: string;           // 대상 (reservation, user, product 등)
	targetId?: number;        // 대상 ID
	description: string;      // 활동 설명
	ipAddress?: string;       // IP 주소
	userAgent?: string;       // 사용자 에이전트
	createdAt: string;
}

// 관리자 메뉴 구조
export interface AdminMenuItem {
	id: string;
	title: string;
	icon: string;
	href?: string;
	permission: keyof AdminPermissions;
	children?: AdminMenuItem[];
	badge?: number;           // 알림 배지 (미처리 건수 등)
}

// 관리자 시스템 설정
export interface SystemSettings {
	siteName: string;
	siteDescription: string;
	contactEmail: string;
	contactPhone: string;
	businessHours: string;
	maintenanceMode: boolean;
	allowRegistration: boolean;
	emailNotifications: boolean;
	smsNotifications: boolean;
	reservationSettings: {
		maxAdvanceBookingDays: number;
		cancellationDeadlineHours: number;
		refundPolicy: string;
	};
	paymentSettings: {
		enableCardPayment: boolean;
		enableBankTransfer: boolean;
		enableNaverPay: boolean;
		enableKakaoPay: boolean;
	};
}

