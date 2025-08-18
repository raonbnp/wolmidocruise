import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingQuickMenu from "@/components/FloatingQuickMenu";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Construction, ArrowLeft, Anchor, Waves, Mountain, Camera } from "lucide-react";
import Link from "next/link";

export default function IslandIntroductionPage() {
	return (
		<div className="min-h-screen">
			<Header />
			<main className="pt-[106px]"> {/* 헤더 높이만큼 상단 여백 */}
				<div className="w-full max-w-[1600px] mx-auto px-4 py-16">
					

					{/* 페이지 제목 */}
					<div className="text-center mb-12">
						<h1 className="text-4xl font-bold text-gray-900 mb-4">인천섬 소개</h1>
						<p className="text-xl text-gray-600">서해의 아름다운 보석, 인천의 섬들</p>
					</div>

					{/* 준비중 메인 카드 */}
					<Card className="max-w-6xl mx-auto">
						<CardContent className="p-12 text-center">
							{/* 아이콘 */}
							<div className="mb-8">
								<Anchor className="w-24 h-24 text-[#005BAC] mx-auto mb-4" />
								<div className="w-16 h-1 bg-[#005BAC] mx-auto rounded-full"></div>
							</div>

							{/* 메인 메시지 */}
							<h2 className="text-3xl font-bold text-gray-900 mb-6">
								인천섬 소개 페이지 준비중입니다
							</h2>
							<p className="text-lg text-gray-600 mb-8 leading-relaxed">
								인천의 아름다운 섬들에 대한 상세한 정보와<br />
								매력적인 콘텐츠를 준비하고 있습니다.
							</p>

							{/* 임시 섬 정보 */}
							<div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-8 mb-8">
								<h3 className="text-xl font-semibold text-[#005BAC] mb-6">인천의 주요 섬들 (예정)</h3>
								<div className="grid md:grid-cols-2 gap-6 text-left">
									<div className="space-y-4">
										<div className="flex items-start space-x-3">
											<div className="w-4 h-4 bg-[#005BAC] rounded-full flex-shrink-0 mt-1"></div>
											<div>
												<span className="font-semibold text-gray-900">영종도</span>
												<p className="text-gray-600 text-sm">인천국제공항이 위치한 대표적인 섬</p>
											</div>
										</div>
										<div className="flex items-start space-x-3">
											<div className="w-4 h-4 bg-[#005BAC] rounded-full flex-shrink-0 mt-1"></div>
											<div>
												<span className="font-semibold text-gray-900">용유도</span>
												<p className="text-gray-600 text-sm">을왕리해수욕장으로 유명한 관광지</p>
											</div>
										</div>
										<div className="flex items-start space-x-3">
											<div className="w-4 h-4 bg-[#005BAC] rounded-full flex-shrink-0 mt-1"></div>
											<div>
												<span className="font-semibold text-gray-900">무의도</span>
												<p className="text-gray-600 text-sm">한나절 여행으로 인기 있는 섬</p>
											</div>
										</div>
									</div>
									<div className="space-y-4">
										<div className="flex items-start space-x-3">
											<div className="w-4 h-4 bg-[#005BAC] rounded-full flex-shrink-0 mt-1"></div>
											<div>
												<span className="font-semibold text-gray-900">강화도</span>
												<p className="text-gray-600 text-sm">역사와 문화가 살아있는 섬</p>
											</div>
										</div>
										<div className="flex items-start space-x-3">
											<div className="w-4 h-4 bg-[#005BAC] rounded-full flex-shrink-0 mt-1"></div>
											<div>
												<span className="font-semibold text-gray-900">월미도</span>
												<p className="text-gray-600 text-sm">인천의 대표 관광명소</p>
											</div>
										</div>
										<div className="flex items-start space-x-3">
											<div className="w-4 h-4 bg-[#FF5722] rounded-full flex-shrink-0 mt-1"></div>
											<div>
												<span className="font-semibold text-gray-900">기타 섬들</span>
												<p className="text-gray-600 text-sm">덕적도, 자월도, 승봉도 등</p>
											</div>
										</div>
									</div>
								</div>
							</div>

							{/* 섬 특징 하이라이트 */}
							<div className="grid md:grid-cols-4 gap-6 mb-8">
								<div className="text-center">
									<div className="w-16 h-16 bg-[#005BAC] rounded-full flex items-center justify-center mx-auto mb-3">
										<Waves className="w-8 h-8 text-white" />
									</div>
									<h4 className="font-semibold text-gray-900">해수욕장</h4>
									<p className="text-sm text-gray-600">깨끗한 바다와 백사장</p>
								</div>
								<div className="text-center">
									<div className="w-16 h-16 bg-[#03C75A] rounded-full flex items-center justify-center mx-auto mb-3">
										<Mountain className="w-8 h-8 text-white" />
									</div>
									<h4 className="font-semibold text-gray-900">자연경관</h4>
									<p className="text-sm text-gray-600">아름다운 자연 풍경</p>
								</div>
								<div className="text-center">
									<div className="w-16 h-16 bg-[#FF5722] rounded-full flex items-center justify-center mx-auto mb-3">
										<Camera className="w-8 h-8 text-white" />
									</div>
									<h4 className="font-semibold text-gray-900">포토스팟</h4>
									<p className="text-sm text-gray-600">인생샷 명소</p>
								</div>
								<div className="text-center">
									<div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
										<span className="text-white font-bold text-xl">🍽️</span>
									</div>
									<h4 className="font-semibold text-gray-900">맛집</h4>
									<p className="text-sm text-gray-600">신선한 해산물</p>
								</div>
							</div>

							{/* 안내 메시지 */}
							<div className="flex items-center justify-center space-x-4 text-gray-500">
								<Construction className="w-5 h-5" />
								<span>상세한 섬 정보는 곧 업데이트됩니다</span>
							</div>
						</CardContent>
					</Card>
				</div>
			</main>
			<Footer />
			<FloatingQuickMenu />
		</div>
	);
}
