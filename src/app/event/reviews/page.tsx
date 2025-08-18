"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingQuickMenu from "@/components/FloatingQuickMenu";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Calendar, ChevronLeft, ChevronRight, User } from "lucide-react";
import { useState } from "react";

// 더미 크루즈 리뷰 데이터 (실제로는 API에서 가져올 예정)
const cruiseReviewData = [
	{
		id: 1,
		title: "불꽃 크루즈 정말 환상적이에요",
		imageUrl: "https://via.placeholder.com/400x300/1E40AF/FFFFFF?text=Fireworks+Review",
		author: "김○○",
		date: "2024-01-25",
		views: 234
	},
	{
		id: 2,
		title: "가족과 함께한 행복한 시간",
		imageUrl: "https://via.placeholder.com/400x300/059669/FFFFFF?text=Family+Review",
		author: "박○○",
		date: "2024-01-24",
		views: 189
	},
	{
		id: 3,
		title: "낙조가 정말 아름다워요",
		imageUrl: "https://via.placeholder.com/400x300/DC2626/FFFFFF?text=Sunset+Review",
		author: "이○○",
		date: "2024-01-23",
		views: 312
	},
	{
		id: 4,
		title: "친구들과 즐거운 추억 만들기",
		imageUrl: "https://via.placeholder.com/400x300/7C3AED/FFFFFF?text=Friends+Review",
		author: "최○○",
		date: "2024-01-22",
		views: 156
	},
	{
		id: 5,
		title: "생일 기념으로 완벽한 선택",
		imageUrl: "https://via.placeholder.com/400x300/F59E0B/FFFFFF?text=Birthday+Review",
		author: "정○○",
		date: "2024-01-21",
		views: 278
	},
	{
		id: 6,
		title: "프러포즈 성공 감사합니다",
		imageUrl: "https://via.placeholder.com/400x300/EC4899/FFFFFF?text=Proposal+Review",
		author: "한○○",
		date: "2024-01-20",
		views: 445
	},
	{
		id: 7,
		title: "회사 워크샵으로 대만족",
		imageUrl: "https://via.placeholder.com/400x300/0891B2/FFFFFF?text=Workshop+Review",
		author: "송○○",
		date: "2024-01-19",
		views: 198
	},
	{
		id: 8,
		title: "바다 위의 힐링 타임",
		imageUrl: "https://via.placeholder.com/400x300/16A34A/FFFFFF?text=Healing+Review",
		author: "윤○○",
		date: "2024-01-18",
		views: 167
	},
	{
		id: 9,
		title: "아이들이 너무 좋아해요",
		imageUrl: "https://via.placeholder.com/400x300/CA8A04/FFFFFF?text=Kids+Review",
		author: "임○○",
		date: "2024-01-17",
		views: 223
	},
	{
		id: 10,
		title: "데이트 코스로 최고",
		imageUrl: "https://via.placeholder.com/400x300/BE185D/FFFFFF?text=Date+Review",
		author: "강○○",
		date: "2024-01-16",
		views: 189
	},
	{
		id: 11,
		title: "특별한 기념일에 완벽",
		imageUrl: "https://via.placeholder.com/400x300/9333EA/FFFFFF?text=Anniversary+Review",
		author: "오○○",
		date: "2024-01-15",
		views: 156
	},
	{
		id: 12,
		title: "서비스가 정말 좋아요",
		imageUrl: "https://via.placeholder.com/400x300/DC2626/FFFFFF?text=Service+Review",
		author: "신○○",
		date: "2024-01-14",
		views: 134
	}
];

const ITEMS_PER_PAGE = 9;

export default function CruiseReviewsPage() {
	const [currentPage, setCurrentPage] = useState(1);

	const totalPages = Math.ceil(cruiseReviewData.length / ITEMS_PER_PAGE);
	const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
	const currentItems = cruiseReviewData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

	const formatDate = (dateString: string) => {
		return dateString.replace(/-/g, '.');
	};

	const formatNumber = (num: number) => {
		return num.toLocaleString();
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
						<h1 className="text-4xl font-bold text-gray-900 mb-4">크루즈 리뷰</h1>
						<p className="text-xl text-gray-600">고객님들의 생생한 크루즈 체험 후기를 만나보세요</p>
					</div>

					{/* 갤러리 그리드 */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
						{currentItems.map((review) => (
							<Card key={review.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer">
								{/* 이미지 영역 */}
								<div className="relative h-64 overflow-hidden">
									<img
										src={review.imageUrl}
										alt={review.title}
										className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
									/>
									{/* 조회수 오버레이 */}
									<div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded-full text-sm flex items-center space-x-1">
										<Eye className="w-4 h-4" />
										<span>{formatNumber(review.views)}</span>
									</div>
								</div>

								{/* 콘텐츠 영역 */}
								<CardContent className="p-6">
									{/* 제목 */}
									<h3 className="text-lg font-semibold text-gray-900 mb-4 line-clamp-2">
										{review.title}
									</h3>

									{/* 작성자 및 날짜 */}
									<div className="flex justify-between items-center text-sm text-gray-500">
										<div className="flex items-center space-x-2">
											<User className="w-4 h-4" />
											<span>{review.author}</span>
										</div>
										<div className="flex items-center space-x-1">
											<Calendar className="w-4 h-4" />
											<span>{formatDate(review.date)}</span>
										</div>
									</div>
								</CardContent>
							</Card>
						))}
					</div>

					{/* 페이징 */}
					{totalPages > 1 && (
						<div className="flex justify-center">
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
				</div>
			</main>
			<Footer />
			<FloatingQuickMenu />
		</div>
	);
}