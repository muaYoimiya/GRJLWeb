/**
 * 公共渲染模块
 * 负责渲染导航栏（含主题切换按钮）和页脚
 */

import { siteConfig, navItems, footerData } from '../data/common.js';
import { toggleTheme, getCurrentTheme } from '../theme.js';

/** 太阳图标 SVG */
const SUN_ICON = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="5"/>
  <line x1="12" y1="1" x2="12" y2="3"/>
  <line x1="12" y1="21" x2="12" y2="23"/>
  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
  <line x1="1" y1="12" x2="3" y2="12"/>
  <line x1="21" y1="12" x2="23" y2="12"/>
  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
</svg>`;

/** 月亮图标 SVG */
const MOON_ICON = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
</svg>`;

/**
 * 创建主题切换按钮
 * @returns {HTMLButtonElement}
 */
function createThemeToggle() {
    const btn = document.createElement('button');
    btn.className = 'theme-toggle';
    btn.title = '切换亮色/暗色主题';
    btn.setAttribute('aria-label', '切换主题');
    btn.innerHTML = getCurrentTheme() === 'dark' ? SUN_ICON : MOON_ICON;
    btn.addEventListener('click', () => {
        const next = toggleTheme();
        btn.innerHTML = next === 'dark' ? SUN_ICON : MOON_ICON;
    });
    return btn;
}

/**
 * 渲染导航栏
 * @param {string} containerSelector - 导航栏容器选择器
 * @param {string} currentPageId - 当前页面标识
 */
export function renderNavbar(containerSelector, currentPageId) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    container.innerHTML = '';

    const nav = document.createElement('nav');
    nav.className = 'navbar';

    const inner = document.createElement('div');
    inner.className = 'container';

    // 站点标题
    const siteTitle = document.createElement('h1');
    siteTitle.className = 'site-title';
    siteTitle.textContent = siteConfig.name;

    // 右侧区域：导航菜单 + 主题切换按钮
    const rightDiv = document.createElement('div');
    rightDiv.className = 'navbar-right';

    // 导航菜单
    const ul = document.createElement('ul');
    ul.className = 'nav-menu';
    const navFragment = document.createDocumentFragment();
    navItems.forEach(item => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = item.href;
        a.textContent = item.label;
        if (item.id === currentPageId) {
            a.classList.add('active');
        }
        li.appendChild(a);
        navFragment.appendChild(li);
    });
    ul.appendChild(navFragment);

    // 主题切换按钮
    const themeToggle = createThemeToggle();

    rightDiv.appendChild(ul);
    rightDiv.appendChild(themeToggle);

    inner.appendChild(siteTitle);
    inner.appendChild(rightDiv);
    nav.appendChild(inner);
    container.appendChild(nav);
}

/**
 * 渲染移动端底部导航栏
 * @param {string} currentPageId - 当前页面标识
 */
export function renderMobileNav(currentPageId) {
    // 项目详情页高亮项目展示
    const activeId = currentPageId === 'project-detail' ? 'projects' : currentPageId;

    let mobileNav = document.querySelector('.mobile-nav');
    if (!mobileNav) {
        mobileNav = document.createElement('nav');
        mobileNav.className = 'mobile-nav';
        document.body.appendChild(mobileNav);
    }
    mobileNav.innerHTML = '';

    const fragment = document.createDocumentFragment();
    navItems.forEach(item => {
        const a = document.createElement('a');
        a.href = item.href;
        a.className = 'mobile-nav-item' + (item.id === activeId ? ' active' : '');
        a.textContent = item.label;
        fragment.appendChild(a);
    });
    mobileNav.appendChild(fragment);
}

/**
 * 渲染移动端悬浮主题切换按钮
 * 固定在右上角，不随页面滚动，仅移动端可见
 */
export function renderFloatingThemeToggle() {
    // 避免重复创建
    if (document.querySelector('.floating-theme-toggle')) return;

    const btn = document.createElement('button');
    btn.className = 'floating-theme-toggle';
    btn.title = '切换亮色/暗色主题';
    btn.setAttribute('aria-label', '切换主题');
    btn.innerHTML = getCurrentTheme() === 'dark' ? SUN_ICON : MOON_ICON;
    btn.addEventListener('click', () => {
        const next = toggleTheme();
        btn.innerHTML = next === 'dark' ? SUN_ICON : MOON_ICON;
    });
    document.body.appendChild(btn);
}

/**
 * 渲染页脚
 * @param {string} containerSelector - 页脚容器选择器
 */
export function renderFooter(containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    container.innerHTML = '';

    const inner = document.createElement('div');
    inner.className = 'container';

    const content = document.createElement('div');
    content.className = 'footer-content';

    // 品牌信息
    const infoDiv = document.createElement('div');
    infoDiv.className = 'footer-info';
    const brandName = document.createElement('h3');
    brandName.textContent = footerData.brand.name;
    const brandTitle = document.createElement('p');
    brandTitle.textContent = footerData.brand.title;
    const emailP = document.createElement('p');
    emailP.textContent = `邮箱：${footerData.contact.email}`;
    const phoneP = document.createElement('p');
    phoneP.textContent = `电话：${footerData.contact.phone}`;
    infoDiv.appendChild(brandName);
    infoDiv.appendChild(brandTitle);
    infoDiv.appendChild(emailP);
    infoDiv.appendChild(phoneP);

    // 链接
    const linksDiv = document.createElement('div');
    linksDiv.className = 'footer-links';
    const linksFragment = document.createDocumentFragment();
    footerData.links.forEach(link => {
        const a = document.createElement('a');
        a.href = link.href;
        a.textContent = link.label;
        linksFragment.appendChild(a);
    });
    linksDiv.appendChild(linksFragment);

    content.appendChild(infoDiv);
    content.appendChild(linksDiv);

    // 底部版权
    const bottom = document.createElement('div');
    bottom.className = 'footer-bottom';
    const copyrightP = document.createElement('p');
    copyrightP.textContent = siteConfig.copyright;
    bottom.appendChild(copyrightP);

    inner.appendChild(content);
    inner.appendChild(bottom);
    container.appendChild(inner);
}
