/**
 * 语录背景动画模块
 * 在首页 .about-me 区域生成浮动文字语录动态背景
 * 使用 WAAPI 实现淡入放大冒出 → 固定大小透明消失
 * 碰撞检测保证多条语录显示位置不重合
 */

const MAX_ACTIVE = 9;          // 最多同时显示数
const SPAWN_MIN = 300;         // 生成间隔最小值 ms
const SPAWN_MAX = 1000;        // 生成间隔最大值 ms
const FADE_IN_MS = 3000;       // 冒出持续 ms
const FADE_OUT_MS = 500;       // 消失持续 ms
const FINAL_SCALE = 1.2;       // 冒出动效最终缩放倍数
const PADDING = 24;            // 语录间距 px

let activeQuotes = [];                // { text, el }
let usedTexts = new Set();            // 本轮已用过的语录文本
let timerId = null;

/**
 * 初始化语录背景动画
 * 动态创建语录层并启动生成循环
 */
export function initQuotesAnimation() {
    const aboutMe = document.querySelector('.about-me');
    if (!aboutMe) return;

    // 防止重复初始化
    if (document.querySelector('.quotes-bg-layer')) return;

    // 创建语录背景层
    const layer = document.createElement('div');
    layer.className = 'quotes-bg-layer';
    aboutMe.insertBefore(layer, aboutMe.firstChild);

    // 动态加载语录数据并启动
    import('./data/quotes.js').then(({ quotes }) => {
        spawnQuote(layer, quotes); // 立即生成第一条，不等间隔
        scheduleNext(layer, quotes);
    });
}

/**
 * 随机间隔后生成下一条语录
 */
function scheduleNext(layer, quotes) {
    const delay = SPAWN_MIN + Math.random() * (SPAWN_MAX - SPAWN_MIN);
    timerId = setTimeout(() => {
        spawnQuote(layer, quotes);
        scheduleNext(layer, quotes);
    }, delay);
}

/**
 * 生成一条语录并启动动画
 */
function spawnQuote(layer, quotes) {
    if (activeQuotes.length >= MAX_ACTIVE) return;

    // 从尚未在本轮使用的语录中随机选取
    const available = quotes.filter(q => !usedTexts.has(q));
    if (available.length === 0) {
        // 所有语录都用过一轮了，重置
        usedTexts.clear();
        // 排除当前正在显示的语录，避免立即重复
        const activeTexts = new Set(activeQuotes.map(q => q.text));
        const fresh = quotes.filter(q => !activeTexts.has(q));
        if (fresh.length === 0) return;
        return spawnQuote(layer, quotes);
    }

    const chosen = available[Math.floor(Math.random() * available.length)];

    // 创建语录 span，先不设位置以测量尺寸
    const span = document.createElement('span');
    span.className = 'quote-span';
    span.textContent = chosen;
    // 先放到不可见位置测量尺寸
    span.style.left = '-9999px';
    span.style.top = '-9999px';
    layer.appendChild(span);

    // 分配不重叠位置（基于元素实际渲染尺寸 × 最终缩放倍数）
    const pos = allocatePosition(layer, span);
    span.style.left = pos.x + 'px';
    span.style.top = pos.y + 'px';

    // 记录状态
    activeQuotes.push({ text: chosen, el: span });
    usedTexts.add(chosen);

    // 播放冒出动画
    animateFadeIn(span);

    // 冒出结束后衔接消失动画
    setTimeout(() => {
        animateFadeOut(span, () => {
            removeQuote(chosen, span);
        });
    }, FADE_IN_MS);
}

/**
 * 冒出动画 — 透明度 0→0.95，大小 0.3→1.26→1.2
 */
function animateFadeIn(el) {
    el.animate(
        [
            { opacity: 0, transform: 'scale(0.3)', offset: 0 },
            { opacity: 0.85, transform: 'scale(1.26)', offset: 0.7 },
            { opacity: 0.95, transform: `scale(${FINAL_SCALE})`, offset: 1.0 },
        ],
        {
            duration: FADE_IN_MS,
            easing: 'ease-out',
            fill: 'forwards',
        },
    );
}

/**
 * 消失动画 — 固定大小，透明度 0.95→0
 */
function animateFadeOut(el, onDone) {
    const anim = el.animate(
        [
            { opacity: 0.95, transform: `scale(${FINAL_SCALE})` },
            { opacity: 0, transform: `scale(${FINAL_SCALE})` },
        ],
        {
            duration: FADE_OUT_MS,
            easing: 'ease-in',
            fill: 'forwards',
        },
    );
    anim.onfinish = () => {
        el.remove();
        onDone();
    };
}

/**
 * 清理已完成的语录状态
 */
