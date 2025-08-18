"use client";

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';

// 사용자 프로필 타입 정의
export interface UserProfile {
	id: string;
	email: string;
	name: string;
	phone?: string;
	created_at: string;
	updated_at: string;
}

// 로그인 요청 타입
interface LoginRequest {
	email: string;
	password: string;
}

// 회원가입 요청 타입
interface SignupRequest {
	email: string;
	password: string;
	name: string;
	phone?: string;
	agreeTerms: boolean;
	agreePrivacy: boolean;
	agreeMarketing?: boolean;
}

export const useAuth = () => {
	const [user, setUser] = useState<User | null>(null);
	const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const supabase = createClient();

	// 사용자 상태 확인
	useEffect(() => {
		const getUser = async () => {
			try {
				const { data: { user } } = await supabase.auth.getUser();
				setUser(user);
				setIsAuthenticated(!!user);

				if (user) {
					// 사용자 프로필 정보 가져오기
					const { data: profile } = await supabase
						.from('users')
						.select('*')
						.eq('id', user.id)
						.single();
					
					setUserProfile(profile);
				}
			} catch (error) {
				console.error('사용자 정보 로드 실패:', error);
			} finally {
				setIsLoading(false);
			}
		};

		getUser();

		// 인증 상태 변경 리스너
		const { data: { subscription } } = supabase.auth.onAuthStateChange(
			async (event, session) => {
				setUser(session?.user ?? null);
				setIsAuthenticated(!!session?.user);

				if (session?.user) {
					// 사용자 프로필 정보 가져오기
					const { data: profile } = await supabase
						.from('users')
						.select('*')
						.eq('id', session.user.id)
						.single();
					
					setUserProfile(profile);
				} else {
					setUserProfile(null);
				}
			}
		);

		return () => subscription.unsubscribe();
	}, [supabase]);

	// 로그인
	const login = async (credentials: LoginRequest): Promise<boolean> => {
		try {
			setIsLoading(true);

			const { data, error } = await supabase.auth.signInWithPassword({
				email: credentials.email,
				password: credentials.password,
			});

			if (error) {
				console.error('로그인 실패:', error.message);
				return false;
			}

			return true;
		} catch (error) {
			console.error('로그인 실패:', error);
			return false;
		} finally {
			setIsLoading(false);
		}
	};

	// 회원가입
	const signup = async (userData: SignupRequest): Promise<boolean> => {
		try {
			setIsLoading(true);

			// Supabase Auth에 사용자 생성
			const { data: authData, error: authError } = await supabase.auth.signUp({
				email: userData.email,
				password: userData.password,
			});

			if (authError) {
				console.error('회원가입 실패:', authError.message);
				return false;
			}

			if (authData.user) {
				// 사용자 프로필 정보를 users 테이블에 저장
				const { error: profileError } = await supabase
					.from('users')
					.insert({
						id: authData.user.id,
						email: userData.email,
						name: userData.name,
						phone: userData.phone,
					});

				if (profileError) {
					console.error('프로필 생성 실패:', profileError.message);
					return false;
				}
			}

			return true;
		} catch (error) {
			console.error('회원가입 실패:', error);
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

	// 사용자 정보 업데이트
	const updateUser = async (updates: Partial<UserProfile>): Promise<boolean> => {
		try {
			if (!user) return false;

			const { error } = await supabase
				.from('users')
				.update({
					...updates,
					updated_at: new Date().toISOString(),
				})
				.eq('id', user.id);

			if (error) {
				console.error('사용자 정보 업데이트 실패:', error.message);
				return false;
			}

			// 로컬 상태 업데이트
			if (userProfile) {
				setUserProfile({
					...userProfile,
					...updates,
					updated_at: new Date().toISOString(),
				});
			}

			return true;
		} catch (error) {
			console.error('사용자 정보 업데이트 실패:', error);
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

	// 비밀번호 재설정 이메일 발송
	const resetPassword = async (email: string): Promise<boolean> => {
		try {
			const { error } = await supabase.auth.resetPasswordForEmail(email, {
				redirectTo: `${window.location.origin}/reset-password`,
			});

			if (error) {
				console.error('비밀번호 재설정 실패:', error.message);
				return false;
			}

			return true;
		} catch (error) {
			console.error('비밀번호 재설정 실패:', error);
			return false;
		}
	};

	return {
		// 상태
		user,
		userProfile,
		isLoading,
		isAuthenticated,

		// 액션
		login,
		signup,
		logout,
		updateUser,
		changePassword,
		resetPassword
	};
};