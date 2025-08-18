"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminAuthGuard from "@/components/admin/AdminAuthGuard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
	Calendar,
	ChevronLeft,
	ChevronRight,
	Filter,
	Eye,
	Users,
	Clock,
	Ship,
	MapPin,
	Phone,
	Mail,
	CheckCircle,
	AlertCircle,
	XCircle,
	MoreHorizontal
} from "lucide-react";

// 예약 상태 타입
type ReservationStatus = "confirmed" | "pending" | "cancelled" | "completed";

// 예약 데이터 타입
interface Reservation {
	id: number;
	customerName: string;
	customerPhone: string;
	customerEmail: string;
	cruiseName: string;
	date: string;
	time: string;
	adultCount: number;
	childCount: number;
	totalAmount: number;
	status: ReservationStatus;
	paymentStatus: "paid" | "pending" | "failed";
	createdAt: string;
	specialRequests?: string;
}

// 더미 예약 데이터
const dummyReservations: Reservation[] = [
	{
		id: 1,
		customerName: "김민수",
		customerPhone: "010-1234-5678",
		customerEmail: "minsu@example.com",
		cruiseName: "불꽃 크루즈",
		date: "2024-02-15",
		time: "19:00",
		adultCount: 2,
		childCount: 1,
		totalAmount: 95000,
		status: "confirmed",
		paymentStatus: "paid",
		createdAt: "2024-02-01T10:30:00Z",
		specialRequests: "아이 의자 필요"
	},
	{
		id: 2,
		customerName: "이영희",
		customerPhone: "010-9876-5432",
		customerEmail: "younghee@example.com",
		cruiseName: "낙조 크루즈",
		date: "2024-02-15",
		time: "17:30",
		adultCount: 4,
		childCount: 0,
		totalAmount: 128000,
		status: "pending",
		paymentStatus: "pending",
		createdAt: "2024-02-14T15:20:00Z"
	},
	{
		id: 3,
		customerName: "박철수",
		customerPhone: "010-5555-1234",
		customerEmail: "chulsoo@example.com",
		cruiseName: "행복 크루즈 2회",
		date: "2024-02-16",
		time: "10:00",
		adultCount: 2,
		childCount: 2,
		totalAmount: 96000,
		status: "confirmed",
		paymentStatus: "paid",
		createdAt: "2024-02-10T09:15:00Z"
	},
	{
		id: 4,
		customerName: "최수진",
		customerPhone: "010-7777-8888",
		customerEmail: "sujin@example.com",
		cruiseName: "패키지 여행 A",
		date: "2024-02-17",
		time: "10:00",
		adultCount: 2,
		childCount: 0,
		totalAmount: 170000,
		status: "confirmed",
		paymentStatus: "paid",
		createdAt: "2024-02-05T14:45:00Z"
	},
	{
		id: 5,
		customerName: "정민호",
		customerPhone: "010-3333-4444",
		customerEmail: "minho@example.com",
		cruiseName: "불꽃 크루즈",
		date: "2024-02-18",
		time: "20:30",
		adultCount: 3,
		childCount: 1,
		totalAmount: 140000,
		status: "cancelled",
		paymentStatus: "failed",
		createdAt: "2024-02-12T11:30:00Z"
	}
];

