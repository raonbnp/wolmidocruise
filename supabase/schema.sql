-- 월미도 해양관광 데이터베이스 스키마

-- Enable RLS (Row Level Security)
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 사용자 테이블 (Supabase Auth와 연동)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 관리자 사용자 테이블
CREATE TABLE IF NOT EXISTS admin_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(20) DEFAULT 'viewer' CHECK (role IN ('super_admin', 'admin', 'operator', 'viewer')),
    permissions JSONB DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 크루즈 상품 테이블
CREATE TABLE IF NOT EXISTS cruise_products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    duration VARCHAR(50) NOT NULL,
    schedule VARCHAR(100) NOT NULL,
    adult_price INTEGER NOT NULL,
    child_price INTEGER NOT NULL,
    image_url VARCHAR(500),
    is_popular BOOLEAN DEFAULT false,
    rating DECIMAL(2,1) DEFAULT 0,
    review_count INTEGER DEFAULT 0,
    tags TEXT[] DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 예약 테이블
CREATE TABLE IF NOT EXISTS reservations (
    id SERIAL PRIMARY KEY,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    customer_name VARCHAR(100) NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    customer_email VARCHAR(255),
    product_id INTEGER REFERENCES cruise_products(id) ON DELETE RESTRICT,
    product_name VARCHAR(200) NOT NULL,
    product_image VARCHAR(500),
    reservation_date DATE NOT NULL,
    reservation_time TIME NOT NULL,
    adult_count INTEGER NOT NULL DEFAULT 0,
    child_count INTEGER NOT NULL DEFAULT 0,
    infant_count INTEGER NOT NULL DEFAULT 0,
    adult_price INTEGER NOT NULL,
    child_price INTEGER NOT NULL,
    total_amount INTEGER NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed', 'no_show')),
    payment_status VARCHAR(20) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'refunded', 'failed')),
    memo TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    cancelled_at TIMESTAMP WITH TIME ZONE,
    cancel_reason TEXT
);

