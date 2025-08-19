"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
	Calendar,
	Users,
	Ship,
	CreditCard,
	TrendingUp,
	TrendingDown,
	MessageSquare,
	AlertTriangle,
	Clock,
	CheckCircle,
	XCircle,
	Eye,
	ArrowUpRight,
	ArrowDownRight,
	Activity,
	Target,
	Zap,
	Award
} from "lucide-react";
import {
	AreaChart,
	Area,
	BarChart,
	Bar,
	LineChart,
	Line,
	PieChart,
	Pie,
	Cell,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	Legend
} from 'recharts';
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { DashboardStats } from "@/types/admin";

// 더미 대시보드 데이터
const dummyStats: DashboardStats = {
	totalReservations: 1247,
	todayReservations: 23,
	pendingReservations: 8,
	cancelledReservations: 45,
	totalRevenue: 125400000,
	todayRevenue: 2340000,
	monthlyRevenue: 45600000,
	totalUsers: 3456,
	newUsersToday: 12,
	newUsersThisMonth: 234,
	totalProducts: 8,
	activeProducts: 6,
	totalNotices: 15,
	totalQnas: 89,
	unansweredQnas: 5,
	recentReservations: [
		{
			id: '1',
			customerName: '홍길동',
			cruise: '불꽃 크루즈',
			date: '2024-01-25',
			status: 'confirmed'
		},
		{
			id: '2',
			customerName: '김영희',
			cruise: '낙조 크루즈',
			date: '2024-01-25',
			status: 'pending'
		},
		{
			id: '3',
			customerName: '이철수',
			cruise: '행복 크루즈',
			date: '2024-01-25',
			status: 'confirmed'
		}
	],
	recentUsers: [
		{
			id: '1',
			name: '박민수',
			email: 'park@example.com',
			signupDate: '2024-01-25'
		},
		{
			id: '2',
			name: '최지영',
			email: 'choi@example.com',
			signupDate: '2024-01-25'
		},
		{
			id: '3',
			name: '정우진',
			email: 'jung@example.com',
			signupDate: '2024-01-25'
		}
	],
	recentQnas: [
		{
			id: '1',
			title: '예약 취소 문의',
			author: '김○○',
			date: '2024-01-25',
			status: 'pending'
		},
		{
			id: '2',
			title: '단체 할인 문의',
			author: '이○○',
			date: '2024-01-25',
			status: 'answered'
		},
		{
			id: '3',
			title: '날씨 관련 문의',
			author: '박○○',
			date: '2024-01-25',
			status: 'pending'
		}
	]
};

// 차트 데이터
const monthlyRevenueData = [
	{ month: '7월', revenue: 38500000, reservations: 156 },
	{ month: '8월', revenue: 42300000, reservations: 189 },
	{ month: '9월', revenue: 39800000, reservations: 167 },
	{ month: '10월', revenue: 45600000, reservations: 203 },
	{ month: '11월', revenue: 41200000, reservations: 178 },
	{ month: '12월', revenue: 48900000, reservations: 221 },
	{ month: '1월', revenue: 45600000, reservations: 198 }
];

const dailyStatsData = [
	{ day: '월', reservations: 12, users: 8 },
	{ day: '화', reservations: 19, users: 15 },
	{ day: '수', reservations: 15, users: 12 },
	{ day: '목', reservations: 25, users: 18 },
	{ day: '금', reservations: 28, users: 22 },
	{ day: '토', reservations: 35, users: 28 },
	{ day: '일', reservations: 23, users: 19 }
];

const productDistributionData = [
	{ name: '불꽃 크루즈', value: 156, color: '#005BAC' },
	{ name: '낙조 크루즈', value: 89, color: '#0066CC' },
	{ name: '행복 크루즈', value: 234, color: '#03C75A' },
	{ name: '패키지 A', value: 67, color: '#FF5722' },
	{ name: '패키지 B', value: 23, color: '#9C27B0' },
	{ name: '기타', value: 45, color: '#607D8B' }
];

const statusDistributionData = [
	{ name: '예약확정', value: 65, color: '#10B981' },
	{ name: '예약대기', value: 15, color: '#F59E0B' },
	{ name: '이용완료', value: 18, color: '#3B82F6' },
	{ name: '취소', value: 2, color: '#EF4444' }
];

