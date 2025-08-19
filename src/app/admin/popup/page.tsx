"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminAuthGuard from "@/components/admin/AdminAuthGuard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
	Monitor,
	Plus,
	Edit,
	Trash2,
	Eye,
	EyeOff,
	Calendar,
	Clock,
	Settings,
	Save,
	X,
	AlertCircle,
	RefreshCw,
	Copy,
	ExternalLink,
	Image as ImageIcon,
	Type,
	Palette
} from "lucide-react";

// 팝업 상태 타입
type PopupStatus = "active" | "inactive" | "scheduled";

// 팝업 위치 타입
type PopupPosition = "center" | "top-left" | "top-right" | "bottom-left" | "bottom-right";

// 팝업 타입
type PopupType = "image" | "html" | "video" | "iframe";

// 팝업 데이터 타입
interface Popup {
	id: number;
	title: string;
	type: PopupType;
	content: string;
	imageUrl?: string;
	linkUrl?: string;
	width: number;
	height: number;
	position: PopupPosition;
	status: PopupStatus;
	startDate: string;
	endDate: string;
	showOnce: boolean;
	showDelay: number;
	backgroundColor: string;
	borderColor: string;
	borderWidth: number;
	borderRadius: number;
	hasCloseButton: boolean;
	autoClose: boolean;
	autoCloseDelay: number;
	targetPages: string[];
	priority: number;
	views: number;
	clicks: number;
	createdAt: string;
	updatedAt: string;
	createdBy: string;
}

// 더미 팝업 데이터
const dummyPopups: Popup[] = [
	{
		id: 1,
		title: "신규 크루즈 출시 이벤트",
		type: "image",
		content: "새로운 럭셔리 크루즈가 출시되었습니다! 특별 할인 혜택을 놓치지 마세요.",
		imageUrl: "https://via.placeholder.com/600x400/005BAC/FFFFFF?text=New+Cruise+Event",
		linkUrl: "/cruise/luxury-cruise",
		width: 600,
		height: 400,
		position: "center",
		status: "active",
		startDate: "2024-01-20T00:00:00Z",
		endDate: "2024-02-20T23:59:59Z",
		showOnce: false,
		showDelay: 3000,
		backgroundColor: "#FFFFFF",
		borderColor: "#005BAC",
		borderWidth: 2,
		borderRadius: 8,
		hasCloseButton: true,
		autoClose: false,
		autoCloseDelay: 0,
		targetPages: ["/", "/cruise"],
		priority: 1,
		views: 15420,
		clicks: 892,
		createdAt: "2024-01-20T10:00:00Z",
		updatedAt: "2024-01-25T14:30:00Z",
		createdBy: "김관리"
	},
	{
		id: 2,
		title: "고객센터 운영시간 안내",
		type: "html",
		content: "<div style='padding: 20px; text-align: center;'><h3 style='color: #005BAC; margin-bottom: 10px;'>고객센터 운영시간 변경 안내</h3><p>2024년 2월부터 고객센터 운영시간이 변경됩니다.</p><p><strong>변경 후: 평일 09:00~19:00</strong></p><p>문의사항이 있으시면 언제든 연락주세요.</p></div>",
		width: 400,
		height: 300,
		position: "bottom-right",
		status: "scheduled",
		startDate: "2024-02-01T00:00:00Z",
		endDate: "2024-02-29T23:59:59Z",
		showOnce: true,
		showDelay: 5000,
		backgroundColor: "#F8F9FA",
		borderColor: "#DEE2E6",
		borderWidth: 1,
		borderRadius: 12,
		hasCloseButton: true,
		autoClose: true,
		autoCloseDelay: 10000,
		targetPages: ["/", "/customer"],
		priority: 2,
		views: 0,
		clicks: 0,
		createdAt: "2024-01-22T15:20:00Z",
		updatedAt: "2024-01-22T15:20:00Z",
		createdBy: "이운영"
	},
	{
		id: 3,
		title: "설날 연휴 운항 안내",
		type: "image",
		content: "설날 연휴 기간 중 운항 일정을 확인해 주세요.",
		imageUrl: "https://via.placeholder.com/500x300/FF5722/FFFFFF?text=Holiday+Schedule",
		linkUrl: "/notice/holiday-schedule",
		width: 500,
		height: 300,
		position: "top-right",
		status: "inactive",
		startDate: "2024-02-08T00:00:00Z",
		endDate: "2024-02-12T23:59:59Z",
		showOnce: false,
		showDelay: 2000,
		backgroundColor: "#FFFFFF",
		borderColor: "#FF5722",
		borderWidth: 3,
		borderRadius: 10,
		hasCloseButton: true,
		autoClose: false,
		autoCloseDelay: 0,
		targetPages: ["/"],
		priority: 3,
		views: 2340,
		clicks: 156,
		createdAt: "2024-01-15T09:30:00Z",
		updatedAt: "2024-01-18T11:45:00Z",
		createdBy: "박매니저"
	}
];

