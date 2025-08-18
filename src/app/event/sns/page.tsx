"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingQuickMenu from "@/components/FloatingQuickMenu";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Calendar, ChevronLeft, ChevronRight, User } from "lucide-react";
import { useState } from "react";

// 더미 이벤트SNS 데이터 (실제로는 API에서 가져올 예정)
const eventSnsData = [
	{
		id: 1,
		title: "불꽃 크루즈 특별 이벤트",
		imageUrl: "https://via.placeholder.com/400x300/3B82F6/FFFFFF?text=Fireworks+Event",
		author: "월미도해양관광",
		date: "2024-01-25",
		views: 1250
	},
	{
		id: 2,
		title: "황금빛 낙조 크루즈",
		imageUrl: "https://via.placeholder.com/400x300/F59E0B/FFFFFF?text=Sunset+Cruise",
		author: "월미도해양관광",
		date: "2024-01-24",
		views: 890
	},
	{
		id: 3,
		title: "새해 특별 이벤트 진행중",
		imageUrl: "https://via.placeholder.com/400x300/10B981/FFFFFF?text=New+Year+Event",
		author: "월미도해양관광",
		date: "2024-01-23",
		views: 2100
	},
	{
		id: 4,
		title: "갈매기와 함께하는 행복 크루즈",
		imageUrl: "https://via.placeholder.com/400x300/8B5CF6/FFFFFF?text=Seagull+Cruise",
		author: "월미도해양관광",
		date: "2024-01-22",
		views: 1150
	},
	{
		id: 5,
		title: "고객님들의 소중한 순간들",
		imageUrl: "https://via.placeholder.com/400x300/EF4444/FFFFFF?text=Customer+Photos",
		author: "월미도해양관광",
		date: "2024-01-21",
		views: 3200
	},
	{
		id: 6,
		title: "월미도 축제 연계 이벤트",
		imageUrl: "https://via.placeholder.com/400x300/06B6D4/FFFFFF?text=Festival+Package",
		author: "월미도해양관광",
		date: "2024-01-20",
		views: 980
	},
	{
		id: 7,
		title: "파도와 함께하는 스릴 만점 체험",
		imageUrl: "https://via.placeholder.com/400x300/84CC16/FFFFFF?text=Wave+Experience",
		author: "월미도해양관광",
		date: "2024-01-19",
		views: 1680
	},
	{
		id: 8,
		title: "커플 데이트 추천 코스",
		imageUrl: "https://via.placeholder.com/400x300/F97316/FFFFFF?text=Couple+Date",
		author: "월미도해양관광",
		date: "2024-01-18",
		views: 2450
	},
	{
		id: 9,
		title: "단체 예약 특별 혜택",
		imageUrl: "https://via.placeholder.com/400x300/A855F7/FFFFFF?text=Group+Discount",
		author: "월미도해양관광",
		date: "2024-01-17",
		views: 1320
	},
	{
		id: 10,
		title: "고객 만족도 1위 달성",
		imageUrl: "https://via.placeholder.com/400x300/14B8A6/FFFFFF?text=No.1+Satisfaction",
		author: "월미도해양관광",
		date: "2024-01-16",
		views: 4200
	},
	{
		id: 11,
		title: "VIP 고객 전용 이벤트",
		imageUrl: "https://via.placeholder.com/400x300/DC2626/FFFFFF?text=VIP+Event",
		author: "월미도해양관광",
		date: "2024-01-15",
		views: 1890
	},
	{
		id: 12,
		title: "인스타그램 사진 콘테스트",
		imageUrl: "https://via.placeholder.com/400x300/7C3AED/FFFFFF?text=Photo+Contest",
		author: "월미도해양관광",
		date: "2024-01-14",
		views: 2780
	}
];

const ITEMS_PER_PAGE = 9;

export default function EventSNSPage() {
	const [currentPage, setCurrentPage] = useState(1);

	const totalPages = Math.ceil(eventSnsData.length / ITEMS_PER_PAGE);
	const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
	const currentItems = eventSnsData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

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
						<h1 className="text-4xl font-bold text-gray-900 mb-4">이벤트 SNS</h1>
						<p className="text-xl text-gray-600">월미도 해양관광의 최신 이벤트와 소식을 확인하세요</p>
					</div>

					{/* 갤러리 그리드 */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
						{currentItems.map((item) => (
							<Card key={item.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer">
								{/* 이미지 영역 */}
								<div className="relative h-64 overflow-hidden">
									<img
										src={item.imageUrl}
										alt={item.title}
										className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
									/>
									{/* 조회수 오버레이 */}
									<div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded-full text-sm flex items-center space-x-1">
										<Eye className="w-4 h-4" />
										<span>{formatNumber(item.views)}</span>
									</div>
								</div>

								{/* 콘텐츠 영역 */}
								<CardContent className="p-6">
									{/* 제목 */}
									<h3 className="text-lg font-semibold text-gray-900 mb-4 line-clamp-2">
										{item.title}
									</h3>

									{/* 작성자 및 날짜 */}
									<div className="flex justify-between items-center text-sm text-gray-500">
										<div className="flex items-center space-x-2">
											<User className="w-4 h-4" />
											<span>{item.author}</span>
										</div>
										<div className="flex items-center space-x-1">
											<Calendar className="w-4 h-4" />
											<span>{formatDate(item.date)}</span>
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