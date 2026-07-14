/**
 * 项目展示页筛选排序模块
 * 负责项目卡片的分类筛选和排序功能
 */

import { getElementById, getElements, addEventListeners } from './utils.js';

export function initProjectFilter() {
    const projectsGrid = getElementById('projects-grid');
    if (!projectsGrid) return;
    
    const filterBtns = getElements('.filter-btn');
    const sortSelect = getElementById('sort-select');
    const projectCards = Array.from(getElements('.project-card'));
    
    addEventListeners(filterBtns, 'click', (e) => {
        const btn = e.target;
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const category = btn.dataset.category;
        
        projectCards.forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
    
    sortSelect.addEventListener('change', () => {
        const sortValue = sortSelect.value;
        const visibleCards = projectCards.filter(card => card.style.display !== 'none');
        
        switch(sortValue) {
            case 'date-desc':
                visibleCards.sort((a, b) => new Date(b.dataset.date) - new Date(a.dataset.date));
                break;
            case 'date-asc':
                visibleCards.sort((a, b) => new Date(a.dataset.date) - new Date(b.dataset.date));
                break;
            case 'name-asc':
                visibleCards.sort((a, b) => a.dataset.name.localeCompare(b.dataset.name));
                break;
            case 'name-desc':
                visibleCards.sort((a, b) => b.dataset.name.localeCompare(a.dataset.name));
                break;
        }
        
        visibleCards.forEach(card => projectsGrid.appendChild(card));
    });
}