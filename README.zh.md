# Qwen Superpowers

**语言:**
[English](README.md) |
[中文](README.zh.md) |
[日本語](README.ja.md) |
[한국어](README.ko.md) |
[Español](README.es.md) |
[Français](README.fr.md) |
[Deutsch](README.de.md)

---

一个全面的 Qwen Code 技能系统，通过强制性的工作流来执行专业的软件工程实践。

## 这是什么？

Qwen Superpowers 将 Qwen Code 从通用的编码助手转变为遵循经过验证的工作流的专业工程代理。它确保：

- **测试驱动开发** - 测试始终优先
- **系统性规划** - 不再随意编码
- **基于证据的调试** - 根因分析而非猜测
- **代码质量** - 自动化的审查和重构

## 安装

### 快速安装

```bash
# 克隆此仓库
git clone https://github.com/your-org/qwen-superpowers.git
cd qwen-superpowers

# 运行安装脚本
./scripts/setup.sh
```

### 手动安装

1. 将 `.qwen-plugin` 文件复制到你项目的根目录
2. 将 `skills/`、`hooks/`、`commands/` 和 `agents/` 目录复制到你项目中
3. 将以下内容添加到你的 Qwen Code 设置或 `QWEN.md` 中：

```markdown
@load ./skills/using-superpowers.md
```

## 工作原理

### 强制性工作流管道

当你要求 Qwen Code 实现功能或修复 Bug 时，它会自动遵循以下顺序：

1. **Brainstorming（头脑风暴）** → 通过苏格拉底式对话澄清需求
2. **Git Worktrees（Git 工作树）** → 创建隔离的分支工作区
3. **Planning（规划）** → 将工作拆分为 2-5 分钟的任务，包含验证步骤
4. **Subagent-Driven Development（子代理驱动开发）** → 每个任务使用全新代理执行 TDD
5. **Code Review（代码审查）** → 自动化质量检查
6. **Branch Finalization（分支定稿）** → 干净的合并或 PR 创建

### 核心理念

- **测试驱动开发**：Red-Green-Refactor 循环是强制性的
- **系统性而非临时性**：流程优于猜测
- **复杂度降低**：简单性是首要目标
- **证据优于声明**：在宣布成功之前进行验证

## 可用技能

### 强制性工作流技能（自动触发）

| 技能 | 用途 |
|-------|---------|
| `brainstorming` | 需求澄清和设计文档创建 |
| `using-git-worktrees` | 隔离分支工作区设置 |
| `writing-plans` | 详细的实现规划 |
| `subagent-driven-development` | 使用全新代理并行执行任务 |
| `test-driven-development` | 强制执行 TDD 循环 |
| `requesting-code-review` | 自动化质量检查 |
| `finishing-a-development-branch` | 干净的分支定稿 |

### 辅助技能

| 技能 | 用途 |
|-------|---------|
| `systematic-debugging` | 4 阶段根因分析 |
| `verification-before-completion` | 确保修复真正有效 |
| `dispatching-parallel-agents` | 并发运行多个代理 |
| `receiving-code-review` | 处理审查反馈 |
| `writing-skills` | 创建新技能 |

## 使用方法

### 开始新任务

只需描述你想要实现的目标：

```
我想为我的应用添加用户认证功能
```

Qwen Code 将自动：
1. 提出澄清问题
2. 创建设计文档
3. 设置隔离分支
4. 创建详细规划
5. 使用 TDD 执行计划

### 手动调用技能

你也可以手动调用技能：

```
/superpowers brainstorming
/superpowers writing-plans
/superpowers systematic-debugging
```

## 架构

```
qwen-superpowers/
├── .qwen-plugin          # 插件元数据
├── QWEN.md               # 系统提示注入
├── skills/               # 技能定义（Markdown）
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
├── hooks/                # 自动触发配置
├── commands/             # 手动调用命令
├── agents/               # 代理行为定义
├── scripts/              # 安装和工具脚本
└── docs/                 # 文档
```

## 创建自定义技能

请参阅 `skills/writing-skills.md` 获取创建自定义技能的指南。

## 许可证

MIT
