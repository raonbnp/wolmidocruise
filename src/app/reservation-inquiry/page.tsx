"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingQuickMenu from "@/components/FloatingQuickMenu";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
	Search, 
	Calendar, 
	Clock, 
	Users, 
	CreditCard, 
	CheckCircle, 
	XCircle, 
	AlertCircle,
	User,
	Phone,
	Receipt,
	ChevronLeft,
	ChevronRight
} from "lucide-react";
import { useState, useEffect } from "react";
import { useUserReservations, useGuestReservation } from "@/hooks/useReservation";
import { Reservation, ReservationSearchRequest } from "@/types/reservation";

export default function ReservationInquiryPage() {
	// 임시로 로그인 상태 시뮬레이션 (실제로는 useAuth 훅 사용)
	const [isLoggedIn] = useState(false); // true로 변경하면 회원 모드
	const [currentUserId] = useState(1);
	const [currentPage, setCurrentPage] = useState(1);
	
	// 비회원 검색 폼 데이터
	const [guestSearchForm, setGuestSearchForm] = useState<ReservationSearchRequest>({
		orderNumber: '',
		customerName: '',
		customerPhone: ''
	});

	// 회원 예약 목록 (회원인 경우)
	const { 
		reservations: userReservations, 
		loading: userLoading, 
		error: userError,
		total: userTotal,
		totalPages: userTotalPages
	} = useUserReservations(isLoggedIn ? currentUserId : undefined, { 
		page: currentPage, 
		limit: 5 
	});

	// 비회원 예약 조회 (비회원인 경우)
	const {
		reservation: guestReservation,
		loading: guestLoading,
		error: guestError,
		searchReservation,
		resetSearch
	} = useGuestReservation();

	const handleGuestInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setGuestSearchForm(prev => ({
			...prev,
			[name]: value
		}));
	};

	const handleGuestSearch = async (e: React.FormEvent) => {
		e.preventDefault();
		
		if (!guestSearchForm.orderNumber.trim()) {
			alert('주문번호를 입력해주세요.');
			return;
		}
		if (!guestSearchForm.customerName?.trim()) {
			alert('예약자명을 입력해주세요.');
			return;
		}

		await searchReservation(guestSearchForm);
	};

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	const getStatusBadge = (status: Reservation['status']) => {
		const statusConfig = {
			pending: { label: '예약대기', color: 'bg-yellow-100 text-yellow-800', icon: AlertCircle },
			confirmed: { label: '예약확정', color: 'bg-green-100 text-green-800', icon: CheckCircle },
			cancelled: { label: '예약취소', color: 'bg-red-100 text-red-800', icon: XCircle },
			completed: { label: '이용완료', color: 'bg-blue-100 text-blue-800', icon: CheckCircle },
			no_show: { label: '노쇼', color: 'bg-gray-100 text-gray-800', icon: XCircle }
		};

		const config = statusConfig[status];
		const IconComponent = config.icon;

		return (
			<span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
				<IconComponent className="w-3 h-3 mr-1" />
				{config.label}
			</span>
		);
	};

	const getPaymentStatusBadge = (status: Reservation['paymentStatus']) => {
		const statusConfig = {
			pending: { label: '결제대기', color: 'bg-yellow-100 text-yellow-800' },
			paid: { label: '결제완료', color: 'bg-green-100 text-green-800' },
			refunded: { label: '환불완료', color: 'bg-blue-100 text-blue-800' },
			failed: { label: '결제실패', color: 'bg-red-100 text-red-800' }
		};

		const config = statusConfig[status];

		return (
			<span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
				<CreditCard className="w-3 h-3 mr-1" />
				{config.label}
			</span>
		);
	};

	const formatDate = (dateString: string) => {
		return dateString.replace(/-/g, '.');
	};

	const formatPrice = (price: number) => {
		return price.toLocaleString('ko-KR');
	};

	const ReservationCard = ({ reservation }: { reservation: Reservation }) => (
		<Card className="mb-6 hover:shadow-lg transition-shadow">
			<CardContent className="p-6">
				<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
					{/* 왼쪽: 예약 정보 */}
					<div className="flex-1">
						<div className="flex items-center justify-between mb-4">
							<div className="flex items-center space-x-3">
								<h3 className="text-lg font-semibold text-gray-900">{reservation.productName}</h3>
								{getStatusBadge(reservation.status)}
								{getPaymentStatusBadge(reservation.paymentStatus)}
							</div>
							<div className="text-sm text-gray-500">
								주문번호: {reservation.orderNumber}
							</div>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
							<div className="flex items-center space-x-2">
								<Calendar className="w-4 h-4" />
								<span>이용일시: {formatDate(reservation.reservationDate)} {reservation.reservationTime}</span>
							</div>
							<div className="flex items-center space-x-2">
								<Users className="w-4 h-4" />
								<span>
									인원: 대인 {reservation.adultCount}명
									{reservation.childCount > 0 && `, 소인 ${reservation.childCount}명`}
									{reservation.infantCount > 0 && `, 유아 ${reservation.infantCount}명`}
								</span>
							</div>
							<div className="flex items-center space-x-2">
								<User className="w-4 h-4" />
								<span>예약자: {reservation.customerName}</span>
							</div>
							<div className="flex items-center space-x-2">
								<Phone className="w-4 h-4" />
								<span>연락처: {reservation.customerPhone}</span>
							</div>
						</div>

						{reservation.memo && (
							<div className="mt-3 p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
								<strong>요청사항:</strong> {reservation.memo}
							</div>
						)}

						{reservation.cancelReason && (
							<div className="mt-3 p-3 bg-red-50 rounded-lg text-sm text-red-600">
								<strong>취소사유:</strong> {reservation.cancelReason}
							</div>
						)}
					</div>

					{/* 오른쪽: 금액 및 액션 */}
					<div className="lg:ml-6 mt-4 lg:mt-0 lg:text-right">
						<div className="text-2xl font-bold text-[#005BAC] mb-2">
							{formatPrice(reservation.totalAmount)}원
						</div>
						<div className="text-sm text-gray-500 mb-4">
							예약일: {formatDate(reservation.createdAt.split('T')[0])}
						</div>
						
						<div className="flex flex-col space-y-2">
							{reservation.status === 'confirmed' && reservation.paymentStatus === 'paid' && (
								<Button 
									variant="outline" 
									size="sm"
									className="border-red-300 text-red-600 hover:bg-red-50"
								>
									예약 취소
								</Button>
							)}
							<Button variant="outline" size="sm">
								상세보기
							</Button>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);

	return (
		<div className="min-h-screen">
			<Header />
			<main className="pt-[106px]"> {/* 헤더 높이만큼 상단 여백 */}
				<div className="w-full max-w-[1600px] mx-auto px-4 py-16">
					{/* 페이지 제목 */}
					<div className="text-center mb-12">
						<h1 className="text-4xl font-bold text-gray-900 mb-4">예약조회</h1>
						<p className="text-xl text-gray-600">
							{isLoggedIn ? '나의 예약 현황을 확인하세요' : '주문번호로 예약 정보를 조회하세요'}
						</p>
					</div>

					{/* 회원 예약 목록 */}
					{isLoggedIn ? (
						<div>
							{/* 예약 통계 */}
							<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
								<Card>
									<CardContent className="p-6 text-center">
										<div className="text-2xl font-bold text-[#005BAC] mb-2">{userTotal}</div>
										<div className="text-gray-600">총 예약</div>
									</CardContent>
								</Card>
								<Card>
									<CardContent className="p-6 text-center">
										<div className="text-2xl font-bold text-green-600 mb-2">
											{userReservations.filter(r => r.status === 'confirmed').length}
										</div>
										<div className="text-gray-600">예약확정</div>
									</CardContent>
								</Card>
								<Card>
									<CardContent className="p-6 text-center">
										<div className="text-2xl font-bold text-blue-600 mb-2">
											{userReservations.filter(r => r.status === 'completed').length}
										</div>
										<div className="text-gray-600">이용완료</div>
									</CardContent>
								</Card>
								<Card>
									<CardContent className="p-6 text-center">
										<div className="text-2xl font-bold text-red-600 mb-2">
											{userReservations.filter(r => r.status === 'cancelled').length}
										</div>
										<div className="text-gray-600">취소</div>
									</CardContent>
								</Card>
							</div>

							{/* 예약 목록 */}
							{userLoading ? (
								<div className="text-center py-12">
									<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#005BAC] mx-auto"></div>
									<p className="mt-4 text-gray-600">예약 목록을 불러오는 중...</p>
								</div>
							) : userError ? (
								<Card>
									<CardContent className="p-12 text-center">
										<AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
										<h3 className="text-xl font-semibold text-gray-900 mb-2">오류가 발생했습니다</h3>
										<p className="text-gray-600">{userError}</p>
									</CardContent>
								</Card>
							) : userReservations.length > 0 ? (
								<div>
									{userReservations.map(reservation => (
										<ReservationCard key={reservation.id} reservation={reservation} />
									))}

									{/* 페이지네이션 */}
									{userTotalPages > 1 && (
										<div className="flex justify-center mt-8">
											<div className="flex items-center space-x-2">
												<Button
													variant="outline"
													size="sm"
													onClick={() => handlePageChange(currentPage - 1)}
													disabled={currentPage === 1}
												>
													<ChevronLeft className="w-4 h-4" />
												</Button>

												{Array.from({ length: userTotalPages }, (_, i) => i + 1).map((page) => (
													<Button
														key={page}
														variant={currentPage === page ? "default" : "outline"}
														size="sm"
														onClick={() => handlePageChange(page)}
														className={currentPage === page ? "bg-[#005BAC] hover:bg-[#004494]" : ""}
													>
														{page}
													</Button>
												))}

												<Button
													variant="outline"
													size="sm"
													onClick={() => handlePageChange(currentPage + 1)}
													disabled={currentPage === userTotalPages}
												>
													<ChevronRight className="w-4 h-4" />
												</Button>
											</div>
										</div>
									)}
								</div>
							) : (
								<Card>
									<CardContent className="p-12 text-center">
										<Receipt className="w-16 h-16 text-gray-400 mx-auto mb-4" />
										<h3 className="text-xl font-semibold text-gray-900 mb-2">예약 내역이 없습니다</h3>
										<p className="text-gray-600 mb-6">아직 예약하신 내역이 없습니다. 크루즈 예약을 해보세요!</p>
										<Button className="bg-[#005BAC] hover:bg-[#004494]">
											크루즈 예약하기
										</Button>
									</CardContent>
								</Card>
							)}
						</div>
					) : (
						/* 비회원 예약 조회 */
						<div>
							{/* 검색 폼 */}
							<Card className="max-w-2xl mx-auto mb-8">
								<CardContent className="p-8">
									<form onSubmit={handleGuestSearch} className="space-y-6">
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												주문번호 <span className="text-red-500">*</span>
											</label>
											<div className="relative">
												<Receipt className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
												<input
													type="text"
													name="orderNumber"
													value={guestSearchForm.orderNumber}
													onChange={handleGuestInputChange}
													className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none"
													placeholder="예: WMD20240125001"
													required
												/>
											</div>
										</div>

										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												예약자명 <span className="text-red-500">*</span>
											</label>
											<div className="relative">
												<User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
												<input
													type="text"
													name="customerName"
													value={guestSearchForm.customerName}
													onChange={handleGuestInputChange}
													className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none"
													placeholder="예약 시 입력한 이름"
													required
												/>
											</div>
										</div>

										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												휴대폰 번호
											</label>
											<div className="relative">
												<Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
												<input
													type="tel"
													name="customerPhone"
													value={guestSearchForm.customerPhone}
													onChange={handleGuestInputChange}
													className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none"
													placeholder="010-0000-0000 (선택사항)"
												/>
											</div>
										</div>

										<Button
											type="submit"
											disabled={guestLoading}
											className="w-full bg-[#005BAC] hover:bg-[#004494] py-3 text-lg font-semibold flex items-center justify-center space-x-2"
										>
											{guestLoading ? (
												<div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
											) : (
												<>
													<Search className="w-5 h-5" />
													<span>예약 조회</span>
												</>
											)}
										</Button>
									</form>
								</CardContent>
							</Card>

							{/* 검색 결과 */}
							{guestError && (
								<Card className="max-w-2xl mx-auto">
									<CardContent className="p-8 text-center">
										<AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
										<h3 className="text-xl font-semibold text-gray-900 mb-2">예약을 찾을 수 없습니다</h3>
										<p className="text-gray-600 mb-6">{guestError}</p>
										<Button onClick={resetSearch} variant="outline">
											다시 검색하기
										</Button>
									</CardContent>
								</Card>
							)}

							{guestReservation && (
								<div className="max-w-4xl mx-auto">
									<div className="flex items-center justify-between mb-4">
										<h2 className="text-2xl font-bold text-gray-900">예약 정보</h2>
										<Button onClick={resetSearch} variant="outline">
											다시 검색하기
										</Button>
									</div>
									<ReservationCard reservation={guestReservation} />
								</div>
							)}
						</div>
					)}

					{/* 안내 메시지 */}
					<div className="mt-16 text-center">
						<Card className="max-w-4xl mx-auto bg-blue-50 border-blue-200">
							<CardContent className="p-8">
								<h3 className="text-2xl font-semibold text-gray-900 mb-4">📞 예약 문의</h3>
								<p className="text-gray-700 mb-6">
									예약 조회에 문제가 있거나 예약 변경이 필요하시면<br />
									고객센터로 연락주세요.
								</p>
								<div className="flex justify-center space-x-4">
									<div className="text-center">
										<div className="text-2xl font-bold text-[#005BAC]">032-123-4567</div>
										<div className="text-sm text-gray-600">평일 09:00 - 18:00</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</main>
			<Footer />
			<FloatingQuickMenu />
		</div>
	);
}