function removeQuote(text, el) {
    activeQuotes = activeQuotes.filter(q => q.el !== el);
}

/**
 * 碰撞检测分配位置
 * 基于元素实际尺寸 × 最终缩放倍数，随机尝试不重叠位置
 */
function allocatePosition(layer, span) {
    const layerRect = layer.getBoundingClientRect();

    // 测量元素原始尺寸（未缩放状态），推算缩放后的最终尺寸 + 间距
    const rawW = span.offsetWidth;
    const rawH = span.offsetHeight;
    const w = rawW * FINAL_SCALE + PADDING;
    const h = rawH * FINAL_SCALE + PADDING;

    // 收集当前所有活跃语录的边界矩形（已按缩放后实际渲染尺寸 + 半间距）
    const activeRects = activeQuotes.map(q => {
        const r = q.el.getBoundingClientRect();
        return {
            left:   r.left   - layerRect.left - PADDING / 2,
            top:    r.top    - layerRect.top  - PADDING / 2,
            right:  r.right  - layerRect.left + PADDING / 2,
            bottom: r.bottom - layerRect.top  + PADDING / 2,
        };
    });

    // 收集所有需要避让的障碍矩形（活跃语录 + 头像/信息区域）
    const exclusionZones = getExclusionZones(layer);
    const obstacles = [...activeRects, ...exclusionZones];

    // 随机尝试
    const maxAttempts = 50;
    const maxX = Math.max(0, layerRect.width - w);
    const maxY = Math.max(0, layerRect.height - h);

    for (let i = 0; i < maxAttempts; i++) {
        const x = maxX > 0 ? Math.random() * maxX : 0;
        const y = maxY > 0 ? Math.random() * maxY : 0;

        const candidate = { left: x, top: y, right: x + w, bottom: y + h };

        if (!obstacles.some(r => rectsOverlap(candidate, r))) {
            return { x, y };
        }
    }

    // 回退：扫描法逐行寻找可用空隙
    return scanFallback(layerRect, w, h, obstacles);
}

/**
 * 获取内容区域（头像、信息文字）在 layer 坐标系中的排除矩形
 * 加 16px 内边距避免语录紧贴内容边缘
 */
function getExclusionZones(layer) {
    const layerRect = layer.getBoundingClientRect();
    const zones = [];
    const selectors = ['.profile-photo', '.profile-info'];

    for (const sel of selectors) {
        const el = document.querySelector(sel);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        zones.push({
            left:   r.left   - layerRect.left - 16,
            top:    r.top    - layerRect.top  - 16,
            right:  r.right  - layerRect.left + 16,
            bottom: r.bottom - layerRect.top  + 16,
        });
    }
    return zones;
}

/**
 * 两矩形是否重叠
 */
function rectsOverlap(a, b) {
    return !(a.right <= b.left || a.left >= b.right || a.bottom <= b.top || a.top >= b.bottom);
}

/**
 * 扫描回退 — 将容器按高度分条，逐条扫描水平空隙
 */
function scanFallback(layerRect, w, h, allRects) {
    const stepY = Math.max(h, 40);

    // 按 top 坐标排序
    const sorted = [...allRects].sort((a, b) => a.top - b.top);

    for (let y = 0; y + h <= layerRect.height; y += stepY) {
        // 找出该高度带内与候选区域水平重叠的语录
        const band = sorted.filter(r => !(r.bottom <= y || r.top >= y + h));

        if (band.length === 0) {
            // 该带完全空闲，随机水平位置
            const x = Math.random() * Math.max(0, layerRect.width - w);
            return { x, y: y + Math.random() * (stepY - h) };
        }

        // 按 left 排序，扫描水平间隙
        const sortedByX = [...band].sort((a, b) => a.left - b.left);

        // 左边缘到第一条语录之间
        if (sortedByX[0].left >= w) {
            const x = Math.random() * (sortedByX[0].left - w);
            return { x, y };
        }

        // 相邻语录之间的间隙
        for (let i = 0; i < sortedByX.length - 1; i++) {
            const gap = sortedByX[i + 1].left - sortedByX[i].right;
            if (gap >= w) {
                const x = sortedByX[i].right + Math.random() * (gap - w);
                return { x, y };
            }
        }

        // 最后一条语录到右边缘之间
        const lastRight = sortedByX[sortedByX.length - 1].right;
        if (layerRect.width - lastRight >= w) {
            const x = lastRight + Math.random() * (layerRect.width - lastRight - w);
            return { x, y };
        }
    }

    // 最终回退：任意随机位置
    return {
        x: Math.random() * Math.max(0, layerRect.width - w),
        y: Math.random() * Math.max(0, layerRect.height - h),
    };
}
