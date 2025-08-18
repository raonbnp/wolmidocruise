# 월미도 해양관광 사이트 배포 가이드

이 문서는 Next.js 기반의 월미도 해양관광 사이트를 Vercel과 Supabase를 사용하여 배포하는 방법을 설명합니다.

## 📋 사전 준비사항

1. **Supabase 계정** - https://supabase.com
2. **Vercel 계정** - https://vercel.com
3. **GitHub 계정** (코드 저장소용)
4. **도메인** (선택사항)

## 🗄️ 1. Supabase 설정

### 1.1 프로젝트 생성
1. [Supabase Dashboard](https://supabase.com/dashboard)에 로그인
2. "New Project" 클릭
3. 프로젝트 정보 입력:
   - **Name**: `wolmido-cruise`
   - **Database Password**: 강력한 비밀번호 설정
   - **Region**: `Northeast Asia (Seoul)`

### 1.2 데이터베이스 스키마 생성
1. Supabase Dashboard → SQL Editor
2. `supabase/schema.sql` 파일의 내용을 복사하여 실행
3. 테이블과 샘플 데이터가 생성되는지 확인

### 1.3 API 키 확인
1. Supabase Dashboard → Settings → API
2. 다음 정보를 메모:
   - **Project URL**: `https://xxx.supabase.co`
   - **Anon/Public Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
   - **Service Role Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (비밀 유지!)

### 1.4 인증 설정
1. Supabase Dashboard → Authentication → Settings
2. **Site URL** 설정: `https://your-domain.com` (배포 후 업데이트)
3. **Redirect URLs** 추가:
   - `https://your-domain.com/auth/callback`
   - `https://your-domain.com/admin/login`

## 🚀 2. Vercel 배포

### 2.1 GitHub에 코드 업로드
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/wolmido-cruise.git
git push -u origin main
```

### 2.2 Vercel 프로젝트 생성
1. [Vercel Dashboard](https://vercel.com/dashboard)에 로그인
2. "New Project" 클릭
3. GitHub 저장소 선택 및 Import
4. 프로젝트 설정:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

### 2.3 환경변수 설정
Vercel Dashboard → Project → Settings → Environment Variables에서 다음 변수들을 추가:

```bash
# Supabase 설정
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# 사이트 설정
NEXT_PUBLIC_SITE_URL=https://your-vercel-app.vercel.app

# 결제 게이트웨이 (선택사항)
NEXT_PUBLIC_TOSS_CLIENT_KEY=test_ck_xxx
TOSS_SECRET_KEY=test_sk_xxx
```

### 2.4 배포
1. "Deploy" 버튼 클릭
2. 빌드 완료 후 배포 URL 확인 (예: `https://wolmido-cruise.vercel.app`)

## 🌐 3. 도메인 연결 (선택사항)

### 3.1 커스텀 도메인 설정
1. Vercel Dashboard → Project → Settings → Domains
2. 도메인 추가 (예: `wolmido-cruise.com`)
3. DNS 설정:
   - **A Record**: `76.76.19.61`
   - **CNAME**: `cname.vercel-dns.com`

### 3.2 Supabase 설정 업데이트
1. Supabase Dashboard → Authentication → Settings
2. **Site URL** 업데이트: `https://wolmido-cruise.com`
3. **Redirect URLs** 업데이트

## 💳 4. 결제 시스템 통합 (선택사항)

### 4.1 토스페이먼츠 설정
1. [토스페이먼츠 개발자센터](https://developers.tosspayments.com) 가입
2. 테스트/라이브 키 발급
3. Vercel 환경변수에 추가

### 4.2 결제 모듈 구현
```typescript
// src/lib/payment/toss.ts 파일 생성 필요
// 결제 요청, 승인, 취소 로직 구현
```

## 🔐 5. 보안 설정

### 5.1 RLS (Row Level Security) 확인
- Supabase에서 모든 테이블의 RLS가 활성화되어 있는지 확인
- 적절한 정책이 설정되어 있는지 검토

### 5.2 API 키 보안
- Service Role Key는 절대 클라이언트에 노출하지 않음
- 환경변수로만 관리
- 정기적으로 키 로테이션

### 5.3 CORS 설정
```sql
-- Supabase에서 CORS 정책 확인
SELECT * FROM pg_settings WHERE name = 'cors.allowed_origins';
```

## 📊 6. 관리자 계정 설정

### 6.1 최초 관리자 생성
1. Supabase Dashboard → Authentication → Users
2. "Add User" 클릭하여 관리자 계정 생성
3. SQL Editor에서 admin_users 테이블에 관리자 정보 추가:

```sql
INSERT INTO admin_users (id, email, name, role, permissions, is_active)
VALUES (
  'user-uuid-from-auth-users',
  'admin@your-domain.com',
  '시스템 관리자',
  'super_admin',
  '{
    "dashboard": true,
    "cruise": true,
    "reservation": true,
    "user": true,
    "notice": true,
    "faq": true,
    "qna": true,
    "eventSns": true,
    "cruiseReview": true,
    "statistics": true,
    "popup": true,
    "system": true
  }',
  true
);
```

## 🔄 7. CI/CD 설정

### 7.1 자동 배포
- GitHub에 push할 때마다 Vercel에서 자동 배포
- `main` 브랜치는 프로덕션 환경
- `develop` 브랜치는 스테이징 환경 (선택사항)

### 7.2 환경 분리
```bash
# Production
NEXT_PUBLIC_SUPABASE_URL=https://prod.supabase.co

# Staging
NEXT_PUBLIC_SUPABASE_URL=https://staging.supabase.co
```

## 📈 8. 모니터링 및 분석

### 8.1 Vercel Analytics
1. Vercel Dashboard → Project → Analytics
2. 웹사이트 성능 및 사용자 분석 확인

### 8.2 Supabase 모니터링
1. Supabase Dashboard → Logs
2. 데이터베이스 성능 및 API 사용량 모니터링

### 8.3 에러 추적 (선택사항)
- Sentry, LogRocket 등의 서비스 연동 고려

## 🛠️ 9. 유지보수

### 9.1 정기 백업
- Supabase에서 자동 백업 설정 확인
- 중요 데이터는 별도 백업 고려

### 9.2 업데이트
- Next.js 및 의존성 패키지 정기 업데이트
- Supabase 기능 업데이트 확인

### 9.3 성능 최적화
- 이미지 최적화 (Next.js Image 컴포넌트 활용)
- 코드 스플리팅 및 지연 로딩
- CDN 활용

## 🚨 10. 트러블슈팅

### 10.1 일반적인 문제
- **빌드 실패**: 환경변수 확인, 의존성 설치 확인
- **인증 오류**: Supabase URL 및 키 확인
- **데이터베이스 연결 실패**: RLS 정책 확인

### 10.2 로그 확인
- Vercel: Functions 탭에서 서버 로그 확인
- Supabase: Logs 탭에서 데이터베이스 로그 확인

## 📞 지원

문제가 발생하거나 추가 도움이 필요한 경우:
- Vercel 문서: https://vercel.com/docs
- Supabase 문서: https://supabase.com/docs
- Next.js 문서: https://nextjs.org/docs

---

## ✅ 배포 완료 체크리스트

- [ ] Supabase 프로젝트 생성 및 데이터베이스 스키마 적용
- [ ] Vercel 프로젝트 생성 및 GitHub 연동
- [ ] 환경변수 설정 완료
- [ ] 첫 배포 성공
- [ ] 도메인 연결 (선택사항)
- [ ] 관리자 계정 생성
- [ ] 기본 데이터 입력 (상품, 공지사항 등)
- [ ] 결제 시스템 연동 (선택사항)
- [ ] SSL 인증서 확인
- [ ] 사이트 기능 테스트 완료

배포가 완료되면 실제 운영 환경에서 모든 기능이 정상 작동하는지 테스트해보세요!
