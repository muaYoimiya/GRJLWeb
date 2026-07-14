/**
 * 项目展示页渲染模块
 * 负责渲染筛选器、排序器和项目卡片列表
 */

import { projects, filterCategories, sortOptions } from '../data/projects.js';

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

    filterCategories.forEach((cat, index) => {
        const btn = document.createElement('button');
        btn.className = 'filter-btn' + (index === 0 ? ' active' : '');
        btn.dataset.category = cat.key;
        btn.textContent = cat.label;
        filterContainer.appendChild(btn);
    });
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
 */
export function renderProjectCards() {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;

    grid.innerHTML = '';

    projects.forEach(project => {
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
        grid.appendChild(card);
    });
}
