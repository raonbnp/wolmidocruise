"use client";

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { AdminUser, AdminRole, AdminPermissions } from '@/types/admin';
import type { User } from '@supabase/supabase-js';

// 관리자 로그인 요청 타입
interface AdminLoginRequest {
	email: string;
	password: string;
}

// 권한별 기본 설정
const getDefaultPermissions = (role: AdminRole): AdminPermissions => {
	const basePermissions: AdminPermissions = {
		dashboard: false,
		cruise: false,
		reservation: false,
		user: false,
		notice: false,
		faq: false,
		qna: false,
		eventSns: false,
		cruiseReview: false,
		statistics: false,
		popup: false,
		system: false
	};

	switch (role) {
		case 'super_admin':
			return {
				dashboard: true,
				cruise: true,
				reservation: true,
				user: true,
				notice: true,
				faq: true,
				qna: true,
				eventSns: true,
				cruiseReview: true,
				statistics: true,
				popup: true,
				system: true
			};
		case 'admin':
			return {
				...basePermissions,
				dashboard: true,
				cruise: true,
				reservation: true,
				user: true,
				notice: true,
				faq: true,
				qna: true,
				eventSns: true,
				cruiseReview: true,
				statistics: true,
				popup: true
			};
		case 'operator':
			return {
				...basePermissions,
				dashboard: true,
				reservation: true,
				notice: true,
				faq: true,
				qna: true,
				cruiseReview: true,
				popup: true
			};
		case 'viewer':
			return {
				...basePermissions,
				dashboard: true
			};
		default:
			return basePermissions;
	}
};

