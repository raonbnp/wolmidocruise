"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingQuickMenu from "@/components/FloatingQuickMenu";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// 더미 공지사항 데이터 (실제로는 API에서 가져올 예정)
const notices = [
	{
		id: 1,
		title: "2024년 설날 연휴 운항 안내",
		content: "설날 연휴 기간 동안의 운항 일정을 안내드립니다. 2024년 2월 9일(금)부터 2월 12일(월)까지는 특별 운항 일정으로 운영됩니다. 자세한 시간표는 홈페이지를 참고해 주세요.",
		date: "2024-01-25",
		views: 1250,
		important: true
	},
	{
		id: 2,
		title: "월미도 해양관광 안전 수칙 안내",
		content: "고객님들의 안전한 크루즈 여행을 위한 안전 수칙을 안내드립니다. 승선 시 구명조끼 착용은 필수이며, 음주 후 승선은 제한됩니다.",
		date: "2024-01-20",
		views: 890,
		important: true
	},
	{
		id: 3,
		title: "겨울철 운항 일정 변경 안내",
		content: "겨울철 날씨 및 해상 상황을 고려하여 운항 일정이 일부 변경됩니다. 오후 6시 이후 운항은 일시 중단되며, 3월부터 정상 운항 예정입니다.",
		date: "2024-01-15",
		views: 654,
		important: false
	},
	{
		id: 4,
		title: "단체 예약 할인 이벤트 실시",
		content: "20명 이상 단체 예약 시 15% 할인 혜택을 제공합니다. 예약 문의는 고객센터(032-123-4567)로 연락주세요.",
		date: "2024-01-10",
		views: 432,
		important: false
	},
	{
		id: 5,
		title: "홈페이지 리뉴얼 완료 안내",
		content: "더 나은 서비스 제공을 위해 홈페이지를 새롭게 단장했습니다. 온라인 예약 시스템이 더욱 편리해졌으니 많은 이용 부탁드립니다.",
		date: "2024-01-05",
		views: 789,
		important: false
	},
	{
		id: 6,
		title: "2024년 신년 인사",
		content: "고객 여러분께 새해 복 많이 받으시길 바랍니다. 2024년에도 월미도 해양관광을 사랑해 주시는 고객님들께 더욱 좋은 서비스로 보답하겠습니다.",
		date: "2024-01-01",
		views: 1100,
		important: false
	},
	{
		id: 7,
		title: "연말연시 특별 운항 안내",
		content: "연말연시 기간 동안 특별 운항을 실시합니다. 12월 31일 자정 카운트다운 크루즈와 1월 1일 일출 크루즈를 운영합니다.",
		date: "2023-12-25",
		views: 876,
		important: false
	},
	{
		id: 8,
		title: "크루즈 선박 정기 점검 안내",
		content: "안전한 운항을 위한 정기 점검이 12월 20일부터 22일까지 실시됩니다. 해당 기간 중에는 운항이 중단되오니 양해 부탁드립니다.",
		date: "2023-12-18",
		views: 543,
		important: true
	},
	{
		id: 9,
		title: "겨울철 방한용품 대여 서비스",
		content: "추운 겨울 바다에서도 따뜻하게 크루즈를 즐기실 수 있도록 방한용품 대여 서비스를 시작합니다. 승선권 구매 시 신청 가능합니다.",
		date: "2023-12-15",
		views: 321,
		important: false
	},
	{
		id: 10,
		title: "고객 만족도 조사 실시",
		content: "더 나은 서비스 제공을 위해 고객 만족도 조사를 실시합니다. 설문에 참여해 주신 분께는 소정의 기념품을 드립니다.",
		date: "2023-12-10",
		views: 445,
		important: false
	},
	{
		id: 11,
		title: "크루즈 내 와이파이 서비스 개시",
		content: "크루즈 내에서도 인터넷을 자유롭게 이용하실 수 있도록 와이파이 서비스를 시작합니다. 승선 후 'WolmidoCruise' 네트워크에 접속해 주세요.",
		date: "2023-12-05",
		views: 667,
		important: false
	},
	{
		id: 12,
		title: "추석 연휴 운항 일정 안내",
		content: "추석 연휴 기간 동안의 특별 운항 일정을 안내드립니다. 9월 28일부터 10월 3일까지는 평일 대비 운항 횟수가 증가합니다.",
		date: "2023-09-20",
		views: 892,
		important: false
	}
];

