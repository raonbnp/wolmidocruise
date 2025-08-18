import { createClient } from '@/lib/supabase/client';
import { Database } from '@/lib/supabase';

type CruiseProduct = Database['public']['Tables']['cruise_products']['Row'];
type CruiseProductInsert = Database['public']['Tables']['cruise_products']['Insert'];
type CruiseProductUpdate = Database['public']['Tables']['cruise_products']['Update'];

const supabase = createClient();

// 크루즈 상품 목록 조회
export const getCruiseProducts = async (options?: {
  page?: number;
  limit?: number;
  isActive?: boolean;
  isPopular?: boolean;
  search?: string;
}) => {
  try {
    let query = supabase
      .from('cruise_products')
      .select('*');

    // 필터 적용
    if (options?.isActive !== undefined) {
      query = query.eq('is_active', options.isActive);
    }

    if (options?.isPopular !== undefined) {
      query = query.eq('is_popular', options.isPopular);
    }

    if (options?.search) {
      query = query.or(`name.ilike.%${options.search}%,description.ilike.%${options.search}%`);
    }

    // 정렬 (인기상품 먼저, 그다음 생성일순)
    query = query.order('is_popular', { ascending: false })
                 .order('created_at', { ascending: false });

    // 페이지네이션
    if (options?.page && options?.limit) {
      const from = (options.page - 1) * options.limit;
      const to = from + options.limit - 1;
      query = query.range(from, to);
    }

    const { data, error, count } = await query;

    if (error) {
      console.error('크루즈 상품 조회 실패:', error);
      return { data: [], error: error.message, count: 0 };
    }

    return { data: data || [], error: null, count: count || 0 };
  } catch (error) {
    console.error('크루즈 상품 조회 실패:', error);
    return { data: [], error: '크루즈 상품을 불러오는데 실패했습니다.', count: 0 };
  }
};

// 크루즈 상품 상세 조회
export const getCruiseProduct = async (id: number) => {
  try {
    const { data, error } = await supabase
      .from('cruise_products')
      .select('*')
      .eq('id', id)
      .eq('is_active', true)
      .single();

    if (error) {
      console.error('크루즈 상품 상세 조회 실패:', error);
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    console.error('크루즈 상품 상세 조회 실패:', error);
    return { data: null, error: '상품 정보를 불러오는데 실패했습니다.' };
  }
};

// 크루즈 상품 생성 (관리자용)
export const createCruiseProduct = async (productData: CruiseProductInsert) => {
  try {
    const { data, error } = await supabase
      .from('cruise_products')
      .insert(productData)
      .select()
      .single();

    if (error) {
      console.error('크루즈 상품 생성 실패:', error);
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    console.error('크루즈 상품 생성 실패:', error);
    return { data: null, error: '상품 생성에 실패했습니다.' };
  }
};

// 크루즈 상품 수정 (관리자용)
export const updateCruiseProduct = async (id: number, updates: CruiseProductUpdate) => {
  try {
    const { data, error } = await supabase
      .from('cruise_products')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('크루즈 상품 수정 실패:', error);
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    console.error('크루즈 상품 수정 실패:', error);
    return { data: null, error: '상품 수정에 실패했습니다.' };
  }
};

// 크루즈 상품 삭제 (관리자용)
export const deleteCruiseProduct = async (id: number) => {
  try {
    // 실제 삭제 대신 비활성화
    const { error } = await supabase
      .from('cruise_products')
      .update({ is_active: false })
      .eq('id', id);

    if (error) {
      console.error('크루즈 상품 삭제 실패:', error);
      return { error: error.message };
    }

    return { error: null };
  } catch (error) {
    console.error('크루즈 상품 삭제 실패:', error);
    return { error: '상품 삭제에 실패했습니다.' };
  }
};

// 인기 상품 토글 (관리자용)
export const toggleCruiseProductPopular = async (id: number, isPopular: boolean) => {
  try {
    const { data, error } = await supabase
      .from('cruise_products')
      .update({ is_popular: isPopular })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('인기 상품 설정 실패:', error);
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    console.error('인기 상품 설정 실패:', error);
    return { data: null, error: '인기 상품 설정에 실패했습니다.' };
  }
};

// 상품 활성화/비활성화 토글 (관리자용)
export const toggleCruiseProductActive = async (id: number, isActive: boolean) => {
  try {
    const { data, error } = await supabase
      .from('cruise_products')
      .update({ is_active: isActive })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('상품 활성화 설정 실패:', error);
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    console.error('상품 활성화 설정 실패:', error);
    return { data: null, error: '상품 활성화 설정에 실패했습니다.' };
  }
};
