import { createClient } from '@/lib/supabase/client';
import { Database } from '@/lib/supabase';

type Notice = Database['public']['Tables']['notices']['Row'];
type NoticeInsert = Database['public']['Tables']['notices']['Insert'];
type NoticeUpdate = Database['public']['Tables']['notices']['Update'];

const supabase = createClient();

// 공지사항 목록 조회
export const getNotices = async (options?: {
  page?: number;
  limit?: number;
  isActive?: boolean;
  search?: string;
}) => {
  try {
    let query = supabase
      .from('notices')
      .select('*');

    // 필터 적용
    if (options?.isActive !== undefined) {
      query = query.eq('is_active', options.isActive);
    }

    if (options?.search) {
      query = query.or(`title.ilike.%${options.search}%,content.ilike.%${options.search}%`);
    }

    // 정렬 (고정글 먼저, 그다음 생성일순)
    query = query.order('is_pinned', { ascending: false })
                 .order('created_at', { ascending: false });

    // 페이지네이션
    if (options?.page && options?.limit) {
      const from = (options.page - 1) * options.limit;
      const to = from + options.limit - 1;
      query = query.range(from, to);
    }

    const { data, error, count } = await query;

    if (error) {
      console.error('공지사항 조회 실패:', error);
      return { data: [], error: error.message, count: 0 };
    }

    return { data: data || [], error: null, count: count || 0 };
  } catch (error) {
    console.error('공지사항 조회 실패:', error);
    return { data: [], error: '공지사항을 불러오는데 실패했습니다.', count: 0 };
  }
};

// 공지사항 상세 조회
export const getNotice = async (id: number) => {
  try {
    // 조회수 증가
    const { error: viewError } = await supabase.rpc('increment_notice_views', { 
      notice_id: id 
    });

    if (viewError) {
      console.warn('조회수 증가 실패:', viewError);
    }

    const { data, error } = await supabase
      .from('notices')
      .select('*')
      .eq('id', id)
      .eq('is_active', true)
      .single();

    if (error) {
      console.error('공지사항 상세 조회 실패:', error);
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    console.error('공지사항 상세 조회 실패:', error);
    return { data: null, error: '공지사항을 불러오는데 실패했습니다.' };
  }
};

// 공지사항 생성 (관리자용)
export const createNotice = async (noticeData: NoticeInsert) => {
  try {
    const { data, error } = await supabase
      .from('notices')
      .insert(noticeData)
      .select()
      .single();

    if (error) {
      console.error('공지사항 생성 실패:', error);
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    console.error('공지사항 생성 실패:', error);
    return { data: null, error: '공지사항 생성에 실패했습니다.' };
  }
};

// 공지사항 수정 (관리자용)
export const updateNotice = async (id: number, updates: NoticeUpdate) => {
  try {
    const { data, error } = await supabase
      .from('notices')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('공지사항 수정 실패:', error);
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    console.error('공지사항 수정 실패:', error);
    return { data: null, error: '공지사항 수정에 실패했습니다.' };
  }
};

// 공지사항 삭제 (관리자용)
export const deleteNotice = async (id: number) => {
  try {
    // 실제 삭제 대신 비활성화
    const { error } = await supabase
      .from('notices')
      .update({ is_active: false })
      .eq('id', id);

    if (error) {
      console.error('공지사항 삭제 실패:', error);
      return { error: error.message };
    }

    return { error: null };
  } catch (error) {
    console.error('공지사항 삭제 실패:', error);
    return { error: '공지사항 삭제에 실패했습니다.' };
  }
};

// 고정글 토글 (관리자용)
export const toggleNoticePinned = async (id: number, isPinned: boolean) => {
  try {
    const { data, error } = await supabase
      .from('notices')
      .update({ is_pinned: isPinned })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('고정글 설정 실패:', error);
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    console.error('고정글 설정 실패:', error);
    return { data: null, error: '고정글 설정에 실패했습니다.' };
  }
};
