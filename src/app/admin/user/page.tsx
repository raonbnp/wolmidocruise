"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminAuthGuard from "@/components/admin/AdminAuthGuard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
	Search,
	Filter,
	Users,
	Mail,
	Phone,
	Calendar,
	Eye,
	Edit,
	UserX,
	Download,
	RefreshCw,
	Shield,
	ShieldCheck
} from "lucide-react";

// 회원 타입
interface User {
	id: number;
	username: string;
	email: string;
	name: string;
	phone?: string;
	birthDate?: string;
	gender?: 'male' | 'female';
	provider: 'local' | 'kakao' | 'naver';
	isActive: boolean;
	isEmailVerified: boolean;
	isPhoneVerified: boolean;
	reservationCount: number;
	totalSpent: number;
	lastLoginAt?: string;
	createdAt: string;
	updatedAt: string;
}

// 더미 회원 데이터
const dummyUsers: User[] = [
	{
		id: 1,
		username: 'hong123',
		email: 'hong@example.com',
		name: '홍길동',
		phone: '010-1234-5678',
		birthDate: '1985-03-15',
		gender: 'male',
		provider: 'local',
		isActive: true,
		isEmailVerified: true,
		isPhoneVerified: true,
		reservationCount: 12,
		totalSpent: 1340000,
		lastLoginAt: '2024-01-25T14:30:00Z',
		createdAt: '2023-06-15T10:20:00Z',
		updatedAt: '2024-01-25T14:30:00Z'
	},
	{
		id: 2,
		username: 'kim_young',
		email: 'kim@example.com',
		name: '김영희',
		phone: '010-9876-5432',
		birthDate: '1990-08-22',
		gender: 'female',
		provider: 'kakao',
		isActive: true,
		isEmailVerified: true,
		isPhoneVerified: false,
		reservationCount: 8,
		totalSpent: 890000,
		lastLoginAt: '2024-01-24T16:45:00Z',
		createdAt: '2023-09-20T14:15:00Z',
		updatedAt: '2024-01-24T16:45:00Z'
	},
	{
		id: 3,
		username: 'park_cs',
		email: 'park@example.com',
		name: '박철수',
		phone: '010-5555-6666',
		birthDate: '1978-12-05',
		gender: 'male',
		provider: 'naver',
		isActive: true,
		isEmailVerified: true,
		isPhoneVerified: true,
		reservationCount: 25,
		totalSpent: 2450000,
		lastLoginAt: '2024-01-23T09:20:00Z',
		createdAt: '2023-03-10T11:30:00Z',
		updatedAt: '2024-01-23T09:20:00Z'
	},
	{
		id: 4,
		username: 'lee_ms',
		email: 'lee@example.com',
		name: '이민수',
		phone: '010-7777-8888',
		birthDate: '1995-05-18',
		gender: 'male',
		provider: 'local',
		isActive: false,
		isEmailVerified: false,
		isPhoneVerified: false,
		reservationCount: 2,
		totalSpent: 150000,
		lastLoginAt: '2023-12-15T13:10:00Z',
		createdAt: '2023-11-05T16:45:00Z',
		updatedAt: '2023-12-15T13:10:00Z'
	},
	{
		id: 5,
		username: 'choi_jy',
		email: 'choi@example.com',
		name: '최지영',
		phone: '010-3333-4444',
		birthDate: '1987-09-30',
		gender: 'female',
		provider: 'kakao',
		isActive: true,
		isEmailVerified: true,
		isPhoneVerified: true,
		reservationCount: 15,
		totalSpent: 1680000,
		lastLoginAt: '2024-01-25T11:25:00Z',
		createdAt: '2023-07-22T09:10:00Z',
		updatedAt: '2024-01-25T11:25:00Z'
	}
];

