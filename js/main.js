/**
 * 应用入口模块
 * 统一调用渲染层填充页面内容，再调用交互层绑定事件
 */

import { onDOMReady, getCurrentPage } from './utils.js';

// 公共渲染
import { renderNavbar, renderFooter } from './render/common.js';

// 首页
import { renderCarousel, renderProfile } from './render/home.js';
import { initCarousel } from './index_1.js';
import { initScrollAnimation } from './index_2.js';

// 个人简介页
import { renderPersonalInfo, renderSkills, renderTimeline } from './render/about.js';

// 项目展示页
import { renderFilters, renderSortSelect, renderProjectCards } from './render/projects.js';
import { initProjectFilter } from './projects_1.js';

// 项目详情页
import { renderProjectDetail } from './render/projectDetail.js';
import { initProjectGallery } from './project-detail_1.js';

// 联系方式页
import { renderContactInfo, renderContactForm } from './render/contact.js';
import { initFormValidation } from './contact_1.js';

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
    renderFooter('footer');

    // 按页面渲染内容并绑定交互
    switch (currentPage) {
        case 'index.html':
            renderCarousel();
            renderProfile();
            initCarousel();
            initScrollAnimation();
            break;

        case 'about.html':
            renderPersonalInfo();
            renderSkills();
            renderTimeline();
            initScrollAnimation();
            break;

        case 'projects.html':
            renderFilters();
            renderSortSelect();
            renderProjectCards();
            initProjectFilter();
            initScrollAnimation();
            break;

        case 'project-detail.html':
            renderProjectDetail();
            initProjectGallery();
            break;

        case 'contact.html':
            renderContactInfo();
            renderContactForm();
            initFormValidation();
            break;

        default:
            break;
    }
}

onDOMReady(initApp);
