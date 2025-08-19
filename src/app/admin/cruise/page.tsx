"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminAuthGuard from "@/components/admin/AdminAuthGuard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
	Plus,
	Edit,
	Eye,
	Search,
	MoreHorizontal,
	Ship,
	Clock,
	Users,
	DollarSign
, Filter} from "lucide-react";
import Link from "next/link";

// 크루즈 상품 타입 (기존 타입 확장)
interface CruiseProduct {
	id: number;
	name: string;
	description: string;
	shortDescription: string;
	category: string;
	adultRegularPrice: number;
	adultSalePrice: number;
	childRegularPrice: number;
	childSalePrice: number;
	operatingTimes: string[];
	maxCapacity: number;
	duration: number; // 운항 시간 (분)
	imageUrl?: string;
	images?: string[];
	isActive: boolean;
	isFeatured: boolean;
	reservationCount: number;
	createdAt: string;
	updatedAt: string;
}

// 더미 크루즈 상품 데이터
const dummyCruiseProducts: CruiseProduct[] = [
	{
		id: 1,
		name: "불꽃 크루즈",
		description: "화려한 불꽃놀이와 함께하는 낭만적인 밤바다 여행입니다. 인천항의 아름다운 야경과 함께 특별한 추억을 만들어보세요.",
		shortDescription: "화려한 불꽃놀이와 함께하는 낭만적인 밤바다 여행",
		category: "특별 크루즈",
		adultRegularPrice: 40000,
		adultSalePrice: 35000,
		childRegularPrice: 30000,
		childSalePrice: 25000,
		operatingTimes: ["19:00", "20:30"],
		maxCapacity: 200,
		duration: 90,
		imageUrl: "https://via.placeholder.com/400x300/3B82F6/FFFFFF?text=Fireworks",
		isActive: true,
		isFeatured: true,
		reservationCount: 156,
		createdAt: "2024-01-01T00:00:00Z",
		updatedAt: "2024-01-25T10:30:00Z"
	},
	{
		id: 2,
		name: "낙조 크루즈",
		description: "서해의 아름다운 석양과 함께하는 로맨틱한 크루즈입니다. 황금빛 노을이 바다를 물들이는 장관을 감상하세요.",
		shortDescription: "서해의 아름다운 석양과 함께하는 로맨틱한 크루즈",
		category: "일반 크루즈",
		adultRegularPrice: 38000,
		adultSalePrice: 32000,
		childRegularPrice: 28000,
		childSalePrice: 23000,
		operatingTimes: ["17:30", "18:30"],
		maxCapacity: 150,
		duration: 60,
		imageUrl: "https://via.placeholder.com/400x300/F59E0B/FFFFFF?text=Sunset",
		isActive: true,
		isFeatured: false,
		reservationCount: 89,
		createdAt: "2024-01-01T00:00:00Z",
		updatedAt: "2024-01-20T15:20:00Z"
	},
	{
		id: 3,
		name: "행복 크루즈 2회",
		description: "갈매기와 함께하는 즐거운 서해 바다 체험입니다. 가족 단위 방문객에게 인기가 높은 크루즈입니다.",
		shortDescription: "갈매기와 함께하는 즐거운 서해 바다 체험",
		category: "일반 크루즈",
		adultRegularPrice: 32000,
		adultSalePrice: 28000,
		childRegularPrice: 24000,
		childSalePrice: 20000,
		operatingTimes: ["10:00", "14:00"],
		maxCapacity: 100,
		duration: 45,
		imageUrl: "https://via.placeholder.com/400x300/10B981/FFFFFF?text=Happy",
		isActive: true,
		isFeatured: false,
		reservationCount: 234,
		createdAt: "2024-01-01T00:00:00Z",
		updatedAt: "2024-01-18T09:15:00Z"
	},
	{
		id: 4,
		name: "행복 크루즈 4회",
		description: "하루 4회 운항하는 정기 크루즈로, 언제든 편리하게 이용할 수 있습니다.",
		shortDescription: "하루 4회 운항하는 정기 크루즈, 언제든 편리하게",
		category: "정기 크루즈",
		adultRegularPrice: 30000,
		adultSalePrice: 25000,
		childRegularPrice: 22000,
		childSalePrice: 18000,
		operatingTimes: ["09:00", "11:00", "13:00", "15:00"],
		maxCapacity: 120,
		duration: 40,
		imageUrl: "https://via.placeholder.com/400x300/8B5CF6/FFFFFF?text=Regular",
		isActive: true,
		isFeatured: false,
		reservationCount: 345,
		createdAt: "2024-01-01T00:00:00Z",
		updatedAt: "2024-01-22T11:45:00Z"
	},
	{
		id: 5,
		name: "패키지 여행 A",
		description: "월미도 관광지 + 크루즈 + 식사가 포함된 종합 패키지입니다.",
		shortDescription: "월미도 관광지 + 크루즈 + 식사가 포함된 종합 패키지",
		category: "패키지 상품",
		adultRegularPrice: 95000,
		adultSalePrice: 85000,
		childRegularPrice: 75000,
		childSalePrice: 65000,
		operatingTimes: ["10:00"],
		maxCapacity: 80,
		duration: 240,
		imageUrl: "https://via.placeholder.com/400x300/EF4444/FFFFFF?text=Package+A",
		isActive: true,
		isFeatured: true,
		reservationCount: 67,
		createdAt: "2024-01-01T00:00:00Z",
		updatedAt: "2024-01-24T14:20:00Z"
	},
	{
		id: 6,
		name: "패키지 여행 B",
		description: "인천 섬 투어 + 크루즈 + 특별 체험이 포함된 프리미엄 패키지입니다.",
		shortDescription: "인천 섬 투어 + 크루즈 + 특별 체험이 포함된 프리미엄 패키지",
		category: "패키지 상품",
		adultRegularPrice: 135000,
		adultSalePrice: 120000,
		childRegularPrice: 105000,
		childSalePrice: 95000,
		operatingTimes: ["09:00"],
		maxCapacity: 60,
		duration: 360,
		imageUrl: "https://via.placeholder.com/400x300/06B6D4/FFFFFF?text=Package+B",
		isActive: false,
		isFeatured: false,
		reservationCount: 23,
		createdAt: "2024-01-01T00:00:00Z",
		updatedAt: "2024-01-15T16:30:00Z"
	}
];