export default function ReservationCalendarPage() {
	const [currentDate, setCurrentDate] = useState(new Date());
	const [reservations, setReservations] = useState<Reservation[]>([]);
	const [selectedDate, setSelectedDate] = useState<string | null>(null);
	const [filterStatus, setFilterStatus] = useState<ReservationStatus | "all">("all");
	const [loading, setLoading] = useState(true);

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

	// 월 변경
	const changeMonth = (direction: 'prev' | 'next') => {
		setCurrentDate(prev => {
			const newDate = new Date(prev);
			if (direction === 'prev') {
				newDate.setMonth(prev.getMonth() - 1);
			} else {
				newDate.setMonth(prev.getMonth() + 1);
			}
			return newDate;
		});
	};

	// 달력 날짜 생성
	const generateCalendarDays = () => {
		const year = currentDate.getFullYear();
		const month = currentDate.getMonth();
		
		const firstDay = new Date(year, month, 1);
		const lastDay = new Date(year, month + 1, 0);
		const startDate = new Date(firstDay);
		startDate.setDate(firstDay.getDate() - firstDay.getDay());
		
		const days = [];
		const endDate = new Date(startDate);
		endDate.setDate(startDate.getDate() + 41); // 6주
		
		for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
			days.push(new Date(date));
		}
		
		return days;
	};

	// 특정 날짜의 예약 가져오기
	const getReservationsForDate = (date: Date) => {
		const dateStr = date.toISOString().split('T')[0];
		return reservations.filter(reservation => 
			reservation.date === dateStr && 
			(filterStatus === "all" || reservation.status === filterStatus)
		);
	};

	// 상태별 색상
	const getStatusColor = (status: ReservationStatus) => {
		switch (status) {
			case "confirmed": return "bg-green-100 text-green-800 border-green-200";
			case "pending": return "bg-yellow-100 text-yellow-800 border-yellow-200";
			case "cancelled": return "bg-red-100 text-red-800 border-red-200";
			case "completed": return "bg-blue-100 text-blue-800 border-blue-200";
			default: return "bg-gray-100 text-gray-800 border-gray-200";
		}
	};

	// 상태 아이콘
	const getStatusIcon = (status: ReservationStatus) => {
		switch (status) {
			case "confirmed": return <CheckCircle className="w-3 h-3" />;
			case "pending": return <AlertCircle className="w-3 h-3" />;
			case "cancelled": return <XCircle className="w-3 h-3" />;
			case "completed": return <CheckCircle className="w-3 h-3" />;
			default: return <AlertCircle className="w-3 h-3" />;
		}
	};

	// 상태명 한글
	const getStatusText = (status: ReservationStatus) => {
		switch (status) {
			case "confirmed": return "확정";
			case "pending": return "대기";
			case "cancelled": return "취소";
			case "completed": return "완료";
			default: return "알 수 없음";
		}
	};

	// 가격 포맷
	const formatPrice = (price: number) => {
		return price.toLocaleString('ko-KR');
	};

	// 선택된 날짜의 예약 목록
	const selectedDateReservations = selectedDate ? 
		reservations.filter(r => r.date === selectedDate && (filterStatus === "all" || r.status === filterStatus)) : 
		[];

	const calendarDays = generateCalendarDays();
	const today = new Date();
	const currentMonth = currentDate.getMonth();

	return (
		<AdminAuthGuard requiredPermission="reservation">
			<AdminLayout>
				<div className="space-y-6">
					{/* 헤더 */}
					<div className="flex items-center justify-between">
						<div>
							<h1 className="text-3xl font-bold text-gray-900">예약 캘린더</h1>
							<p className="text-gray-600">월별 예약 현황을 한눈에 확인하세요</p>
						</div>
						<div className="flex items-center space-x-4">
							{/* 상태 필터 */}
							<div className="flex items-center space-x-2">
								<Filter className="w-4 h-4 text-gray-500" />
								<select
									value={filterStatus}
									onChange={(e) => setFilterStatus(e.target.value as ReservationStatus | "all")}
									className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none"
									aria-label="예약 상태 필터"
								>
									<option value="all">모든 상태</option>
									<option value="confirmed">확정</option>
									<option value="pending">대기</option>
									<option value="cancelled">취소</option>
									<option value="completed">완료</option>
								</select>
							</div>
						</div>
					</div>

					<div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
						{/* 달력 */}
						<div className="xl:col-span-2">
							<Card>
								<CardHeader>
									<div className="flex items-center justify-between">
										<CardTitle className="flex items-center space-x-2">
											<Calendar className="w-5 h-5 text-[#005BAC]" />
											<span>{currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월</span>
										</CardTitle>
										<div className="flex items-center space-x-2">
											<Button
												variant="outline"
												size="sm"
												onClick={() => changeMonth('prev')}
											>
												<ChevronLeft className="w-4 h-4" />
											</Button>
											<Button
												variant="outline"
												size="sm"
												onClick={() => setCurrentDate(new Date())}
											>
												오늘
											</Button>
											<Button
												variant="outline"
												size="sm"
												onClick={() => changeMonth('next')}
											>
												<ChevronRight className="w-4 h-4" />
											</Button>
										</div>
									</div>
								</CardHeader>
								<CardContent>
									{loading ? (
										<div className="text-center py-12">
											<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#005BAC] mx-auto mb-4"></div>
											<p className="text-gray-600">예약 데이터를 불러오는 중...</p>
										</div>
									) : (
										<div className="space-y-4">
											{/* 요일 헤더 */}
											<div className="grid grid-cols-7 gap-1">
												{['일', '월', '화', '수', '목', '금', '토'].map(day => (
													<div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
														{day}
													</div>
												))}
											</div>

											{/* 달력 날짜 */}
											<div className="grid grid-cols-7 gap-1">
												{calendarDays.map((date, index) => {
													const dateStr = date.toISOString().split('T')[0];
													const dayReservations = getReservationsForDate(date);
													const isCurrentMonth = date.getMonth() === currentMonth;
													const isToday = date.toDateString() === today.toDateString();
													const isSelected = selectedDate === dateStr;

													return (
														<button
															key={index}
															onClick={() => setSelectedDate(dateStr)}
															className={`
																p-2 min-h-[80px] border rounded-lg text-left transition-all duration-200
																${isCurrentMonth ? 'bg-white' : 'bg-gray-50 text-gray-400'}
																${isToday && !isSelected ? 'ring-2 ring-[#005BAC] ring-opacity-50' : ''}
																${isSelected ? 'ring-2 ring-green-500 ring-opacity-70 bg-green-50' : 'hover:bg-gray-50'}
																${dayReservations.length > 0 && !isSelected && !isToday ? 'border-[#005BAC] border-opacity-30' : 'border-gray-200'}
															`}
														>
															<div className="flex items-center justify-between mb-1">
																<span className={`text-sm font-medium ${
																	isSelected ? 'text-green-700' : 
																	isToday ? 'text-[#005BAC]' : 
																	isCurrentMonth ? 'text-gray-900' : 'text-gray-400'
																}`}>
																	{date.getDate()}
																</span>
																{dayReservations.length > 0 && (
																	<Badge 
																		variant="secondary" 
																		className={`text-xs px-1.5 py-0.5 ${
																			isSelected 
																				? 'bg-green-600 text-white' 
																				: 'bg-[#005BAC] text-white'
																		}`}
																	>
																		{dayReservations.length}
																	</Badge>
																)}
															</div>
															<div className="space-y-1">
																{dayReservations.slice(0, 2).map(reservation => (
																	<div
																		key={reservation.id}
																		className={`text-xs p-1 rounded truncate ${
																			isSelected 
																				? 'bg-green-200 text-green-800' 
																				: getStatusColor(reservation.status)
																		}`}
																	>
																		{reservation.time} {reservation.cruiseName}
																	</div>
																))}
																{dayReservations.length > 2 && (
																	<div className={`text-xs ${isSelected ? 'text-green-600' : 'text-gray-500'}`}>
																		+{dayReservations.length - 2}개 더
																	</div>
																)}
															</div>
														</button>
													);
												})}
											</div>
										</div>
									)}
								</CardContent>
							</Card>
						</div>

						{/* 선택된 날짜 예약 목록 */}
						<div>
							<Card>
								<CardHeader>
									<CardTitle className="flex items-center space-x-2">
										<Eye className="w-5 h-5 text-[#005BAC]" />
										<span>
											{selectedDate 
												? `${new Date(selectedDate + 'T00:00:00').toLocaleDateString('ko-KR')} 예약`
												: "날짜를 선택하세요"
											}
										</span>
									</CardTitle>
								</CardHeader>
								<CardContent>
									{!selectedDate ? (
										<div className="text-center py-8">
											<Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
											<p className="text-gray-600">달력에서 날짜를 선택하면</p>
											<p className="text-gray-600">해당 날짜의 예약을 확인할 수 있습니다</p>
										</div>
									) : selectedDateReservations.length === 0 ? (
										<div className="text-center py-8">
											<Ship className="w-12 h-12 text-gray-400 mx-auto mb-4" />
											<p className="text-gray-600">선택한 날짜에</p>
											<p className="text-gray-600">예약이 없습니다</p>
										</div>
									) : (
										<div className="space-y-4 max-h-96 overflow-y-auto">
											{selectedDateReservations.map(reservation => (
												<div key={reservation.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
													<div className="flex items-start justify-between mb-3">
														<div>
															<h4 className="font-semibold text-gray-900 mb-1">
																{reservation.customerName}
															</h4>
															<div className="flex items-center space-x-2">
																<Badge className={`text-xs flex items-center space-x-1 ${getStatusColor(reservation.status)}`}>
																	{getStatusIcon(reservation.status)}
																	<span>{getStatusText(reservation.status)}</span>
																</Badge>
															</div>
														</div>
														<Button variant="ghost" size="sm">
															<MoreHorizontal className="w-4 h-4" />
														</Button>
													</div>

													<div className="space-y-2 text-sm text-gray-600">
														<div className="flex items-center space-x-2">
															<Ship className="w-4 h-4 text-gray-400" />
															<span>{reservation.cruiseName}</span>
														</div>
														<div className="flex items-center space-x-2">
															<Clock className="w-4 h-4 text-gray-400" />
															<span>{reservation.time}</span>
														</div>
														<div className="flex items-center space-x-2">
															<Users className="w-4 h-4 text-gray-400" />
															<span>대인 {reservation.adultCount}명, 소인 {reservation.childCount}명</span>
														</div>
														<div className="flex items-center space-x-2">
															<Phone className="w-4 h-4 text-gray-400" />
															<span>{reservation.customerPhone}</span>
														</div>
														<div className="flex items-center space-x-2">
															<Mail className="w-4 h-4 text-gray-400" />
															<span>{reservation.customerEmail}</span>
														</div>
													</div>

													<div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
														<div className="text-lg font-bold text-[#005BAC]">
															{formatPrice(reservation.totalAmount)}원
														</div>
														<div className="flex space-x-2">
															<Button variant="outline" size="sm">
																<Eye className="w-3 h-3 mr-1" />
																상세
															</Button>
														</div>
													</div>

													{reservation.specialRequests && (
														<div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-sm">
															<span className="font-medium text-yellow-800">특별 요청: </span>
															<span className="text-yellow-700">{reservation.specialRequests}</span>
														</div>
													)}
												</div>
											))}
										</div>
									)}
								</CardContent>
							</Card>
						</div>
					</div>

					{/* 통계 카드 */}
					<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
						<Card>
							<CardContent className="p-4">
								<div className="flex items-center space-x-3">
									<div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
										<CheckCircle className="w-5 h-5 text-green-600" />
									</div>
									<div>
										<p className="text-sm text-gray-600">확정 예약</p>
										<p className="text-2xl font-bold text-gray-900">
											{reservations.filter(r => r.status === 'confirmed').length}
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
						<Card>
							<CardContent className="p-4">
								<div className="flex items-center space-x-3">
									<div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
										<AlertCircle className="w-5 h-5 text-yellow-600" />
									</div>
									<div>
										<p className="text-sm text-gray-600">대기 예약</p>
										<p className="text-2xl font-bold text-gray-900">
											{reservations.filter(r => r.status === 'pending').length}
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
						<Card>
							<CardContent className="p-4">
								<div className="flex items-center space-x-3">
									<div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
										<XCircle className="w-5 h-5 text-red-600" />
									</div>
									<div>
										<p className="text-sm text-gray-600">취소 예약</p>
										<p className="text-2xl font-bold text-gray-900">
											{reservations.filter(r => r.status === 'cancelled').length}
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
						<Card>
							<CardContent className="p-4">
								<div className="flex items-center space-x-3">
									<div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
										<Users className="w-5 h-5 text-blue-600" />
									</div>
									<div>
										<p className="text-sm text-gray-600">총 예약자</p>
										<p className="text-2xl font-bold text-gray-900">
											{reservations.reduce((sum, r) => sum + r.adultCount + r.childCount, 0)}
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</AdminLayout>
		</AdminAuthGuard>
	);
}
