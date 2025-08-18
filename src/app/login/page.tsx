"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingQuickMenu from "@/components/FloatingQuickMenu";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, User, Lock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
	const [formData, setFormData] = useState({
		username: "",
		password: ""
	});
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [rememberMe, setRememberMe] = useState(false);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		// 유효성 검사
		if (!formData.username.trim()) {
			alert('아이디를 입력해주세요.');
			setIsLoading(false);
			return;
		}
		if (!formData.password.trim()) {
			alert('비밀번호를 입력해주세요.');
			setIsLoading(false);
			return;
		}

		try {
			// 실제로는 여기서 API 호출
			console.log('Login attempt:', formData, { rememberMe });
			
			// 로그인 시뮬레이션
			await new Promise(resolve => setTimeout(resolve, 1000));
			
			alert('로그인 성공!');
			// 실제로는 홈페이지로 리다이렉트
			window.location.href = '/';
		} catch (error) {
			console.error('Login error:', error);
			alert('로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.');
		} finally {
			setIsLoading(false);
		}
	};

	const handleSocialLogin = (provider: 'kakao' | 'naver') => {
		// 실제로는 각 플랫폼의 OAuth URL로 리다이렉트
		console.log(`${provider} 로그인 시도`);
		
		if (provider === 'kakao') {
			// window.location.href = 'https://kauth.kakao.com/oauth/authorize?...';
			alert('카카오톡 로그인 준비 중입니다.');
		} else if (provider === 'naver') {
			// window.location.href = 'https://nid.naver.com/oauth2.0/authorize?...';
			alert('네이버 로그인 준비 중입니다.');
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
			<Header />
			<main className="pt-[106px] pb-16"> {/* 헤더 높이만큼 상단 여백 */}
				<div className="w-full max-w-md mx-auto px-4 py-16">
					{/* 로고 및 제목 */}
					<div className="text-center mb-8">
						<div className="w-20 h-20 bg-[#005BAC] rounded-full flex items-center justify-center mx-auto mb-6">
							<span className="text-white text-2xl font-bold">월</span>
						</div>
						<h1 className="text-3xl font-bold text-gray-900 mb-2">로그인</h1>
						<p className="text-gray-600">월미도 해양관광에 오신 것을 환영합니다</p>
					</div>

					{/* 로그인 폼 */}
					<Card className="shadow-lg">
						<CardContent className="p-8">
							<form onSubmit={handleSubmit} className="space-y-6">
								{/* 아이디 입력 */}
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										아이디
									</label>
									<div className="relative">
										<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
											<User className="h-5 w-5 text-gray-400" />
										</div>
										<input
											type="text"
											name="username"
											value={formData.username}
											onChange={handleInputChange}
											className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none"
											placeholder="아이디를 입력하세요"
											required
										/>
									</div>
								</div>

								{/* 비밀번호 입력 */}
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										비밀번호
									</label>
									<div className="relative">
										<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
											<Lock className="h-5 w-5 text-gray-400" />
										</div>
										<input
											type={showPassword ? "text" : "password"}
											name="password"
											value={formData.password}
											onChange={handleInputChange}
											className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none"
											placeholder="비밀번호를 입력하세요"
											required
										/>
										<button
											type="button"
											className="absolute inset-y-0 right-0 pr-3 flex items-center"
											onClick={() => setShowPassword(!showPassword)}
										>
											{showPassword ? (
												<EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
											) : (
												<Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
											)}
										</button>
									</div>
								</div>

								{/* 로그인 유지 */}
								<div className="flex items-center justify-between">
									<div className="flex items-center">
										<input
											id="remember-me"
											name="remember-me"
											type="checkbox"
											checked={rememberMe}
											onChange={(e) => setRememberMe(e.target.checked)}
											className="h-4 w-4 text-[#005BAC] focus:ring-[#005BAC] border-gray-300 rounded"
										/>
										<label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
											로그인 유지
										</label>
									</div>
									<Link href="/forgot-password" className="text-sm text-[#005BAC] hover:text-[#004494]">
										비밀번호 찾기
									</Link>
								</div>

								{/* 로그인 버튼 */}
								<Button
									type="submit"
									disabled={isLoading}
									className="w-full bg-[#005BAC] hover:bg-[#004494] text-white py-3 text-lg font-semibold flex items-center justify-center space-x-2"
								>
									{isLoading ? (
										<div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
									) : (
										<>
											<span>로그인</span>
											<ArrowRight className="w-5 h-5" />
										</>
									)}
								</Button>
							</form>

							{/* 구분선 */}
							<div className="mt-8 mb-6">
								<div className="relative">
									<div className="absolute inset-0 flex items-center">
										<div className="w-full border-t border-gray-300" />
									</div>
									<div className="relative flex justify-center text-sm">
										<span className="px-4 bg-white text-gray-500">또는</span>
									</div>
								</div>
							</div>

							{/* SNS 로그인 */}
							<div className="space-y-3">
								{/* 카카오톡 로그인 */}
								<Button
									type="button"
									onClick={() => handleSocialLogin('kakao')}
									className="w-full bg-[#FEE500] hover:bg-[#FADA0A] text-black font-semibold py-3 flex items-center justify-center space-x-3"
								>
									<div className="w-5 h-5 bg-[#3C1E1E] rounded-sm flex items-center justify-center">
										<span className="text-[#FEE500] text-xs font-bold">K</span>
									</div>
									<span>카카오톡으로 로그인</span>
								</Button>

								{/* 네이버 로그인 */}
								<Button
									type="button"
									onClick={() => handleSocialLogin('naver')}
									className="w-full bg-[#03C75A] hover:bg-[#02b850] text-white font-semibold py-3 flex items-center justify-center space-x-3"
								>
									<div className="w-5 h-5 bg-white rounded-sm flex items-center justify-center">
										<span className="text-[#03C75A] text-xs font-bold">N</span>
									</div>
									<span>네이버로 로그인</span>
								</Button>
							</div>

							{/* 회원가입 링크 */}
							<div className="mt-8 text-center">
								<p className="text-sm text-gray-600">
									아직 회원이 아니신가요?{' '}
									<Link href="/signup" className="text-[#005BAC] hover:text-[#004494] font-semibold">
										회원가입
									</Link>
								</p>
							</div>
						</CardContent>
					</Card>

					{/* 고객센터 안내 */}
					<div className="mt-8 text-center">
						<Card className="bg-blue-50 border-blue-200">
							<CardContent className="p-4">
								<p className="text-sm text-gray-700">
									로그인에 문제가 있으신가요?<br />
									고객센터: <span className="font-semibold text-[#005BAC]">032-123-4567</span>
								</p>
							</CardContent>
						</Card>
					</div>
				</div>
			</main>
			<Footer />
			<FloatingQuickMenu />
		</div>
	);
}


