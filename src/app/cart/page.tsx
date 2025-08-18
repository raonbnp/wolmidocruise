"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/useCart";
import { 
	ShoppingCart, 
	Minus, 
	Plus, 
	Trash2, 
	Calendar, 
	Clock, 
	Users, 
	CreditCard,
	ArrowLeft,
	AlertCircle
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function CartPage() {
	const { 
		cartItems, 
		totalItems, 
		totalAmount, 
		totalPersons,
		removeFromCart, 
		updateQuantity, 
		clearCart 
	} = useCart();

	const [isLoading, setIsLoading] = useState(false);

	// 수량 변경 핸들러
	const handleQuantityChange = (
		itemId: string, 
		type: 'adult' | 'child' | 'infant', 
		change: number,
		currentAdult: number,
		currentChild: number,
		currentInfant: number
	) => {
		let newAdult = currentAdult;
		let newChild = currentChild;
		let newInfant = currentInfant;

		switch (type) {
			case 'adult':
				newAdult = Math.max(0, currentAdult + change);
				break;
			case 'child':
				newChild = Math.max(0, currentChild + change);
				break;
			case 'infant':
				newInfant = Math.max(0, currentInfant + change);
				break;
		}

		updateQuantity(itemId, newAdult, newChild, newInfant);
	};

	// 결제 진행
	const handleCheckout = () => {
		if (cartItems.length === 0) return;
		
		setIsLoading(true);
		// 결제 페이지로 이동하거나 결제 모달 표시
		setTimeout(() => {
			setIsLoading(false);
			// 실제로는 결제 페이지로 이동
			window.location.href = '/checkout';
		}, 1000);
	};

	// 날짜 포맷팅
	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString('ko-KR', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			weekday: 'short'
		});
	};

	// 가격 포맷팅
	const formatPrice = (price: number) => {
		return price.toLocaleString('ko-KR');
	};

	if (cartItems.length === 0) {
		return (
			<div className="min-h-screen pt-32 pb-16">
				<div className="container mx-auto px-4">
					{/* 빈 장바구니 */}
					<div className="max-w-md mx-auto text-center">
						<div className="mb-8">
							<ShoppingCart className="w-24 h-24 mx-auto text-gray-300 mb-4" />
							<h1 className="text-2xl font-bold text-gray-900 mb-2">장바구니가 비어있습니다</h1>
							<p className="text-gray-600">원하는 크루즈 상품을 장바구니에 담아보세요</p>
						</div>
						
						<div className="space-y-3">
							<Button className="w-full bg-[#005BAC] hover:bg-[#004494]" asChild>
								<Link href="/cruise">
									크루즈 상품 보러가기
								</Link>
							</Button>
							<Button variant="outline" className="w-full" asChild>
								<Link href="/">
									홈으로 돌아가기
								</Link>
							</Button>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen pt-32 pb-16 bg-gray-50">
			<div className="container mx-auto px-4">
				{/* 헤더 */}
				<div className="mb-8">
					<div className="flex items-center justify-between mb-4">
						<div className="flex items-center">
							<Button variant="ghost" size="sm" asChild>
								<Link href="/cruise" className="mr-4">
									<ArrowLeft className="w-4 h-4 mr-2" />
									상품 목록으로
								</Link>
							</Button>
							<h1 className="text-3xl font-bold text-gray-900">장바구니</h1>
						</div>
						{cartItems.length > 0 && (
							<Button 
								variant="outline" 
								size="sm" 
								onClick={clearCart}
								className="text-red-600 border-red-200 hover:bg-red-50"
							>
								<Trash2 className="w-4 h-4 mr-2" />
								전체 삭제
							</Button>
						)}
					</div>
					<p className="text-gray-600">
						총 <span className="font-semibold text-[#005BAC]">{totalItems}개</span> 상품이 담겨있습니다
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* 장바구니 아이템 목록 */}
					<div className="lg:col-span-2 space-y-4">
						{cartItems.map((item) => (
							<Card key={item.id} className="overflow-hidden">
								<CardContent className="p-6">
									<div className="flex flex-col md:flex-row gap-6">
										{/* 상품 이미지 */}
										<div className="flex-shrink-0">
											<div className="relative w-full md:w-32 h-48 md:h-32 rounded-lg overflow-hidden bg-gray-100">
												<Image
													src={item.productImage}
													alt={item.productName}
													fill
													className="object-cover"
													onError={(e) => {
														const target = e.target as HTMLImageElement;
														target.src = `https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=200&fit=crop&crop=center`;
													}}
												/>
											</div>
										</div>

										{/* 상품 정보 */}
										<div className="flex-1">
											<div className="flex justify-between items-start mb-4">
												<div>
													<h3 className="text-lg font-semibold text-gray-900 mb-2">
														{item.productName}
													</h3>
													<div className="flex flex-wrap gap-4 text-sm text-gray-600">
														<div className="flex items-center">
															<Calendar className="w-4 h-4 mr-1" />
															{formatDate(item.reservationDate)}
														</div>
														<div className="flex items-center">
															<Clock className="w-4 h-4 mr-1" />
															{item.reservationTime}
														</div>
													</div>
												</div>
												<Button
													variant="ghost"
													size="sm"
													onClick={() => removeFromCart(item.id)}
													className="text-red-600 hover:text-red-700 hover:bg-red-50"
												>
													<Trash2 className="w-4 h-4" />
												</Button>
											</div>

											{/* 인원 및 가격 정보 */}
											<div className="space-y-4">
												{/* 성인 */}
												{(item.adultCount > 0 || item.childCount === 0) && (
													<div className="flex items-center justify-between">
														<div className="flex items-center">
															<Users className="w-4 h-4 mr-2 text-gray-500" />
															<span className="text-sm text-gray-600 mr-4">성인</span>
															<span className="text-sm font-medium text-[#005BAC]">
																{formatPrice(item.adultPrice)}원
															</span>
														</div>
														<div className="flex items-center space-x-2">
															<Button
																variant="outline"
																size="sm"
																onClick={() => handleQuantityChange(
																	item.id, 'adult', -1,
																	item.adultCount, item.childCount, item.infantCount
																)}
																disabled={item.adultCount <= (item.childCount === 0 ? 1 : 0)}
																className="w-8 h-8 p-0"
															>
																<Minus className="w-3 h-3" />
															</Button>
															<span className="w-8 text-center font-medium">
																{item.adultCount}
															</span>
															<Button
																variant="outline"
																size="sm"
																onClick={() => handleQuantityChange(
																	item.id, 'adult', 1,
																	item.adultCount, item.childCount, item.infantCount
																)}
																className="w-8 h-8 p-0"
															>
																<Plus className="w-3 h-3" />
															</Button>
														</div>
													</div>
												)}

												{/* 소인 */}
												{item.childCount > 0 && (
													<div className="flex items-center justify-between">
														<div className="flex items-center">
															<Users className="w-4 h-4 mr-2 text-gray-500" />
															<span className="text-sm text-gray-600 mr-4">소인</span>
															<span className="text-sm font-medium text-[#005BAC]">
																{formatPrice(item.childPrice)}원
															</span>
														</div>
														<div className="flex items-center space-x-2">
															<Button
																variant="outline"
																size="sm"
																onClick={() => handleQuantityChange(
																	item.id, 'child', -1,
																	item.adultCount, item.childCount, item.infantCount
																)}
																disabled={item.childCount <= 0}
																className="w-8 h-8 p-0"
															>
																<Minus className="w-3 h-3" />
															</Button>
															<span className="w-8 text-center font-medium">
																{item.childCount}
															</span>
															<Button
																variant="outline"
																size="sm"
																onClick={() => handleQuantityChange(
																	item.id, 'child', 1,
																	item.adultCount, item.childCount, item.infantCount
																)}
																className="w-8 h-8 p-0"
															>
																<Plus className="w-3 h-3" />
															</Button>
														</div>
													</div>
												)}

												{/* 유아 */}
												{item.infantCount > 0 && (
													<div className="flex items-center justify-between">
														<div className="flex items-center">
															<Users className="w-4 h-4 mr-2 text-gray-500" />
															<span className="text-sm text-gray-600 mr-4">유아</span>
															<span className="text-sm font-medium text-green-600">무료</span>
														</div>
														<div className="flex items-center space-x-2">
															<Button
																variant="outline"
																size="sm"
																onClick={() => handleQuantityChange(
																	item.id, 'infant', -1,
																	item.adultCount, item.childCount, item.infantCount
																)}
																disabled={item.infantCount <= 0}
																className="w-8 h-8 p-0"
															>
																<Minus className="w-3 h-3" />
															</Button>
															<span className="w-8 text-center font-medium">
																{item.infantCount}
															</span>
															<Button
																variant="outline"
																size="sm"
																onClick={() => handleQuantityChange(
																	item.id, 'infant', 1,
																	item.adultCount, item.childCount, item.infantCount
																)}
																className="w-8 h-8 p-0"
															>
																<Plus className="w-3 h-3" />
															</Button>
														</div>
													</div>
												)}

												{/* 소계 */}
												<div className="pt-4 border-t">
													<div className="flex justify-between items-center">
														<span className="text-sm text-gray-600">
															소계 (총 {item.totalPersons}명)
														</span>
														<span className="text-lg font-bold text-[#005BAC]">
															{formatPrice(item.totalPrice)}원
														</span>
													</div>
												</div>
											</div>
										</div>
									</div>
								</CardContent>
							</Card>
						))}
					</div>

					{/* 주문 요약 */}
					<div className="lg:col-span-1">
						<Card className="sticky top-8">
							<CardHeader>
								<CardTitle className="flex items-center">
									<CreditCard className="w-5 h-5 mr-2" />
									주문 요약
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="space-y-3">
									<div className="flex justify-between">
										<span className="text-gray-600">상품 수량</span>
										<span className="font-medium">{totalItems}개</span>
									</div>
									<div className="flex justify-between">
										<span className="text-gray-600">총 인원</span>
										<span className="font-medium">{totalPersons}명</span>
									</div>
									<div className="border-t pt-3">
										<div className="flex justify-between items-center">
											<span className="text-lg font-semibold">총 결제금액</span>
											<span className="text-2xl font-bold text-[#005BAC]">
												{formatPrice(totalAmount)}원
											</span>
										</div>
									</div>
								</div>

								{/* 주의사항 */}
								<div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
									<div className="flex items-start">
										<AlertCircle className="w-4 h-4 text-amber-600 mr-2 mt-0.5 flex-shrink-0" />
										<div className="text-sm text-amber-800">
											<p className="font-medium mb-1">예약 전 확인사항</p>
											<ul className="space-y-1 text-xs">
												<li>• 날씨에 따라 운항이 취소될 수 있습니다</li>
												<li>• 예약 변경은 이용일 1일 전까지 가능합니다</li>
												<li>• 유아는 만 3세 미만으로 무료입니다</li>
											</ul>
										</div>
									</div>
								</div>

								{/* 결제 버튼 */}
								<div className="space-y-3">
									<Button 
										className="w-full bg-[#005BAC] hover:bg-[#004494] text-white h-12 text-lg"
										onClick={handleCheckout}
										disabled={isLoading || totalItems === 0}
									>
										{isLoading ? '처리 중...' : `${formatPrice(totalAmount)}원 결제하기`}
									</Button>
									<Button 
										variant="outline" 
										className="w-full border-[#03C75A] text-[#03C75A] hover:bg-[#03C75A] hover:text-white"
										asChild
									>
										<Link href="https://booking.naver.com" target="_blank">
											네이버 예약으로 결제
										</Link>
									</Button>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
}
