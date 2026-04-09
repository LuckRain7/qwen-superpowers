# Qwen Superpowers

**언어:**
[English](README.md) |
[中文](README.zh.md) |
[日本語](README.ja.md) |
[한국어](README.ko.md) |
[Español](README.es.md) |
[Français](README.fr.md) |
[Deutsch](README.de.md)

---

의무적인 워크플로우를 통해 전문적인 소프트웨어 엔지니어링 관행을 강제하는 Qwen Code 를 위한 포괄적인 스킬 시스템입니다.

## 무엇인가요?

Qwen Superpowers 는 Qwen Code 를 범용 코딩 어시스턴트에서 검증된 워크플로우를 자동으로 따르는 규율 있는 엔지니어링 에이전트로 변환합니다. 다음을 보장합니다:

- **테스트 주도 개발** - 테스트가 항상 우선
- **체계적인 계획** - 즉흥적인 코딩은 이제 그만
- **근거 기반 디버깅** - 추측이 아닌 근본 원인 분석
- **코드 품질** - 자동화된 리뷰 및 리팩토링

## 설치

### 빠른 설치

```bash
# 이 저장소를 클론
git clone https://github.com/your-org/qwen-superpowers.git
cd qwen-superpowers

# 설치 스크립트 실행
./scripts/setup.sh
```

### 수동 설치

1. `.qwen-plugin` 파일을 프로젝트 루트에 복사
2. `skills/`, `hooks/`, `commands/`, `agents/` 디렉토리를 프로젝트에 복사
3. 다음 내용을 Qwen Code 설정 또는 `QWEN.md` 에 추가:

```markdown
@load ./skills/using-superpowers.md
```

## 작동 방식

### 의무적 워크플로우 파이프라인

Qwen Code 에 기능 구현이나 버그 수정을 요청하면 자동으로 다음 순서를 따릅니다:

1. **Brainstorming（브레인스토밍）** → 소크라테스식 대화를 통한 요구사항 명확화
2. **Git Worktrees（Git 워크트리）** → 격리된 브랜치 작업공간 생성
3. **Planning（계획）** → 검증 단계를 포함한 2-5 분 작업으로 분할
4. **Subagent-Driven Development（서브에이전트 기반 개발）** → TDD 로 작업당 새로운 에이전트 사용
5. **Code Review（코드 리뷰）** → 자동화된 품질チェック
6. **Branch Finalization（브랜치 최종화）** → 깔끔한 병합 또는 PR 생성

### 핵심 철학

- **테스트 주도 개발**: Red-Green-Refactor 사이클은 필수
- **체계적 vs 즉흥적**: 추측보다 프로세스
- **복잡성 감소**: 단순성이 최우선 목표
- **근거 vs 주장**: 성공 선언 전 검증

## 사용 가능한 스킬

### 의무적 워크플로우 스킬（자동 트리거）

| 스킬 | 목적 |
|-------|---------|
| `brainstorming` | 요구사항 명확화 및 설계 문서 생성 |
| `using-git-worktrees` | 격리된 브랜치 작업공간 설정 |
| `writing-plans` | 상세한 구현 계획 |
| `subagent-driven-development` | 새로운 에이전트로 병렬 작업 실행 |
| `test-driven-development` | TDD 사이클 강제 |
| `requesting-code-review` | 자동화된 품질체크 |
| `finishing-a-development-branch` | 깔끔한 브랜치 최종화 |

### 보조 스킬

| 스킬 | 목적 |
|-------|---------|
| `systematic-debugging` | 4 단계 근본원인분석 |
| `verification-before-completion` | 수정이 실제로 작동하는지 확인 |
| `dispatching-parallel-agents` | 여러 에이전트 동시 실행 |
| `receiving-code-review` | 리뷰 피드백 처리 |
| `writing-skills` | 새 스킬 생성 |

## 사용법

### 새 작업 시작

달성하고자 하는 바를 설명하기만 하면 됩니다:

```
앱에 사용자 인증 기능을 추가하고 싶어요
```

Qwen Code 가 자동으로:
1. 명확화를 위한 질문
2. 설계 문서 생성
3. 격리된 브랜치 설정
4. 상세한 계획 생성
5. TDD 로 계획 실행

### 수동 스킬 호출

스킬을 수동으로 호출할 수도 있습니다:

```
/superpowers brainstorming
/superpowers writing-plans
/superpowers systematic-debugging
```

## 아키텍처

```
qwen-superpowers/
├── .qwen-plugin          # 플러그인 메타데이터
├── QWEN.md               # 시스템 프롬프트 삽입
├── skills/               # 스킬 정의（Markdown）
│   ├── brainstorming/
│   ├── using-git-worktrees/
│   ├── writing-plans/
│   ├── subagent-driven-development/
│   ├── test-driven-development/
│   ├── requesting-code-review/
│   ├── finishing-a-development-branch/
│   ├── systematic-debugging/
│   ├── verification-before-completion/
│   ├── dispatching-parallel-agents/
│   ├── receiving-code-review/
│   ├── writing-skills/
│   └── using-superpowers/
├── hooks/                # 자동 트리거 설정
├── commands/             # 수동 호출 명령
├── agents/               # 에이전트 동작 정의
├── scripts/              # 설치 및 유틸리티 스크립트
└── docs/                 # 문서
```

## 커스텀 스킬 생성

자체 스킬 생성 가이드는 `skills/writing-skills.md` 를 참조하세요.

## 라이선스

MIT
