# ai-tools-site

대한민국 AI 툴 교육 사이트 프론트엔드입니다. `ai-tools-collector`가 Supabase에 수집·요약해 둔
카테고리/영상/가이드북/광고 데이터를 읽어서 보여주는 Next.js(App Router) 사이트입니다.

## 스택

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Supabase JS (읽기 전용, `anon` 키 사용 — RLS로 공개 데이터만 노출됨)

## 로컬 개발

```bash
npm install
cp .env.example .env.local   # 값 채우기
npm run dev
```

### 환경 변수

| 변수 | 설명 |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase 프로젝트 URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon(public) 키. RLS 정책으로 `status='published'`, `is_active=true` 등 공개 데이터만 조회 가능하므로 클라이언트에 노출해도 안전합니다. |

`ai-tools-collector`가 쓰는 `service_role` 키는 이 사이트에 절대 넣지 않습니다.

## 페이지 구조

- `/` — 홈: 히어로 + 30개 카테고리 그리드 + 광고 배너
- `/category/[slug]` — 카테고리별 가이드북 + 영상 10개(랭킹순)
- `/video/[id]` — 유튜브 임베드 + AI 요약 + 요약 포인트
- `/guidebook` — 전체 가이드북 + 카테고리 바로가기

## 이미지

유튜브 썸네일(`i.ytimg.com`)은 `next/image` 대신 일반 `<img>` 태그로 렌더링합니다.
`next.config.js`에 `images.remotePatterns`를 추가하는 대신 이 방식을 택해 설정을 단순화했습니다.

## Vercel 배포

1. Vercel에 이 레포를 Import합니다.
2. Project Settings → Environment Variables에 위 두 값을 등록합니다(Production/Preview 모두).
3. Framework Preset은 Next.js가 자동 감지됩니다. 별도 빌드 설정 불필요.

## 데이터가 비어있을 때

수집기가 아직 한 번도 실행되지 않았거나 특정 카테고리에 영상이 없어도 에러 없이
"아직 데이터가 없습니다" 형태의 안내 문구를 보여주도록 처리되어 있습니다.
