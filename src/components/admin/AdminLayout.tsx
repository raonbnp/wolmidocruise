"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";
import {
	LayoutDashboard,
	Ship,
	Calendar,
	Users,
	MessageSquare,
	HelpCircle,
	MessageCircleQuestion,
	Instagram,
	Star,
	BarChart3,
	Monitor,
	Settings,

	LogOut,
	User,
	Bell,
	Search,
	ChevronDown,
	ChevronRight
} from "lucide-react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { AdminMenuItem } from "@/types/admin";

interface AdminLayoutProps {
	children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
	const pathname = usePathname();
	const { admin, logout, hasPermission } = useAdminAuth();

	const [expandedItems, setExpandedItems] = useState<string[]>([]);

	// 현재 active한 메뉴의 부모를 자동으로 확장
	useEffect(() => {
		const activeParent = menuItems.find(item => 
			item.children?.some(child => child.href && pathname === child.href)
		);
		
		if (activeParent && !expandedItems.includes(activeParent.id)) {
			setExpandedItems(prev => [...prev, activeParent.id]);
		}
	}, [pathname]);

	// 관리자 메뉴 구조
	const menuItems: AdminMenuItem[] = [
		{
			id: 'dashboard',
			title: '대시보드',
			icon: 'LayoutDashboard',
			href: '/admin',
			permission: 'dashboard'
		},
		{
			id: 'cruise',
			title: '크루즈 상품 관리',
			icon: 'Ship',
			permission: 'cruise',
			children: [
				{ id: 'cruise-list', title: '상품 목록', href: '/admin/cruise', permission: 'cruise' },
				{ id: 'cruise-create', title: '상품 등록', href: '/admin/cruise/create', permission: 'cruise' }
			]
		},
		{
			id: 'reservation',
			title: '예약 관리',
			icon: 'Calendar',
			permission: 'reservation',
			badge: 5, // 처리 대기 예약 수
			children: [
				{ id: 'reservation-list', title: '예약 목록', href: '/admin/reservation', permission: 'reservation' },
				{ id: 'reservation-calendar', title: '예약 캘린더', href: '/admin/reservation/calendar', permission: 'reservation' },
				{ id: 'reservation-stats', title: '예약 통계', href: '/admin/reservation/stats', permission: 'reservation' }
			]
		},
		{
			id: 'user',
			title: '회원 관리',
			icon: 'Users',
			permission: 'user',
			children: [
				{ id: 'user-list', title: '회원 목록', href: '/admin/user', permission: 'user' },
				{ id: 'user-stats', title: '회원 통계', href: '/admin/user/stats', permission: 'user' },
				{ id: 'admin-settings', title: '관리자 설정', href: '/admin/user/admin-settings', permission: 'user' }
			]
		},
		{
			id: 'board',
			title: '게시판 관리',
			icon: 'MessageSquare',
			permission: 'notice',
			children: [
				{ id: 'notice', title: '공지사항', href: '/admin/notice', permission: 'notice' },
				{ id: 'faq', title: '자주묻는질문', href: '/admin/faq', permission: 'faq' },
				{ id: 'qna', title: '묻고답하기', href: '/admin/qna', permission: 'qna', badge: 3 }
			]
		},
		{
			id: 'event',
			title: '이벤트 관리',
			icon: 'Star',
			permission: 'eventSns',
			children: [
				{ id: 'event-sns', title: '이벤트SNS', href: '/admin/event/sns', permission: 'eventSns' },
				{ id: 'cruise-review', title: '크루즈 리뷰', href: '/admin/event/reviews', permission: 'cruiseReview' }
			]
		},
		{
			id: 'statistics',
			title: '통계',
			icon: 'BarChart3',
			href: '/admin/statistics',
			permission: 'statistics'
		},
		{
			id: 'popup',
			title: '팝업 관리',
			icon: 'Monitor',
			href: '/admin/popup',
			permission: 'popup'
		},
		{
			id: 'system',
			title: '시스템 설정',
			icon: 'Settings',
			href: '/admin/system',
			permission: 'system'
		}
	];

	// 권한에 따라 메뉴 필터링
	const filteredMenuItems = menuItems.filter(item => hasPermission(item.permission));

