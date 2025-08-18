import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingQuickMenu from "@/components/FloatingQuickMenu";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function CruisePage() {
	// 임시 상품 데이터 - 8개 상품
	const cruiseProducts = [
		{
			id: 1,
			name: "불꽃 크루즈",
			description: "화려한 불꽃놀이와 함께하는 낭만적인 밤바다 여행",
			adultRegularPrice: 40000,
			adultSalePrice: 35000,
			childRegularPrice: 30000,
			childSalePrice: 25000,
		},
		{
			id: 2,
			name: "낙조 크루즈",
			description: "서해의 아름다운 석양과 함께하는 로맨틱한 크루즈",
			adultRegularPrice: 38000,
			adultSalePrice: 32000,
			childRegularPrice: 28000,
			childSalePrice: 23000,
		},
		{
			id: 3,
			name: "행복 크루즈 2회",
			description: "갈매기와 함께하는 즐거운 서해 바다 체험",
			adultRegularPrice: 32000,
			adultSalePrice: 28000,
			childRegularPrice: 24000,
			childSalePrice: 20000,
		},
		{
			id: 4,
			name: "행복 크루즈 4회",
			description: "하루 4회 운항하는 정기 크루즈, 언제든 편리하게",
			adultRegularPrice: 30000,
			adultSalePrice: 25000,
			childRegularPrice: 22000,
			childSalePrice: 18000,
		},
		{
			id: 5,
			name: "패키지 여행 A",
			description: "월미도 관광지 + 크루즈 + 식사가 포함된 종합 패키지",
			adultRegularPrice: 95000,
			adultSalePrice: 85000,
			childRegularPrice: 75000,
			childSalePrice: 65000,
		},
		{
			id: 6,
			name: "패키지 여행 B",
			description: "인천 섬 투어 + 크루즈 + 특별 체험이 포함된 프리미엄 패키지",
			adultRegularPrice: 135000,
			adultSalePrice: 120000,
			childRegularPrice: 105000,
			childSalePrice: 95000,
		},
		{
			id: 7,
			name: "가족 크루즈",
			description: "온 가족이 함께 즐기는 특별한 바다 여행",
			adultRegularPrice: 35000,
			adultSalePrice: 30000,
			childRegularPrice: 25000,
			childSalePrice: 22000,
		},
		{
			id: 8,
			name: "프리미엄 크루즈",
			description: "최고급 시설과 서비스로 즐기는 럭셔리 크루즈",
			adultRegularPrice: 55000,
			adultSalePrice: 48000,
			childRegularPrice: 40000,
			childSalePrice: 35000,
		},
	];

	const formatPrice = (price: number) => {
		return price.toLocaleString('ko-KR');
	};

	return (
		<div className="min-h-screen">
			<Header />
			<main className="pt-[106px]"> {/* 헤더 높이만큼 상단 여백 */}
				<div className="w-full max-w-[1600px] mx-auto px-4 py-16">
					<div className="text-center mb-12">
						<h3 className="text-4xl font-bold text-gray-900 mb-4">유람선 상품 및 예약</h3>
						<p className="text-lg text-gray-600">
							월미도의 아름다운 바다를 만끽할 수 있는 다양한 크루즈 상품을 만나보세요
						</p>
					</div>
					
					{/* 상품 리스트 - 한 줄에 4개씩 */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						{cruiseProducts.map((product) => (
							<Link key={product.id} href={`/cruise/${product.id}`}>
								<Card className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105">
									{/* 상품 이미지 영역 */}
									<div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 relative">
										<div className="absolute inset-0 bg-black/20 flex items-center justify-center">
											<span className="text-white text-sm">이미지 영역</span>
										</div>
									</div>
									
									<CardContent className="p-4">
										{/* 짧은 설명 */}
										<p className="text-sm text-gray-600 mb-3 line-clamp-2">
											{product.description}
										</p>
										
										{/* 상품명 */}
										<h4 className="text-lg font-bold text-gray-900 mb-4">
											{product.name}
										</h4>
										
										{/* 가격 정보 */}
										<div className="space-y-2">
											{/* 대인 가격 */}
											<div className="flex justify-between items-center">
												<span className="text-sm font-medium text-gray-700">대인</span>
												<div className="text-right">
													<span className="text-xs text-gray-400 line-through mr-2">
														{formatPrice(product.adultRegularPrice)}원
													</span>
													<span className="text-sm font-bold text-[#005BAC]">
														{formatPrice(product.adultSalePrice)}원
													</span>
												</div>
											</div>
											
											{/* 소인 가격 */}
											<div className="flex justify-between items-center">
												<span className="text-sm font-medium text-gray-700">소인</span>
												<div className="text-right">
													<span className="text-xs text-gray-400 line-through mr-2">
														{formatPrice(product.childRegularPrice)}원
													</span>
													<span className="text-sm font-bold text-[#005BAC]">
														{formatPrice(product.childSalePrice)}원
													</span>
												</div>
											</div>
										</div>
									</CardContent>
								</Card>
							</Link>
						))}
					</div>
				</div>
			</main>
			<Footer />
			<FloatingQuickMenu />
		</div>
	);
}
