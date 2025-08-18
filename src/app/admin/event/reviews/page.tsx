"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminAuthGuard from "@/components/admin/AdminAuthGuard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
	Search,
	Plus,
	Edit,
	Trash2,
	Eye,
	EyeOff,
	Star,
	User,
	Calendar,
	Filter,
	Save,
	X,
	AlertCircle,
	Check,
	RefreshCw,
	MessageSquare,
	Heart,
	MessageCircle,
	Share,
	ThumbsUp,
	Upload,
	Image as ImageIcon
} from "lucide-react";

// 리뷰 상태 타입
type ReviewStatus = "active" | "inactive";

// 리뷰 타입
interface Review {
	id: number;
	title: string;
	content: string;
	author: string;
	category: string;
	images?: string[];
	status: ReviewStatus;
	isPinned: boolean;
	likes: number;
	comments: number;
	shares: number;
	views: number;
	tags: string[];
	createdAt: string;
	updatedAt: string;
	createdBy: string;
}

// 리뷰 카테고리
const REVIEW_CATEGORIES = [
	"크루즈 후기",
	"데이트 후기", 
	"가족 여행",
	"패키지 후기",
	"야경 투어",
	"기타"
];

// 더미 리뷰 데이터
const dummyReviews: Review[] = [
	{
		id: 1,
		title: "불꽃 크루즈 후기 - 정말 환상적이었어요! 🎆",
		content: "가족과 함께 불꽃 크루즈를 이용했는데 정말 멋있었습니다. 바다 위에서 보는 불꽃놀이는 육지에서 보는 것과는 완전히 다른 느낌이었어요. 직원분들도 친절하시고 시설도 깨끗했습니다. 다음에도 꼭 이용하고 싶어요!",
		author: "김민수",
		category: "크루즈 후기",
		images: ["https://via.placeholder.com/600x400/FF5722/FFFFFF?text=Fireworks+Cruise", "https://via.placeholder.com/600x400/FF5722/FFFFFF?text=Night+View"],
		status: "active",
		isPinned: true,
		likes: 245,
		comments: 18,
		shares: 32,
		views: 1847,
		tags: ["불꽃크루즈", "가족여행", "추천"],
		createdAt: "2024-01-16T14:30:00Z",
		updatedAt: "2024-01-20T10:30:00Z",
		createdBy: "김관리"
	},
	{
		id: 2,
		title: "낙조 크루즈 로맨틱한 데이트 🌅",
		content: "커플 여행으로 낙조 크루즈를 이용했습니다. 석양이 바다에 비치는 모습이 정말 로맨틱했어요. 사진도 예쁘게 많이 찍을 수 있었고, 분위기가 너무 좋았습니다. 프러포즈 장소로도 완벽할 것 같아요!",
		author: "이영희",
		category: "데이트 후기",
		images: ["https://via.placeholder.com/600x400/FF6B35/FFFFFF?text=Sunset+Cruise"],
		status: "active",
		isPinned: false,
		likes: 189,
		comments: 12,
		shares: 24,
		views: 1234,
		tags: ["낙조크루즈", "커플데이트", "로맨틱"],
		createdAt: "2024-01-19T09:15:00Z",
		updatedAt: "2024-01-19T09:15:00Z",
		createdBy: "이운영"
	},
	{
		id: 3,
		title: "월미도 패키지 여행 완전 만족! 👍",
		content: "패키지 여행으로 예약했는데 정말 알차고 좋았습니다. 크루즈뿐만 아니라 식사도 맛있었고, 월미도 관광도 잘 구성되어 있었어요. 가격은 조금 비싸지만 그만한 가치가 있다고 생각합니다. 친구들에게도 추천했어요!",
		author: "최수진",
		category: "패키지 후기",
		images: ["https://via.placeholder.com/600x400/4CAF50/FFFFFF?text=Package+Tour", "https://via.placeholder.com/600x400/4CAF50/FFFFFF?text=Wolmido"],
		status: "active",
		isPinned: true,
		likes: 312,
		comments: 28,
		shares: 45,
		views: 2156,
		tags: ["패키지여행", "월미도", "강추"],
		createdAt: "2024-01-23T11:30:00Z",
		updatedAt: "2024-01-23T14:20:00Z",
		createdBy: "박매니저"
	},
	{
		id: 4,
		title: "가족 나들이로 행복 크루즈 이용 후기 👨‍👩‍👧‍👦",
		content: "아이들과 함께 행복 크루즈를 탔는데 정말 즐거웠어요! 갈매기 먹이주기 체험도 있고, 아이들이 너무 좋아했습니다. 안전 시설도 잘 되어 있어서 안심하고 이용할 수 있었어요. 가족 단위로 오시는 분들께 추천드려요!",
		author: "박철수",
		category: "가족 여행",
		images: ["https://via.placeholder.com/600x400/2196F3/FFFFFF?text=Family+Cruise"],
		status: "active",
		isPinned: false,
		likes: 156,
		comments: 15,
		shares: 19,
		views: 987,
		tags: ["가족여행", "행복크루즈", "아이들"],
		createdAt: "2024-01-21T16:45:00Z",
		updatedAt: "2024-01-21T16:45:00Z",
		createdBy: "김관리"
	},
	{
		id: 5,
		title: "월미도 야경과 함께한 특별한 밤 🌃",
		content: "야간 크루즈를 이용했는데 월미도의 야경이 정말 아름다웠습니다. 인천 앞바다에서 바라본 도시의 불빛들이 환상적이었어요. 사진 찍기에도 좋고, 특별한 날에 이용하기 완벽한 코스인 것 같아요!",
		author: "정민호",
		category: "야경 투어",
		status: "inactive",
		isPinned: false,
		likes: 89,
		comments: 7,
		shares: 12,
		views: 456,
		tags: ["야경투어", "월미도", "특별한날"],
		createdAt: "2024-01-25T13:20:00Z",
		updatedAt: "2024-01-25T13:20:00Z",
		createdBy: "이운영"
	}
];