export default function PopupPage() {
	const [popups, setPopups] = useState<Popup[]>([]);
	const [loading, setLoading] = useState(true);

	const [showAddForm, setShowAddForm] = useState(false);
	const [editingPopup, setEditingPopup] = useState<Popup | null>(null);
	const [previewPopup, setPreviewPopup] = useState<Popup | null>(null);
	const [formData, setFormData] = useState({
		title: "",
		type: "image" as PopupType,
		content: "",
		imageUrl: "",
		linkUrl: "",
		width: 600,
		height: 400,
		position: "center" as PopupPosition,
		status: "active" as PopupStatus,
		startDate: new Date().toISOString().slice(0, 16),
		endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16),
		showOnce: false,
		showDelay: 3000,
		backgroundColor: "#FFFFFF",
		borderColor: "#005BAC",
		borderWidth: 2,
		borderRadius: 8,
		hasCloseButton: true,
		autoClose: false,
		autoCloseDelay: 0,
		targetPages: ["/"],
		priority: 1
	});
	const [errors, setErrors] = useState<{ [key: string]: string }>({});

	// 데이터 로드
	useEffect(() => {
		const loadPopups = async () => {
			try {
				// 실제로는 API 호출
				await new Promise(resolve => setTimeout(resolve, 1000));
				setPopups(dummyPopups);
			} catch (error) {
				console.error('Popups load error:', error);
			} finally {
				setLoading(false);
			}
		};

		loadPopups();
	}, []);

	// 팝업 목록 (필터링 없음)
	const filteredPopups = popups;

	// 날짜 포맷
	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString('ko-KR');
	};

	// 상태별 색상
	const getStatusColor = (status: PopupStatus) => {
		switch (status) {
			case "active": return "bg-green-100 text-green-800";
			case "inactive": return "bg-gray-100 text-gray-800";
			case "scheduled": return "bg-blue-100 text-blue-800";
			default: return "bg-gray-100 text-gray-800";
		}
	};

	// 상태명 한글
	const getStatusText = (status: PopupStatus) => {
		switch (status) {
			case "active": return "활성";
			case "inactive": return "비활성";
			case "scheduled": return "예약";
			default: return "알 수 없음";
		}
	};

	// 타입별 아이콘
	const getTypeIcon = (type: PopupType) => {
		switch (type) {
			case "image": return <ImageIcon className="w-4 h-4" />;
			case "html": return <Type className="w-4 h-4" />;
			case "video": return <Monitor className="w-4 h-4" />;
			case "iframe": return <ExternalLink className="w-4 h-4" />;
			default: return <Monitor className="w-4 h-4" />;
		}
	};

	// 타입명 한글
	const getTypeText = (type: PopupType) => {
		switch (type) {
			case "image": return "이미지";
			case "html": return "HTML";
			case "video": return "비디오";
			case "iframe": return "아이프레임";
			default: return "알 수 없음";
		}
	};

	// 위치명 한글
	const getPositionText = (position: PopupPosition) => {
		switch (position) {
			case "center": return "중앙";
			case "top-left": return "좌상단";
			case "top-right": return "우상단";
			case "bottom-left": return "좌하단";
			case "bottom-right": return "우하단";
			default: return "중앙";
		}
	};



	// 폼 초기화
	const resetForm = () => {
		setFormData({
			title: "",
			type: "image",
			content: "",
			imageUrl: "",
			linkUrl: "",
			width: 600,
			height: 400,
			position: "center",
			status: "active",
			startDate: new Date().toISOString().slice(0, 16),
			endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16),
			showOnce: false,
			showDelay: 3000,
			backgroundColor: "#FFFFFF",
			borderColor: "#005BAC",
			borderWidth: 2,
			borderRadius: 8,
			hasCloseButton: true,
			autoClose: false,
			autoCloseDelay: 0,
			targetPages: ["/"],
			priority: 1
		});
		setErrors({});
	};

	// 팝업 편집 시작
	const startEdit = (popup: Popup) => {
		setEditingPopup(popup);
		setFormData({
			title: popup.title,
			type: popup.type,
			content: popup.content,
			imageUrl: popup.imageUrl || "",
			linkUrl: popup.linkUrl || "",
			width: popup.width,
			height: popup.height,
			position: popup.position,
			status: popup.status,
			startDate: popup.startDate.slice(0, 16),
			endDate: popup.endDate.slice(0, 16),
			showOnce: popup.showOnce,
			showDelay: popup.showDelay,
			backgroundColor: popup.backgroundColor,
			borderColor: popup.borderColor,
			borderWidth: popup.borderWidth,
			borderRadius: popup.borderRadius,
			hasCloseButton: popup.hasCloseButton,
			autoClose: popup.autoClose,
			autoCloseDelay: popup.autoCloseDelay,
			targetPages: popup.targetPages,
			priority: popup.priority
		});
		setShowAddForm(true);
	};

	// 폼 유효성 검사
	const validateForm = () => {
		const newErrors: { [key: string]: string } = {};

		if (!formData.title.trim()) {
			newErrors.title = "제목을 입력해주세요.";
		}
		if (formData.type === "image" && !formData.imageUrl.trim()) {
			newErrors.imageUrl = "이미지 URL을 입력해주세요.";
		}
		if (formData.type === "html" && !formData.content.trim()) {
			newErrors.content = "HTML 내용을 입력해주세요.";
		}
		if (formData.width < 200 || formData.width > 1200) {
			newErrors.width = "가로 크기는 200~1200px 사이여야 합니다.";
		}
		if (formData.height < 150 || formData.height > 800) {
			newErrors.height = "세로 크기는 150~800px 사이여야 합니다.";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	// 팝업 저장
	const handleSavePopup = async () => {
		if (!validateForm()) return;

		try {
			// 실제로는 API 호출
			await new Promise(resolve => setTimeout(resolve, 1000));

			if (editingPopup) {
				// 수정
				setPopups(prev => prev.map(popup => 
					popup.id === editingPopup.id 
						? { 
							...popup, 
							...formData,
							startDate: formData.startDate + ":00Z",
							endDate: formData.endDate + ":00Z",
							updatedAt: new Date().toISOString() 
						}
						: popup
				));
				alert('팝업이 수정되었습니다.');
			} else {
				// 추가
				const newPopup: Popup = {
					id: Math.max(...popups.map(p => p.id)) + 1,
					...formData,
					startDate: formData.startDate + ":00Z",
					endDate: formData.endDate + ":00Z",
					views: 0,
					clicks: 0,
					createdAt: new Date().toISOString(),
					updatedAt: new Date().toISOString(),
					createdBy: "현재관리자"
				};
				setPopups(prev => [...prev, newPopup]);
				alert('새 팝업이 추가되었습니다.');
			}

			setShowAddForm(false);
			setEditingPopup(null);
			resetForm();
		} catch (error) {
			console.error('Popup save error:', error);
			alert('저장 중 오류가 발생했습니다.');
		}
	};

	// 팝업 삭제
	const handleDeletePopup = async (popupId: number) => {
		const popup = popups.find(p => p.id === popupId);
		if (!popup) return;

		if (!confirm('이 팝업을 삭제하시겠습니까?')) return;

		try {
			// 실제로는 API 호출
			setPopups(prev => prev.filter(p => p.id !== popupId));
			alert('팝업이 삭제되었습니다.');
		} catch (error) {
			console.error('Popup delete error:', error);
			alert('삭제 중 오류가 발생했습니다.');
		}
	};

	// 팝업 상태 토글
	const handleToggleStatus = async (popupId: number) => {
		try {
			// 실제로는 API 호출
			setPopups(prev => prev.map(p => 
				p.id === popupId 
					? { ...p, status: p.status === 'active' ? 'inactive' : 'active' }
					: p
			));
		} catch (error) {
			console.error('Status toggle error:', error);
			alert('상태 변경 중 오류가 발생했습니다.');
		}
	};

	// 팝업 복사
	const handleCopyPopup = (popup: Popup) => {
		const newPopup: Popup = {
			...popup,
			id: Math.max(...popups.map(p => p.id)) + 1,
			title: popup.title + " (복사본)",
			status: "inactive",
			views: 0,
			clicks: 0,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
			createdBy: "현재관리자"
		};
		setPopups(prev => [...prev, newPopup]);
		alert('팝업이 복사되었습니다.');
	};

	return (
		<AdminAuthGuard requiredPermission="popup">
			<AdminLayout>
				<div className="space-y-6">
					{/* 헤더 */}
					<div className="flex items-center justify-between">
						<div>
							<h1 className="text-3xl font-bold text-gray-900">팝업 관리</h1>
							<p className="text-gray-600">사이트 팝업을 생성하고 관리하세요</p>
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
									setEditingPopup(null);
									setShowAddForm(true);
								}}
								className="bg-[#005BAC] hover:bg-[#004494] flex items-center space-x-2"
							>
								<Plus className="w-4 h-4" />
								<span>팝업 추가</span>
							</Button>
						</div>
					</div>





					{/* 팝업 목록 */}
					{loading ? (
						<div className="text-center py-12">
							<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#005BAC] mx-auto mb-4"></div>
							<p className="text-gray-600">팝업 목록을 불러오는 중...</p>
						</div>
					) : filteredPopups.length > 0 ? (
						<Card>
							<CardContent className="p-0">
								<div className="overflow-x-auto">
									<table className="w-full">
										<thead className="bg-gray-50 border-b">
											<tr>
												<th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
													팝업 정보
												</th>
												<th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
													타입/위치
												</th>
												<th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
													크기
												</th>
												<th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
													기간
												</th>
												<th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
													상태
												</th>
												<th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
													액션
												</th>
											</tr>
										</thead>
										<tbody className="bg-white divide-y divide-gray-200">
											{filteredPopups.map((popup) => (
												<tr key={popup.id} className="hover:bg-gray-50">
													<td className="px-6 py-4">
														<div className="flex items-start space-x-3">
															<div className="flex-shrink-0">
																{getTypeIcon(popup.type)}
															</div>
															<div className="flex-1 min-w-0">
																<div className="text-sm font-medium text-gray-900 truncate">
																	{popup.title}
																</div>
																<div className="text-sm text-gray-500">
																	우선순위: {popup.priority}
																</div>
															</div>
														</div>
													</td>
													<td className="px-6 py-4">
														<div className="text-sm text-gray-900">{getTypeText(popup.type)}</div>
														<div className="text-sm text-gray-500">{getPositionText(popup.position)}</div>
													</td>
													<td className="px-6 py-4">
														<div className="text-sm text-gray-900">{popup.width} × {popup.height}</div>
														<div className="text-sm text-gray-500">{popup.showDelay}ms 지연</div>
													</td>
													<td className="px-6 py-4">
														<div className="text-sm text-gray-900">{formatDate(popup.startDate)}</div>
														<div className="text-sm text-gray-500">~ {formatDate(popup.endDate)}</div>
													</td>
													<td className="px-6 py-4">
														<Badge className={getStatusColor(popup.status)}>
															{getStatusText(popup.status)}
														</Badge>
													</td>
													<td className="px-6 py-4">
														<div className="flex items-center space-x-2">
															<Button
																onClick={() => setPreviewPopup(popup)}
																variant="outline"
																size="sm"
																className="p-2"
																title="미리보기"
															>
																<Eye className="w-4 h-4" />
															</Button>
															<Button
																onClick={() => startEdit(popup)}
																variant="outline"
																size="sm"
																className="p-2"
																title="수정"
															>
																<Edit className="w-4 h-4" />
															</Button>
															<Button
																onClick={() => handleToggleStatus(popup.id)}
																variant="outline"
																size="sm"
																className={`p-2 ${popup.status === 'active' ? 'text-red-600 hover:bg-red-50' : 'text-green-600 hover:bg-green-50'}`}
																title={popup.status === 'active' ? '비활성화' : '활성화'}
															>
																{popup.status === 'active' ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
															</Button>
															<Button
																onClick={() => handleCopyPopup(popup)}
																variant="outline"
																size="sm"
																className="p-2 text-blue-600 hover:bg-blue-50"
																title="복사"
															>
																<Copy className="w-4 h-4" />
															</Button>
															<Button
																onClick={() => handleDeletePopup(popup.id)}
																variant="outline"
																size="sm"
																className="p-2 text-red-600 hover:bg-red-50"
																title="삭제"
															>
																<Trash2 className="w-4 h-4" />
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
								<Monitor className="w-16 h-16 text-gray-400 mx-auto mb-4" />
								<h3 className="text-xl font-semibold text-gray-900 mb-2">팝업이 없습니다</h3>
								<p className="text-gray-600 mb-6">등록된 팝업이 없습니다.</p>
								<Button
									onClick={() => {
										resetForm();
										setEditingPopup(null);
										setShowAddForm(true);
									}}
									className="bg-[#005BAC] hover:bg-[#004494]"
								>
									첫 번째 팝업 만들기
								</Button>
							</CardContent>
						</Card>
					)}

					{/* 팝업 추가/수정 모달 */}
					{showAddForm && (
						<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
							<div className="bg-white rounded-lg w-full max-w-4xl max-h-screen overflow-y-auto">
								<div className="sticky top-0 bg-white border-b px-6 py-4">
									<div className="flex items-center justify-between">
										<h2 className="text-xl font-semibold">
											{editingPopup ? '팝업 수정' : '새 팝업 추가'}
										</h2>
										<Button
											onClick={() => {
												setShowAddForm(false);
												setEditingPopup(null);
												resetForm();
											}}
											variant="ghost"
											size="sm"
										>
											<X className="w-4 h-4" />
										</Button>
									</div>
								</div>

								<div className="p-6 space-y-6">
									{/* 기본 정보 */}
									<div className="space-y-4">
										<h3 className="text-lg font-medium text-gray-900 border-b pb-2">기본 정보</h3>
										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
													placeholder="팝업 제목을 입력하세요"
												/>
												{errors.title && (
													<p className="mt-1 text-sm text-red-600 flex items-center">
														<AlertCircle className="w-4 h-4 mr-1" />
														{errors.title}
													</p>
												)}
											</div>

											<div>
												<label className="block text-sm font-medium text-gray-700 mb-2">
													타입 <span className="text-red-500">*</span>
												</label>
												<select
													value={formData.type}
													onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as PopupType }))}
													className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none"
													aria-label="팝업 타입 선택"
												>
													<option value="image">이미지</option>
													<option value="html">HTML</option>
													<option value="video">비디오</option>
													<option value="iframe">아이프레임</option>
												</select>
											</div>
										</div>

										{/* 이미지 타입일 때 */}
										{formData.type === "image" && (
											<div>
												<label className="block text-sm font-medium text-gray-700 mb-2">
													이미지 URL <span className="text-red-500">*</span>
												</label>
												<input
													type="url"
													value={formData.imageUrl}
													onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
													className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none ${
														errors.imageUrl ? 'border-red-500' : 'border-gray-300'
													}`}
													placeholder="https://example.com/image.jpg"
												/>
												{errors.imageUrl && (
													<p className="mt-1 text-sm text-red-600 flex items-center">
														<AlertCircle className="w-4 h-4 mr-1" />
														{errors.imageUrl}
													</p>
												)}
											</div>
										)}

										{/* HTML 타입일 때 */}
										{formData.type === "html" && (
											<div>
												<label className="block text-sm font-medium text-gray-700 mb-2">
													HTML 내용 <span className="text-red-500">*</span>
												</label>
												<textarea
													value={formData.content}
													onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
													rows={6}
													className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none resize-none ${
														errors.content ? 'border-red-500' : 'border-gray-300'
													}`}
													placeholder="<div>HTML 내용을 입력하세요</div>"
												/>
												{errors.content && (
													<p className="mt-1 text-sm text-red-600 flex items-center">
														<AlertCircle className="w-4 h-4 mr-1" />
														{errors.content}
													</p>
												)}
											</div>
										)}

										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												링크 URL
											</label>
											<input
												type="url"
												value={formData.linkUrl}
												onChange={(e) => setFormData(prev => ({ ...prev, linkUrl: e.target.value }))}
												className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none"
												placeholder="클릭 시 이동할 URL (선택사항)"
											/>
										</div>
									</div>

									{/* 크기 및 위치 */}
									<div className="space-y-4">
										<h3 className="text-lg font-medium text-gray-900 border-b pb-2">크기 및 위치</h3>
										<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
											<div>
												<label className="block text-sm font-medium text-gray-700 mb-2">
													가로 크기 (px)
												</label>
												<input
													type="number"
													value={formData.width}
													onChange={(e) => setFormData(prev => ({ ...prev, width: parseInt(e.target.value) }))}
													className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none ${
														errors.width ? 'border-red-500' : 'border-gray-300'
													}`}
													min="200"
													max="1200"
													placeholder="600"
												/>
												{errors.width && (
													<p className="mt-1 text-sm text-red-600">{errors.width}</p>
												)}
											</div>
											<div>
												<label className="block text-sm font-medium text-gray-700 mb-2">
													세로 크기 (px)
												</label>
												<input
													type="number"
													value={formData.height}
													onChange={(e) => setFormData(prev => ({ ...prev, height: parseInt(e.target.value) }))}
													className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none ${
														errors.height ? 'border-red-500' : 'border-gray-300'
													}`}
													min="150"
													max="800"
													placeholder="400"
												/>
												{errors.height && (
													<p className="mt-1 text-sm text-red-600">{errors.height}</p>
												)}
											</div>
											<div>
												<label className="block text-sm font-medium text-gray-700 mb-2">
													위치
												</label>
												<select
													value={formData.position}
													onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value as PopupPosition }))}
													className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none"
													aria-label="팝업 위치 선택"
												>
													<option value="center">중앙</option>
													<option value="top-left">좌상단</option>
													<option value="top-right">우상단</option>
													<option value="bottom-left">좌하단</option>
													<option value="bottom-right">우하단</option>
												</select>
											</div>
										</div>
									</div>

									{/* 표시 설정 */}
									<div className="space-y-4">
										<h3 className="text-lg font-medium text-gray-900 border-b pb-2">표시 설정</h3>
										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											<div>
												<label className="block text-sm font-medium text-gray-700 mb-2">
													상태
												</label>
												<select
													value={formData.status}
													onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as PopupStatus }))}
													className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none"
													aria-label="팝업 상태 선택"
												>
													<option value="active">활성</option>
													<option value="inactive">비활성</option>
													<option value="scheduled">예약</option>
												</select>
											</div>
											<div>
												<label className="block text-sm font-medium text-gray-700 mb-2">
													우선순위
												</label>
												<input
													type="number"
													value={formData.priority}
													onChange={(e) => setFormData(prev => ({ ...prev, priority: parseInt(e.target.value) }))}
													className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none"
													min="1"
													max="10"
													placeholder="1"
												/>
											</div>
										</div>

										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											<div>
												<label className="block text-sm font-medium text-gray-700 mb-2">
													시작일시
												</label>
												<input
													type="datetime-local"
													value={formData.startDate}
													onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
													className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none"
													title="팝업 시작일시 선택"
												/>
											</div>
											<div>
												<label className="block text-sm font-medium text-gray-700 mb-2">
													종료일시
												</label>
												<input
													type="datetime-local"
													value={formData.endDate}
													onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
													className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none"
													title="팝업 종료일시 선택"
												/>
											</div>
										</div>

										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											<div>
												<label className="block text-sm font-medium text-gray-700 mb-2">
													표시 지연시간 (ms)
												</label>
												<input
													type="number"
													value={formData.showDelay}
													onChange={(e) => setFormData(prev => ({ ...prev, showDelay: parseInt(e.target.value) }))}
													className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none"
													min="0"
													step="1000"
													placeholder="3000"
												/>
											</div>
											<div>
												<label className="block text-sm font-medium text-gray-700 mb-2">
													자동 닫기 시간 (ms)
												</label>
												<input
													type="number"
													value={formData.autoCloseDelay}
													onChange={(e) => setFormData(prev => ({ ...prev, autoCloseDelay: parseInt(e.target.value) }))}
													className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none"
													min="0"
													step="1000"
													disabled={!formData.autoClose}
													placeholder="10000"
												/>
											</div>
										</div>

										<div className="space-y-3">
											<label className="flex items-center space-x-2">
												<input
													type="checkbox"
													checked={formData.showOnce}
													onChange={(e) => setFormData(prev => ({ ...prev, showOnce: e.target.checked }))}
													className="w-4 h-4 text-[#005BAC] border-gray-300 rounded focus:ring-[#005BAC]"
												/>
												<span className="text-sm font-medium text-gray-700">하루에 한 번만 표시</span>
											</label>
											<label className="flex items-center space-x-2">
												<input
													type="checkbox"
													checked={formData.hasCloseButton}
													onChange={(e) => setFormData(prev => ({ ...prev, hasCloseButton: e.target.checked }))}
													className="w-4 h-4 text-[#005BAC] border-gray-300 rounded focus:ring-[#005BAC]"
												/>
												<span className="text-sm font-medium text-gray-700">닫기 버튼 표시</span>
											</label>
											<label className="flex items-center space-x-2">
												<input
													type="checkbox"
													checked={formData.autoClose}
													onChange={(e) => setFormData(prev => ({ ...prev, autoClose: e.target.checked }))}
													className="w-4 h-4 text-[#005BAC] border-gray-300 rounded focus:ring-[#005BAC]"
												/>
												<span className="text-sm font-medium text-gray-700">자동으로 닫기</span>
											</label>
										</div>
									</div>

									{/* 스타일 설정 */}
									<div className="space-y-4">
										<h3 className="text-lg font-medium text-gray-900 border-b pb-2">스타일 설정</h3>
										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											<div>
												<label className="block text-sm font-medium text-gray-700 mb-2">
													배경색
												</label>
												<div className="flex items-center space-x-2">
													<input
														type="color"
														value={formData.backgroundColor}
														onChange={(e) => setFormData(prev => ({ ...prev, backgroundColor: e.target.value }))}
														className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
														title="배경색 선택"
													/>
													<input
														type="text"
														value={formData.backgroundColor}
														onChange={(e) => setFormData(prev => ({ ...prev, backgroundColor: e.target.value }))}
														className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none"
														placeholder="#FFFFFF"
													/>
												</div>
											</div>
											<div>
												<label className="block text-sm font-medium text-gray-700 mb-2">
													테두리색
												</label>
												<div className="flex items-center space-x-2">
													<input
														type="color"
														value={formData.borderColor}
														onChange={(e) => setFormData(prev => ({ ...prev, borderColor: e.target.value }))}
														className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
														title="테두리색 선택"
													/>
													<input
														type="text"
														value={formData.borderColor}
														onChange={(e) => setFormData(prev => ({ ...prev, borderColor: e.target.value }))}
														className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none"
														placeholder="#005BAC"
													/>
												</div>
											</div>
										</div>

										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											<div>
												<label className="block text-sm font-medium text-gray-700 mb-2">
													테두리 두께 (px)
												</label>
												<input
													type="number"
													value={formData.borderWidth}
													onChange={(e) => setFormData(prev => ({ ...prev, borderWidth: parseInt(e.target.value) }))}
													className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none"
													min="0"
													max="10"
													placeholder="2"
												/>
											</div>
											<div>
												<label className="block text-sm font-medium text-gray-700 mb-2">
													모서리 둥글기 (px)
												</label>
												<input
													type="number"
													value={formData.borderRadius}
													onChange={(e) => setFormData(prev => ({ ...prev, borderRadius: parseInt(e.target.value) }))}
													className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none"
													min="0"
													max="50"
													placeholder="8"
												/>
											</div>
										</div>
									</div>
								</div>

								<div className="sticky bottom-0 bg-white border-t px-6 py-4">
									<div className="flex justify-end space-x-3">
										<Button
											onClick={() => {
												setShowAddForm(false);
												setEditingPopup(null);
												resetForm();
											}}
											variant="outline"
										>
											취소
										</Button>
										<Button
											onClick={handleSavePopup}
											className="bg-[#005BAC] hover:bg-[#004494]"
										>
											<Save className="w-4 h-4 mr-2" />
											{editingPopup ? '수정' : '추가'}
										</Button>
									</div>
								</div>
							</div>
						</div>
					)}

					{/* 미리보기 모달 */}
					{previewPopup && (
						<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
							<div className="relative">
								<div
									className="relative bg-white shadow-2xl"
									style={{
										width: `${previewPopup.width}px`,
										height: `${previewPopup.height}px`,
										backgroundColor: previewPopup.backgroundColor,
										border: `${previewPopup.borderWidth}px solid ${previewPopup.borderColor}`,
										borderRadius: `${previewPopup.borderRadius}px`
									}}
								>
									{previewPopup.hasCloseButton && (
										<button
											onClick={() => setPreviewPopup(null)}
											className="absolute top-2 right-2 w-6 h-6 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center z-10"
											title="팝업 닫기"
										>
											<X className="w-4 h-4" />
										</button>
									)}

									<div className="w-full h-full overflow-hidden" style={{ borderRadius: `${previewPopup.borderRadius}px` }}>
										{previewPopup.type === "image" && previewPopup.imageUrl ? (
											<img
												src={previewPopup.imageUrl}
												alt={previewPopup.title}
												className="w-full h-full object-cover cursor-pointer"
												onClick={() => previewPopup.linkUrl && window.open(previewPopup.linkUrl, '_blank')}
											/>
										) : previewPopup.type === "html" ? (
											<div
												className="w-full h-full overflow-auto p-4"
												dangerouslySetInnerHTML={{ __html: previewPopup.content }}
											/>
										) : (
											<div className="w-full h-full flex items-center justify-center text-gray-500">
												미리보기를 사용할 수 없습니다
											</div>
										)}
									</div>
								</div>
								<button
									onClick={() => setPreviewPopup(null)}
									className="absolute -top-10 right-0 text-white hover:text-gray-300"
									title="미리보기 닫기"
								>
									<X className="w-8 h-8" />
								</button>
							</div>
						</div>
					)}
				</div>
			</AdminLayout>
		</AdminAuthGuard>
	);
}
