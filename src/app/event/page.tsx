import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingQuickMenu from "@/components/FloatingQuickMenu";
import { Card, CardContent } from "@/components/ui/card";
import { Construction, Calendar, Gift, Star, Phone } from "lucide-react";

export default function EventPage() {
	return (
		<div className="min-h-screen">
			<Header />
			<main className="pt-[106px]"> {/* 헤더 높이만큼 상단 여백 */}
				<div className="w-full max-w-[1600px] mx-auto px-4 py-16">
					{/* 페이지 제목 */}
					<div className="text-center mb-12">
						<h1 className="text-4xl font-bold text-gray-900 mb-4">이벤트</h1>
						<p className="text-xl text-gray-600">월미도 해양관광의 다양한 이벤트와 혜택</p>
					</div>

					{/* 준비중 메인 카드 */}
					<Card className="max-w-6xl mx-auto">
						<CardContent className="p-12 text-center">
							{/* 아이콘 */}
							<div className="mb-8">
								<Gift className="w-24 h-24 text-[#005BAC] mx-auto mb-4" />
								<div className="w-16 h-1 bg-[#005BAC] mx-auto rounded-full"></div>
							</div>

							{/* 메인 메시지 */}
							<h2 className="text-3xl font-bold text-gray-900 mb-6">
								이벤트 페이지 준비중입니다
							</h2>
							<p className="text-lg text-gray-600 mb-8 leading-relaxed">
								고객 여러분을 위한 다양하고 특별한 이벤트를<br />
								준비하고 있습니다. 곧 만나보실 수 있습니다!
							</p>

							{/* 임시 이벤트 정보 */}
							<div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-8 mb-8">
								<h3 className="text-xl font-semibold text-[#005BAC] mb-6">예정된 이벤트 (준비중)</h3>
								<div className="grid md:grid-cols-2 gap-6 text-left">
									<div className="space-y-4">
										<div className="flex items-start space-x-3">
											<Calendar className="w-5 h-5 text-[#005BAC] mt-0.5 flex-shrink-0" />
											<div>
												<p className="font-semibold text-gray-900">시즌별 이벤트</p>
												<p className="text-gray-600 text-sm">봄/여름/가을/겨울 특별 이벤트</p>
											</div>
										</div>
										<div className="flex items-start space-x-3">
											<Gift className="w-5 h-5 text-[#005BAC] mt-0.5 flex-shrink-0" />
											<div>
												<p className="font-semibold text-gray-900">할인 이벤트</p>
												<p className="text-gray-600 text-sm">생일 할인, 단체 할인 등</p>
											</div>
										</div>
										<div className="flex items-start space-x-3">
											<Star className="w-5 h-5 text-[#005BAC] mt-0.5 flex-shrink-0" />
											<div>
												<p className="font-semibold text-gray-900">포토 이벤트</p>
												<p className="text-gray-600 text-sm">인생샷 공모전, 리뷰 이벤트</p>
											</div>
										</div>
									</div>
									<div className="space-y-4">
										<div className="flex items-start space-x-3">
											<Construction className="w-5 h-5 text-[#005BAC] mt-0.5 flex-shrink-0" />
											<div>
												<p className="font-semibold text-gray-900">특별 패키지</p>
												<p className="text-gray-600 text-sm">기념일 패키지, 커플 패키지</p>
											</div>
										</div>
										<div className="flex items-start space-x-3">
											<Phone className="w-5 h-5 text-[#005BAC] mt-0.5 flex-shrink-0" />
											<div>
												<p className="font-semibold text-gray-900">SNS 이벤트</p>
												<p className="text-gray-600 text-sm">팔로우, 공유 이벤트</p>
											</div>
										</div>
										<div className="flex items-start space-x-3">
											<Gift className="w-5 h-5 text-[#FF5722] mt-0.5 flex-shrink-0" />
											<div>
												<p className="font-semibold text-gray-900">경품 이벤트</p>
												<p className="text-gray-600 text-sm">추첨을 통한 다양한 경품 제공</p>
											</div>
										</div>
									</div>
								</div>
							</div>

							{/* 이벤트 카테고리 */}
							<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
								<div className="text-center p-6 border border-gray-200 rounded-lg">
									<div className="w-16 h-16 bg-[#005BAC] rounded-full flex items-center justify-center mx-auto mb-4">
										<Calendar className="w-8 h-8 text-white" />
									</div>
									<h4 className="font-semibold text-gray-900 mb-2">시즌 이벤트</h4>
									<p className="text-sm text-gray-600">계절별 특별 행사</p>
									<div className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs mt-3 inline-block">
										준비중
									</div>
								</div>
								<div className="text-center p-6 border border-gray-200 rounded-lg">
									<div className="w-16 h-16 bg-[#03C75A] rounded-full flex items-center justify-center mx-auto mb-4">
										<Gift className="w-8 h-8 text-white" />
									</div>
									<h4 className="font-semibold text-gray-900 mb-2">할인 혜택</h4>
									<p className="text-sm text-gray-600">다양한 할인 이벤트</p>
									<div className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs mt-3 inline-block">
										준비중
									</div>
								</div>
								<div className="text-center p-6 border border-gray-200 rounded-lg">
									<div className="w-16 h-16 bg-[#FF5722] rounded-full flex items-center justify-center mx-auto mb-4">
										<Star className="w-8 h-8 text-white" />
									</div>
									<h4 className="font-semibold text-gray-900 mb-2">참여 이벤트</h4>
									<p className="text-sm text-gray-600">고객 참여형 이벤트</p>
									<div className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs mt-3 inline-block">
										준비중
									</div>
								</div>
								<div className="text-center p-6 border border-gray-200 rounded-lg">
									<div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
										<Phone className="w-8 h-8 text-white" />
									</div>
									<h4 className="font-semibold text-gray-900 mb-2">SNS 이벤트</h4>
									<p className="text-sm text-gray-600">소셜미디어 연계</p>
									<div className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs mt-3 inline-block">
										준비중
									</div>
								</div>
							</div>

							{/* 이벤트 알림 신청 */}
							<div className="bg-white border-2 border-[#005BAC] rounded-lg p-6 mb-8">
								<h4 className="text-lg font-semibold text-gray-900 mb-4">🔔 이벤트 알림 신청</h4>
								<p className="text-gray-600 mb-4">새로운 이벤트 소식을 가장 먼저 받아보세요!</p>
								<div className="text-center">
									<div className="inline-flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-lg">
										<Phone className="w-4 h-4 text-[#005BAC]" />
										<span className="text-sm text-gray-600">전화 문의: 032-123-4567</span>
									</div>
								</div>
							</div>

							{/* 안내 메시지 */}
							<div className="flex items-center justify-center space-x-4 text-gray-500">
								<Construction className="w-5 h-5" />
								<span>예상 완료 시기: 2024년 3월</span>
							</div>
						</CardContent>
					</Card>

					{/* 연락처 정보 */}
					<div className="mt-16 text-center">
						<Card className="max-w-4xl mx-auto bg-[#005BAC] text-white">
							<CardContent className="p-8">
								<h3 className="text-2xl font-bold mb-4">이벤트 문의</h3>
								<p className="mb-6">이벤트에 대해 궁금한 사항이 있으시면 언제든지 연락주세요</p>
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
