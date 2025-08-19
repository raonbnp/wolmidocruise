"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminAuthGuard from "@/components/admin/AdminAuthGuard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
	User,
	Mail,
	Phone,

	Key,

	Save,
	Eye,
	EyeOff,

	Edit,
	Trash2,

	UserPlus,
	Crown,
	ShieldCheck
} from "lucide-react";
import { useAdminAuth } from "@/hooks/useAdminAuth";

// 관리자 타입
interface Admin {
	id: number;
	username: string;
	email: string;
	name: string;
	phone?: string;
	role: 'super_admin' | 'admin' | 'manager' | 'staff' | 'operator' | 'viewer';
	permissions: string[];
	isActive: boolean;
	lastLoginAt?: string;
	createdAt: string;
	updatedAt: string;
	createdBy?: string;
}

// 권한 목록
const PERMISSIONS = [
	{ key: 'dashboard', name: '대시보드', description: '관리자 대시보드 접근' },
	{ key: 'cruise', name: '크루즈 관리', description: '크루즈 상품 등록/수정/삭제' },
	{ key: 'reservation', name: '예약 관리', description: '예약 조회/수정/취소' },
	{ key: 'user', name: '회원 관리', description: '회원 정보 조회/관리' },
	{ key: 'notice', name: '공지사항', description: '공지사항 작성/관리' },
	{ key: 'faq', name: 'FAQ', description: 'FAQ 작성/관리' },
	{ key: 'qna', name: 'Q&A', description: 'Q&A 답변/관리' },
	{ key: 'eventSns', name: '이벤트SNS', description: '이벤트/SNS 관리' },
	{ key: 'cruiseReview', name: '크루즈 리뷰', description: '리뷰 관리' },
	{ key: 'statistics', name: '통계', description: '통계 데이터 조회' },
	{ key: 'system', name: '시스템 설정', description: '시스템 설정 관리' }
];

// 역할별 기본 권한
const ROLE_PERMISSIONS = {
	super_admin: PERMISSIONS.map(p => p.key),
	admin: ['dashboard', 'cruise', 'reservation', 'user', 'notice', 'faq', 'qna', 'statistics'],
	manager: ['dashboard', 'cruise', 'reservation', 'notice', 'faq', 'qna'],
	staff: ['dashboard', 'reservation', 'faq', 'qna'],
	operator: ['dashboard', 'cruise', 'reservation', 'notice'],
	viewer: ['dashboard']
};

// 더미 관리자 데이터
const dummyAdmins: Admin[] = [
	{
		id: 1,
		username: 'superadmin',
		email: 'admin@wolmido-cruise.co.kr',
		name: '김관리',
		phone: '032-123-4567',
		role: 'super_admin',
		permissions: ROLE_PERMISSIONS.super_admin,
		isActive: true,
		lastLoginAt: '2024-01-25T14:30:00Z',
		createdAt: '2023-01-01T00:00:00Z',
		updatedAt: '2024-01-25T14:30:00Z'
	},
	{
		id: 2,
		username: 'admin1',
		email: 'admin1@wolmido-cruise.co.kr',
		name: '이운영',
		phone: '032-123-4568',
		role: 'admin',
		permissions: ROLE_PERMISSIONS.admin,
		isActive: true,
		lastLoginAt: '2024-01-25T10:15:00Z',
		createdAt: '2023-06-15T09:00:00Z',
		updatedAt: '2024-01-25T10:15:00Z',
		createdBy: '김관리'
	},
	{
		id: 3,
		username: 'manager1',
		email: 'manager1@wolmido-cruise.co.kr',
		name: '박매니저',
		phone: '032-123-4569',
		role: 'manager',
		permissions: ROLE_PERMISSIONS.manager,
		isActive: true,
		lastLoginAt: '2024-01-24T16:45:00Z',
		createdAt: '2023-09-20T11:30:00Z',
		updatedAt: '2024-01-24T16:45:00Z',
		createdBy: '김관리'
	}
];

