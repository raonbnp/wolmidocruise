import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingQuickMenu from "@/components/FloatingQuickMenu";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Construction, ArrowLeft, Calendar, Award } from "lucide-react";
import Link from "next/link";

export default function CompanyHistoryPage() {
	return (
		<div className="min-h-screen">
			<Header />
			<main className="pt-[106px]"> {/* 헤더 높이만큼 상단 여백 */}
				<div className="w-full max-w-[1600px] mx-auto px-4 py-16">
					

					{/* 페이지 제목 */}
					<div className="text-center mb-12">
						<h1 className="text-4xl font-bold text-gray-900 mb-4">회사연혁</h1>
						<p className="text-xl text-gray-600">월미도 해양관광의 발자취</p>
					</div>

					{/* 준비중 메인 카드 */}
					<Card className="max-w-6xl mx-auto">
						<CardContent className="p-12 text-center">
							{/* 아이콘 */}
							<div className="mb-8">
								<Calendar className="w-24 h-24 text-[#005BAC] mx-auto mb-4" />
								<div className="w-16 h-1 bg-[#005BAC] mx-auto rounded-full"></div>
							</div>

							{/* 메인 메시지 */}
							<h2 className="text-3xl font-bold text-gray-900 mb-6">
								회사연혁 페이지 준비중입니다
							</h2>
							<p className="text-lg text-gray-600 mb-8 leading-relaxed">
								월미도 해양관광의 소중한 역사와 발전 과정을<br />
								더욱 체계적으로 정리하여 준비하고 있습니다.
							</p>

							{/* 임시 연혁 정보 */}
							<div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-8 mb-8">
								<h3 className="text-xl font-semibold text-[#005BAC] mb-6">주요 연혁 (예정)</h3>
								<div className="space-y-4 text-left">
									<div className="flex items-center space-x-4">
										<div className="w-4 h-4 bg-[#005BAC] rounded-full flex-shrink-0"></div>
										<div>
											<span className="font-semibold text-gray-900">설립 및 창업</span>
											<p className="text-gray-600 text-sm">월미도 해양관광 사업 시작</p>
										</div>
									</div>
									<div className="flex items-center space-x-4">
										<div className="w-4 h-4 bg-[#005BAC] rounded-full flex-shrink-0"></div>
										<div>
											<span className="font-semibold text-gray-900">사업 확장</span>
											<p className="text-gray-600 text-sm">다양한 크루즈 상품 개발</p>
										</div>
									</div>
									<div className="flex items-center space-x-4">
										<div className="w-4 h-4 bg-[#005BAC] rounded-full flex-shrink-0"></div>
										<div>
											<span className="font-semibold text-gray-900">품질 인증</span>
											<p className="text-gray-600 text-sm">안전 및 서비스 품질 인증 획득</p>
										</div>
									</div>
									<div className="flex items-center space-x-4">
										<div className="w-4 h-4 bg-[#FF5722] rounded-full flex-shrink-0"></div>
										<div>
											<span className="font-semibold text-gray-900">현재</span>
											<p className="text-gray-600 text-sm">인천 대표 해양관광 기업으로 성장</p>
										</div>
									</div>
								</div>
							</div>

							{/* 성과 하이라이트 */}
							<div className="grid md:grid-cols-3 gap-6 mb-8">
								<div className="text-center">
									<div className="w-16 h-16 bg-[#005BAC] rounded-full flex items-center justify-center mx-auto mb-3">
										<Award className="w-8 h-8 text-white" />
									</div>
									<h4 className="font-semibold text-gray-900">안전운항</h4>
									<p className="text-sm text-gray-600">무사고 운항 기록</p>
								</div>
								<div className="text-center">
									<div className="w-16 h-16 bg-[#03C75A] rounded-full flex items-center justify-center mx-auto mb-3">
										<span className="text-white font-bold text-xl">★</span>
									</div>
									<h4 className="font-semibold text-gray-900">고객만족</h4>
									<p className="text-sm text-gray-600">높은 고객 만족도</p>
								</div>
								<div className="text-center">
									<div className="w-16 h-16 bg-[#FF5722] rounded-full flex items-center justify-center mx-auto mb-3">
										<span className="text-white font-bold text-xl">🚢</span>
									</div>
									<h4 className="font-semibold text-gray-900">지역발전</h4>
									<p className="text-sm text-gray-600">월미도 관광 활성화</p>
								</div>
							</div>

							{/* 안내 메시지 */}
							<div className="flex items-center justify-center space-x-4 text-gray-500">
								<Construction className="w-5 h-5" />
								<span>상세한 연혁 정보는 곧 업데이트됩니다</span>
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
