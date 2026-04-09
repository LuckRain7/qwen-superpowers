# Qwen Superpowers

**言語:**
[English](README.md) |
[中文](README.zh.md) |
[日本語](README.ja.md) |
[한국어](README.ko.md) |
[Español](README.es.md) |
[Français](README.fr.md) |
[Deutsch](README.de.md)

---

必須的なワークフローを通じて専門的なソフトウェアエンジニアリング慣行を強制する、Qwen Code のための包括的なスキルシステム。

## これは何？

Qwen Superpowers は、Qwen Code を汎用のコーディングアシスタントから、実証済みのワークフローを自動的に従う規律あるエンジニアリングエージェントに変革します。以下を保証します：

- **テスト駆動開発** - テストは常に最初に作成
- **システマティックな計画** - アドホックなコーディングはもう不要
- **エビデンスベースのデバッグ** - 推測ではなく根本原因分析
- **コード品質** - 自動化されたレビューとリファクタリング

## インストール

### クイックインストール

```bash
# このリポジトリをクローン
git clone https://github.com/your-org/qwen-superpowers.git
cd qwen-superpowers

# セットアップスクリプトを実行
./scripts/setup.sh
```

### マニュアルインストール

1. `.qwen-plugin` ファイルをプロジェクトルートにコピー
2. `skills/`、`hooks/`、`commands/`、`agents/` ディレクトリをプロジェクトにコピー
3. 以下を Qwen Code の設定または `QWEN.md` に追加：

```markdown
@load ./skills/using-superpowers.md
```

## 仕組み

### 必須ワークフローパイプライン

Qwen Code に機能の実装やバグの修正を依頼すると、自動的に次の順序に従います：

1. **Brainstorming（ブレーンストーミング）** → ソクラテス式対話を通じて要件を明確化
2. **Git Worktrees（Git ワークツリー）** → 隔離されたブランチワークスペースを作成
3. **Planning（計画）** → 検証ステップを含む 2〜5 分のタスクに作業を分解
4. **Subagent-Driven Development（サブエージェント駆動開発）** → TDD でタスクごとに新しいエージェントを使用
5. **Code Review（コードレビュー）** → 自動化的な品質チェック
6. **Branch Finalization（ブランチ最終化）** → クリーンなマージまたは PR 作成

### コアフィロソフィー

- **テスト駆動開発**：Red-Green-Refactor サイクルは必須
- **システマティック vs アドホック**：推測よりプロセス
- **複雑さの低減**：単純性が最優先目標
- **エビデンス vs 主張**：成功を宣言する前に検証

## 利用可能なスキル

### 必須ワークフロースキル（自動トリガー）

| スキル | 目的 |
|-------|---------|
| `brainstorming` | 要件の明確化と設計ドキュメントの作成 |
| `using-git-worktrees` | 隔離されたブランチワークスペースの設定 |
| `writing-plans` | 詳細な実装計画 |
| `subagent-driven-development` | 新しいエージェントによる並列タスク実行 |
| `test-driven-development` | TDD サイクルの強制 |
| `requesting-code-review` | 自動化的な品質チェック |
| `finishing-a-development-branch` | クリーンなブランチの最終化 |

### サポートスキル

| スキル | 目的 |
|-------|---------|
| `systematic-debugging` | 4 段階の根本原因分析 |
| `verification-before-completion` | 修正が実際に機能することを確認 |
| `dispatching-parallel-agents` | 複数のエージェントを同時に実行 |
| `receiving-code-review` | レビューフィードバックの処理 |
| `writing-skills` | 新しいスキルの作成 |

## 使用方法

### 新しいタスクの開始

実現したいことを simplesmente 説明するだけ：

```
アプリにユーザー認証機能を追加したい
```

Qwen Code は自動的に：
1. 明確化のための質問をする
2. 設計ドキュメントを作成
3. 隔離されたブランチを設定
4. 詳細な計画を作成
5. TDD で計画を実行

### マニュアルスキル呼び出し

スキルを手動で呼び出すことも可能：

```
/superpowers brainstorming
/superpowers writing-plans
/superpowers systematic-debugging
```

## アーキテクチャ

```
qwen-superpowers/
├── .qwen-plugin          # プラグインメタデータ
├── QWEN.md               # システムプロンプト注入
├── skills/               # スキル定義（Markdown）
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
├── hooks/                # 自動トリガー設定
├── commands/             # マニュアル呼び出しコマンド
├── agents/               # エージェント動作定義
├── scripts/              # セットアップおよびユーティリティスクリプト
└── docs/                 # ドキュメント
```

## カスタムスキルの作成

独自のスキル作成ガイドについては `skills/writing-skills.md` を参照してください。

## ライセンス

MIT
