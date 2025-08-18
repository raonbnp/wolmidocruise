import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingQuickMenu from "@/components/FloatingQuickMenu";
import { Card, CardContent } from "@/components/ui/card";
import { Construction, Users, Calendar, Phone, Gift, Shield, Clock } from "lucide-react";

export default function GroupPage() {
	return (
		<div className="min-h-screen">
			<Header />
			<main className="pt-[106px]"> {/* 헤더 높이만큼 상단 여백 */}
				<div className="w-full max-w-[1600px] mx-auto px-4 py-16">
					{/* 페이지 제목 */}
					<div className="text-center mb-12">
						<h1 className="text-4xl font-bold text-gray-900 mb-4">단체 여행 및 이용안내</h1>
						<p className="text-xl text-gray-600">단체 고객을 위한 특별한 서비스</p>
					</div>

					{/* 준비중 메인 카드 */}
					<Card className="max-w-6xl mx-auto">
						<CardContent className="p-12 text-center">
							{/* 아이콘 */}
							<div className="mb-8">
								<Users className="w-24 h-24 text-[#005BAC] mx-auto mb-4" />
								<div className="w-16 h-1 bg-[#005BAC] mx-auto rounded-full"></div>
							</div>

							{/* 메인 메시지 */}
							<h2 className="text-3xl font-bold text-gray-900 mb-6">
								단체 여행 서비스 준비중입니다
							</h2>
							<p className="text-lg text-gray-600 mb-8 leading-relaxed">
								더 나은 단체 고객 서비스를 위해<br />
								전용 상품과 예약 시스템을 준비하고 있습니다.
							</p>

							{/* 임시 서비스 정보 */}
							<div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-8 mb-8">
								<h3 className="text-xl font-semibold text-[#005BAC] mb-6">단체 여행 서비스 (예정)</h3>
								<div className="grid md:grid-cols-2 gap-6 text-left">
									<div className="space-y-3">
										<div className="flex items-start space-x-3">
											<Users className="w-5 h-5 text-[#005BAC] mt-0.5 flex-shrink-0" />
											<div>
												<p className="font-semibold text-gray-900">단체 예약</p>
												<p className="text-gray-600">10명 이상 단체 전용 예약 시스템</p>
											</div>
										</div>
										<div className="flex items-start space-x-3">
											<Gift className="w-5 h-5 text-[#005BAC] mt-0.5 flex-shrink-0" />
											<div>
												<p className="font-semibold text-gray-900">특별 할인</p>
												<p className="text-gray-600">단체 규모별 차등 할인 혜택</p>
											</div>
										</div>
										<div className="flex items-start space-x-3">
											<Shield className="w-5 h-5 text-[#005BAC] mt-0.5 flex-shrink-0" />
											<div>
												<p className="font-semibold text-gray-900">전담 서비스</p>
												<p className="text-gray-600">단체 전담 직원 배정</p>
											</div>
										</div>
									</div>
									<div className="space-y-3">
										<div className="flex items-start space-x-3">
											<Calendar className="w-5 h-5 text-[#005BAC] mt-0.5 flex-shrink-0" />
											<div>
												<p className="font-semibold text-gray-900">맞춤 일정</p>
												<p className="text-gray-600">단체 특성에 맞는 맞춤형 일정</p>
											</div>
										</div>
										<div className="flex items-start space-x-3">
											<Phone className="w-5 h-5 text-[#005BAC] mt-0.5 flex-shrink-0" />
											<div>
												<p className="font-semibold text-gray-900">사전 상담</p>
												<p className="text-gray-600">예약 전 무료 상담 서비스</p>
											</div>
										</div>
										<div className="flex items-start space-x-3">
											<Clock className="w-5 h-5 text-[#005BAC] mt-0.5 flex-shrink-0" />
											<div>
												<p className="font-semibold text-gray-900">유연한 시간</p>
												<p className="text-gray-600">단체 전용 운항 시간 조정</p>
											</div>
										</div>
									</div>
								</div>
							</div>

							{/* 단체 규모별 혜택 (예정) */}
							<div className="grid md:grid-cols-3 gap-6 mb-8">
								<div className="text-center p-6 border border-gray-200 rounded-lg">
									<div className="w-16 h-16 bg-[#005BAC] rounded-full flex items-center justify-center mx-auto mb-4">
										<span className="text-white font-bold text-lg">10+</span>
									</div>
									<h4 className="font-semibold text-gray-900 mb-2">소규모 단체</h4>
									<p className="text-sm text-gray-600">10~19명</p>
									<p className="text-[#005BAC] font-semibold">5% 할인</p>
								</div>
								<div className="text-center p-6 border border-gray-200 rounded-lg">
									<div className="w-16 h-16 bg-[#03C75A] rounded-full flex items-center justify-center mx-auto mb-4">
										<span className="text-white font-bold text-lg">20+</span>
									</div>
									<h4 className="font-semibold text-gray-900 mb-2">중규모 단체</h4>
									<p className="text-sm text-gray-600">20~49명</p>
									<p className="text-[#03C75A] font-semibold">10% 할인</p>
								</div>
								<div className="text-center p-6 border border-gray-200 rounded-lg">
									<div className="w-16 h-16 bg-[#FF5722] rounded-full flex items-center justify-center mx-auto mb-4">
										<span className="text-white font-bold text-lg">50+</span>
									</div>
									<h4 className="font-semibold text-gray-900 mb-2">대규모 단체</h4>
									<p className="text-sm text-gray-600">50명 이상</p>
									<p className="text-[#FF5722] font-semibold">15% 할인</p>
								</div>
							</div>

							{/* 안내 메시지 */}
							<div className="flex items-center justify-center space-x-4 text-gray-500 mb-8">
								<Construction className="w-5 h-5" />
								<span>예상 완료 시기: 2024년 3월</span>
							</div>

							{/* 임시 연락처 정보 */}
							<div className="bg-[#005BAC] text-white rounded-lg p-6">
								<h4 className="text-xl font-bold mb-3">단체 예약 문의</h4>
								<p className="mb-4">현재는 전화 상담을 통해 단체 예약을 받고 있습니다</p>
								<div className="flex items-center justify-center space-x-2">
									<Phone className="w-5 h-5" />
									<span className="text-xl font-semibold">032-123-4567</span>
								</div>
								<p className="text-sm opacity-90 mt-2">상담시간: 09:00 ~ 18:00 (연중무휴)</p>
							</div>
						</CardContent>
					</Card>

					{/* 단체 여행 유형 (예정) */}
					<div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
						<Card className="hover:shadow-lg transition-shadow">
							<CardContent className="p-6 text-center">
								<div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
									<Users className="w-8 h-8 text-[#005BAC]" />
								</div>
								<h3 className="font-semibold text-gray-900 mb-2">회사 워크샵</h3>
								<p className="text-sm text-gray-600">팀 빌딩 및 회사 행사</p>
								<div className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs mt-3 inline-block">
									준비중
								</div>
							</CardContent>
						</Card>

						<Card className="hover:shadow-lg transition-shadow">
							<CardContent className="p-6 text-center">
								<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
									<Calendar className="w-8 h-8 text-[#03C75A]" />
								</div>
								<h3 className="font-semibold text-gray-900 mb-2">학교 체험학습</h3>
								<p className="text-sm text-gray-600">교육 프로그램 연계</p>
								<div className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs mt-3 inline-block">
									준비중
								</div>
							</CardContent>
						</Card>

						<Card className="hover:shadow-lg transition-shadow">
							<CardContent className="p-6 text-center">
								<div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
									<Gift className="w-8 h-8 text-[#FF5722]" />
								</div>
								<h3 className="font-semibold text-gray-900 mb-2">동호회 모임</h3>
								<p className="text-sm text-gray-600">취미 동호회 특별 패키지</p>
								<div className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs mt-3 inline-block">
									준비중
								</div>
							</CardContent>
						</Card>

						<Card className="hover:shadow-lg transition-shadow">
							<CardContent className="p-6 text-center">
								<div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
									<Shield className="w-8 h-8 text-purple-600" />
								</div>
								<h3 className="font-semibold text-gray-900 mb-2">가족 모임</h3>
								<p className="text-sm text-gray-600">대가족 특별 할인</p>
								<div className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs mt-3 inline-block">
									준비중
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
