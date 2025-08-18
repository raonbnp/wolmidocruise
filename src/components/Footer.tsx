"use client";

export default function Footer() {
	return (
		<footer className="bg-neutral-800 text-neutral-100 py-12">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{/* 회사 정보 */}
					<div className="lg:col-span-2">
						<h3 className="text-xl font-bold text-white mb-4">월미도 해양관광</h3>
						<div className="space-y-2 text-sm text-neutral-300">
							<p>인천광역시 중구 월미문화로 81번길 3</p>
							<p>사업자등록번호: 123-45-67890</p>
							<p>통신판매업신고번호: 제2024-인천중구-0123호</p>
						</div>
					</div>

					{/* 연락처 정보 */}
					<div>
						<h4 className="text-lg font-semibold text-white mb-4">연락처</h4>
						<div className="space-y-2 text-sm text-neutral-300">
							<p>
								<span className="text-white font-medium">대표전화:</span>
								<br />
								<a href="tel:032-123-4567" className="hover:text-white transition-colors">
									032-123-4567
								</a>
							</p>
							<p>
								<span className="text-white font-medium">이메일:</span>
								<br />
								<a href="mailto:info@wolmido-cruise.co.kr" className="hover:text-white transition-colors">
									info@wolmido-cruise.co.kr
								</a>
							</p>
						</div>
					</div>

					{/* 법적 정보 */}
					<div>
						<h4 className="text-lg font-semibold text-white mb-4">약관 및 정책</h4>
						<div className="space-y-2 text-sm">
							<a 
								href="/terms" 
								className="block text-neutral-300 hover:text-white transition-colors"
							>
								이용약관
							</a>
							<a 
								href="/privacy" 
								className="block text-neutral-300 hover:text-white transition-colors"
							>
								개인정보처리방침
							</a>
						</div>
					</div>
				</div>

				{/* 하단 구분선 및 저작권 */}
				<div className="mt-8 pt-8 border-t border-neutral-700">
					<div className="flex flex-col md:flex-row justify-between items-center">
						<p className="text-sm text-neutral-400">
							© 2024 월미도 해양관광. All rights reserved.
						</p>
						<div className="mt-4 md:mt-0 flex space-x-6">
							<a 
								href="#" 
								className="text-neutral-400 hover:text-white transition-colors"
								aria-label="페이스북"
							>
								<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
									<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
								</svg>
							</a>
							<a 
								href="#" 
								className="text-neutral-400 hover:text-white transition-colors"
								aria-label="인스타그램"
							>
								<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
									<path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987c6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.328-1.297L6.391 14.42c.687.687 1.636 1.111 2.687 1.111 2.079 0 3.767-1.687 3.767-3.767S11.157 7.997 9.078 7.997c-1.051 0-2 .424-2.687 1.111L5.121 7.837c.88-.807 2.031-1.297 3.328-1.297 2.736 0 4.95 2.214 4.95 4.95s-2.214 4.498-4.95 4.498z"/>
								</svg>
							</a>
							<a 
								href="#" 
								className="text-neutral-400 hover:text-white transition-colors"
								aria-label="유튜브"
							>
								<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
									<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
								</svg>
							</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
