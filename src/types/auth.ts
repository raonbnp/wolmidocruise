// 사용자 정보 타입
export interface User {
	id: number;
	username: string;
	email: string;
	name: string;
	phone?: string;
	profileImage?: string;
	provider?: 'local' | 'kakao' | 'naver';
	providerId?: string;
	role: 'user' | 'admin';
	createdAt: string;
	updatedAt: string;
}

// 로그인 요청 타입
export interface LoginRequest {
	username: string;
	password: string;
	rememberMe?: boolean;
}

// 회원가입 요청 타입
export interface SignupRequest {
	username: string;
	password: string;
	passwordConfirm: string;
	email: string;
	name: string;
	phone?: string;
	agreeTerms: boolean;
	agreePrivacy: boolean;
	agreeMarketing?: boolean;
}

// 인증 응답 타입
export interface AuthResponse {
	success: boolean;
	user: User;
	accessToken: string;
	refreshToken: string;
	expiresIn: number;
}

// SNS 로그인 타입
export interface SocialLoginRequest {
	provider: 'kakao' | 'naver';
	code: string;
	state?: string;
}

// 비밀번호 찾기 요청 타입
export interface ForgotPasswordRequest {
	email: string;
}

// 비밀번호 재설정 요청 타입
export interface ResetPasswordRequest {
	token: string;
	password: string;
	passwordConfirm: string;
}

// 인증 상태 타입
export interface AuthState {
	isAuthenticated: boolean;
	user: User | null;
	loading: boolean;
	error: string | null;
}

// API 에러 타입
export interface AuthError {
	code: string;
	message: string;
	details?: unknown;
}



