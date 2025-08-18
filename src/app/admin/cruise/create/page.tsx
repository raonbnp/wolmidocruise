"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminAuthGuard from "@/components/admin/AdminAuthGuard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
	Save,
	ArrowLeft,
	Plus,
	X,
	Upload,
	Clock,
	Users,
	Ship,
	MapPin,
	Calendar,
	AlertCircle,
	Check
} from "lucide-react";
import Link from "next/link";

// 크루즈 상품 등록 폼 데이터 타입
interface CruiseProductForm {
	name: string;
	category: string;
	shortDescription: string;
	description: string;
	adultRegularPrice: number;
	adultSalePrice: number;
	childRegularPrice: number;
	childSalePrice: number;
	operatingTimes: string[];
	maxCapacity: number;
	duration: number; // 분 단위
	departureLocation: string;
	arrivalLocation: string;
	features: string[];
	images: File[];
	isActive: boolean;
	isFeatured: boolean;
	availableDays: string[]; // ['monday', 'tuesday', ...]
	seasonalPricing: boolean;
	minAge: number;
	maxAge: number;
	includeItems: string[];
	excludeItems: string[];
	cancellationPolicy: string;
	weatherPolicy: string;
}

// 초기 폼 데이터
const initialFormData: CruiseProductForm = {
	name: "",
	category: "",
	shortDescription: "",
	description: "",
	adultRegularPrice: 0,
	adultSalePrice: 0,
	childRegularPrice: 0,
	childSalePrice: 0,
	operatingTimes: [],
	maxCapacity: 100,
	duration: 60,
	departureLocation: "",
	arrivalLocation: "",
	features: [],
	images: [],
	isActive: true,
	isFeatured: false,
	availableDays: [],
	seasonalPricing: false,
	minAge: 0,
	maxAge: 100,
	includeItems: [],
	excludeItems: [],
	cancellationPolicy: "",
	weatherPolicy: ""
};

// 카테고리 옵션
const categoryOptions = [
	"일반 크루즈",
	"특별 크루즈",
	"정기 크루즈",
	"패키지 상품",
	"프리미엄 크루즈",
	"가족 크루즈"
];

// 요일 옵션
const dayOptions = [
	{ value: "monday", label: "월요일" },
	{ value: "tuesday", label: "화요일" },
	{ value: "wednesday", label: "수요일" },
	{ value: "thursday", label: "목요일" },
	{ value: "friday", label: "금요일" },
	{ value: "saturday", label: "토요일" },
	{ value: "sunday", label: "일요일" }
];

// 특징 옵션
const featureOptions = [
	"불꽃놀이", "석양 감상", "갈매기 먹이주기", "선상 공연", "뷔페 식사",
	"와인 테이스팅", "라이브 음악", "사진 촬영", "가이드 투어", "낚시 체험"
];

