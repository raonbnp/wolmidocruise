"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminAuthGuard from "@/components/admin/AdminAuthGuard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
	Settings,
	Globe,
	Phone,
	Mail,
	Printer,
	MapPin,
	Building,
	User,
	Clock,
	Shield,
	Database,
	Server,
	Save,
	RefreshCw,
	AlertCircle,
	Check,
	Eye,
	EyeOff
} from "lucide-react";

// 시스템 설정 타입
interface SystemSettings {
	// 사이트 기본 정보
	siteName: string;
	siteDescription: string;
	siteUrl: string;
	logoUrl: string;
	faviconUrl: string;
	
	// 연락처 정보
	companyName: string;
	ceoName: string;
	businessNumber: string;
	address: string;
	detailAddress: string;
	zipCode: string;
	phoneNumber: string;
	faxNumber: string;
	email: string;
	customerServicePhone: string;
	customerServiceEmail: string;
	customerServiceHours: string;
	
	// 운영 설정
	operatingHours: string;
	holidayNotice: string;
	reservationPolicy: string;
	cancellationPolicy: string;
	refundPolicy: string;
	
	// 시스템 설정
	maintenanceMode: boolean;
	maintenanceMessage: string;
	maxReservationsPerDay: number;
	reservationTimeLimit: number;
	autoConfirmReservation: boolean;
	emailNotification: boolean;
	smsNotification: boolean;
	
	// SEO 설정
	metaTitle: string;
	metaDescription: string;
	metaKeywords: string;
	googleAnalyticsId: string;
	naverAnalyticsId: string;
	
	// 소셜 미디어
	facebookUrl: string;
	instagramUrl: string;
	youtubeUrl: string;
	blogUrl: string;
	
	// 법적 정보
	privacyPolicyUrl: string;
	termsOfServiceUrl: string;
	locationBasedServiceUrl: string;
}

// 더미 설정 데이터
const dummySettings: SystemSettings = {
	siteName: "월미도 해양관광",
	siteDescription: "인천 월미도에서 즐기는 특별한 크루즈 여행",
	siteUrl: "https://wolmido-cruise.com",
	logoUrl: "/images/logo.png",
	faviconUrl: "/images/favicon.ico",
	
	companyName: "월미도해양관광(주)",
	ceoName: "김해양",
	businessNumber: "123-45-67890",
	address: "인천광역시 중구 월미문화로 81",
	detailAddress: "월미도 선착장 2층",
	zipCode: "22382",
	phoneNumber: "032-123-4567",
	faxNumber: "032-123-4568",
	email: "info@wolmido-cruise.com",
	customerServicePhone: "1588-1234",
	customerServiceEmail: "support@wolmido-cruise.com",
	customerServiceHours: "평일 09:00~18:00, 주말 09:00~17:00",
	
	operatingHours: "09:00~21:00 (연중무휴)",
	holidayNotice: "설날, 추석 당일 휴무",
	reservationPolicy: "예약은 승선 1시간 전까지 가능하며, 날씨에 따라 운항이 취소될 수 있습니다.",
	cancellationPolicy: "승선 24시간 전까지 무료 취소 가능",
	refundPolicy: "취소 시점에 따라 차등 환불 (24시간 전 100%, 12시간 전 50%, 이후 불가)",
	
	maintenanceMode: false,
	maintenanceMessage: "시스템 점검 중입니다. 잠시 후 다시 이용해 주세요.",
	maxReservationsPerDay: 500,
	reservationTimeLimit: 30,
	autoConfirmReservation: false,
	emailNotification: true,
	smsNotification: true,
	
	metaTitle: "월미도 해양관광 - 인천 크루즈 여행의 시작",
	metaDescription: "월미도에서 즐기는 특별한 크루즈 여행. 불꽃 크루즈, 낙조 크루즈, 패키지 여행까지 다양한 프로그램을 만나보세요.",
	metaKeywords: "월미도, 크루즈, 인천여행, 불꽃놀이, 낙조, 해양관광",
	googleAnalyticsId: "GA-XXXXXXXXX",
	naverAnalyticsId: "NA-XXXXXXXXX",
	
	facebookUrl: "https://facebook.com/wolmido-cruise",
	instagramUrl: "https://instagram.com/wolmido_cruise",
	youtubeUrl: "https://youtube.com/@wolmido-cruise",
	blogUrl: "https://blog.naver.com/wolmido-cruise",
	
	privacyPolicyUrl: "/privacy-policy",
	termsOfServiceUrl: "/terms-of-service",
	locationBasedServiceUrl: "/location-terms"
};

