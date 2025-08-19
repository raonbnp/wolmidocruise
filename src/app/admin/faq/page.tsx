"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminAuthGuard from "@/components/admin/AdminAuthGuard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
	Search,
	Plus,
	Edit,
	Trash2,
	Eye,
	EyeOff,
	ChevronDown,
	ChevronRight,
	HelpCircle,
	Save,
	X,
	AlertCircle,
	Check,
	RefreshCw
} from "lucide-react";

// FAQ 타입
interface FAQ {
	id: number;
	question: string;
	answer: string;
	category: string;
	isActive: boolean;
	viewCount: number;
	createdAt: string;
	updatedAt: string;
	createdBy: string;
}

// FAQ 카테고리
const FAQ_CATEGORIES = [
	"예약/결제",
	"크루즈 이용",
	"취소/환불",
	"시설/편의",
	"기타"
];

// 더미 FAQ 데이터
const dummyFAQs: FAQ[] = [
	{
		id: 1,
		question: "예약 취소는 언제까지 가능한가요?",
		answer: "예약 취소는 운항일 기준 24시간 전까지 가능합니다. 24시간 이내 취소 시에는 취소 수수료가 발생할 수 있습니다. 자세한 취소 정책은 예약 시 안내된 약관을 확인해 주세요.",
		category: "취소/환불",
		isActive: true,
		viewCount: 1247,
		createdAt: "2023-06-15T10:20:00Z",
		updatedAt: "2024-01-15T14:30:00Z",
		createdBy: "김관리"
	},
	{
		id: 2,
		question: "날씨가 나쁠 때도 운항하나요?",
		answer: "안전을 위해 기상청 발표 기준 풍속 10m/s 이상, 파고 2m 이상 시에는 운항을 중단합니다. 운항 중단 시에는 100% 환불 또는 일정 변경이 가능합니다. 운항 여부는 당일 오전에 최종 결정되며, 문자와 전화로 안내드립니다.",
		category: "크루즈 이용",
		isActive: true,
		viewCount: 892,
		createdAt: "2023-07-20T09:15:00Z",
		updatedAt: "2023-12-10T11:20:00Z",
		createdBy: "이운영"
	},
	{
		id: 3,
		question: "어린이 요금은 몇 살부터 적용되나요?",
		answer: "어린이 요금은 만 3세부터 12세까지 적용됩니다. 만 2세 이하는 무료이나 별도 좌석이 제공되지 않습니다. 어린이 요금은 성인 요금의 약 70% 수준입니다.",
		category: "예약/결제",
		isActive: true,
		viewCount: 654,
		createdAt: "2023-08-05T16:30:00Z",
		updatedAt: "2024-01-20T09:45:00Z",
		createdBy: "김관리"
	},
	{
		id: 4,
		question: "크루즈 내에서 식사는 어떻게 하나요?",
		answer: "크루즈 내에는 간단한 스낵과 음료를 판매하는 매점이 있습니다. 패키지 상품의 경우 식사가 포함되어 있으며, 일반 크루즈의 경우 개별 구매가 가능합니다. 외부 음식 반입은 제한됩니다.",
		category: "시설/편의",
		isActive: true,
		viewCount: 423,
		createdAt: "2023-09-10T13:20:00Z",
		updatedAt: "2023-11-25T15:10:00Z",
		createdBy: "박매니저"
	},
	{
		id: 5,
		question: "주차장은 무료인가요?",
		answer: "월미도 선착장 인근 주차장을 이용하실 수 있습니다. 주차 요금은 별도이며, 평일 시간당 1,000원, 주말 시간당 1,500원입니다. 크루즈 이용객에게는 2시간 무료 주차 쿠폰을 제공합니다.",
		category: "시설/편의",
		isActive: true,
		viewCount: 789,
		createdAt: "2023-10-15T11:40:00Z",
		updatedAt: "2024-01-10T10:15:00Z",
		createdBy: "이운영"
	},
	{
		id: 6,
		question: "단체 예약 할인이 있나요?",
		answer: "20명 이상 단체 예약 시 10% 할인, 50명 이상 시 15% 할인이 적용됩니다. 단체 예약은 최소 1주일 전 사전 예약이 필요하며, 별도 상담을 통해 진행됩니다. 단체 예약 문의: 032-123-4567",
		category: "예약/결제",
		isActive: false,
		viewCount: 234,
		createdAt: "2023-11-20T14:50:00Z",
		updatedAt: "2023-12-05T16:30:00Z",
		createdBy: "김관리"
	}
];

