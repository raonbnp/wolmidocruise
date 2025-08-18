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
	Calendar,
	User,
	Heart,
	MessageCircle,
	Share,
	Filter,
	Save,
	X,
	AlertCircle,
	Check,
	RefreshCw,
	Star,
	Instagram,
	Facebook,
	Youtube,
	Image as ImageIcon,
	Upload
} from "lucide-react";

// 이벤트/SNS 타입
interface EventSNS {
	id: number;
	title: string;
	content: string;
	type: 'event' | 'sns' | 'promotion';
	platform: 'instagram' | 'facebook' | 'youtube' | 'website';
	imageUrl?: string;
	isActive: boolean;
	isPinned: boolean;
	startDate?: string;
	endDate?: string;
	likes: number;
	comments: number;
	shares: number;
	views: number;
	createdAt: string;
	updatedAt: string;
	createdBy: string;
}

// 더미 이벤트/SNS 데이터
const dummyEvents: EventSNS[] = [
	{
		id: 1,
		title: "🎆 신년 특별 불꽃 크루즈 이벤트",
		content: "2024년 새해를 맞아 특별한 불꽃쇼와 함께하는 크루즈 이벤트를 진행합니다! 선착순 100명 한정으로 30% 할인된 가격으로 만나보세요.\n\n📅 기간: 1월 1일 ~ 1월 31일\n💰 할인가: 성인 28,000원 (정가 40,000원)\n🎁 특전: 신년 기념품 증정",
		type: 'event',
		platform: 'website',
		imageUrl: 'https://via.placeholder.com/600x400/FF5722/FFFFFF?text=New+Year+Fireworks',
		isActive: true,
		isPinned: true,
		startDate: '2024-01-01T00:00:00Z',
		endDate: '2024-01-31T23:59:59Z',
		likes: 1247,
		comments: 89,
		shares: 156,
		views: 12450,
		createdAt: '2023-12-25T10:00:00Z',
		updatedAt: '2024-01-15T14:30:00Z',
		createdBy: '김관리'
	},
	{
		id: 2,
		title: "월미도 크루즈 인스타그램 이벤트 📸",
		content: "#월미도크루즈 #바다여행 해시태그와 함께 크루즈 사진을 올려주세요! 매주 베스트 사진을 선정하여 다음 크루즈 이용권을 선물로 드립니다 🎁",
		type: 'sns',
		platform: 'instagram',
		imageUrl: 'https://via.placeholder.com/600x400/E4405F/FFFFFF?text=Instagram+Event',
		isActive: true,
		isPinned: false,
		likes: 892,
		comments: 234,
		shares: 445,
		views: 8920,
		createdAt: '2024-01-10T09:30:00Z',
		updatedAt: '2024-01-20T11:15:00Z',
		createdBy: '이운영'
	},
	{
		id: 3,
		title: "커플 크루즈 프로모션 💕",
		content: "발렌타인데이 특별 프로모션! 커플로 함께 오시는 고객님께 특별 할인과 함께 로맨틱한 추억을 선사해드립니다.",
		type: 'promotion',
		platform: 'facebook',
		imageUrl: 'https://via.placeholder.com/600x400/FF69B4/FFFFFF?text=Valentine+Couple',
		isActive: false,
		isPinned: false,
		startDate: '2024-02-01T00:00:00Z',
		endDate: '2024-02-14T23:59:59Z',
		likes: 456,
		comments: 67,
		shares: 123,
		views: 4560,
		createdAt: '2024-01-15T16:20:00Z',
		updatedAt: '2024-01-25T13:45:00Z',
		createdBy: '박매니저'
	},
	{
		id: 4,
		title: "월미도 크루즈 유튜브 채널 오픈! 🎬",
		content: "월미도 크루즈의 공식 유튜브 채널이 오픈했습니다! 크루즈 여행 브이로그, 바다 풍경, 그리고 특별한 순간들을 영상으로 만나보세요. 구독과 좋아요 부탁드려요!",
		type: 'sns',
		platform: 'youtube',
		imageUrl: 'https://via.placeholder.com/600x400/FF0000/FFFFFF?text=YouTube+Channel',
		isActive: true,
		isPinned: false,
		likes: 678,
		comments: 145,
		shares: 289,
		views: 15670,
		createdAt: '2024-01-20T14:00:00Z',
		updatedAt: '2024-01-22T10:30:00Z',
		createdBy: '김관리'
	},
	{
		id: 5,
		title: "봄맞이 가족 크루즈 패키지 🌸",
		content: "따뜻한 봄을 맞아 가족과 함께 즐기는 특별한 크루즈 패키지를 준비했습니다. 어린이 무료 혜택과 함께 봄바다의 아름다움을 만끽하세요!",
		type: 'promotion',
		platform: 'website',
		imageUrl: 'https://via.placeholder.com/600x400/FFB6C1/FFFFFF?text=Spring+Family',
		isActive: true,
		isPinned: false,
		startDate: '2024-03-01T00:00:00Z',
		endDate: '2024-05-31T23:59:59Z',
		likes: 334,
		comments: 45,
		shares: 78,
		views: 3340,
		createdAt: '2024-02-01T11:40:00Z',
		updatedAt: '2024-02-01T11:40:00Z',
		createdBy: '이운영'
	}
];

