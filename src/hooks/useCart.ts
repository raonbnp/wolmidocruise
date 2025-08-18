"use client";

import { useReducer, useEffect, useCallback } from 'react';
import { CartState, CartAction, CartItem, AddToCartRequest, CruiseProduct } from '@/types/cart';

// 초기 장바구니 상태
const initialCartState: CartState = {
	items: [],
	totalItems: 0,
	totalAmount: 0,
	totalPersons: 0
};

// 장바구니 리듀서
function cartReducer(state: CartState, action: CartAction): CartState {
	switch (action.type) {
		case 'ADD_ITEM': {
			const newItem = action.payload;
			const existingItemIndex = state.items.findIndex(item => item.id === newItem.id);
			
			let updatedItems: CartItem[];
			
			if (existingItemIndex >= 0) {
				// 기존 아이템이 있으면 수량 업데이트
				updatedItems = state.items.map((item, index) =>
					index === existingItemIndex
						? {
							...item,
							adultCount: item.adultCount + newItem.adultCount,
							childCount: item.childCount + newItem.childCount,
							infantCount: item.infantCount + newItem.infantCount,
							totalPrice: (item.adultCount + newItem.adultCount) * item.adultPrice + 
									   (item.childCount + newItem.childCount) * item.childPrice,
							totalPersons: (item.adultCount + newItem.adultCount) + 
										 (item.childCount + newItem.childCount) + 
										 (item.infantCount + newItem.infantCount)
						}
						: item
				);
			} else {
				// 새로운 아이템 추가
				updatedItems = [...state.items, newItem];
			}
			
			return calculateCartTotals(updatedItems);
		}
		
		case 'REMOVE_ITEM': {
			const updatedItems = state.items.filter(item => item.id !== action.payload);
			return calculateCartTotals(updatedItems);
		}
		
		case 'UPDATE_QUANTITY': {
			const { id, adultCount, childCount, infantCount } = action.payload;
			const updatedItems = state.items.map(item =>
				item.id === id
					? {
						...item,
						adultCount,
						childCount,
						infantCount,
						totalPrice: adultCount * item.adultPrice + childCount * item.childPrice,
						totalPersons: adultCount + childCount + infantCount
					}
					: item
			);
			return calculateCartTotals(updatedItems);
		}
		
		case 'CLEAR_CART':
			return initialCartState;
			
		case 'LOAD_CART': {
			return calculateCartTotals(action.payload);
		}
		
		default:
			return state;
	}
}

// 장바구니 총계 계산 헬퍼 함수
function calculateCartTotals(items: CartItem[]): CartState {
	const totalItems = items.length;
	const totalAmount = items.reduce((sum, item) => sum + item.totalPrice, 0);
	const totalPersons = items.reduce((sum, item) => sum + item.totalPersons, 0);
	
	return {
		items,
		totalItems,
		totalAmount,
		totalPersons
	};
}

// 장바구니 아이템 ID 생성 함수
function generateCartItemId(productId: number, date: string, time: string): string {
	return `${productId}_${date}_${time}`;
}

// 장바구니 커스텀 훅
export function useCart() {
	const [cartState, dispatch] = useReducer(cartReducer, initialCartState);

	// 로컬스토리지에서 장바구니 데이터 로드
	useEffect(() => {
		const savedCart = localStorage.getItem('cart');
		if (savedCart) {
			try {
				const cartItems = JSON.parse(savedCart) as CartItem[];
				dispatch({ type: 'LOAD_CART', payload: cartItems });
			} catch (error) {
				console.error('장바구니 데이터 로드 실패:', error);
				localStorage.removeItem('cart');
			}
		}
	}, []);

	// 장바구니 상태가 변경될 때마다 로컬스토리지에 저장
	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(cartState.items));
	}, [cartState.items]);

	// 장바구니에 상품 추가
	const addToCart = useCallback((product: CruiseProduct, request: AddToCartRequest) => {
		const cartItemId = generateCartItemId(
			request.productId, 
			request.reservationDate, 
			request.reservationTime
		);

		const cartItem: CartItem = {
			id: cartItemId,
			productId: product.id,
			productName: product.name,
			productImage: product.image,
			adultPrice: product.adultPrice,
			childPrice: product.childPrice,
			reservationDate: request.reservationDate,
			reservationTime: request.reservationTime,
			adultCount: request.adultCount,
			childCount: request.childCount,
			infantCount: request.infantCount,
			totalPrice: request.adultCount * product.adultPrice + request.childCount * product.childPrice,
			totalPersons: request.adultCount + request.childCount + request.infantCount,
			addedAt: new Date().toISOString()
		};

		dispatch({ type: 'ADD_ITEM', payload: cartItem });
		return true;
	}, []);

	// 장바구니에서 상품 제거
	const removeFromCart = useCallback((itemId: string) => {
		dispatch({ type: 'REMOVE_ITEM', payload: itemId });
	}, []);

	// 장바구니 상품 수량 업데이트
	const updateQuantity = useCallback((
		itemId: string, 
		adultCount: number, 
		childCount: number, 
		infantCount: number
	) => {
		if (adultCount < 0 || childCount < 0 || infantCount < 0) {
			return false;
		}
		
		if (adultCount === 0 && childCount === 0) {
			// 성인과 소인이 모두 0이면 아이템 제거
			removeFromCart(itemId);
			return true;
		}

		dispatch({ 
			type: 'UPDATE_QUANTITY', 
			payload: { id: itemId, adultCount, childCount, infantCount } 
		});
		return true;
	}, [removeFromCart]);

	// 장바구니 비우기
	const clearCart = useCallback(() => {
		dispatch({ type: 'CLEAR_CART' });
	}, []);

	// 특정 상품이 장바구니에 있는지 확인
	const isInCart = useCallback((productId: number, date?: string, time?: string): boolean => {
		if (date && time) {
			const itemId = generateCartItemId(productId, date, time);
			return cartState.items.some(item => item.id === itemId);
		}
		return cartState.items.some(item => item.productId === productId);
	}, [cartState.items]);

	// 특정 상품의 장바구니 아이템 개수 반환
	const getCartItemCount = useCallback((productId: number): number => {
		return cartState.items.filter(item => item.productId === productId).length;
	}, [cartState.items]);

	return {
		// 상태
		cartItems: cartState.items,
		totalItems: cartState.totalItems,
		totalAmount: cartState.totalAmount,
		totalPersons: cartState.totalPersons,
		
		// 액션
		addToCart,
		removeFromCart,
		updateQuantity,
		clearCart,
		
		// 유틸리티
		isInCart,
		getCartItemCount
	};
}