const ITEMS_PER_PAGE = 10;

export default function NoticePage() {
	const [currentPage, setCurrentPage] = useState(1);

	const totalPages = Math.ceil(notices.length / ITEMS_PER_PAGE);
	const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
	const currentNotices = notices.slice(startIndex, startIndex + ITEMS_PER_PAGE);

	const formatDate = (dateString: string) => {
		return dateString.replace(/-/g, '.');
	};

	const formatViews = (views: number) => {
		return views.toLocaleString();
	};

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	return (
		<div className="min-h-screen">
			<Header />
			<main className="pt-[106px]"> {/* 헤더 높이만큼 상단 여백 */}
				<div className="w-full max-w-[1600px] mx-auto px-4 py-16">


					{/* 페이지 제목 */}
					<div className="text-center mb-12">
						<h1 className="text-4xl font-bold text-gray-900 mb-4">공지사항</h1>
						<p className="text-xl text-gray-600">중요한 공지사항과 안내사항을 확인하세요</p>
					</div>

					{/* 공지사항 목록 */}
					<Card>
						<CardContent className="p-0">
							{/* 테이블 헤더 */}
							<div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b border-gray-200 font-semibold text-gray-700">
								<div className="col-span-1 text-center">번호</div>
								<div className="col-span-7">제목</div>
								<div className="col-span-2 text-center">등록일</div>
								<div className="col-span-2 text-center">조회수</div>
							</div>

							{/* 공지사항 리스트 */}
							<div className="divide-y divide-gray-200">
								{currentNotices.map((notice, index) => (
									<Link key={notice.id} href={`/customer/notice/${notice.id}`}>
										<div className="grid grid-cols-12 gap-4 p-4 hover:bg-blue-50 transition-colors cursor-pointer">
											<div className="col-span-1 text-center text-gray-600">
												{startIndex + index + 1}
											</div>
											<div className="col-span-7">
												<div className="flex items-center space-x-2">
													{notice.important && (
														<span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
															중요
														</span>
													)}
													<span className={`${notice.important ? 'font-semibold text-gray-900' : 'text-gray-700'} hover:text-[#005BAC] line-clamp-1`}>
														{notice.title}
													</span>
												</div>
											</div>
											<div className="col-span-2 text-center text-gray-600 text-sm">
												{formatDate(notice.date)}
											</div>
											<div className="col-span-2 text-center text-gray-600 text-sm flex items-center justify-center space-x-1">
												<Eye className="w-4 h-4" />
												<span>{formatViews(notice.views)}</span>
											</div>
										</div>
									</Link>
								))}
							</div>
						</CardContent>
					</Card>

					{/* 페이징 */}
					{totalPages > 1 && (
						<div className="flex justify-center mt-8">
							<div className="flex items-center space-x-2">
								{/* 이전 페이지 */}
								<Button
									variant="outline"
									size="sm"
									onClick={() => handlePageChange(currentPage - 1)}
									disabled={currentPage === 1}
									className="flex items-center"
								>
									<ChevronLeft className="w-4 h-4" />
								</Button>

								{/* 페이지 번호들 */}
								{Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
									<Button
										key={page}
										variant={currentPage === page ? "default" : "outline"}
										size="sm"
										onClick={() => handlePageChange(page)}
										className={currentPage === page ? "bg-[#005BAC] hover:bg-[#004494]" : ""}
									>
										{page}
									</Button>
								))}

								{/* 다음 페이지 */}
								<Button
									variant="outline"
									size="sm"
									onClick={() => handlePageChange(currentPage + 1)}
									disabled={currentPage === totalPages}
									className="flex items-center"
								>
									<ChevronRight className="w-4 h-4" />
								</Button>
							</div>
						</div>
					)}

					{/* 안내 메시지 */}
					<div className="mt-12 text-center">
						<Card className="max-w-4xl mx-auto bg-blue-50 border-blue-200">
							<CardContent className="p-6">
								<h3 className="text-lg font-semibold text-[#005BAC] mb-2">📢 공지사항 안내</h3>
								<p className="text-gray-700 text-sm">
									중요한 공지사항은 상단에 고정되어 표시됩니다.<br />
									궁금한 사항이 있으시면 고객센터(032-123-4567)로 연락주세요.
								</p>
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