export default function AdminEventSNSPage() {
	const [events, setEvents] = useState<EventSNS[]>([]);
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState("");
	const [filterType, setFilterType] = useState("all");
	const [filterPlatform, setFilterPlatform] = useState("all");
	const [filterStatus, setFilterStatus] = useState("all");
	const [showAddForm, setShowAddForm] = useState(false);
	const [editingEvent, setEditingEvent] = useState<EventSNS | null>(null);
	const [formData, setFormData] = useState({
		title: "",
		content: "",
		type: "event" as EventSNS['type'],
		platform: "website" as EventSNS['platform'],
		imageUrl: "",
		isActive: true,
		isPinned: false,
		startDate: "",
		endDate: ""
	});
	const [errors, setErrors] = useState<{ [key: string]: string }>({});

	// 데이터 로드
	useEffect(() => {
		const loadEvents = async () => {
			try {
				// 실제로는 API 호출
				await new Promise(resolve => setTimeout(resolve, 1000));
				setEvents(dummyEvents);
			} catch (error) {
				console.error('Events load error:', error);
			} finally {
				setLoading(false);
			}
		};

		loadEvents();
	}, []);

	// 필터링된 이벤트 목록
	const filteredEvents = events.filter(event => {
		const matchesSearch = 
			event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			event.content.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesType = filterType === "all" || event.type === filterType;
		const matchesPlatform = filterPlatform === "all" || event.platform === filterPlatform;
		const matchesStatus = 
			filterStatus === "all" || 
			(filterStatus === "active" && event.isActive) ||
			(filterStatus === "inactive" && !event.isActive) ||
			(filterStatus === "pinned" && event.isPinned);

		return matchesSearch && matchesType && matchesPlatform && matchesStatus;
	});

	// 날짜 포맷
	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString('ko-KR');
	};

	// 타입별 색상
	const getTypeColor = (type: EventSNS['type']) => {
		switch (type) {
			case "event": return "bg-blue-100 text-blue-800";
			case "sns": return "bg-green-100 text-green-800";
			case "promotion": return "bg-orange-100 text-orange-800";
			default: return "bg-gray-100 text-gray-800";
		}
	};

	// 플랫폼 아이콘
	const getPlatformIcon = (platform: EventSNS['platform']) => {
		switch (platform) {
			case "instagram": return <Instagram className="w-4 h-4" />;
			case "facebook": return <Facebook className="w-4 h-4" />;
			case "youtube": return <Youtube className="w-4 h-4" />;
			case "website": return <Star className="w-4 h-4" />;
			default: return <Star className="w-4 h-4" />;
		}
	};

	// 플랫폼별 색상
	const getPlatformColor = (platform: EventSNS['platform']) => {
		switch (platform) {
			case "instagram": return "text-pink-600";
			case "facebook": return "text-blue-600";
			case "youtube": return "text-red-600";
			case "website": return "text-purple-600";
			default: return "text-gray-600";
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
			type: "event",
			platform: "website",
			imageUrl: "",
			isActive: true,
			isPinned: false,
			startDate: "",
			endDate: ""
		});
		setErrors({});
	};

	// 이벤트 편집 시작
	const startEdit = (event: EventSNS) => {
		setEditingEvent(event);
		setFormData({
			title: event.title,
			content: event.content,
			type: event.type,
			platform: event.platform,
			imageUrl: event.imageUrl || "",
			isActive: event.isActive,
			isPinned: event.isPinned,
			startDate: event.startDate ? event.startDate.split('T')[0] : "",
			endDate: event.endDate ? event.endDate.split('T')[0] : ""
		});
		setShowAddForm(true);
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
		if (formData.startDate && formData.endDate && formData.startDate > formData.endDate) {
			newErrors.endDate = "종료일은 시작일보다 늦어야 합니다.";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	// 이벤트 저장
	const handleSaveEvent = async () => {
		if (!validateForm()) return;

		try {
			// 실제로는 API 호출
			await new Promise(resolve => setTimeout(resolve, 1000));

			if (editingEvent) {
				// 수정
				setEvents(prev => prev.map(event => 
					event.id === editingEvent.id 
						? { 
							...event, 
							...formData, 
							startDate: formData.startDate ? formData.startDate + 'T00:00:00Z' : undefined,
							endDate: formData.endDate ? formData.endDate + 'T23:59:59Z' : undefined,
							updatedAt: new Date().toISOString() 
						}
						: event
				));
				alert('이벤트가 수정되었습니다.');
			} else {
				// 추가
				const newEvent: EventSNS = {
					id: Math.max(...events.map(e => e.id)) + 1,
					...formData,
					startDate: formData.startDate ? formData.startDate + 'T00:00:00Z' : undefined,
					endDate: formData.endDate ? formData.endDate + 'T23:59:59Z' : undefined,
					likes: 0,
					comments: 0,
					shares: 0,
					views: 0,
					createdAt: new Date().toISOString(),
					updatedAt: new Date().toISOString(),
					createdBy: "현재관리자"
				};
				setEvents(prev => [...prev, newEvent]);
				alert('새 이벤트가 추가되었습니다.');
			}

			setShowAddForm(false);
			setEditingEvent(null);
			resetForm();
		} catch (error) {
			console.error('Event save error:', error);
			alert('저장 중 오류가 발생했습니다.');
		}
	};

	// 이벤트 삭제
	const handleDeleteEvent = async (eventId: number) => {
		const event = events.find(e => e.id === eventId);
		if (!event) return;

		if (!confirm('이 이벤트를 삭제하시겠습니까?')) return;

		try {
			// 실제로는 API 호출
			setEvents(prev => prev.filter(e => e.id !== eventId));
			alert('이벤트가 삭제되었습니다.');
		} catch (error) {
			console.error('Event delete error:', error);
			alert('삭제 중 오류가 발생했습니다.');
		}
	};

	// 이벤트 상태 토글
	const handleToggleStatus = async (eventId: number, field: 'isActive' | 'isPinned') => {
		try {
			// 실제로는 API 호출
			setEvents(prev => prev.map(e => 
				e.id === eventId ? { ...e, [field]: !e[field] } : e
			));
		} catch (error) {
			console.error('Status toggle error:', error);
			alert('상태 변경 중 오류가 발생했습니다.');
		}
	};

	return (
		<AdminAuthGuard requiredPermission="eventSns">
			<AdminLayout>
				<div className="space-y-6">
					{/* 헤더 */}
					<div className="flex items-center justify-between">
						<div>
							<h1 className="text-3xl font-bold text-gray-900">이벤트SNS 관리</h1>
							<p className="text-gray-600">이벤트와 SNS 콘텐츠를 관리하세요</p>
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
									setEditingEvent(null);
									setShowAddForm(true);
								}}
								className="bg-[#005BAC] hover:bg-[#004494] flex items-center space-x-2"
							>
								<Plus className="w-4 h-4" />
								<span>이벤트 추가</span>
							</Button>
						</div>
					</div>

					{/* 통계 카드 */}
					<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
						<Card>
							<CardContent className="p-6">
								<div className="flex items-center justify-between">
									<div>
										<p className="text-sm font-medium text-gray-600">전체 이벤트</p>
										<p className="text-2xl font-bold">{events.length}</p>
									</div>
									<Star className="h-8 w-8 text-gray-400" />
								</div>
							</CardContent>
						</Card>
						<Card>
							<CardContent className="p-6">
								<div className="flex items-center justify-between">
									<div>
										<p className="text-sm font-medium text-gray-600">활성 이벤트</p>
										<p className="text-2xl font-bold text-green-600">
											{events.filter(e => e.isActive).length}
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
										<p className="text-sm font-medium text-gray-600">고정 이벤트</p>
										<p className="text-2xl font-bold text-blue-600">
											{events.filter(e => e.isPinned).length}
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
											{formatNumber(events.reduce((sum, e) => sum + e.views, 0))}
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
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
								{/* 검색 */}
								<div>
									<div className="relative">
										<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
										<input
											type="text"
											placeholder="제목, 내용으로 검색..."
											value={searchTerm}
											onChange={(e) => setSearchTerm(e.target.value)}
											className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none"
										/>
									</div>
								</div>

								{/* 타입 필터 */}
								<div>
									<select
										value={filterType}
										onChange={(e) => setFilterType(e.target.value)}
										className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none"
										aria-label="타입 필터"
									>
										<option value="all">모든 타입</option>
										<option value="event">이벤트</option>
										<option value="sns">SNS</option>
										<option value="promotion">프로모션</option>
									</select>
								</div>

								{/* 플랫폼 필터 */}
								<div>
									<select
										value={filterPlatform}
										onChange={(e) => setFilterPlatform(e.target.value)}
										className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none"
										aria-label="플랫폼 필터"
									>
										<option value="all">모든 플랫폼</option>
										<option value="website">웹사이트</option>
										<option value="instagram">인스타그램</option>
										<option value="facebook">페이스북</option>
										<option value="youtube">유튜브</option>
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
										<option value="pinned">고정</option>
									</select>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* 이벤트 목록 */}
					{loading ? (
						<div className="text-center py-12">
							<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#005BAC] mx-auto mb-4"></div>
							<p className="text-gray-600">이벤트 목록을 불러오는 중...</p>
						</div>
					) : filteredEvents.length > 0 ? (
						<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
							{filteredEvents.map((event) => (
								<Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
									{event.imageUrl && (
										<div className="relative h-48">
											<img
												src={event.imageUrl}
												alt={event.title}
												className="w-full h-full object-cover"
											/>
											<div className="absolute top-2 left-2 flex space-x-2">
												<Badge className={getTypeColor(event.type)}>
													{event.type === 'event' ? '이벤트' : event.type === 'sns' ? 'SNS' : '프로모션'}
												</Badge>
												{event.isPinned && (
													<Badge className="bg-yellow-500 text-white">고정</Badge>
												)}
											</div>
											<div className="absolute top-2 right-2">
												<div className={`p-2 bg-white/80 backdrop-blur-sm rounded-full ${getPlatformColor(event.platform)}`}>
													{getPlatformIcon(event.platform)}
												</div>
											</div>
											{!event.isActive && (
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
												{event.title}
											</h3>

											{/* 내용 */}
											<p className="text-sm text-gray-600 line-clamp-3">
												{event.content}
											</p>

											{/* 기간 */}
											{(event.startDate || event.endDate) && (
												<div className="flex items-center space-x-1 text-xs text-gray-500">
													<Calendar className="w-3 h-3" />
													<span>
														{event.startDate && formatDate(event.startDate)}
														{event.startDate && event.endDate && ' ~ '}
														{event.endDate && formatDate(event.endDate)}
													</span>
												</div>
											)}

											{/* 통계 */}
											<div className="grid grid-cols-4 gap-2 text-xs text-gray-500">
												<div className="flex items-center space-x-1">
													<Heart className="w-3 h-3" />
													<span>{formatNumber(event.likes)}</span>
												</div>
												<div className="flex items-center space-x-1">
													<MessageCircle className="w-3 h-3" />
													<span>{formatNumber(event.comments)}</span>
												</div>
												<div className="flex items-center space-x-1">
													<Share className="w-3 h-3" />
													<span>{formatNumber(event.shares)}</span>
												</div>
												<div className="flex items-center space-x-1">
													<Eye className="w-3 h-3" />
													<span>{formatNumber(event.views)}</span>
												</div>
											</div>

											{/* 작성자 및 날짜 */}
											<div className="flex items-center justify-between text-xs text-gray-500">
												<div className="flex items-center space-x-1">
													<User className="w-3 h-3" />
													<span>{event.createdBy}</span>
												</div>
												<span>{formatDate(event.createdAt)}</span>
											</div>

											{/* 액션 버튼 */}
											<div className="flex space-x-2 pt-2">
												<Button
													onClick={() => startEdit(event)}
													variant="outline"
													size="sm"
													className="flex-1"
												>
													<Edit className="w-3 h-3 mr-1" />
													수정
												</Button>
												<Button
													onClick={() => handleToggleStatus(event.id, 'isActive')}
													variant="outline"
													size="sm"
													className={`flex-1 ${event.isActive ? 'text-red-600 hover:bg-red-50' : 'text-green-600 hover:bg-green-50'}`}
												>
													{event.isActive ? <EyeOff className="w-3 h-3 mr-1" /> : <Eye className="w-3 h-3 mr-1" />}
													{event.isActive ? '비활성' : '활성'}
												</Button>
												<Button
													onClick={() => handleToggleStatus(event.id, 'isPinned')}
													variant="outline"
													size="sm"
													className={event.isPinned ? 'text-yellow-600 hover:bg-yellow-50' : ''}
												>
													<Star className="w-3 h-3" />
												</Button>
												<Button
													onClick={() => handleDeleteEvent(event.id)}
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
								<Star className="w-16 h-16 text-gray-400 mx-auto mb-4" />
								<h3 className="text-xl font-semibold text-gray-900 mb-2">이벤트가 없습니다</h3>
								<p className="text-gray-600 mb-6">검색 조건에 맞는 이벤트가 없습니다.</p>
								<Button
									onClick={() => {
										resetForm();
										setEditingEvent(null);
										setShowAddForm(true);
									}}
									className="bg-[#005BAC] hover:bg-[#004494]"
								>
									첫 번째 이벤트 작성하기
								</Button>
							</CardContent>
						</Card>
					)}

					{/* 이벤트 추가/수정 모달 */}
					{showAddForm && (
						<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
							<div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
								<div className="flex items-center justify-between mb-6">
									<h2 className="text-xl font-semibold">
										{editingEvent ? '이벤트 수정' : '새 이벤트 추가'}
									</h2>
									<Button
										onClick={() => {
											setShowAddForm(false);
											setEditingEvent(null);
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
												타입 <span className="text-red-500">*</span>
											</label>
											<select
												value={formData.type}
												onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as EventSNS['type'] }))}
												className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none"
												aria-label="이벤트 타입 선택"
											>
												<option value="event">이벤트</option>
												<option value="sns">SNS</option>
												<option value="promotion">프로모션</option>
											</select>
										</div>

										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												플랫폼 <span className="text-red-500">*</span>
											</label>
											<select
												value={formData.platform}
												onChange={(e) => setFormData(prev => ({ ...prev, platform: e.target.value as EventSNS['platform'] }))}
												className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none"
												aria-label="플랫폼 선택"
											>
												<option value="website">웹사이트</option>
												<option value="instagram">인스타그램</option>
												<option value="facebook">페이스북</option>
												<option value="youtube">유튜브</option>
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
											placeholder="이벤트 제목을 입력하세요"
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
											placeholder="이벤트 내용을 입력하세요"
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

									{/* 기간 */}
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												시작일
											</label>
											<input
												type="date"
												value={formData.startDate}
												onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
												className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none"
												aria-label="시작일 선택"
											/>
										</div>

										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												종료일
											</label>
											<input
												type="date"
												value={formData.endDate}
												onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
												className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none ${
													errors.endDate ? 'border-red-500' : 'border-gray-300'
												}`}
												aria-label="종료일 선택"
											/>
											{errors.endDate && (
												<p className="mt-1 text-sm text-red-600 flex items-center">
													<AlertCircle className="w-4 h-4 mr-1" />
													{errors.endDate}
												</p>
											)}
										</div>
									</div>

									{/* 상태 */}
									<div className="flex items-center space-x-6">
										<label className="flex items-center space-x-2">
											<input
												type="checkbox"
												checked={formData.isActive}
												onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
												className="w-4 h-4 text-[#005BAC] border-gray-300 rounded focus:ring-[#005BAC]"
											/>
											<span className="text-sm font-medium text-gray-700">활성 이벤트</span>
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
											setEditingEvent(null);
											resetForm();
										}}
										variant="outline"
									>
										취소
									</Button>
									<Button
										onClick={handleSaveEvent}
										className="bg-[#005BAC] hover:bg-[#004494]"
									>
										<Save className="w-4 h-4 mr-2" />
										{editingEvent ? '수정' : '추가'}
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
