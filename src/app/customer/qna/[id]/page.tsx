"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingQuickMenu from "@/components/FloatingQuickMenu";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Eye, ChevronUp, ChevronDown, Lock, Download, User, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

// 더미 QnA 데이터 (실제로는 API에서 가져올 예정)
const qnaData = [
	{
		id: 1,
		title: "불꽃 크루즈 예약 관련 문의드립니다",
		content: `<p>안녕하세요. 다음 주 토요일 불꽃 크루즈 예약하려고 하는데 몇 가지 문의사항이 있습니다.</p>

<p><strong>문의사항:</strong></p>
<ul>
<li>4명이서 가려고 하는데 아직 자리가 있나요?</li>
<li>예약은 언제까지 가능한가요?</li>
<li>당일 날씨가 안좋으면 어떻게 되나요?</li>
</ul>

<p>빠른 답변 부탁드립니다. 감사합니다!</p>`,
		author: "김민수",
		date: "2024-01-25",
		views: 45,
		isSecret: false,
		hasReply: true,
		replyDate: "2024-01-25",
		replyContent: `<p>안녕하세요. 월미도 해양관광입니다.</p>

<p>문의해 주신 내용에 대해 답변드리겠습니다.</p>

<p><strong>1. 좌석 확인</strong><br/>
다음 주 토요일 불꽃 크루즈는 현재 좌석이 있습니다. 4명 예약 가능합니다.</p>

<p><strong>2. 예약 마감</strong><br/>
당일 오후 4시까지 예약 가능하지만, 좌석이 한정되어 있어 미리 예약하시는 것을 권장합니다.</p>

<p><strong>3. 기상악화 시</strong><br/>
풍속 10m/s 이상 또는 파고 1.5m 이상 시 안전을 위해 운항이 중단됩니다. 이 경우 전액 환불 또는 일정 변경이 가능합니다.</p>

<p>추가 문의사항이 있으시면 언제든지 연락주세요.</p>

<p>감사합니다.</p>`,
		attachments: [
			{ name: "불꽃크루즈_시간표.pdf", size: 2048576, url: "#" }
		]
	},
	{
		id: 2,
		title: "단체 할인 관련 문의",
		content: `<p>20명 단체로 예약하려고 하는데 할인율이 어떻게 되나요?</p>
<p>그리고 단체 예약 시 특별한 절차가 있나요?</p>`,
		author: "이영희",
		date: "2024-01-24",
		views: 32,
		isSecret: true,
		hasReply: false,
		replyDate: null,
		replyContent: null,
		attachments: []
	},
	{
		id: 3,
		title: "날씨가 안좋을 때 운항 여부",
		content: `<p>내일 비가 온다고 하는데 크루즈 운항하나요?</p>
<p>취소되면 환불 가능한가요?</p>`,
		author: "박철수",
		date: "2024-01-23",
		views: 78,
		isSecret: false,
		hasReply: true,
		replyDate: "2024-01-23",
		replyContent: `<p>안녕하세요.</p>
<p>기상악화 시 안전을 위해 운항을 중단할 수 있으며, 이 경우 전액 환불해드립니다.</p>
<p>운항 여부는 출항 2시간 전에 최종 결정되어 개별 연락드립니다.</p>`,
		attachments: []
	}
];

interface QnADetailPageProps {
	params: Promise<{
		id: string;
	}>;
}

