"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, User, Lock, Shield, ArrowRight } from "lucide-react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { AdminLoginRequest } from "@/types/admin";

export default function AdminLoginPage() {
	const { login, loading, error } = useAdminAuth();
	const [formData, setFormData] = useState<AdminLoginRequest>({
		username: "",
		password: ""
	});
	const [showPassword, setShowPassword] = useState(false);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		// 유효성 검사
		if (!formData.username.trim()) {
			alert('아이디를 입력해주세요.');
			return;
		}
		if (!formData.password.trim()) {
			alert('비밀번호를 입력해주세요.');
			return;
		}

		try {
			await login(formData);
			// 로그인 성공 시 대시보드로 이동
			window.location.href = '/admin';
		} catch (error) {
			// 에러는 useAdminAuth에서 처리됨
			console.error('Login failed:', error);
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
			<div className="w-full max-w-md">
				{/* 로고 및 제목 */}
				<div className="text-center mb-8">
					<div className="w-20 h-20 bg-[#005BAC] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
						<Shield className="w-10 h-10 text-white" />
					</div>
					<h1 className="text-3xl font-bold text-white mb-2">관리자 로그인</h1>
					<p className="text-slate-400">월미도 해양관광 관리시스템</p>
				</div>

				{/* 로그인 폼 */}
				<Card className="shadow-2xl border-0">
					<CardContent className="p-8">
						<form onSubmit={handleSubmit} className="space-y-6">
							{/* 아이디 입력 */}
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									관리자 아이디
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
										placeholder="관리자 아이디를 입력하세요"
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

							{/* 에러 메시지 */}
							{error && (
								<div className="bg-red-50 border border-red-200 rounded-lg p-4">
									<p className="text-red-600 text-sm">{error}</p>
								</div>
							)}

							{/* 로그인 버튼 */}
							<Button
								type="submit"
								disabled={loading}
								className="w-full bg-[#005BAC] hover:bg-[#004494] text-white py-3 text-lg font-semibold flex items-center justify-center space-x-2"
							>
								{loading ? (
									<div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
								) : (
									<>
										<span>로그인</span>
										<ArrowRight className="w-5 h-5" />
									</>
								)}
							</Button>
						</form>

						{/* 안내 메시지 */}
						<div className="mt-8 p-4 bg-blue-50 rounded-lg">
							<h3 className="text-sm font-semibold text-blue-800 mb-2">🔐 관리자 계정 안내</h3>
							<div className="text-sm text-blue-700 space-y-1">
								<p>• 테스트 계정: admin / admin123</p>
								<p>• 관리자 계정은 보안상 중요하니 안전하게 관리해주세요</p>
								<p>• 로그인 실패 시 시스템 관리자에게 문의하세요</p>
							</div>
						</div>

						{/* 홈으로 돌아가기 */}
						<div className="mt-6 text-center">
							<Link 
								href="/" 
								className="text-sm text-gray-600 hover:text-[#005BAC] transition-colors"
							>
								← 홈페이지로 돌아가기
							</Link>
						</div>
					</CardContent>
				</Card>

				{/* 푸터 */}
				<div className="mt-8 text-center text-sm text-slate-400">
					<p>&copy; 2024 월미도 해양관광. All rights reserved.</p>
				</div>
			</div>
		</div>
	);
}

