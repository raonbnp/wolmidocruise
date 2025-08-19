"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminAuthGuard from "@/components/admin/AdminAuthGuard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
	Plus,
	Search,
	Edit,
	Trash2,
	Eye,
	Pin,
	Calendar,
	User,

} from "lucide-react";
import Link from "next/link";

// 공지사항 타입
interface Notice {
	id: number;
	title: string;
	content: string;
	excerpt: string;
	author: string;
	authorId: number;
	isPinned: boolean;
	isPublished: boolean;
	viewCount: number;
	createdAt: string;
	updatedAt: string;
	publishedAt?: string;
}

// 더미 공지사항 데이터
const dummyNotices: Notice[] = [
	{
		id: 1,
		title: "2024년 설날 연휴 운항 안내",
		content: "설날 연휴 기간 중 크루즈 운항 일정을 안내드립니다...",
		excerpt: "설날 연휴 기간 중 크루즈 운항 일정을 안내드립니다.",
		author: "관리자",
		authorId: 1,
		isPinned: true,
		isPublished: true,
		viewCount: 1250,
		createdAt: "2024-01-20T09:00:00Z",
		updatedAt: "2024-01-20T09:00:00Z",
		publishedAt: "2024-01-20T09:00:00Z"
	},
	{
		id: 2,
		title: "크루즈 예약 시스템 점검 안내",
		content: "예약 시스템 정기 점검으로 인한 일시 중단 안내입니다...",
		excerpt: "예약 시스템 정기 점검으로 인한 일시 중단 안내입니다.",
		author: "시스템관리자",
		authorId: 2,
		isPinned: false,
		isPublished: true,
		viewCount: 890,
		createdAt: "2024-01-18T14:30:00Z",
		updatedAt: "2024-01-18T14:30:00Z",
		publishedAt: "2024-01-18T14:30:00Z"
	},
	{
		id: 3,
		title: "신규 크루즈 상품 출시 안내",
		content: "새로운 프리미엄 크루즈 상품이 출시되었습니다...",
		excerpt: "새로운 프리미엄 크루즈 상품이 출시되었습니다.",
		author: "마케팅팀",
		authorId: 3,
		isPinned: false,
		isPublished: true,
		viewCount: 567,
		createdAt: "2024-01-15T11:20:00Z",
		updatedAt: "2024-01-15T11:20:00Z",
		publishedAt: "2024-01-15T11:20:00Z"
	},
	{
		id: 4,
		title: "안전 운항을 위한 기상 관련 안내",
		content: "기상 악화 시 크루즈 운항 중단 및 환불 정책에 대해 안내드립니다...",
		excerpt: "기상 악화 시 크루즈 운항 중단 및 환불 정책에 대해 안내드립니다.",
		author: "운항팀",
		authorId: 4,
		isPinned: false,
		isPublished: true,
		viewCount: 445,
		createdAt: "2024-01-12T16:45:00Z",
		updatedAt: "2024-01-12T16:45:00Z",
		publishedAt: "2024-01-12T16:45:00Z"
	},
	{
		id: 5,
		title: "개인정보 처리방침 개정 안내",
		content: "개인정보 처리방침이 개정되어 안내드립니다...",
		excerpt: "개인정보 처리방침이 개정되어 안내드립니다.",
		author: "법무팀",
		authorId: 5,
		isPinned: false,
		isPublished: false,
		viewCount: 0,
		createdAt: "2024-01-25T10:00:00Z",
		updatedAt: "2024-01-25T10:00:00Z"
	}
];

