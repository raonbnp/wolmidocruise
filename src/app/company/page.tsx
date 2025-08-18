import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingQuickMenu from "@/components/FloatingQuickMenu";
import { Card, CardContent } from "@/components/ui/card";
import { Construction, Clock, Phone } from "lucide-react";

export default function CompanyPage() {
	return (
		<div className="min-h-screen">
			<Header />
			<main className="pt-[106px]"> {/* 헤더 높이만큼 상단 여백 */}
				<div className="w-full max-w-[1600px] mx-auto px-4 py-16">
					{/* 페이지 제목 */}
					<div className="text-center mb-12">
						<h1 className="text-4xl font-bold text-gray-900 mb-4">회사소개</h1>
						<p className="text-xl text-gray-600">월미도 해양관광에 대해 알아보세요</p>
					</div>

					{/* 준비중 메인 카드 */}
					<Card className="max-w-6xl mx-auto">
						<CardContent className="p-12 text-center">
							{/* 아이콘 */}
							<div className="mb-8">
								<Construction className="w-24 h-24 text-[#005BAC] mx-auto mb-4" />
								<div className="w-16 h-1 bg-[#005BAC] mx-auto rounded-full"></div>
							</div>

							{/* 메인 메시지 */}
							<h2 className="text-3xl font-bold text-gray-900 mb-6">
								페이지 준비중입니다
							</h2>
							<p className="text-lg text-gray-600 mb-8 leading-relaxed">
								더 나은 서비스를 위해 회사소개 페이지를 준비하고 있습니다.<br />
								빠른 시일 내에 새로운 모습으로 찾아뵙겠습니다.
							</p>

							{/* 임시 회사 정보 */}
							<div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-8 mb-8">
								<h3 className="text-xl font-semibold text-[#005BAC] mb-4">월미도 해양관광 (주)</h3>
								<div className="grid md:grid-cols-2 gap-4 text-left">
									<div className="space-y-2">
										<p className="text-gray-700"><strong>주소:</strong> 인천광역시 중구 월미문화로 81</p>
										<p className="text-gray-700"><strong>사업자등록번호:</strong> 123-45-67890</p>
									</div>
									<div className="space-y-2">
										<p className="text-gray-700"><strong>대표전화:</strong> 032-123-4567</p>
										<p className="text-gray-700"><strong>이메일:</strong> info@wolmido-cruise.co.kr</p>
									</div>
								</div>
							</div>

							{/* 안내 메시지 */}
							<div className="flex items-center justify-center space-x-4 text-gray-500">
								<Clock className="w-5 h-5" />
								<span>예상 완료 시기: 2024년 2월</span>
							</div>
						</CardContent>
					</Card>

					{/* 하위 메뉴 카드들 */}
					<div className="grid md:grid-cols-2 gap-8 mt-12 max-w-6xl mx-auto">
						{/* 회사연혁 */}
						<Card className="hover:shadow-lg transition-shadow">
							<CardContent className="p-8 text-center">
								<div className="w-16 h-16 bg-[#005BAC] rounded-full flex items-center justify-center mx-auto mb-4">
									<Clock className="w-8 h-8 text-white" />
								</div>
								<h3 className="text-xl font-semibold text-gray-900 mb-3">회사연혁</h3>
								<p className="text-gray-600 mb-4">월미도 해양관광의 발자취와 성장 과정을 소개합니다.</p>
								<div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm inline-block">
									준비중
								</div>
							</CardContent>
						</Card>

						{/* 오시는길 */}
						<Card className="hover:shadow-lg transition-shadow">
							<CardContent className="p-8 text-center">
								<div className="w-16 h-16 bg-[#005BAC] rounded-full flex items-center justify-center mx-auto mb-4">
									<Phone className="w-8 h-8 text-white" />
								</div>
								<h3 className="text-xl font-semibold text-gray-900 mb-3">오시는길</h3>
								<p className="text-gray-600 mb-4">월미도 해양관광 찾아오는 방법을 안내합니다.</p>
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
								<h3 className="text-2xl font-bold mb-4">문의하기</h3>
								<p className="mb-6">궁금한 사항이 있으시면 언제든지 연락주세요</p>
								<div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8">
									<div className="flex items-center space-x-2">
										<Phone className="w-5 h-5" />
										<span className="text-lg font-semibold">032-123-4567</span>
									</div>
									<div className="text-sm opacity-90">
										운영시간: 09:00 ~ 18:00 (연중무휴)
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
