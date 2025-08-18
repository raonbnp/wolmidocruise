// 크루즈 상품 타입
export interface CruiseProduct {
	id: number;
	name: string;
	description: string;
	duration: string;
	schedule: string;
	adultPrice: number;
	childPrice: number;
	image: string;
	isPopular: boolean;
	rating: number;
	reviewCount: number;
	tags: string[];
}

// 장바구니 아이템 타입
export interface CartItem {
	id: string;                    // 장바구니 아이템 고유 ID (productId + date + time)
	productId: number;             // 상품 ID
	productName: string;           // 상품명
	productImage: string;          // 상품 이미지
	adultPrice: number;            // 성인 가격
	childPrice: number;            // 소인 가격
	
	// 예약 정보
	reservationDate: string;       // 예약일 (YYYY-MM-DD)
	reservationTime: string;       // 예약시간 (HH:mm)
	
	// 인원 정보
	adultCount: number;            // 성인 수
	childCount: number;            // 소인 수
	infantCount: number;           // 유아 수 (무료)
	
	// 계산된 정보
	totalPrice: number;            // 총 가격 (성인가격*성인수 + 소인가격*소인수)
	totalPersons: number;          // 총 인원 (성인+소인+유아)
	
	// 메타 정보
	addedAt: string;               // 장바구니 추가 시간
}

// 장바구니 상태 타입
export interface CartState {
	items: CartItem[];
	totalItems: number;            // 총 아이템 수
	totalAmount: number;           // 총 금액
	totalPersons: number;          // 총 인원
}

// 장바구니 액션 타입
export type CartAction = 
	| { type: 'ADD_ITEM'; payload: CartItem }
	| { type: 'REMOVE_ITEM'; payload: string }        // 아이템 ID
	| { type: 'UPDATE_QUANTITY'; payload: { id: string; adultCount: number; childCount: number; infantCount: number } }
	| { type: 'CLEAR_CART' }
	| { type: 'LOAD_CART'; payload: CartItem[] };

// 위시리스트 아이템 타입
export interface WishlistItem {
	productId: number;
	productName: string;
	productImage: string;
	adultPrice: number;
	childPrice: number;
	duration: string;
	schedule: string;
	rating: number;
	reviewCount: number;
	tags: string[];
	addedAt: string;               // 위시리스트 추가 시간
}

// 위시리스트 상태 타입
export interface WishlistState {
	items: WishlistItem[];
	totalItems: number;
}

// 위시리스트 액션 타입
export type WishlistAction = 
	| { type: 'ADD_ITEM'; payload: WishlistItem }
	| { type: 'REMOVE_ITEM'; payload: number }        // 상품 ID
	| { type: 'CLEAR_WISHLIST' }
	| { type: 'LOAD_WISHLIST'; payload: WishlistItem[] };

// 장바구니에 상품 추가 요청 타입
export interface AddToCartRequest {
	productId: number;
	reservationDate: string;
	reservationTime: string;
	adultCount: number;
	childCount: number;
	infantCount: number;
}
