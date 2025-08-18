"use client";

import { useState, useEffect } from 'react';
import { 
	Reservation, 
	ReservationSearchRequest, 
	ReservationListResponse, 
	ReservationFilter 
} from '@/types/reservation';

// 더미 예약 데이터
const dummyReservations: Reservation[] = [
	{
		id: 1,
		orderNumber: 'WMD20240125001',
		userId: 1,
		customerName: '홍길동',
		customerPhone: '010-1234-5678',
		customerEmail: 'hong@example.com',
		productId: 1,
		productName: '불꽃 크루즈',
		productImage: 'https://via.placeholder.com/200x150/3B82F6/FFFFFF?text=Fireworks',
		reservationDate: '2024-02-15',
		reservationTime: '19:00',
		adultCount: 2,
		childCount: 1,
		infantCount: 0,
		adultPrice: 35000,
		childPrice: 25000,
		totalAmount: 95000,
		status: 'confirmed',
		paymentStatus: 'paid',
		memo: '창가 자리 요청드립니다.',
		createdAt: '2024-01-25T10:30:00Z',
		updatedAt: '2024-01-25T10:30:00Z'
	},
	{
		id: 2,
		orderNumber: 'WMD20240124002',
		userId: 1,
		customerName: '홍길동',
		customerPhone: '010-1234-5678',
		customerEmail: 'hong@example.com',
		productId: 2,
		productName: '낙조 크루즈',
		productImage: 'https://via.placeholder.com/200x150/F59E0B/FFFFFF?text=Sunset',
		reservationDate: '2024-02-10',
		reservationTime: '17:30',
		adultCount: 2,
		childCount: 0,
		infantCount: 0,
		adultPrice: 32000,
		childPrice: 0,
		totalAmount: 64000,
		status: 'completed',
		paymentStatus: 'paid',
		createdAt: '2024-01-24T14:20:00Z',
		updatedAt: '2024-02-10T18:00:00Z'
	},
	{
		id: 3,
		orderNumber: 'WMD20240123003',
		customerName: '김영희',
		customerPhone: '010-9876-5432',
		productId: 3,
		productName: '행복 크루즈',
		productImage: 'https://via.placeholder.com/200x150/10B981/FFFFFF?text=Happy',
		reservationDate: '2024-01-30',
		reservationTime: '14:00',
		adultCount: 4,
		childCount: 2,
		infantCount: 1,
		adultPrice: 28000,
		childPrice: 20000,
		totalAmount: 152000,
		status: 'cancelled',
		paymentStatus: 'refunded',
		cancelledAt: '2024-01-28T09:15:00Z',
		cancelReason: '개인 사정으로 인한 취소',
		createdAt: '2024-01-23T16:45:00Z',
		updatedAt: '2024-01-28T09:15:00Z'
	},
	{
		id: 4,
		orderNumber: 'WMD20240122004',
		userId: 1,
		customerName: '홍길동',
		customerPhone: '010-1234-5678',
		customerEmail: 'hong@example.com',
		productId: 4,
		productName: '패키지 여행 A',
		productImage: 'https://via.placeholder.com/200x150/8B5CF6/FFFFFF?text=Package',
		reservationDate: '2024-03-01',
		reservationTime: '10:00',
		adultCount: 2,
		childCount: 0,
		infantCount: 0,
		adultPrice: 75000,
		childPrice: 0,
		totalAmount: 150000,
		status: 'pending',
		paymentStatus: 'pending',
		memo: '결제 대기 중입니다.',
		createdAt: '2024-01-22T11:00:00Z',
		updatedAt: '2024-01-22T11:00:00Z'
	}
];

// 회원 예약 목록 조회 훅
export function useUserReservations(userId?: number, filter: ReservationFilter = {}) {
	const [reservations, setReservations] = useState<Reservation[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [total, setTotal] = useState(0);

	useEffect(() => {
		if (!userId) return;

		const fetchReservations = async () => {
			setLoading(true);
			setError(null);

			try {
				// 실제 API 호출 시뮬레이션
				await new Promise(resolve => setTimeout(resolve, 500));

				// 사용자의 예약만 필터링
				let userReservations = dummyReservations.filter(r => r.userId === userId);

				// 필터 적용
				if (filter.status) {
					userReservations = userReservations.filter(r => r.status === filter.status);
				}
				if (filter.paymentStatus) {
					userReservations = userReservations.filter(r => r.paymentStatus === filter.paymentStatus);
				}
				if (filter.dateFrom) {
					userReservations = userReservations.filter(r => r.reservationDate >= filter.dateFrom!);
				}
				if (filter.dateTo) {
					userReservations = userReservations.filter(r => r.reservationDate <= filter.dateTo!);
				}

				// 페이지네이션
				const limit = filter.limit || 10;
				const page = filter.page || 1;
				const startIndex = (page - 1) * limit;
				const paginatedReservations = userReservations.slice(startIndex, startIndex + limit);

				setReservations(paginatedReservations);
				setTotal(userReservations.length);
			} catch (err) {
				setError('예약 목록을 불러오는 중 오류가 발생했습니다.');
				console.error('Reservation fetch error:', err);
			} finally {
				setLoading(false);
			}
		};

		fetchReservations();
	}, [userId, filter]);

	return {
		reservations,
		loading,
		error,
		total,
		totalPages: Math.ceil(total / (filter.limit || 10))
	};
}

// 비회원 예약 조회 훅
export function useGuestReservation() {
	const [reservation, setReservation] = useState<Reservation | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const searchReservation = async (searchData: ReservationSearchRequest) => {
		setLoading(true);
		setError(null);
		setReservation(null);

		try {
			// 실제 API 호출 시뮬레이션
			await new Promise(resolve => setTimeout(resolve, 1000));

			// 주문번호로 예약 찾기
			const foundReservation = dummyReservations.find(r => 
				r.orderNumber === searchData.orderNumber &&
				r.customerName === searchData.customerName &&
				(!searchData.customerPhone || r.customerPhone === searchData.customerPhone)
			);

			if (foundReservation) {
				setReservation(foundReservation);
			} else {
				setError('입력하신 정보와 일치하는 예약을 찾을 수 없습니다.');
			}
		} catch (err) {
			setError('예약 조회 중 오류가 발생했습니다.');
			console.error('Guest reservation search error:', err);
		} finally {
			setLoading(false);
		}
	};

	const resetSearch = () => {
		setReservation(null);
		setError(null);
	};

	return {
		reservation,
		loading,
		error,
		searchReservation,
		resetSearch
	};
}

// 예약 취소 훅
export function useReservationCancel() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const cancelReservation = async (reservationId: number, reason: string) => {
		setLoading(true);
		setError(null);

		try {
			// 실제 API 호출 시뮬레이션
			await new Promise(resolve => setTimeout(resolve, 1000));

			// 실제로는 API 호출
			// await api.post(`/reservations/${reservationId}/cancel`, { reason });

			return true;
		} catch (err) {
			setError('예약 취소 중 오류가 발생했습니다.');
			console.error('Reservation cancel error:', err);
			return false;
		} finally {
			setLoading(false);
		}
	};

	return {
		loading,
		error,
		cancelReservation
	};
}


