"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, MapPin, Star, Heart, ShoppingCart } from "lucide-react";
import { useWishlist } from "@/hooks/useWishlist";
import Link from "next/link";

interface CruiseProduct {
	id: number;
	name: string;
	description: string;
	duration: string;
	schedule: string;
	adultPrice: number;
	childPrice: number;
	image: string;
	isPopular?: boolean;
	rating?: number;
	reviewCount?: number;
	tags?: string[];
}

const ProductCards = () => {
	const { toggleWishlist, isInWishlist } = useWishlist();
	const [showSuccessMessage, setShowSuccessMessage] = useState<number | null>(null);

	// 위시리스트 토글 핸들러
	const handleWishlistToggle = (product: CruiseProduct) => {
		const cruiseProduct = {
			id: product.id,
			name: product.name,
			description: product.description,
			duration: product.duration,
			schedule: product.schedule,
			adultPrice: product.adultPrice,
			childPrice: product.childPrice,
			image: product.image,
			isPopular: product.isPopular,
			rating: product.rating,
			reviewCount: product.reviewCount,
			tags: product.tags
		};

		const added = toggleWishlist(cruiseProduct);
		if (added) {
			setShowSuccessMessage(product.id);
			setTimeout(() => setShowSuccessMessage(null), 2000);
		}
	};

	// 임시 상품 데이터 - 실제로는 API에서 가져올 예정
	const products = [
		{
			id: 1,
			name: "불꽃 크루즈",
			description: "인천 하늘을 수놓는 화려한 불꽃놀이와 함께하는 낭만적인 밤바다 여행",
			duration: "2시간 30분",
			schedule: "매주 토요일 20:00",
			adultPrice: 35000,
			childPrice: 25000,
			image: "/images/fireworks-cruise.jpg",
			isPopular: true,
			rating: 4.8,
			reviewCount: 124,
			tags: ["야경", "불꽃놀이", "커플추천"]
		},
		{
			id: 2,
			name: "행복 크루즈 2회",
			description: "갈매기와 함께하는 즐거운 서해 바다 체험, 2시간 코스",
			duration: "2시간",
			schedule: "10:00, 14:00",
			adultPrice: 28000,
			childPrice: 20000,
			image: "/images/happy-cruise-2.jpg",
			isPopular: false,
			rating: 4.6,
			reviewCount: 89,
			tags: ["갈매기", "가족여행", "체험"]
		},
		{
			id: 3,
			name: "행복 크루즈 4회",
			description: "하루 4회 운항하는 정기 크루즈, 언제든 편리하게",
			duration: "1시간 30분",
			schedule: "10:00, 12:30, 15:00, 17:30",
			adultPrice: 25000,
			childPrice: 18000,
			image: "/images/happy-cruise-4.jpg",
			isPopular: true,
			rating: 4.5,
			reviewCount: 156,
			tags: ["정기운항", "편리함", "단체추천"]
		},
		{
			id: 4,
			name: "낙조 크루즈",
			description: "서해의 아름다운 석양과 함께하는 로맨틱한 크루즈",
			duration: "2시간",
			schedule: "일몰 1시간 전",
			adultPrice: 32000,
			childPrice: 23000,
			image: "/images/sunset-cruise.jpg",
			isPopular: true,
			rating: 4.9,
			reviewCount: 203,
			tags: ["석양", "로맨틱", "사진촬영"]
		},
		{
			id: 5,
			name: "패키지 여행 A",
			description: "월미도 관광지 + 크루즈 + 식사가 포함된 종합 패키지",
			duration: "6시간",
			schedule: "09:00 출발",
			adultPrice: 85000,
			childPrice: 65000,
			image: "/images/package-a.jpg",
			isPopular: false,
			rating: 4.7,
			reviewCount: 67,
			tags: ["종합패키지", "식사포함", "관광"]
		},
		{
			id: 6,
			name: "패키지 여행 B",
			description: "인천 섬 투어 + 크루즈 + 특별 체험이 포함된 프리미엄 패키지",
			duration: "8시간",
			schedule: "08:30 출발",
			adultPrice: 120000,
			childPrice: 95000,
			image: "/images/package-b.jpg",
			isPopular: false,
			rating: 4.8,
			reviewCount: 45,
			tags: ["프리미엄", "섬투어", "특별체험"]
		}
	];

	const formatPrice = (price: number) => {
		return price.toLocaleString('ko-KR');
	};

	return (
		<section className="py-16 bg-white">
			<div className="container mx-auto px-4">
				{/* 섹션 헤더 */}
				<div className="text-center mb-12">
					<h3 className="text-3xl font-bold text-gray-900 mb-4">유람선 상품</h3>
					<p className="text-lg text-gray-600 max-w-4xl mx-auto">
						월미도의 아름다운 바다를 만끽할 수 있는 다양한 크루즈 상품을 만나보세요
					</p>
				</div>

				{/* 상품 카드 그리드 */}
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
					{products.map((product) => (
						<Card 
							key={product.id} 
							className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
						>
							{/* 상품 이미지 */}
							<div className="relative h-48 bg-gradient-to-br from-blue-400 to-blue-600 overflow-hidden">
								{/* 임시 배경 이미지 대신 그라데이션 사용 */}
								<div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600" />
								
								{/* 인기 배지 */}
								{product.isPopular && (
									<Badge className="absolute top-3 left-3 bg-[#FF5722] text-white">
										인기
									</Badge>
								)}

								{/* 태그들 */}
								<div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
									{product.tags.slice(0, 2).map((tag, index) => (
										<Badge 
											key={index} 
											variant="secondary" 
											className="text-xs bg-white/90 text-gray-700"
										>
											{tag}
										</Badge>
									))}
								</div>

								{/* 호버 시 확대 효과 */}
								<div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
							</div>

							<CardHeader className="pb-3">
								<div className="flex items-start justify-between">
									<CardTitle className="text-xl font-bold text-gray-900 group-hover:text-[#005BAC] transition-colors">
										{product.name}
									</CardTitle>
									<div className="flex items-center text-yellow-500">
										<Star className="w-4 h-4 fill-current" />
										<span className="text-sm font-medium ml-1">{product.rating}</span>
										<span className="text-xs text-gray-500 ml-1">({product.reviewCount})</span>
									</div>
								</div>
								<p className="text-sm text-gray-600 line-clamp-2">
									{product.description}
								</p>
							</CardHeader>

							<CardContent className="pt-0">
								{/* 운항 정보 */}
								<div className="space-y-2 mb-4">
									<div className="flex items-center text-sm text-gray-600">
										<Clock className="w-4 h-4 mr-2" />
										<span>{product.duration}</span>
									</div>
									<div className="flex items-center text-sm text-gray-600">
										<MapPin className="w-4 h-4 mr-2" />
										<span>{product.schedule}</span>
									</div>
								</div>

								{/* 가격 정보 */}
								<div className="bg-slate-50 p-3 rounded-lg mb-4">
									<div className="flex justify-between items-center">
										<div>
											<div className="flex items-center">
												<Users className="w-4 h-4 mr-1 text-gray-500" />
												<span className="text-sm text-gray-600">성인</span>
											</div>
											<div className="text-lg font-bold text-[#005BAC]">
												{formatPrice(product.adultPrice)}원
											</div>
										</div>
										<div>
											<div className="flex items-center justify-end">
												<Users className="w-4 h-4 mr-1 text-gray-500" />
												<span className="text-sm text-gray-600">소인</span>
											</div>
											<div className="text-lg font-bold text-[#005BAC]">
												{formatPrice(product.childPrice)}원
											</div>
										</div>
									</div>
								</div>

								{/* 버튼 영역 */}
								<div className="space-y-2">
									{/* 위시리스트 & 장바구니 버튼 */}
									<div className="flex space-x-2">
										<Button 
											variant="outline"
											size="sm"
											onClick={() => handleWishlistToggle(product)}
											className={`flex-1 ${
												isInWishlist(product.id) 
													? 'border-red-500 text-red-500 bg-red-50' 
													: 'border-gray-300 text-gray-600 hover:border-red-500 hover:text-red-500'
											}`}
										>
											<Heart className={`w-4 h-4 mr-1 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
											{isInWishlist(product.id) ? '찜완료' : '찜하기'}
										</Button>
										<Button 
											variant="outline"
											size="sm"
											className="flex-1 border-[#005BAC] text-[#005BAC] hover:bg-[#005BAC] hover:text-white"
											asChild
										>
											<Link href={`/cruise/${product.id}?action=cart`}>
												<ShoppingCart className="w-4 h-4 mr-1" />
												담기
											</Link>
										</Button>
									</div>

									{/* 성공 메시지 */}
									{showSuccessMessage === product.id && (
										<div className="text-center text-sm text-green-600 bg-green-50 py-1 rounded">
											관심상품에 추가되었습니다!
										</div>
									)}

									{/* 메인 버튼 */}
									<Button 
										className="w-full bg-[#005BAC] hover:bg-[#004494] text-white"
										asChild
									>
										<Link href={`/cruise/${product.id}`}>
											자세히 보기
										</Link>
									</Button>
									<Button 
										variant="outline" 
										className="w-full border-[#FF5722] text-[#FF5722] hover:bg-[#FF5722] hover:text-white"
										asChild
									>
										<Link href={`/cruise/${product.id}?action=booking`}>
											예약하기
										</Link>
									</Button>
								</div>
							</CardContent>
						</Card>
					))}
				</div>

				{/* 더보기 버튼 */}
				<div className="text-center mt-12">
					<Button 
						size="lg" 
						variant="outline" 
						className="px-8 border-[#005BAC] text-[#005BAC] hover:bg-[#005BAC] hover:text-white"
						asChild
					>
						<Link href="/cruise/products">
							모든 상품 보기
						</Link>
					</Button>
				</div>
			</div>
		</section>
	);
};

export default ProductCards;
