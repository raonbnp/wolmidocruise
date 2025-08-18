"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingQuickMenu from "@/components/FloatingQuickMenu";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronDown, ChevronUp, HelpCircle, Phone } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// 더미 FAQ 데이터 (실제로는 API에서 가져올 예정)
const faqData = [
	{
		id: 1,
		category: "예약 및 결제",
		question: "온라인 예약은 어떻게 하나요?",
		answer: "홈페이지 상단의 '유람선 상품 및 예약' 메뉴를 클릭하신 후, 원하시는 상품을 선택하여 예약하실 수 있습니다. 예약 시 날짜, 시간, 인원을 선택하신 후 결제를 진행하시면 됩니다. 결제는 신용카드, 무통장입금이 가능합니다."
	},
	{
		id: 2,
		category: "예약 및 결제",
		question: "예약 취소 및 환불은 어떻게 하나요?",
		answer: "예약 취소는 출항 24시간 전까지 가능합니다. 24시간 전 취소 시 전액 환불되며, 24시간 이내 취소 시에는 환불이 불가합니다. 기상악화로 인한 운항 취소 시에는 전액 환불 또는 일정 변경이 가능합니다. 환불 신청은 고객센터(032-123-4567)로 연락주세요."
	},
	{
		id: 3,
		category: "예약 및 결제",
		question: "단체 예약 할인이 있나요?",
		answer: "네, 단체 할인 혜택을 제공합니다. 10명 이상 20명 미만은 5% 할인, 20명 이상 50명 미만은 10% 할인, 50명 이상은 15% 할인이 적용됩니다. 단체 예약은 사전 상담이 필요하므로 고객센터로 문의해 주세요."
	},
	{
		id: 4,
		category: "운항 정보",
		question: "운항 시간표는 어떻게 되나요?",
		answer: "평일에는 오전 10시, 오후 2시, 오후 4시, 오후 7시에 운항합니다. 주말과 공휴일에는 오전 10시부터 오후 8시까지 2시간 간격으로 운항합니다. 겨울철(12월~2월)에는 오후 6시 이후 운항이 중단될 수 있으니 사전에 확인해 주세요."
	},
	{
		id: 5,
		category: "운항 정보",
		question: "기상악화 시 운항은 어떻게 되나요?",
		answer: "풍속 10m/s 이상 또는 파고 1.5m 이상 시 안전을 위해 운항이 중단됩니다. 운항 중단 결정은 출항 2시간 전에 결정되며, 예약하신 고객님께는 개별 연락드립니다. 기상악화로 인한 운항 취소 시 전액 환불 또는 일정 변경이 가능합니다."
	},
	{
		id: 6,
		category: "운항 정보",
		question: "크루즈 소요시간은 얼마나 되나요?",
		answer: "일반 크루즈는 약 50분, 불꽃 크루즈는 약 1시간 30분 소요됩니다. 낙조 크루즈는 계절에 따라 1시간~1시간 30분 정도 소요되며, 특별 이벤트 크루즈는 상품에 따라 시간이 다를 수 있습니다."
	},
	{
		id: 7,
		category: "이용 안내",
		question: "승선 시 준비물이 있나요?",
		answer: "신분증을 지참해 주세요(미성년자는 학생증 가능). 겨울철에는 방한용품을 준비하시고, 여름철에는 모자나 선글라스를 준비하시면 좋습니다. 구명조끼는 선내에서 제공되며 착용이 의무입니다. 카메라나 휴대폰 충전기도 준비하시면 좋은 추억을 남기실 수 있습니다."
	},
	{
		id: 8,
		category: "이용 안내",
		question: "음식물 반입이 가능한가요?",
		answer: "간단한 음료나 과자류는 반입 가능합니다. 단, 주류는 반입이 금지되어 있으며, 냄새가 강한 음식이나 국물류는 다른 승객에게 피해가 될 수 있어 자제해 주시기 바랍니다. 선내에서는 음료 및 간식을 판매하고 있습니다."
	},
	{
		id: 9,
		category: "이용 안내",
		question: "애완동물 동반이 가능한가요?",
		answer: "죄송하지만 애완동물 동반은 불가합니다. 이는 다른 승객의 안전과 편의를 위한 조치이니 양해 부탁드립니다. 안내견의 경우 사전 문의를 통해 별도 안내받으시기 바랍니다."
	},
	{
		id: 10,
		category: "시설 및 서비스",
		question: "선내 편의시설은 어떤 것이 있나요?",
		answer: "선내에는 화장실, 매점, 휴게공간이 마련되어 있습니다. 무료 와이파이가 제공되며, 휠체어 이용 고객을 위한 편의시설도 갖추어져 있습니다. 또한 안전요원과 응급의료진이 상주하고 있어 안전한 여행을 도와드립니다."
	},
	{
		id: 11,
		category: "시설 및 서비스",
		question: "주차장이 있나요?",
		answer: "월미도 공영주차장을 이용하실 수 있습니다. 주차비는 시간당 1,000원이며, 크루즈 이용 고객에게는 2시간 무료 주차권을 제공합니다. 주말과 성수기에는 주차공간이 부족할 수 있으니 대중교통 이용을 권장드립니다."
	},
	{
		id: 12,
		category: "시설 및 서비스",
		question: "장애인 편의시설이 있나요?",
		answer: "네, 휠체어 이용 고객을 위한 승선 시설과 선내 이동 편의시설이 마련되어 있습니다. 장애인 전용 화장실도 있으며, 필요시 승무원이 도움을 드립니다. 장애인 할인도 적용되니 예약 시 미리 알려주시기 바랍니다."
	}
];

const categories = ["전체", "예약 및 결제", "운항 정보", "이용 안내", "시설 및 서비스"];

