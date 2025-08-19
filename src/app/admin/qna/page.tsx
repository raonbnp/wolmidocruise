"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminAuthGuard from "@/components/admin/AdminAuthGuard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
	Search,
	MessageSquare,
	Reply,
	Eye,
	Clock,
	User,
	Mail,
	Phone,
	Calendar,
	Filter,
	RefreshCw,
	AlertCircle,
	CheckCircle,
	MessageCircleQuestion,
	Send,
	X
} from "lucide-react";

// Q&A 상태 타입
type QnAStatus = "pending" | "answered" | "closed";

// Q&A 타입
interface QnA {
	id: number;
	title: string;
	content: string;
	category: string;
	status: QnAStatus;
	isPublic: boolean;
	customerName: string;
	customerEmail: string;
	customerPhone?: string;
	answer?: string;
	answeredBy?: string;
	answeredAt?: string;
	createdAt: string;
	updatedAt: string;
}

// Q&A 카테고리
const QNA_CATEGORIES = [
	"예약/결제",
	"크루즈 이용",
	"취소/환불",
	"시설/편의",
	"기타"
];

// 더미 Q&A 데이터
const dummyQnAs: QnA[] = [
	{
		id: 1,
		title: "불꽃 크루즈 예약 가능한 날짜가 언제인가요?",
		content: "3월 중에 불꽃 크루즈를 예약하고 싶은데, 가능한 날짜와 시간을 알려주세요. 가족 4명(성인 2명, 어린이 2명)으로 예약하려고 합니다.",
		category: "예약/결제",
		status: "pending",
		isPublic: true,
		customerName: "김민수",
		customerEmail: "minsu@example.com",
		customerPhone: "010-1234-5678",
		createdAt: "2024-01-25T14:30:00Z",
		updatedAt: "2024-01-25T14:30:00Z"
	},
	{
		id: 2,
		title: "크루즈 내 휠체어 이용이 가능한가요?",
		content: "할머니께서 휠체어를 이용하시는데, 크루즈 내에서 휠체어 이용이 가능한지 궁금합니다. 별도로 준비해야 할 것이 있다면 알려주세요.",
		category: "시설/편의",
		status: "answered",
		isPublic: true,
		customerName: "이영희",
		customerEmail: "younghee@example.com",
		customerPhone: "010-9876-5432",
		answer: "네, 저희 크루즈는 휠체어 이용이 가능합니다. 승선 시 직원이 도움을 드리며, 크루즈 내에는 휠체어 전용 공간이 마련되어 있습니다. 예약 시 휠체어 이용 고객이 계시다고 미리 알려주시면 더욱 원활한 서비스를 제공할 수 있습니다.",
		answeredBy: "김관리",
		answeredAt: "2024-01-24T16:45:00Z",
		createdAt: "2024-01-24T10:20:00Z",
		updatedAt: "2024-01-24T16:45:00Z"
	},
	{
		id: 3,
		title: "단체 예약 시 할인 혜택이 있나요?",
		content: "회사 워크숍으로 30명 정도 예약하려고 하는데, 단체 할인이나 특별 혜택이 있는지 문의드립니다.",
		category: "예약/결제",
		status: "answered",
		isPublic: false,
		customerName: "박철수",
		customerEmail: "chulsoo@company.com",
		customerPhone: "010-5555-6666",
		answer: "30명 단체 예약의 경우 15% 할인이 적용됩니다. 또한 단체 전용 구역 배정과 기념품 증정 혜택도 있습니다. 자세한 상담을 위해 단체예약 담당자(032-123-4567)로 연락주시기 바랍니다.",
		answeredBy: "이운영",
		answeredAt: "2024-01-23T11:30:00Z",
		createdAt: "2024-01-23T09:15:00Z",
		updatedAt: "2024-01-23T11:30:00Z"
	},
	{
		id: 4,
		title: "날씨가 안 좋을 때 환불 정책이 어떻게 되나요?",
		content: "다음 주에 예약이 있는데 일기예보상 비가 온다고 합니다. 날씨 때문에 운항이 취소되면 환불이 가능한가요?",
		category: "취소/환불",
		status: "answered",
		isPublic: true,
		customerName: "최수진",
		customerEmail: "sujin@example.com",
		answer: "기상청 발표 기준으로 안전 운항이 어려운 경우 100% 전액 환불 또는 일정 변경이 가능합니다. 운항 취소 결정은 당일 오전에 최종 확정되며, 문자와 전화로 안내드립니다. 고객님의 안전을 최우선으로 하고 있으니 안심하시기 바랍니다.",
		answeredBy: "박매니저",
		answeredAt: "2024-01-22T14:20:00Z",
		createdAt: "2024-01-22T13:45:00Z",
		updatedAt: "2024-01-22T14:20:00Z"
	},
	{
		id: 5,
		title: "크루즈 내에서 흡연이 가능한가요?",
		content: "크루즈 이용 중 흡연 가능한 공간이 있는지 궁금합니다.",
		category: "크루즈 이용",
		status: "pending",
		isPublic: true,
		customerName: "정민호",
		customerEmail: "minho@example.com",
		customerPhone: "010-3333-4444",
		createdAt: "2024-01-25T11:20:00Z",
		updatedAt: "2024-01-25T11:20:00Z"
	}
];

