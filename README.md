# 🚢 월미도 해양관광 웹사이트

Next.js 14, Supabase, Vercel을 사용하여 구축된 현대적인 해양관광 예약 시스템입니다.

## 🌟 주요 기능

### 👥 사용자 기능
- **상품 둘러보기**: 다양한 크루즈 상품 조회 및 상세 정보
- **장바구니 & 위시리스트**: 상품 담기, 찜하기 기능
- **온라인 예약**: 실시간 예약 및 결제 시스템
- **예약 관리**: 예약 조회, 변경, 취소
- **회원 시스템**: 회원가입, 로그인, 프로필 관리
- **고객센터**: 공지사항, FAQ, Q&A 게시판

### 🛠️ 관리자 기능
- **대시보드**: 실시간 통계 및 현황 모니터링
- **상품 관리**: 크루즈 상품 등록, 수정, 삭제
- **예약 관리**: 예약 현황, 상태 변경, 캘린더 뷰
- **회원 관리**: 사용자 정보 관리, 관리자 계정 관리
- **콘텐츠 관리**: 공지사항, FAQ, Q&A 관리
- **이벤트 관리**: SNS 콘텐츠, 리뷰 관리
- **시스템 설정**: 사이트 기본 정보, 팝업 관리

### 💳 결제 시스템
- **토스페이먼츠 연동**: 안전한 온라인 결제
- **다양한 결제 수단**: 카드, 계좌이체, 간편결제
- **자동 환불**: 취소 시 자동 환불 처리

## 🏗️ 기술 스택

### Frontend
- **Next.js 14** - React 기반 풀스택 프레임워크
- **TypeScript** - 타입 안전성
- **Tailwind CSS** - 유틸리티 퍼스트 CSS 프레임워크
- **Shadcn/ui** - 재사용 가능한 UI 컴포넌트
- **Lucide React** - 아이콘 라이브러리

### Backend & Database
- **Supabase** - PostgreSQL 기반 BaaS
- **Row Level Security (RLS)** - 데이터 보안
- **실시간 구독** - 실시간 데이터 동기화

### 배포 & 인프라
- **Vercel** - 서버리스 배포 플랫폼
- **Edge Functions** - 글로벌 CDN
- **자동 SSL** - HTTPS 보안

### 결제 & 외부 서비스
- **토스페이먼츠** - 결제 게이트웨이
- **이메일 발송** - 예약 확인/취소 알림

## 📁 프로젝트 구조

```
src/
├── app/                    # Next.js App Router
│   ├── admin/             # 관리자 페이지
│   ├── api/               # API 라우트
│   ├── cart/              # 장바구니
│   ├── wishlist/          # 위시리스트
│   └── ...                # 기타 페이지
├── components/            # React 컴포넌트
│   ├── admin/             # 관리자 전용 컴포넌트
│   ├── ui/                # 재사용 UI 컴포넌트
│   └── ...                # 기타 컴포넌트
├── hooks/                 # 커스텀 React 훅
├── lib/                   # 유틸리티 및 설정
│   ├── api/               # API 함수들
│   ├── supabase/          # Supabase 클라이언트
│   ├── payment/           # 결제 모듈
│   └── utils/             # 유틸리티 함수
└── types/                 # TypeScript 타입 정의
```

## 🚀 시작하기

### 사전 요구사항
- Node.js 18.0 이상
- npm 또는 yarn
- Supabase 계정
- Vercel 계정 (배포시)

### 로컬 개발 환경 설정

1. **저장소 클론**
```bash
git clone https://github.com/your-username/wolmido-cruise.git
cd wolmido-cruise
```

2. **의존성 설치**
```bash
npm install
```

3. **환경변수 설정**
```bash
cp env.example .env.local
```

`.env.local` 파일을 편집하여 Supabase 정보를 입력:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

4. **데이터베이스 설정**
- Supabase Dashboard에서 새 프로젝트 생성
- `supabase/schema.sql` 파일의 내용을 SQL Editor에서 실행

5. **개발 서버 실행**
```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인합니다.

## 🌐 배포

자세한 배포 가이드는 [DEPLOYMENT.md](DEPLOYMENT.md)를 참조하세요.

### Vercel 배포 (권장)
1. GitHub에 코드 푸시
2. Vercel에서 저장소 연결
3. 환경변수 설정
4. 자동 배포 완료

## 🔧 개발 가이드

### 코드 스타일
- **ESLint** + **Prettier** 사용
- **TypeScript** 엄격 모드
- **Tailwind CSS** 클래스 정렬

### 커밋 컨벤션
```
feat: 새로운 기능 추가
fix: 버그 수정
docs: 문서 업데이트
style: 코드 포맷팅
refactor: 코드 리팩토링
test: 테스트 추가/수정
chore: 빌드 설정 변경
```

### 브랜치 전략
- `main`: 프로덕션 환경
- `develop`: 개발 환경
- `feature/*`: 기능 개발
- `hotfix/*`: 긴급 수정

## 🔐 보안

- **Row Level Security (RLS)** 적용
- **JWT 토큰** 기반 인증
- **환경변수**로 민감 정보 관리
- **HTTPS** 강제 적용
- **CORS** 정책 설정

## 📊 모니터링

- **Vercel Analytics**: 웹사이트 성능 분석
- **Supabase Logs**: 데이터베이스 모니터링
- **Error Tracking**: 에러 로그 추적

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 📞 문의

- **개발자**: Raon
- **이메일**: your-email@example.com
- **프로젝트 링크**: [https://github.com/your-username/wolmido-cruise](https://github.com/your-username/wolmido-cruise)

## 🙏 감사의 말

- [Next.js](https://nextjs.org/) - 훌륭한 React 프레임워크
- [Supabase](https://supabase.com/) - 강력한 Firebase 대안
- [Vercel](https://vercel.com/) - 최고의 배포 플랫폼
- [Tailwind CSS](https://tailwindcss.com/) - 유연한 CSS 프레임워크
- [Shadcn/ui](https://ui.shadcn.com/) - 아름다운 UI 컴포넌트

---

⭐ 이 프로젝트가 도움이 되셨다면 스타를 눌러주세요!