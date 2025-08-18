"use client";

import { useReducer, useEffect, useCallback } from 'react';
import { WishlistState, WishlistAction, WishlistItem, CruiseProduct } from '@/types/cart';

// 초기 위시리스트 상태
const initialWishlistState: WishlistState = {
	items: [],
	totalItems: 0
};

// 위시리스트 리듀서
function wishlistReducer(state: WishlistState, action: WishlistAction): WishlistState {
	switch (action.type) {
		case 'ADD_ITEM': {
			const newItem = action.payload;
			const existingItem = state.items.find(item => item.productId === newItem.productId);
			
			// 이미 위시리스트에 있으면 추가하지 않음
			if (existingItem) {
				return state;
			}
			
			const updatedItems = [...state.items, newItem];
			return {
				items: updatedItems,
				totalItems: updatedItems.length
			};
		}
		
		case 'REMOVE_ITEM': {
			const updatedItems = state.items.filter(item => item.productId !== action.payload);
			return {
				items: updatedItems,
				totalItems: updatedItems.length
			};
		}
		
		case 'CLEAR_WISHLIST':
			return initialWishlistState;
			
		case 'LOAD_WISHLIST': {
			return {
				items: action.payload,
				totalItems: action.payload.length
			};
		}
		
		default:
			return state;
	}
}

// 위시리스트 커스텀 훅
export function useWishlist() {
	const [wishlistState, dispatch] = useReducer(wishlistReducer, initialWishlistState);

	// 로컬스토리지에서 위시리스트 데이터 로드
	useEffect(() => {
		const savedWishlist = localStorage.getItem('wishlist');
		if (savedWishlist) {
			try {
				const wishlistItems = JSON.parse(savedWishlist) as WishlistItem[];
				dispatch({ type: 'LOAD_WISHLIST', payload: wishlistItems });
			} catch (error) {
				console.error('위시리스트 데이터 로드 실패:', error);
				localStorage.removeItem('wishlist');
			}
		}
	}, []);

	// 위시리스트 상태가 변경될 때마다 로컬스토리지에 저장
	useEffect(() => {
		localStorage.setItem('wishlist', JSON.stringify(wishlistState.items));
	}, [wishlistState.items]);

	// 위시리스트에 상품 추가
	const addToWishlist = useCallback((product: CruiseProduct) => {
		const wishlistItem: WishlistItem = {
			productId: product.id,
			productName: product.name,
			productImage: product.image,
			adultPrice: product.adultPrice,
			childPrice: product.childPrice,
			duration: product.duration,
			schedule: product.schedule,
			rating: product.rating,
			reviewCount: product.reviewCount,
			tags: product.tags,
			addedAt: new Date().toISOString()
		};

		dispatch({ type: 'ADD_ITEM', payload: wishlistItem });
		return true;
	}, []);

	// 위시리스트에서 상품 제거
	const removeFromWishlist = useCallback((productId: number) => {
		dispatch({ type: 'REMOVE_ITEM', payload: productId });
	}, []);

	// 위시리스트 비우기
	const clearWishlist = useCallback(() => {
		dispatch({ type: 'CLEAR_WISHLIST' });
	}, []);

	// 상품이 위시리스트에 있는지 확인
	const isInWishlist = useCallback((productId: number): boolean => {
		return wishlistState.items.some(item => item.productId === productId);
	}, [wishlistState.items]);

	// 위시리스트 토글 (있으면 제거, 없으면 추가)
	const toggleWishlist = useCallback((product: CruiseProduct) => {
		if (isInWishlist(product.id)) {
			removeFromWishlist(product.id);
			return false; // 제거됨
		} else {
			addToWishlist(product);
			return true; // 추가됨
		}
	}, [isInWishlist, addToWishlist, removeFromWishlist]);

	return {
		// 상태
		wishlistItems: wishlistState.items,
		totalItems: wishlistState.totalItems,
		
		// 액션
		addToWishlist,
		removeFromWishlist,
		clearWishlist,
		toggleWishlist,
		
		// 유틸리티
		isInWishlist
	};
}
