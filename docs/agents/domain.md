# Domain docs

本仓库的领域文档使用规范。

## 探索代码前阅读

- 仓库根目录下的 **`CONTEXT.md`**，或
- 若存在仓库根目录下的 **`CONTEXT-MAP.md`**，它指向每个上下文各自的 `CONTEXT.md`，按需阅读相关主题。
- **`docs/adr/`** — 阅读与你即将工作区域相关的 ADR。多上下文仓库中，还需检查 `src/<context>/docs/adr/` 下上下文相关的决策。

若这些文件不存在，**静默继续**。不要强调缺失，也不要建议提前创建。`/domain-modeling` 技能（通过 `/grill-with-docs` 与 `/improve-codebase-architecture` 调用）会在术语或决策实际被明确时惰性地创建它们。

## 文件结构

单上下文仓库（大多数仓库）：

```
/
├── CONTEXT.md
├── docs/adr/
│   ├── 0001-event-sourced-orders.md
│   └── 0002-postgres-for-write-model.md
└── src/
```

多上下文仓库（根目录存在 `CONTEXT-MAP.md`）：

```
/
├── CONTEXT-MAP.md
├── docs/adr/                          ← 全系统决策
└── src/
    ├── ordering/
    │   ├── CONTEXT.md
    │   └── docs/adr/                  ← 上下文特定决策
    └── billing/
        ├── CONTEXT.md
        └── docs/adr/
```

## 使用术语表中的词汇

当输出中命名领域概念（Issue 标题、重构提案、假设、测试名等）时，使用 `CONTEXT.md` 中定义的术语。不要漂移为术语表明确避免的同义词。

若所需概念尚未出现在术语表中，这是一个信号——要么你正在发明项目不使用的语言（请重新考虑），要么确实存在缺口（请记录下来，供 `/domain-modeling` 使用）。

## 标记 ADR 冲突

如果你的输出与现有 ADR 矛盾，请显式指出，而不是静默覆盖：

> _与 ADR-0007（event-sourced orders）矛盾——但值得重新讨论，因为……_
