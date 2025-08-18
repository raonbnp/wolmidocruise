import Header from "@/components/Header";
import HeroSlider from "@/components/HeroSlider";
import NoticeSection from "@/components/NoticeSection";
import ProductCards from "@/components/ProductCards";
import FloatingQuickMenu from "@/components/FloatingQuickMenu";
import Footer from "@/components/Footer";

export default function Home() {
	return (
		<div className="min-h-screen">
			<Header />
			<main className="pt-[106px]"> {/* 헤더 높이만큼 상단 여백 추가 (유틸리티 메뉴 40px + 메인 헤더 66px) */}
				<HeroSlider />
				<NoticeSection />
				<ProductCards />
			</main>
			<Footer />
			<FloatingQuickMenu />
		</div>
	);
}