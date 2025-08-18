"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminAuthGuard from "@/components/admin/AdminAuthGuard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
	BarChart3,
	TrendingUp,
	TrendingDown,
	Calendar,
	Users,
	Ship,
	DollarSign,
	Clock,
	Filter,
	Download,
	RefreshCw,
	CheckCircle,
	AlertCircle,
	XCircle,
	Star,
	MapPin
} from "lucide-react";

// 통계 데이터 타입
interface ReservationStats {
	totalReservations: number;
	totalRevenue: number;
	totalGuests: number;
	averageGroupSize: number;
	monthlyGrowth: number;
	revenueGrowth: number;
	topCruise: string;
	peakTime: string;
}

interface StatusStats {
	confirmed: number;
	pending: number;
	cancelled: number;
	completed: number;
}

interface MonthlyData {
	month: string;
	reservations: number;
	revenue: number;
	guests: number;
}

interface CruiseStats {
	name: string;
	reservations: number;
	revenue: number;
	averageRating: number;
	capacity: number;
}

interface TimeSlotStats {
	time: string;
	reservations: number;
	revenue: number;
}

// 더미 통계 데이터
const dummyStats: ReservationStats = {
	totalReservations: 1247,
	totalRevenue: 156780000,
	totalGuests: 3891,
	averageGroupSize: 3.1,
	monthlyGrowth: 12.5,
	revenueGrowth: 18.3,
	topCruise: "불꽃 크루즈",
	peakTime: "19:00-20:00"
};

const dummyStatusStats: StatusStats = {
	confirmed: 856,
	pending: 124,
	cancelled: 89,
	completed: 178
};

const dummyMonthlyData: MonthlyData[] = [
	{ month: "2023-08", reservations: 89, revenue: 11200000, guests: 267 },
	{ month: "2023-09", reservations: 102, revenue: 12850000, guests: 318 },
	{ month: "2023-10", reservations: 95, revenue: 11950000, guests: 289 },
	{ month: "2023-11", reservations: 78, revenue: 9800000, guests: 234 },
	{ month: "2023-12", reservations: 134, revenue: 16900000, guests: 402 },
	{ month: "2024-01", reservations: 156, revenue: 19680000, guests: 468 },
	{ month: "2024-02", reservations: 142, revenue: 17890000, guests: 426 }
];

const dummyCruiseStats: CruiseStats[] = [
	{
		name: "불꽃 크루즈",
		reservations: 423,
		revenue: 58420000,
		averageRating: 4.8,
		capacity: 200
	},
	{
		name: "낙조 크루즈",
		reservations: 356,
		revenue: 42720000,
		averageRating: 4.6,
		capacity: 150
	},
	{
		name: "행복 크루즈 2회",
		reservations: 289,
		revenue: 28900000,
		averageRating: 4.5,
		capacity: 100
	},
	{
		name: "패키지 여행 A",
		reservations: 134,
		revenue: 22780000,
		averageRating: 4.9,
		capacity: 80
	},
	{
		name: "행복 크루즈 4회",
		reservations: 45,
		revenue: 3960000,
		averageRating: 4.3,
		capacity: 120
	}
];

const dummyTimeSlotStats: TimeSlotStats[] = [
	{ time: "09:00", reservations: 89, revenue: 8900000 },
	{ time: "10:00", reservations: 156, revenue: 15600000 },
	{ time: "11:00", reservations: 134, revenue: 13400000 },
	{ time: "13:00", reservations: 98, revenue: 9800000 },
	{ time: "14:00", reservations: 112, revenue: 11200000 },
	{ time: "15:00", reservations: 87, revenue: 8700000 },
	{ time: "17:30", reservations: 234, revenue: 23400000 },
	{ time: "18:30", reservations: 189, revenue: 18900000 },
	{ time: "19:00", reservations: 267, revenue: 26700000 },
	{ time: "20:30", reservations: 201, revenue: 20100000 }
];

