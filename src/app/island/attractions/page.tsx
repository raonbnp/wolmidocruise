import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingQuickMenu from "@/components/FloatingQuickMenu";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Construction, ArrowLeft, MapPin, Camera, Utensils, ShoppingBag, FerrisWheel } from "lucide-react";
import Link from "next/link";

export default function AttractionsPage() {
	return (
		<div className="min-h-screen">
			<Header />
			<main className="pt-[106px]"> {/* 헤더 높이만큼 상단 여백 */}
				<div className="w-full max-w-[1600px] mx-auto px-4 py-16">
					

					{/* 페이지 제목 */}
					<div className="text-center mb-12">
						<h1 className="text-4xl font-bold text-gray-900 mb-4">월미도 주변관광지</h1>
						<p className="text-xl text-gray-600">월미도와 주변의 매력적인 관광명소</p>
					</div>

					{/* 준비중 메인 카드 */}
					<Card className="max-w-6xl mx-auto">
						<CardContent className="p-12 text-center">
							{/* 아이콘 */}
							<div className="mb-8">
								<MapPin className="w-24 h-24 text-[#005BAC] mx-auto mb-4" />
								<div className="w-16 h-1 bg-[#005BAC] mx-auto rounded-full"></div>
							</div>

							{/* 메인 메시지 */}
							<h2 className="text-3xl font-bold text-gray-900 mb-6">
								월미도 주변관광지 페이지 준비중입니다
							</h2>
							<p className="text-lg text-gray-600 mb-8 leading-relaxed">
								월미도와 주변 지역의 다양한 관광명소와<br />
								즐길거리 정보를 상세하게 준비하고 있습니다.
							</p>

							{/* 임시 관광지 정보 */}
							<div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-8 mb-8">
								<h3 className="text-xl font-semibold text-[#005BAC] mb-6">주요 관광명소 (예정)</h3>
								<div className="grid md:grid-cols-2 gap-6 text-left">
									<div className="space-y-4">
										<div className="flex items-start space-x-3">
											<FerrisWheel className="w-5 h-5 text-[#005BAC] mt-0.5 flex-shrink-0" />
											<div>
												<p className="font-semibold text-gray-900">월미테마파크</p>
												<p className="text-gray-600 text-sm">다양한 놀이기구와 어트랙션</p>
											</div>
										</div>
										<div className="flex items-start space-x-3">
											<ShoppingBag className="w-5 h-5 text-[#005BAC] mt-0.5 flex-shrink-0" />
											<div>
												<p className="font-semibold text-gray-900">월미문화의거리</p>
												<p className="text-gray-600 text-sm">쇼핑과 문화를 즐길 수 있는 거리</p>
											</div>
										</div>
										<div className="flex items-start space-x-3">
											<Camera className="w-5 h-5 text-[#005BAC] mt-0.5 flex-shrink-0" />
											<div>
												<p className="font-semibold text-gray-900">월미공원</p>
												<p className="text-gray-600 text-sm">산책과 휴식을 위한 공원</p>
											</div>
										</div>
									</div>
									<div className="space-y-4">
										<div className="flex items-start space-x-3">
											<Utensils className="w-5 h-5 text-[#005BAC] mt-0.5 flex-shrink-0" />
											<div>
												<p className="font-semibold text-gray-900">월미도 맛집거리</p>
												<p className="text-gray-600 text-sm">신선한 해산물과 특색 음식</p>
											</div>
										</div>
										<div className="flex items-start space-x-3">
											<MapPin className="w-5 h-5 text-[#005BAC] mt-0.5 flex-shrink-0" />
											<div>
												<p className="font-semibold text-gray-900">인천대교 전망대</p>
												<p className="text-gray-600 text-sm">인천대교와 서해바다 조망</p>
											</div>
										</div>
										<div className="flex items-start space-x-3">
											<Construction className="w-5 h-5 text-[#005BAC] mt-0.5 flex-shrink-0" />
											<div>
												<p className="font-semibold text-gray-900">차이나타운</p>
												<p className="text-gray-600 text-sm">이국적인 문화와 맛의 거리</p>
											</div>
										</div>
									</div>
								</div>
							</div>

							{/* 관광지 카테고리 */}
							<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
								<div className="text-center p-4 border border-gray-200 rounded-lg">
									<div className="w-16 h-16 bg-[#005BAC] rounded-full flex items-center justify-center mx-auto mb-3">
										<FerrisWheel className="w-8 h-8 text-white" />
									</div>
									<h4 className="font-semibold text-gray-900 mb-2">놀이시설</h4>
									<p className="text-sm text-gray-600">테마파크, 놀이기구</p>
								</div>
								<div className="text-center p-4 border border-gray-200 rounded-lg">
									<div className="w-16 h-16 bg-[#03C75A] rounded-full flex items-center justify-center mx-auto mb-3">
										<Utensils className="w-8 h-8 text-white" />
									</div>
									<h4 className="font-semibold text-gray-900 mb-2">맛집</h4>
									<p className="text-sm text-gray-600">해산물, 특색 음식</p>
								</div>
								<div className="text-center p-4 border border-gray-200 rounded-lg">
									<div className="w-16 h-16 bg-[#FF5722] rounded-full flex items-center justify-center mx-auto mb-3">
										<ShoppingBag className="w-8 h-8 text-white" />
									</div>
									<h4 className="font-semibold text-gray-900 mb-2">쇼핑</h4>
									<p className="text-sm text-gray-600">기념품, 특산품</p>
								</div>
								<div className="text-center p-4 border border-gray-200 rounded-lg">
									<div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
										<Camera className="w-8 h-8 text-white" />
									</div>
									<h4 className="font-semibold text-gray-900 mb-2">포토존</h4>
									<p className="text-sm text-gray-600">인생샷 명소</p>
								</div>
							</div>

							{/* 코스 추천 (예정) */}
							<div className="bg-white border-2 border-gray-200 rounded-lg p-6 mb-8">
								<h4 className="text-lg font-semibold text-gray-900 mb-4">추천 관광코스 (예정)</h4>
								<div className="grid md:grid-cols-3 gap-4 text-sm">
									<div className="text-center p-3 bg-blue-50 rounded-lg">
										<h5 className="font-semibold text-[#005BAC] mb-2">반나절 코스</h5>
										<p className="text-gray-600">월미테마파크 → 크루즈 → 맛집</p>
									</div>
									<div className="text-center p-3 bg-green-50 rounded-lg">
										<h5 className="font-semibold text-[#03C75A] mb-2">하루 코스</h5>
										<p className="text-gray-600">월미도 → 차이나타운 → 인천대교</p>
									</div>
									<div className="text-center p-3 bg-orange-50 rounded-lg">
										<h5 className="font-semibold text-[#FF5722] mb-2">1박2일 코스</h5>
										<p className="text-gray-600">월미도 → 영종도 → 강화도</p>
									</div>
								</div>
							</div>

							{/* 안내 메시지 */}
							<div className="flex items-center justify-center space-x-4 text-gray-500">
								<Construction className="w-5 h-5" />
								<span>상세한 관광지 정보는 곧 업데이트됩니다</span>
							</div>
						</CardContent>
					</Card>

					{/* 교통편 안내 카드 */}
					<div className="mt-12 max-w-4xl mx-auto">
						<Card className="bg-[#005BAC] text-white">
							<CardContent className="p-8 text-center">
								<h3 className="text-2xl font-bold mb-4">관광지 문의</h3>
								<p className="mb-6">월미도 주변 관광지에 대해 궁금한 사항이 있으시면 연락주세요</p>
								<div className="flex items-center justify-center space-x-2">
									<MapPin className="w-5 h-5" />
									<span className="text-xl font-semibold">032-123-4567</span>
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