export default function AdminQnAPage() {
	const [qnas, setQnas] = useState<QnA[]>([]);
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState("");
	const [filterCategory, setFilterCategory] = useState("all");
	const [filterStatus, setFilterStatus] = useState("all");
	const [selectedQnA, setSelectedQnA] = useState<QnA | null>(null);
	const [showAnswerForm, setShowAnswerForm] = useState(false);
	const [answerText, setAnswerText] = useState("");
	const [expandedQnA, setExpandedQnA] = useState<number | null>(null);

	// 데이터 로드
	useEffect(() => {
		const loadQnAs = async () => {
			try {
				// 실제로는 API 호출
				await new Promise(resolve => setTimeout(resolve, 1000));
				setQnas(dummyQnAs);
			} catch (error) {
				console.error('QnAs load error:', error);
			} finally {
				setLoading(false);
			}
		};

		loadQnAs();
	}, []);

	// 필터링된 Q&A 목록
	const filteredQnAs = qnas.filter(qna => {
		const matchesSearch = 
			qna.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			qna.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
			qna.customerName.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesCategory = filterCategory === "all" || qna.category === filterCategory;
		const matchesStatus = filterStatus === "all" || qna.status === filterStatus;

		return matchesSearch && matchesCategory && matchesStatus;
	});

	// 날짜 포맷
	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString('ko-KR', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	};

	// 상태별 색상
	const getStatusColor = (status: QnAStatus) => {
		switch (status) {
			case "pending": return "bg-yellow-100 text-yellow-800";
			case "answered": return "bg-green-100 text-green-800";
			case "closed": return "bg-gray-100 text-gray-800";
			default: return "bg-gray-100 text-gray-800";
		}
	};

	// 상태명 한글
	const getStatusText = (status: QnAStatus) => {
		switch (status) {
			case "pending": return "답변대기";
			case "answered": return "답변완료";
			case "closed": return "종료";
			default: return "알 수 없음";
		}
	};

	// 답변 작성
	const handleAnswer = (qna: QnA) => {
		setSelectedQnA(qna);
		setAnswerText(qna.answer || "");
		setShowAnswerForm(true);
	};

	// 답변 저장
	const handleSaveAnswer = async () => {
		if (!selectedQnA || !answerText.trim()) {
			alert('답변 내용을 입력해주세요.');
			return;
		}

		try {
			// 실제로는 API 호출
			await new Promise(resolve => setTimeout(resolve, 1000));

			setQnas(prev => prev.map(qna => 
				qna.id === selectedQnA.id 
					? {
						...qna,
						answer: answerText,
						status: "answered" as QnAStatus,
						answeredBy: "현재관리자",
						answeredAt: new Date().toISOString(),
						updatedAt: new Date().toISOString()
					}
					: qna
			));

			alert('답변이 저장되었습니다.');
			setShowAnswerForm(false);
			setSelectedQnA(null);
			setAnswerText("");
		} catch (error) {
			console.error('Answer save error:', error);
			alert('답변 저장 중 오류가 발생했습니다.');
		}
	};

	// Q&A 상태 변경
	const handleStatusChange = async (qnaId: number, newStatus: QnAStatus) => {
		try {
			// 실제로는 API 호출
			setQnas(prev => prev.map(qna => 
				qna.id === qnaId 
					? { ...qna, status: newStatus, updatedAt: new Date().toISOString() }
					: qna
			));
		} catch (error) {
			console.error('Status change error:', error);
			alert('상태 변경 중 오류가 발생했습니다.');
		}
	};

	return (
		<AdminAuthGuard requiredPermission="qna">
			<AdminLayout>
				<div className="space-y-6">
					{/* 헤더 */}
					<div className="flex items-center justify-between">
						<div>
							<h1 className="text-3xl font-bold text-gray-900">묻고답하기 관리</h1>
							<p className="text-gray-600">고객 문의사항을 확인하고 답변하세요</p>
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
						</div>
					</div>

					{/* 통계 카드 */}
					<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
						<Card>
							<CardContent className="p-6">
								<div className="flex items-center justify-between">
									<div>
										<p className="text-sm font-medium text-gray-600">전체 문의</p>
										<p className="text-2xl font-bold">{qnas.length}</p>
									</div>
									<MessageSquare className="h-8 w-8 text-gray-400" />
								</div>
							</CardContent>
						</Card>
						<Card>
							<CardContent className="p-6">
								<div className="flex items-center justify-between">
									<div>
										<p className="text-sm font-medium text-gray-600">답변대기</p>
										<p className="text-2xl font-bold text-yellow-600">
											{qnas.filter(q => q.status === 'pending').length}
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
										<p className="text-sm font-medium text-gray-600">답변완료</p>
										<p className="text-2xl font-bold text-green-600">
											{qnas.filter(q => q.status === 'answered').length}
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
										<p className="text-sm font-medium text-gray-600">종료</p>
										<p className="text-2xl font-bold text-gray-600">
											{qnas.filter(q => q.status === 'closed').length}
										</p>
									</div>
									<MessageCircleQuestion className="h-8 w-8 text-gray-400" />
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
											placeholder="제목, 내용, 작성자로 검색..."
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
										{QNA_CATEGORIES.map(category => (
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
										<option value="pending">답변대기</option>
										<option value="answered">답변완료</option>
										<option value="closed">종료</option>
									</select>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Q&A 목록 */}
					{loading ? (
						<div className="text-center py-12">
							<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#005BAC] mx-auto mb-4"></div>
							<p className="text-gray-600">문의사항을 불러오는 중...</p>
						</div>
					) : filteredQnAs.length > 0 ? (
						<Card>
							<CardContent className="p-0">
								<div className="space-y-0">
									{filteredQnAs.map((qna) => (
										<div key={qna.id} className="border-b border-gray-200 last:border-b-0">
											<div className="p-6 hover:bg-gray-50">
												<div className="flex items-start justify-between mb-4">
													<div className="flex-1">
														<div className="flex items-center space-x-3 mb-2">
															<h3 className="text-lg font-semibold text-gray-900">
																{qna.title}
															</h3>
															<Badge className={getStatusColor(qna.status)}>
																{getStatusText(qna.status)}
															</Badge>
															<Badge variant="secondary">{qna.category}</Badge>
															{!qna.isPublic && (
																<Badge variant="destructive" className="text-white">비공개</Badge>
															)}
														</div>
														<div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
															<div className="flex items-center space-x-1">
																<User className="w-4 h-4" />
																<span>{qna.customerName}</span>
															</div>
															<div className="flex items-center space-x-1">
																<Mail className="w-4 h-4" />
																<span>{qna.customerEmail}</span>
															</div>
															{qna.customerPhone && (
																<div className="flex items-center space-x-1">
																	<Phone className="w-4 h-4" />
																	<span>{qna.customerPhone}</span>
																</div>
															)}
															<div className="flex items-center space-x-1">
																<Calendar className="w-4 h-4" />
																<span>{formatDate(qna.createdAt)}</span>
															</div>
														</div>
													</div>
													<div className="flex items-center space-x-2">
														{qna.status === 'pending' && (
															<Button
																onClick={() => handleAnswer(qna)}
																className="bg-[#005BAC] hover:bg-[#004494]"
																size="sm"
															>
																<Reply className="w-3 h-3 mr-1" />
																답변하기
															</Button>
														)}
														{qna.status === 'answered' && (
															<Button
																onClick={() => handleAnswer(qna)}
																variant="outline"
																size="sm"
															>
																<Reply className="w-3 h-3 mr-1" />
																답변수정
															</Button>
														)}
														<select
															value={qna.status}
															onChange={(e) => handleStatusChange(qna.id, e.target.value as QnAStatus)}
															className="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none"
															aria-label="상태 변경"
														>
															<option value="pending">답변대기</option>
															<option value="answered">답변완료</option>
															<option value="closed">종료</option>
														</select>
													</div>
												</div>

												{/* 질문 내용 */}
												<div className="bg-gray-50 rounded-lg p-4 mb-4">
													<p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
														{qna.content}
													</p>
												</div>

												{/* 답변 내용 */}
												{qna.answer && (
													<div className="bg-blue-50 rounded-lg p-4 border-l-4 border-[#005BAC]">
														<div className="flex items-center space-x-2 mb-2">
															<Reply className="w-4 h-4 text-[#005BAC]" />
															<span className="text-sm font-medium text-[#005BAC]">
																관리자 답변
															</span>
															{qna.answeredBy && (
																<span className="text-sm text-gray-500">
																	by {qna.answeredBy}
																</span>
															)}
															{qna.answeredAt && (
																<span className="text-sm text-gray-500">
																	• {formatDate(qna.answeredAt)}
																</span>
															)}
														</div>
														<p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
															{qna.answer}
														</p>
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
								<MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
								<h3 className="text-xl font-semibold text-gray-900 mb-2">문의사항이 없습니다</h3>
								<p className="text-gray-600">검색 조건에 맞는 문의사항이 없습니다.</p>
							</CardContent>
						</Card>
					)}

					{/* 답변 작성 모달 */}
					{showAnswerForm && selectedQnA && (
						<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
							<div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-screen overflow-y-auto">
								<div className="flex items-center justify-between mb-6">
									<h2 className="text-xl font-semibold">
										{selectedQnA.answer ? '답변 수정' : '답변 작성'}
									</h2>
									<Button
										onClick={() => {
											setShowAnswerForm(false);
											setSelectedQnA(null);
											setAnswerText("");
										}}
										variant="ghost"
										size="sm"
									>
										<X className="w-4 h-4" />
									</Button>
								</div>

								{/* 원본 질문 */}
								<div className="mb-6">
									<h3 className="text-lg font-medium text-gray-900 mb-2">
										{selectedQnA.title}
									</h3>
									<div className="bg-gray-50 rounded-lg p-4">
										<div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
											<span>{selectedQnA.customerName}</span>
											<span>{selectedQnA.customerEmail}</span>
											<span>{formatDate(selectedQnA.createdAt)}</span>
										</div>
										<p className="text-gray-700 whitespace-pre-wrap">
											{selectedQnA.content}
										</p>
									</div>
								</div>

								{/* 답변 작성 */}
								<div className="space-y-4">
									<label className="block text-sm font-medium text-gray-700">
										답변 내용 <span className="text-red-500">*</span>
									</label>
									<textarea
										value={answerText}
										onChange={(e) => setAnswerText(e.target.value)}
										rows={8}
										className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none resize-none"
										placeholder="고객님의 문의에 대한 답변을 작성해주세요..."
									/>
								</div>

								<div className="flex justify-end space-x-3 mt-6">
									<Button
										onClick={() => {
											setShowAnswerForm(false);
											setSelectedQnA(null);
											setAnswerText("");
										}}
										variant="outline"
									>
										취소
									</Button>
									<Button
										onClick={handleSaveAnswer}
										className="bg-[#005BAC] hover:bg-[#004494]"
									>
										<Send className="w-4 h-4 mr-2" />
										{selectedQnA.answer ? '답변 수정' : '답변 등록'}
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
