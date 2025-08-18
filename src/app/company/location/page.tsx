import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingQuickMenu from "@/components/FloatingQuickMenu";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Construction, ArrowLeft, MapPin, Car, Train, Bus, Phone } from "lucide-react";
import Link from "next/link";

export default function CompanyLocationPage() {
	return (
		<div className="min-h-screen">
			<Header />
			<main className="pt-[106px]"> {/* 헤더 높이만큼 상단 여백 */}
				<div className="w-full max-w-[1600px] mx-auto px-4 py-16">
					

					{/* 페이지 제목 */}
					<div className="text-center mb-12">
						<h1 className="text-4xl font-bold text-gray-900 mb-4">오시는길</h1>
						<p className="text-xl text-gray-600">월미도 해양관광 찾아오는 방법</p>
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
								오시는길 페이지 준비중입니다
							</h2>
							<p className="text-lg text-gray-600 mb-8 leading-relaxed">
								더 정확하고 자세한 교통편 안내를 위해<br />
								지도 및 길찾기 서비스를 준비하고 있습니다.
							</p>

							{/* 임시 위치 정보 */}
							<div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-8 mb-8">
								<h3 className="text-xl font-semibold text-[#005BAC] mb-6">기본 정보</h3>
								<div className="grid md:grid-cols-2 gap-6 text-left">
									<div className="space-y-3">
										<div className="flex items-start space-x-3">
											<MapPin className="w-5 h-5 text-[#005BAC] mt-0.5 flex-shrink-0" />
											<div>
												<p className="font-semibold text-gray-900">주소</p>
												<p className="text-gray-600">인천광역시 중구 월미문화로 81</p>
											</div>
										</div>
										<div className="flex items-start space-x-3">
											<Phone className="w-5 h-5 text-[#005BAC] mt-0.5 flex-shrink-0" />
											<div>
												<p className="font-semibold text-gray-900">연락처</p>
												<p className="text-gray-600">032-123-4567</p>
											</div>
										</div>
									</div>
									<div className="space-y-3">
										<div>
											<p className="font-semibold text-gray-900 mb-2">운영시간</p>
											<p className="text-gray-600">09:00 ~ 18:00 (연중무휴)</p>
										</div>
										<div>
											<p className="font-semibold text-gray-900 mb-2">주차안내</p>
											<p className="text-gray-600">월미도 공영주차장 이용</p>
										</div>
									</div>
								</div>
							</div>

							{/* 교통편 안내 (예정) */}
							<div className="grid md:grid-cols-3 gap-6 mb-8">
								<div className="text-center p-4 border border-gray-200 rounded-lg">
									<div className="w-16 h-16 bg-[#005BAC] rounded-full flex items-center justify-center mx-auto mb-3">
										<Car className="w-8 h-8 text-white" />
									</div>
									<h4 className="font-semibold text-gray-900 mb-2">자가용</h4>
									<p className="text-sm text-gray-600">상세 길찾기 안내<br />준비중</p>
								</div>
								<div className="text-center p-4 border border-gray-200 rounded-lg">
									<div className="w-16 h-16 bg-[#03C75A] rounded-full flex items-center justify-center mx-auto mb-3">
										<Train className="w-8 h-8 text-white" />
									</div>
									<h4 className="font-semibold text-gray-900 mb-2">지하철</h4>
									<p className="text-sm text-gray-600">인천지하철 1호선<br />월미바다역 이용</p>
								</div>
								<div className="text-center p-4 border border-gray-200 rounded-lg">
									<div className="w-16 h-16 bg-[#FF5722] rounded-full flex items-center justify-center mx-auto mb-3">
										<Bus className="w-8 h-8 text-white" />
									</div>
									<h4 className="font-semibold text-gray-900 mb-2">버스</h4>
									<p className="text-sm text-gray-600">시내버스 노선<br />안내 준비중</p>
								</div>
							</div>

							{/* 지도 영역 (준비중) */}
							<div className="bg-gray-100 rounded-lg p-12 mb-8">
								<Construction className="w-16 h-16 text-gray-400 mx-auto mb-4" />
								<h4 className="text-xl font-semibold text-gray-700 mb-2">지도 서비스</h4>
								<p className="text-gray-500">인터랙티브 지도 및 길찾기 서비스를 준비하고 있습니다</p>
							</div>

							{/* 안내 메시지 */}
							<div className="flex items-center justify-center space-x-4 text-gray-500">
								<Construction className="w-5 h-5" />
								<span>상세한 교통편 안내는 곧 업데이트됩니다</span>
							</div>
						</CardContent>
					</Card>

					{/* 임시 연락처 카드 */}
					<div className="mt-12 max-w-4xl mx-auto">
						<Card className="bg-[#005BAC] text-white">
							<CardContent className="p-8 text-center">
								<h3 className="text-2xl font-bold mb-4">길찾기 문의</h3>
								<p className="mb-6">오시는 길이 궁금하시면 언제든지 연락주세요</p>
								<div className="flex items-center justify-center space-x-2">
									<Phone className="w-5 h-5" />
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
