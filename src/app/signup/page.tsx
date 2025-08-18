"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingQuickMenu from "@/components/FloatingQuickMenu";
import TermsModal from "@/components/TermsModal";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, User, Lock, Mail, Phone, UserCheck } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function SignupPage() {
	const [formData, setFormData] = useState({
		username: "",
		password: "",
		passwordConfirm: "",
		email: "",
		name: "",
		phone: ""
	});
	const [showPassword, setShowPassword] = useState(false);
	const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [agreements, setAgreements] = useState({
		terms: false,
		privacy: false
	});
	const [modalState, setModalState] = useState({
		isOpen: false,
		type: 'terms' as 'terms' | 'privacy'
	});

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value
		}));
	};

	const handleAgreementChange = (key: keyof typeof agreements) => {
		setAgreements(prev => ({
			...prev,
			[key]: !prev[key]
		}));
	};

	const openModal = (type: 'terms' | 'privacy') => {
		setModalState({ isOpen: true, type });
	};

	const closeModal = () => {
		setModalState({ isOpen: false, type: 'terms' });
	};

	const validateForm = () => {
		if (!formData.username.trim()) {
			alert('아이디를 입력해주세요.');
			return false;
		}
		if (formData.username.length < 4) {
			alert('아이디는 4자 이상이어야 합니다.');
			return false;
		}
		if (!formData.password.trim()) {
			alert('비밀번호를 입력해주세요.');
			return false;
		}
		if (formData.password.length < 6) {
			alert('비밀번호는 6자 이상이어야 합니다.');
			return false;
		}
		if (formData.password !== formData.passwordConfirm) {
			alert('비밀번호가 일치하지 않습니다.');
			return false;
		}
		if (!formData.email.trim()) {
			alert('이메일을 입력해주세요.');
			return false;
		}
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
			alert('올바른 이메일 형식을 입력해주세요.');
			return false;
		}
		if (!formData.name.trim()) {
			alert('이름을 입력해주세요.');
			return false;
		}
		if (!agreements.terms) {
			alert('이용약관에 동의해주세요.');
			return false;
		}
		if (!agreements.privacy) {
			alert('개인정보 처리방침에 동의해주세요.');
			return false;
		}
		return true;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		
		if (!validateForm()) return;
		
		setIsLoading(true);

		try {
			// 실제로는 여기서 API 호출
			console.log('Signup attempt:', formData, agreements);
			
			// 회원가입 시뮬레이션
			await new Promise(resolve => setTimeout(resolve, 1500));
			
			alert('회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.');
			// 실제로는 로그인 페이지로 리다이렉트
			window.location.href = '/login';
		} catch (error) {
			console.error('Signup error:', error);
			alert('회원가입에 실패했습니다. 다시 시도해주세요.');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
			<Header />
			<main className="pt-[106px] pb-16"> {/* 헤더 높이만큼 상단 여백 */}
				<div className="w-full max-w-lg mx-auto px-4 py-16">
					{/* 로고 및 제목 */}
					<div className="text-center mb-8">
						<div className="w-20 h-20 bg-[#005BAC] rounded-full flex items-center justify-center mx-auto mb-6">
							<span className="text-white text-2xl font-bold">월</span>
						</div>
						<h1 className="text-3xl font-bold text-gray-900 mb-2">회원가입</h1>
						<p className="text-gray-600">월미도 해양관광의 회원이 되어보세요</p>
					</div>

					{/* 회원가입 폼 */}
					<Card className="shadow-lg">
						<CardContent className="p-8">
							<form onSubmit={handleSubmit} className="space-y-6">
								{/* 아이디 입력 */}
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										아이디 <span className="text-red-500">*</span>
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
											placeholder="아이디 (4자 이상)"
											required
										/>
									</div>
								</div>

								{/* 비밀번호 입력 */}
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										비밀번호 <span className="text-red-500">*</span>
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
											placeholder="비밀번호 (6자 이상)"
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

								{/* 비밀번호 확인 */}
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										비밀번호 확인 <span className="text-red-500">*</span>
									</label>
									<div className="relative">
										<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
											<Lock className="h-5 w-5 text-gray-400" />
										</div>
										<input
											type={showPasswordConfirm ? "text" : "password"}
											name="passwordConfirm"
											value={formData.passwordConfirm}
											onChange={handleInputChange}
											className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none"
											placeholder="비밀번호를 다시 입력하세요"
											required
										/>
										<button
											type="button"
											className="absolute inset-y-0 right-0 pr-3 flex items-center"
											onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
										>
											{showPasswordConfirm ? (
												<EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
											) : (
												<Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
											)}
										</button>
									</div>
								</div>

								{/* 이메일 입력 */}
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										이메일 <span className="text-red-500">*</span>
									</label>
									<div className="relative">
										<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
											<Mail className="h-5 w-5 text-gray-400" />
										</div>
										<input
											type="email"
											name="email"
											value={formData.email}
											onChange={handleInputChange}
											className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none"
											placeholder="이메일 주소"
											required
										/>
									</div>
								</div>

								{/* 이름 입력 */}
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										이름 <span className="text-red-500">*</span>
									</label>
									<div className="relative">
										<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
											<UserCheck className="h-5 w-5 text-gray-400" />
										</div>
										<input
											type="text"
											name="name"
											value={formData.name}
											onChange={handleInputChange}
											className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none"
											placeholder="실명을 입력하세요"
											required
										/>
									</div>
								</div>

								{/* 휴대폰 번호 입력 */}
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										휴대폰 번호
									</label>
									<div className="relative">
										<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
											<Phone className="h-5 w-5 text-gray-400" />
										</div>
										<input
											type="tel"
											name="phone"
											value={formData.phone}
											onChange={handleInputChange}
											className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none"
											placeholder="010-0000-0000 (선택사항)"
										/>
									</div>
								</div>

								{/* 약관 동의 */}
								<div className="space-y-4">
									<div className="border-t pt-6">
										<h3 className="text-lg font-semibold text-gray-900 mb-6">약관 동의</h3>
										
										{/* 개별 동의 */}
										<div className="space-y-4">
											<div className="flex items-center justify-between">
												<div className="flex items-center">
													<input
														id="agree-terms"
														type="checkbox"
														checked={agreements.terms}
														onChange={() => handleAgreementChange('terms')}
														className="h-4 w-4 text-[#005BAC] focus:ring-[#005BAC] border-gray-300 rounded"
													/>
													<label htmlFor="agree-terms" className="ml-3 text-sm text-gray-700">
														<span className="text-red-500">*</span> 이용약관 동의
													</label>
												</div>
												<button
													type="button"
													onClick={() => openModal('terms')}
													className="text-sm text-[#005BAC] hover:text-[#004494] underline"
												>
													보기
												</button>
											</div>

											<div className="flex items-center justify-between">
												<div className="flex items-center">
													<input
														id="agree-privacy"
														type="checkbox"
														checked={agreements.privacy}
														onChange={() => handleAgreementChange('privacy')}
														className="h-4 w-4 text-[#005BAC] focus:ring-[#005BAC] border-gray-300 rounded"
													/>
													<label htmlFor="agree-privacy" className="ml-3 text-sm text-gray-700">
														<span className="text-red-500">*</span> 개인정보 처리방침 동의
													</label>
												</div>
												<button
													type="button"
													onClick={() => openModal('privacy')}
													className="text-sm text-[#005BAC] hover:text-[#004494] underline"
												>
													보기
												</button>
											</div>
										</div>
									</div>
								</div>

								{/* 회원가입 버튼 */}
								<Button
									type="submit"
									disabled={isLoading}
									className="w-full bg-[#005BAC] hover:bg-[#004494] text-white py-3 text-lg font-semibold"
								>
									{isLoading ? (
										<div className="flex items-center justify-center space-x-2">
											<div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
											<span>가입 중...</span>
										</div>
									) : (
										'회원가입'
									)}
								</Button>
							</form>

							{/* 로그인 링크 */}
							<div className="mt-6 text-center">
								<p className="text-sm text-gray-600">
									이미 회원이신가요?{' '}
									<Link href="/login" className="text-[#005BAC] hover:text-[#004494] font-semibold">
										로그인
									</Link>
								</p>
							</div>
						</CardContent>
					</Card>
				</div>
			</main>
			<Footer />
			<FloatingQuickMenu />
			
			{/* 약관 모달 */}
			<TermsModal
				isOpen={modalState.isOpen}
				onClose={closeModal}
				type={modalState.type}
			/>
		</div>
	);
}