export default function QnADetailPage({ params }: QnADetailPageProps) {
	const [id, setId] = useState<string>("");
	const [currentQnA, setCurrentQnA] = useState<typeof qnaData[0] | null>(null);
	const [passwordInput, setPasswordInput] = useState("");
	const [isPasswordVerified, setIsPasswordVerified] = useState(false);

	useEffect(() => {
		params.then((resolvedParams) => {
			setId(resolvedParams.id);
			const qna = qnaData.find(qna => qna.id === parseInt(resolvedParams.id));
			setCurrentQnA(qna || null);
			
			// 비밀글이 아니면 바로 접근 허용
			if (qna && !qna.isSecret) {
				setIsPasswordVerified(true);
			}
		});
	}, [params]);

	const handlePasswordSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// 실제로는 API로 비밀번호 검증
		if (passwordInput === "1234") { // 임시 비밀번호
			setIsPasswordVerified(true);
		} else {
			alert("비밀번호가 일치하지 않습니다.");
		}
	};

	if (!currentQnA) {
		return (
			<div className="min-h-screen">
				<Header />
				<main className="pt-[106px]">
					<div className="w-full max-w-[1600px] mx-auto px-4 py-16">
						<Card>
							<CardContent className="p-12 text-center">
								<h2 className="text-2xl font-bold text-gray-900 mb-4">문의를 찾을 수 없습니다</h2>
								<p className="text-gray-600 mb-6">요청하신 문의가 존재하지 않거나 삭제되었습니다.</p>
								<Link href="/customer/qna">
									<Button className="bg-[#005BAC] hover:bg-[#004494]">
										문의 목록으로 돌아가기
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

	// 비밀글인데 비밀번호가 확인되지 않은 경우
	if (currentQnA.isSecret && !isPasswordVerified) {
		return (
			<div className="min-h-screen">
				<Header />
				<main className="pt-[106px]">
					<div className="w-full max-w-[1600px] mx-auto px-4 py-16">


						<Card className="max-w-md mx-auto">
							<CardContent className="p-8 text-center">
								<Lock className="w-16 h-16 text-[#005BAC] mx-auto mb-4" />
								<h2 className="text-2xl font-bold text-gray-900 mb-4">비밀글입니다</h2>
								<p className="text-gray-600 mb-6">이 글을 보려면 비밀번호를 입력해주세요.</p>
								
								<form onSubmit={handlePasswordSubmit} className="space-y-4">
									<input
										type="password"
										value={passwordInput}
										onChange={(e) => setPasswordInput(e.target.value)}
										placeholder="비밀번호를 입력하세요"
										className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none"
										required
									/>
									<Button type="submit" className="w-full bg-[#005BAC] hover:bg-[#004494]">
										확인
									</Button>
								</form>
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

	const formatFileSize = (bytes: number) => {
		if (bytes === 0) return '0 Bytes';
		const k = 1024;
		const sizes = ['Bytes', 'KB', 'MB', 'GB'];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
	};

	// 이전/다음 문의 찾기
	const currentIndex = qnaData.findIndex(qna => qna.id === currentQnA.id);
	const prevQnA = currentIndex < qnaData.length - 1 ? qnaData[currentIndex + 1] : null;
	const nextQnA = currentIndex > 0 ? qnaData[currentIndex - 1] : null;

	return (
		<div className="min-h-screen">
			<Header />
			<main className="pt-[106px]"> {/* 헤더 높이만큼 상단 여백 */}
				<div className="w-full max-w-[1600px] mx-auto px-4 py-16">


					{/* 문의 상세 */}
					<Card>
						<CardContent className="p-0">
							{/* 헤더 */}
							<div className="p-8 border-b border-gray-200">
								<div className="flex items-center space-x-3 mb-4">
									{currentQnA.isSecret && (
										<Lock className="w-5 h-5 text-gray-500" />
									)}
									<h1 className="text-3xl font-bold text-gray-900">{currentQnA.title}</h1>
									{currentQnA.hasReply && (
										<span className="bg-[#03C75A] text-white px-3 py-1 rounded text-sm font-semibold">
											답변완료
										</span>
									)}
								</div>
								
								<div className="flex items-center space-x-6 text-gray-600">
									<div className="flex items-center space-x-2">
										<User className="w-4 h-4" />
										<span>{currentQnA.author}</span>
									</div>
									<div className="flex items-center space-x-2">
										<Calendar className="w-4 h-4" />
										<span>{formatDate(currentQnA.date)}</span>
									</div>
									<div className="flex items-center space-x-2">
										<Eye className="w-4 h-4" />
										<span>조회 {formatViews(currentQnA.views)}</span>
									</div>
								</div>
							</div>

							{/* 내용 */}
							<div className="p-8">
								<div 
									className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
									dangerouslySetInnerHTML={{ __html: currentQnA.content }}
								/>

								{/* 첨부파일 */}
								{currentQnA.attachments && currentQnA.attachments.length > 0 && (
									<div className="mt-8 pt-6 border-t border-gray-200">
										<h3 className="text-lg font-semibold text-gray-900 mb-4">첨부파일</h3>
										<div className="space-y-2">
											{currentQnA.attachments.map((file, index) => (
												<div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
													<div className="flex items-center space-x-3">
														<div className="w-8 h-8 bg-[#005BAC] rounded flex items-center justify-center">
															<span className="text-white text-xs font-semibold">
																{file.name.split('.').pop()?.toUpperCase()}
															</span>
														</div>
														<div>
															<p className="text-sm font-medium text-gray-900">{file.name}</p>
															<p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
														</div>
													</div>
													<Button
														variant="outline"
														size="sm"
														className="flex items-center"
														onClick={() => window.open(file.url, '_blank')}
													>
														<Download className="w-4 h-4 mr-1" />
														다운로드
													</Button>
												</div>
											))}
										</div>
									</div>
								)}
							</div>

							{/* 답변 */}
							{currentQnA.hasReply && currentQnA.replyContent && (
								<div className="border-t border-gray-200 bg-blue-50">
									<div className="p-8">
										<div className="flex items-center space-x-3 mb-4">
											<div className="w-8 h-8 bg-[#005BAC] rounded-full flex items-center justify-center">
												<MessageCircle className="w-5 h-5 text-white" />
											</div>
											<h3 className="text-lg font-semibold text-gray-900">관리자 답변</h3>
											<span className="text-sm text-gray-500">{formatDate(currentQnA.replyDate!)}</span>
										</div>
										<div 
											className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
											dangerouslySetInnerHTML={{ __html: currentQnA.replyContent }}
										/>
									</div>
								</div>
							)}
						</CardContent>
					</Card>

					{/* 이전/다음 문의 */}
					<div className="mt-8 grid md:grid-cols-2 gap-4">
						{/* 이전 문의 */}
						<Card className={prevQnA ? "hover:shadow-md transition-shadow" : "opacity-50"}>
							<CardContent className="p-6">
								<div className="flex items-center space-x-2 mb-2">
									<ChevronUp className="w-4 h-4 text-gray-500" />
									<span className="text-sm font-semibold text-gray-500">이전 문의</span>
								</div>
								{prevQnA ? (
									<Link href={`/customer/qna/${prevQnA.id}`}>
										<div className="hover:text-[#005BAC] transition-colors">
											<div className="flex items-center space-x-2 mb-1">
												{prevQnA.isSecret && <Lock className="w-4 h-4 text-gray-400" />}
												<p className="font-medium text-gray-900 line-clamp-2">{prevQnA.title}</p>
											</div>
											<p className="text-sm text-gray-500">{formatDate(prevQnA.date)} | {prevQnA.author}</p>
										</div>
									</Link>
								) : (
									<p className="text-gray-400">이전 문의가 없습니다</p>
								)}
							</CardContent>
						</Card>

						{/* 다음 문의 */}
						<Card className={nextQnA ? "hover:shadow-md transition-shadow" : "opacity-50"}>
							<CardContent className="p-6">
								<div className="flex items-center space-x-2 mb-2">
									<ChevronDown className="w-4 h-4 text-gray-500" />
									<span className="text-sm font-semibold text-gray-500">다음 문의</span>
								</div>
								{nextQnA ? (
									<Link href={`/customer/qna/${nextQnA.id}`}>
										<div className="hover:text-[#005BAC] transition-colors">
											<div className="flex items-center space-x-2 mb-1">
												{nextQnA.isSecret && <Lock className="w-4 h-4 text-gray-400" />}
												<p className="font-medium text-gray-900 line-clamp-2">{nextQnA.title}</p>
											</div>
											<p className="text-sm text-gray-500">{formatDate(nextQnA.date)} | {nextQnA.author}</p>
										</div>
									</Link>
								) : (
									<p className="text-gray-400">다음 문의가 없습니다</p>
								)}
							</CardContent>
						</Card>
					</div>

					{/* 목록으로 돌아가기 버튼 */}
					<div className="mt-12 text-center">
						<Link href="/customer/qna">
							<Button className="bg-[#005BAC] hover:bg-[#004494] px-8 py-3">
								목록으로 돌아가기
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