	// 아이콘 렌더링
	const renderIcon = (iconName: string, className = "w-5 h-5") => {
		const icons: { [key: string]: React.ComponentType<any> } = {
			LayoutDashboard,
			Ship,
			Calendar,
			Users,
			MessageSquare,
			HelpCircle,
			MessageCircleQuestion,
			Instagram,
			Star,
			BarChart3,
			Monitor,
			Settings
		};
		
		const IconComponent = icons[iconName];
		return IconComponent ? <IconComponent className={className} /> : null;
	};

	// 메뉴 아이템 토글
	const toggleMenuItem = (itemId: string) => {
		setExpandedItems(prev => 
			prev.includes(itemId) 
				? prev.filter(id => id !== itemId)
				: [...prev, itemId]
		);
	};

	// 현재 경로 확인
	const isActivePath = (href: string) => {
		// 정확한 경로 매칭만 사용
		return pathname === href;
	};

	// 사이드바 메뉴 렌더링
	const renderMenuItem = (item: AdminMenuItem, level = 0) => {
		const hasChildren = item.children && item.children.length > 0;
		const isExpanded = expandedItems.includes(item.id);
		
		// 부모 메뉴의 경우 자식 메뉴 중 하나가 active면 부모도 active
		const isActive = item.href 
			? isActivePath(item.href) 
			: hasChildren 
				? item.children?.some(child => child.href && isActivePath(child.href)) || false
				: false;
		
		// 레벨별 패딩 계산
		const paddingLeft = level === 0 ? 'pl-4' : level === 1 ? 'pl-8' : 'pl-12';

		if (hasChildren) {
			return (
				<div key={item.id} className="mb-1">
					<button
						onClick={() => toggleMenuItem(item.id)}
						className={`w-full flex items-center justify-between py-3 px-4 text-left rounded-lg transition-all duration-200 group ${
							isActive 
								? 'bg-[#005BAC] text-white shadow-md' 
								: 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
						} ${paddingLeft}`}
					>
						<div className="flex items-center space-x-3 flex-1 min-w-0">
							{renderIcon(item.icon, "w-5 h-5 flex-shrink-0")}
							<span className="font-medium text-sm truncate">{item.title}</span>
							{item.badge && (
								<Badge variant="destructive" className="ml-2 text-xs px-2 py-0.5 min-w-0 flex-shrink-0 text-white">
									{item.badge}
								</Badge>
							)}
						</div>
						<div className="flex-shrink-0 ml-2">
							{isExpanded ? (
								<ChevronDown className="w-4 h-4 transition-transform duration-200" />
							) : (
								<ChevronRight className="w-4 h-4 transition-transform duration-200" />
							)}
						</div>
					</button>
					{isExpanded && (
						<div className="mt-1 space-y-1 animate-in slide-in-from-top-2 duration-200">
							{item.children?.filter(child => hasPermission(child.permission)).map(child => 
								renderMenuItem(child, level + 1)
							)}
						</div>
					)}
				</div>
			);
		}

		return (
			<div key={item.id} className="mb-1">
				<Link href={item.href || '#'}>
					<div
						className={`flex items-center space-x-3 py-3 px-4 rounded-lg transition-all duration-200 group ${
							isActive 
								? level === 0 
									? 'bg-[#005BAC] text-white shadow-md' 
									: 'bg-blue-50 text-[#005BAC] border-l-4 border-[#005BAC] font-medium'
								: 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
						} ${paddingLeft}`}
					>
						{renderIcon(item.icon, "w-5 h-5 flex-shrink-0")}
						<span className="font-medium text-sm truncate flex-1">{item.title}</span>
						{item.badge && (
							<Badge variant="destructive" className="text-xs px-2 py-0.5 min-w-0 flex-shrink-0 text-white">
								{item.badge}
							</Badge>
						)}
					</div>
				</Link>
			</div>
		);
	};

	// 로그아웃 핸들러
	const handleLogout = async () => {
		if (confirm('로그아웃 하시겠습니까?')) {
			await logout();
			window.location.href = '/admin/login';
		}
	};

