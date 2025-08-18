"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";

import { Menu, Phone, User, Search, Calendar, ShoppingCart, Heart } from "lucide-react";

const Header = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { totalItems: cartItems } = useCart();
	const { totalItems: wishlistItems } = useWishlist();

	const mainMenuItems = [
							{
						title: "회사소개",
						href: "/company",
						subItems: [
							{ title: "회사소개", href: "/company/history" },
							{ title: "오시는 길", href: "/company/location" }
						]
					},
		{
			title: "유람선 상품 및 예약",
			href: "/cruise",
			subItems: []
		},
		{
			title: "인천섬여행상품",
			href: "/island",
			subItems: [
				{ title: "인천섬 소개", href: "/island/introduction" },
				{ title: "월미도 주변관광지", href: "/island/attractions" }
			]
		},
		{
			title: "단체 여행 및 이용안내",
			href: "/group",
			subItems: []
		},
		{
			title: "고객센터",
			href: "/customer",
			subItems: [
				{ title: "공지사항", href: "/customer/notice" },
				{ title: "자주 묻는 질문", href: "/customer/faq" },
				{ title: "묻고 답하기", href: "/customer/qna" }
			]
		},
		{
			title: "이벤트",
			href: "/event",
			subItems: [
				{ title: "이벤트SNS", href: "/event/sns" },
				{ title: "크루즈 리뷰", href: "/event/reviews" }
			]
		}
	];

	return (
		<header className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			{/* 유틸리티 메뉴 */}
			<div className="bg-slate-50 border-b">
				<div className="container mx-auto px-4">
					<div className="flex justify-end items-center h-10 text-sm">
						<div className="flex items-center space-x-4">
							<Link href="/login" className="flex items-center text-gray-600 hover:text-gray-900">
								<User className="w-4 h-4 mr-1" />
								로그인
							</Link>
							<span className="text-gray-300">|</span>
							<Link href="/signup" className="text-gray-600 hover:text-gray-900">
								회원가입
							</Link>
							<span className="text-gray-300">|</span>
							<Link href="/customer" className="text-gray-600 hover:text-gray-900">
								고객센터
							</Link>
							<span className="text-gray-300">|</span>
							<Link href="/reservation-inquiry" className="flex items-center text-gray-600 hover:text-gray-900">
								<Search className="w-4 h-4 mr-1" />
								예약조회
							</Link>
							<span className="text-gray-300">|</span>
							
							{/* 위시리스트 아이콘 */}
							<Link href="/wishlist" className="relative flex items-center text-gray-600 hover:text-gray-900">
								<Heart className="w-4 h-4" />
								{wishlistItems > 0 && (
									<Badge 
										variant="destructive" 
										className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center text-xs bg-red-500 hover:bg-red-500"
									>
										{wishlistItems > 99 ? '99+' : wishlistItems}
									</Badge>
								)}
							</Link>
							
							{/* 장바구니 아이콘 */}
							<Link href="/cart" className="relative flex items-center text-gray-600 hover:text-gray-900">
								<ShoppingCart className="w-4 h-4" />
								{cartItems > 0 && (
									<Badge 
										variant="destructive" 
										className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center text-xs bg-[#005BAC] hover:bg-[#005BAC]"
									>
										{cartItems > 99 ? '99+' : cartItems}
									</Badge>
								)}
							</Link>
							
							<Button 
								size="sm" 
								className="bg-[#03C75A] hover:bg-[#02b850] text-white ml-4"
								asChild
							>
								<Link href="https://booking.naver.com" target="_blank" rel="noopener noreferrer">
									<Calendar className="w-4 h-4 mr-1" />
									네이버 예약
								</Link>
							</Button>
						</div>
					</div>
				</div>
			</div>

			{/* 메인 헤더 */}
			<div className="bg-white">
				<div className="container mx-auto px-4">
					<div className="flex items-center justify-between h-16">
						{/* 로고 */}
						<Link href="/" className="flex items-center space-x-2">
							<div className="text-2xl font-bold text-[#005BAC]">
								월미도 해양관광
							</div>
						</Link>

						{/* 데스크톱 네비게이션 */}
						<nav className="hidden lg:flex">
							<ul className="flex items-center space-x-8">
								{mainMenuItems.map((item, index) => (
									<li key={item.href} className="relative group">
										<Link 
											href={item.href}
											className="text-base font-medium text-gray-700 hover:text-[#005BAC] py-2 px-4 transition-colors duration-200 block whitespace-nowrap"
										>
											{item.title}
										</Link>
										
										{/* 개별 메뉴 호버 시 2차 메뉴 표시 */}
										{item.subItems.length > 0 && (
											<div className="absolute top-full left-0 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50 min-w-max">
												<ul className="py-2">
													{item.subItems.map((subItem, subIndex) => (
														<li key={subItem.href}>
															<Link
																href={subItem.href}
																className="block text-sm text-gray-600 hover:text-[#005BAC] hover:bg-blue-50 transition-all duration-200 py-2 px-4 whitespace-nowrap"
															>
																{subItem.title}
															</Link>
														</li>
													))}
												</ul>
											</div>
										)}
									</li>
								))}
							</ul>
						</nav>

						{/* 연락처 및 모바일 메뉴 */}
						<div className="flex items-center space-x-4">
							<div className="hidden md:flex items-center text-[#005BAC] font-semibold">
								<Phone className="w-4 h-4 mr-2" />
								<span>032-123-4567</span>
							</div>

							{/* 모바일 메뉴 */}
							<Sheet open={isOpen} onOpenChange={setIsOpen}>
								<SheetTrigger asChild>
									<Button variant="ghost" size="icon" className="lg:hidden">
										<Menu className="h-6 w-6" />
									</Button>
								</SheetTrigger>
								<SheetContent side="right" className="w-80">
									<div className="py-6">
										<div className="mb-6">
											<h2 className="text-lg font-semibold text-[#005BAC]">메뉴</h2>
										</div>
										<nav className="space-y-4">
											{mainMenuItems.map((item) => (
												<div key={item.href} className="space-y-2">
													<div className="font-medium text-gray-900 border-b pb-2">
														{item.title}
													</div>
													{item.subItems.length > 0 && (
														<div className="pl-4 space-y-2">
															{item.subItems.map((subItem) => (
																<Link
																	key={subItem.href}
																	href={subItem.href}
																	className="block text-sm text-gray-600 hover:text-[#005BAC] py-1"
																	onClick={() => setIsOpen(false)}
																>
																	{subItem.title}
																</Link>
															))}
														</div>
													)}
												</div>
											))}
										</nav>
										
										{/* 모바일 유틸리티 메뉴 */}
										<div className="mt-8 pt-6 border-t space-y-3">
											{/* 장바구니 & 위시리스트 */}
											<div className="flex space-x-3">
												<Button 
													variant="outline" 
													className="flex-1 border-red-200 text-red-600 hover:bg-red-50" 
													asChild
												>
													<Link href="/wishlist" onClick={() => setIsOpen(false)}>
														<Heart className="w-4 h-4 mr-2" />
														관심상품 ({wishlistItems})
													</Link>
												</Button>
												<Button 
													variant="outline" 
													className="flex-1 border-[#005BAC] text-[#005BAC] hover:bg-blue-50" 
													asChild
												>
													<Link href="/cart" onClick={() => setIsOpen(false)}>
														<ShoppingCart className="w-4 h-4 mr-2" />
														장바구니 ({cartItems})
													</Link>
												</Button>
											</div>
											
											<Button className="w-full bg-[#03C75A] hover:bg-[#02b850]" asChild>
												<Link href="https://booking.naver.com" target="_blank">
													네이버 예약 바로가기
												</Link>
											</Button>
											<div className="flex justify-center space-x-4 text-sm">
												<Link href="/login" className="text-gray-600">로그인</Link>
												<Link href="/signup" className="text-gray-600">회원가입</Link>
												<Link href="/reservation-inquiry" className="text-gray-600">예약조회</Link>
											</div>
										</div>
									</div>
								</SheetContent>
							</Sheet>
						</div>
					</div>
				</div>


			</div>
		</header>
	);
};

export default Header;
