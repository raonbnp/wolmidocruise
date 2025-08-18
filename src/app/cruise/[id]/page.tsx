import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingQuickMenu from "@/components/FloatingQuickMenu";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import BookingForm from "@/components/BookingForm";

interface CruiseDetailPageProps {
	params: Promise<{
		id: string;
	}>;
}

export default async function CruiseDetailPage({ params }: CruiseDetailPageProps) {
	const { id } = await params;
	
	// 임시 상품 데이터 - 실제로는 API에서 가져올 예정
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

	// 현재 상품 찾기
	const currentProduct = cruiseProducts.find(product => product.id === parseInt(id));

	// 상품이 없는 경우 404 처리 (추후 구현)
	if (!currentProduct) {
		return (
			<div className="min-h-screen">
				<Header />
				<main className="pt-[106px]">
					<div className="container mx-auto px-4 py-16 text-center">
						<h3 className="text-2xl font-bold text-gray-900 mb-4">상품을 찾을 수 없습니다</h3>
						<Link href="/cruise">
							<Button>목록으로 돌아가기</Button>
						</Link>
					</div>
				</main>
				<Footer />
				<FloatingQuickMenu />
			</div>
		);
	}

	const formatPrice = (price: number) => {
		return price.toLocaleString('ko-KR');
	};

	return (
		<div className="min-h-screen">
			<Header />
			<main className="pt-[106px]"> {/* 헤더 높이만큼 상단 여백 */}
				<div className="w-full max-w-[1600px] mx-auto px-4 py-16">


					{/* 상품 상세 정보 */}
					<div className="grid lg:grid-cols-2 gap-12">
						{/* 왼쪽: 상품 이미지 및 기본 정보 */}
						<div>
							{/* 상품 이미지 */}
							<div className="h-[600px] bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg mb-6 relative">
								<div className="absolute inset-0 bg-black/20 flex items-center justify-center rounded-lg">
									<span className="text-white text-lg">상품 이미지 영역</span>
								</div>
							</div>

							{/* 상품 기본 정보 */}
							<Card>
								<CardContent className="p-6">
									<h3 className="text-3xl font-bold text-gray-900 mb-4">{currentProduct.name}</h3>
									<p className="text-lg text-gray-600 mb-6">{currentProduct.description}</p>
									
									{/* 가격 정보 */}
									<div className="space-y-4">
																			<div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
										<span className="text-lg font-medium text-gray-700">대인</span>
										<div className="text-right">
											<span className="text-sm text-gray-400 line-through mr-3">
												{formatPrice(currentProduct.adultRegularPrice)}원
											</span>
											<span className="text-2xl font-bold text-[#005BAC]">
												{formatPrice(currentProduct.adultSalePrice)}원
											</span>
										</div>
									</div>
									
									<div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
										<span className="text-lg font-medium text-gray-700">소인</span>
										<div className="text-right">
											<span className="text-sm text-gray-400 line-through mr-3">
												{formatPrice(currentProduct.childRegularPrice)}원
											</span>
											<span className="text-2xl font-bold text-[#005BAC]">
												{formatPrice(currentProduct.childSalePrice)}원
											</span>
										</div>
									</div>
									</div>
								</CardContent>
							</Card>
						</div>

						{/* 오른쪽: 예약 섹션 */}
						<div>
							<Card className="h-fit">
								<CardContent className="p-6">
									<h4 className="text-2xl font-bold text-gray-900 mb-6">예약하기</h4>
									
									<BookingForm product={currentProduct} />
								</CardContent>
							</Card>
						</div>
					</div>

					{/* 이용 안내 영역 - 전체 너비 */}
					<div className="mt-16">
						<Card>
							<CardContent className="p-6">
								<h4 className="text-2xl font-bold text-gray-900 mb-6">이용 안내</h4>
								<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
									<div className="space-y-3">
										<h5 className="text-lg font-semibold text-[#005BAC]">승선 안내</h5>
										<div className="space-y-2 text-sm text-gray-600">
											<p>• 출항 30분 전까지 매표소에서 승선권을 수령해 주세요</p>
											<p>• 신분증을 지참해 주세요</p>
											<p>• 애완동물 동반은 불가합니다</p>
										</div>
									</div>
									<div className="space-y-3">
										<h5 className="text-lg font-semibold text-[#005BAC]">운항 안내</h5>
										<div className="space-y-2 text-sm text-gray-600">
											<p>• 날씨에 따라 운항이 취소될 수 있습니다</p>
											<p>• 안전을 위해 음주 후 승선은 제한됩니다</p>
											<p>• 구명조끼 착용이 의무입니다</p>
										</div>
									</div>
									<div className="space-y-3">
										<h5 className="text-lg font-semibold text-[#005BAC]">예약 및 환불</h5>
										<div className="space-y-2 text-sm text-gray-600">
											<p>• 환불 및 변경은 출항 24시간 전까지 가능합니다</p>
											<p>• 당일 취소 시 환불이 불가합니다</p>
											<p>• 문의: 032-123-4567</p>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>

					{/* 상세 설명 영역 - 추후 확장 */}
					<div className="mt-16">
						<Card>
							<CardContent className="p-6">
								<h4 className="text-2xl font-bold text-gray-900 mb-6">상품 상세 정보</h4>
								<div className="text-center text-gray-500 py-12">
									상세 정보 컨텐츠 영역 (추후 구현)
								</div>
							</CardContent>
						</Card>
					</div>

					{/* 관련상품 영역 */}
					<div className="mt-16">
						<Card>
							<CardContent className="p-6">
								<h4 className="text-2xl font-bold text-gray-900 mb-6">관련상품</h4>
								<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
									{/* 관련상품 카드 1 */}
									<div className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
										<div className="h-48 bg-gradient-to-br from-blue-300 to-blue-500 rounded-lg mb-4 relative">
											<div className="absolute inset-0 bg-black/20 flex items-center justify-center rounded-lg">
												<span className="text-white text-sm">관련상품 이미지</span>
											</div>
										</div>
										<h5 className="font-semibold text-gray-900 mb-2">행복 크루즈</h5>
										<p className="text-sm text-gray-600 mb-3">갈매기와 함께하는 해상여행</p>
										<div className="flex justify-between items-center">
											<div>
												<span className="text-sm text-gray-400 line-through">35,000원</span>
												<span className="text-lg font-bold text-[#005BAC] ml-2">30,000원</span>
											</div>
										</div>
									</div>

									{/* 관련상품 카드 2 */}
									<div className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
										<div className="h-48 bg-gradient-to-br from-orange-300 to-orange-500 rounded-lg mb-4 relative">
											<div className="absolute inset-0 bg-black/20 flex items-center justify-center rounded-lg">
												<span className="text-white text-sm">관련상품 이미지</span>
											</div>
										</div>
										<h5 className="font-semibold text-gray-900 mb-2">낙조 크루즈</h5>
										<p className="text-sm text-gray-600 mb-3">서해 낙조의 절정을 감상</p>
										<div className="flex justify-between items-center">
											<div>
												<span className="text-sm text-gray-400 line-through">45,000원</span>
												<span className="text-lg font-bold text-[#005BAC] ml-2">40,000원</span>
											</div>
										</div>
									</div>

									{/* 관련상품 카드 3 */}
									<div className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
										<div className="h-48 bg-gradient-to-br from-purple-300 to-purple-500 rounded-lg mb-4 relative">
											<div className="absolute inset-0 bg-black/20 flex items-center justify-center rounded-lg">
												<span className="text-white text-sm">관련상품 이미지</span>
											</div>
										</div>
										<h5 className="font-semibold text-gray-900 mb-2">패키지 여행</h5>
										<p className="text-sm text-gray-600 mb-3">인천섬 투어 + 크루즈</p>
										<div className="flex justify-between items-center">
											<div>
												<span className="text-sm text-gray-400 line-through">80,000원</span>
												<span className="text-lg font-bold text-[#005BAC] ml-2">70,000원</span>
											</div>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>

					{/* 상품리뷰 영역 */}
					<div className="mt-16">
						<Card>
							<CardContent className="p-6">
								<div className="flex justify-between items-center mb-6">
									<h4 className="text-2xl font-bold text-gray-900">상품리뷰</h4>
									<Button variant="outline" className="text-[#005BAC] border-[#005BAC]">
										리뷰 작성하기
									</Button>
								</div>

								{/* 리뷰 통계 */}
								<div className="bg-gray-50 rounded-lg p-4 mb-6">
									<div className="flex items-center space-x-4">
										<div className="text-center">
											<div className="text-3xl font-bold text-[#005BAC]">4.8</div>
											<div className="text-sm text-gray-500">평균 평점</div>
										</div>
										<div className="flex-1">
											<div className="flex items-center space-x-2 mb-1">
												<span className="text-sm">★★★★★</span>
												<div className="flex-1 bg-gray-200 rounded-full h-2">
													<div className="bg-[#005BAC] h-2 rounded-full w-4/5"></div>
												</div>
												<span className="text-sm text-gray-500">24</span>
											</div>
											<div className="flex items-center space-x-2 mb-1">
												<span className="text-sm">★★★★☆</span>
												<div className="flex-1 bg-gray-200 rounded-full h-2">
													<div className="bg-[#005BAC] h-2 rounded-full w-[15%]"></div>
												</div>
												<span className="text-sm text-gray-500">4</span>
											</div>
											<div className="flex items-center space-x-2">
												<span className="text-sm">★★★☆☆</span>
												<div className="flex-1 bg-gray-200 rounded-full h-2">
													<div className="bg-[#005BAC] h-2 rounded-full w-[5%]"></div>
												</div>
												<span className="text-sm text-gray-500">1</span>
											</div>
										</div>
									</div>
								</div>

								{/* 리뷰 목록 */}
								<div className="space-y-6">
									{/* 리뷰 1 */}
									<div className="border-b border-gray-200 pb-6">
										<div className="flex justify-between items-start mb-3">
											<div>
												<div className="flex items-center space-x-2 mb-1">
													<span className="font-semibold">김○○</span>
													<span className="text-yellow-500">★★★★★</span>
												</div>
												<div className="text-sm text-gray-500">2024.01.15</div>
											</div>
										</div>
										<p className="text-gray-700">정말 멋진 경험이었습니다! 불꽃놀이와 야경이 환상적이었고, 직원분들도 친절하셨어요. 다음에 또 이용하고 싶습니다.</p>
									</div>

									{/* 리뷰 2 */}
									<div className="border-b border-gray-200 pb-6">
										<div className="flex justify-between items-start mb-3">
											<div>
												<div className="flex items-center space-x-2 mb-1">
													<span className="font-semibold">박○○</span>
													<span className="text-yellow-500">★★★★★</span>
												</div>
												<div className="text-sm text-gray-500">2024.01.10</div>
											</div>
										</div>
										<p className="text-gray-700">가족과 함께 즐거운 시간을 보냈습니다. 아이들이 갈매기 먹이주기를 너무 좋아했어요!</p>
									</div>

									{/* 리뷰 3 */}
									<div className="pb-6">
										<div className="flex justify-between items-start mb-3">
											<div>
												<div className="flex items-center space-x-2 mb-1">
													<span className="font-semibold">이○○</span>
													<span className="text-yellow-500">★★★★☆</span>
												</div>
												<div className="text-sm text-gray-500">2024.01.05</div>
											</div>
										</div>
										<p className="text-gray-700">전체적으로 만족스러웠습니다. 다만 바람이 조금 강해서 추우셨지만, 경치는 정말 좋았어요.</p>
									</div>
								</div>

								<div className="text-center mt-6">
									<Button variant="outline">더 많은 리뷰 보기</Button>
								</div>
							</CardContent>
						</Card>
					</div>

					{/* 상품문의 영역 */}
					<div className="mt-16">
						<Card>
							<CardContent className="p-6">
								<div className="flex justify-between items-center mb-6">
									<h4 className="text-2xl font-bold text-gray-900">상품문의</h4>
									<Button variant="outline" className="text-[#005BAC] border-[#005BAC]">
										문의하기
									</Button>
								</div>

								{/* 문의 목록 */}
								<div className="space-y-4">
									{/* 문의 1 */}
									<div className="border border-gray-200 rounded-lg p-4">
										<div className="flex justify-between items-start mb-2">
											<div className="flex items-center space-x-2">
												<span className="bg-[#005BAC] text-white px-2 py-1 rounded text-xs">답변완료</span>
												<span className="font-semibold">예약 관련 문의</span>
											</div>
											<span className="text-sm text-gray-500">2024.01.20</span>
										</div>
										<p className="text-gray-700 mb-3">당일 예약도 가능한가요? 그리고 우천시에는 어떻게 되나요?</p>
										<div className="bg-blue-50 border-l-4 border-[#005BAC] p-3">
											<p className="text-sm text-gray-700">
												<strong>답변:</strong> 당일 예약은 좌석이 있는 경우 가능하며, 우천시에는 안전상 운항이 취소될 수 있습니다. 취소 시 전액 환불해드립니다.
											</p>
										</div>
									</div>

									{/* 문의 2 */}
									<div className="border border-gray-200 rounded-lg p-4">
										<div className="flex justify-between items-start mb-2">
											<div className="flex items-center space-x-2">
												<span className="bg-orange-500 text-white px-2 py-1 rounded text-xs">답변대기</span>
												<span className="font-semibold">단체 예약 할인</span>
											</div>
											<span className="text-sm text-gray-500">2024.01.18</span>
										</div>
										<p className="text-gray-700">20명 단체로 예약하려고 하는데 할인이 있나요?</p>
									</div>

									{/* 문의 3 */}
									<div className="border border-gray-200 rounded-lg p-4">
										<div className="flex justify-between items-start mb-2">
											<div className="flex items-center space-x-2">
												<span className="bg-[#005BAC] text-white px-2 py-1 rounded text-xs">답변완료</span>
												<span className="font-semibold">주차장 이용</span>
											</div>
											<span className="text-sm text-gray-500">2024.01.15</span>
										</div>
										<p className="text-gray-700 mb-3">주차장이 있나요? 주차비는 얼마인가요?</p>
										<div className="bg-blue-50 border-l-4 border-[#005BAC] p-3">
											<p className="text-sm text-gray-700">
												<strong>답변:</strong> 월미도 공영주차장을 이용하시면 됩니다. 주차비는 시간당 1,000원입니다.
											</p>
										</div>
									</div>
								</div>

								<div className="text-center mt-6">
									<Button variant="outline">더 많은 문의 보기</Button>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</main>
			<Footer />
			<FloatingQuickMenu />
		</div>
	);
}
