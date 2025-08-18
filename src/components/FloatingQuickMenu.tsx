"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Ship, Calendar } from "lucide-react";
import Link from "next/link";

const FloatingQuickMenu = () => {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const toggleVisibility = () => {
			if (window.pageYOffset > 300) {
				setIsVisible(true);
			} else {
				setIsVisible(false);
			}
		};

		window.addEventListener('scroll', toggleVisibility);
		return () => window.removeEventListener('scroll', toggleVisibility);
	}, []);

	if (!isVisible) return null;

	return (
		<div className="fixed right-4 bottom-4 z-50 flex flex-col space-y-3">
			{/* 네이버 예약 바로가기 */}
			<Button
				size="icon"
				className="w-12 h-12 md:w-15 md:h-15 bg-[#03C75A] hover:bg-[#02b850] text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 rounded-full"
				asChild
			>
				<Link 
					href="https://booking.naver.com" 
					target="_blank" 
					rel="noopener noreferrer"
					title="네이버 예약 바로가기"
				>
					<div className="flex flex-col items-center justify-center">
						<Calendar className="w-5 h-5 md:w-6 md:h-6" />
						<span className="text-xs font-bold mt-0.5">N</span>
					</div>
				</Link>
			</Button>

			{/* 고려고속훼리 바로가기 */}
			<Button
				size="icon"
				className="w-12 h-12 md:w-15 md:h-15 bg-[#005BAC] hover:bg-[#004494] text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 rounded-full"
				asChild
			>
				<Link 
					href="https://www.koreaferry.co.kr" 
					target="_blank" 
					rel="noopener noreferrer"
					title="고려고속훼리 바로가기"
				>
					<Ship className="w-5 h-5 md:w-6 md:h-6" />
				</Link>
			</Button>

			{/* 위로 가기 버튼 */}
			<Button
				size="icon"
				variant="outline"
				className="w-12 h-12 md:w-15 md:h-15 bg-white/90 hover:bg-white border-gray-300 text-gray-600 hover:text-gray-900 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 rounded-full"
				onClick={() => {
					window.scrollTo({
						top: 0,
						behavior: 'smooth'
					});
				}}
				title="맨 위로 가기"
			>
				<svg 
					className="w-5 h-5 md:w-6 md:h-6" 
					fill="none" 
					stroke="currentColor" 
					viewBox="0 0 24 24"
				>
					<path 
						strokeLinecap="round" 
						strokeLinejoin="round" 
						strokeWidth={2} 
						d="M5 10l7-7m0 0l7 7m-7-7v18" 
					/>
				</svg>
			</Button>
		</div>
	);
};

export default FloatingQuickMenu;

