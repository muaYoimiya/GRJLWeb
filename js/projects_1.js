/**
 * 项目展示页筛选排序模块
 * 负责项目卡片的分类筛选、排序和分页功能
 */

import { getElementById, getElements, addEventListeners } from './utils.js';
import { projects } from './data/projects.js';
import { renderProjectCards, renderPagination, setCurrentPageNum, getCurrentPageNum, setFilteredProjects } from './render/projects.js';

export function initProjectFilter() {
    const projectsGrid = getElementById('projects-grid');
    if (!projectsGrid) return;

    const filterBtns = getElements('.filter-btn');
    const sortContainer = document.querySelector('.custom-sort');

    addEventListeners(filterBtns, 'click', (e) => {
        const btn = e.target;
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.dataset.category;
        const filtered = category === 'all'
            ? [...projects]
            : projects.filter(p => p.category === category);

        setFilteredProjects(filtered);
        const activeSort = sortContainer?.querySelector('.sort-option.active');
        applySort(activeSort?.dataset.value || 'date-desc');
        renderProjectCards(1);
        renderPagination();
    });

    // 监听自定义排序事件
    if (sortContainer) {
        sortContainer.addEventListener('sortchange', (e) => {
            applySort(e.detail.value);
            setCurrentPageNum(1);
            renderProjectCards(1);
            renderPagination();
        });
    }

    // 分页点击事件
    const paginationContainer = document.querySelector('.pagination');
    if (paginationContainer) {
        paginationContainer.addEventListener('click', (e) => {
            const btn = e.target.closest('.page-btn');
            if (!btn) return;

            const page = parseInt(btn.dataset.page, 10);
            if (page === getCurrentPageNum()) return;

            setCurrentPageNum(page);
            renderProjectCards(page);
            renderPagination();
            projectsGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }
}

function applySort(sortValue) {
    const filtered = [...projects]; // 这里应该获取当前的filteredProjects，但render/projects.js没有导出getter来获取当前状态
    // 重新根据当前active的filter按钮计算
    const activeBtn = document.querySelector('.filter-btn.active');
    const category = activeBtn ? activeBtn.dataset.category : 'all';

    let result = category === 'all'
        ? [...projects]
        : projects.filter(p => p.category === category);

    switch (sortValue) {
        case 'date-desc':
            result.sort((a, b) => new Date(b.date) - new Date(a.date));
            break;
        case 'date-asc':
            result.sort((a, b) => new Date(a.date) - new Date(b.date));
            break;
        case 'name-asc':
            result.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'name-desc':
            result.sort((a, b) => b.name.localeCompare(a.name));
            break;
    }

    setFilteredProjects(result);
}