export default function SystemPage() {
	const [settings, setSettings] = useState<SystemSettings>(dummySettings);
	const [loading, setLoading] = useState(false);
	const [saving, setSaving] = useState(false);
	const [errors, setErrors] = useState<{ [key: string]: string }>({});
	const [activeTab, setActiveTab] = useState("basic");
	const [showMaintenancePassword, setShowMaintenancePassword] = useState(false);

	// 설정 저장
	const handleSave = async () => {
		setSaving(true);
		try {
			// 실제로는 API 호출
			await new Promise(resolve => setTimeout(resolve, 1500));
			alert('시스템 설정이 저장되었습니다.');
		} catch (error) {
			console.error('Settings save error:', error);
			alert('저장 중 오류가 발생했습니다.');
		} finally {
			setSaving(false);
		}
	};

	// 설정 초기화
	const handleReset = () => {
		if (confirm('설정을 초기값으로 되돌리시겠습니까?')) {
			setSettings(dummySettings);
		}
	};

	// 입력값 변경
	const handleInputChange = (field: keyof SystemSettings, value: string | boolean | number) => {
		setSettings(prev => ({
			...prev,
			[field]: value
		}));
	};

	// 탭 메뉴
	const tabs = [
		{ id: "basic", label: "기본 정보", icon: Globe },
		{ id: "operation", label: "운영 설정", icon: Clock }
	];

	return (
		<AdminAuthGuard requiredPermission="system">
			<AdminLayout>
				<div className="space-y-6">
					{/* 헤더 */}
					<div className="flex items-center justify-between">
						<div>
							<h1 className="text-3xl font-bold text-gray-900">시스템 설정</h1>
							<p className="text-gray-600">사이트 기본 설정 및 운영 정책을 관리하세요</p>
						</div>
						<div className="flex space-x-3">
							<Button
								onClick={handleReset}
								variant="outline"
								className="flex items-center space-x-2"
							>
								<RefreshCw className="w-4 h-4" />
								<span>초기화</span>
							</Button>
							<Button
								onClick={handleSave}
								disabled={saving}
								className="bg-[#005BAC] hover:bg-[#004494] flex items-center space-x-2"
							>
								{saving ? (
									<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
								) : (
									<Save className="w-4 h-4" />
								)}
								<span>{saving ? '저장 중...' : '저장'}</span>
							</Button>
						</div>
					</div>

					{/* 탭 네비게이션 */}
					<div className="border-b border-gray-200">
						<nav className="-mb-px flex space-x-8">
							{tabs.map((tab) => {
								const Icon = tab.icon;
								return (
									<button
										key={tab.id}
										onClick={() => setActiveTab(tab.id)}
										className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
											activeTab === tab.id
												? 'border-[#005BAC] text-[#005BAC]'
												: 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
										}`}
									>
										<Icon className="w-4 h-4" />
										<span>{tab.label}</span>
									</button>
								);
							})}
						</nav>
					</div>

					{/* 기본 정보 탭 */}
					{activeTab === "basic" && (
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center space-x-2">
									<Globe className="w-5 h-5" />
									<span>기본 정보</span>
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-8">
								{/* 사이트 기본 정보 */}
								<div className="space-y-4">
									<h3 className="text-lg font-medium text-gray-900 border-b pb-2">사이트 정보</h3>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												사이트명 <span className="text-red-500">*</span>
											</label>
											<input
												type="text"
												value={settings.siteName}
												onChange={(e) => handleInputChange('siteName', e.target.value)}
												className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none"
												placeholder="사이트명을 입력하세요"
											/>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												사이트 URL
											</label>
											<input
												type="url"
												value={settings.siteUrl}
												onChange={(e) => handleInputChange('siteUrl', e.target.value)}
												className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none"
												placeholder="https://example.com"
											/>
										</div>
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											사이트 설명
										</label>
										<textarea
											value={settings.siteDescription}
											onChange={(e) => handleInputChange('siteDescription', e.target.value)}
											rows={3}
											className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none resize-none"
											placeholder="사이트에 대한 간단한 설명을 입력하세요"
										/>
									</div>

									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												로고 URL
											</label>
											<input
												type="url"
												value={settings.logoUrl}
												onChange={(e) => handleInputChange('logoUrl', e.target.value)}
												className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none"
												placeholder="/images/logo.png"
											/>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												파비콘 URL
											</label>
											<input
												type="url"
												value={settings.faviconUrl}
												onChange={(e) => handleInputChange('faviconUrl', e.target.value)}
												className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none"
												placeholder="/images/favicon.ico"
											/>
										</div>
									</div>
								</div>

								{/* 회사 정보 */}
								<div className="space-y-4">
									<h3 className="text-lg font-medium text-gray-900 border-b pb-2">회사 정보</h3>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												회사명 <span className="text-red-500">*</span>
											</label>
											<input
												type="text"
												value={settings.companyName}
												onChange={(e) => handleInputChange('companyName', e.target.value)}
												className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none"
												placeholder="회사명을 입력하세요"
											/>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												대표자명
											</label>
											<input
												type="text"
												value={settings.ceoName}
												onChange={(e) => handleInputChange('ceoName', e.target.value)}
												className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none"
												placeholder="대표자명을 입력하세요"
											/>
										</div>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											사업자등록번호
										</label>
										<input
											type="text"
											value={settings.businessNumber}
											onChange={(e) => handleInputChange('businessNumber', e.target.value)}
											className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none"
											placeholder="123-45-67890"
										/>
									</div>
								</div>

								{/* 주소 정보 */}
								<div className="space-y-4">
									<h3 className="text-lg font-medium text-gray-900 border-b pb-2">주소 정보</h3>
									<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												우편번호
											</label>
											<input
												type="text"
												value={settings.zipCode}
												onChange={(e) => handleInputChange('zipCode', e.target.value)}
												className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none"
												placeholder="12345"
											/>
										</div>
										<div className="md:col-span-2">
											<label className="block text-sm font-medium text-gray-700 mb-2">
												기본 주소
											</label>
											<input
												type="text"
												value={settings.address}
												onChange={(e) => handleInputChange('address', e.target.value)}
												className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none"
												placeholder="기본 주소를 입력하세요"
											/>
										</div>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											상세 주소
										</label>
										<input
											type="text"
											value={settings.detailAddress}
											onChange={(e) => handleInputChange('detailAddress', e.target.value)}
											className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none"
											placeholder="상세 주소를 입력하세요"
										/>
									</div>
								</div>

								{/* 연락처 */}
								<div className="space-y-4">
									<h3 className="text-lg font-medium text-gray-900 border-b pb-2">연락처</h3>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												대표전화 <span className="text-red-500">*</span>
											</label>
											<input
												type="tel"
												value={settings.phoneNumber}
												onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
												className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none"
												placeholder="032-123-4567"
											/>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												팩스번호
											</label>
											<input
												type="tel"
												value={settings.faxNumber}
												onChange={(e) => handleInputChange('faxNumber', e.target.value)}
												className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none"
												placeholder="032-123-4568"
											/>
										</div>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											대표 이메일 <span className="text-red-500">*</span>
										</label>
										<input
											type="email"
											value={settings.email}
											onChange={(e) => handleInputChange('email', e.target.value)}
											className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none"
											placeholder="info@example.com"
										/>
									</div>
								</div>

								{/* 고객센터 */}
								<div className="space-y-4">
									<h3 className="text-lg font-medium text-gray-900 border-b pb-2">고객센터</h3>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												고객센터 전화
											</label>
											<input
												type="tel"
												value={settings.customerServicePhone}
												onChange={(e) => handleInputChange('customerServicePhone', e.target.value)}
												className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none"
												placeholder="1588-1234"
											/>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												고객센터 이메일
											</label>
											<input
												type="email"
												value={settings.customerServiceEmail}
												onChange={(e) => handleInputChange('customerServiceEmail', e.target.value)}
												className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none"
												placeholder="support@example.com"
											/>
										</div>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											고객센터 운영시간
										</label>
										<input
											type="text"
											value={settings.customerServiceHours}
											onChange={(e) => handleInputChange('customerServiceHours', e.target.value)}
											className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none"
											placeholder="평일 09:00~18:00, 주말 09:00~17:00"
										/>
									</div>
								</div>

								{/* SEO 설정 */}
								<div className="space-y-4">
									<h3 className="text-lg font-medium text-gray-900 border-b pb-2">SEO 설정</h3>
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											메타 타이틀
										</label>
										<input
											type="text"
											value={settings.metaTitle}
											onChange={(e) => handleInputChange('metaTitle', e.target.value)}
											className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none"
											placeholder="페이지 제목을 입력하세요"
										/>
										<p className="text-xs text-gray-500 mt-1">권장 길이: 50-60자</p>
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											메타 설명
										</label>
										<textarea
											value={settings.metaDescription}
											onChange={(e) => handleInputChange('metaDescription', e.target.value)}
											rows={3}
											className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none resize-none"
											placeholder="페이지 설명을 입력하세요"
										/>
										<p className="text-xs text-gray-500 mt-1">권장 길이: 150-160자</p>
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											메타 키워드
										</label>
										<input
											type="text"
											value={settings.metaKeywords}
											onChange={(e) => handleInputChange('metaKeywords', e.target.value)}
											className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none"
											placeholder="키워드1, 키워드2, 키워드3"
										/>
										<p className="text-xs text-gray-500 mt-1">쉼표로 구분하여 입력하세요</p>
									</div>

									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												구글 애널리틱스 ID
											</label>
											<input
												type="text"
												value={settings.googleAnalyticsId}
												onChange={(e) => handleInputChange('googleAnalyticsId', e.target.value)}
												className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none"
												placeholder="GA-XXXXXXXXX"
											/>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												네이버 애널리틱스 ID
											</label>
											<input
												type="text"
												value={settings.naverAnalyticsId}
												onChange={(e) => handleInputChange('naverAnalyticsId', e.target.value)}
												className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none"
												placeholder="NA-XXXXXXXXX"
											/>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					)}



					{/* 운영 설정 탭 */}
					{activeTab === "operation" && (
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center space-x-2">
									<Clock className="w-5 h-5" />
									<span>운영 설정</span>
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-6">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										운영시간
									</label>
									<input
										type="text"
										value={settings.operatingHours}
										onChange={(e) => handleInputChange('operatingHours', e.target.value)}
										className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none"
										placeholder="09:00~21:00 (연중무휴)"
									/>
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										휴무일 안내
									</label>
									<textarea
										value={settings.holidayNotice}
										onChange={(e) => handleInputChange('holidayNotice', e.target.value)}
										rows={2}
										className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none resize-none"
										placeholder="설날, 추석 당일 휴무"
									/>
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										예약 정책
									</label>
									<textarea
										value={settings.reservationPolicy}
										onChange={(e) => handleInputChange('reservationPolicy', e.target.value)}
										rows={3}
										className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none resize-none"
										placeholder="예약 정책을 입력하세요"
									/>
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										취소 정책
									</label>
									<textarea
										value={settings.cancellationPolicy}
										onChange={(e) => handleInputChange('cancellationPolicy', e.target.value)}
										rows={3}
										className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none resize-none"
										placeholder="취소 정책을 입력하세요"
									/>
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										환불 정책
									</label>
									<textarea
										value={settings.refundPolicy}
										onChange={(e) => handleInputChange('refundPolicy', e.target.value)}
										rows={3}
										className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none resize-none"
										placeholder="환불 정책을 입력하세요"
									/>
								</div>
							</CardContent>
						</Card>
					)}








				</div>
			</AdminLayout>
		</AdminAuthGuard>
	);
}
