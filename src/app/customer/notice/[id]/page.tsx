"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingQuickMenu from "@/components/FloatingQuickMenu";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Eye, ChevronUp, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

// 더미 공지사항 데이터 (실제로는 API에서 가져올 예정)
const notices = [
	{
		id: 1,
		title: "2024년 설날 연휴 운항 안내",
		content: `설날 연휴 기간 동안의 운항 일정을 안내드립니다.

**운항 일정**
- 2024년 2월 9일(금): 정상 운항
- 2024년 2월 10일(토) ~ 2월 12일(월): 특별 운항 일정

**특별 운항 시간**
- 오전 10시, 오후 2시, 오후 4시 (1일 3회 운항)
- 불꽃 크루즈: 오후 7시 (토요일, 일요일만)

**예약 안내**
- 온라인 예약: 홈페이지에서 24시간 가능
- 전화 예약: 032-123-4567 (오전 9시 ~ 오후 6시)

연휴 기간 중에는 예약이 조기 마감될 수 있으니 미리 예약해 주시기 바랍니다.

문의사항이 있으시면 언제든지 고객센터로 연락주세요.

감사합니다.`,
		date: "2024-01-25",
		views: 1250,
		important: true
	},
	{
		id: 2,
		title: "월미도 해양관광 안전 수칙 안내",
		content: `고객님들의 안전한 크루즈 여행을 위한 안전 수칙을 안내드립니다.

**필수 안전 수칙**

1. **구명조끼 착용**
   - 승선 즉시 구명조끼를 착용해 주세요
   - 어린이는 반드시 보호자가 착용을 도와주세요

2. **승선 제한 사항**
   - 음주 후 승선은 절대 금지됩니다
   - 애완동물 동반은 불가합니다
   - 위험물품 반입은 금지됩니다

3. **선내 안전 수칙**
   - 난간에 기대거나 몸을 내밀지 마세요
   - 지정된 구역에서만 이동해 주세요
   - 비상시 승무원의 안내에 따라주세요

4. **기상 악화시**
   - 풍속 10m/s 이상 또는 파고 1.5m 이상시 운항 중단
   - 운항 중단시 전액 환불 또는 일정 변경 가능

**응급상황 대처**
- 선내 응급의료진 상주
- 해양경찰서와 24시간 연락 체계 구축

안전한 여행을 위해 반드시 준수해 주시기 바랍니다.`,
		date: "2024-01-20",
		views: 890,
		important: true
	},
	{
		id: 3,
		title: "겨울철 운항 일정 변경 안내",
		content: `겨울철 날씨 및 해상 상황을 고려하여 운항 일정이 일부 변경됩니다.

**변경 내용**
- 기간: 2024년 1월 15일 ~ 2024년 2월 29일
- 오후 6시 이후 운항 일시 중단
- 마지막 운항: 오후 4시 출발

**겨울철 운항 시간**
- 평일: 오전 10시, 오후 2시, 오후 4시 (1일 3회)
- 주말: 오전 10시, 정오 12시, 오후 2시, 오후 4시 (1일 4회)

**3월부터 정상 운항 예정**
- 2024년 3월 1일부터 정상 운항 일정으로 복귀
- 야간 크루즈 재개 예정

이용에 불편을 드려 죄송하며, 양해 부탁드립니다.`,
		date: "2024-01-15",
		views: 654,
		important: false
	}
];

interface NoticeDetailPageProps {
	params: Promise<{
		id: string;
	}>;
}