export default function AdminCruisePage() {
	const [products, setProducts] = useState<CruiseProduct[]>([]);
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState("");
	const [filterCategory, setFilterCategory] = useState("all");
	const [filterStatus, setFilterStatus] = useState("all");

	// 데이터 로드
	useEffect(() => {
		const loadProducts = async () => {
			try {
				// 실제로는 API 호출
				await new Promise(resolve => setTimeout(resolve, 1000));
				setProducts(dummyCruiseProducts);
			} catch (error) {
				console.error('Products load error:', error);
			} finally {
				setLoading(false);
			}
		};

		loadProducts();
	}, []);

	// 필터링된 상품 목록
	const filteredProducts = products.filter(product => {
		const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			product.description.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesCategory = filterCategory === "all" || product.category === filterCategory;
		const matchesStatus = filterStatus === "all" || 
			(filterStatus === "active" && product.isActive) ||
			(filterStatus === "inactive" && !product.isActive);

		return matchesSearch && matchesCategory && matchesStatus;
	});

	// 카테고리 목록
	const categories = Array.from(new Set(products.map(p => p.category)));

	// 가격 포맷
	const formatPrice = (price: number) => {
		return price.toLocaleString('ko-KR');
	};



	// 상품 상태 토글
	const handleToggleStatus = async (productId: number) => {
		try {
			// 실제로는 API 호출
			setProducts(prev => prev.map(p => 
				p.id === productId ? { ...p, isActive: !p.isActive } : p
			));
		} catch (error) {
			console.error('Status toggle error:', error);
			alert('상태 변경 중 오류가 발생했습니다.');
		}
	};

	return (
		<AdminAuthGuard requiredPermission="cruise">
			<AdminLayout>
				<div className="space-y-6">
					{/* 헤더 */}
					<div className="flex items-center justify-between">
						<div>
							<h1 className="text-3xl font-bold text-gray-900">크루즈 상품 관리</h1>
							<p className="text-gray-600">크루즈 상품을 등록하고 관리하세요</p>
						</div>
						<Link href="/admin/cruise/create">
							<Button className="bg-[#005BAC] hover:bg-[#004494] flex items-center space-x-2">
								<Plus className="w-4 h-4" />
								<span>상품 등록</span>
							</Button>
						</Link>
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
											placeholder="상품명, 설명으로 검색..."
											value={searchTerm}
											onChange={(e) => setSearchTerm(e.target.value)}
											className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none"
										/>
									</div>
								</div>

								{/* 카테고리 필터 */}
								<div className="flex items-center space-x-2">
									<Filter className="w-4 h-4 text-gray-500" />
									<select
										value={filterCategory}
										onChange={(e) => setFilterCategory(e.target.value)}
										className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none"
										aria-label="카테고리 필터"
									>
										<option value="all">모든 카테고리</option>
										{categories.map(category => (
											<option key={category} value={category}>{category}</option>
										))}
									</select>
								</div>

								{/* 상태 필터 */}
								<div>
																	<select
									value={filterStatus}
									onChange={(e) => setFilterStatus(e.target.value)}
									className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none"
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

					{/* 상품 목록 */}
					{loading ? (
						<div className="text-center py-12">
							<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#005BAC] mx-auto mb-4"></div>
							<p className="text-gray-600">상품 목록을 불러오는 중...</p>
						</div>
					) : filteredProducts.length > 0 ? (
						<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
							{filteredProducts.map((product) => (
								<Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
									<div className="relative">
										<img
											src={product.imageUrl}
											alt={product.name}
											className="w-full h-48 object-cover"
										/>
										<div className="absolute top-2 left-2 flex space-x-2">
											<Badge variant={product.isActive ? "default" : "secondary"}>
												{product.isActive ? "활성" : "비활성"}
											</Badge>
											{product.isFeatured && (
												<Badge className="bg-yellow-500">추천</Badge>
											)}
										</div>
										<div className="absolute top-2 right-2">
											<Button variant="ghost" size="sm" className="bg-white/80 hover:bg-white">
												<MoreHorizontal className="w-4 h-4" />
											</Button>
										</div>
									</div>

									<CardContent className="p-4">
										<div className="space-y-3">
											{/* 상품명 및 카테고리 */}
											<div>
												<h3 className="font-semibold text-lg text-gray-900 mb-1">
													{product.name}
												</h3>
												<p className="text-sm text-gray-500">{product.category}</p>
											</div>

											{/* 설명 */}
											<p className="text-sm text-gray-600 line-clamp-2">
												{product.shortDescription}
											</p>

											{/* 상품 정보 */}
											<div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
												<div className="flex items-center space-x-1">
													<Clock className="w-3 h-3" />
													<span>{product.duration}분</span>
												</div>
												<div className="flex items-center space-x-1">
													<Users className="w-3 h-3" />
													<span>최대 {product.maxCapacity}명</span>
												</div>
												<div className="flex items-center space-x-1">
													<Ship className="w-3 h-3" />
													<span>운항 {product.operatingTimes.length}회</span>
												</div>
												<div className="flex items-center space-x-1">
													<DollarSign className="w-3 h-3" />
													<span>예약 {product.reservationCount}건</span>
												</div>
											</div>

											{/* 가격 */}
											<div className="border-t pt-3">
												<div className="flex justify-between items-center">
													<div>
														<div className="text-sm text-gray-500">
															대인: 
															{product.adultSalePrice < product.adultRegularPrice && (
																<span className="line-through ml-1">
																	{formatPrice(product.adultRegularPrice)}원
																</span>
															)}
														</div>
														<div className="text-lg font-bold text-[#005BAC]">
															{formatPrice(product.adultSalePrice)}원
														</div>
													</div>
												</div>
											</div>

											{/* 액션 버튼 */}
											<div className="flex space-x-2 pt-2">
												<Link href={`/admin/cruise/${product.id}`} className="flex-1">
													<Button variant="outline" size="sm" className="w-full flex items-center justify-center space-x-1">
														<Eye className="w-3 h-3" />
														<span>보기</span>
													</Button>
												</Link>
												<Link href={`/admin/cruise/${product.id}/edit`} className="flex-1">
													<Button variant="outline" size="sm" className="w-full flex items-center justify-center space-x-1">
														<Edit className="w-3 h-3" />
														<span>수정</span>
													</Button>
												</Link>
												<Button
													variant="outline"
													size="sm"
													onClick={() => handleToggleStatus(product.id)}
													className={`flex-1 ${product.isActive ? 'text-red-600 hover:bg-red-50' : 'text-green-600 hover:bg-green-50'}`}
												>
													{product.isActive ? '비활성' : '활성'}
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
								<Ship className="w-16 h-16 text-gray-400 mx-auto mb-4" />
								<h3 className="text-xl font-semibold text-gray-900 mb-2">등록된 상품이 없습니다</h3>
								<p className="text-gray-600 mb-6">첫 번째 크루즈 상품을 등록해보세요.</p>
								<Link href="/admin/cruise/create">
									<Button className="bg-[#005BAC] hover:bg-[#004494]">
										상품 등록하기
									</Button>
								</Link>
							</CardContent>
						</Card>
					)}
				</div>
			</AdminLayout>
		</AdminAuthGuard>
	);
}
