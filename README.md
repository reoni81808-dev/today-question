# Card Figma Make - 카드 뽑기 앱

React + TypeScript + Vite로 구현된 인터랙티브 질문 카드 앱입니다.

## 🚀 주요 기능

- **5개 카테고리**: 연애, 친구, 취향, 자기소개, 면접준비
- **인터랙티브 카드 덱**: 애니메이션과 함께 카드 선택
- **다크 모드**: 라이트/다크 테마 지원
- **프리미엄 모드**: 무제한 질문 뽑기 기능
- **반응형 디자인**: 모바일/데스크톱 최적화

## 🛠️ 기술 스택

- **Frontend**: React 18, TypeScript
- **Build**: Vite
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **UI Components**: Radix UI

## 📦 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 프로덕션 미리보기
npm run preview
```

## 🔧 해결된 문제들

1. **패키지 누락**: React, Framer Motion, Lucide React 등 필수 의존성 추가
2. **TypeScript 설정**: tsconfig.json 및 jsx-runtime 설정
3. **빌드 환경**: Vite 설정 파일 추가
4. **React Import**: JSX Transform으로 불필요한 React import 제거
5. **Figma Assets**: 임시 placeholder 이미지로 대체

## 📁 프로젝트 구조

```
card-figma-make/
├── components/
│   ├── ui/           # 재사용 가능한 UI 컴포넌트
│   ├── figma/        # Figma 관련 컴포넌트
│   ├── CardDeck.tsx  # 카드 덱 화면
│   ├── CategorySelector.tsx  # 카테고리 선택 화면
│   ├── Settings.tsx  # 설정 화면
│   ├── PremiumModal.tsx  # 프리미엄 모달
│   └── LoginModal.tsx    # 로그인 모달
├── types/
│   └── questions.ts  # 타입 정의 및 데이터
├── styles/
│   └── globals.css   # 글로벌 스타일
├── src/
│   └── main.tsx      # 앱 진입점
└── App.tsx           # 메인 앱 컴포넌트
```

## 🎯 사용법

1. 원하는 카테고리를 선택합니다
2. 카드가 섞이면 하나를 선택합니다
3. 질문을 확인하고 대화를 시작합니다
4. "다시 고르기"로 새로운 질문을 선택할 수 있습니다

## 🌟 특징

- **일일 질문 제한**: 무료 사용자는 하루 10개 질문
- **프리미엄 기능**: 무제한 질문 뽑기
- **부드러운 애니메이션**: 카드 뒤집기 및 셔플 효과
- **다크 모드**: 어두운 환경에서도 편안한 사용

## 📱 반응형 지원

- 모바일: 최적화된 터치 인터페이스
- 태블릿: 중간 크기 화면 지원
- 데스크톱: 대화면 레이아웃

---

✨ **Perfect for conversations, interviews, and getting to know each other!**