export default function AdminDashboard() {
	const { adminUser, isAuthenticated } = useAdminAuth();
	const [stats, setStats] = useState<DashboardStats | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// 인증되지 않은 경우 로그인 페이지로 리다이렉트
		if (!isAuthenticated && !loading) {
			window.location.href = '/admin/login';
			return;
		}

		// 대시보드 데이터 로드
		const loadDashboardData = async () => {
			try {
				// 실제로는 API 호출
				await new Promise(resolve => setTimeout(resolve, 1000));
				setStats(dummyStats);
			} catch (error) {
				console.error('Dashboard data load error:', error);
			} finally {
				setLoading(false);
			}
		};

		if (isAuthenticated) {
			loadDashboardData();
		}
	}, [isAuthenticated, loading]);

	const formatPrice = (price: number) => {
		return (price / 10000).toFixed(0) + '만원';
	};

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleString('ko-KR', {
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	};

	const getStatusBadge = (status: string) => {
		const statusConfig: { [key: string]: { label: string; variant: "default" | "destructive" | "outline" | "secondary"; icon: React.ComponentType<{ className?: string }> } } = {
			confirmed: { label: '확정', variant: 'default', icon: CheckCircle },
			pending: { label: '대기', variant: 'secondary', icon: Clock },
			cancelled: { label: '취소', variant: 'destructive', icon: XCircle },
			answered: { label: '답변완료', variant: 'default', icon: CheckCircle }
		};

		const config = statusConfig[status] || { label: status, variant: 'secondary', icon: AlertTriangle };
		const IconComponent = config.icon;

		return (
			<Badge variant={config.variant} className="flex items-center space-x-1">
				<IconComponent className="w-3 h-3" />
				<span>{config.label}</span>
			</Badge>
		);
	};

	if (!isAuthenticated || loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#005BAC]"></div>
			</div>
		);
	}

	if (!stats) {
		return (
			<AdminLayout>
				<div className="text-center py-12">
					<AlertTriangle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
					<h3 className="text-xl font-semibold text-gray-900 mb-2">데이터를 불러올 수 없습니다</h3>
					<p className="text-gray-600">잠시 후 다시 시도해주세요.</p>
				</div>
			</AdminLayout>
		);
	}

	return (
		<AdminLayout>
			<div className="space-y-8">
				{/* 웰컴 헤더 */}
				<div className="bg-gradient-to-r from-[#005BAC] to-[#0066CC] rounded-2xl p-8 text-white">
					<div className="flex items-center justify-between">
						<div>
							<h1 className="text-3xl font-bold mb-2">안녕하세요, {adminUser?.name}님! 👋</h1>
							<p className="text-white/90 text-lg">오늘도 월미도 해양관광을 빛내주셔서 감사합니다.</p>
							<div className="flex items-center space-x-6 mt-4">
								<div className="flex items-center space-x-2">
									<Calendar className="w-5 h-5" />
									<span>{new Date().toLocaleDateString('ko-KR', { 
										year: 'numeric', 
										month: 'long', 
										day: 'numeric',
										weekday: 'long'
									})}</span>
								</div>
								<div className="flex items-center space-x-2">
									<Activity className="w-5 h-5" />
									<span>시스템 정상 운영중</span>
								</div>
							</div>
						</div>
						<div className="hidden lg:block">
							<div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center">
								<Target className="w-16 h-16 text-white/80" />
							</div>
						</div>
					</div>
				</div>

				{/* 주요 KPI 카드 */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					{/* 총 예약 */}
					<Card className="relative overflow-hidden">
						<CardContent className="p-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-sm font-medium text-gray-600">총 예약</p>
									<p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalReservations.toLocaleString()}</p>
									<div className="flex items-center mt-2 text-sm">
										<ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
										<span className="text-green-600 font-medium">+12%</span>
										<span className="text-gray-500 ml-1">vs 지난달</span>
									</div>
								</div>
								<div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
									<Calendar className="w-8 h-8 text-[#005BAC]" />
								</div>
							</div>
						</CardContent>
						<div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#005BAC] to-[#0066CC]"></div>
					</Card>

					{/* 총 매출 */}
					<Card className="relative overflow-hidden">
						<CardContent className="p-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-sm font-medium text-gray-600">총 매출</p>
									<p className="text-3xl font-bold text-gray-900 mt-2">{formatPrice(stats.totalRevenue)}</p>
									<div className="flex items-center mt-2 text-sm">
										<ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
										<span className="text-green-600 font-medium">+8.5%</span>
										<span className="text-gray-500 ml-1">vs 지난달</span>
									</div>
								</div>
								<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
									<CreditCard className="w-8 h-8 text-green-600" />
								</div>
							</div>
						</CardContent>
						<div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-green-400"></div>
					</Card>

					{/* 총 회원 */}
					<Card className="relative overflow-hidden">
						<CardContent className="p-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-sm font-medium text-gray-600">총 회원</p>
									<p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalUsers.toLocaleString()}</p>
									<div className="flex items-center mt-2 text-sm">
										<ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
										<span className="text-green-600 font-medium">+15.2%</span>
										<span className="text-gray-500 ml-1">vs 지난달</span>
									</div>
								</div>
								<div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
									<Users className="w-8 h-8 text-purple-600" />
								</div>
							</div>
						</CardContent>
						<div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-purple-400"></div>
					</Card>

					{/* 활성 상품 */}
					<Card className="relative overflow-hidden">
						<CardContent className="p-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-sm font-medium text-gray-600">활성 상품</p>
									<p className="text-3xl font-bold text-gray-900 mt-2">{stats.activeProducts}</p>
									<div className="flex items-center mt-2 text-sm">
										<ArrowDownRight className="w-4 h-4 text-red-500 mr-1" />
										<span className="text-red-600 font-medium">-2</span>
										<span className="text-gray-500 ml-1">vs 지난달</span>
									</div>
								</div>
								<div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
									<Ship className="w-8 h-8 text-orange-600" />
								</div>
							</div>
						</CardContent>
						<div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-orange-400"></div>
					</Card>
				</div>

				{/* 차트 섹션 */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					{/* 월별 매출 추이 */}
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center justify-between">
								<div className="flex items-center space-x-2">
									<TrendingUp className="w-5 h-5 text-[#005BAC]" />
									<span>월별 매출 추이</span>
								</div>
								<Button variant="outline" size="sm">
									<Eye className="w-4 h-4 mr-2" />
									상세보기
								</Button>
							</CardTitle>
						</CardHeader>
						<CardContent>
							<ResponsiveContainer width="100%" height={300}>
								<AreaChart data={monthlyRevenueData}>
									<defs>
										<linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
											<stop offset="5%" stopColor="#005BAC" stopOpacity={0.3}/>
											<stop offset="95%" stopColor="#005BAC" stopOpacity={0}/>
										</linearGradient>
									</defs>
									<CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
									<XAxis dataKey="month" stroke="#666" />
									<YAxis 
										stroke="#666"
										tickFormatter={(value) => `${(value / 10000).toFixed(0)}만`}
									/>
									<Tooltip 
										formatter={(value: number) => [formatPrice(value), '매출']}
										labelStyle={{ color: '#666' }}
										contentStyle={{ 
											backgroundColor: '#fff', 
											border: '1px solid #e5e7eb',
											borderRadius: '8px',
											boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
										}}
									/>
									<Area 
										type="monotone" 
										dataKey="revenue" 
										stroke="#005BAC" 
										strokeWidth={2}
										fillOpacity={1} 
										fill="url(#colorRevenue)" 
									/>
								</AreaChart>
							</ResponsiveContainer>
						</CardContent>
					</Card>

					{/* 일별 예약/회원 현황 */}
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center justify-between">
								<div className="flex items-center space-x-2">
									<Activity className="w-5 h-5 text-green-600" />
									<span>주간 활동 현황</span>
								</div>
								<Button variant="outline" size="sm">
									<Eye className="w-4 h-4 mr-2" />
									상세보기
								</Button>
							</CardTitle>
						</CardHeader>
						<CardContent>
							<ResponsiveContainer width="100%" height={300}>
								<BarChart data={dailyStatsData}>
									<CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
									<XAxis dataKey="day" stroke="#666" />
									<YAxis stroke="#666" />
									<Tooltip 
										contentStyle={{ 
											backgroundColor: '#fff', 
											border: '1px solid #e5e7eb',
											borderRadius: '8px',
											boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
										}}
									/>
									<Legend />
									<Bar dataKey="reservations" fill="#005BAC" name="예약" radius={[4, 4, 0, 0]} />
									<Bar dataKey="users" fill="#03C75A" name="신규회원" radius={[4, 4, 0, 0]} />
								</BarChart>
							</ResponsiveContainer>
						</CardContent>
					</Card>
				</div>

				{/* 파이 차트 섹션 */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					{/* 상품별 예약 분포 */}
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center space-x-2">
								<Ship className="w-5 h-5 text-[#005BAC]" />
								<span>상품별 예약 분포</span>
							</CardTitle>
						</CardHeader>
						<CardContent>
							<ResponsiveContainer width="100%" height={300}>
								<PieChart>
									<Pie
										data={productDistributionData}
										cx="50%"
										cy="50%"
										innerRadius={60}
										outerRadius={120}
										paddingAngle={5}
										dataKey="value"
									>
										{productDistributionData.map((entry, index) => (
											<Cell key={`cell-${index}`} fill={entry.color} />
										))}
									</Pie>
									<Tooltip 
										formatter={(value: number, name: string) => [value + '건', name]}
										contentStyle={{ 
											backgroundColor: '#fff', 
											border: '1px solid #e5e7eb',
											borderRadius: '8px',
											boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
										}}
									/>
									<Legend />
								</PieChart>
							</ResponsiveContainer>
						</CardContent>
					</Card>

					{/* 예약 상태 분포 */}
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center space-x-2">
								<CheckCircle className="w-5 h-5 text-green-600" />
								<span>예약 상태 분포</span>
							</CardTitle>
						</CardHeader>
						<CardContent>
							<ResponsiveContainer width="100%" height={300}>
								<PieChart>
									<Pie
										data={statusDistributionData}
										cx="50%"
										cy="50%"
										innerRadius={60}
										outerRadius={120}
										paddingAngle={5}
										dataKey="value"
									>
										{statusDistributionData.map((entry, index) => (
											<Cell key={`cell-${index}`} fill={entry.color} />
										))}
									</Pie>
									<Tooltip 
										formatter={(value: number, name: string) => [value + '%', name]}
										contentStyle={{ 
											backgroundColor: '#fff', 
											border: '1px solid #e5e7eb',
											borderRadius: '8px',
											boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
										}}
									/>
									<Legend />
								</PieChart>
							</ResponsiveContainer>
						</CardContent>
					</Card>
				</div>

				{/* 처리 필요 알림 */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					<Card className="border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50">
						<CardHeader className="pb-3">
							<CardTitle className="text-lg flex items-center space-x-2">
								<div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
									<Clock className="w-5 h-5 text-yellow-600" />
								</div>
								<span className="text-yellow-800">처리 대기 예약</span>
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="text-4xl font-bold text-yellow-600 mb-2">
								{stats.pendingReservations}
							</div>
							<p className="text-yellow-700 text-sm mb-4">승인이 필요한 예약이 있습니다</p>
							<Button size="sm" className="w-full bg-yellow-600 hover:bg-yellow-700 text-white">
								<Zap className="w-4 h-4 mr-2" />
								바로 처리하기
							</Button>
						</CardContent>
					</Card>

					<Card className="border-red-200 bg-gradient-to-br from-red-50 to-pink-50">
						<CardHeader className="pb-3">
							<CardTitle className="text-lg flex items-center space-x-2">
								<div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
									<MessageSquare className="w-5 h-5 text-red-600" />
								</div>
								<span className="text-red-800">미답변 문의</span>
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="text-4xl font-bold text-red-600 mb-2">
								{stats.unansweredQnas}
							</div>
							<p className="text-red-700 text-sm mb-4">답변이 필요한 고객 문의가 있습니다</p>
							<Button size="sm" className="w-full bg-red-600 hover:bg-red-700 text-white">
								<MessageSquare className="w-4 h-4 mr-2" />
								답변 작성하기
							</Button>
						</CardContent>
					</Card>

					<Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
						<CardHeader className="pb-3">
							<CardTitle className="text-lg flex items-center space-x-2">
								<div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
									<Award className="w-5 h-5 text-blue-600" />
								</div>
								<span className="text-blue-800">이번달 성과</span>
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="text-4xl font-bold text-blue-600 mb-2">
								{formatPrice(stats.monthlyRevenue)}
							</div>
							<p className="text-blue-700 text-sm mb-4">목표 대비 112% 달성!</p>
							<Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
								<TrendingUp className="w-4 h-4 mr-2" />
								상세 통계 보기
							</Button>
						</CardContent>
					</Card>
				</div>

				{/* 최근 활동 */}
				<div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
					{/* 최근 예약 */}
					<Card>
						<CardHeader>
							<CardTitle className="text-lg flex items-center justify-between">
								<div className="flex items-center space-x-2">
									<Calendar className="w-5 h-5 text-[#005BAC]" />
									<span>최근 예약</span>
								</div>
								<Badge variant="secondary">{stats.recentReservations.length}</Badge>
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								{stats.recentReservations.map((reservation) => (
									<div key={reservation.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
										<div className="flex-1 min-w-0">
											<p className="text-sm font-medium text-gray-900 truncate">
												{reservation.customerName}
											</p>
											<p className="text-sm text-gray-500 truncate">
												{reservation.productName}
											</p>
											<p className="text-xs text-gray-400">
												{formatDate(reservation.createdAt)}
											</p>
										</div>
										<div className="flex flex-col items-end space-y-1">
											<span className="text-sm font-medium text-[#005BAC]">
												{formatPrice(reservation.amount)}
											</span>
											{getStatusBadge(reservation.status)}
										</div>
									</div>
								))}
							</div>
							<Button variant="outline" size="sm" className="w-full mt-4 hover:bg-[#005BAC] hover:text-white transition-colors">
								전체 예약 보기
							</Button>
						</CardContent>
					</Card>

					{/* 최근 가입 회원 */}
					<Card>
						<CardHeader>
							<CardTitle className="text-lg flex items-center justify-between">
								<div className="flex items-center space-x-2">
									<Users className="w-5 h-5 text-purple-600" />
									<span>신규 회원</span>
								</div>
								<Badge variant="secondary">{stats.recentUsers.length}</Badge>
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								{stats.recentUsers.map((user) => (
									<div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
										<div className="flex items-center space-x-3">
											<div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
												<span className="text-sm font-medium text-purple-600">
													{user.name.charAt(0)}
												</span>
											</div>
											<div className="flex-1 min-w-0">
												<p className="text-sm font-medium text-gray-900 truncate">
													{user.name}
												</p>
												<p className="text-sm text-gray-500 truncate">
													{user.email}
												</p>
												<p className="text-xs text-gray-400">
													{formatDate(user.createdAt)}
												</p>
											</div>
										</div>
										<div className="flex flex-col items-end">
											<Badge variant="outline" className="text-xs">
												{user.provider === 'local' ? '일반' : user.provider}
											</Badge>
										</div>
									</div>
								))}
							</div>
							<Button variant="outline" size="sm" className="w-full mt-4 hover:bg-purple-600 hover:text-white transition-colors">
								전체 회원 보기
							</Button>
						</CardContent>
					</Card>

					{/* 최근 문의 */}
					<Card>
						<CardHeader>
							<CardTitle className="text-lg flex items-center justify-between">
								<div className="flex items-center space-x-2">
									<MessageSquare className="w-5 h-5 text-green-600" />
									<span>고객 문의</span>
								</div>
								<Badge variant="destructive">{stats.unansweredQnas}</Badge>
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								{stats.recentQnas.map((qna) => (
									<div key={qna.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
										<div className="flex-1 min-w-0">
											<p className="text-sm font-medium text-gray-900 truncate">
												{qna.title}
											</p>
											<p className="text-sm text-gray-500 truncate">
												{qna.author}
											</p>
											<p className="text-xs text-gray-400">
												{formatDate(qna.createdAt)}
											</p>
										</div>
										<div className="flex flex-col items-end">
											{getStatusBadge(qna.status)}
										</div>
									</div>
								))}
							</div>
							<Button variant="outline" size="sm" className="w-full mt-4 hover:bg-green-600 hover:text-white transition-colors">
								전체 문의 보기
							</Button>
						</CardContent>
					</Card>
				</div>
			</div>
		</AdminLayout>
	);
}