export default function AdminNoticePage() {
	const [notices, setNotices] = useState<Notice[]>([]);
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState("");
	const [filterStatus, setFilterStatus] = useState("all");
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage] = useState(10);

	// 데이터 로드
	useEffect(() => {
		const loadNotices = async () => {
			try {
				// 실제로는 API 호출
				await new Promise(resolve => setTimeout(resolve, 1000));
				setNotices(dummyNotices);
			} catch (error) {
				console.error('Notices load error:', error);
			} finally {
				setLoading(false);
			}
		};

		loadNotices();
	}, []);

	// 필터링된 공지사항 목록
	const filteredNotices = notices.filter(notice => {
		const matchesSearch = 
			notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			notice.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
			notice.author.toLowerCase().includes(searchTerm.toLowerCase());
		
		const matchesStatus = 
			filterStatus === "all" || 
			(filterStatus === "published" && notice.isPublished) ||
			(filterStatus === "draft" && !notice.isPublished) ||
			(filterStatus === "pinned" && notice.isPinned);

		return matchesSearch && matchesStatus;
	});

	// 페이지네이션
	const totalPages = Math.ceil(filteredNotices.length / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const paginatedNotices = filteredNotices.slice(startIndex, startIndex + itemsPerPage);

	// 날짜 포맷
	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleString('ko-KR', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit'
		});
	};

	// 공지사항 삭제
	const handleDelete = async (noticeId: number) => {
		if (!confirm('정말 이 공지사항을 삭제하시겠습니까?')) return;

		try {
			// 실제로는 API 호출
			setNotices(prev => prev.filter(n => n.id !== noticeId));
			alert('공지사항이 삭제되었습니다.');
		} catch (error) {
			console.error('Delete error:', error);
			alert('삭제 중 오류가 발생했습니다.');
		}
	};

	// 고정/고정해제
	const handleTogglePin = async (noticeId: number) => {
		try {
			// 실제로는 API 호출
			setNotices(prev => prev.map(n => 
				n.id === noticeId ? { ...n, isPinned: !n.isPinned } : n
			));
		} catch (error) {
			console.error('Pin toggle error:', error);
			alert('고정 상태 변경 중 오류가 발생했습니다.');
		}
	};

	// 발행/발행취소
	const handleTogglePublish = async (noticeId: number) => {
		try {
			// 실제로는 API 호출
			setNotices(prev => prev.map(n => 
				n.id === noticeId 
					? { 
						...n, 
						isPublished: !n.isPublished,
						publishedAt: !n.isPublished ? new Date().toISOString() : undefined
					} 
					: n
			));
		} catch (error) {
			console.error('Publish toggle error:', error);
			alert('발행 상태 변경 중 오류가 발생했습니다.');
		}
	};

	return (
		<AdminAuthGuard requiredPermission="notice">
			<AdminLayout>
				<div className="space-y-6">
					{/* 헤더 */}
					<div className="flex items-center justify-between">
						<div>
							<h1 className="text-3xl font-bold text-gray-900">공지사항 관리</h1>
							<p className="text-gray-600">공지사항을 작성하고 관리하세요</p>
						</div>
						<Link href="/admin/notice/create">
							<Button className="bg-[#005BAC] hover:bg-[#004494] flex items-center space-x-2">
								<Plus className="w-4 h-4" />
								<span>공지사항 작성</span>
							</Button>
						</Link>
					</div>

					{/* 통계 카드 */}
					<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
						<Card>
							<CardContent className="p-6">
								<div className="flex items-center justify-between">
									<div>
										<p className="text-sm font-medium text-gray-600">전체 공지</p>
										<p className="text-2xl font-bold">{notices.length}</p>
									</div>
									<Eye className="h-8 w-8 text-gray-400" />
								</div>
							</CardContent>
						</Card>
						<Card>
							<CardContent className="p-6">
								<div className="flex items-center justify-between">
									<div>
										<p className="text-sm font-medium text-gray-600">발행됨</p>
										<p className="text-2xl font-bold text-green-600">
											{notices.filter(n => n.isPublished).length}
										</p>
									</div>
									<Calendar className="h-8 w-8 text-green-400" />
								</div>
							</CardContent>
						</Card>
						<Card>
							<CardContent className="p-6">
								<div className="flex items-center justify-between">
									<div>
										<p className="text-sm font-medium text-gray-600">임시저장</p>
										<p className="text-2xl font-bold text-yellow-600">
											{notices.filter(n => !n.isPublished).length}
										</p>
									</div>
									<Edit className="h-8 w-8 text-yellow-400" />
								</div>
							</CardContent>
						</Card>
						<Card>
							<CardContent className="p-6">
								<div className="flex items-center justify-between">
									<div>
										<p className="text-sm font-medium text-gray-600">고정됨</p>
										<p className="text-2xl font-bold text-blue-600">
											{notices.filter(n => n.isPinned).length}
										</p>
									</div>
									<Pin className="h-8 w-8 text-blue-400" />
								</div>
							</CardContent>
						</Card>
					</div>

					{/* 검색 및 필터 */}
					<Card>
						<CardContent className="p-6">
							<div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
								{/* 검색 */}
								<div className="flex-1">
									<div className="relative">
										<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
										<input
											type="text"
											placeholder="제목, 내용, 작성자로 검색..."
											value={searchTerm}
											onChange={(e) => setSearchTerm(e.target.value)}
											className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none"
										/>
									</div>
								</div>

								{/* 상태 필터 */}
								<div>
									<select
										value={filterStatus}
										onChange={(e) => setFilterStatus(e.target.value)}
										className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none"
										aria-label="공지사항 상태 필터"
									>
										<option value="all">모든 상태</option>
										<option value="published">발행됨</option>
										<option value="draft">임시저장</option>
										<option value="pinned">고정됨</option>
									</select>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* 공지사항 목록 */}
					{loading ? (
						<div className="text-center py-12">
							<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#005BAC] mx-auto mb-4"></div>
							<p className="text-gray-600">공지사항을 불러오는 중...</p>
						</div>
					) : paginatedNotices.length > 0 ? (
						<Card>
							<CardContent className="p-0">
								<div className="overflow-x-auto">
									<table className="w-full">
										<thead className="bg-gray-50">
											<tr>
												<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
													제목
												</th>
												<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
													작성자
												</th>
												<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
													상태
												</th>
												<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
													조회수
												</th>
												<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
													작성일
												</th>
												<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
													액션
												</th>
											</tr>
										</thead>
										<tbody className="bg-white divide-y divide-gray-200">
											{paginatedNotices.map((notice) => (
												<tr key={notice.id} className="hover:bg-gray-50">
													<td className="px-6 py-4">
														<div className="flex items-center space-x-3">
															{notice.isPinned && (
																<Pin className="w-4 h-4 text-red-500" />
															)}
															<div>
																<div className="text-sm font-medium text-gray-900">
																	{notice.title}
																</div>
																<div className="text-sm text-gray-500 truncate max-w-md">
																	{notice.excerpt}
																</div>
															</div>
														</div>
													</td>
													<td className="px-6 py-4 whitespace-nowrap">
														<div className="flex items-center space-x-2">
															<User className="w-4 h-4 text-gray-400" />
															<span className="text-sm text-gray-900">{notice.author}</span>
														</div>
													</td>
													<td className="px-6 py-4 whitespace-nowrap">
														<div className="flex flex-col space-y-1">
															<Badge variant={notice.isPublished ? "default" : "secondary"}>
																{notice.isPublished ? "발행됨" : "임시저장"}
															</Badge>
															{notice.isPinned && (
																<Badge variant="destructive" className="text-xs">
																	고정
																</Badge>
															)}
														</div>
													</td>
													<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
														{notice.viewCount.toLocaleString()}
													</td>
													<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
														{formatDate(notice.createdAt)}
													</td>
													<td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
														<div className="flex items-center space-x-2">
															<Link href={`/admin/notice/${notice.id}`}>
																<Button variant="outline" size="sm">
																	<Eye className="w-3 h-3 mr-1" />
																	보기
																</Button>
															</Link>
															<Link href={`/admin/notice/${notice.id}/edit`}>
																<Button variant="outline" size="sm">
																	<Edit className="w-3 h-3 mr-1" />
																	수정
																</Button>
															</Link>
															<Button
																variant="outline"
																size="sm"
																onClick={() => handleTogglePin(notice.id)}
																className={notice.isPinned ? "text-red-600" : ""}
															>
																<Pin className="w-3 h-3 mr-1" />
																{notice.isPinned ? "고정해제" : "고정"}
															</Button>
															<Button
																variant="outline"
																size="sm"
																onClick={() => handleTogglePublish(notice.id)}
																className={notice.isPublished ? "text-yellow-600" : "text-green-600"}
															>
																{notice.isPublished ? "발행취소" : "발행"}
															</Button>
															<Button
																variant="outline"
																size="sm"
																onClick={() => handleDelete(notice.id)}
																className="text-red-600 hover:bg-red-50"
															>
																<Trash2 className="w-3 h-3 mr-1" />
																삭제
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
								<Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
								<h3 className="text-xl font-semibold text-gray-900 mb-2">공지사항이 없습니다</h3>
								<p className="text-gray-600 mb-6">첫 번째 공지사항을 작성해보세요.</p>
								<Link href="/admin/notice/create">
									<Button className="bg-[#005BAC] hover:bg-[#004494]">
										공지사항 작성하기
									</Button>
								</Link>
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