export default function AdminUserPage() {
	const [users, setUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState("");
	const [filterProvider, setFilterProvider] = useState("all");
	const [filterStatus, setFilterStatus] = useState("all");
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage] = useState(10);

	// 데이터 로드
	useEffect(() => {
		const loadUsers = async () => {
			try {
				// 실제로는 API 호출
				await new Promise(resolve => setTimeout(resolve, 1000));
				setUsers(dummyUsers);
			} catch (error) {
				console.error('Users load error:', error);
			} finally {
				setLoading(false);
			}
		};

		loadUsers();
	}, []);

	// 필터링된 회원 목록
	const filteredUsers = users.filter(user => {
		const matchesSearch = 
			user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
			user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
			(user.phone && user.phone.includes(searchTerm));
		
		const matchesProvider = filterProvider === "all" || user.provider === filterProvider;
		const matchesStatus = 
			filterStatus === "all" || 
			(filterStatus === "active" && user.isActive) ||
			(filterStatus === "inactive" && !user.isActive) ||
			(filterStatus === "verified" && user.isEmailVerified && user.isPhoneVerified) ||
			(filterStatus === "unverified" && (!user.isEmailVerified || !user.isPhoneVerified));

		return matchesSearch && matchesProvider && matchesStatus;
	});

	// 페이지네이션
	const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

	// 날짜 포맷
	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString('ko-KR');
	};

	// 가격 포맷
	const formatPrice = (price: number) => {
		return price.toLocaleString('ko-KR');
	};

	// 가입 경로 배지
	const getProviderBadge = (provider: string) => {
		const providerConfig = {
			local: { label: '일반', variant: 'default' as const, color: 'bg-gray-500' },
			kakao: { label: '카카오', variant: 'secondary' as const, color: 'bg-yellow-500' },
			naver: { label: '네이버', variant: 'secondary' as const, color: 'bg-green-500' }
		};

		const config = providerConfig[provider as keyof typeof providerConfig] || providerConfig.local;
		return <Badge variant={config.variant}>{config.label}</Badge>;
	};

	// 회원 상태 토글
	const handleToggleStatus = async (userId: number) => {
		const user = users.find(u => u.id === userId);
		if (!user) return;

		const action = user.isActive ? '비활성화' : '활성화';
		if (!confirm(`${user.name} 회원을 ${action}하시겠습니까?`)) return;

		try {
			// 실제로는 API 호출
			setUsers(prev => prev.map(u => 
				u.id === userId ? { ...u, isActive: !u.isActive } : u
			));
			alert(`회원이 ${action}되었습니다.`);
		} catch (error) {
			console.error('Status toggle error:', error);
			alert(`${action} 중 오류가 발생했습니다.`);
		}
	};

	return (
		<AdminAuthGuard requiredPermission="user">
			<AdminLayout>
				<div className="space-y-6">
					{/* 헤더 */}
					<div className="flex items-center justify-between">
						<div>
							<h1 className="text-3xl font-bold text-gray-900">회원 관리</h1>
							<p className="text-gray-600">회원 정보를 조회하고 관리하세요</p>
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
										<p className="text-sm font-medium text-gray-600">전체 회원</p>
										<p className="text-2xl font-bold">{users.length}</p>
									</div>
									<Users className="h-8 w-8 text-gray-400" />
								</div>
							</CardContent>
						</Card>
						<Card>
							<CardContent className="p-6">
								<div className="flex items-center justify-between">
									<div>
										<p className="text-sm font-medium text-gray-600">활성 회원</p>
										<p className="text-2xl font-bold text-green-600">
											{users.filter(u => u.isActive).length}
										</p>
									</div>
									<ShieldCheck className="h-8 w-8 text-green-400" />
								</div>
							</CardContent>
						</Card>
						<Card>
							<CardContent className="p-6">
								<div className="flex items-center justify-between">
									<div>
										<p className="text-sm font-medium text-gray-600">신규 가입</p>
										<p className="text-2xl font-bold text-blue-600">
											{users.filter(u => {
												const createdDate = new Date(u.createdAt);
												const today = new Date();
												const diffTime = Math.abs(today.getTime() - createdDate.getTime());
												const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
												return diffDays <= 7;
											}).length}
										</p>
									</div>
									<Calendar className="h-8 w-8 text-blue-400" />
								</div>
							</CardContent>
						</Card>
						<Card>
							<CardContent className="p-6">
								<div className="flex items-center justify-between">
									<div>
										<p className="text-sm font-medium text-gray-600">비활성 회원</p>
										<p className="text-2xl font-bold text-red-600">
											{users.filter(u => !u.isActive).length}
										</p>
									</div>
									<UserX className="h-8 w-8 text-red-400" />
								</div>
							</CardContent>
						</Card>
					</div>

					{/* 검색 및 필터 */}
					<Card>
						<CardContent className="p-6">
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
								{/* 검색 */}
								<div className="lg:col-span-2">
									<div className="relative">
										<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
										<input
											type="text"
											placeholder="이름, 이메일, 아이디, 전화번호로 검색..."
											value={searchTerm}
											onChange={(e) => setSearchTerm(e.target.value)}
											className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none"
										/>
									</div>
								</div>

								{/* 가입 경로 필터 */}
								<div>
									<select
										value={filterProvider}
										onChange={(e) => setFilterProvider(e.target.value)}
										className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none"
										aria-label="가입 경로 필터"
									>
										<option value="all">모든 가입경로</option>
										<option value="local">일반 가입</option>
										<option value="kakao">카카오</option>
										<option value="naver">네이버</option>
									</select>
								</div>

								{/* 상태 필터 */}
								<div>
									<select
										value={filterStatus}
										onChange={(e) => setFilterStatus(e.target.value)}
										className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none"
										aria-label="회원 상태 필터"
									>
										<option value="all">모든 상태</option>
										<option value="active">활성</option>
										<option value="inactive">비활성</option>
										<option value="verified">인증완료</option>
										<option value="unverified">인증미완료</option>
									</select>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* 회원 목록 */}
					{loading ? (
						<div className="text-center py-12">
							<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#005BAC] mx-auto mb-4"></div>
							<p className="text-gray-600">회원 목록을 불러오는 중...</p>
						</div>
					) : paginatedUsers.length > 0 ? (
						<Card>
							<CardContent className="p-0">
								<div className="overflow-x-auto">
									<table className="w-full">
										<thead className="bg-gray-50">
											<tr>
												<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
													회원정보
												</th>
												<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
													연락처
												</th>
												<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
													가입경로
												</th>
												<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
													상태
												</th>
												<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
													예약/결제
												</th>
												<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
													가입일
												</th>
												<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
													액션
												</th>
											</tr>
										</thead>
										<tbody className="bg-white divide-y divide-gray-200">
											{paginatedUsers.map((user) => (
												<tr key={user.id} className="hover:bg-gray-50">
													<td className="px-6 py-4 whitespace-nowrap">
														<div className="flex items-center">
															<div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
																<span className="text-sm font-medium text-gray-700">
																	{user.name.charAt(0)}
																</span>
															</div>
															<div className="ml-4">
																<div className="text-sm font-medium text-gray-900">
																	{user.name}
																</div>
																<div className="text-sm text-gray-500">
																	{user.username}
																</div>
															</div>
														</div>
													</td>
													<td className="px-6 py-4 whitespace-nowrap">
														<div className="text-sm text-gray-900">
															<div className="flex items-center space-x-1 mb-1">
																<Mail className="w-3 h-3 text-gray-400" />
																<span>{user.email}</span>
																{user.isEmailVerified && (
																	<Shield className="w-3 h-3 text-green-500" />
																)}
															</div>
															{user.phone && (
																<div className="flex items-center space-x-1">
																	<Phone className="w-3 h-3 text-gray-400" />
																	<span>{user.phone}</span>
																	{user.isPhoneVerified && (
																		<Shield className="w-3 h-3 text-green-500" />
																	)}
																</div>
															)}
														</div>
													</td>
													<td className="px-6 py-4 whitespace-nowrap">
														{getProviderBadge(user.provider)}
													</td>
													<td className="px-6 py-4 whitespace-nowrap">
														<div className="flex flex-col space-y-1">
															<Badge variant={user.isActive ? "default" : "destructive"}>
																{user.isActive ? "활성" : "비활성"}
															</Badge>
															{(!user.isEmailVerified || !user.isPhoneVerified) && (
																<Badge variant="secondary" className="text-xs">
																	인증미완료
																</Badge>
															)}
														</div>
													</td>
													<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
														<div>
															<div>예약 {user.reservationCount}건</div>
															<div className="text-gray-500">
																총 {formatPrice(user.totalSpent)}원
															</div>
														</div>
													</td>
													<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
														<div>
															<div>{formatDate(user.createdAt)}</div>
															{user.lastLoginAt && (
																<div className="text-xs text-gray-400">
																	최근: {formatDate(user.lastLoginAt)}
																</div>
															)}
														</div>
													</td>
													<td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
														<div className="flex items-center space-x-2">
															<Button variant="outline" size="sm">
																<Eye className="w-3 h-3 mr-1" />
																상세
															</Button>
															<Button
																variant="outline"
																size="sm"
																onClick={() => handleToggleStatus(user.id)}
																className={user.isActive ? "text-red-600 hover:bg-red-50" : "text-green-600 hover:bg-green-50"}
															>
																{user.isActive ? "비활성화" : "활성화"}
															</Button>
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
								<Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
								<h3 className="text-xl font-semibold text-gray-900 mb-2">회원이 없습니다</h3>
								<p className="text-gray-600">검색 조건에 맞는 회원이 없습니다.</p>
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
