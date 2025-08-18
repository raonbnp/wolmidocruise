"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminAuthGuard from "@/components/admin/AdminAuthGuard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
	BarChart3,
	TrendingUp,
	TrendingDown,
	Users,
	Calendar,
	Ship,
	DollarSign,
	Eye,
	MessageSquare,
	Star,
	Clock,
	MapPin,
	Phone,
	CreditCard,
	Activity,
	PieChart,
	LineChart,
	RefreshCw,
	Filter,
	Download,
	Calendar as CalendarIcon,
	ArrowUpRight,
	ArrowDownRight,
	Minus
} from "lucide-react";

// 전체 통계 데이터 타입
interface SiteStats {
	// 핵심 지표
	totalRevenue: number;
	monthlyRevenue: number;
	revenueGrowth: number;
	totalReservations: number;
	monthlyReservations: number;
	reservationGrowth: number;
	totalMembers: number;
	monthlyMembers: number;
	memberGrowth: number;
	totalCruises: number;
	activeCruises: number;
	
	// 예약 현황
	reservationStats: {
		pending: number;
		confirmed: number;
		completed: number;
		cancelled: number;
	};
	
	// 크루즈별 통계
	cruiseStats: CruiseStat[];
	
	// 월별 매출 트렌드
	monthlyRevenueData: MonthlyRevenue[];
	
	// 예약 트렌드
	reservationTrends: ReservationTrend[];
	
	// 회원 통계
	memberStats: MemberStat[];
	
	// 인기 시간대
	popularTimes: PopularTime[];
	
	// 지역별 통계
	regionStats: RegionStat[];
	
	// 최근 활동
	recentActivities: RecentActivity[];
}

interface CruiseStat {
	id: number;
	name: string;
	category: string;
	totalBookings: number;
	revenue: number;
	averageRating: number;
	capacity: number;
	utilizationRate: number;
}

interface MonthlyRevenue {
	month: string;
	revenue: number;
	reservations: number;
	growth: number;
}

interface ReservationTrend {
	date: string;
	reservations: number;
	revenue: number;
	cancelRate: number;
}

interface MemberStat {
	type: string;
	count: number;
	percentage: number;
	growth: number;
}

interface PopularTime {
	timeSlot: string;
	bookings: number;
	percentage: number;
}

interface RegionStat {
	region: string;
	visitors: number;
	revenue: number;
	percentage: number;
}

interface RecentActivity {
	id: number;
	type: string;
	description: string;
	timestamp: string;
	status: 'success' | 'warning' | 'error' | 'info';
}

