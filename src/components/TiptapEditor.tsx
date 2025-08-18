"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import { Button } from '@/components/ui/button';
import { 
	Bold, 
	Italic, 
	Underline, 
	List, 
	ListOrdered, 
	Quote, 
	Undo, 
	Redo,
	AlignLeft,
	AlignCenter,
	AlignRight,
	ImageIcon,
	Link as LinkIcon
} from 'lucide-react';

interface TiptapEditorProps {
	content: string;
	onChange: (content: string) => void;
	placeholder?: string;
}

export default function TiptapEditor({ content, onChange, placeholder = "내용을 입력하세요..." }: TiptapEditorProps) {
	const editor = useEditor({
		extensions: [
			StarterKit,
			Image.configure({
				HTMLAttributes: {
					class: 'max-w-full h-auto rounded-lg',
				},
			}),
			Link.configure({
				openOnClick: false,
				HTMLAttributes: {
					class: 'text-[#005BAC] underline',
				},
			}),
			TextAlign.configure({
				types: ['heading', 'paragraph'],
			}),
		],
		content,
		immediatelyRender: false, // SSR 오류 해결
		onUpdate: ({ editor }) => {
			onChange(editor.getHTML());
		},
		editorProps: {
			attributes: {
				class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[200px] p-4',
			},
		},
	});

	if (!editor) {
		return null;
	}

	const addImage = () => {
		const url = window.prompt('이미지 URL을 입력하세요:');
		if (url) {
			editor.chain().focus().setImage({ src: url }).run();
		}
	};

	const addLink = () => {
		const previousUrl = editor.getAttributes('link').href;
		const url = window.prompt('링크 URL을 입력하세요:', previousUrl);
		
		if (url === null) {
			return;
		}

		if (url === '') {
			editor.chain().focus().extendMarkRange('link').unsetLink().run();
			return;
		}

		editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
	};

	return (
		<div className="border border-gray-300 rounded-lg overflow-hidden">
			{/* 툴바 */}
			<div className="border-b border-gray-200 p-2 bg-gray-50 flex flex-wrap gap-1">
				{/* 텍스트 스타일 */}
				<Button
					type="button"
					variant="ghost"
					size="sm"
					onClick={() => editor.chain().focus().toggleBold().run()}
					className={editor.isActive('bold') ? 'bg-gray-200' : ''}
				>
					<Bold className="w-4 h-4" />
				</Button>
				<Button
					type="button"
					variant="ghost"
					size="sm"
					onClick={() => editor.chain().focus().toggleItalic().run()}
					className={editor.isActive('italic') ? 'bg-gray-200' : ''}
				>
					<Italic className="w-4 h-4" />
				</Button>
				<Button
					type="button"
					variant="ghost"
					size="sm"
					onClick={() => editor.chain().focus().toggleStrike().run()}
					className={editor.isActive('strike') ? 'bg-gray-200' : ''}
				>
					<Underline className="w-4 h-4" />
				</Button>

				<div className="w-px h-6 bg-gray-300 mx-1" />

				{/* 정렬 */}
				<Button
					type="button"
					variant="ghost"
					size="sm"
					onClick={() => editor.chain().focus().setTextAlign('left').run()}
					className={editor.isActive({ textAlign: 'left' }) ? 'bg-gray-200' : ''}
				>
					<AlignLeft className="w-4 h-4" />
				</Button>
				<Button
					type="button"
					variant="ghost"
					size="sm"
					onClick={() => editor.chain().focus().setTextAlign('center').run()}
					className={editor.isActive({ textAlign: 'center' }) ? 'bg-gray-200' : ''}
				>
					<AlignCenter className="w-4 h-4" />
				</Button>
				<Button
					type="button"
					variant="ghost"
					size="sm"
					onClick={() => editor.chain().focus().setTextAlign('right').run()}
					className={editor.isActive({ textAlign: 'right' }) ? 'bg-gray-200' : ''}
				>
					<AlignRight className="w-4 h-4" />
				</Button>

				<div className="w-px h-6 bg-gray-300 mx-1" />

				{/* 목록 */}
				<Button
					type="button"
					variant="ghost"
					size="sm"
					onClick={() => editor.chain().focus().toggleBulletList().run()}
					className={editor.isActive('bulletList') ? 'bg-gray-200' : ''}
				>
					<List className="w-4 h-4" />
				</Button>
				<Button
					type="button"
					variant="ghost"
					size="sm"
					onClick={() => editor.chain().focus().toggleOrderedList().run()}
					className={editor.isActive('orderedList') ? 'bg-gray-200' : ''}
				>
					<ListOrdered className="w-4 h-4" />
				</Button>
				<Button
					type="button"
					variant="ghost"
					size="sm"
					onClick={() => editor.chain().focus().toggleBlockquote().run()}
					className={editor.isActive('blockquote') ? 'bg-gray-200' : ''}
				>
					<Quote className="w-4 h-4" />
				</Button>

				<div className="w-px h-6 bg-gray-300 mx-1" />

				{/* 미디어 */}
				<Button
					type="button"
					variant="ghost"
					size="sm"
					onClick={addImage}
				>
					<ImageIcon className="w-4 h-4" />
				</Button>
				<Button
					type="button"
					variant="ghost"
					size="sm"
					onClick={addLink}
					className={editor.isActive('link') ? 'bg-gray-200' : ''}
				>
					<LinkIcon className="w-4 h-4" />
				</Button>

				<div className="w-px h-6 bg-gray-300 mx-1" />

				{/* 실행 취소/다시 실행 */}
				<Button
					type="button"
					variant="ghost"
					size="sm"
					onClick={() => editor.chain().focus().undo().run()}
					disabled={!editor.can().chain().focus().undo().run()}
				>
					<Undo className="w-4 h-4" />
				</Button>
				<Button
					type="button"
					variant="ghost"
					size="sm"
					onClick={() => editor.chain().focus().redo().run()}
					disabled={!editor.can().chain().focus().redo().run()}
				>
					<Redo className="w-4 h-4" />
				</Button>
			</div>

			{/* 에디터 */}
			<div className="min-h-[200px] bg-white">
				<EditorContent 
					editor={editor} 
					placeholder={placeholder}
				/>
			</div>
		</div>
	);
}
