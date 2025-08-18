"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingQuickMenu from "@/components/FloatingQuickMenu";
import TiptapEditor from "@/components/TiptapEditor";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Upload, X, Lock } from "lucide-react";
import Link from "next/link";
import { useState, useRef } from "react";

export default function QnAWritePage() {
	const [formData, setFormData] = useState({
		nickname: "",
		password: "",
		title: "",
		content: "",
		isSecret: false
	});
	const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value,
			// 비밀번호가 입력되면 자동으로 비밀글 체크
			...(name === 'password' && value && { isSecret: true }),
			// 비밀번호가 지워지면 비밀글 해제
			...(name === 'password' && !value && { isSecret: false })
		}));
	};

	const handleContentChange = (content: string) => {
		setFormData(prev => ({
			...prev,
			content
		}));
	};

	const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(e.target.files || []);
		const maxSize = 10 * 1024 * 1024; // 10MB
		const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'text/plain'];
		
		const validFiles = files.filter(file => {
			if (file.size > maxSize) {
				alert(`${file.name}은(는) 10MB를 초과합니다.`);
				return false;
			}
			if (!allowedTypes.includes(file.type)) {
				alert(`${file.name}은(는) 지원하지 않는 파일 형식입니다.`);
				return false;
			}
			return true;
		});

		setAttachedFiles(prev => [...prev, ...validFiles].slice(0, 5)); // 최대 5개 파일
		
		// 파일 input 초기화
		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}
	};

	const removeFile = (index: number) => {
		setAttachedFiles(prev => prev.filter((_, i) => i !== index));
	};

	const formatFileSize = (bytes: number) => {
		if (bytes === 0) return '0 Bytes';
		const k = 1024;
		const sizes = ['Bytes', 'KB', 'MB', 'GB'];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		
		// 유효성 검사
		if (!formData.nickname.trim()) {
			alert('닉네임을 입력해주세요.');
			return;
		}
		if (!formData.title.trim()) {
			alert('제목을 입력해주세요.');
			return;
		}
		if (!formData.content.trim()) {
			alert('내용을 입력해주세요.');
			return;
		}

		// 실제로는 여기서 API 호출
		console.log('Form Data:', formData);
		console.log('Attached Files:', attachedFiles);
		
		alert('문의가 등록되었습니다.');
		// 목록 페이지로 이동 (실제로는 router.push 사용)
		window.location.href = '/customer/qna';
	};

	return (
		<div className="min-h-screen">
			<Header />
			<main className="pt-[106px]"> {/* 헤더 높이만큼 상단 여백 */}
				<div className="w-full max-w-[1600px] mx-auto px-4 py-16">


					{/* 페이지 제목 */}
					<div className="text-center mb-12">
						<h1 className="text-4xl font-bold text-gray-900 mb-4">문의하기</h1>
						<p className="text-xl text-gray-600">궁금한 사항을 문의해 주세요</p>
					</div>

					{/* 작성 폼 */}
					<Card className="max-w-4xl mx-auto">
						<CardContent className="p-8">
							<form onSubmit={handleSubmit} className="space-y-6">
								{/* 작성자 정보 */}
								<div className="grid md:grid-cols-2 gap-6">
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											닉네임 <span className="text-red-500">*</span>
										</label>
										<input
											type="text"
											name="nickname"
											value={formData.nickname}
											onChange={handleInputChange}
											className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none"
											placeholder="닉네임을 입력하세요"
											maxLength={20}
											required
										/>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											비밀번호 (비밀글로 등록하려면 입력)
										</label>
										<div className="relative">
											<input
												type="password"
												name="password"
												value={formData.password}
												onChange={handleInputChange}
												className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none pr-10"
												placeholder="비밀번호 (선택사항)"
												maxLength={20}
											/>
											{formData.isSecret && (
												<Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
											)}
										</div>
										{formData.isSecret && (
											<p className="text-sm text-[#005BAC] mt-1 flex items-center">
												<Lock className="w-4 h-4 mr-1" />
												비밀글로 등록됩니다
											</p>
										)}
									</div>
								</div>

								{/* 제목 */}
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										제목 <span className="text-red-500">*</span>
									</label>
									<input
										type="text"
										name="title"
										value={formData.title}
										onChange={handleInputChange}
										className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none"
										placeholder="제목을 입력하세요"
										maxLength={100}
										required
									/>
								</div>

								{/* 내용 */}
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										내용 <span className="text-red-500">*</span>
									</label>
									<TiptapEditor
										content={formData.content}
										onChange={handleContentChange}
										placeholder="문의하실 내용을 자세히 작성해 주세요..."
									/>
								</div>

								{/* 첨부파일 */}
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										첨부파일 (최대 5개, 각 10MB 이하)
									</label>
									<div className="space-y-3">
										<div className="flex items-center space-x-3">
											<Button
												type="button"
												variant="outline"
												onClick={() => fileInputRef.current?.click()}
												disabled={attachedFiles.length >= 5}
												className="flex items-center"
											>
												<Upload className="w-4 h-4 mr-2" />
												파일 선택
											</Button>
											<span className="text-sm text-gray-500">
												이미지(JPG, PNG, GIF), PDF, 텍스트 파일만 업로드 가능
											</span>
										</div>
										
										<input
											ref={fileInputRef}
											type="file"
											onChange={handleFileUpload}
											className="hidden"
											multiple
											accept="image/jpeg,image/png,image/gif,application/pdf,text/plain"
											aria-label="파일 선택"
										/>

										{/* 첨부된 파일 목록 */}
										{attachedFiles.length > 0 && (
											<div className="space-y-2">
												{attachedFiles.map((file, index) => (
													<div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
														<div className="flex items-center space-x-3">
															<div className="w-8 h-8 bg-[#005BAC] rounded flex items-center justify-center">
																<span className="text-white text-xs font-semibold">
																	{file.name.split('.').pop()?.toUpperCase()}
																</span>
															</div>
															<div>
																<p className="text-sm font-medium text-gray-900">{file.name}</p>
																<p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
															</div>
														</div>
														<Button
															type="button"
															variant="ghost"
															size="sm"
															onClick={() => removeFile(index)}
															className="text-red-500 hover:text-red-700 hover:bg-red-50"
														>
															<X className="w-4 h-4" />
														</Button>
													</div>
												))}
											</div>
										)}
									</div>
								</div>

								{/* 제출 버튼 */}
								<div className="flex justify-center space-x-4 pt-6">
									<Link href="/customer/qna">
										<Button type="button" variant="outline" className="px-8">
											취소
										</Button>
									</Link>
									<Button
										type="submit"
										className="bg-[#005BAC] hover:bg-[#004494] px-8"
									>
										문의 등록
									</Button>
								</div>
							</form>
						</CardContent>
					</Card>

					{/* 안내 메시지 */}
					<div className="mt-8 max-w-4xl mx-auto">
						<Card className="bg-blue-50 border-blue-200">
							<CardContent className="p-6">
								<h3 className="text-lg font-semibold text-[#005BAC] mb-3">📝 작성 안내</h3>
								<ul className="space-y-2 text-sm text-gray-700">
									<li>• 비회원도 문의 작성이 가능합니다.</li>
									<li>• 비밀번호를 입력하시면 비밀글로 등록되어 작성자와 관리자만 확인할 수 있습니다.</li>
									<li>• 첨부파일은 최대 5개, 각 파일당 10MB 이하로 업로드 가능합니다.</li>
									<li>• 답변은 평일 기준 1-2일 내에 등록됩니다.</li>
									<li>• 급한 문의사항은 고객센터(032-123-4567)로 연락주세요.</li>
								</ul>
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
