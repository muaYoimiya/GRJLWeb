/**
 * 项目详情页渲染模块
 * 负责渲染项目画廊和详细信息
 */

import { projects } from '../data/projects.js';
import { getURLParam } from '../utils.js';

/**
 * 渲染项目详情
 */
export function renderProjectDetail() {
    const projectId = getURLParam('id');
    if (!projectId) return;

    const project = projects.find(p => p.id === projectId);
    if (!project) return;

    // 标题
    const titleEl = document.getElementById('project-title');
    if (titleEl) titleEl.textContent = project.title;

    // 描述
    const descEl = document.getElementById('project-description');
    if (descEl) descEl.textContent = project.description;

    // 技术栈
    const techStackEl = document.getElementById('project-tech-stack');
    if (techStackEl) {
        techStackEl.innerHTML = '';
        const fragment = document.createDocumentFragment();
        project.techStack.forEach(tech => {
            const span = document.createElement('span');
            span.textContent = tech;
            fragment.appendChild(span);
        });
        techStackEl.appendChild(fragment);
    }

    // 链接
    const demoEl = document.getElementById('project-demo');
    const githubEl = document.getElementById('project-github');
    if (demoEl) demoEl.href = project.demoLink;
    if (githubEl) githubEl.href = project.githubLink;

    // 画廊
    renderGallery(project);
}

/**
 * 渲染项目图片画廊
 */
function renderGallery(project) {
    const container = document.querySelector('.gallery-container');
    const indicatorsContainer = document.querySelector('.gallery-indicators');
    if (!container || !indicatorsContainer) return;

    container.innerHTML = '';
    indicatorsContainer.innerHTML = '';

    const slidesFragment = document.createDocumentFragment();
    const indicatorsFragment = document.createDocumentFragment();

    project.galleryImages.forEach((src, index) => {
        const slide = document.createElement('div');
        slide.className = 'gallery-slide' + (index === 0 ? ' active' : '');
        const img = document.createElement('img');
        img.src = src;
        img.alt = `项目截图${index + 1}`;
        img.loading = 'lazy';
        slide.appendChild(img);
        slidesFragment.appendChild(slide);

        const indicator = document.createElement('span');
        indicator.className = 'indicator' + (index === 0 ? ' active' : '');
        indicatorsFragment.appendChild(indicator);
    });

    container.appendChild(slidesFragment);
    indicatorsContainer.appendChild(indicatorsFragment);
}