// 더미 통계 데이터
const dummyStats: SiteStats = {
	totalRevenue: 245680000,
	monthlyRevenue: 18420000,
	revenueGrowth: 15.2,
	totalReservations: 3420,
	monthlyReservations: 287,
	reservationGrowth: 8.7,
	totalMembers: 12580,
	monthlyMembers: 156,
	memberGrowth: 12.4,
	totalCruises: 15,
	activeCruises: 12,
	
	reservationStats: {
		pending: 45,
		confirmed: 182,
		completed: 1240,
		cancelled: 38
	},
	
	cruiseStats: [
		{
			id: 1,
			name: "불꽃 크루즈",
			category: "야간 크루즈",
			totalBookings: 890,
			revenue: 89000000,
			averageRating: 4.8,
			capacity: 120,
			utilizationRate: 78.5
		},
		{
			id: 2,
			name: "낙조 크루즈",
			category: "선셋 크루즈",
			totalBookings: 720,
			revenue: 72000000,
			averageRating: 4.6,
			capacity: 100,
			utilizationRate: 85.2
		},
		{
			id: 3,
			name: "행복 크루즈 1회",
			category: "일반 크루즈",
			totalBookings: 650,
			revenue: 45500000,
			averageRating: 4.4,
			capacity: 80,
			utilizationRate: 92.1
		},
		{
			id: 4,
			name: "패키지 여행 A",
			category: "패키지",
			totalBookings: 420,
			revenue: 63000000,
			averageRating: 4.9,
			capacity: 60,
			utilizationRate: 73.8
		}
	],
	
	monthlyRevenueData: [
		{ month: "2023-07", revenue: 15200000, reservations: 245, growth: 5.2 },
		{ month: "2023-08", revenue: 18600000, reservations: 298, growth: 22.4 },
		{ month: "2023-09", revenue: 16800000, reservations: 267, growth: -9.7 },
		{ month: "2023-10", revenue: 21400000, reservations: 342, growth: 27.4 },
		{ month: "2023-11", revenue: 19200000, reservations: 305, growth: -10.3 },
		{ month: "2023-12", revenue: 23800000, reservations: 378, growth: 23.9 },
		{ month: "2024-01", revenue: 18420000, reservations: 287, growth: -22.6 }
	],
	
	reservationTrends: [
		{ date: "2024-01-15", reservations: 12, revenue: 1200000, cancelRate: 5.2 },
		{ date: "2024-01-16", reservations: 18, revenue: 1800000, cancelRate: 3.8 },
		{ date: "2024-01-17", reservations: 15, revenue: 1500000, cancelRate: 6.1 },
		{ date: "2024-01-18", reservations: 22, revenue: 2200000, cancelRate: 4.5 },
		{ date: "2024-01-19", reservations: 19, revenue: 1900000, cancelRate: 7.2 },
		{ date: "2024-01-20", reservations: 25, revenue: 2500000, cancelRate: 2.8 },
		{ date: "2024-01-21", reservations: 16, revenue: 1600000, cancelRate: 5.9 }
	],
	
	memberStats: [
		{ type: "일반 회원", count: 8420, percentage: 66.9, growth: 8.2 },
		{ type: "VIP 회원", count: 2180, percentage: 17.3, growth: 15.7 },
		{ type: "기업 회원", count: 1240, percentage: 9.9, growth: 22.1 },
		{ type: "단체 회원", count: 740, percentage: 5.9, growth: 5.8 }
	],
	
	popularTimes: [
		{ timeSlot: "10:00-12:00", bookings: 420, percentage: 18.5 },
		{ timeSlot: "14:00-16:00", bookings: 680, percentage: 29.8 },
		{ timeSlot: "16:00-18:00", bookings: 520, percentage: 22.8 },
		{ timeSlot: "18:00-20:00", bookings: 380, percentage: 16.7 },
		{ timeSlot: "20:00-22:00", bookings: 280, percentage: 12.2 }
	],
	
	regionStats: [
		{ region: "인천", visitors: 4200, revenue: 84000000, percentage: 33.4 },
		{ region: "서울", visitors: 3800, revenue: 95000000, percentage: 30.2 },
		{ region: "경기", visitors: 2600, revenue: 52000000, percentage: 20.7 },
		{ region: "충청", visitors: 1200, revenue: 18000000, percentage: 9.5 },
		{ region: "기타", visitors: 780, revenue: 11700000, percentage: 6.2 }
	],
	
	recentActivities: [
		{
			id: 1,
			type: "reservation",
			description: "불꽃 크루즈 예약 15건 접수",
			timestamp: "2024-01-25T14:30:00Z",
			status: "success"
		},
		{
			id: 2,
			type: "member",
			description: "신규 VIP 회원 3명 가입",
			timestamp: "2024-01-25T13:15:00Z",
			status: "info"
		},
		{
			id: 3,
			type: "payment",
			description: "결제 실패 2건 발생",
			timestamp: "2024-01-25T12:45:00Z",
			status: "warning"
		},
		{
			id: 4,
			type: "cruise",
			description: "낙조 크루즈 정기점검 완료",
			timestamp: "2024-01-25T11:20:00Z",
			status: "success"
		},
		{
			id: 5,
			type: "system",
			description: "서버 응답시간 지연 감지",
			timestamp: "2024-01-25T10:30:00Z",
			status: "error"
		}
	]
};

