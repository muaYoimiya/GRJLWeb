/**
 * 项目展示页渲染模块
 * 负责渲染筛选器、排序器和项目卡片列表
 */

import { projects, filterCategories, sortOptions } from '../data/projects.js';

const ITEMS_PER_PAGE = 6;
let currentPage = 1;
let filteredProjects = [...projects];

/**
 * 渲染筛选按钮
 */
export function renderFilters() {
    const filterContainer = document.querySelector('.filter');
    if (!filterContainer) return;

    filterContainer.innerHTML = '';
    const title = document.createElement('h4');
    title.textContent = '分类筛选：';
    filterContainer.appendChild(title);

    const fragment = document.createDocumentFragment();
    filterCategories.forEach((cat, index) => {
        const btn = document.createElement('button');
        btn.className = 'filter-btn' + (index === 0 ? ' active' : '');
        btn.dataset.category = cat.key;
        btn.textContent = cat.label;
        fragment.appendChild(btn);
    });
    filterContainer.appendChild(fragment);
}

/**
 * 渲染排序下拉框
 */
export function renderSortSelect() {
    const sortContainer = document.querySelector('.sort');
    if (!sortContainer) return;

    sortContainer.innerHTML = '';
    const title = document.createElement('h4');
    title.textContent = '排序：';
    sortContainer.appendChild(title);

    const select = document.createElement('select');
    select.id = 'sort-select';
    sortOptions.forEach(opt => {
        const option = document.createElement('option');
        option.value = opt.value;
        option.textContent = opt.label;
        select.appendChild(option);
    });
    sortContainer.appendChild(select);
}

/**
 * 渲染项目卡片列表
 * @param {number} page - 当前页码（从1开始）
 */
export function renderProjectCards(page = 1) {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;

    grid.innerHTML = '';
    const fragment = document.createDocumentFragment();

    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const pageProjects = filteredProjects.slice(start, end);

    pageProjects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.dataset.category = project.category;
        card.dataset.date = project.date;
        card.dataset.name = project.name;

        const imageDiv = document.createElement('div');
        imageDiv.className = 'project-image';
        const img = document.createElement('img');
        img.src = project.image;
        img.alt = project.name;
        img.loading = 'lazy';
        imageDiv.appendChild(img);

        const infoDiv = document.createElement('div');
        infoDiv.className = 'project-info';
        const name = document.createElement('h3');
        name.textContent = project.name;
        const desc = document.createElement('p');
        desc.textContent = project.shortDescription;
        const link = document.createElement('a');
        link.href = `project-detail.html?id=${project.id}`;
        link.className = 'view-detail';
        link.textContent = '查看详情';

        infoDiv.appendChild(name);
        infoDiv.appendChild(desc);
        infoDiv.appendChild(link);

        card.appendChild(imageDiv);
        card.appendChild(infoDiv);
        fragment.appendChild(card);
    });

    grid.appendChild(fragment);
}

/**
 * 渲染分页按钮
 */
export function renderPagination() {
    const paginationContainer = document.querySelector('.pagination');
    if (!paginationContainer) return;

    paginationContainer.innerHTML = '';
    const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
    if (totalPages <= 1) return;

    const fragment = document.createDocumentFragment();
    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.className = 'page-btn' + (i === currentPage ? ' active' : '');
        btn.dataset.page = i;
        btn.textContent = i;
        fragment.appendChild(btn);
    }
    paginationContainer.appendChild(fragment);
}

/**
 * 获取当前页码
 */
export function getCurrentPageNum() {
    return currentPage;
}

/**
 * 设置当前页码
 */
export function setCurrentPageNum(page) {
    currentPage = page;
}

/**
 * 获取过滤后的项目列表
 */
export function getFilteredProjects() {
    return filteredProjects;
}

/**
 * 设置过滤后的项目列表并重置页码
 */
export function setFilteredProjects(newProjects) {
    filteredProjects = newProjects;
    currentPage = 1;
}
