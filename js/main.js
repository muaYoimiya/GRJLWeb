/**
 * 应用入口模块
 * 按页面动态加载模块，减少首屏解析时间；非关键内容延迟到下一帧渲染
 */

import { onDOMReady, getCurrentPage } from './utils.js';
import { renderNavbar, renderMobileNav, renderFooter, renderFloatingThemeToggle } from './render/common.js';
import { initTheme } from './theme.js';

// 在渲染前初始化主题，避免页面闪烁
initTheme();

function initApp() {
    const currentPage = getCurrentPage();
    const pageIdMap = {
        'index.html': 'index',
        'about.html': 'about',
        'projects.html': 'projects',
        'project-detail.html': 'project-detail',
        'contact.html': 'contact',
    };
    const currentPageId = pageIdMap[currentPage] || 'index';

    // 渲染公共部分
    renderNavbar('header', currentPageId);
    renderMobileNav(currentPageId);
    renderFooter('footer');
    renderFloatingThemeToggle();

    switch (currentPage) {
        case 'index.html':
            initHome();
            break;
        case 'about.html':
            initAbout();
            break;
        case 'projects.html':
            initProjects();
            break;
        case 'project-detail.html':
            initProjectDetail();
            break;
        case 'contact.html':
            initContact();
            break;
        default:
            break;
    }
}

async function initHome() {
    const [{ renderCarousel, renderProfile, initProfileTilt, initProfileClickAnim }, { initCarousel }, { initScrollAnimation }] = await Promise.all([
        import('./render/home.js'),
        import('./index_1.js'),
        import('./index_2.js'),
    ]);
    renderCarousel();
    renderProfile();

    // PC端鼠标跟随，移动端点击摆动
    const isTouchDevice = window.matchMedia('(hover: none)').matches;
    if (isTouchDevice) {
        initProfileClickAnim();
    } else {
        initProfileTilt();
    }
    initScrollAnimation();

    // 入场动画（每次外部进入触发，内部跳转跳过）
    const { initEntranceAnimation } = await import('./entrance.js');
    const entrancePlayed = await initEntranceAnimation();

    if (entrancePlayed) {
        // 入场动画播放完毕，导航栏 1s 淡入
        const header = document.querySelector('header');
        if (header) {
            header.style.transition = 'opacity 1s ease';
            // 强制回流后触发过渡
            header.offsetHeight;
            header.style.opacity = '1';
            header.addEventListener('transitionend', () => {
                header.style.transition = '';
            }, { once: true });
        }
    }

    // 入场动画结束后再启动轮播图
    initCarousel();
}

async function initAbout() {
    const [{ renderPersonalInfo, renderSkills, renderTimeline }, { initScrollAnimation }] = await Promise.all([
        import('./render/about.js'),
        import('./index_2.js'),
    ]);
    renderPersonalInfo();
    // 技能和经历延迟到下一帧，让首屏个人信息先呈现
    requestAnimationFrame(() => {
        renderSkills();
        renderTimeline();
        initScrollAnimation();
    });
}

async function initProjects() {
    const [{ renderFilters, renderSortSelect, renderProjectCards, renderPagination }, { initProjectFilter }, { initScrollAnimation }] = await Promise.all([
        import('./render/projects.js'),
        import('./projects_1.js'),
        import('./index_2.js'),
    ]);
    renderFilters();
    renderSortSelect();
    // 卡片列表延迟一帧，让筛选器先显示
    requestAnimationFrame(() => {
        renderProjectCards();
        renderPagination();
        initProjectFilter();
        initScrollAnimation();
    });
}

async function initProjectDetail() {
    const [{ renderProjectDetail }, { initProjectGallery }] = await Promise.all([
        import('./render/projectDetail.js'),
        import('./project-detail_1.js'),
    ]);
    renderProjectDetail();
    initProjectGallery();
}

async function initContact() {
    const [{ renderContactInfo, renderContactForm }, { initFormValidation }] = await Promise.all([
        import('./render/contact.js'),
        import('./contact_1.js'),
    ]);
    renderContactInfo();
    renderContactForm();
    initFormValidation();
}

onDOMReady(initApp);
