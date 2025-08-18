"use client";

import { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const HeroSlider = () => {
	const swiperRef = useRef<any>(null);

	const slides = [
		{
			id: 1,
			concept: "불꽃 & 야경 크루즈",
			mainText: "밤바다 위의 낭만, 불꽃 크루즈",
			subText: "인천 하늘을 수놓는 불꽃과 함께 특별한 밤",
			ctaText: "불꽃 크루즈 예약하기",
			ctaLink: "/cruise/products/fireworks",
			bgGradient: "from-blue-900 via-purple-900 to-orange-600",
			textColor: "text-white"
		},
		{
			id: 2,
			concept: "갈매기 & 서해 바다체험",
			mainText: "갈매기와 함께하는 해상여행",
			subText: "서해 바다 위, 잊지 못할 즐거운 순간",
			ctaText: "행복 크루즈 예약하기",
			ctaLink: "/cruise/products/happy",
			bgGradient: "from-sky-400 via-blue-500 to-cyan-300",
			textColor: "text-white"
		},
		{
			id: 3,
			concept: "석양 & 로맨틱 크루즈",
			mainText: "서해 낙조의 절정",
			subText: "하늘과 바다가 하나 되는 순간",
			ctaText: "낙조 크루즈 예약하기",
			ctaLink: "/cruise/products/sunset",
			bgGradient: "from-orange-400 via-red-500 to-pink-500",
			textColor: "text-white"
		}
	];

	return (
		<section className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
			<Swiper
				ref={swiperRef}
				modules={[Navigation, Pagination, Autoplay, EffectFade]}
				spaceBetween={0}
				slidesPerView={1}
				effect="fade"
				autoplay={{
					delay: 5000,
					disableOnInteraction: false,
				}}
				pagination={{
					clickable: true,
					bulletClass: "swiper-pagination-bullet !bg-white/50",
					bulletActiveClass: "swiper-pagination-bullet-active !bg-white",
				}}
				navigation={{
					prevEl: ".hero-prev",
					nextEl: ".hero-next",
				}}
				loop={true}
				className="h-full"
			>
				{slides.map((slide) => (
					<SwiperSlide key={slide.id}>
						<div className={`relative h-full bg-gradient-to-br ${slide.bgGradient} flex items-center justify-center`}>
							{/* 배경 오버레이 */}
							<div className="absolute inset-0 bg-black/20" />
							
							{/* 콘텐츠 */}
							<div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
								<div className="mb-4">
									<span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium text-white">
										{slide.concept}
									</span>
								</div>
								
								<h3 className={`text-3xl md:text-5xl lg:text-6xl font-bold mb-6 ${slide.textColor} leading-tight`}>
									{slide.mainText}
								</h3>
								
								<p className={`text-lg md:text-xl lg:text-2xl mb-8 ${slide.textColor} opacity-90`}>
									{slide.subText}
								</p>
								
								<Button 
									size="lg" 
									className="bg-[#FF5722] hover:bg-[#e64a19] text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
									asChild
								>
									<a href={slide.ctaLink}>
										{slide.ctaText}
									</a>
								</Button>
							</div>

							{/* 장식적 요소들 */}
							<div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/30 to-transparent" />
							
							{/* 파도 효과 */}
							<div className="absolute bottom-0 left-0 w-full h-16 opacity-30">
								<svg 
									className="w-full h-full" 
									viewBox="0 0 1200 120" 
									preserveAspectRatio="none"
								>
									<path 
										d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
										opacity=".25" 
										fill="currentColor"
									/>
									<path 
										d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
										opacity=".5" 
										fill="currentColor"
									/>
									<path 
										d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" 
										fill="currentColor"
									/>
								</svg>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>

			{/* 네비게이션 버튼 */}
			<button 
				className="hero-prev absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 text-white transition-all duration-300 hover:scale-110"
				aria-label="이전 슬라이드"
			>
				<ChevronLeft className="w-6 h-6" />
			</button>
			<button 
				className="hero-next absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 text-white transition-all duration-300 hover:scale-110"
				aria-label="다음 슬라이드"
			>
				<ChevronRight className="w-6 h-6" />
			</button>

			{/* 페이지네이션 스타일 오버라이드 */}
			<style jsx global>{`
				.swiper-pagination {
					bottom: 20px !important;
				}
				.swiper-pagination-bullet {
					width: 12px !important;
					height: 12px !important;
					margin: 0 6px !important;
					opacity: 0.7 !important;
				}
				.swiper-pagination-bullet-active {
					opacity: 1 !important;
				}
			`}</style>
		</section>
	);
};

export default HeroSlider;
