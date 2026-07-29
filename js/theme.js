/**
 * 主题管理模块
 * 支持亮色/暗色主题切换，使用 localStorage 记住用户偏好
 */

const THEME_KEY = 'grjlweb-theme';
const DARK = 'dark';
const LIGHT = 'light';

/** 各主题对应的浏览器 chrome 色调 */
const THEME_COLORS = {
    [LIGHT]: '#507ca8',
    [DARK]: '#11111b',
};

/**
 * 获取存储的主题偏好
 * @returns {'light'|'dark'}
 */
function getStoredTheme() {
    try {
        const stored = localStorage.getItem(THEME_KEY);
        if (stored === DARK || stored === LIGHT) return stored;
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
 * 应用主题到 <html> 元素
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
 * 切换主题
 * @returns {'light'|'dark'} 切换后的主题
 */
export function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') === DARK ? DARK : LIGHT;
    const next = current === DARK ? LIGHT : DARK;
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
 */
export function initTheme() {
    applyTheme(getStoredTheme());
}

/**
 * 获取当前主题
 * @returns {'light'|'dark'}
 */
export function getCurrentTheme() {
    return document.documentElement.getAttribute('data-theme') === DARK ? DARK : LIGHT;
}
