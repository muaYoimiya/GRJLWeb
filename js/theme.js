/**
 * 主题管理模块
 * 支持亮色/暗色主题切换，使用 localStorage 记住用户偏好
 * 用户手动切换后不再跟随系统；未手动设置时自动响应系统主题变化
 */

const THEME_KEY = 'grjlweb-theme';
const DARK = 'dark';
const LIGHT = 'light';

/** 用户是否已手动设置过主题（有 localStorage 记录即视为手动设置） */
let hasUserPreference = false;

/** 各主题对应的浏览器 chrome 色调 */
const THEME_COLORS = {
    [LIGHT]: '#507ca8',
    [DARK]: '#11111b',
};

/**
 * 获取存储的主题偏好，无记录时回退到系统偏好
 * @returns {'light'|'dark'}
 */
function getStoredTheme() {
    try {
        const stored = localStorage.getItem(THEME_KEY);
        if (stored === DARK || stored === LIGHT) {
            hasUserPreference = true;
            return stored;
        }
    } catch (_) {
        // localStorage 不可用时忽略
    }
    // 跟随系统偏好
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return DARK;
    }
    return LIGHT;
}

/**
 * 更新 meta[name="theme-color"]，适配浏览器 chrome 色调
 * @param {'light'|'dark'} theme
 */
function updateMetaThemeColor(theme) {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
        meta.setAttribute('content', THEME_COLORS[theme]);
    }
}

/**
 * 应用主题到 <html> 元素，同步 color-scheme 告知浏览器表单控件渲染方式
 * @param {'light'|'dark'} theme
 */
export function applyTheme(theme) {
    if (theme === DARK) {
        document.documentElement.setAttribute('data-theme', DARK);
    } else {
        document.documentElement.removeAttribute('data-theme');
    }
    updateMetaThemeColor(theme);
}

/**
 * 切换主题（手动操作，会记住偏好并不再跟随系统）
 * @returns {'light'|'dark'} 切换后的主题
 */
export function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') === DARK ? DARK : LIGHT;
    const next = current === DARK ? LIGHT : DARK;
    hasUserPreference = true;
    applyTheme(next);
    try {
        localStorage.setItem(THEME_KEY, next);
    } catch (_) {
        // localStorage 不可用时忽略
    }
    return next;
}

/**
 * 初始化主题（在页面渲染前调用，避免闪烁）
 * 同时注册系统主题变化监听，用户未手动设置时自动跟随
 */
export function initTheme() {
    applyTheme(getStoredTheme());

    // 监听系统主题变化
    if (window.matchMedia) {
        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e) => {
            // 用户已手动设置过主题，不跟随系统
            if (hasUserPreference) return;
            applyTheme(e.matches ? DARK : LIGHT);
        };
        // 兼容旧版浏览器（addEventListener vs addListener）
        if (mq.addEventListener) {
            mq.addEventListener('change', handleChange);
        } else {
            mq.addListener(handleChange);
        }
    }
}

/**
 * 获取当前主题
 * @returns {'light'|'dark'}
 */
export function getCurrentTheme() {
    return document.documentElement.getAttribute('data-theme') === DARK ? DARK : LIGHT;
}
