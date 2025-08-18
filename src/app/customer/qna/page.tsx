"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingQuickMenu from "@/components/FloatingQuickMenu";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Eye, ChevronLeft, ChevronRight, Lock, PenTool } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// 더미 QnA 데이터 (실제로는 API에서 가져올 예정)
const qnaData = [
	{
		id: 1,
		title: "불꽃 크루즈 예약 관련 문의드립니다",
		content: "다음 주 토요일 불꽃 크루즈 예약하려고 하는데 아직 자리가 있나요? 4명이서 가려고 합니다.",
		author: "김민수",
		date: "2024-01-25",
		views: 45,
		isSecret: false,
		hasReply: true,
		replyDate: "2024-01-25"
	},
	{
		id: 2,
		title: "단체 할인 관련 문의",
		content: "20명 단체로 예약하려고 하는데 할인율이 어떻게 되나요?",
		author: "이영희",
		date: "2024-01-24",
		views: 32,
		isSecret: true,
		hasReply: false,
		replyDate: null
	},
	{
		id: 3,
		title: "날씨가 안좋을 때 운항 여부",
		content: "내일 비가 온다고 하는데 크루즈 운항하나요? 취소되면 환불 가능한가요?",
		author: "박철수",
		date: "2024-01-23",
		views: 78,
		isSecret: false,
		hasReply: true,
		replyDate: "2024-01-23"
	},
	{
		id: 4,
		title: "주차장 이용 관련",
		content: "월미도에 주차하고 크루즈 타려고 하는데 주차비는 어떻게 되나요?",
		author: "최정민",
		date: "2024-01-22",
		views: 56,
		isSecret: false,
		hasReply: true,
		replyDate: "2024-01-22"
	},
	{
		id: 5,
		title: "애완동물 동반 가능한지 문의",
		content: "소형견과 함께 크루즈를 탈 수 있나요?",
		author: "정수연",
		date: "2024-01-21",
		views: 41,
		isSecret: false,
		hasReply: true,
		replyDate: "2024-01-21"
	},
	{
		id: 6,
		title: "생일 이벤트 관련 문의",
		content: "생일 맞은 사람에게 특별한 서비스가 있나요?",
		author: "홍길동",
		date: "2024-01-20",
		views: 29,
		isSecret: true,
		hasReply: false,
		replyDate: null
	},
	{
		id: 7,
		title: "크루즈 내 음식 반입",
		content: "간단한 음식이나 음료수 가져가도 되나요?",
		author: "윤서진",
		date: "2024-01-19",
		views: 63,
		isSecret: false,
		hasReply: true,
		replyDate: "2024-01-19"
	},
	{
		id: 8,
		title: "예약 취소 및 환불",
		content: "예약 취소하려고 하는데 어떻게 해야 하나요?",
		author: "강민호",
		date: "2024-01-18",
		views: 87,
		isSecret: false,
		hasReply: true,
		replyDate: "2024-01-18"
	},
	{
		id: 9,
		title: "선내 와이파이 사용",
		content: "크루즈 안에서 와이파이 사용 가능한가요?",
		author: "송지은",
		date: "2024-01-17",
		views: 34,
		isSecret: false,
		hasReply: true,
		replyDate: "2024-01-17"
	},
	{
		id: 10,
		title: "장애인 편의시설 문의",
		content: "휠체어 이용자도 크루즈 이용 가능한가요?",
		author: "임태현",
		date: "2024-01-16",
		views: 52,
		isSecret: true,
		hasReply: true,
		replyDate: "2024-01-16"
	},
	{
		id: 11,
		title: "크루즈 운항 시간표",
		content: "평일과 주말 운항 시간이 다른가요?",
		author: "한지민",
		date: "2024-01-15",
		views: 95,
		isSecret: false,
		hasReply: true,
		replyDate: "2024-01-15"
	},
	{
		id: 12,
		title: "단체 예약 시 주의사항",
		content: "회사 워크샵으로 단체 예약하려고 하는데 특별히 준비할 것이 있나요?",
		author: "오성민",
		date: "2024-01-14",
		views: 38,
		isSecret: false,
		hasReply: false,
		replyDate: null
	}
];

const ITEMS_PER_PAGE = 10;

export default function QnAPage() {
	const [currentPage, setCurrentPage] = useState(1);

	const totalPages = Math.ceil(qnaData.length / ITEMS_PER_PAGE);
	const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
	const currentQnAs = qnaData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

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
						<h1 className="text-4xl font-bold text-gray-900 mb-4">묻고 답하기</h1>
						<p className="text-xl text-gray-600">궁금한 사항을 문의하고 답변을 받아보세요</p>
					</div>

					{/* 글쓰기 버튼 */}
					<div className="flex justify-end mb-6">
						<Link href="/customer/qna/write">
							<Button className="bg-[#005BAC] hover:bg-[#004494] flex items-center">
								<PenTool className="w-4 h-4 mr-2" />
								글쓰기
							</Button>
						</Link>
					</div>

					{/* QnA 목록 */}
					<Card>
						<CardContent className="p-0">
							{/* 테이블 헤더 */}
							<div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b border-gray-200 font-semibold text-gray-700">
								<div className="col-span-1 text-center">번호</div>
								<div className="col-span-6">제목</div>
								<div className="col-span-2 text-center">작성자</div>
								<div className="col-span-2 text-center">등록일</div>
								<div className="col-span-1 text-center">조회수</div>
							</div>

							{/* QnA 리스트 */}
							<div className="divide-y divide-gray-200">
								{currentQnAs.map((qna, index) => (
									<Link key={qna.id} href={`/customer/qna/${qna.id}`}>
										<div className="grid grid-cols-12 gap-4 p-4 hover:bg-blue-50 transition-colors cursor-pointer">
											<div className="col-span-1 text-center text-gray-600">
												{startIndex + index + 1}
											</div>
											<div className="col-span-6">
												<div className="flex items-center space-x-2">
													{qna.isSecret && (
														<Lock className="w-4 h-4 text-gray-500" />
													)}
													<span className="text-gray-700 hover:text-[#005BAC] line-clamp-1">
														{qna.title}
													</span>
													{qna.hasReply && (
														<span className="bg-[#03C75A] text-white px-2 py-0.5 rounded text-xs">
															답변완료
														</span>
													)}
												</div>
											</div>
											<div className="col-span-2 text-center text-gray-600 text-sm">
												{qna.author}
											</div>
											<div className="col-span-2 text-center text-gray-600 text-sm">
												{formatDate(qna.date)}
											</div>
											<div className="col-span-1 text-center text-gray-600 text-sm flex items-center justify-center space-x-1">
												<Eye className="w-4 h-4" />
												<span>{formatViews(qna.views)}</span>
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
								<h3 className="text-lg font-semibold text-[#005BAC] mb-2">💬 묻고 답하기 안내</h3>
								<p className="text-gray-700 text-sm">
									비회원도 글 작성이 가능합니다. 비밀번호를 입력하시면 비밀글로 등록됩니다.<br />
									답변은 평일 기준 1-2일 내에 등록됩니다. 급한 문의는 고객센터(032-123-4567)로 연락주세요.
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
