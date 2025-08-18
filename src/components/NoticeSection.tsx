"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Calendar, Phone, ExternalLink } from "lucide-react";
import Link from "next/link";

const NoticeSection = () => {
	// 임시 데이터 - 실제로는 API에서 가져올 예정
	const notices = [
		{
			id: 1,
			title: "2024년 겨울시즌 운항 일정 안내",
			date: "2024-01-15",
			isNew: true
		},
		{
			id: 2,
			title: "불꽃 크루즈 특가 이벤트 진행",
			date: "2024-01-12",
			isNew: true
		},
		{
			id: 3,
			title: "단체 예약 할인 혜택 안내",
			date: "2024-01-10",
			isNew: false
		}
	];

	return (
		<section className="py-12 bg-slate-50">
			<div className="container mx-auto px-4">
				<div className="grid md:grid-cols-3 gap-6">
					{/* 공지사항 */}
					<Card className="hover:shadow-lg transition-shadow duration-300">
						<CardHeader className="pb-4">
							<CardTitle className="flex items-center text-lg font-semibold text-gray-900">
								<Bell className="w-5 h-5 mr-2 text-[#005BAC]" />
								공지사항
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-3">
								{notices.map((notice) => (
									<div key={notice.id} className="flex items-start justify-between group">
										<div className="flex-1 min-w-0">
											<Link 
												href={`/customer/notice/${notice.id}`}
												className="block"
											>
												<div className="flex items-center mb-1">
													{notice.isNew && (
														<Badge variant="destructive" className="mr-2 text-xs">
															NEW
														</Badge>
													)}
													<h4 className="text-sm font-medium text-gray-900 group-hover:text-[#005BAC] transition-colors truncate">
														{notice.title}
													</h4>
												</div>
												<p className="text-xs text-gray-500">{notice.date}</p>
											</Link>
										</div>
									</div>
								))}
							</div>
							<div className="mt-4">
								<Button variant="outline" size="sm" className="w-full" asChild>
									<Link href="/customer/notice">
										더보기 <ExternalLink className="w-3 h-3 ml-1" />
									</Link>
								</Button>
							</div>
						</CardContent>
					</Card>

					{/* 당분기 이용안내 */}
					<Card className="hover:shadow-lg transition-shadow duration-300">
						<CardHeader className="pb-4">
							<CardTitle className="flex items-center text-lg font-semibold text-gray-900">
								<Calendar className="w-5 h-5 mr-2 text-[#005BAC]" />
								2024년 1분기 이용안내
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								<div className="bg-blue-50 p-4 rounded-lg">
									<h4 className="font-semibold text-sm text-[#005BAC] mb-2">운항 시간</h4>
									<p className="text-sm text-gray-700">
										평일: 10:00 ~ 18:00<br />
										주말: 09:00 ~ 19:00
									</p>
								</div>
								<div className="bg-orange-50 p-4 rounded-lg">
									<h4 className="font-semibold text-sm text-[#FF5722] mb-2">특별 운항</h4>
									<p className="text-sm text-gray-700">
										불꽃 크루즈: 매주 토요일 20:00<br />
										낙조 크루즈: 일몰 1시간 전
									</p>
								</div>
								<div className="bg-green-50 p-4 rounded-lg">
									<h4 className="font-semibold text-sm text-[#03C75A] mb-2">할인 혜택</h4>
									<p className="text-sm text-gray-700">
										단체(20명 이상): 20% 할인<br />
										온라인 예약: 10% 할인
									</p>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* 예약·상담 안내 */}
					<Card className="hover:shadow-lg transition-shadow duration-300 bg-[#005BAC] text-white">
						<CardHeader className="pb-4">
							<CardTitle className="flex items-center text-lg font-semibold">
								<Phone className="w-5 h-5 mr-2" />
								예약·상담 안내
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								<div className="text-center">
									<p className="text-sm opacity-90 mb-2">예약 및 문의</p>
									<div className="text-2xl font-bold mb-1">032-123-4567</div>
									<p className="text-sm opacity-75">평일 09:00 ~ 18:00</p>
								</div>
								
								<div className="border-t border-white/20 pt-4">
									<p className="text-sm opacity-90 mb-3">상담 시간</p>
									<div className="text-sm space-y-1 opacity-75">
										<div className="flex justify-between">
											<span>평일</span>
											<span>09:00 ~ 18:00</span>
										</div>
										<div className="flex justify-between">
											<span>주말/공휴일</span>
											<span>09:00 ~ 17:00</span>
										</div>
									</div>
								</div>

								<div className="space-y-2 pt-4">
									<Button 
										className="w-full bg-[#03C75A] hover:bg-[#02b850] text-white"
										asChild
									>
										<Link href="https://booking.naver.com" target="_blank" rel="noopener noreferrer">
											네이버 예약 바로가기
										</Link>
									</Button>
									<Button 
										variant="outline" 
										className="w-full border-white text-white hover:bg-white hover:text-[#005BAC]"
										asChild
									>
										<Link href="/cruise/booking">
											온라인 예약하기
										</Link>
									</Button>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
};

export default NoticeSection;

