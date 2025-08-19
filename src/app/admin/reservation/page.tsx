"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminAuthGuard from "@/components/admin/AdminAuthGuard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
	Search,
	Filter,
	Calendar,
	Clock,
	Users,
	Phone,
	Mail,
	Eye,
	Edit,
	CheckCircle,
	XCircle,
	AlertTriangle,
	Download,
	RefreshCw
} from "lucide-react";
import { Reservation, ReservationStatus, PaymentStatus } from "@/types/reservation";

// 예약 관리용 확장 타입
interface AdminReservation extends Reservation {
	customerEmail?: string;
	specialRequests?: string;
	adminNotes?: string;
	lastUpdatedBy?: string;
}

// 더미 예약 데이터 (관리자용)
const dummyReservations: AdminReservation[] = [
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
		specialRequests: '휠체어 이용 고객 1명',
		adminNotes: '특별 관리 필요',
		createdAt: '2024-01-25T10:30:00Z',
		updatedAt: '2024-01-25T10:30:00Z',
		lastUpdatedBy: 'admin'
	},
	{
		id: 2,
		orderNumber: 'WMD20240124002',
		userId: 2,
		customerName: '김영희',
		customerPhone: '010-9876-5432',
		customerEmail: 'kim@example.com',
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
		status: 'pending',
		paymentStatus: 'pending',
		memo: '결혼기념일 특별한 날입니다.',
		createdAt: '2024-01-24T14:20:00Z',
		updatedAt: '2024-01-24T14:20:00Z'
	},
	{
		id: 3,
		orderNumber: 'WMD20240123003',
		customerName: '박철수',
		customerPhone: '010-5555-6666',
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
		adminNotes: '환불 처리 완료',
		createdAt: '2024-01-23T16:45:00Z',
		updatedAt: '2024-01-28T09:15:00Z',
		lastUpdatedBy: 'operator1'
	},
	{
		id: 4,
		orderNumber: 'WMD20240122004',
		userId: 3,
		customerName: '이민수',
		customerPhone: '010-7777-8888',
		customerEmail: 'lee@example.com',
		productId: 5,
		productName: '패키지 여행 A',
		productImage: 'https://via.placeholder.com/200x150/EF4444/FFFFFF?text=Package',
		reservationDate: '2024-03-01',
		reservationTime: '10:00',
		adultCount: 2,
		childCount: 0,
		infantCount: 0,
		adultPrice: 85000,
		childPrice: 0,
		totalAmount: 170000,
		status: 'confirmed',
		paymentStatus: 'paid',
		memo: '점심 식사 알레르기 - 견과류',
		specialRequests: '식이 제한 있음',
		createdAt: '2024-01-22T11:00:00Z',
		updatedAt: '2024-01-22T11:00:00Z'
	},
	{
		id: 5,
		orderNumber: 'WMD20240121005',
		customerName: '최지영',
		customerPhone: '010-3333-4444',
		productId: 4,
		productName: '행복 크루즈 4회',
		productImage: 'https://via.placeholder.com/200x150/8B5CF6/FFFFFF?text=Regular',
		reservationDate: '2024-01-26',
		reservationTime: '11:00',
		adultCount: 1,
		childCount: 1,
		infantCount: 0,
		adultPrice: 25000,
		childPrice: 18000,
		totalAmount: 43000,
		status: 'completed',
		paymentStatus: 'paid',
		createdAt: '2024-01-21T09:30:00Z',
		updatedAt: '2024-01-26T12:00:00Z'
	}
];

