/**
 * 应用入口模块
 * 统一管理各页面的初始化逻辑
 */

import { onDOMReady, getCurrentPage } from './utils.js';
import { initCarousel } from './index_1.js';
import { initScrollAnimation } from './index_2.js';
import { initProjectFilter } from './projects_1.js';
import { initProjectGallery } from './project-detail_1.js';
import { loadProjectDetails } from './project-detail_2.js';
import { initFormValidation } from './contact_1.js';

function initApp() {
    const currentPage = getCurrentPage();
    
    switch (currentPage) {
        case 'index.html':
            initCarousel();
            initScrollAnimation();
            break;
        
        case 'about.html':
            initScrollAnimation();
            break;
        
        case 'projects.html':
            initProjectFilter();
            initScrollAnimation();
            break;
        
        case 'project-detail.html':
            initProjectGallery();
            loadProjectDetails();
            break;
        
        case 'contact.html':
            initFormValidation();
            break;
        
        default:
            break;
    }
}

onDOMReady(initApp);