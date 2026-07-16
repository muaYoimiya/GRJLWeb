/**
 * 公共渲染模块
 * 负责渲染导航栏和页脚
 */

import { siteConfig, navItems, footerData } from '../data/common.js';

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

    // Logo
    const logoDiv = document.createElement('div');
    logoDiv.className = 'logo';
    const logoImg = document.createElement('img');
    logoImg.src = siteConfig.logo;
    logoImg.alt = 'Logo';
    logoImg.className = 'logo-img';
    logoImg.loading = 'lazy';
    const logoTitle = document.createElement('h1');
    logoTitle.textContent = siteConfig.name;
    logoDiv.appendChild(logoImg);
    logoDiv.appendChild(logoTitle);

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

    inner.appendChild(logoDiv);
    inner.appendChild(ul);
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
