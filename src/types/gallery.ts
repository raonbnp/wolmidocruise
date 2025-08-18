// 갤러리 아이템 타입 정의
export interface GalleryItem {
	id: number;
	title: string;
	description?: string;
	content?: string;
	imageUrl: string;
	author: string;
	date: string;
	views: number;
	likes?: number;
	comments?: number;
	rating?: number;
	tags?: string[];
	platform?: string;
	cruise?: string;
	verified?: boolean;
	createdAt?: string;
	updatedAt?: string;
}

// SNS 아이템 타입
export interface SNSItem extends GalleryItem {
	platform: 'Instagram' | 'Facebook';
	tags: string[];
	likes: number;
	comments: number;
}

// 리뷰 아이템 타입
export interface ReviewItem extends GalleryItem {
	rating: number;
	cruise: string;
	content: string;
	verified: boolean;
}

// API 응답 타입
export interface GalleryResponse {
	items: GalleryItem[];
	total: number;
	page: number;
	limit: number;
	totalPages: number;
}

// 갤러리 필터 타입
export interface GalleryFilter {
	page?: number;
	limit?: number;
	platform?: string;
	rating?: number;
	cruise?: string;
	verified?: boolean;
	dateFrom?: string;
	dateTo?: string;
	search?: string;
}

// 관리자 액션 타입
export interface AdminAction {
	type: 'create' | 'update' | 'delete';
	itemId?: number;
	data?: Partial<GalleryItem>;
}