export default function AdminReservationPage() {
	const [reservations, setReservations] = useState<AdminReservation[]>([]);
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState("");
	const [filterStatus, setFilterStatus] = useState<string>("all");
	const [filterPaymentStatus, setFilterPaymentStatus] = useState<string>("all");
	const [filterDate, setFilterDate] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage] = useState(10);

	// 데이터 로드
	useEffect(() => {
		const loadReservations = async () => {
			try {
				// 실제로는 API 호출
				await new Promise(resolve => setTimeout(resolve, 1000));
				setReservations(dummyReservations);
			} catch (error) {
				console.error('Reservations load error:', error);
			} finally {
				setLoading(false);
			}
		};

		loadReservations();
	}, []);

	// 필터링된 예약 목록
	const filteredReservations = reservations.filter(reservation => {
		const matchesSearch = 
			reservation.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
			reservation.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
			reservation.customerPhone.includes(searchTerm) ||
			reservation.productName.toLowerCase().includes(searchTerm.toLowerCase());
		
		const matchesStatus = filterStatus === "all" || reservation.status === filterStatus;
		const matchesPaymentStatus = filterPaymentStatus === "all" || reservation.paymentStatus === filterPaymentStatus;
		const matchesDate = !filterDate || reservation.reservationDate === filterDate;

		return matchesSearch && matchesStatus && matchesPaymentStatus && matchesDate;
	});

	// 페이지네이션
	const totalPages = Math.ceil(filteredReservations.length / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const paginatedReservations = filteredReservations.slice(startIndex, startIndex + itemsPerPage);

	// 상태 배지
	const getStatusBadge = (status: ReservationStatus) => {
		const statusConfig = {
			pending: { label: '예약대기', variant: 'secondary' as const, icon: AlertTriangle },
			confirmed: { label: '예약확정', variant: 'default' as const, icon: CheckCircle },
			cancelled: { label: '예약취소', variant: 'destructive' as const, icon: XCircle },
			completed: { label: '이용완료', variant: 'default' as const, icon: CheckCircle },
			no_show: { label: '노쇼', variant: 'destructive' as const, icon: XCircle }
		};

		const config = statusConfig[status];
		const IconComponent = config.icon;

		return (
			<Badge variant={config.variant} className="flex items-center space-x-1">
				<IconComponent className="w-3 h-3" />
				<span>{config.label}</span>
			</Badge>
		);
	};

	// 결제 상태 배지
	const getPaymentStatusBadge = (status: PaymentStatus) => {
		const statusConfig = {
			pending: { label: '결제대기', variant: 'secondary' as const },
			paid: { label: '결제완료', variant: 'default' as const },
			refunded: { label: '환불완료', variant: 'default' as const },
			failed: { label: '결제실패', variant: 'destructive' as const }
		};

		const config = statusConfig[status];
		return <Badge variant={config.variant}>{config.label}</Badge>;
	};

	// 날짜 포맷
	const formatDate = (dateString: string) => {
		return dateString.replace(/-/g, '.');
	};

	// 가격 포맷
	const formatPrice = (price: number) => {
		return price.toLocaleString('ko-KR');
	};

	// 예약 상태 변경
	const handleStatusChange = async (reservationId: number, newStatus: ReservationStatus) => {
		if (!confirm(`예약 상태를 '${newStatus}'로 변경하시겠습니까?`)) return;

		try {
			// 실제로는 API 호출
			setReservations(prev => prev.map(r => 
				r.id === reservationId 
					? { ...r, status: newStatus, updatedAt: new Date().toISOString() }
					: r
			));
			alert('예약 상태가 변경되었습니다.');
		} catch (error) {
			console.error('Status change error:', error);
			alert('상태 변경 중 오류가 발생했습니다.');
		}
	};

	return (
		<AdminAuthGuard requiredPermission="reservation">
			<AdminLayout>
				<div className="space-y-6">
					{/* 헤더 */}
					<div className="flex items-center justify-between">
						<div>
							<h1 className="text-3xl font-bold text-gray-900">예약 관리</h1>
							<p className="text-gray-600">고객 예약을 조회하고 관리하세요</p>
						</div>
						<div className="flex space-x-2">
							<Button variant="outline" className="flex items-center space-x-2">
								<Download className="w-4 h-4" />
								<span>엑셀 다운로드</span>
							</Button>
							<Button 
								variant="outline" 
								onClick={() => window.location.reload()}
								className="flex items-center space-x-2"
							>
								<RefreshCw className="w-4 h-4" />
								<span>새로고침</span>
							</Button>
						</div>
					</div>

					{/* 통계 카드 */}
					<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
						<Card>
							<CardContent className="p-6">
								<div className="flex items-center justify-between">
									<div>
										<p className="text-sm font-medium text-gray-600">전체 예약</p>
										<p className="text-2xl font-bold">{reservations.length}</p>
									</div>
									<Calendar className="h-8 w-8 text-gray-400" />
								</div>
							</CardContent>
						</Card>
						<Card>
							<CardContent className="p-6">
								<div className="flex items-center justify-between">
									<div>
										<p className="text-sm font-medium text-gray-600">처리 대기</p>
										<p className="text-2xl font-bold text-yellow-600">
											{reservations.filter(r => r.status === 'pending').length}
										</p>
									</div>
									<Clock className="h-8 w-8 text-yellow-400" />
								</div>
							</CardContent>
						</Card>
						<Card>
							<CardContent className="p-6">
								<div className="flex items-center justify-between">
									<div>
										<p className="text-sm font-medium text-gray-600">예약 확정</p>
										<p className="text-2xl font-bold text-green-600">
											{reservations.filter(r => r.status === 'confirmed').length}
										</p>
									</div>
									<CheckCircle className="h-8 w-8 text-green-400" />
								</div>
							</CardContent>
						</Card>
						<Card>
							<CardContent className="p-6">
								<div className="flex items-center justify-between">
									<div>
										<p className="text-sm font-medium text-gray-600">취소</p>
										<p className="text-2xl font-bold text-red-600">
											{reservations.filter(r => r.status === 'cancelled').length}
										</p>
									</div>
									<XCircle className="h-8 w-8 text-red-400" />
								</div>
							</CardContent>
						</Card>
					</div>

					{/* 검색 및 필터 */}
					<Card>
						<CardContent className="p-6">
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
								{/* 검색 */}
								<div className="lg:col-span-2">
									<div className="relative">
										<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
										<input
											type="text"
											placeholder="주문번호, 예약자명, 전화번호, 상품명으로 검색..."
											value={searchTerm}
											onChange={(e) => setSearchTerm(e.target.value)}
											className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none"
										/>
									</div>
								</div>

								{/* 예약 상태 필터 */}
								<div>
									<select
										value={filterStatus}
										onChange={(e) => setFilterStatus(e.target.value)}
										className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none"
										aria-label="예약 상태 필터"
									>
										<option value="all">모든 상태</option>
										<option value="pending">예약대기</option>
										<option value="confirmed">예약확정</option>
										<option value="cancelled">예약취소</option>
										<option value="completed">이용완료</option>
										<option value="no_show">노쇼</option>
									</select>
								</div>

								{/* 결제 상태 필터 */}
								<div>
									<select
										value={filterPaymentStatus}
										onChange={(e) => setFilterPaymentStatus(e.target.value)}
										className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none"
										aria-label="결제 상태 필터"
									>
										<option value="all">모든 결제상태</option>
										<option value="pending">결제대기</option>
										<option value="paid">결제완료</option>
										<option value="refunded">환불완료</option>
										<option value="failed">결제실패</option>
									</select>
								</div>

								{/* 날짜 필터 */}
								<div>
									<input
										type="date"
										value={filterDate}
										onChange={(e) => setFilterDate(e.target.value)}
										className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none"
										aria-label="날짜 필터"
									/>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* 예약 목록 */}
					{loading ? (
						<div className="text-center py-12">
							<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#005BAC] mx-auto mb-4"></div>
							<p className="text-gray-600">예약 목록을 불러오는 중...</p>
						</div>
					) : paginatedReservations.length > 0 ? (
						<Card>
							<CardContent className="p-0">
								<div className="overflow-x-auto">
									<table className="w-full">
										<thead className="bg-gray-50">
											<tr>
												<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
													예약정보
												</th>
												<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
													고객정보
												</th>
												<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
													상품정보
												</th>
												<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
													상태
												</th>
												<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
													금액
												</th>
												<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
													액션
												</th>
											</tr>
										</thead>
										<tbody className="bg-white divide-y divide-gray-200">
											{paginatedReservations.map((reservation) => (
												<tr key={reservation.id} className="hover:bg-gray-50">
													<td className="px-6 py-4 whitespace-nowrap">
														<div className="text-sm">
															<div className="font-medium text-gray-900">
																{reservation.orderNumber}
															</div>
															<div className="text-gray-500">
																{formatDate(reservation.reservationDate)} {reservation.reservationTime}
															</div>
															<div className="text-gray-400 text-xs">
																{formatDate(reservation.createdAt.split('T')[0])} 예약
															</div>
														</div>
													</td>
													<td className="px-6 py-4 whitespace-nowrap">
														<div className="text-sm">
															<div className="font-medium text-gray-900">
																{reservation.customerName}
															</div>
															<div className="text-gray-500 flex items-center space-x-1">
																<Phone className="w-3 h-3" />
																<span>{reservation.customerPhone}</span>
															</div>
															{reservation.customerEmail && (
																<div className="text-gray-500 flex items-center space-x-1">
																	<Mail className="w-3 h-3" />
																	<span>{reservation.customerEmail}</span>
																</div>
															)}
														</div>
													</td>
													<td className="px-6 py-4 whitespace-nowrap">
														<div className="text-sm">
															<div className="font-medium text-gray-900">
																{reservation.productName}
															</div>
															<div className="text-gray-500 flex items-center space-x-1">
																<Users className="w-3 h-3" />
																<span>
																	대인 {reservation.adultCount}명
																	{reservation.childCount > 0 && `, 소인 ${reservation.childCount}명`}
																	{reservation.infantCount > 0 && `, 유아 ${reservation.infantCount}명`}
																</span>
															</div>
														</div>
													</td>
													<td className="px-6 py-4 whitespace-nowrap">
														<div className="space-y-2">
															{getStatusBadge(reservation.status)}
															{getPaymentStatusBadge(reservation.paymentStatus)}
														</div>
													</td>
													<td className="px-6 py-4 whitespace-nowrap">
														<div className="text-sm font-medium text-gray-900">
															{formatPrice(reservation.totalAmount)}원
														</div>
													</td>
													<td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
														<div className="flex space-x-2">
															<Button
																variant="outline"
																size="sm"
																className="flex items-center space-x-1"
															>
																<Eye className="w-3 h-3" />
																<span>상세</span>
															</Button>
															{reservation.status === 'pending' && (
																<Button
																	size="sm"
																	onClick={() => handleStatusChange(reservation.id, 'confirmed')}
																	className="bg-green-600 hover:bg-green-700 text-white"
																>
																	승인
																</Button>
															)}
														</div>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</CardContent>
						</Card>
					) : (
						<Card>
							<CardContent className="p-12 text-center">
								<Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
								<h3 className="text-xl font-semibold text-gray-900 mb-2">예약 내역이 없습니다</h3>
								<p className="text-gray-600">검색 조건에 맞는 예약이 없습니다.</p>
							</CardContent>
						</Card>
					)}

					{/* 페이지네이션 */}
					{totalPages > 1 && (
						<div className="flex justify-center">
							<div className="flex items-center space-x-2">
								<Button
									variant="outline"
									size="sm"
									onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
									disabled={currentPage === 1}
								>
									이전
								</Button>

								{Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
									const pageNum = currentPage <= 3 ? i + 1 : currentPage - 2 + i;
									if (pageNum > totalPages) return null;
									
									return (
										<Button
											key={pageNum}
											variant={currentPage === pageNum ? "default" : "outline"}
											size="sm"
											onClick={() => setCurrentPage(pageNum)}
											className={currentPage === pageNum ? "bg-[#005BAC] hover:bg-[#004494]" : ""}
										>
											{pageNum}
										</Button>
									);
								})}

								<Button
									variant="outline"
									size="sm"
									onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
									disabled={currentPage === totalPages}
								>
									다음
								</Button>
							</div>
						</div>
					)}
				</div>
			</AdminLayout>
		</AdminAuthGuard>
	);
}