export default function AdminReviewsPage() {
	const [reviews, setReviews] = useState<Review[]>([]);
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState("");
	const [filterCategory, setFilterCategory] = useState("all");
	const [filterStatus, setFilterStatus] = useState("all");
	const [showAddForm, setShowAddForm] = useState(false);
	const [editingReview, setEditingReview] = useState<Review | null>(null);
	const [formData, setFormData] = useState({
		title: "",
		content: "",
		author: "",
		category: "크루즈 후기",
		imageUrl: "",
		status: "active" as ReviewStatus,
		isPinned: false,
		tags: [] as string[]
	});
	const [errors, setErrors] = useState<{ [key: string]: string }>({});
	const [newTag, setNewTag] = useState("");

	// 데이터 로드
	useEffect(() => {
		const loadReviews = async () => {
			try {
				// 실제로는 API 호출
				await new Promise(resolve => setTimeout(resolve, 1000));
				setReviews(dummyReviews);
			} catch (error) {
				console.error('Reviews load error:', error);
			} finally {
				setLoading(false);
			}
		};

		loadReviews();
	}, []);

	// 필터링된 리뷰 목록
	const filteredReviews = reviews.filter(review => {
		const matchesSearch = 
			review.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			review.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
			review.author.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesCategory = filterCategory === "all" || review.category === filterCategory;
		const matchesStatus = filterStatus === "all" || review.status === filterStatus;

		return matchesSearch && matchesCategory && matchesStatus;
	});

	// 날짜 포맷
	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString('ko-KR');
	};

	// 상태별 색상
	const getStatusColor = (status: ReviewStatus) => {
		switch (status) {
			case "active": return "bg-green-100 text-green-800";
			case "inactive": return "bg-gray-100 text-gray-800";
			default: return "bg-gray-100 text-gray-800";
		}
	};

	// 상태명 한글
	const getStatusText = (status: ReviewStatus) => {
		switch (status) {
			case "active": return "활성";
			case "inactive": return "비활성";
			default: return "알 수 없음";
		}
	};

	// 숫자 포맷
	const formatNumber = (num: number) => {
		if (num >= 1000) {
			return (num / 1000).toFixed(1) + 'K';
		}
		return num.toString();
	};

	// 폼 초기화
	const resetForm = () => {
		setFormData({
			title: "",
			content: "",
			author: "",
			category: "크루즈 후기",
			imageUrl: "",
			status: "active",
			isPinned: false,
			tags: []
		});
		setErrors({});
		setNewTag("");
	};

	// 리뷰 편집 시작
	const startEdit = (review: Review) => {
		setEditingReview(review);
		setFormData({
			title: review.title,
			content: review.content,
			author: review.author,
			category: review.category,
			imageUrl: review.images?.[0] || "",
			status: review.status,
			isPinned: review.isPinned,
			tags: [...review.tags]
		});
		setShowAddForm(true);
	};

	// 태그 추가
	const addTag = () => {
		if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
			setFormData(prev => ({
				...prev,
				tags: [...prev.tags, newTag.trim()]
			}));
			setNewTag("");
		}
	};

	// 태그 제거
	const removeTag = (index: number) => {
		setFormData(prev => ({
			...prev,
			tags: prev.tags.filter((_, i) => i !== index)
		}));
	};

	// 폼 유효성 검사
	const validateForm = () => {
		const newErrors: { [key: string]: string } = {};

		if (!formData.title.trim()) {
			newErrors.title = "제목을 입력해주세요.";
		}
		if (!formData.content.trim()) {
			newErrors.content = "내용을 입력해주세요.";
		}
		if (!formData.author.trim()) {
			newErrors.author = "작성자를 입력해주세요.";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	// 리뷰 저장
	const handleSaveReview = async () => {
		if (!validateForm()) return;

		try {
			// 실제로는 API 호출
			await new Promise(resolve => setTimeout(resolve, 1000));

			if (editingReview) {
				// 수정
				setReviews(prev => prev.map(review => 
					review.id === editingReview.id 
						? { 
							...review, 
							...formData,
							images: formData.imageUrl ? [formData.imageUrl] : [],
							updatedAt: new Date().toISOString() 
						}
						: review
				));
				alert('리뷰가 수정되었습니다.');
			} else {
				// 추가
				const newReview: Review = {
					id: Math.max(...reviews.map(r => r.id)) + 1,
					...formData,
					images: formData.imageUrl ? [formData.imageUrl] : [],
					likes: 0,
					comments: 0,
					shares: 0,
					views: 0,
					createdAt: new Date().toISOString(),
					updatedAt: new Date().toISOString(),
					createdBy: "현재관리자"
				};
				setReviews(prev => [...prev, newReview]);
				alert('새 리뷰가 추가되었습니다.');
			}

			setShowAddForm(false);
			setEditingReview(null);
			resetForm();
		} catch (error) {
			console.error('Review save error:', error);
			alert('저장 중 오류가 발생했습니다.');
		}
	};

	// 리뷰 삭제
	const handleDeleteReview = async (reviewId: number) => {
		const review = reviews.find(r => r.id === reviewId);
		if (!review) return;

		if (!confirm('이 리뷰를 삭제하시겠습니까?')) return;

		try {
			// 실제로는 API 호출
			setReviews(prev => prev.filter(r => r.id !== reviewId));
			alert('리뷰가 삭제되었습니다.');
		} catch (error) {
			console.error('Review delete error:', error);
			alert('삭제 중 오류가 발생했습니다.');
		}
	};

	// 리뷰 상태 토글
	const handleToggleStatus = async (reviewId: number, field: 'status' | 'isPinned') => {
		try {
			// 실제로는 API 호출
			setReviews(prev => prev.map(r => 
				r.id === reviewId 
					? field === 'status' 
						? { ...r, status: r.status === 'active' ? 'inactive' : 'active' }
						: { ...r, isPinned: !r.isPinned }
					: r
			));
		} catch (error) {
			console.error('Status toggle error:', error);
			alert('상태 변경 중 오류가 발생했습니다.');
		}
	};

	return (
		<AdminAuthGuard requiredPermission="cruiseReview">
			<AdminLayout>
				<div className="space-y-6">
					{/* 헤더 */}
					<div className="flex items-center justify-between">
						<div>
							<h1 className="text-3xl font-bold text-gray-900">크루즈 리뷰 관리</h1>
							<p className="text-gray-600">크루즈 리뷰 게시글을 관리하세요</p>
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
									setEditingReview(null);
									setShowAddForm(true);
								}}
								className="bg-[#005BAC] hover:bg-[#004494] flex items-center space-x-2"
							>
								<Plus className="w-4 h-4" />
								<span>리뷰 추가</span>
							</Button>
						</div>
					</div>

					{/* 통계 카드 */}
					<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
						<Card>
							<CardContent className="p-6">
								<div className="flex items-center justify-between">
									<div>
										<p className="text-sm font-medium text-gray-600">전체 리뷰</p>
										<p className="text-2xl font-bold">{reviews.length}</p>
									</div>
									<MessageSquare className="h-8 w-8 text-gray-400" />
								</div>
							</CardContent>
						</Card>
						<Card>
							<CardContent className="p-6">
								<div className="flex items-center justify-between">
									<div>
										<p className="text-sm font-medium text-gray-600">활성 리뷰</p>
										<p className="text-2xl font-bold text-green-600">
											{reviews.filter(r => r.status === 'active').length}
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
										<p className="text-sm font-medium text-gray-600">고정 리뷰</p>
										<p className="text-2xl font-bold text-blue-600">
											{reviews.filter(r => r.isPinned).length}
										</p>
									</div>
									<Star className="h-8 w-8 text-blue-400" />
								</div>
							</CardContent>
						</Card>
						<Card>
							<CardContent className="p-6">
								<div className="flex items-center justify-between">
									<div>
										<p className="text-sm font-medium text-gray-600">총 조회수</p>
										<p className="text-2xl font-bold text-purple-600">
											{formatNumber(reviews.reduce((sum, r) => sum + r.views, 0))}
										</p>
									</div>
									<Eye className="h-8 w-8 text-purple-400" />
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
										{REVIEW_CATEGORIES.map(category => (
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

					{/* 리뷰 목록 */}
					{loading ? (
						<div className="text-center py-12">
							<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#005BAC] mx-auto mb-4"></div>
							<p className="text-gray-600">리뷰 목록을 불러오는 중...</p>
						</div>
					) : filteredReviews.length > 0 ? (
						<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
							{filteredReviews.map((review) => (
								<Card key={review.id} className="overflow-hidden hover:shadow-lg transition-shadow">
									{review.images && review.images.length > 0 && (
										<div className="relative h-48">
											<img
												src={review.images[0]}
												alt={review.title}
												className="w-full h-full object-cover"
											/>
											<div className="absolute top-2 left-2 flex space-x-2">
												<Badge variant="secondary">{review.category}</Badge>
												{review.isPinned && (
													<Badge className="bg-yellow-500 text-white">고정</Badge>
												)}
											</div>
											{review.status === 'inactive' && (
												<div className="absolute inset-0 bg-black/50 flex items-center justify-center">
													<Badge variant="destructive" className="text-sm">비활성</Badge>
												</div>
											)}
										</div>
									)}

									<CardContent className="p-4">
										<div className="space-y-3">
											{/* 제목 */}
											<h3 className="font-semibold text-lg text-gray-900 line-clamp-2">
												{review.title}
											</h3>

											{/* 작성자 */}
											<div className="flex items-center space-x-2 text-sm text-gray-600">
												<User className="w-4 h-4" />
												<span>{review.author}</span>
												<Badge className={getStatusColor(review.status)}>
													{getStatusText(review.status)}
												</Badge>
											</div>

											{/* 내용 */}
											<p className="text-sm text-gray-600 line-clamp-3">
												{review.content}
											</p>

											{/* 태그 */}
											{review.tags.length > 0 && (
												<div className="flex flex-wrap gap-1">
													{review.tags.slice(0, 3).map((tag, index) => (
														<Badge key={index} variant="outline" className="text-xs">
															#{tag}
														</Badge>
													))}
													{review.tags.length > 3 && (
														<Badge variant="outline" className="text-xs">
															+{review.tags.length - 3}
														</Badge>
													)}
												</div>
											)}

											{/* 통계 */}
											<div className="grid grid-cols-4 gap-2 text-xs text-gray-500">
												<div className="flex items-center space-x-1">
													<Heart className="w-3 h-3" />
													<span>{formatNumber(review.likes)}</span>
												</div>
												<div className="flex items-center space-x-1">
													<MessageCircle className="w-3 h-3" />
													<span>{formatNumber(review.comments)}</span>
												</div>
												<div className="flex items-center space-x-1">
													<Share className="w-3 h-3" />
													<span>{formatNumber(review.shares)}</span>
												</div>
												<div className="flex items-center space-x-1">
													<Eye className="w-3 h-3" />
													<span>{formatNumber(review.views)}</span>
												</div>
											</div>

											{/* 작성자 및 날짜 */}
											<div className="flex items-center justify-between text-xs text-gray-500">
												<div className="flex items-center space-x-1">
													<span>작성: {review.createdBy}</span>
												</div>
												<span>{formatDate(review.createdAt)}</span>
											</div>

											{/* 액션 버튼 */}
											<div className="flex space-x-2 pt-2">
												<Button
													onClick={() => startEdit(review)}
													variant="outline"
													size="sm"
													className="flex-1"
												>
													<Edit className="w-3 h-3 mr-1" />
													수정
												</Button>
												<Button
													onClick={() => handleToggleStatus(review.id, 'status')}
													variant="outline"
													size="sm"
													className={`flex-1 ${review.status === 'active' ? 'text-red-600 hover:bg-red-50' : 'text-green-600 hover:bg-green-50'}`}
												>
													{review.status === 'active' ? <EyeOff className="w-3 h-3 mr-1" /> : <Eye className="w-3 h-3 mr-1" />}
													{review.status === 'active' ? '비활성' : '활성'}
												</Button>
												<Button
													onClick={() => handleToggleStatus(review.id, 'isPinned')}
													variant="outline"
													size="sm"
													className={review.isPinned ? 'text-yellow-600 hover:bg-yellow-50' : ''}
												>
													<Star className="w-3 h-3" />
												</Button>
												<Button
													onClick={() => handleDeleteReview(review.id)}
													variant="outline"
													size="sm"
													className="text-red-600 hover:bg-red-50"
												>
													<Trash2 className="w-3 h-3" />
												</Button>
											</div>
										</div>
									</CardContent>
								</Card>
							))}
						</div>
					) : (
						<Card>
							<CardContent className="p-12 text-center">
								<MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
								<h3 className="text-xl font-semibold text-gray-900 mb-2">리뷰가 없습니다</h3>
								<p className="text-gray-600 mb-6">검색 조건에 맞는 리뷰가 없습니다.</p>
								<Button
									onClick={() => {
										resetForm();
										setEditingReview(null);
										setShowAddForm(true);
									}}
									className="bg-[#005BAC] hover:bg-[#004494]"
								>
									첫 번째 리뷰 작성하기
								</Button>
							</CardContent>
						</Card>
					)}

					{/* 리뷰 추가/수정 모달 */}
					{showAddForm && (
						<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
							<div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
								<div className="flex items-center justify-between mb-6">
									<h2 className="text-xl font-semibold">
										{editingReview ? '리뷰 수정' : '새 리뷰 추가'}
									</h2>
									<Button
										onClick={() => {
											setShowAddForm(false);
											setEditingReview(null);
											resetForm();
										}}
										variant="ghost"
										size="sm"
									>
										<X className="w-4 h-4" />
									</Button>
								</div>

								<div className="space-y-6">
									{/* 기본 정보 */}
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												작성자 <span className="text-red-500">*</span>
											</label>
											<input
												type="text"
												value={formData.author}
												onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
												className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none ${
													errors.author ? 'border-red-500' : 'border-gray-300'
												}`}
												placeholder="작성자 이름"
											/>
											{errors.author && (
												<p className="mt-1 text-sm text-red-600 flex items-center">
													<AlertCircle className="w-4 h-4 mr-1" />
													{errors.author}
												</p>
											)}
										</div>

										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												카테고리 <span className="text-red-500">*</span>
											</label>
											<select
												value={formData.category}
												onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
												className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none"
												aria-label="카테고리 선택"
											>
												{REVIEW_CATEGORIES.map(category => (
													<option key={category} value={category}>{category}</option>
												))}
											</select>
										</div>
									</div>

									{/* 제목 */}
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											제목 <span className="text-red-500">*</span>
										</label>
										<input
											type="text"
											value={formData.title}
											onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
											className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none ${
												errors.title ? 'border-red-500' : 'border-gray-300'
											}`}
											placeholder="리뷰 제목을 입력하세요"
										/>
										{errors.title && (
											<p className="mt-1 text-sm text-red-600 flex items-center">
												<AlertCircle className="w-4 h-4 mr-1" />
												{errors.title}
											</p>
										)}
									</div>

									{/* 내용 */}
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											내용 <span className="text-red-500">*</span>
										</label>
										<textarea
											value={formData.content}
											onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
											rows={6}
											className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none resize-none ${
												errors.content ? 'border-red-500' : 'border-gray-300'
											}`}
											placeholder="리뷰 내용을 입력하세요"
										/>
										{errors.content && (
											<p className="mt-1 text-sm text-red-600 flex items-center">
												<AlertCircle className="w-4 h-4 mr-1" />
												{errors.content}
											</p>
										)}
									</div>

									{/* 이미지 URL */}
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											이미지 URL
										</label>
										<input
											type="url"
											value={formData.imageUrl}
											onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
											className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none"
											placeholder="https://example.com/image.jpg"
										/>
									</div>

									{/* 태그 */}
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											태그
										</label>
										<div className="flex items-center space-x-2 mb-3">
											<input
												type="text"
												value={newTag}
												onChange={(e) => setNewTag(e.target.value)}
												className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none"
												placeholder="태그를 입력하세요"
												onKeyPress={(e) => {
													if (e.key === 'Enter') {
														e.preventDefault();
														addTag();
													}
												}}
											/>
											<Button
												type="button"
												onClick={addTag}
												variant="outline"
												size="sm"
											>
												<Plus className="w-4 h-4" />
											</Button>
										</div>
										<div className="flex flex-wrap gap-2">
											{formData.tags.map((tag, index) => (
												<Badge key={index} variant="secondary" className="flex items-center space-x-1">
													<span>#{tag}</span>
													<button
														type="button"
														onClick={() => removeTag(index)}
														className="ml-1 hover:text-red-600"
														title={`${tag} 태그 제거`}
													>
														<X className="w-3 h-3" />
													</button>
												</Badge>
											))}
										</div>
									</div>

									{/* 상태 */}
									<div className="flex items-center space-x-6">
										<label className="flex items-center space-x-2">
											<input
												type="checkbox"
												checked={formData.status === 'active'}
												onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.checked ? 'active' : 'inactive' }))}
												className="w-4 h-4 text-[#005BAC] border-gray-300 rounded focus:ring-[#005BAC]"
											/>
											<span className="text-sm font-medium text-gray-700">활성 리뷰</span>
										</label>
										<label className="flex items-center space-x-2">
											<input
												type="checkbox"
												checked={formData.isPinned}
												onChange={(e) => setFormData(prev => ({ ...prev, isPinned: e.target.checked }))}
												className="w-4 h-4 text-[#005BAC] border-gray-300 rounded focus:ring-[#005BAC]"
											/>
											<span className="text-sm font-medium text-gray-700">상단 고정</span>
										</label>
									</div>
								</div>

								<div className="flex justify-end space-x-3 mt-6">
									<Button
										onClick={() => {
											setShowAddForm(false);
											setEditingReview(null);
											resetForm();
										}}
										variant="outline"
									>
										취소
									</Button>
									<Button
										onClick={handleSaveReview}
										className="bg-[#005BAC] hover:bg-[#004494]"
									>
										<Save className="w-4 h-4 mr-2" />
										{editingReview ? '수정' : '추가'}
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