export default function ReservationStatsPage() {
	const [stats, setStats] = useState<ReservationStats>(dummyStats);
	const [statusStats, setStatusStats] = useState<StatusStats>(dummyStatusStats);
	const [monthlyData, setMonthlyData] = useState<MonthlyData[]>(dummyMonthlyData);
	const [cruiseStats, setCruiseStats] = useState<CruiseStats[]>(dummyCruiseStats);
	const [timeSlotStats, setTimeSlotStats] = useState<TimeSlotStats[]>(dummyTimeSlotStats);
	const [loading, setLoading] = useState(true);
	const [selectedPeriod, setSelectedPeriod] = useState<"week" | "month" | "quarter" | "year">("month");

	// 데이터 로드
	useEffect(() => {
		const loadStats = async () => {
			try {
				// 실제로는 API 호출
				await new Promise(resolve => setTimeout(resolve, 1000));
				setStats(dummyStats);
				setStatusStats(dummyStatusStats);
				setMonthlyData(dummyMonthlyData);
				setCruiseStats(dummyCruiseStats);
				setTimeSlotStats(dummyTimeSlotStats);
			} catch (error) {
				console.error('Stats load error:', error);
			} finally {
				setLoading(false);
			}
		};

		loadStats();
	}, [selectedPeriod]);

	// 가격 포맷
	const formatPrice = (price: number) => {
		return (price / 10000).toLocaleString('ko-KR') + '만원';
	};

	// 숫자 포맷
	const formatNumber = (num: number) => {
		return num.toLocaleString('ko-KR');
	};

	// 퍼센트 포맷
	const formatPercent = (percent: number) => {
		return `${percent > 0 ? '+' : ''}${percent.toFixed(1)}%`;
	};

	// 월 이름 변환
	const getMonthName = (monthStr: string) => {
		const date = new Date(monthStr + '-01');
		return `${date.getFullYear()}년 ${date.getMonth() + 1}월`;
	};

	// 데이터 새로고침
	const refreshData = async () => {
		setLoading(true);
		// 실제로는 API 재호출
		await new Promise(resolve => setTimeout(resolve, 1000));
		setLoading(false);
	};

	if (loading) {
		return (
			<AdminAuthGuard requiredPermission="reservation">
				<AdminLayout>
					<div className="text-center py-12">
						<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#005BAC] mx-auto mb-4"></div>
						<p className="text-gray-600">통계 데이터를 불러오는 중...</p>
					</div>
				</AdminLayout>
			</AdminAuthGuard>
		);
	}

	return (
		<AdminAuthGuard requiredPermission="reservation">
			<AdminLayout>
				<div className="space-y-6">
					{/* 헤더 */}
					<div className="flex items-center justify-between">
						<div>
							<h1 className="text-3xl font-bold text-gray-900">예약 통계</h1>
							<p className="text-gray-600">예약 현황과 매출 분석을 확인하세요</p>
						</div>
						<div className="flex items-center space-x-4">
							{/* 기간 선택 */}
							<div className="flex items-center space-x-2">
								<Filter className="w-4 h-4 text-gray-500" />
								<select
									value={selectedPeriod}
									onChange={(e) => setSelectedPeriod(e.target.value as "week" | "month" | "quarter" | "year")}
									className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none"
									aria-label="기간 선택"
								>
									<option value="week">최근 1주</option>
									<option value="month">최근 1개월</option>
									<option value="quarter">최근 3개월</option>
									<option value="year">최근 1년</option>
								</select>
							</div>
							<Button
								variant="outline"
								onClick={refreshData}
								disabled={loading}
								className="flex items-center space-x-2"
							>
								<RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
								<span>새로고침</span>
							</Button>
							<Button className="bg-[#005BAC] hover:bg-[#004494] flex items-center space-x-2">
								<Download className="w-4 h-4" />
								<span>리포트 다운로드</span>
							</Button>
						</div>
					</div>

					{/* 주요 지표 카드 */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						<Card>
							<CardContent className="p-6">
								<div className="flex items-center space-x-4">
									<div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
										<Calendar className="w-6 h-6 text-blue-600" />
									</div>
									<div className="flex-1">
										<p className="text-sm text-gray-600">총 예약 수</p>
										<p className="text-2xl font-bold text-gray-900">{formatNumber(stats.totalReservations)}</p>
										<div className="flex items-center mt-1">
											{stats.monthlyGrowth > 0 ? (
												<TrendingUp className="w-4 h-4 text-green-500 mr-1" />
											) : (
												<TrendingDown className="w-4 h-4 text-red-500 mr-1" />
											)}
											<span className={`text-sm ${stats.monthlyGrowth > 0 ? 'text-green-600' : 'text-red-600'}`}>
												{formatPercent(stats.monthlyGrowth)}
											</span>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardContent className="p-6">
								<div className="flex items-center space-x-4">
									<div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
										<DollarSign className="w-6 h-6 text-green-600" />
									</div>
									<div className="flex-1">
										<p className="text-sm text-gray-600">총 매출</p>
										<p className="text-2xl font-bold text-gray-900">{formatPrice(stats.totalRevenue)}</p>
										<div className="flex items-center mt-1">
											{stats.revenueGrowth > 0 ? (
												<TrendingUp className="w-4 h-4 text-green-500 mr-1" />
											) : (
												<TrendingDown className="w-4 h-4 text-red-500 mr-1" />
											)}
											<span className={`text-sm ${stats.revenueGrowth > 0 ? 'text-green-600' : 'text-red-600'}`}>
												{formatPercent(stats.revenueGrowth)}
											</span>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardContent className="p-6">
								<div className="flex items-center space-x-4">
									<div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
										<Users className="w-6 h-6 text-purple-600" />
									</div>
									<div className="flex-1">
										<p className="text-sm text-gray-600">총 이용객</p>
										<p className="text-2xl font-bold text-gray-900">{formatNumber(stats.totalGuests)}</p>
										<p className="text-sm text-gray-500 mt-1">
											평균 {stats.averageGroupSize}명/그룹
										</p>
									</div>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardContent className="p-6">
								<div className="flex items-center space-x-4">
									<div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
										<Star className="w-6 h-6 text-orange-600" />
									</div>
									<div className="flex-1">
										<p className="text-sm text-gray-600">인기 상품</p>
										<p className="text-lg font-bold text-gray-900">{stats.topCruise}</p>
										<p className="text-sm text-gray-500 mt-1">
											피크타임: {stats.peakTime}
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>

					{/* 예약 상태별 통계 */}
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center space-x-2">
								<BarChart3 className="w-5 h-5 text-[#005BAC]" />
								<span>예약 상태별 현황</span>
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
								<div className="text-center">
									<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
										<CheckCircle className="w-8 h-8 text-green-600" />
									</div>
									<p className="text-2xl font-bold text-gray-900">{formatNumber(statusStats.confirmed)}</p>
									<p className="text-sm text-gray-600">확정 예약</p>
									<div className="w-full bg-gray-200 rounded-full h-2 mt-2">
										<div 
											className="bg-green-600 h-2 rounded-full" 
											style={{ width: `${(statusStats.confirmed / stats.totalReservations) * 100}%` }}
										></div>
									</div>
								</div>
								<div className="text-center">
									<div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
										<AlertCircle className="w-8 h-8 text-yellow-600" />
									</div>
									<p className="text-2xl font-bold text-gray-900">{formatNumber(statusStats.pending)}</p>
									<p className="text-sm text-gray-600">대기 예약</p>
									<div className="w-full bg-gray-200 rounded-full h-2 mt-2">
										<div 
											className="bg-yellow-600 h-2 rounded-full" 
											style={{ width: `${(statusStats.pending / stats.totalReservations) * 100}%` }}
										></div>
									</div>
								</div>
								<div className="text-center">
									<div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
										<XCircle className="w-8 h-8 text-red-600" />
									</div>
									<p className="text-2xl font-bold text-gray-900">{formatNumber(statusStats.cancelled)}</p>
									<p className="text-sm text-gray-600">취소 예약</p>
									<div className="w-full bg-gray-200 rounded-full h-2 mt-2">
										<div 
											className="bg-red-600 h-2 rounded-full" 
											style={{ width: `${(statusStats.cancelled / stats.totalReservations) * 100}%` }}
										></div>
									</div>
								</div>
								<div className="text-center">
									<div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
										<CheckCircle className="w-8 h-8 text-blue-600" />
									</div>
									<p className="text-2xl font-bold text-gray-900">{formatNumber(statusStats.completed)}</p>
									<p className="text-sm text-gray-600">완료 예약</p>
									<div className="w-full bg-gray-200 rounded-full h-2 mt-2">
										<div 
											className="bg-blue-600 h-2 rounded-full" 
											style={{ width: `${(statusStats.completed / stats.totalReservations) * 100}%` }}
										></div>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>

					<div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
						{/* 월별 트렌드 */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center space-x-2">
									<TrendingUp className="w-5 h-5 text-[#005BAC]" />
									<span>월별 예약 트렌드</span>
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									{monthlyData.map((data, index) => {
										const maxReservations = Math.max(...monthlyData.map(d => d.reservations));
										const percentage = (data.reservations / maxReservations) * 100;
										
										return (
											<div key={data.month} className="space-y-2">
												<div className="flex items-center justify-between">
													<span className="text-sm font-medium text-gray-700">
														{getMonthName(data.month)}
													</span>
													<span className="text-sm text-gray-600">
														{formatNumber(data.reservations)}건
													</span>
												</div>
												<div className="w-full bg-gray-200 rounded-full h-3">
													<div 
														className="bg-[#005BAC] h-3 rounded-full transition-all duration-500"
														style={{ width: `${percentage}%` }}
													></div>
												</div>
												<div className="flex items-center justify-between text-xs text-gray-500">
													<span>{formatPrice(data.revenue)}</span>
													<span>{formatNumber(data.guests)}명</span>
												</div>
											</div>
										);
									})}
								</div>
							</CardContent>
						</Card>

						{/* 크루즈별 성과 */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center space-x-2">
									<Ship className="w-5 h-5 text-[#005BAC]" />
									<span>크루즈별 성과</span>
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									{cruiseStats.map((cruise, index) => {
										const utilizationRate = (cruise.reservations / cruise.capacity) * 100;
										
										return (
											<div key={cruise.name} className="border border-gray-200 rounded-lg p-4">
												<div className="flex items-center justify-between mb-2">
													<h4 className="font-semibold text-gray-900">{cruise.name}</h4>
													<div className="flex items-center space-x-1">
														<Star className="w-4 h-4 text-yellow-500" />
														<span className="text-sm text-gray-600">{cruise.averageRating}</span>
													</div>
												</div>
												<div className="grid grid-cols-2 gap-4 text-sm">
													<div>
														<p className="text-gray-600">예약 수</p>
														<p className="font-semibold">{formatNumber(cruise.reservations)}건</p>
													</div>
													<div>
														<p className="text-gray-600">매출</p>
														<p className="font-semibold">{formatPrice(cruise.revenue)}</p>
													</div>
												</div>
												<div className="mt-3">
													<div className="flex items-center justify-between text-xs text-gray-600 mb-1">
														<span>이용률</span>
														<span>{utilizationRate.toFixed(1)}%</span>
													</div>
													<div className="w-full bg-gray-200 rounded-full h-2">
														<div 
															className={`h-2 rounded-full ${
																utilizationRate >= 80 ? 'bg-green-500' :
																utilizationRate >= 60 ? 'bg-yellow-500' : 'bg-red-500'
															}`}
															style={{ width: `${Math.min(utilizationRate, 100)}%` }}
														></div>
													</div>
												</div>
											</div>
										);
									})}
								</div>
							</CardContent>
						</Card>
					</div>

					{/* 시간대별 예약 현황 */}
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center space-x-2">
								<Clock className="w-5 h-5 text-[#005BAC]" />
								<span>시간대별 예약 현황</span>
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-4">
								{timeSlotStats.map((slot) => {
									const maxReservations = Math.max(...timeSlotStats.map(s => s.reservations));
									const percentage = (slot.reservations / maxReservations) * 100;
									
									return (
										<div key={slot.time} className="text-center">
											<div className="mb-2">
												<div 
													className="bg-[#005BAC] rounded-t mx-auto transition-all duration-500"
													style={{ 
														height: `${Math.max(percentage, 10)}px`,
														width: '20px'
													}}
												></div>
												<div className="w-5 h-1 bg-gray-300 mx-auto"></div>
											</div>
											<p className="text-xs font-medium text-gray-900">{slot.time}</p>
											<p className="text-xs text-gray-600">{slot.reservations}건</p>
											<p className="text-xs text-gray-500">{formatPrice(slot.revenue)}</p>
										</div>
									);
								})}
							</div>
						</CardContent>
					</Card>
				</div>
			</AdminLayout>
		</AdminAuthGuard>
	);
}
