import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingQuickMenu from "@/components/FloatingQuickMenu";
import { Card, CardContent } from "@/components/ui/card";
import { Construction, MessageCircle, HelpCircle, Phone } from "lucide-react";
import Link from "next/link";

export default function CustomerPage() {
	return (
		<div className="min-h-screen">
			<Header />
			<main className="pt-[106px]"> {/* 헤더 높이만큼 상단 여백 */}
				<div className="w-full max-w-[1600px] mx-auto px-4 py-16">
					{/* 페이지 제목 */}
					<div className="text-center mb-12">
						<h1 className="text-4xl font-bold text-gray-900 mb-4">고객센터</h1>
						<p className="text-xl text-gray-600">고객님의 소중한 의견을 듣겠습니다</p>
					</div>

					{/* 서비스 카드들 */}
					<div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
						{/* 공지사항 */}
						<Link href="/customer/notice">
							<Card className="hover:shadow-lg transition-shadow cursor-pointer">
								<CardContent className="p-8 text-center">
									<div className="w-16 h-16 bg-[#005BAC] rounded-full flex items-center justify-center mx-auto mb-4">
										<MessageCircle className="w-8 h-8 text-white" />
									</div>
									<h3 className="text-xl font-semibold text-gray-900 mb-3">공지사항</h3>
									<p className="text-gray-600 mb-4">중요한 공지사항과 안내사항을 확인하세요.</p>
									<div className="bg-blue-100 text-[#005BAC] px-3 py-1 rounded-full text-sm inline-block">
										서비스 중
									</div>
								</CardContent>
							</Card>
						</Link>

						{/* 자주 묻는 질문 */}
						<Link href="/customer/faq">
							<Card className="hover:shadow-lg transition-shadow cursor-pointer">
								<CardContent className="p-8 text-center">
									<div className="w-16 h-16 bg-[#03C75A] rounded-full flex items-center justify-center mx-auto mb-4">
										<HelpCircle className="w-8 h-8 text-white" />
									</div>
									<h3 className="text-xl font-semibold text-gray-900 mb-3">자주 묻는 질문</h3>
									<p className="text-gray-600 mb-4">고객님들이 자주 묻는 질문과 답변입니다.</p>
									<div className="bg-green-100 text-[#03C75A] px-3 py-1 rounded-full text-sm inline-block">
										서비스 중
									</div>
								</CardContent>
							</Card>
						</Link>

						{/* 묻고 답하기 */}
						<Card className="hover:shadow-lg transition-shadow">
							<CardContent className="p-8 text-center">
								<div className="w-16 h-16 bg-[#FF5722] rounded-full flex items-center justify-center mx-auto mb-4">
									<Construction className="w-8 h-8 text-white" />
								</div>
								<h3 className="text-xl font-semibold text-gray-900 mb-3">묻고 답하기</h3>
								<p className="text-gray-600 mb-4">궁금한 사항을 문의하고 답변을 받아보세요.</p>
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
								<h3 className="text-2xl font-bold mb-4">고객 상담</h3>
								<p className="mb-6">전화로도 언제든지 문의해 주세요</p>
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
