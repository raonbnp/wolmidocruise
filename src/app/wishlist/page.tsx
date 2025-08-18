"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useWishlist } from "@/hooks/useWishlist";
import { useCart } from "@/hooks/useCart";
import { 
	Heart, 
	ShoppingCart, 
	Trash2, 
	Clock, 
	Users, 
	Star,
	ArrowLeft,
	Calendar,
	Plus
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function WishlistPage() {
	const { 
		wishlistItems, 
		totalItems, 
		removeFromWishlist, 
		clearWishlist 
	} = useWishlist();
	
	const { addToCart } = useCart();
	const [selectedDate, setSelectedDate] = useState('');
	const [selectedTime, setSelectedTime] = useState('');
	const [adultCount, setAdultCount] = useState(1);
	const [childCount, setChildCount] = useState(0);
	const [infantCount, setInfantCount] = useState(0);
	const [showBookingModal, setShowBookingModal] = useState<number | null>(null);

	// 장바구니에 추가
	const handleAddToCart = (productId: number) => {
		const product = wishlistItems.find(item => item.productId === productId);
		if (!product) return;

		if (!selectedDate || !selectedTime) {
			alert('예약일과 시간을 선택해주세요.');
			return;
		}

		if (adultCount === 0 && childCount === 0) {
			alert('최소 1명 이상 선택해주세요.');
			return;
		}

		const cruiseProduct = {
			id: product.productId,
			name: product.productName,
			description: '',
			duration: product.duration,
			schedule: product.schedule,
			adultPrice: product.adultPrice,
			childPrice: product.childPrice,
			image: product.productImage,
			isPopular: false,
			rating: product.rating,
			reviewCount: product.reviewCount,
			tags: product.tags
		};

		const success = addToCart(cruiseProduct, {
			productId: product.productId,
			reservationDate: selectedDate,
			reservationTime: selectedTime,
			adultCount,
			childCount,
			infantCount
		});

		if (success) {
			alert('장바구니에 추가되었습니다.');
			setShowBookingModal(null);
			// 초기화
			setSelectedDate('');
			setSelectedTime('');
			setAdultCount(1);
			setChildCount(0);
			setInfantCount(0);
		}
	};

	// 가격 포맷팅
	const formatPrice = (price: number) => {
		return price.toLocaleString('ko-KR');
	};

	// 날짜 포맷팅 (오늘부터 30일 후까지)
	const getAvailableDates = () => {
		const dates = [];
		const today = new Date();
		for (let i = 0; i < 30; i++) {
			const date = new Date(today);
			date.setDate(today.getDate() + i);
			dates.push(date.toISOString().split('T')[0]);
		}
		return dates;
	};

	// 시간 옵션
	const timeOptions = [
		'09:00', '10:00', '11:00', '12:00', '13:00', '14:00', 
		'15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
	];

	if (wishlistItems.length === 0) {
		return (
			<div className="min-h-screen pt-32 pb-16">
				<div className="container mx-auto px-4">
					{/* 빈 위시리스트 */}
					<div className="max-w-md mx-auto text-center">
						<div className="mb-8">
							<Heart className="w-24 h-24 mx-auto text-gray-300 mb-4" />
							<h1 className="text-2xl font-bold text-gray-900 mb-2">관심상품이 없습니다</h1>
							<p className="text-gray-600">마음에 드는 크루즈 상품을 찜해보세요</p>
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
							<h1 className="text-3xl font-bold text-gray-900">관심상품</h1>
						</div>
						{wishlistItems.length > 0 && (
							<Button 
								variant="outline" 
								size="sm" 
								onClick={clearWishlist}
								className="text-red-600 border-red-200 hover:bg-red-50"
							>
								<Trash2 className="w-4 h-4 mr-2" />
								전체 삭제
							</Button>
						)}
					</div>
					<p className="text-gray-600">
						총 <span className="font-semibold text-[#005BAC]">{totalItems}개</span> 상품을 찜하셨습니다
					</p>
				</div>

				{/* 위시리스트 아이템 목록 */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{wishlistItems.map((item) => (
						<Card key={item.productId} className="overflow-hidden hover:shadow-lg transition-shadow">
							<div className="relative">
								{/* 상품 이미지 */}
								<div className="relative w-full h-48 bg-gray-100">
									<Image
										src={item.productImage}
										alt={item.productName}
										fill
										className="object-cover"
										onError={(e) => {
											const target = e.target as HTMLImageElement;
											target.src = `https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop&crop=center`;
										}}
									/>
								</div>
								
								{/* 찜 제거 버튼 */}
								<Button
									variant="ghost"
									size="sm"
									onClick={() => removeFromWishlist(item.productId)}
									className="absolute top-2 right-2 bg-white/80 hover:bg-white text-red-600 hover:text-red-700"
								>
									<Heart className="w-4 h-4 fill-current" />
								</Button>
							</div>

							<CardContent className="p-6">
								{/* 상품명 */}
								<h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
									{item.productName}
								</h3>

								{/* 태그 */}
								{item.tags && item.tags.length > 0 && (
									<div className="flex flex-wrap gap-1 mb-3">
										{item.tags.slice(0, 3).map((tag, index) => (
											<Badge 
												key={index} 
												variant="secondary" 
												className="text-xs bg-blue-50 text-[#005BAC]"
											>
												{tag}
											</Badge>
										))}
									</div>
								)}

								{/* 상품 정보 */}
								<div className="space-y-2 mb-4">
									<div className="flex items-center text-sm text-gray-600">
										<Clock className="w-4 h-4 mr-2" />
										{item.duration}
									</div>
									<div className="flex items-center text-sm text-gray-600">
										<Calendar className="w-4 h-4 mr-2" />
										{item.schedule}
									</div>
									<div className="flex items-center text-sm text-gray-600">
										<Star className="w-4 h-4 mr-2 fill-yellow-400 text-yellow-400" />
										{item.rating} ({item.reviewCount}개 리뷰)
									</div>
								</div>

								{/* 가격 정보 */}
								<div className="bg-slate-50 p-3 rounded-lg mb-4">
									<div className="flex justify-between items-center">
										<div>
											<div className="flex items-center">
												<Users className="w-4 h-4 mr-1 text-gray-500" />
												<span className="text-sm text-gray-600">성인</span>
											</div>
											<div className="text-lg font-bold text-[#005BAC]">
												{formatPrice(item.adultPrice)}원
											</div>
										</div>
										<div>
											<div className="flex items-center justify-end">
												<Users className="w-4 h-4 mr-1 text-gray-500" />
												<span className="text-sm text-gray-600">소인</span>
											</div>
											<div className="text-lg font-bold text-[#005BAC]">
												{formatPrice(item.childPrice)}원
											</div>
										</div>
									</div>
								</div>

								{/* 버튼 */}
								<div className="space-y-2">
									<Button 
										className="w-full bg-[#005BAC] hover:bg-[#004494] text-white"
										asChild
									>
										<Link href={`/cruise/${item.productId}`}>
											자세히 보기
										</Link>
									</Button>
									<Button 
										variant="outline" 
										className="w-full border-[#FF5722] text-[#FF5722] hover:bg-[#FF5722] hover:text-white"
										onClick={() => setShowBookingModal(item.productId)}
									>
										<ShoppingCart className="w-4 h-4 mr-2" />
										장바구니 담기
									</Button>
								</div>
							</CardContent>
						</Card>
					))}
				</div>

				{/* 예약 모달 */}
				{showBookingModal && (
					<div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
						<div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
							<div className="p-6">
								<div className="flex items-center justify-between mb-6">
									<h3 className="text-lg font-semibold">예약 정보 입력</h3>
									<Button
										variant="ghost"
										size="sm"
										onClick={() => setShowBookingModal(null)}
									>
										×
									</Button>
								</div>

								<div className="space-y-4">
									{/* 예약일 선택 */}
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											예약일
										</label>
										<select
											value={selectedDate}
											onChange={(e) => setSelectedDate(e.target.value)}
											className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#005BAC] focus:border-transparent"
											title="예약일 선택"
										>
											<option value="">날짜를 선택하세요</option>
											{getAvailableDates().map((date) => {
												const dateObj = new Date(date);
												const formatted = dateObj.toLocaleDateString('ko-KR', {
													month: 'long',
													day: 'numeric',
													weekday: 'short'
												});
												return (
													<option key={date} value={date}>
														{formatted}
													</option>
												);
											})}
										</select>
									</div>

									{/* 예약시간 선택 */}
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											예약시간
										</label>
										<select
											value={selectedTime}
											onChange={(e) => setSelectedTime(e.target.value)}
											className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#005BAC] focus:border-transparent"
											title="예약시간 선택"
										>
											<option value="">시간을 선택하세요</option>
											{timeOptions.map((time) => (
												<option key={time} value={time}>
													{time}
												</option>
											))}
										</select>
									</div>

									{/* 인원 선택 */}
									<div className="space-y-3">
										<h4 className="text-sm font-medium text-gray-700">인원 선택</h4>
										
										{/* 성인 */}
										<div className="flex items-center justify-between">
											<span className="text-sm text-gray-600">성인</span>
											<div className="flex items-center space-x-2">
												<Button
													variant="outline"
													size="sm"
													onClick={() => setAdultCount(Math.max(0, adultCount - 1))}
													disabled={adultCount <= (childCount === 0 ? 1 : 0)}
													className="w-8 h-8 p-0"
												>
													<Plus className="w-3 h-3 rotate-45" />
												</Button>
												<span className="w-8 text-center">{adultCount}</span>
												<Button
													variant="outline"
													size="sm"
													onClick={() => setAdultCount(adultCount + 1)}
													className="w-8 h-8 p-0"
												>
													<Plus className="w-3 h-3" />
												</Button>
											</div>
										</div>

										{/* 소인 */}
										<div className="flex items-center justify-between">
											<span className="text-sm text-gray-600">소인</span>
											<div className="flex items-center space-x-2">
												<Button
													variant="outline"
													size="sm"
													onClick={() => setChildCount(Math.max(0, childCount - 1))}
													disabled={childCount <= 0}
													className="w-8 h-8 p-0"
												>
													<Plus className="w-3 h-3 rotate-45" />
												</Button>
												<span className="w-8 text-center">{childCount}</span>
												<Button
													variant="outline"
													size="sm"
													onClick={() => setChildCount(childCount + 1)}
													className="w-8 h-8 p-0"
												>
													<Plus className="w-3 h-3" />
												</Button>
											</div>
										</div>

										{/* 유아 */}
										<div className="flex items-center justify-between">
											<div>
												<span className="text-sm text-gray-600">유아</span>
												<span className="text-xs text-green-600 ml-1">(무료)</span>
											</div>
											<div className="flex items-center space-x-2">
												<Button
													variant="outline"
													size="sm"
													onClick={() => setInfantCount(Math.max(0, infantCount - 1))}
													disabled={infantCount <= 0}
													className="w-8 h-8 p-0"
												>
													<Plus className="w-3 h-3 rotate-45" />
												</Button>
												<span className="w-8 text-center">{infantCount}</span>
												<Button
													variant="outline"
													size="sm"
													onClick={() => setInfantCount(infantCount + 1)}
													className="w-8 h-8 p-0"
												>
													<Plus className="w-3 h-3" />
												</Button>
											</div>
										</div>
									</div>

									{/* 총 가격 */}
									{selectedDate && selectedTime && (adultCount > 0 || childCount > 0) && (
										<div className="bg-blue-50 p-3 rounded-lg">
											<div className="text-sm text-gray-600 mb-1">예상 결제금액</div>
											<div className="text-lg font-bold text-[#005BAC]">
												{formatPrice(
													adultCount * (wishlistItems.find(item => item.productId === showBookingModal)?.adultPrice || 0) +
													childCount * (wishlistItems.find(item => item.productId === showBookingModal)?.childPrice || 0)
												)}원
											</div>
											<div className="text-xs text-gray-500 mt-1">
												총 {adultCount + childCount + infantCount}명
											</div>
										</div>
									)}
								</div>

								{/* 버튼 */}
								<div className="flex space-x-3 mt-6">
									<Button 
										variant="outline" 
										className="flex-1"
										onClick={() => setShowBookingModal(null)}
									>
										취소
									</Button>
									<Button 
										className="flex-1 bg-[#005BAC] hover:bg-[#004494]"
										onClick={() => handleAddToCart(showBookingModal)}
									>
										장바구니 담기
									</Button>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
