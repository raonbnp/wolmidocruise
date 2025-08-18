import { createClient } from '@/lib/supabase/client';
import { Database } from '@/lib/supabase';

type Reservation = Database['public']['Tables']['reservations']['Row'];
type ReservationInsert = Database['public']['Tables']['reservations']['Insert'];
type ReservationUpdate = Database['public']['Tables']['reservations']['Update'];

const supabase = createClient();

// 주문번호 생성 함수
const generateOrderNumber = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const timestamp = now.getTime().toString().slice(-6);
  return `WMD${year}${month}${day}${timestamp}`;
};

// 예약 생성
export const createReservation = async (reservationData: {
  user_id?: string;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  product_id: number;
  product_name: string;
  product_image?: string;
  reservation_date: string;
  reservation_time: string;
  adult_count: number;
  child_count: number;
  infant_count: number;
  adult_price: number;
  child_price: number;
  total_amount: number;
  memo?: string;
}) => {
  try {
    const orderNumber = generateOrderNumber();

    const { data, error } = await supabase
      .from('reservations')
      .insert({
        ...reservationData,
        order_number: orderNumber,
        status: 'pending',
        payment_status: 'pending'
      })
      .select()
      .single();

    if (error) {
      console.error('예약 생성 실패:', error);
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    console.error('예약 생성 실패:', error);
    return { data: null, error: '예약 생성에 실패했습니다.' };
  }
};

// 예약 목록 조회 (사용자별)
export const getUserReservations = async (userId: string, options?: {
  page?: number;
  limit?: number;
  status?: string;
}) => {
  try {
    let query = supabase
      .from('reservations')
      .select('*')
      .eq('user_id', userId);

    // 상태 필터
    if (options?.status) {
      query = query.eq('status', options.status);
    }

    // 정렬 (최신순)
    query = query.order('created_at', { ascending: false });

    // 페이지네이션
    if (options?.page && options?.limit) {
      const from = (options.page - 1) * options.limit;
      const to = from + options.limit - 1;
      query = query.range(from, to);
    }

    const { data, error, count } = await query;

    if (error) {
      console.error('예약 목록 조회 실패:', error);
      return { data: [], error: error.message, count: 0 };
    }

    return { data: data || [], error: null, count: count || 0 };
  } catch (error) {
    console.error('예약 목록 조회 실패:', error);
    return { data: [], error: '예약 목록을 불러오는데 실패했습니다.', count: 0 };
  }
};

// 예약 상세 조회
export const getReservation = async (id: number) => {
  try {
    const { data, error } = await supabase
      .from('reservations')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('예약 상세 조회 실패:', error);
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    console.error('예약 상세 조회 실패:', error);
    return { data: null, error: '예약 정보를 불러오는데 실패했습니다.' };
  }
};

// 예약 조회 (주문번호 + 고객명)
export const getReservationByOrder = async (orderNumber: string, customerName: string) => {
  try {
    const { data, error } = await supabase
      .from('reservations')
      .select('*')
      .eq('order_number', orderNumber)
      .eq('customer_name', customerName)
      .single();

    if (error) {
      console.error('예약 조회 실패:', error);
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    console.error('예약 조회 실패:', error);
    return { data: null, error: '예약 정보를 찾을 수 없습니다.' };
  }
};

// 예약 수정
export const updateReservation = async (id: number, updates: ReservationUpdate) => {
  try {
    const { data, error } = await supabase
      .from('reservations')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('예약 수정 실패:', error);
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    console.error('예약 수정 실패:', error);
    return { data: null, error: '예약 수정에 실패했습니다.' };
  }
};

// 예약 취소
export const cancelReservation = async (id: number, cancelReason?: string) => {
  try {
    const { data, error } = await supabase
      .from('reservations')
      .update({
        status: 'cancelled',
        cancelled_at: new Date().toISOString(),
        cancel_reason: cancelReason
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('예약 취소 실패:', error);
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    console.error('예약 취소 실패:', error);
    return { data: null, error: '예약 취소에 실패했습니다.' };
  }
};

// 관리자용 예약 목록 조회
export const getAdminReservations = async (options?: {
  page?: number;
  limit?: number;
  status?: string;
  paymentStatus?: string;
  dateFrom?: string;
  dateTo?: string;
  search?: string;
}) => {
  try {
    let query = supabase
      .from('reservations')
      .select('*');

    // 필터 적용
    if (options?.status) {
      query = query.eq('status', options.status);
    }

    if (options?.paymentStatus) {
      query = query.eq('payment_status', options.paymentStatus);
    }

    if (options?.dateFrom) {
      query = query.gte('reservation_date', options.dateFrom);
    }

    if (options?.dateTo) {
      query = query.lte('reservation_date', options.dateTo);
    }

    if (options?.search) {
      query = query.or(`order_number.ilike.%${options.search}%,customer_name.ilike.%${options.search}%,customer_phone.ilike.%${options.search}%`);
    }

    // 정렬 (최신순)
    query = query.order('created_at', { ascending: false });

    // 페이지네이션
    if (options?.page && options?.limit) {
      const from = (options.page - 1) * options.limit;
      const to = from + options.limit - 1;
      query = query.range(from, to);
    }

    const { data, error, count } = await query;

    if (error) {
      console.error('관리자 예약 목록 조회 실패:', error);
      return { data: [], error: error.message, count: 0 };
    }

    return { data: data || [], error: null, count: count || 0 };
  } catch (error) {
    console.error('관리자 예약 목록 조회 실패:', error);
    return { data: [], error: '예약 목록을 불러오는데 실패했습니다.', count: 0 };
  }
};

// 예약 상태 변경 (관리자용)
export const updateReservationStatus = async (
  id: number, 
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'no_show'
) => {
  try {
    const updates: ReservationUpdate = { status };

    // 취소인 경우 취소 시간 추가
    if (status === 'cancelled') {
      updates.cancelled_at = new Date().toISOString();
    }

    const { data, error } = await supabase
      .from('reservations')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('예약 상태 변경 실패:', error);
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    console.error('예약 상태 변경 실패:', error);
    return { data: null, error: '예약 상태 변경에 실패했습니다.' };
  }
};

// 결제 상태 변경 (관리자용)
export const updatePaymentStatus = async (
  id: number, 
  paymentStatus: 'pending' | 'completed' | 'refunded' | 'failed'
) => {
  try {
    const { data, error } = await supabase
      .from('reservations')
      .update({ payment_status: paymentStatus })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('결제 상태 변경 실패:', error);
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    console.error('결제 상태 변경 실패:', error);
    return { data: null, error: '결제 상태 변경에 실패했습니다.' };
  }
};

// 예약 통계 조회 (관리자용)
export const getReservationStats = async (dateFrom?: string, dateTo?: string) => {
  try {
    let query = supabase
      .from('reservations')
      .select('status, payment_status, total_amount, reservation_date');

    if (dateFrom) {
      query = query.gte('reservation_date', dateFrom);
    }

    if (dateTo) {
      query = query.lte('reservation_date', dateTo);
    }

    const { data, error } = await query;

    if (error) {
      console.error('예약 통계 조회 실패:', error);
      return { data: null, error: error.message };
    }

    // 통계 계산
    const stats = {
      totalReservations: data?.length || 0,
      pendingReservations: data?.filter(r => r.status === 'pending').length || 0,
      confirmedReservations: data?.filter(r => r.status === 'confirmed').length || 0,
      cancelledReservations: data?.filter(r => r.status === 'cancelled').length || 0,
      completedReservations: data?.filter(r => r.status === 'completed').length || 0,
      totalRevenue: data?.filter(r => r.payment_status === 'completed')
                        .reduce((sum, r) => sum + r.total_amount, 0) || 0,
      pendingPayments: data?.filter(r => r.payment_status === 'pending').length || 0,
      completedPayments: data?.filter(r => r.payment_status === 'completed').length || 0
    };

    return { data: stats, error: null };
  } catch (error) {
    console.error('예약 통계 조회 실패:', error);
    return { data: null, error: '예약 통계를 불러오는데 실패했습니다.' };
  }
};
