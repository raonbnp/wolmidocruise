"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Heart, MessageCircle, Calendar, Star, ThumbsUp, User, Edit, Trash2 } from "lucide-react";
import { useState } from "react";

interface GalleryItem {
	id: number;
	title: string;
	description?: string;
	content?: string;
	imageUrl: string;
	author: string;
	date: string;
	views: number;
	likes?: number;
	comments?: number;
	rating?: number;
	tags?: string[];
	platform?: string;
	cruise?: string;
	verified?: boolean;
}

interface GalleryCardProps {
	item: GalleryItem;
	type: 'sns' | 'review';
	isAdmin?: boolean;
	onEdit?: (id: number) => void;
	onDelete?: (id: number) => void;
	onLike?: (id: number) => void;
}

export default function GalleryCard({ 
	item, 
	type, 
	isAdmin = false, 
	onEdit, 
	onDelete, 
	onLike 
}: GalleryCardProps) {
	const [isLiked, setIsLiked] = useState(false);
	const [likeCount, setLikeCount] = useState(item.likes || 0);

	const formatDate = (dateString: string) => {
		return dateString.replace(/-/g, '.');
	};

	const formatNumber = (num: number) => {
		return num.toLocaleString();
	};

	const handleLike = () => {
		if (onLike) {
			onLike(item.id);
		}
		setIsLiked(!isLiked);
		setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
	};

	const renderStars = (rating: number) => {
		return Array.from({ length: 5 }, (_, i) => (
			<Star
				key={i}
				className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
			/>
		));
	};

	const getPlatformColor = (platform?: string) => {
		switch (platform) {
			case "Instagram":
				return "bg-gradient-to-r from-purple-500 to-pink-500 text-white";
			case "Facebook":
				return "bg-blue-600 text-white";
			default:
				return "bg-gray-500 text-white";
		}
	};

	return (
		<Card className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] cursor-pointer group">
			{/* 이미지 영역 */}
			<div className="relative h-64 overflow-hidden">
				<img
					src={item.imageUrl}
					alt={item.title}
					className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
				/>

				{/* 관리자 컨트롤 */}
				{isAdmin && (
					<div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
						<div className="flex space-x-2">
							<Button
								size="sm"
								variant="secondary"
								onClick={(e) => {
									e.stopPropagation();
									onEdit?.(item.id);
								}}
								className="bg-white/90 hover:bg-white"
							>
								<Edit className="w-4 h-4" />
							</Button>
							<Button
								size="sm"
								variant="destructive"
								onClick={(e) => {
									e.stopPropagation();
									onDelete?.(item.id);
								}}
								className="bg-red-500/90 hover:bg-red-600"
							>
								<Trash2 className="w-4 h-4" />
							</Button>
						</div>
					</div>
				)}

				{/* 플랫폼 배지 (SNS 타입) */}
				{type === 'sns' && item.platform && (
					<div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-semibold ${getPlatformColor(item.platform)}`}>
						{item.platform}
					</div>
				)}

				{/* 평점 배지 (리뷰 타입) */}
				{type === 'review' && item.rating && (
					<div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1">
						<div className="flex">
							{renderStars(item.rating)}
						</div>
					</div>
				)}

				{/* 인증 배지 */}
				{item.verified && (
					<div className="absolute top-3 right-3 bg-[#03C75A] text-white px-2 py-1 rounded-full text-xs font-semibold">
						인증{type === 'review' ? '리뷰' : ''}
					</div>
				)}

				{/* 통계 오버레이 */}
				<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
					<div className="flex items-center space-x-4 text-white text-sm">
						{type === 'sns' ? (
							<>
								<div className="flex items-center space-x-1">
									<Heart className="w-4 h-4" />
									<span>{formatNumber(likeCount)}</span>
								</div>
								{item.comments && (
									<div className="flex items-center space-x-1">
										<MessageCircle className="w-4 h-4" />
										<span>{formatNumber(item.comments)}</span>
									</div>
								)}
							</>
						) : (
							<div className="flex items-center space-x-1">
								<ThumbsUp className="w-4 h-4" />
								<span>{formatNumber(likeCount)}</span>
							</div>
						)}
						<div className="flex items-center space-x-1">
							<Eye className="w-4 h-4" />
							<span>{formatNumber(item.views)}</span>
						</div>
					</div>
				</div>
			</div>

			{/* 콘텐츠 영역 */}
			<CardContent className="p-6">
				{/* 크루즈 타입 (리뷰 타입) */}
				{type === 'review' && item.cruise && (
					<div className="mb-3">
						<span className="inline-block px-3 py-1 bg-blue-100 text-[#005BAC] text-sm font-medium rounded-full">
							{item.cruise}
						</span>
					</div>
				)}
				
				{/* 제목 */}
				<h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
					{item.title}
				</h3>
				
				{/* 설명/내용 */}
				<p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
					{item.description || item.content}
				</p>

				{/* 태그 (SNS 타입) */}
				{type === 'sns' && item.tags && (
					<div className="flex flex-wrap gap-2 mb-4">
						{item.tags.slice(0, 3).map((tag, index) => (
							<span
								key={index}
								className="px-2 py-1 bg-blue-100 text-[#005BAC] text-xs rounded-full"
							>
								{tag}
							</span>
						))}
						{item.tags.length > 3 && (
							<span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-full">
								+{item.tags.length - 3}
							</span>
						)}
					</div>
				)}

				{/* 하단 정보 */}
				<div className="flex justify-between items-center text-sm text-gray-500">
					<div className="flex items-center space-x-2">
						<User className="w-4 h-4" />
						<span>{item.author}</span>
						{item.verified && (
							<span className="text-[#03C75A] text-xs">✓</span>
						)}
					</div>
					<div className="flex items-center space-x-1">
						<Calendar className="w-4 h-4" />
						<span>{formatDate(item.date)}</span>
					</div>
				</div>

				{/* 좋아요 버튼 */}
				{!isAdmin && (
					<div className="mt-4 pt-4 border-t border-gray-200">
						<Button
							variant="ghost"
							size="sm"
							onClick={(e) => {
								e.stopPropagation();
								handleLike();
							}}
							className={`w-full ${isLiked ? 'text-red-500' : 'text-gray-500'} hover:text-red-500`}
						>
							<Heart className={`w-4 h-4 mr-2 ${isLiked ? 'fill-current' : ''}`} />
							좋아요 {formatNumber(likeCount)}
						</Button>
					</div>
				)}
			</CardContent>
		</Card>
	);
}



