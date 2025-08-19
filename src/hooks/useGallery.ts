"use client";

import { useState, useEffect } from 'react';
import { GalleryItem, GalleryResponse, GalleryFilter, AdminAction } from '@/types/gallery';

// 실제로는 API 엔드포인트를 사용하겠지만, 현재는 더미 데이터 사용
export function useGallery(type: 'sns' | 'review', initialFilter: GalleryFilter = {}) {
	const [items, setItems] = useState<GalleryItem[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [filter, setFilter] = useState<GalleryFilter>(initialFilter);
	const [total, setTotal] = useState(0);

	// 데이터 페칭 함수 (실제로는 API 호출)
	const fetchItems = async (currentFilter: GalleryFilter) => {
		setLoading(true);
		setError(null);
		
		try {
			// 실제 API 호출 시뮬레이션
			await new Promise(resolve => setTimeout(resolve, 500));
			
			// 여기서는 더미 데이터를 반환하지만, 실제로는 API에서 데이터를 가져옴
			const mockResponse: GalleryResponse = {
				items: [], // 실제 데이터는 API에서 가져옴
				total: 0,
				page: currentFilter.page || 1,
				limit: currentFilter.limit || 9,
				totalPages: 0
			};
			
			setItems(mockResponse.items);
			setTotal(mockResponse.total);
		} catch (err) {
			setError('데이터를 불러오는 중 오류가 발생했습니다.');
			console.error('Gallery fetch error:', err);
		} finally {
			setLoading(false);
		}
	};

	// 필터 업데이트
	const updateFilter = (newFilter: Partial<GalleryFilter>) => {
		const updatedFilter = { ...filter, ...newFilter };
		setFilter(updatedFilter);
	};

	// 페이지 변경
	const changePage = (page: number) => {
		updateFilter({ page });
	};

	// 아이템 좋아요
	const likeItem = async (id: number) => {
		try {
			// 실제 API 호출
			// await api.post(`/gallery/${type}/${id}/like`);
			
			// 로컬 상태 업데이트
			setItems(prevItems => 
				prevItems.map(item => 
					item.id === id 
						? { ...item, likes: (item.likes || 0) + 1 }
						: item
				)
			);
		} catch (err) {
			console.error('Like error:', err);
		}
	};

	// 관리자 액션 (생성, 수정, 삭제)
	const adminAction = async (action: AdminAction) => {
		setLoading(true);
		setError(null);
		
		try {
			switch (action.type) {
				case 'create':
					// await api.post(`/admin/gallery/${type}`, action.data);
					break;
				case 'update':
					// await api.put(`/admin/gallery/${type}/${action.itemId}`, action.data);
					break;
				case 'delete':
					// await api.delete(`/admin/gallery/${type}/${action.itemId}`);
					break;
			}
			
			// 성공 후 데이터 재조회
			await fetchItems(filter);
		} catch (err) {
			setError('작업 중 오류가 발생했습니다.');
			console.error('Admin action error:', err);
		} finally {
			setLoading(false);
		}
	};

	// 초기 데이터 로드 및 필터 변경 시 재로드
	useEffect(() => {
		fetchItems(filter);
	}, [filter]);

	return {
		items,
		loading,
		error,
		filter,
		total,
		totalPages: Math.ceil(total / (filter.limit || 9)),
		updateFilter,
		changePage,
		likeItem,
		adminAction,
		refresh: () => fetchItems(filter)
	};
}

// 특정 아이템 조회
export function useGalleryItem(type: 'sns' | 'review', id: number) {
	const [item, setItem] = useState<GalleryItem | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const fetchItem = async () => {
		setLoading(true);
		setError(null);
		
		try {
			// 실제 API 호출
			// const response = await api.get(`/gallery/${type}/${id}`);
			// setItem(response.data);
		} catch (err) {
			setError('데이터를 불러오는 중 오류가 발생했습니다.');
			console.error('Gallery item fetch error:', err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (id) {
			fetchItem();
		}
	}, [id, type]);

	return {
		item,
		loading,
		error,
		refresh: fetchItem
	};
}



