# Issue tracker: GitHub

本仓库的需求与任务以 GitHub Issues 形式管理，所有操作通过 `gh` CLI 完成。

## 约定

- **创建 Issue**：`gh issue create --title "..." --body "..."`，多行正文使用 heredoc。
- **查看 Issue**：`gh issue view <number> --comments`，可配合 `jq` 读取评论与标签。
- **列出 Issue**：`gh issue list --state open --json number,title,body,labels,comments --jq '[.[] | {number, title, body, labels: [.labels[].name], comments: [.comments[].body]}]'`，按需添加 `--label` 与 `--state` 过滤。
- **评论**：`gh issue comment <number> --body "..."`
- **添加 / 移除标签**：`gh issue edit <number> --add-label "..."` / `--remove-label "..."`
- **关闭**：`gh issue close <number> --comment "..."`

仓库由 `git remote -v` 自动推断，`gh` 在克隆目录内运行即可自动识别。

## Pull requests 作为分类入口

**PRs as a request surface: 否。**（若本仓库将外部 PR 视为功能请求，请改为 `yes`；`/triage` 会读取此标记。）

设为 `yes` 时，PR 使用与 Issue 相同的标签与状态，并对应使用 `gh pr` 命令：

- **查看 PR**：`gh pr view <number> --comments`；查看差异使用 `gh pr diff <number>`。
- **列出待分类的外部 PR**：`gh pr list --state open --json number,title,body,labels,author,authorAssociation,comments`，仅保留 `authorAssociation` 为 `CONTRIBUTOR`、`FIRST_TIME_CONTRIBUTOR` 或 `NONE` 的条目，排除 `OWNER`/`MEMBER`/`COLLABORATOR`。
- **评论 / 标签 / 关闭**：`gh pr comment`、`gh pr edit --add-label`/`--remove-label`、`gh pr close`。

GitHub 的 Issue 与 PR 共享同一编号空间，因此裸 `#42` 可能是任意一种；先用 `gh pr view 42` 尝试，失败时回退到 `gh issue view 42`。

## 当技能要求“发布到 Issue tracker”时

创建一个 GitHub Issue。

## 当技能要求“获取相关 ticket”时

运行 `gh issue view <number> --comments`。

## Wayfinding 操作

由 `/wayfinder` 使用。**地图（map）** 是一个带有 **子 Issue** 的 Issue。

- **Map**：单个 Issue，标签为 `wayfinder:map`，正文包含 Notes / Decisions-so-far / Fog。使用 `gh issue create --label wayfinder:map` 创建。
- **子 ticket**：通过 GitHub sub-issue 关联到 map 的 Issue。若 sub-issue 未启用，在 map 正文的任务列表中添加该子 Issue，并在子 Issue 正文顶部加上 `Part of #<map>`。标签使用 `wayfinder:<type>`（`research`/`prototype`/`grilling`/`task`）。认领后，将 ticket 分配给当前开发者。
- **阻塞关系**：优先使用 GitHub 原生的 issue dependencies（界面可见）。使用 `gh api --method POST repos/<owner>/<repo>/issues/<child>/dependencies/blocked_by -F issue_id=<blocker-db-id>` 添加边，其中 `<blocker-db-id>` 是阻塞项的数值型 **数据库 ID**（通过 `gh api repos/<owner>/<repo>/issues/<n> --jq .id` 获取，不是 `#number` 也不是 `node_id`）。GitHub 通过 `issue_dependencies_summary.blocked_by` 报告未关闭的阻塞项。若 dependencies 不可用，回退到在子 ticket 正文顶部添加 `Blocked by: #<n>, #<n>`。当所有阻塞项关闭时，ticket 视为解除阻塞。
- **Frontier query**：列出 map 下未关闭的子 Issue（`gh issue list --state open`，范围限定在 map 的 sub-issues / 任务列表），排除仍有未关闭阻塞项（`issue_dependencies_summary.blocked_by > 0` 或 `Blocked by` 行中存在未关闭 Issue）或已有 assignee 的项；按 map 顺序取第一个。
- **认领**：`gh issue edit <n> --add-assignee @me` — 当前会话的首次写入。
- **解决**：`gh issue comment <n> --body "<answer>"`，然后 `gh issue close <n>`，再将上下文指针（gist + 链接）追加到 map 的 Decisions-so-far。