export default function NoticeDetailPage({ params }: NoticeDetailPageProps) {
	const [id, setId] = useState<string>("");
	const [currentNotice, setCurrentNotice] = useState<typeof notices[0] | null>(null);

	useEffect(() => {
		params.then((resolvedParams) => {
			setId(resolvedParams.id);
			const notice = notices.find(notice => notice.id === parseInt(resolvedParams.id));
			setCurrentNotice(notice || null);
		});
	}, [params]);

	if (!currentNotice) {
		return (
			<div className="min-h-screen">
				<Header />
				<main className="pt-[106px]">
					<div className="w-full max-w-[1600px] mx-auto px-4 py-16">
						<Card>
							<CardContent className="p-12 text-center">
								<h2 className="text-2xl font-bold text-gray-900 mb-4">공지사항을 찾을 수 없습니다</h2>
								<p className="text-gray-600 mb-6">요청하신 공지사항이 존재하지 않거나 삭제되었습니다.</p>
								<Link href="/customer/notice">
									<Button className="bg-[#005BAC] hover:bg-[#004494]">
										공지사항 목록으로 돌아가기
									</Button>
								</Link>
							</CardContent>
						</Card>
					</div>
				</main>
				<Footer />
				<FloatingQuickMenu />
			</div>
		);
	}

	const formatDate = (dateString: string) => {
		return dateString.replace(/-/g, '.');
	};

	const formatViews = (views: number) => {
		return views.toLocaleString();
	};

	// 이전/다음 공지사항 찾기
	const currentIndex = notices.findIndex(notice => notice.id === currentNotice.id);
	const prevNotice = currentIndex < notices.length - 1 ? notices[currentIndex + 1] : null;
	const nextNotice = currentIndex > 0 ? notices[currentIndex - 1] : null;

	// 내용을 HTML로 변환 (간단한 마크다운 스타일)
	const formatContent = (content: string) => {
		return content
			.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
			.replace(/\n\n/g, '</p><p>')
			.replace(/\n/g, '<br/>');
	};

	return (
		<div className="min-h-screen">
			<Header />
			<main className="pt-[106px]"> {/* 헤더 높이만큼 상단 여백 */}
				<div className="w-full max-w-[1600px] mx-auto px-4 py-16">


					{/* 공지사항 상세 */}
					<Card>
						<CardContent className="p-0">
							{/* 헤더 */}
							<div className="p-8 border-b border-gray-200">
								<div className="flex items-center space-x-3 mb-4">
									{currentNotice.important && (
										<span className="bg-red-500 text-white px-3 py-1 rounded text-sm font-semibold">
											중요
										</span>
									)}
									<h1 className="text-3xl font-bold text-gray-900">{currentNotice.title}</h1>
								</div>
								
								<div className="flex items-center space-x-6 text-gray-600">
									<div className="flex items-center space-x-2">
										<Calendar className="w-4 h-4" />
										<span>{formatDate(currentNotice.date)}</span>
									</div>
									<div className="flex items-center space-x-2">
										<Eye className="w-4 h-4" />
										<span>조회 {formatViews(currentNotice.views)}</span>
									</div>
								</div>
							</div>

							{/* 내용 */}
							<div className="p-8">
								<div 
									className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
									dangerouslySetInnerHTML={{ 
										__html: `<p>${formatContent(currentNotice.content)}</p>` 
									}}
								/>
							</div>
						</CardContent>
					</Card>

					{/* 이전/다음 공지사항 */}
					<div className="mt-8 grid md:grid-cols-2 gap-4">
						{/* 이전 공지사항 */}
						<Card className={prevNotice ? "hover:shadow-md transition-shadow" : "opacity-50"}>
							<CardContent className="p-6">
								<div className="flex items-center space-x-2 mb-2">
									<ChevronUp className="w-4 h-4 text-gray-500" />
									<span className="text-sm font-semibold text-gray-500">이전 공지사항</span>
								</div>
								{prevNotice ? (
									<Link href={`/customer/notice/${prevNotice.id}`}>
										<div className="hover:text-[#005BAC] transition-colors">
											<p className="font-medium text-gray-900 line-clamp-2">{prevNotice.title}</p>
											<p className="text-sm text-gray-500 mt-1">{formatDate(prevNotice.date)}</p>
										</div>
									</Link>
								) : (
									<p className="text-gray-400">이전 공지사항이 없습니다</p>
								)}
							</CardContent>
						</Card>

						{/* 다음 공지사항 */}
						<Card className={nextNotice ? "hover:shadow-md transition-shadow" : "opacity-50"}>
							<CardContent className="p-6">
								<div className="flex items-center space-x-2 mb-2">
									<ChevronDown className="w-4 h-4 text-gray-500" />
									<span className="text-sm font-semibold text-gray-500">다음 공지사항</span>
								</div>
								{nextNotice ? (
									<Link href={`/customer/notice/${nextNotice.id}`}>
										<div className="hover:text-[#005BAC] transition-colors">
											<p className="font-medium text-gray-900 line-clamp-2">{nextNotice.title}</p>
											<p className="text-sm text-gray-500 mt-1">{formatDate(nextNotice.date)}</p>
										</div>
									</Link>
								) : (
									<p className="text-gray-400">다음 공지사항이 없습니다</p>
								)}
							</CardContent>
						</Card>
					</div>

					{/* 목록으로 돌아가기 버튼 */}
					<div className="mt-12 text-center">
						<Link href="/customer/notice">
							<Button className="bg-[#005BAC] hover:bg-[#004494] px-8 py-3">
								공지사항 목록으로 돌아가기
							</Button>
						</Link>
					</div>
				</div>
			</main>
			<Footer />
			<FloatingQuickMenu />
		</div>
	);
}