export const useAdminAuth = () => {
	const [user, setUser] = useState<User | null>(null);
	const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const supabase = createClient();

	// 관리자 상태 확인
	useEffect(() => {
		const getAdminUser = async () => {
			try {
				const { data: { user } } = await supabase.auth.getUser();
				setUser(user);

				if (user) {
					// 관리자 정보 확인
					const { data: adminData } = await supabase
						.from('admin_users')
						.select('*')
						.eq('email', user.email)
						.eq('is_active', true)
						.single();

					if (adminData) {
						setAdminUser({
							id: adminData.id,
							email: adminData.email,
							name: adminData.name,
							role: adminData.role,
							permissions: adminData.permissions || getDefaultPermissions(adminData.role),
							isActive: adminData.is_active,
							createdAt: adminData.created_at,
							updatedAt: adminData.updated_at
						});
						setIsAuthenticated(true);
					} else {
						setIsAuthenticated(false);
					}
				} else {
					setIsAuthenticated(false);
				}
			} catch (error) {
				console.error('관리자 정보 로드 실패:', error);
				setIsAuthenticated(false);
			} finally {
				setIsLoading(false);
			}
		};

		getAdminUser();

		// 인증 상태 변경 리스너
		const { data: { subscription } } = supabase.auth.onAuthStateChange(
			async (event, session) => {
				setUser(session?.user ?? null);

				if (session?.user) {
					// 관리자 정보 확인
					const { data: adminData } = await supabase
						.from('admin_users')
						.select('*')
						.eq('email', session.user.email)
						.eq('is_active', true)
						.single();

					if (adminData) {
						setAdminUser({
							id: adminData.id,
							email: adminData.email,
							name: adminData.name,
							role: adminData.role,
							permissions: adminData.permissions || getDefaultPermissions(adminData.role),
							isActive: adminData.is_active,
							createdAt: adminData.created_at,
							updatedAt: adminData.updated_at
						});
						setIsAuthenticated(true);
					} else {
						setAdminUser(null);
						setIsAuthenticated(false);
					}
				} else {
					setAdminUser(null);
					setIsAuthenticated(false);
				}
			}
		);

		return () => subscription.unsubscribe();
	}, [supabase]);

	// 관리자 로그인
	const login = async (credentials: AdminLoginRequest): Promise<boolean> => {
		try {
			setIsLoading(true);

			// Supabase Auth 로그인
			const { data, error } = await supabase.auth.signInWithPassword({
				email: credentials.email,
				password: credentials.password,
			});

			if (error) {
				console.error('로그인 실패:', error.message);
				return false;
			}

			if (data.user) {
				// 관리자 권한 확인
				const { data: adminData } = await supabase
					.from('admin_users')
					.select('*')
					.eq('email', data.user.email)
					.eq('is_active', true)
					.single();

				if (!adminData) {
					// 관리자가 아닌 경우 로그아웃
					await supabase.auth.signOut();
					console.error('관리자 권한이 없습니다.');
					return false;
				}
			}

			return true;
		} catch (error) {
			console.error('로그인 실패:', error);
			return false;
		} finally {
			setIsLoading(false);
		}
	};

	// 로그아웃
	const logout = async () => {
		try {
			const { error } = await supabase.auth.signOut();
			if (error) {
				console.error('로그아웃 실패:', error.message);
			}
		} catch (error) {
			console.error('로그아웃 실패:', error);
		}
	};

	// 권한 확인
	const hasPermission = (permission: keyof AdminPermissions): boolean => {
		return adminUser?.permissions[permission] || false;
	};

	// 역할 확인
	const hasRole = (role: AdminRole): boolean => {
		return adminUser?.role === role;
	};

	// 최소 역할 확인
	const hasMinRole = (minRole: AdminRole): boolean => {
		if (!adminUser) return false;

		const roleHierarchy: Record<AdminRole, number> = {
			viewer: 1,
			operator: 2,
			admin: 3,
			super_admin: 4
		};

		return roleHierarchy[adminUser.role] >= roleHierarchy[minRole];
	};

	// 관리자 정보 업데이트
	const updateAdminUser = async (updates: Partial<AdminUser>): Promise<boolean> => {
		try {
			if (!adminUser) return false;

			const { error } = await supabase
				.from('admin_users')
				.update({
					...updates,
					updated_at: new Date().toISOString(),
				})
				.eq('id', adminUser.id);

			if (error) {
				console.error('관리자 정보 업데이트 실패:', error.message);
				return false;
			}

			// 로컬 상태 업데이트
			setAdminUser({
				...adminUser,
				...updates,
				updatedAt: new Date().toISOString(),
			});

			return true;
		} catch (error) {
			console.error('관리자 정보 업데이트 실패:', error);
			return false;
		}
	};

	// 비밀번호 변경
	const changePassword = async (newPassword: string): Promise<boolean> => {
		try {
			const { error } = await supabase.auth.updateUser({
				password: newPassword
			});

			if (error) {
				console.error('비밀번호 변경 실패:', error.message);
				return false;
			}

			return true;
		} catch (error) {
			console.error('비밀번호 변경 실패:', error);
			return false;
		}
	};

	// 관리자 생성 (super_admin만 가능)
	const createAdmin = async (adminData: {
		email: string;
		password: string;
		name: string;
		role: AdminRole;
		permissions?: AdminPermissions;
	}): Promise<boolean> => {
		try {
			if (!hasRole('super_admin')) {
				console.error('최고 관리자만 관리자를 생성할 수 있습니다.');
				return false;
			}

			// Supabase Auth에 사용자 생성 (관리자 권한으로)
			const { data: authData, error: authError } = await supabase.auth.admin.createUser({
				email: adminData.email,
				password: adminData.password,
				email_confirm: true
			});

			if (authError) {
				console.error('관리자 계정 생성 실패:', authError.message);
				return false;
			}

			if (authData.user) {
				// admin_users 테이블에 정보 저장
				const { error: adminError } = await supabase
					.from('admin_users')
					.insert({
						id: authData.user.id,
						email: adminData.email,
						name: adminData.name,
						role: adminData.role,
						permissions: adminData.permissions || getDefaultPermissions(adminData.role),
						is_active: true
					});

				if (adminError) {
					console.error('관리자 정보 저장 실패:', adminError.message);
					return false;
				}
			}

			return true;
		} catch (error) {
			console.error('관리자 생성 실패:', error);
			return false;
		}
	};

	return {
		// 상태
		user,
		adminUser,
		isLoading,
		isAuthenticated,

		// 액션
		login,
		logout,
		updateAdminUser,
		changePassword,
		createAdmin,

		// 권한 확인
		hasPermission,
		hasRole,
		hasMinRole
	};
};