export default function AdminFAQPage() {
	const [faqs, setFaqs] = useState<FAQ[]>([]);
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState("");
	const [filterCategory, setFilterCategory] = useState("all");
	const [filterStatus, setFilterStatus] = useState("all");
	const [showAddForm, setShowAddForm] = useState(false);
	const [editingFAQ, setEditingFAQ] = useState<FAQ | null>(null);
	const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
	const [formData, setFormData] = useState({
		question: "",
		answer: "",
		category: "예약/결제",
		isActive: true
	});
	const [errors, setErrors] = useState<{ [key: string]: string }>({});

	// 데이터 로드
	useEffect(() => {
		const loadFAQs = async () => {
			try {
				// 실제로는 API 호출
				await new Promise(resolve => setTimeout(resolve, 1000));
				setFaqs(dummyFAQs);
			} catch (error) {
				console.error('FAQs load error:', error);
			} finally {
				setLoading(false);
			}
		};

		loadFAQs();
	}, []);

	// 필터링된 FAQ 목록
	const filteredFAQs = faqs.filter(faq => {
		const matchesSearch = 
			faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
			faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesCategory = filterCategory === "all" || faq.category === filterCategory;
		const matchesStatus = 
			filterStatus === "all" || 
			(filterStatus === "active" && faq.isActive) ||
			(filterStatus === "inactive" && !faq.isActive);

		return matchesSearch && matchesCategory && matchesStatus;
	});

	// 날짜 포맷
	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString('ko-KR');
	};

	// 폼 초기화
	const resetForm = () => {
		setFormData({
			question: "",
			answer: "",
			category: "예약/결제",
			isActive: true
		});
		setErrors({});
	};

	// FAQ 편집 시작
	const startEdit = (faq: FAQ) => {
		setEditingFAQ(faq);
		setFormData({
			question: faq.question,
			answer: faq.answer,
			category: faq.category,
			isActive: faq.isActive
		});
		setShowAddForm(true);
	};

	// 폼 유효성 검사
	const validateForm = () => {
		const newErrors: { [key: string]: string } = {};

		if (!formData.question.trim()) {
			newErrors.question = "질문을 입력해주세요.";
		}
		if (!formData.answer.trim()) {
			newErrors.answer = "답변을 입력해주세요.";
		}
		if (!formData.category) {
			newErrors.category = "카테고리를 선택해주세요.";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	// FAQ 저장
	const handleSaveFAQ = async () => {
		if (!validateForm()) return;

		try {
			// 실제로는 API 호출
			await new Promise(resolve => setTimeout(resolve, 1000));

			if (editingFAQ) {
				// 수정
				setFaqs(prev => prev.map(faq => 
					faq.id === editingFAQ.id 
						? { ...faq, ...formData, updatedAt: new Date().toISOString() }
						: faq
				));
				alert('FAQ가 수정되었습니다.');
			} else {
				// 추가
				const newFAQ: FAQ = {
					id: Math.max(...faqs.map(f => f.id)) + 1,
					...formData,
					viewCount: 0,
					createdAt: new Date().toISOString(),
					updatedAt: new Date().toISOString(),
					createdBy: "현재관리자"
				};
				setFaqs(prev => [...prev, newFAQ]);
				alert('새 FAQ가 추가되었습니다.');
			}

			setShowAddForm(false);
			setEditingFAQ(null);
			resetForm();
		} catch (error) {
			console.error('FAQ save error:', error);
			alert('저장 중 오류가 발생했습니다.');
		}
	};

	// FAQ 삭제
	const handleDeleteFAQ = async (faqId: number) => {
		const faq = faqs.find(f => f.id === faqId);
		if (!faq) return;

		if (!confirm('이 FAQ를 삭제하시겠습니까?')) return;

		try {
			// 실제로는 API 호출
			setFaqs(prev => prev.filter(f => f.id !== faqId));
			alert('FAQ가 삭제되었습니다.');
		} catch (error) {
			console.error('FAQ delete error:', error);
			alert('삭제 중 오류가 발생했습니다.');
		}
	};

	// FAQ 상태 토글
	const handleToggleStatus = async (faqId: number) => {
		try {
			// 실제로는 API 호출
			setFaqs(prev => prev.map(f => 
				f.id === faqId ? { ...f, isActive: !f.isActive } : f
			));
		} catch (error) {
			console.error('Status toggle error:', error);
			alert('상태 변경 중 오류가 발생했습니다.');
		}
	};

	return (
		<AdminAuthGuard requiredPermission="faq">
			<AdminLayout>
				<div className="space-y-6">
					{/* 헤더 */}
					<div className="flex items-center justify-between">
						<div>
							<h1 className="text-3xl font-bold text-gray-900">자주묻는질문 관리</h1>
							<p className="text-gray-600">자주 묻는 질문을 관리하세요</p>
						</div>
						<div className="flex space-x-3">
							<Button
								variant="outline"
								onClick={() => window.location.reload()}
								className="flex items-center space-x-2"
							>
								<RefreshCw className="w-4 h-4" />
								<span>새로고침</span>
							</Button>
							<Button
								onClick={() => {
									resetForm();
									setEditingFAQ(null);
									setShowAddForm(true);
								}}
								className="bg-[#005BAC] hover:bg-[#004494] flex items-center space-x-2"
							>
								<Plus className="w-4 h-4" />
								<span>FAQ 추가</span>
							</Button>
						</div>
					</div>

					{/* 통계 카드 */}
					<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
						<Card>
							<CardContent className="p-6">
								<div className="flex items-center justify-between">
									<div>
										<p className="text-sm font-medium text-gray-600">전체 FAQ</p>
										<p className="text-2xl font-bold">{faqs.length}</p>
									</div>
									<HelpCircle className="h-8 w-8 text-gray-400" />
								</div>
							</CardContent>
						</Card>
						<Card>
							<CardContent className="p-6">
								<div className="flex items-center justify-between">
									<div>
										<p className="text-sm font-medium text-gray-600">활성 FAQ</p>
										<p className="text-2xl font-bold text-green-600">
											{faqs.filter(f => f.isActive).length}
										</p>
									</div>
									<Check className="h-8 w-8 text-green-400" />
								</div>
							</CardContent>
						</Card>
						<Card>
							<CardContent className="p-6">
								<div className="flex items-center justify-between">
									<div>
										<p className="text-sm font-medium text-gray-600">비활성 FAQ</p>
										<p className="text-2xl font-bold text-red-600">
											{faqs.filter(f => !f.isActive).length}
										</p>
									</div>
									<EyeOff className="h-8 w-8 text-red-400" />
								</div>
							</CardContent>
						</Card>
						<Card>
							<CardContent className="p-6">
								<div className="flex items-center justify-between">
									<div>
										<p className="text-sm font-medium text-gray-600">총 조회수</p>
										<p className="text-2xl font-bold text-blue-600">
											{faqs.reduce((sum, f) => sum + f.viewCount, 0).toLocaleString()}
										</p>
									</div>
									<Eye className="h-8 w-8 text-blue-400" />
								</div>
							</CardContent>
						</Card>
					</div>

					{/* 검색 및 필터 */}
					<Card>
						<CardContent className="p-6">
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
								{/* 검색 */}
								<div>
									<div className="relative">
										<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
										<input
											type="text"
											placeholder="질문, 답변으로 검색..."
											value={searchTerm}
											onChange={(e) => setSearchTerm(e.target.value)}
											className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none"
										/>
									</div>
								</div>

								{/* 카테고리 필터 */}
								<div>
									<select
										value={filterCategory}
										onChange={(e) => setFilterCategory(e.target.value)}
										className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none"
										aria-label="카테고리 필터"
									>
										<option value="all">모든 카테고리</option>
										{FAQ_CATEGORIES.map(category => (
											<option key={category} value={category}>{category}</option>
										))}
									</select>
								</div>

								{/* 상태 필터 */}
								<div>
									<select
										value={filterStatus}
										onChange={(e) => setFilterStatus(e.target.value)}
										className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none"
										aria-label="상태 필터"
									>
										<option value="all">모든 상태</option>
										<option value="active">활성</option>
										<option value="inactive">비활성</option>
									</select>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* FAQ 목록 */}
					{loading ? (
						<div className="text-center py-12">
							<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#005BAC] mx-auto mb-4"></div>
							<p className="text-gray-600">FAQ 목록을 불러오는 중...</p>
						</div>
					) : filteredFAQs.length > 0 ? (
						<Card>
							<CardContent className="p-0">
								<div className="space-y-2">
									{filteredFAQs.map((faq) => (
										<div key={faq.id} className="border-b border-gray-200 last:border-b-0">
											<div className="p-4 hover:bg-gray-50">
												<div className="flex items-center justify-between">
													<div className="flex-1">
														<div className="flex items-center space-x-3 mb-2">
															<button
																onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
																className="flex items-center space-x-2 text-left flex-1"
															>
																{expandedFAQ === faq.id ? (
																	<ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
																) : (
																	<ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
																)}
																<h3 className="text-lg font-medium text-gray-900 hover:text-[#005BAC] transition-colors">
																	{faq.question}
																</h3>
															</button>
															<div className="flex items-center space-x-2">
																<Badge variant="secondary">{faq.category}</Badge>
																<Badge variant={faq.isActive ? "default" : "destructive"}>
																	{faq.isActive ? "활성" : "비활성"}
																</Badge>
															</div>
														</div>
														<div className="flex items-center space-x-4 text-sm text-gray-500">
															<span>조회 {faq.viewCount.toLocaleString()}회</span>
															<span>작성: {faq.createdBy}</span>
															<span>등록: {formatDate(faq.createdAt)}</span>
															<span>수정: {formatDate(faq.updatedAt)}</span>
														</div>
													</div>
													<div className="flex items-center space-x-2">
														<Button
															onClick={() => startEdit(faq)}
															variant="outline"
															size="sm"
														>
															<Edit className="w-3 h-3 mr-1" />
															수정
														</Button>
														<Button
															onClick={() => handleToggleStatus(faq.id)}
															variant="outline"
															size="sm"
															className={faq.isActive ? "text-red-600 hover:bg-red-50" : "text-green-600 hover:bg-green-50"}
														>
															{faq.isActive ? <EyeOff className="w-3 h-3 mr-1" /> : <Eye className="w-3 h-3 mr-1" />}
															{faq.isActive ? "비활성화" : "활성화"}
														</Button>
														<Button
															onClick={() => handleDeleteFAQ(faq.id)}
															variant="outline"
															size="sm"
															className="text-red-600 hover:bg-red-50"
														>
															<Trash2 className="w-3 h-3 mr-1" />
															삭제
														</Button>
													</div>
												</div>
												{expandedFAQ === faq.id && (
													<div className="mt-4 pt-4 border-t border-gray-200">
														<div className="prose max-w-none">
															<p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
																{faq.answer}
															</p>
														</div>
													</div>
												)}
											</div>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					) : (
						<Card>
							<CardContent className="p-12 text-center">
								<HelpCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
								<h3 className="text-xl font-semibold text-gray-900 mb-2">FAQ가 없습니다</h3>
								<p className="text-gray-600 mb-6">검색 조건에 맞는 FAQ가 없습니다.</p>
								<Button
									onClick={() => {
										resetForm();
										setEditingFAQ(null);
										setShowAddForm(true);
									}}
									className="bg-[#005BAC] hover:bg-[#004494]"
								>
									첫 번째 FAQ 작성하기
								</Button>
							</CardContent>
						</Card>
					)}

					{/* FAQ 추가/수정 모달 */}
					{showAddForm && (
						<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
							<div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
								<div className="flex items-center justify-between mb-6">
									<h2 className="text-xl font-semibold">
										{editingFAQ ? 'FAQ 수정' : '새 FAQ 추가'}
									</h2>
									<Button
										onClick={() => {
											setShowAddForm(false);
											setEditingFAQ(null);
											resetForm();
										}}
										variant="ghost"
										size="sm"
									>
										<X className="w-4 h-4" />
									</Button>
								</div>

								<div className="space-y-6">
									{/* 카테고리 */}
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											카테고리 <span className="text-red-500">*</span>
										</label>
										<select
											value={formData.category}
											onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
											className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none ${
												errors.category ? 'border-red-500' : 'border-gray-300'
											}`}
											aria-label="FAQ 카테고리 선택"
										>
											{FAQ_CATEGORIES.map(category => (
												<option key={category} value={category}>{category}</option>
											))}
										</select>
										{errors.category && (
											<p className="mt-1 text-sm text-red-600 flex items-center">
												<AlertCircle className="w-4 h-4 mr-1" />
												{errors.category}
											</p>
										)}
									</div>

									{/* 질문 */}
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											질문 <span className="text-red-500">*</span>
										</label>
										<input
											type="text"
											value={formData.question}
											onChange={(e) => setFormData(prev => ({ ...prev, question: e.target.value }))}
											className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none ${
												errors.question ? 'border-red-500' : 'border-gray-300'
											}`}
											placeholder="자주 묻는 질문을 입력하세요"
										/>
										{errors.question && (
											<p className="mt-1 text-sm text-red-600 flex items-center">
												<AlertCircle className="w-4 h-4 mr-1" />
												{errors.question}
											</p>
										)}
									</div>

									{/* 답변 */}
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											답변 <span className="text-red-500">*</span>
										</label>
										<textarea
											value={formData.answer}
											onChange={(e) => setFormData(prev => ({ ...prev, answer: e.target.value }))}
											rows={8}
											className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none resize-none ${
												errors.answer ? 'border-red-500' : 'border-gray-300'
											}`}
											placeholder="질문에 대한 상세한 답변을 입력하세요"
										/>
										{errors.answer && (
											<p className="mt-1 text-sm text-red-600 flex items-center">
												<AlertCircle className="w-4 h-4 mr-1" />
												{errors.answer}
											</p>
										)}
									</div>

									{/* 상태 */}
									<div>
										<label className="flex items-center space-x-2">
											<input
												type="checkbox"
												checked={formData.isActive}
												onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
												className="w-4 h-4 text-[#005BAC] border-gray-300 rounded focus:ring-[#005BAC]"
											/>
											<span className="text-sm font-medium text-gray-700">활성 FAQ</span>
										</label>
									</div>
								</div>

								<div className="flex justify-end space-x-3 mt-6">
									<Button
										onClick={() => {
											setShowAddForm(false);
											setEditingFAQ(null);
											resetForm();
										}}
										variant="outline"
									>
										취소
									</Button>
									<Button
										onClick={handleSaveFAQ}
										className="bg-[#005BAC] hover:bg-[#004494]"
									>
										<Save className="w-4 h-4 mr-2" />
										{editingFAQ ? '수정' : '추가'}
									</Button>
								</div>
							</div>
						</div>
					)}
				</div>
			</AdminLayout>
		</AdminAuthGuard>
	);
}