export default function StatisticsPage() {
	const [stats, setStats] = useState<SiteStats | null>(null);
	const [loading, setLoading] = useState(true);
	const [selectedPeriod, setSelectedPeriod] = useState("30days");
	const [selectedTab, setSelectedTab] = useState("overview");

	// 데이터 로드
	useEffect(() => {
		const loadStats = async () => {
			try {
				// 실제로는 API 호출
				await new Promise(resolve => setTimeout(resolve, 1000));
				setStats(dummyStats);
			} catch (error) {
				console.error('Stats load error:', error);
			} finally {
				setLoading(false);
			}
		};

		loadStats();
	}, [selectedPeriod]);

	// 숫자 포맷
	const formatNumber = (num: number) => {
		if (num >= 100000000) {
			return (num / 100000000).toFixed(1) + '억';
		}
		if (num >= 10000) {
			return (num / 10000).toFixed(0) + '만';
		}
		if (num >= 1000) {
			return (num / 1000).toFixed(1) + 'K';
		}
		return num.toString();
	};

	// 통화 포맷
	const formatCurrency = (amount: number) => {
		return formatNumber(amount) + '원';
	};

	// 퍼센트 포맷
	const formatPercent = (num: number) => {
		return num.toFixed(1) + '%';
	};

	// 성장률 아이콘
	const getGrowthIcon = (growth: number) => {
		if (growth > 0) return <ArrowUpRight className="w-4 h-4 text-green-500" />;
		if (growth < 0) return <ArrowDownRight className="w-4 h-4 text-red-500" />;
		return <Minus className="w-4 h-4 text-gray-500" />;
	};

	// 성장률 색상
	const getGrowthColor = (growth: number) => {
		if (growth > 0) return "text-green-600";
		if (growth < 0) return "text-red-600";
		return "text-gray-600";
	};

	// 날짜 포맷
	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString('ko-KR');
	};

	// 시간 포맷
	const formatTime = (dateString: string) => {
		return new Date(dateString).toLocaleString('ko-KR');
	};

	// 활동 상태 색상
	const getActivityStatusColor = (status: string) => {
		switch (status) {
			case 'success': return 'bg-green-100 text-green-800';
			case 'warning': return 'bg-yellow-100 text-yellow-800';
			case 'error': return 'bg-red-100 text-red-800';
			case 'info': return 'bg-blue-100 text-blue-800';
			default: return 'bg-gray-100 text-gray-800';
		}
	};

	if (loading) {
		return (
			<AdminAuthGuard requiredPermission="statistics">
				<AdminLayout>
					<div className="text-center py-12">
						<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#005BAC] mx-auto mb-4"></div>
						<p className="text-gray-600">통계 데이터를 불러오는 중...</p>
					</div>
				</AdminLayout>
			</AdminAuthGuard>
		);
	}

	if (!stats) {
		return (
			<AdminAuthGuard requiredPermission="statistics">
				<AdminLayout>
					<div className="text-center py-12">
						<p className="text-red-600">통계 데이터를 불러올 수 없습니다.</p>
					</div>
				</AdminLayout>
			</AdminAuthGuard>
		);
	}

	return (
		<AdminAuthGuard requiredPermission="statistics">
			<AdminLayout>
				<div className="space-y-6">
					{/* 헤더 */}
					<div className="flex items-center justify-between">
						<div>
							<h1 className="text-3xl font-bold text-gray-900">통계 대시보드</h1>
							<p className="text-gray-600">전체 사이트 운영 현황을 한눈에 확인하세요</p>
						</div>
						<div className="flex items-center space-x-3">
							<select
								value={selectedPeriod}
								onChange={(e) => setSelectedPeriod(e.target.value)}
								className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none"
								aria-label="기간 선택"
							>
								<option value="7days">최근 7일</option>
								<option value="30days">최근 30일</option>
								<option value="3months">최근 3개월</option>
								<option value="6months">최근 6개월</option>
								<option value="1year">최근 1년</option>
							</select>
							<button
								onClick={() => window.location.reload()}
								className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
								title="데이터 새로고침"
							>
								<RefreshCw className="w-4 h-4" />
								<span>새로고침</span>
							</button>
							<button
								className="flex items-center space-x-2 px-4 py-2 bg-[#005BAC] text-white rounded-lg hover:bg-[#004494] transition-colors"
								title="리포트 다운로드"
							>
								<Download className="w-4 h-4" />
								<span>다운로드</span>
							</button>
						</div>
					</div>

					{/* 핵심 지표 */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						<Card>
							<CardContent className="p-6">
								<div className="flex items-center justify-between">
									<div>
										<p className="text-sm font-medium text-gray-600">총 매출</p>
										<p className="text-3xl font-bold text-gray-900">{formatCurrency(stats.totalRevenue)}</p>
										<div className={`flex items-center space-x-1 mt-1 ${getGrowthColor(stats.revenueGrowth)}`}>
											{getGrowthIcon(stats.revenueGrowth)}
											<span className="text-sm">{formatPercent(Math.abs(stats.revenueGrowth))} 이번 달</span>
										</div>
									</div>
									<DollarSign className="h-8 w-8 text-green-400" />
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardContent className="p-6">
								<div className="flex items-center justify-between">
									<div>
										<p className="text-sm font-medium text-gray-600">총 예약</p>
										<p className="text-3xl font-bold text-blue-600">{formatNumber(stats.totalReservations)}</p>
										<div className={`flex items-center space-x-1 mt-1 ${getGrowthColor(stats.reservationGrowth)}`}>
											{getGrowthIcon(stats.reservationGrowth)}
											<span className="text-sm">{formatPercent(Math.abs(stats.reservationGrowth))} 이번 달</span>
										</div>
									</div>
									<Calendar className="h-8 w-8 text-blue-400" />
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardContent className="p-6">
								<div className="flex items-center justify-between">
									<div>
										<p className="text-sm font-medium text-gray-600">총 회원</p>
										<p className="text-3xl font-bold text-purple-600">{formatNumber(stats.totalMembers)}</p>
										<div className={`flex items-center space-x-1 mt-1 ${getGrowthColor(stats.memberGrowth)}`}>
											{getGrowthIcon(stats.memberGrowth)}
											<span className="text-sm">{formatPercent(Math.abs(stats.memberGrowth))} 이번 달</span>
										</div>
									</div>
									<Users className="h-8 w-8 text-purple-400" />
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardContent className="p-6">
								<div className="flex items-center justify-between">
									<div>
										<p className="text-sm font-medium text-gray-600">운영 크루즈</p>
										<p className="text-3xl font-bold text-orange-600">{stats.activeCruises}/{stats.totalCruises}</p>
										<p className="text-sm text-gray-500 mt-1">
											{formatPercent((stats.activeCruises / stats.totalCruises) * 100)} 가동률
										</p>
									</div>
									<Ship className="h-8 w-8 text-orange-400" />
								</div>
							</CardContent>
						</Card>
					</div>

					{/* 예약 현황 */}
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center space-x-2">
								<BarChart3 className="w-5 h-5" />
								<span>예약 현황</span>
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
								<div className="text-center p-4 bg-yellow-50 rounded-lg">
									<div className="text-2xl font-bold text-yellow-600">{stats.reservationStats.pending}</div>
									<div className="text-sm text-yellow-700">대기중</div>
								</div>
								<div className="text-center p-4 bg-blue-50 rounded-lg">
									<div className="text-2xl font-bold text-blue-600">{stats.reservationStats.confirmed}</div>
									<div className="text-sm text-blue-700">확정</div>
								</div>
								<div className="text-center p-4 bg-green-50 rounded-lg">
									<div className="text-2xl font-bold text-green-600">{stats.reservationStats.completed}</div>
									<div className="text-sm text-green-700">완료</div>
								</div>
								<div className="text-center p-4 bg-red-50 rounded-lg">
									<div className="text-2xl font-bold text-red-600">{stats.reservationStats.cancelled}</div>
									<div className="text-sm text-red-700">취소</div>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* 크루즈별 성과 & 회원 분포 */}
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center space-x-2">
									<Ship className="w-5 h-5" />
									<span>크루즈별 성과</span>
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									{stats.cruiseStats.map((cruise, index) => (
										<div key={cruise.id} className="p-4 bg-gray-50 rounded-lg">
											<div className="flex items-center justify-between mb-2">
												<div>
													<h4 className="font-medium text-gray-900">{cruise.name}</h4>
													<Badge variant="secondary" className="text-xs">{cruise.category}</Badge>
												</div>
												<div className="text-right">
													<div className="text-lg font-bold text-gray-900">{formatCurrency(cruise.revenue)}</div>
													<div className="text-sm text-gray-600">{cruise.totalBookings}회 예약</div>
												</div>
											</div>
											<div className="grid grid-cols-3 gap-4 text-sm">
												<div>
													<div className="text-gray-600">평점</div>
													<div className="flex items-center space-x-1">
														<Star className="w-4 h-4 text-yellow-400 fill-current" />
														<span className="font-medium">{cruise.averageRating}</span>
													</div>
												</div>
												<div>
													<div className="text-gray-600">수용인원</div>
													<div className="font-medium">{cruise.capacity}명</div>
												</div>
												<div>
													<div className="text-gray-600">이용률</div>
													<div className="font-medium text-green-600">{formatPercent(cruise.utilizationRate)}</div>
												</div>
											</div>
											<div className="mt-3">
												<div className="w-full bg-gray-200 rounded-full h-2">
													<div
														className="bg-[#005BAC] h-2 rounded-full transition-all duration-300"
														style={{ width: `${cruise.utilizationRate}%` }}
													></div>
												</div>
											</div>
										</div>
									))}
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle className="flex items-center space-x-2">
									<Users className="w-5 h-5" />
									<span>회원 분포</span>
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									{stats.memberStats.map((member, index) => (
										<div key={member.type} className="space-y-2">
											<div className="flex items-center justify-between">
												<span className="text-sm font-medium">{member.type}</span>
												<div className="flex items-center space-x-2">
													<span className="text-sm text-gray-600">{formatNumber(member.count)}명</span>
													<Badge variant="secondary">{formatPercent(member.percentage)}</Badge>
													<div className={`flex items-center space-x-1 ${getGrowthColor(member.growth)}`}>
														{getGrowthIcon(member.growth)}
														<span className="text-xs">{formatPercent(Math.abs(member.growth))}</span>
													</div>
												</div>
											</div>
											<div className="w-full bg-gray-200 rounded-full h-2">
												<div
													className="bg-gradient-to-r from-[#005BAC] to-[#03C75A] h-2 rounded-full transition-all duration-300"
													style={{ width: `${member.percentage}%` }}
												></div>
											</div>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</div>

					{/* 인기 시간대 & 지역별 통계 */}
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center space-x-2">
									<Clock className="w-5 h-5" />
									<span>인기 시간대</span>
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									{stats.popularTimes.map((time, index) => (
										<div key={time.timeSlot} className="flex items-center space-x-3">
											<div className="w-20 text-sm font-medium text-gray-600">
												{time.timeSlot}
											</div>
											<div className="flex-1 space-y-1">
												<div className="flex items-center justify-between text-sm">
													<span>{time.bookings}건</span>
													<span className="text-gray-500">{formatPercent(time.percentage)}</span>
												</div>
												<div className="w-full bg-gray-200 rounded-full h-2">
													<div
														className="bg-[#005BAC] h-2 rounded-full transition-all duration-300"
														style={{ width: `${time.percentage}%` }}
													></div>
												</div>
											</div>
										</div>
									))}
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle className="flex items-center space-x-2">
									<MapPin className="w-5 h-5" />
									<span>지역별 방문객</span>
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									{stats.regionStats.map((region, index) => (
										<div key={region.region} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
											<div className="flex items-center space-x-3">
												<Badge variant="secondary" className="w-6 h-6 flex items-center justify-center text-xs">
													{index + 1}
												</Badge>
												<div>
													<p className="font-medium text-sm">{region.region}</p>
													<p className="text-xs text-gray-600">{formatNumber(region.visitors)}명</p>
												</div>
											</div>
											<div className="text-right">
												<div className="text-sm font-medium">{formatCurrency(region.revenue)}</div>
												<div className="text-xs text-gray-500">{formatPercent(region.percentage)}</div>
											</div>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</div>

					{/* 월별 매출 트렌드 & 최근 활동 */}
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center space-x-2">
									<LineChart className="w-5 h-5" />
									<span>월별 매출 트렌드</span>
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									{stats.monthlyRevenueData.slice(-6).map((month, index) => (
										<div key={month.month} className="space-y-2">
											<div className="flex items-center justify-between">
												<span className="text-sm font-medium">
													{new Date(month.month + '-01').toLocaleDateString('ko-KR', {
														year: 'numeric',
														month: 'short'
													})}
												</span>
												<div className="flex items-center space-x-2">
													<span className="text-sm text-gray-600">{formatCurrency(month.revenue)}</span>
													<div className={`flex items-center space-x-1 ${getGrowthColor(month.growth)}`}>
														{getGrowthIcon(month.growth)}
														<span className="text-xs">{formatPercent(Math.abs(month.growth))}</span>
													</div>
												</div>
											</div>
											<div className="w-full bg-gray-200 rounded-full h-2">
												<div
													className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-300"
													style={{ 
														width: `${(month.revenue / Math.max(...stats.monthlyRevenueData.map(m => m.revenue))) * 100}%` 
													}}
												></div>
											</div>
											<div className="text-xs text-gray-500">
												예약 {month.reservations}건
											</div>
										</div>
									))}
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle className="flex items-center space-x-2">
									<Activity className="w-5 h-5" />
									<span>최근 활동</span>
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-3">
									{stats.recentActivities.map((activity) => (
										<div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
											<Badge className={getActivityStatusColor(activity.status)} />
											<div className="flex-1 min-w-0">
												<p className="text-sm font-medium text-gray-900">
													{activity.description}
												</p>
												<p className="text-xs text-gray-500">
													{formatTime(activity.timestamp)}
												</p>
											</div>
										</div>
									))}
								</div>
								<div className="mt-4 text-center">
									<button className="text-sm text-[#005BAC] hover:text-[#004494] font-medium">
										모든 활동 보기 →
									</button>
								</div>
							</CardContent>
						</Card>
					</div>

					{/* 요약 정보 */}
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center space-x-2">
								<PieChart className="w-5 h-5" />
								<span>핵심 인사이트</span>
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
								<div className="p-4 bg-blue-50 rounded-lg">
									<h4 className="font-medium text-blue-900 mb-2">최고 수익 크루즈</h4>
									<p className="text-sm text-blue-700">
										{stats.cruiseStats[0].name} ({formatCurrency(stats.cruiseStats[0].revenue)})
									</p>
								</div>
								<div className="p-4 bg-green-50 rounded-lg">
									<h4 className="font-medium text-green-900 mb-2">평균 예약률</h4>
									<p className="text-sm text-green-700">
										{formatPercent(stats.cruiseStats.reduce((sum, c) => sum + c.utilizationRate, 0) / stats.cruiseStats.length)}
									</p>
								</div>
								<div className="p-4 bg-purple-50 rounded-lg">
									<h4 className="font-medium text-purple-900 mb-2">주요 고객층</h4>
									<p className="text-sm text-purple-700">
										{stats.memberStats[0].type} ({formatPercent(stats.memberStats[0].percentage)})
									</p>
								</div>
								<div className="p-4 bg-orange-50 rounded-lg">
									<h4 className="font-medium text-orange-900 mb-2">최고 인기 시간</h4>
									<p className="text-sm text-orange-700">
										{stats.popularTimes[0].timeSlot} ({formatPercent(stats.popularTimes[0].percentage)})
									</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</AdminLayout>
		</AdminAuthGuard>
	);
}