export default function AdminSettingsPage() {
	const { adminUser: currentAdmin } = useAdminAuth();
	const [admins, setAdmins] = useState<Admin[]>([]);
	const [loading, setLoading] = useState(true);
	const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null);
	const [showAddForm, setShowAddForm] = useState(false);
	const [showPasswordChange, setShowPasswordChange] = useState(false);
	const [formData, setFormData] = useState({
		username: '',
		email: '',
		name: '',
		phone: '',
		role: 'staff' as Admin['role'],
		permissions: [] as string[],
		isActive: true
	});
	const [passwordData, setPasswordData] = useState({
		currentPassword: '',
		newPassword: '',
		confirmPassword: ''
	});
	const [showPasswords, setShowPasswords] = useState({
		current: false,
		new: false,
		confirm: false
	});
	const [errors, setErrors] = useState<{ [key: string]: string }>({});

	// 데이터 로드
	useEffect(() => {
		const loadAdmins = async () => {
			try {
				// 실제로는 API 호출
				await new Promise(resolve => setTimeout(resolve, 1000));
				setAdmins(dummyAdmins);
			} catch (error) {
				console.error('Admins load error:', error);
			} finally {
				setLoading(false);
			}
		};

		loadAdmins();
	}, []);

	// 역할별 표시명
	const getRoleName = (role: Admin['role']) => {
		const roleNames = {
			super_admin: '최고관리자',
			admin: '관리자',
			manager: '매니저',
			staff: '스태프',
			operator: '운영자',
			viewer: '조회자'
		};
		return roleNames[role];
	};

	// 역할별 색상
	const getRoleColor = (role: Admin['role']) => {
		const colors = {
			super_admin: 'bg-red-100 text-red-800',
			admin: 'bg-blue-100 text-blue-800',
			manager: 'bg-green-100 text-green-800',
			staff: 'bg-gray-100 text-gray-800',
			operator: 'bg-yellow-100 text-yellow-800',
			viewer: 'bg-purple-100 text-purple-800'
		};
		return colors[role];
	};

	// 날짜 포맷
	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString('ko-KR', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	};

	// 폼 초기화
	const resetForm = () => {
		setFormData({
			username: '',
			email: '',
			name: '',
			phone: '',
			role: 'staff',
			permissions: ROLE_PERMISSIONS.staff,
			isActive: true
		});
		setErrors({});
	};

	// 관리자 편집 시작
	const startEdit = (admin: Admin) => {
		setEditingAdmin(admin);
		setFormData({
			username: admin.username,
			email: admin.email,
			name: admin.name,
			phone: admin.phone || '',
			role: admin.role,
			permissions: admin.permissions,
			isActive: admin.isActive
		});
		setShowAddForm(true);
	};

	// 역할 변경 시 권한 자동 설정
	const handleRoleChange = (role: Admin['role']) => {
		setFormData(prev => ({
			...prev,
			role,
			permissions: ROLE_PERMISSIONS[role]
		}));
	};

	// 권한 토글
	const togglePermission = (permission: string) => {
		setFormData(prev => ({
			...prev,
			permissions: prev.permissions.includes(permission)
				? prev.permissions.filter(p => p !== permission)
				: [...prev.permissions, permission]
		}));
	};

	// 폼 유효성 검사
	const validateForm = () => {
		const newErrors: { [key: string]: string } = {};

		if (!formData.username.trim()) {
			newErrors.username = '아이디를 입력해주세요.';
		}
		if (!formData.email.trim()) {
			newErrors.email = '이메일을 입력해주세요.';
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
			newErrors.email = '올바른 이메일 형식을 입력해주세요.';
		}
		if (!formData.name.trim()) {
			newErrors.name = '이름을 입력해주세요.';
		}
		if (formData.permissions.length === 0) {
			newErrors.permissions = '최소 하나 이상의 권한을 선택해주세요.';
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	// 관리자 저장
	const handleSaveAdmin = async () => {
		if (!validateForm()) return;

		try {
			// 실제로는 API 호출
			await new Promise(resolve => setTimeout(resolve, 1000));

			if (editingAdmin) {
				// 수정
				setAdmins(prev => prev.map(admin => 
					admin.id === editingAdmin.id 
						? { ...admin, ...formData, updatedAt: new Date().toISOString() }
						: admin
				));
				alert('관리자 정보가 수정되었습니다.');
			} else {
				// 추가
				const newAdmin: Admin = {
					id: Math.max(...admins.map(a => a.id)) + 1,
					...formData,
					createdAt: new Date().toISOString(),
					updatedAt: new Date().toISOString(),
					createdBy: currentAdmin?.name
				};
				setAdmins(prev => [...prev, newAdmin]);
				alert('새 관리자가 추가되었습니다.');
			}

			setShowAddForm(false);
			setEditingAdmin(null);
			resetForm();
		} catch (error) {
			console.error('Admin save error:', error);
			alert('저장 중 오류가 발생했습니다.');
		}
	};

	// 관리자 삭제
	const handleDeleteAdmin = async (adminId: number) => {
		const admin = admins.find(a => a.id === adminId);
		if (!admin) return;

		if (!confirm(`${admin.name} 관리자를 삭제하시겠습니까?`)) return;

		try {
			// 실제로는 API 호출
			setAdmins(prev => prev.filter(a => a.id !== adminId));
			alert('관리자가 삭제되었습니다.');
		} catch (error) {
			console.error('Admin delete error:', error);
			alert('삭제 중 오류가 발생했습니다.');
		}
	};

	// 비밀번호 변경
	const handleChangePassword = async () => {
		const newErrors: { [key: string]: string } = {};

		if (!passwordData.currentPassword) {
			newErrors.currentPassword = '현재 비밀번호를 입력해주세요.';
		}
		if (!passwordData.newPassword) {
			newErrors.newPassword = '새 비밀번호를 입력해주세요.';
		} else if (passwordData.newPassword.length < 8) {
			newErrors.newPassword = '비밀번호는 8자 이상이어야 합니다.';
		}
		if (passwordData.newPassword !== passwordData.confirmPassword) {
			newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
		}

		setErrors(newErrors);
		if (Object.keys(newErrors).length > 0) return;

		try {
			// 실제로는 API 호출
			await new Promise(resolve => setTimeout(resolve, 1000));
			alert('비밀번호가 변경되었습니다.');
			setShowPasswordChange(false);
			setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
		} catch (error) {
			console.error('Password change error:', error);
			alert('비밀번호 변경 중 오류가 발생했습니다.');
		}
	};

	return (
		<AdminAuthGuard requiredPermission="user">
			<AdminLayout>
				<div className="space-y-6">
					{/* 헤더 */}
					<div className="flex items-center justify-between">
						<div>
							<h1 className="text-3xl font-bold text-gray-900">관리자 정보 관리</h1>
							<p className="text-gray-600">관리자 계정과 권한을 관리하세요</p>
						</div>
						<div className="flex space-x-3">
							<Button
								onClick={() => setShowPasswordChange(true)}
								variant="outline"
								className="flex items-center space-x-2"
							>
								<Key className="w-4 h-4" />
								<span>비밀번호 변경</span>
							</Button>
							<Button
								onClick={() => {
									resetForm();
									setEditingAdmin(null);
									setShowAddForm(true);
								}}
								className="bg-[#005BAC] hover:bg-[#004494] flex items-center space-x-2"
							>
								<UserPlus className="w-4 h-4" />
								<span>관리자 추가</span>
							</Button>
						</div>
					</div>

					{/* 현재 로그인한 관리자 정보 */}
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center space-x-2">
								<Crown className="w-5 h-5 text-[#005BAC]" />
								<span>내 정보</span>
							</CardTitle>
						</CardHeader>
						<CardContent>
							{currentAdmin && (
								<div className="flex items-center space-x-6">
									<div className="w-16 h-16 bg-gradient-to-r from-[#005BAC] to-[#0066CC] rounded-full flex items-center justify-center">
										<User className="w-8 h-8 text-white" />
									</div>
									<div className="flex-1">
										<div className="flex items-center space-x-3 mb-2">
											<h3 className="text-xl font-semibold text-gray-900">{currentAdmin.name}</h3>
											<Badge className={getRoleColor(currentAdmin.role)}>
												{getRoleName(currentAdmin.role)}
											</Badge>
										</div>
										<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
											<div className="flex items-center space-x-2">
												<User className="w-4 h-4" />
												<span>{currentAdmin.username}</span>
											</div>
											<div className="flex items-center space-x-2">
												<Mail className="w-4 h-4" />
												<span>{currentAdmin.email}</span>
											</div>
										</div>
									</div>
									<Button
										onClick={() => startEdit(currentAdmin)}
										variant="outline"
										className="flex items-center space-x-2"
									>
										<Edit className="w-4 h-4" />
										<span>정보 수정</span>
									</Button>
								</div>
							)}
						</CardContent>
					</Card>

					{/* 관리자 목록 */}
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center space-x-2">
								<ShieldCheck className="w-5 h-5 text-[#005BAC]" />
								<span>전체 관리자</span>
							</CardTitle>
						</CardHeader>
						<CardContent>
							{loading ? (
								<div className="text-center py-8">
									<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#005BAC] mx-auto mb-4"></div>
									<p className="text-gray-600">관리자 목록을 불러오는 중...</p>
								</div>
							) : (
								<div className="space-y-4">
									{admins.map(admin => (
										<div key={admin.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
											<div className="flex items-center justify-between">
												<div className="flex items-center space-x-4">
													<div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
														<User className="w-6 h-6 text-gray-600" />
													</div>
													<div>
														<div className="flex items-center space-x-3 mb-1">
															<h4 className="font-semibold text-gray-900">{admin.name}</h4>
															<Badge className={getRoleColor(admin.role)}>
																{getRoleName(admin.role)}
															</Badge>
															<Badge variant={admin.isActive ? "default" : "destructive"}>
																{admin.isActive ? "활성" : "비활성"}
															</Badge>
														</div>
														<div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
															<div className="flex items-center space-x-1">
																<User className="w-3 h-3" />
																<span>{admin.username}</span>
															</div>
															<div className="flex items-center space-x-1">
																<Mail className="w-3 h-3" />
																<span>{admin.email}</span>
															</div>
															{admin.phone && (
																<div className="flex items-center space-x-1">
																	<Phone className="w-3 h-3" />
																	<span>{admin.phone}</span>
																</div>
															)}
															<div className="text-xs text-gray-500">
																가입: {formatDate(admin.createdAt)}
																{admin.createdBy && ` (by ${admin.createdBy})`}
															</div>
														</div>
													</div>
												</div>
												<div className="flex items-center space-x-2">
													<Button
														onClick={() => startEdit(admin)}
														variant="outline"
														size="sm"
													>
														<Edit className="w-3 h-3 mr-1" />
														수정
													</Button>
													{admin.id !== currentAdmin?.id && (
														<Button
															onClick={() => handleDeleteAdmin(admin.id)}
															variant="outline"
															size="sm"
															className="text-red-600 hover:bg-red-50"
														>
															<Trash2 className="w-3 h-3 mr-1" />
															삭제
														</Button>
													)}
												</div>
											</div>
											<div className="mt-3 pt-3 border-t border-gray-100">
												<div className="flex flex-wrap gap-1">
													{admin.permissions.map(permission => {
														const permissionInfo = PERMISSIONS.find(p => p.key === permission);
														return permissionInfo ? (
															<Badge key={permission} variant="secondary" className="text-xs">
																{permissionInfo.name}
															</Badge>
														) : null;
													})}
												</div>
											</div>
										</div>
									))}
								</div>
							)}
						</CardContent>
					</Card>

					{/* 관리자 추가/수정 모달 */}
					{showAddForm && (
						<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
							<div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
								<div className="flex items-center justify-between mb-6">
									<h2 className="text-xl font-semibold">
										{editingAdmin ? '관리자 정보 수정' : '새 관리자 추가'}
									</h2>
									<Button
										onClick={() => {
											setShowAddForm(false);
											setEditingAdmin(null);
											resetForm();
										}}
										variant="ghost"
										size="sm"
									>
										✕
									</Button>
								</div>

								<div className="space-y-6">
									{/* 기본 정보 */}
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												아이디 <span className="text-red-500">*</span>
											</label>
											<input
												type="text"
												value={formData.username}
												onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
												className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none ${
													errors.username ? 'border-red-500' : 'border-gray-300'
												}`}
												placeholder="관리자 아이디"
											/>
											{errors.username && (
												<p className="mt-1 text-sm text-red-600">{errors.username}</p>
											)}
										</div>

										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												이름 <span className="text-red-500">*</span>
											</label>
											<input
												type="text"
												value={formData.name}
												onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
												className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none ${
													errors.name ? 'border-red-500' : 'border-gray-300'
												}`}
												placeholder="관리자 이름"
											/>
											{errors.name && (
												<p className="mt-1 text-sm text-red-600">{errors.name}</p>
											)}
										</div>

										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												이메일 <span className="text-red-500">*</span>
											</label>
											<input
												type="email"
												value={formData.email}
												onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
												className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none ${
													errors.email ? 'border-red-500' : 'border-gray-300'
												}`}
												placeholder="admin@example.com"
											/>
											{errors.email && (
												<p className="mt-1 text-sm text-red-600">{errors.email}</p>
											)}
										</div>

										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												전화번호
											</label>
											<input
												type="tel"
												value={formData.phone}
												onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
												className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none"
												placeholder="032-123-4567"
											/>
										</div>
									</div>

									{/* 역할 */}
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											역할 <span className="text-red-500">*</span>
										</label>
										<select
											value={formData.role}
											onChange={(e) => handleRoleChange(e.target.value as Admin['role'])}
											className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none"
											aria-label="관리자 역할 선택"
										>
											<option value="staff">스태프</option>
											<option value="manager">매니저</option>
											<option value="admin">관리자</option>
											{currentAdmin?.role === 'super_admin' && (
												<option value="super_admin">최고관리자</option>
											)}
										</select>
									</div>

									{/* 권한 */}
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-3">
											권한 <span className="text-red-500">*</span>
										</label>
										<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
											{PERMISSIONS.map(permission => (
												<label key={permission.key} className="flex items-start space-x-3">
													<input
														type="checkbox"
														checked={formData.permissions.includes(permission.key)}
														onChange={() => togglePermission(permission.key)}
														className="mt-1 w-4 h-4 text-[#005BAC] border-gray-300 rounded focus:ring-[#005BAC]"
													/>
													<div>
														<div className="text-sm font-medium text-gray-900">
															{permission.name}
														</div>
														<div className="text-xs text-gray-500">
															{permission.description}
														</div>
													</div>
												</label>
											))}
										</div>
										{errors.permissions && (
											<p className="mt-2 text-sm text-red-600">{errors.permissions}</p>
										)}
									</div>

									{/* 상태 */}
									<div>
										<label className="flex items-center space-x-2">
											<input
												type="checkbox"
												checked={formData.isActive}
												onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
												className="w-4 h-4 text-[#005BAC] border-gray-300 rounded focus:ring-[#005BAC]"
											/>
											<span className="text-sm font-medium text-gray-700">활성 계정</span>
										</label>
									</div>
								</div>

								<div className="flex justify-end space-x-3 mt-6">
									<Button
										onClick={() => {
											setShowAddForm(false);
											setEditingAdmin(null);
											resetForm();
										}}
										variant="outline"
									>
										취소
									</Button>
									<Button
										onClick={handleSaveAdmin}
										className="bg-[#005BAC] hover:bg-[#004494]"
									>
										<Save className="w-4 h-4 mr-2" />
										{editingAdmin ? '수정' : '추가'}
									</Button>
								</div>
							</div>
						</div>
					)}

					{/* 비밀번호 변경 모달 */}
					{showPasswordChange && (
						<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
							<div className="bg-white rounded-lg p-6 w-full max-w-md">
								<div className="flex items-center justify-between mb-6">
									<h2 className="text-xl font-semibold">비밀번호 변경</h2>
									<Button
										onClick={() => setShowPasswordChange(false)}
										variant="ghost"
										size="sm"
									>
										✕
									</Button>
								</div>

								<div className="space-y-4">
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											현재 비밀번호 <span className="text-red-500">*</span>
										</label>
										<div className="relative">
											<input
												type={showPasswords.current ? "text" : "password"}
												value={passwordData.currentPassword}
												onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
												className={`w-full px-3 py-2 pr-10 border rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none ${
													errors.currentPassword ? 'border-red-500' : 'border-gray-300'
												}`}
												placeholder="현재 비밀번호를 입력하세요"
											/>
											<button
												type="button"
												onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
												className="absolute right-3 top-1/2 transform -translate-y-1/2"
												aria-label="현재 비밀번호 표시/숨김"
											>
												{showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
											</button>
										</div>
										{errors.currentPassword && (
											<p className="mt-1 text-sm text-red-600">{errors.currentPassword}</p>
										)}
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											새 비밀번호 <span className="text-red-500">*</span>
										</label>
										<div className="relative">
											<input
												type={showPasswords.new ? "text" : "password"}
												value={passwordData.newPassword}
												onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
												className={`w-full px-3 py-2 pr-10 border rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none ${
													errors.newPassword ? 'border-red-500' : 'border-gray-300'
												}`}
												placeholder="새 비밀번호를 입력하세요 (8자 이상)"
											/>
											<button
												type="button"
												onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
												className="absolute right-3 top-1/2 transform -translate-y-1/2"
												aria-label="새 비밀번호 표시/숨김"
											>
												{showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
											</button>
										</div>
										{errors.newPassword && (
											<p className="mt-1 text-sm text-red-600">{errors.newPassword}</p>
										)}
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											새 비밀번호 확인 <span className="text-red-500">*</span>
										</label>
										<div className="relative">
											<input
												type={showPasswords.confirm ? "text" : "password"}
												value={passwordData.confirmPassword}
												onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
												className={`w-full px-3 py-2 pr-10 border rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none ${
													errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
												}`}
												placeholder="새 비밀번호를 다시 입력하세요"
											/>
											<button
												type="button"
												onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
												className="absolute right-3 top-1/2 transform -translate-y-1/2"
												aria-label="비밀번호 확인 표시/숨김"
											>
												{showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
											</button>
										</div>
										{errors.confirmPassword && (
											<p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
										)}
									</div>
								</div>

								<div className="flex justify-end space-x-3 mt-6">
									<Button
										onClick={() => setShowPasswordChange(false)}
										variant="outline"
									>
										취소
									</Button>
									<Button
										onClick={handleChangePassword}
										className="bg-[#005BAC] hover:bg-[#004494]"
									>
										<Key className="w-4 h-4 mr-2" />
										변경
									</Button>
								</div>
							</div>
						</div>
					)}
				</div>
			</AdminLayout>
		</AdminAuthGuard>
	);
}
