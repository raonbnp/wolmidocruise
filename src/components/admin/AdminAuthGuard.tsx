"use client";

import { useEffect } from "react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { AdminPermissions } from "@/types/admin";

interface AdminAuthGuardProps {
	children: React.ReactNode;
	requiredPermission?: keyof AdminPermissions;
	fallback?: React.ReactNode;
}

export default function AdminAuthGuard({ 
	children, 
	requiredPermission,
	fallback
}: AdminAuthGuardProps) {
	const { isAuthenticated, hasPermission, loading } = useAdminAuth();

	useEffect(() => {
		// 로딩이 끝나고 인증되지 않은 경우 로그인 페이지로 리다이렉트
		if (!loading && !isAuthenticated) {
			window.location.href = '/admin/login';
		}
	}, [isAuthenticated, loading]);

	// 로딩 중
	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-50">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#005BAC] mx-auto mb-4"></div>
					<p className="text-gray-600">인증 확인 중...</p>
				</div>
			</div>
		);
	}

	// 인증되지 않은 경우
	if (!isAuthenticated) {
		return fallback || (
			<div className="min-h-screen flex items-center justify-center bg-gray-50">
				<div className="text-center">
					<h2 className="text-2xl font-bold text-gray-900 mb-2">접근 권한이 없습니다</h2>
					<p className="text-gray-600 mb-4">관리자 로그인이 필요합니다.</p>
					<a
						href="/admin/login"
						className="inline-flex items-center px-4 py-2 bg-[#005BAC] text-white rounded-lg hover:bg-[#004494] transition-colors"
					>
						로그인하기
					</a>
				</div>
			</div>
		);
	}

	// 특정 권한이 필요한 경우 권한 확인
	if (requiredPermission && !hasPermission(requiredPermission)) {
		return fallback || (
			<div className="min-h-screen flex items-center justify-center bg-gray-50">
				<div className="text-center">
					<h2 className="text-2xl font-bold text-gray-900 mb-2">접근 권한이 부족합니다</h2>
					<p className="text-gray-600 mb-4">이 페이지에 접근할 권한이 없습니다.</p>
					<a
						href="/admin"
						className="inline-flex items-center px-4 py-2 bg-[#005BAC] text-white rounded-lg hover:bg-[#004494] transition-colors"
					>
						대시보드로 돌아가기
					</a>
				</div>
			</div>
		);
	}

	// 모든 조건을 만족하는 경우 자식 컴포넌트 렌더링
	return <>{children}</>;
}