export default function CruiseCreatePage() {
	const router = useRouter();
	const [formData, setFormData] = useState<CruiseProductForm>(initialFormData);
	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState<{ [key: string]: string }>({});
	const [newOperatingTime, setNewOperatingTime] = useState("");
	const [newFeature, setNewFeature] = useState("");
	const [newIncludeItem, setNewIncludeItem] = useState("");
	const [newExcludeItem, setNewExcludeItem] = useState("");

	// 입력값 변경 핸들러
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		const { name, value, type } = e.target;
		
		if (type === 'checkbox') {
			const checked = (e.target as HTMLInputElement).checked;
			setFormData(prev => ({
				...prev,
				[name]: checked
			}));
		} else if (type === 'number') {
			setFormData(prev => ({
				...prev,
				[name]: parseFloat(value) || 0
			}));
		} else {
			setFormData(prev => ({
				...prev,
				[name]: value
			}));
		}

		// 에러 메시지 제거
		if (errors[name]) {
			setErrors(prev => {
				const newErrors = { ...prev };
				delete newErrors[name];
				return newErrors;
			});
		}
	};

	// 배열 필드 추가/제거 핸들러
	const addToArray = (field: keyof CruiseProductForm, value: string) => {
		if (value.trim()) {
			setFormData(prev => ({
				...prev,
				[field]: [...(prev[field] as string[]), value.trim()]
			}));
		}
	};

	const removeFromArray = (field: keyof CruiseProductForm, index: number) => {
		setFormData(prev => ({
			...prev,
			[field]: (prev[field] as string[]).filter((_, i) => i !== index)
		}));
	};

	// 요일 선택 핸들러
	const handleDayChange = (day: string) => {
		setFormData(prev => ({
			...prev,
			availableDays: prev.availableDays.includes(day)
				? prev.availableDays.filter(d => d !== day)
				: [...prev.availableDays, day]
		}));
	};

	// 이미지 업로드 핸들러
	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(e.target.files || []);
		setFormData(prev => ({
			...prev,
			images: [...prev.images, ...files]
		}));
	};

	// 이미지 제거 핸들러
	const removeImage = (index: number) => {
		setFormData(prev => ({
			...prev,
			images: prev.images.filter((_, i) => i !== index)
		}));
	};

	// 폼 유효성 검사
	const validateForm = (): boolean => {
		const newErrors: { [key: string]: string } = {};

		if (!formData.name.trim()) {
			newErrors.name = "상품명을 입력해주세요.";
		}

		if (!formData.category) {
			newErrors.category = "카테고리를 선택해주세요.";
		}

		if (!formData.shortDescription.trim()) {
			newErrors.shortDescription = "간단 설명을 입력해주세요.";
		}

		if (!formData.description.trim()) {
			newErrors.description = "상세 설명을 입력해주세요.";
		}

		if (formData.adultRegularPrice <= 0) {
			newErrors.adultRegularPrice = "대인 정가를 입력해주세요.";
		}

		if (formData.adultSalePrice <= 0) {
			newErrors.adultSalePrice = "대인 판매가를 입력해주세요.";
		}

		if (formData.childRegularPrice <= 0) {
			newErrors.childRegularPrice = "소인 정가를 입력해주세요.";
		}

		if (formData.childSalePrice <= 0) {
			newErrors.childSalePrice = "소인 판매가를 입력해주세요.";
		}

		if (formData.operatingTimes.length === 0) {
			newErrors.operatingTimes = "운항 시간을 최소 1개 이상 추가해주세요.";
		}

		if (formData.maxCapacity <= 0) {
			newErrors.maxCapacity = "최대 승객 수를 입력해주세요.";
		}

		if (formData.duration <= 0) {
			newErrors.duration = "운항 시간을 입력해주세요.";
		}

		if (!formData.departureLocation.trim()) {
			newErrors.departureLocation = "출발지를 입력해주세요.";
		}

		if (formData.availableDays.length === 0) {
			newErrors.availableDays = "운항 요일을 최소 1개 이상 선택해주세요.";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	// 폼 제출 핸들러
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!validateForm()) {
			alert("입력 정보를 확인해주세요.");
			return;
		}

		setLoading(true);

		try {
			// 실제로는 API 호출
			console.log("Creating cruise product:", formData);
			
			// API 호출 시뮬레이션
			await new Promise(resolve => setTimeout(resolve, 2000));
			
			alert("크루즈 상품이 성공적으로 등록되었습니다!");
			router.push("/admin/cruise");
		} catch (error) {
			console.error("Product creation error:", error);
			alert("상품 등록 중 오류가 발생했습니다.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<AdminAuthGuard requiredPermission="cruise">
			<AdminLayout>
				<div className="space-y-6">
					{/* 헤더 */}
					<div className="flex items-center justify-between">
						<div>
							<h1 className="text-3xl font-bold text-gray-900">크루즈 상품 등록</h1>
							<p className="text-gray-600">새로운 크루즈 상품을 등록하세요</p>
						</div>
						<div className="flex space-x-3">
							<Link href="/admin/cruise">
								<Button variant="outline" className="flex items-center space-x-2">
									<ArrowLeft className="w-4 h-4" />
									<span>목록으로</span>
								</Button>
							</Link>
							<Button 
								onClick={handleSubmit}
								disabled={loading}
								className="bg-[#005BAC] hover:bg-[#004494] flex items-center space-x-2"
							>
								{loading ? (
									<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
								) : (
									<Save className="w-4 h-4" />
								)}
								<span>{loading ? "등록 중..." : "상품 등록"}</span>
							</Button>
						</div>
					</div>

					<form onSubmit={handleSubmit} className="space-y-8">
						{/* 기본 정보 */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center space-x-2">
									<Ship className="w-5 h-5 text-[#005BAC]" />
									<span>기본 정보</span>
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-6">
								<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											상품명 <span className="text-red-500">*</span>
										</label>
										<input
											type="text"
											name="name"
											value={formData.name}
											onChange={handleInputChange}
											className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none ${
												errors.name ? "border-red-500" : "border-gray-300"
											}`}
											placeholder="예: 불꽃 크루즈"
										/>
										{errors.name && (
											<p className="mt-1 text-sm text-red-600 flex items-center">
												<AlertCircle className="w-4 h-4 mr-1" />
												{errors.name}
											</p>
										)}
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											카테고리 <span className="text-red-500">*</span>
										</label>
										<select
											name="category"
											value={formData.category}
											onChange={handleInputChange}
											className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none ${
												errors.category ? "border-red-500" : "border-gray-300"
											}`}
											aria-label="카테고리 선택"
										>
											<option value="">카테고리 선택</option>
											{categoryOptions.map(category => (
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
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										간단 설명 <span className="text-red-500">*</span>
									</label>
									<input
										type="text"
										name="shortDescription"
										value={formData.shortDescription}
										onChange={handleInputChange}
										className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none ${
											errors.shortDescription ? "border-red-500" : "border-gray-300"
										}`}
										placeholder="한 줄로 상품을 소개해주세요"
										maxLength={100}
									/>
									<div className="flex justify-between items-center mt-1">
										{errors.shortDescription ? (
											<p className="text-sm text-red-600 flex items-center">
												<AlertCircle className="w-4 h-4 mr-1" />
												{errors.shortDescription}
											</p>
										) : (
											<span></span>
										)}
										<span className="text-sm text-gray-500">
											{formData.shortDescription.length}/100
										</span>
									</div>
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										상세 설명 <span className="text-red-500">*</span>
									</label>
									<textarea
										name="description"
										value={formData.description}
										onChange={handleInputChange}
										rows={6}
										className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none resize-none ${
											errors.description ? "border-red-500" : "border-gray-300"
										}`}
										placeholder="상품에 대한 자세한 설명을 입력해주세요"
									/>
									{errors.description && (
										<p className="mt-1 text-sm text-red-600 flex items-center">
											<AlertCircle className="w-4 h-4 mr-1" />
											{errors.description}
										</p>
									)}
								</div>

								<div className="flex items-center space-x-6">
									<label className="flex items-center space-x-2">
										<input
											type="checkbox"
											name="isActive"
											checked={formData.isActive}
											onChange={handleInputChange}
											className="w-4 h-4 text-[#005BAC] border-gray-300 rounded focus:ring-[#005BAC]"
										/>
										<span className="text-sm font-medium text-gray-700">활성 상품</span>
									</label>
									<label className="flex items-center space-x-2">
										<input
											type="checkbox"
											name="isFeatured"
											checked={formData.isFeatured}
											onChange={handleInputChange}
											className="w-4 h-4 text-[#005BAC] border-gray-300 rounded focus:ring-[#005BAC]"
										/>
										<span className="text-sm font-medium text-gray-700">추천 상품</span>
									</label>
								</div>
							</CardContent>
						</Card>

						{/* 가격 정보 */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center space-x-2">
									<span className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
										₩
									</span>
									<span>가격 정보</span>
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-6">
								<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											대인 정가 <span className="text-red-500">*</span>
										</label>
										<div className="relative">
											<input
												type="number"
												name="adultRegularPrice"
												value={formData.adultRegularPrice || ""}
												onChange={handleInputChange}
												className={`w-full px-4 py-3 pr-8 border rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none ${
													errors.adultRegularPrice ? "border-red-500" : "border-gray-300"
												}`}
												placeholder="0"
												min="0"
											/>
											<span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">원</span>
										</div>
										{errors.adultRegularPrice && (
											<p className="mt-1 text-sm text-red-600 flex items-center">
												<AlertCircle className="w-4 h-4 mr-1" />
												{errors.adultRegularPrice}
											</p>
										)}
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											대인 판매가 <span className="text-red-500">*</span>
										</label>
										<div className="relative">
											<input
												type="number"
												name="adultSalePrice"
												value={formData.adultSalePrice || ""}
												onChange={handleInputChange}
												className={`w-full px-4 py-3 pr-8 border rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none ${
													errors.adultSalePrice ? "border-red-500" : "border-gray-300"
												}`}
												placeholder="0"
												min="0"
											/>
											<span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">원</span>
										</div>
										{errors.adultSalePrice && (
											<p className="mt-1 text-sm text-red-600 flex items-center">
												<AlertCircle className="w-4 h-4 mr-1" />
												{errors.adultSalePrice}
											</p>
										)}
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											소인 정가 <span className="text-red-500">*</span>
										</label>
										<div className="relative">
											<input
												type="number"
												name="childRegularPrice"
												value={formData.childRegularPrice || ""}
												onChange={handleInputChange}
												className={`w-full px-4 py-3 pr-8 border rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none ${
													errors.childRegularPrice ? "border-red-500" : "border-gray-300"
												}`}
												placeholder="0"
												min="0"
											/>
											<span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">원</span>
										</div>
										{errors.childRegularPrice && (
											<p className="mt-1 text-sm text-red-600 flex items-center">
												<AlertCircle className="w-4 h-4 mr-1" />
												{errors.childRegularPrice}
											</p>
										)}
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											소인 판매가 <span className="text-red-500">*</span>
										</label>
										<div className="relative">
											<input
												type="number"
												name="childSalePrice"
												value={formData.childSalePrice || ""}
												onChange={handleInputChange}
												className={`w-full px-4 py-3 pr-8 border rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none ${
													errors.childSalePrice ? "border-red-500" : "border-gray-300"
												}`}
												placeholder="0"
												min="0"
											/>
											<span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">원</span>
										</div>
										{errors.childSalePrice && (
											<p className="mt-1 text-sm text-red-600 flex items-center">
												<AlertCircle className="w-4 h-4 mr-1" />
												{errors.childSalePrice}
											</p>
										)}
									</div>
								</div>
							</CardContent>
						</Card>

						{/* 운항 정보 */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center space-x-2">
									<Clock className="w-5 h-5 text-[#005BAC]" />
									<span>운항 정보</span>
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-6">
								<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											최대 승객 수 <span className="text-red-500">*</span>
										</label>
										<div className="relative">
											<Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
											<input
												type="number"
												name="maxCapacity"
												value={formData.maxCapacity || ""}
												onChange={handleInputChange}
												className={`w-full pl-10 pr-8 py-3 border rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none ${
													errors.maxCapacity ? "border-red-500" : "border-gray-300"
												}`}
												placeholder="100"
												min="1"
											/>
											<span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">명</span>
										</div>
										{errors.maxCapacity && (
											<p className="mt-1 text-sm text-red-600 flex items-center">
												<AlertCircle className="w-4 h-4 mr-1" />
												{errors.maxCapacity}
											</p>
										)}
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											운항 시간 <span className="text-red-500">*</span>
										</label>
										<div className="relative">
											<Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
											<input
												type="number"
												name="duration"
												value={formData.duration || ""}
												onChange={handleInputChange}
												className={`w-full pl-10 pr-8 py-3 border rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none ${
													errors.duration ? "border-red-500" : "border-gray-300"
												}`}
												placeholder="60"
												min="1"
											/>
											<span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">분</span>
										</div>
										{errors.duration && (
											<p className="mt-1 text-sm text-red-600 flex items-center">
												<AlertCircle className="w-4 h-4 mr-1" />
												{errors.duration}
											</p>
										)}
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											출발지 <span className="text-red-500">*</span>
										</label>
										<div className="relative">
											<MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
											<input
												type="text"
												name="departureLocation"
												value={formData.departureLocation}
												onChange={handleInputChange}
												className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none ${
													errors.departureLocation ? "border-red-500" : "border-gray-300"
												}`}
												placeholder="예: 월미도 선착장"
											/>
										</div>
										{errors.departureLocation && (
											<p className="mt-1 text-sm text-red-600 flex items-center">
												<AlertCircle className="w-4 h-4 mr-1" />
												{errors.departureLocation}
											</p>
										)}
									</div>
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										도착지
									</label>
									<div className="relative">
										<MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
										<input
											type="text"
											name="arrivalLocation"
											value={formData.arrivalLocation}
											onChange={handleInputChange}
											className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none"
											placeholder="예: 월미도 선착장 (출발지와 동일한 경우 비워두세요)"
										/>
									</div>
								</div>

								{/* 운항 시간 */}
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										운항 시간 <span className="text-red-500">*</span>
									</label>
									<div className="flex items-center space-x-2 mb-3">
										<input
											type="time"
											value={newOperatingTime}
											onChange={(e) => setNewOperatingTime(e.target.value)}
											className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none"
										/>
										<Button
											type="button"
											onClick={() => {
												if (newOperatingTime && !formData.operatingTimes.includes(newOperatingTime)) {
													addToArray("operatingTimes", newOperatingTime);
													setNewOperatingTime("");
												}
											}}
											variant="outline"
											size="sm"
										>
											<Plus className="w-4 h-4" />
										</Button>
									</div>
									<div className="flex flex-wrap gap-2">
										{formData.operatingTimes.map((time, index) => (
											<Badge key={index} variant="secondary" className="flex items-center space-x-1">
												<span>{time}</span>
												<button
													type="button"
													onClick={() => removeFromArray("operatingTimes", index)}
													className="ml-1 hover:text-red-600"
												>
													<X className="w-3 h-3" />
												</button>
											</Badge>
										))}
									</div>
									{errors.operatingTimes && (
										<p className="mt-1 text-sm text-red-600 flex items-center">
											<AlertCircle className="w-4 h-4 mr-1" />
											{errors.operatingTimes}
										</p>
									)}
								</div>

								{/* 운항 요일 */}
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										운항 요일 <span className="text-red-500">*</span>
									</label>
									<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
										{dayOptions.map(day => (
											<label key={day.value} className="flex items-center space-x-2">
												<input
													type="checkbox"
													checked={formData.availableDays.includes(day.value)}
													onChange={() => handleDayChange(day.value)}
													className="w-4 h-4 text-[#005BAC] border-gray-300 rounded focus:ring-[#005BAC]"
												/>
												<span className="text-sm text-gray-700">{day.label}</span>
											</label>
										))}
									</div>
									{errors.availableDays && (
										<p className="mt-1 text-sm text-red-600 flex items-center">
											<AlertCircle className="w-4 h-4 mr-1" />
											{errors.availableDays}
										</p>
									)}
								</div>
							</CardContent>
						</Card>

						{/* 상품 특징 */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center space-x-2">
									<span className="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center">
										✨
									</span>
									<span>상품 특징</span>
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-6">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										특징 태그
									</label>
									<div className="flex items-center space-x-2 mb-3">
										<input
											type="text"
											value={newFeature}
											onChange={(e) => setNewFeature(e.target.value)}
											className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none"
											placeholder="특징을 입력하세요"
											onKeyPress={(e) => {
												if (e.key === 'Enter') {
													e.preventDefault();
													if (newFeature.trim() && !formData.features.includes(newFeature.trim())) {
														addToArray("features", newFeature);
														setNewFeature("");
													}
												}
											}}
										/>
										<Button
											type="button"
											onClick={() => {
												if (newFeature.trim() && !formData.features.includes(newFeature.trim())) {
													addToArray("features", newFeature);
													setNewFeature("");
												}
											}}
											variant="outline"
											size="sm"
										>
											<Plus className="w-4 h-4" />
										</Button>
									</div>
									<div className="mb-4">
										<p className="text-sm text-gray-600 mb-2">추천 특징:</p>
										<div className="flex flex-wrap gap-2">
											{featureOptions.map(feature => (
												<button
													key={feature}
													type="button"
													onClick={() => {
														if (!formData.features.includes(feature)) {
															addToArray("features", feature);
														}
													}}
													className="px-3 py-1 text-sm border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
													disabled={formData.features.includes(feature)}
												>
													{feature}
												</button>
											))}
										</div>
									</div>
									<div className="flex flex-wrap gap-2">
										{formData.features.map((feature, index) => (
											<Badge key={index} variant="default" className="flex items-center space-x-1">
												<span>{feature}</span>
												<button
													type="button"
													onClick={() => removeFromArray("features", index)}
													className="ml-1 hover:text-red-300"
												>
													<X className="w-3 h-3" />
												</button>
											</Badge>
										))}
									</div>
								</div>
							</CardContent>
						</Card>

						{/* 이미지 업로드 */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center space-x-2">
									<Upload className="w-5 h-5 text-[#005BAC]" />
									<span>상품 이미지</span>
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#005BAC] transition-colors">
										<Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
										<p className="text-gray-600 mb-2">이미지를 드래그하거나 클릭하여 업로드하세요</p>
										<p className="text-sm text-gray-500 mb-4">JPG, PNG 파일만 지원 (최대 10MB)</p>
										<input
											type="file"
											multiple
											accept="image/*"
											onChange={handleImageUpload}
											className="hidden"
											id="image-upload"
										/>
										<label
											htmlFor="image-upload"
											className="inline-flex items-center px-4 py-2 bg-[#005BAC] text-white rounded-lg cursor-pointer hover:bg-[#004494] transition-colors"
										>
											<Upload className="w-4 h-4 mr-2" />
											파일 선택
										</label>
									</div>

									{formData.images.length > 0 && (
										<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
											{formData.images.map((image, index) => (
												<div key={index} className="relative group">
													<img
														src={URL.createObjectURL(image)}
														alt={`상품 이미지 ${index + 1}`}
														className="w-full h-32 object-cover rounded-lg border border-gray-300"
													/>
													<button
														type="button"
														onClick={() => removeImage(index)}
														className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
													>
														<X className="w-3 h-3" />
													</button>
												</div>
											))}
										</div>
									)}
								</div>
							</CardContent>
						</Card>

						{/* 정책 정보 */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center space-x-2">
									<AlertCircle className="w-5 h-5 text-[#005BAC]" />
									<span>이용 정책</span>
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-6">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										취소 정책
									</label>
									<textarea
										name="cancellationPolicy"
										value={formData.cancellationPolicy}
										onChange={handleInputChange}
										rows={4}
										className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none resize-none"
										placeholder="취소 및 환불 정책을 입력해주세요"
									/>
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										기상 정책
									</label>
									<textarea
										name="weatherPolicy"
										value={formData.weatherPolicy}
										onChange={handleInputChange}
										rows={4}
										className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none resize-none"
										placeholder="기상 악화 시 운항 중단 및 환불 정책을 입력해주세요"
									/>
								</div>
							</CardContent>
						</Card>
					</form>
				</div>
			</AdminLayout>
		</AdminAuthGuard>
	);
}

