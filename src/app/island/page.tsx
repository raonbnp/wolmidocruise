import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingQuickMenu from "@/components/FloatingQuickMenu";
import { Card, CardContent } from "@/components/ui/card";
import { Construction, Anchor, MapPin, Phone } from "lucide-react";

export default function IslandPage() {
	return (
		<div className="min-h-screen">
			<Header />
			<main className="pt-[106px]"> {/* 헤더 높이만큼 상단 여백 */}
				<div className="w-full max-w-[1600px] mx-auto px-4 py-16">
					{/* 페이지 제목 */}
					<div className="text-center mb-12">
						<h1 className="text-4xl font-bold text-gray-900 mb-4">인천섬여행상품</h1>
						<p className="text-xl text-gray-600">아름다운 인천의 섬들을 만나보세요</p>
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
								인천섬여행상품 준비중입니다
							</h2>
							<p className="text-lg text-gray-600 mb-8 leading-relaxed">
								인천의 아름다운 섬들과 관광지 정보를<br />
								더욱 풍부하고 상세하게 준비하고 있습니다.
							</p>

							{/* 임시 상품 정보 */}
							<div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-8 mb-8">
								<h3 className="text-xl font-semibold text-[#005BAC] mb-6">인천섬여행 (예정)</h3>
								<div className="grid md:grid-cols-2 gap-6 text-left">
									<div className="space-y-3">
										<div className="flex items-start space-x-3">
											<Anchor className="w-5 h-5 text-[#005BAC] mt-0.5 flex-shrink-0" />
											<div>
												<p className="font-semibold text-gray-900">다양한 섬 투어</p>
												<p className="text-gray-600">영종도, 용유도, 무의도 등</p>
											</div>
										</div>
										<div className="flex items-start space-x-3">
											<MapPin className="w-5 h-5 text-[#005BAC] mt-0.5 flex-shrink-0" />
											<div>
												<p className="font-semibold text-gray-900">월미도 관광지</p>
												<p className="text-gray-600">월미테마파크, 월미문화의거리</p>
											</div>
										</div>
									</div>
									<div className="space-y-3">
										<div className="flex items-start space-x-3">
											<Phone className="w-5 h-5 text-[#005BAC] mt-0.5 flex-shrink-0" />
											<div>
												<p className="font-semibold text-gray-900">맞춤 코스</p>
												<p className="text-gray-600">개인/단체별 맞춤 여행 코스</p>
											</div>
										</div>
										<div className="flex items-start space-x-3">
											<Construction className="w-5 h-5 text-[#005BAC] mt-0.5 flex-shrink-0" />
											<div>
												<p className="font-semibold text-gray-900">체험 프로그램</p>
												<p className="text-gray-600">해양 체험, 문화 체험 등</p>
											</div>
										</div>
									</div>
								</div>
							</div>

							{/* 안내 메시지 */}
							<div className="flex items-center justify-center space-x-4 text-gray-500">
								<Construction className="w-5 h-5" />
								<span>예상 완료 시기: 2024년 2월</span>
							</div>
						</CardContent>
					</Card>

					{/* 하위 메뉴 카드들 */}
					<div className="grid md:grid-cols-2 gap-8 mt-12 max-w-6xl mx-auto">
						{/* 인천섬 소개 */}
						<Card className="hover:shadow-lg transition-shadow">
							<CardContent className="p-8 text-center">
								<div className="w-16 h-16 bg-[#005BAC] rounded-full flex items-center justify-center mx-auto mb-4">
									<Anchor className="w-8 h-8 text-white" />
								</div>
								<h3 className="text-xl font-semibold text-gray-900 mb-3">인천섬 소개</h3>
								<p className="text-gray-600 mb-4">인천의 아름다운 섬들과 특색을 소개합니다.</p>
								<div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm inline-block">
									준비중
								</div>
							</CardContent>
						</Card>

						{/* 월미도 주변관광지 */}
						<Card className="hover:shadow-lg transition-shadow">
							<CardContent className="p-8 text-center">
								<div className="w-16 h-16 bg-[#005BAC] rounded-full flex items-center justify-center mx-auto mb-4">
									<MapPin className="w-8 h-8 text-white" />
								</div>
								<h3 className="text-xl font-semibold text-gray-900 mb-3">월미도 주변관광지</h3>
								<p className="text-gray-600 mb-4">월미도 주변의 다양한 관광명소를 안내합니다.</p>
								<div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm inline-block">
									준비중
								</div>
							</CardContent>
						</Card>
					</div>

					{/* 연락처 정보 */}
					<div className="mt-16 text-center">
						<Card className="max-w-4xl mx-auto bg-[#005BAC] text-white">
							<CardContent className="p-8">
								<h3 className="text-2xl font-bold mb-4">여행 상담 문의</h3>
								<p className="mb-6">인천섬여행에 대해 궁금한 사항이 있으시면 연락주세요</p>
								<div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8">
									<div className="flex items-center space-x-2">
										<Phone className="w-5 h-5" />
										<span className="text-lg font-semibold">032-123-4567</span>
									</div>
									<div className="text-sm opacity-90">
										상담시간: 09:00 ~ 18:00 (연중무휴)
									</div>
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