-- 공지사항 테이블
CREATE TABLE IF NOT EXISTS notices (
    id SERIAL PRIMARY KEY,
    title VARCHAR(300) NOT NULL,
    content TEXT NOT NULL,
    is_pinned BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    views INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- FAQ 테이블
CREATE TABLE IF NOT EXISTS faqs (
    id SERIAL PRIMARY KEY,
    question VARCHAR(500) NOT NULL,
    answer TEXT NOT NULL,
    category VARCHAR(50) NOT NULL,
    order_index INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Q&A 테이블
CREATE TABLE IF NOT EXISTS qnas (
    id SERIAL PRIMARY KEY,
    title VARCHAR(300) NOT NULL,
    content TEXT NOT NULL,
    author_name VARCHAR(100) NOT NULL,
    author_email VARCHAR(255),
    password VARCHAR(100), -- 비회원용 비밀번호
    is_public BOOLEAN DEFAULT true,
    is_answered BOOLEAN DEFAULT false,
    answer TEXT,
    answered_at TIMESTAMP WITH TIME ZONE,
    answered_by VARCHAR(100),
    views INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 갤러리 아이템 테이블 (SNS, 리뷰)
CREATE TABLE IF NOT EXISTS gallery_items (
    id SERIAL PRIMARY KEY,
    title VARCHAR(300) NOT NULL,
    description TEXT,
    content TEXT,
    image_url VARCHAR(500) NOT NULL,
    author VARCHAR(100) NOT NULL,
    type VARCHAR(10) NOT NULL CHECK (type IN ('sns', 'review')),
    platform VARCHAR(50), -- Instagram, Facebook 등
    cruise VARCHAR(100),
    rating INTEGER, -- 리뷰용 평점 (1-5)
    views INTEGER DEFAULT 0,
    likes INTEGER DEFAULT 0,
    comments INTEGER DEFAULT 0,
    shares INTEGER DEFAULT 0,
    tags TEXT[] DEFAULT '{}',
    is_verified BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    is_pinned BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 시스템 설정 테이블
CREATE TABLE IF NOT EXISTS system_settings (
    id SERIAL PRIMARY KEY,
    key VARCHAR(100) UNIQUE NOT NULL,
    value TEXT NOT NULL,
    category VARCHAR(50) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 팝업 테이블
CREATE TABLE IF NOT EXISTS popups (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    type VARCHAR(20) DEFAULT 'modal' CHECK (type IN ('modal', 'banner', 'floating')),
    position VARCHAR(20) DEFAULT 'center' CHECK (position IN ('center', 'top', 'bottom', 'left', 'right')),
    width INTEGER DEFAULT 500,
    height INTEGER DEFAULT 400,
    background_color VARCHAR(7) DEFAULT '#ffffff',
    text_color VARCHAR(7) DEFAULT '#000000',
    border_width INTEGER DEFAULT 1,
    border_color VARCHAR(7) DEFAULT '#cccccc',
    border_radius INTEGER DEFAULT 8,
    show_delay INTEGER DEFAULT 0, -- 페이지 로드 후 표시 지연 시간(초)
    auto_close_delay INTEGER, -- 자동 닫기 시간(초), NULL이면 수동으로만 닫기
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE NOT NULL,
    target_pages TEXT[] DEFAULT '{}', -- 표시할 페이지들, 빈 배열이면 모든 페이지
    priority INTEGER DEFAULT 0, -- 우선순위 (높을수록 먼저 표시)
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_reservations_user_id ON reservations(user_id);
CREATE INDEX IF NOT EXISTS idx_reservations_product_id ON reservations(product_id);
CREATE INDEX IF NOT EXISTS idx_reservations_date ON reservations(reservation_date);
CREATE INDEX IF NOT EXISTS idx_reservations_status ON reservations(status);
CREATE INDEX IF NOT EXISTS idx_reservations_order_number ON reservations(order_number);

CREATE INDEX IF NOT EXISTS idx_cruise_products_active ON cruise_products(is_active);
CREATE INDEX IF NOT EXISTS idx_cruise_products_popular ON cruise_products(is_popular);

CREATE INDEX IF NOT EXISTS idx_notices_active ON notices(is_active);
CREATE INDEX IF NOT EXISTS idx_notices_pinned ON notices(is_pinned);

CREATE INDEX IF NOT EXISTS idx_faqs_category ON faqs(category);
CREATE INDEX IF NOT EXISTS idx_faqs_active ON faqs(is_active);

CREATE INDEX IF NOT EXISTS idx_qnas_answered ON qnas(is_answered);
CREATE INDEX IF NOT EXISTS idx_qnas_public ON qnas(is_public);

CREATE INDEX IF NOT EXISTS idx_gallery_items_type ON gallery_items(type);
CREATE INDEX IF NOT EXISTS idx_gallery_items_active ON gallery_items(is_active);

CREATE INDEX IF NOT EXISTS idx_system_settings_category ON system_settings(category);
CREATE INDEX IF NOT EXISTS idx_system_settings_key ON system_settings(key);

CREATE INDEX IF NOT EXISTS idx_popups_active ON popups(is_active);
CREATE INDEX IF NOT EXISTS idx_popups_dates ON popups(start_date, end_date);

-- RLS (Row Level Security) 정책 설정
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

-- 사용자는 자신의 정보만 조회/수정 가능
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);

-- 예약은 사용자가 자신의 예약만 조회 가능
CREATE POLICY "Users can view own reservations" ON reservations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own reservations" ON reservations FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 관리자 사용자는 관리자만 접근 가능 (서비스 키 사용)
CREATE POLICY "Only service role can access admin_users" ON admin_users FOR ALL USING (auth.role() = 'service_role');

-- 공개 테이블들은 모든 사용자가 조회 가능
CREATE POLICY "Anyone can view active cruise products" ON cruise_products FOR SELECT USING (is_active = true);
CREATE POLICY "Anyone can view active notices" ON notices FOR SELECT USING (is_active = true);
CREATE POLICY "Anyone can view active faqs" ON faqs FOR SELECT USING (is_active = true);
CREATE POLICY "Anyone can view public qnas" ON qnas FOR SELECT USING (is_public = true);
CREATE POLICY "Anyone can view active gallery items" ON gallery_items FOR SELECT USING (is_active = true);
CREATE POLICY "Anyone can view system settings" ON system_settings FOR SELECT USING (true);
CREATE POLICY "Anyone can view active popups" ON popups FOR SELECT USING (is_active = true);

-- 기본 데이터 삽입
INSERT INTO system_settings (key, value, category, description) VALUES
('site_name', '월미도 해양관광', 'basic', '사이트명'),
('site_phone', '032-123-4567', 'basic', '대표전화'),
('site_fax', '032-123-4568', 'basic', '팩스번호'),
('site_email', 'info@wolmido-cruise.com', 'basic', '이메일'),
('site_address', '인천광역시 중구 월미문화로 81', 'basic', '주소'),
('business_number', '123-45-67890', 'basic', '사업자등록번호'),
('online_business_number', '제2024-인천중구-0001호', 'basic', '통신판매업신고번호'),
('operation_hours', '09:00 - 18:00', 'operation', '운영시간'),
('reservation_notice', '예약은 이용일 1일 전까지 가능합니다.', 'operation', '예약 안내'),
('cancel_policy', '이용일 1일 전까지 무료 취소 가능합니다.', 'operation', '취소 정책')
ON CONFLICT (key) DO NOTHING;

-- 기본 관리자 계정 (실제 운영시에는 이메일과 비밀번호를 변경해야 함)
INSERT INTO admin_users (email, name, role, permissions) VALUES
('admin@wolmido-cruise.com', '시스템 관리자', 'super_admin', '{
  "cruise": true,
  "reservation": true,
  "user": true,
  "notice": true,
  "faq": true,
  "qna": true,
  "event": true,
  "cruiseReview": true,
  "statistics": true,
  "popup": true,
  "system": true
}')
ON CONFLICT (email) DO NOTHING;

-- 샘플 크루즈 상품 데이터
INSERT INTO cruise_products (name, description, duration, schedule, adult_price, child_price, image_url, is_popular, rating, review_count, tags) VALUES
('불꽃 크루즈', '인천 하늘을 수놓는 화려한 불꽃놀이와 함께하는 낭만적인 밤바다 여행', '2시간 30분', '매주 토요일 20:00', 35000, 25000, 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop&crop=center', true, 4.8, 124, ARRAY['야경', '불꽃놀이', '커플추천']),
('행복 크루즈 2회', '갈매기와 함께하는 즐거운 서해 바다 체험, 2시간 코스', '2시간', '10:00, 14:00', 28000, 20000, 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop&crop=center', false, 4.6, 89, ARRAY['갈매기', '가족여행', '체험']),
('행복 크루즈 4회', '하루 4회 운항하는 정기 크루즈, 언제든 편리하게', '1시간 30분', '10:00, 12:30, 15:00, 17:30', 25000, 18000, 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop&crop=center', true, 4.5, 156, ARRAY['정기운항', '편리함', '단체추천']),
('낙조 크루즈', '서해의 아름다운 석양과 함께하는 로맨틱한 크루즈', '2시간', '일몰 1시간 전', 32000, 23000, 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop&crop=center', true, 4.9, 203, ARRAY['석양', '로맨틱', '사진촬영']),
('패키지 여행 A', '월미도 관광지 + 크루즈 + 식사가 포함된 종합 패키지', '6시간', '09:00 출발', 85000, 65000, 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop&crop=center', false, 4.7, 67, ARRAY['종합패키지', '식사포함', '관광']),
('패키지 여행 B', '인천 섬 투어 + 크루즈 + 특별 체험이 포함된 프리미엄 패키지', '8시간', '08:30 출발', 120000, 95000, 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop&crop=center', false, 4.8, 45, ARRAY['프리미엄', '섬투어', '특별체험'])
ON CONFLICT DO NOTHING;

-- 샘플 공지사항
INSERT INTO notices (title, content, is_pinned) VALUES
('[중요] 겨울철 운항 일정 변경 안내', '겨울철(12월~2월) 기간 중 기상 상황에 따라 운항 일정이 변경될 수 있습니다. 예약 전 운항 여부를 확인해 주시기 바랍니다.', true),
('신규 크루즈 상품 출시', '새로운 프리미엄 패키지 여행 상품이 출시되었습니다. 자세한 내용은 상품 페이지를 확인해 주세요.', false),
('홈페이지 리뉴얼 완료', '더욱 편리한 예약 시스템과 개선된 사용자 경험을 제공합니다.', false)
ON CONFLICT DO NOTHING;

-- 샘플 FAQ
INSERT INTO faqs (question, answer, category, order_index) VALUES
('예약은 어떻게 하나요?', '홈페이지에서 온라인 예약하시거나 전화(032-123-4567)로 예약 가능합니다.', '예약', 1),
('취소 및 환불 정책은 어떻게 되나요?', '이용일 1일 전까지는 무료 취소가 가능하며, 당일 취소 시에는 50% 환불됩니다.', '예약', 2),
('날씨가 안 좋으면 운항하나요?', '기상 상황에 따라 운항이 취소될 수 있으며, 이 경우 전액 환불 또는 일정 변경이 가능합니다.', '운항', 3),
('주차장이 있나요?', '선착장 인근에 유료 주차장이 있습니다. 주차 요금은 별도입니다.', '이용안내', 4),
('유아도 요금을 내야 하나요?', '만 3세 미만 유아는 무료이며, 만 3세 이상은 소인 요금이 적용됩니다.', '요금', 5)
ON CONFLICT DO NOTHING;

-- 함수: updated_at 자동 업데이트
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 트리거: updated_at 자동 업데이트
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_cruise_products_updated_at BEFORE UPDATE ON cruise_products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_reservations_updated_at BEFORE UPDATE ON reservations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_notices_updated_at BEFORE UPDATE ON notices FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_faqs_updated_at BEFORE UPDATE ON faqs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_qnas_updated_at BEFORE UPDATE ON qnas FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_gallery_items_updated_at BEFORE UPDATE ON gallery_items FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_system_settings_updated_at BEFORE UPDATE ON system_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_popups_updated_at BEFORE UPDATE ON popups FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
