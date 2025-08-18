"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Product {
	id: number;
	name: string;
	adultSalePrice: number;
	childSalePrice: number;
}

interface BookingFormProps {
	product: Product;
}

export default function BookingForm({ product }: BookingFormProps) {
	const [selectedYear, setSelectedYear] = useState<string>("");
	const [selectedMonth, setSelectedMonth] = useState<string>("");
	const [selectedDay, setSelectedDay] = useState<string>("");
	const [selectedTime, setSelectedTime] = useState<string>("");
	const [adultCount, setAdultCount] = useState<number>(0);
	const [childCount, setChildCount] = useState<number>(0);
	const [infantCount, setInfantCount] = useState<number>(0);

	// 총 결제 금액 계산
	const totalAmount = (adultCount * product.adultSalePrice) + (childCount * product.childSalePrice);

	const formatPrice = (price: number) => {
		return price.toLocaleString('ko-KR');
	};

	// 년도 옵션 (현재 년도부터 1년 후까지)
	const currentYear = new Date().getFullYear();
	const years = [currentYear, currentYear + 1];

	// 월 옵션 (1-12월)
	const months = Array.from({ length: 12 }, (_, i) => i + 1);

	// 일 옵션 (1-31일) - 추후 월별로 다르게 설정 가능
	const days = Array.from({ length: 31 }, (_, i) => i + 1);

	// 시간 옵션 (9시-18시)
	const times = [
		"09:00", "10:00", "11:00", "12:00", "13:00", 
		"14:00", "15:00", "16:00", "17:00", "18:00"
	];

	// 인원수 옵션
	const adultOptions = Array.from({ length: 11 }, (_, i) => i); // 0-10명
	const childOptions = Array.from({ length: 11 }, (_, i) => i); // 0-10명
	const infantOptions = Array.from({ length: 4 }, (_, i) => i); // 0-3명

	return (
		<div className="space-y-6">
			{/* 이용일자 선택 */}
			<div>
				<label className="block text-sm font-medium text-gray-700 mb-3">
					이용일자
				</label>
				<div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
					{/* 년도 */}
					<div>
						<label className="block text-xs text-gray-500 mb-1">년도</label>
						<select 
							value={selectedYear} 
							onChange={(e) => setSelectedYear(e.target.value)}
							className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#005BAC] focus:border-[#005BAC]"
							aria-label="년도 선택"
						>
							<option value="">선택</option>
							{years.map(year => (
								<option key={year} value={year}>{year}년</option>
							))}
						</select>
					</div>

					{/* 월 */}
					<div>
						<label className="block text-xs text-gray-500 mb-1">월</label>
						<select 
							value={selectedMonth} 
							onChange={(e) => setSelectedMonth(e.target.value)}
							className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#005BAC] focus:border-[#005BAC]"
							aria-label="월 선택"
						>
							<option value="">선택</option>
							{months.map(month => (
								<option key={month} value={month}>{month}월</option>
							))}
						</select>
					</div>

					{/* 일 */}
					<div>
						<label className="block text-xs text-gray-500 mb-1">일</label>
						<select 
							value={selectedDay} 
							onChange={(e) => setSelectedDay(e.target.value)}
							className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#005BAC] focus:border-[#005BAC]"
							aria-label="일 선택"
						>
							<option value="">선택</option>
							{days.map(day => (
								<option key={day} value={day}>{day}일</option>
							))}
						</select>
					</div>

					{/* 시간 */}
					<div>
						<label className="block text-xs text-gray-500 mb-1">시간</label>
						<select 
							value={selectedTime} 
							onChange={(e) => setSelectedTime(e.target.value)}
							className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#005BAC] focus:border-[#005BAC]"
							aria-label="시간 선택"
						>
							<option value="">선택</option>
							{times.map(time => (
								<option key={time} value={time}>{time}</option>
							))}
						</select>
					</div>
				</div>
			</div>

			{/* 인원 선택 */}
			<div>
				<label className="block text-sm font-medium text-gray-700 mb-3">
					인원 선택
				</label>
				<div className="space-y-4">
					{/* 대인 */}
					<div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
						<div className="flex items-center space-x-4">
							<span className="font-medium text-gray-700">대인</span>
							<select 
								value={adultCount} 
								onChange={(e) => setAdultCount(Number(e.target.value))}
								className="p-2 border border-gray-300 rounded-md focus:ring-[#005BAC] focus:border-[#005BAC]"
								aria-label="대인 인원 선택"
							>
								{adultOptions.map(count => (
									<option key={count} value={count}>{count}명</option>
								))}
							</select>
						</div>
						<div className="text-right">
							<span className="text-lg font-bold text-[#005BAC]">
								{formatPrice(adultCount * product.adultSalePrice)}원
							</span>
						</div>
					</div>

					{/* 소인 */}
					<div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
						<div className="flex items-center space-x-4">
							<span className="font-medium text-gray-700">소인</span>
							<select 
								value={childCount} 
								onChange={(e) => setChildCount(Number(e.target.value))}
								className="p-2 border border-gray-300 rounded-md focus:ring-[#005BAC] focus:border-[#005BAC]"
								aria-label="소인 인원 선택"
							>
								{childOptions.map(count => (
									<option key={count} value={count}>{count}명</option>
								))}
							</select>
						</div>
						<div className="text-right">
							<span className="text-lg font-bold text-[#005BAC]">
								{formatPrice(childCount * product.childSalePrice)}원
							</span>
						</div>
					</div>

					{/* 유아 */}
					<div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
						<div className="flex items-center space-x-4">
							<span className="font-medium text-gray-700">유아 (48개월 미만)</span>
							<select 
								value={infantCount} 
								onChange={(e) => setInfantCount(Number(e.target.value))}
								className="p-2 border border-gray-300 rounded-md focus:ring-[#005BAC] focus:border-[#005BAC]"
								aria-label="유아 인원 선택"
							>
								{infantOptions.map(count => (
									<option key={count} value={count}>{count}명</option>
								))}
							</select>
						</div>
						<div className="text-right">
							<span className="text-lg font-bold text-gray-500">
								무료
							</span>
						</div>
					</div>
				</div>
			</div>

			{/* 총 결제 금액 */}
			<div>
				<label className="block text-sm font-medium text-gray-700 mb-3">
					총 결제 금액
				</label>
				<div className="p-5 bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-[#005BAC] rounded-lg">
					<div className="text-center">
						<div className="text-sm text-gray-600 mb-2">최종 결제 금액</div>
						<div className="text-3xl font-bold text-[#005BAC]">
							{formatPrice(totalAmount)}원
						</div>
						{totalAmount > 0 && (
							<div className="text-sm text-gray-500 mt-2">
								대인 {adultCount}명 + 소인 {childCount}명 + 유아 {infantCount}명
							</div>
						)}
					</div>
				</div>
			</div>

			{/* 구매 버튼들 */}
			<div className="space-y-4 mt-8">
				{/* 첫 번째 줄: 바로구매, 장바구니, 관심상품 */}
				<div className="grid grid-cols-3 gap-3">
					{/* 바로구매 */}
					<Button 
						className="bg-[#FF5722] hover:bg-[#e64a19] text-white font-bold py-8 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]" 
						disabled={!selectedYear || !selectedMonth || !selectedDay || !selectedTime || totalAmount === 0}
					>
						바로구매
					</Button>

					{/* 장바구니 */}
					<Button 
						variant="outline"
						className="border-2 border-[#005BAC] text-[#005BAC] hover:bg-[#005BAC] hover:text-white font-bold py-8 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]" 
						disabled={!selectedYear || !selectedMonth || !selectedDay || !selectedTime || totalAmount === 0}
					>
						장바구니
					</Button>

					{/* 관심상품 */}
					<Button 
						variant="outline"
						className="border-2 border-gray-400 text-gray-600 hover:bg-gray-100 font-bold py-8 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]" 
						disabled={!selectedYear || !selectedMonth || !selectedDay || !selectedTime || totalAmount === 0}
					>
						관심상품
					</Button>
				</div>

				{/* 두 번째 줄: 네이버 예약 */}
				<Button 
					className="w-full bg-[#03C75A] hover:bg-[#02b850] text-white text-xl font-bold py-10 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]" 
					disabled={!selectedYear || !selectedMonth || !selectedDay || !selectedTime || totalAmount === 0}
					asChild
				>
					<a href="https://booking.naver.com" target="_blank" rel="noopener noreferrer">
						<span className="flex items-center justify-center space-x-2">
							<span className="bg-white text-[#03C75A] px-2 py-1 rounded font-black text-sm">N</span>
							<span>네이버로 예약하기</span>
						</span>
					</a>
				</Button>

				{/* 안내 메시지 */}
				{totalAmount === 0 && (
					<p className="text-center text-gray-500 text-sm mt-2">
						날짜와 인원을 모두 선택해주세요
					</p>
				)}
			</div>
		</div>
	);
}