	const Sidebar = () => (
		<div className="h-full flex flex-col bg-white border-r border-gray-200 shadow-sm">
			{/* 로고 */}
			<div className="px-6 py-6 border-b border-gray-200 bg-gradient-to-r from-[#005BAC] to-[#0066CC]">
				<Link href="/admin" className="flex items-center space-x-3 group">
					<div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:bg-white/30 transition-colors duration-200">
						<span className="text-white font-bold text-xl">월</span>
					</div>
					<div>
						<h1 className="text-xl font-bold text-white group-hover:text-white/90 transition-colors duration-200">월미도 관리자</h1>
						<p className="text-sm text-white/80">해양관광 관리시스템</p>
					</div>
				</Link>
			</div>

			{/* 메뉴 */}
			<nav className="flex-1 px-3 py-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
				<div className="space-y-1">
					{filteredMenuItems.map(item => renderMenuItem(item))}
				</div>
			</nav>

			{/* 관리자 정보 */}
			<div className="px-4 py-4 border-t border-gray-200 bg-gray-50/50">
				<div className="flex items-center space-x-3 mb-4 p-3 bg-white rounded-lg border border-gray-100">
					<div className="w-10 h-10 bg-gradient-to-r from-[#005BAC] to-[#0066CC] rounded-full flex items-center justify-center">
						<User className="w-5 h-5 text-white" />
					</div>
					<div className="flex-1 min-w-0">
						<p className="text-sm font-semibold text-gray-900 truncate">{admin?.name}</p>
						<p className="text-xs text-gray-500 truncate capitalize">{admin?.role?.replace('_', ' ')}</p>
					</div>
				</div>
				<Button
					variant="outline"
					size="sm"
					onClick={handleLogout}
					className="w-full flex items-center justify-center space-x-2 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors duration-200"
				>
					<LogOut className="w-4 h-4" />
					<span>로그아웃</span>
				</Button>
			</div>
		</div>
	);

	return (
		<div className="min-h-screen bg-gray-50">
			{/* 데스크톱 사이드바 */}
			<div className="fixed inset-y-0 left-0 w-80 z-50">
				<Sidebar />
			</div>



			{/* 메인 컨텐츠 */}
			<div className="ml-80">
				{/* 헤더 */}
				<header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
					<div className="px-6 py-4">
						<div className="flex items-center justify-between">
							<div className="flex items-center space-x-4">
								{/* 페이지 제목 */}
								<div>
									<h2 className="text-2xl font-bold text-gray-900">
										{pathname === '/admin' ? '대시보드' : '관리자'}
									</h2>
									<p className="text-sm text-gray-500 mt-1">
										{pathname === '/admin' ? '시스템 현황을 한눈에 확인하세요' : '관리 도구'}
									</p>
								</div>
							</div>

							<div className="flex items-center space-x-4">
								{/* 검색 */}
								<div className="hidden lg:flex items-center space-x-2">
									<div className="relative">
										<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
										<input
											type="text"
											placeholder="빠른 검색..."
											className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005BAC] focus:border-[#005BAC] outline-none bg-gray-50 focus:bg-white transition-colors duration-200"
										/>
									</div>
								</div>

								{/* 알림 */}
								<Button variant="ghost" size="sm" className="relative hover:bg-gray-100 transition-colors duration-200">
									<Bell className="w-5 h-5 text-gray-600" />
									<Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs bg-red-500 text-white">
										3
									</Badge>
								</Button>

								{/* 관리자 정보 */}
								<div className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
									<div className="w-8 h-8 bg-gradient-to-r from-[#005BAC] to-[#0066CC] rounded-full flex items-center justify-center">
										<User className="w-4 h-4 text-white" />
									</div>
									<div className="hidden md:block text-right">
										<p className="text-sm font-semibold text-gray-900">{admin?.name}</p>
										<p className="text-xs text-gray-500 capitalize">{admin?.role?.replace('_', ' ')}</p>
									</div>
									<ChevronDown className="w-4 h-4 text-gray-400 hidden md:block" />
								</div>
							</div>
						</div>
					</div>
				</header>

				{/* 메인 컨텐츠 */}
				<main className="p-6 bg-gray-50 min-h-screen">
					<div className="max-w-full">
						{children}
					</div>
				</main>
			</div>
		</div>
	);
}