export default function FAQPage() {
	const [selectedCategory, setSelectedCategory] = useState("전체");
	const [openItems, setOpenItems] = useState<number[]>([]);

	// 카테고리 필터링
	const filteredFAQs = faqData.filter(faq => {
		const matchesCategory = selectedCategory === "전체" || faq.category === selectedCategory;
		return matchesCategory;
	});

	// 아코디언 토글
	const toggleItem = (id: number) => {
		setOpenItems(prev => 
			prev.includes(id) 
				? prev.filter(item => item !== id)
				: [...prev, id]
		);
	};

	// 모두 열기/닫기
	const toggleAll = () => {
		if (openItems.length === filteredFAQs.length) {
			setOpenItems([]);
		} else {
			setOpenItems(filteredFAQs.map(faq => faq.id));
		}
	};

	return (
		<div className="min-h-screen">
			<Header />
			<main className="pt-[106px]"> {/* 헤더 높이만큼 상단 여백 */}
				<div className="w-full max-w-[1600px] mx-auto px-4 py-16">


					{/* 페이지 제목 */}
					<div className="text-center mb-12">
						<h1 className="text-4xl font-bold text-gray-900 mb-4">자주 묻는 질문</h1>
						<p className="text-xl text-gray-600">고객님들이 자주 묻는 질문과 답변을 확인하세요</p>
					</div>

					{/* 카테고리 필터 */}
					<div className="mb-8">
						<div className="flex flex-wrap justify-center gap-2">
							{categories.map(category => (
								<Button
									key={category}
									variant={selectedCategory === category ? "default" : "outline"}
									onClick={() => setSelectedCategory(category)}
									className={selectedCategory === category ? "bg-[#005BAC] hover:bg-[#004494]" : ""}
								>
									{category}
								</Button>
							))}
						</div>
					</div>

					{/* 결과 정보 및 전체 토글 */}
					<div className="flex justify-between items-center mb-6">
						<p className="text-gray-600">
							총 <span className="font-semibold text-[#005BAC]">{filteredFAQs.length}</span>개의 질문이 있습니다
						</p>
						<Button
							variant="outline"
							onClick={toggleAll}
							className="text-[#005BAC] border-[#005BAC]"
						>
							{openItems.length === filteredFAQs.length ? "모두 닫기" : "모두 열기"}
						</Button>
					</div>

					{/* FAQ 아코디언 */}
					{filteredFAQs.length > 0 ? (
						<div className="space-y-2">
							{filteredFAQs.map((faq, index) => (
								<Card key={faq.id} className="overflow-hidden py-0">
									{/* 질문 (클릭 가능한 헤더) */}
									<button
										onClick={() => toggleItem(faq.id)}
										className={`w-full p-4 text-left transition-colors focus:outline-none ${
											openItems.includes(faq.id) 
												? "bg-blue-50" 
												: "hover:bg-blue-50 focus:bg-blue-50"
										}`}
									>
										<div className="flex items-center justify-between">
											<div className="flex items-start space-x-3 flex-1">
												<div className="flex-shrink-0 w-7 h-7 bg-[#005BAC] rounded-full flex items-center justify-center text-white font-semibold text-sm">
													Q
												</div>
												<div className="flex-1">
													<div className="mb-1">
														<span className="inline-block px-2 py-0.5 bg-blue-100 text-[#005BAC] text-xs font-medium rounded-full">
															{faq.category}
														</span>
													</div>
													<h3 className="text-base font-semibold text-gray-900 leading-relaxed">
														{faq.question}
													</h3>
												</div>
											</div>
											<div className="flex-shrink-0 ml-3">
												{openItems.includes(faq.id) ? (
													<ChevronUp className="w-5 h-5 text-[#005BAC]" />
												) : (
													<ChevronDown className="w-5 h-5 text-gray-400" />
												)}
											</div>
										</div>
									</button>

									{/* 답변 (아코디언 내용) */}
									{openItems.includes(faq.id) && (
										<div className="px-4 pb-4">
											<div className="flex items-start space-x-3">
												<div className="flex-shrink-0 w-7 h-7 bg-[#03C75A] rounded-full flex items-center justify-center text-white font-semibold text-sm">
													A
												</div>
												<div className="flex-1">
													<p className="text-gray-700 leading-relaxed whitespace-pre-line">
														{faq.answer}
													</p>
												</div>
											</div>
										</div>
									)}
								</Card>
							))}
						</div>
					) : (
						<Card>
							<CardContent className="p-12 text-center">
								<HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
								<h3 className="text-xl font-semibold text-gray-900 mb-2">해당 카테고리에 질문이 없습니다</h3>
								<p className="text-gray-600 mb-6">다른 카테고리를 선택해 보세요</p>
								<Button onClick={() => setSelectedCategory("전체")}>
									전체 FAQ 보기
								</Button>
							</CardContent>
						</Card>
					)}

					{/* 추가 도움말 */}
					<div className="mt-16 text-center">
						<Card className="max-w-4xl mx-auto bg-[#005BAC] text-white">
							<CardContent className="p-8">
								<h3 className="text-2xl font-bold mb-4">원하는 답변을 찾지 못하셨나요?</h3>
								<p className="mb-6">고객센터로 직접 문의해 주시면 친절하게 안내해 드리겠습니다</p>
								<div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8">
									<div className="flex items-center space-x-2">
										<Phone className="w-5 h-5" />
										<span className="text-lg font-semibold">032-123-4567</span>
									</div>
									<div className="text-sm opacity-90">
										상담시간: 09:00 ~ 18:00 (연중무휴)
									</div>
								</div>
								<div className="mt-6">
									<Link href="/customer/qna">
										<Button className="bg-white text-[#005BAC] hover:bg-gray-100">
											1:1 문의하기
										</Button>
									</Link>
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
