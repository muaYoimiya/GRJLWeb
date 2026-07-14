/**
 * 首页渲染模块
 * 负责渲染轮播图和个人介绍区域
 */

import { carouselSlides, profileData } from '../data/home.js';

/**
 * 渲染轮播图
 */
export function renderCarousel() {
    const container = document.querySelector('.carousel-container');
    const indicatorsContainer = document.querySelector('.carousel-indicators');
    if (!container || !indicatorsContainer) return;

    container.innerHTML = '';
    indicatorsContainer.innerHTML = '';

    const slidesFragment = document.createDocumentFragment();
    const indicatorsFragment = document.createDocumentFragment();

    carouselSlides.forEach((slide, index) => {
        const slideDiv = document.createElement('div');
        slideDiv.className = 'carousel-slide' + (index === 0 ? ' active' : '');
        const h2 = document.createElement('h2');
        h2.textContent = slide.title;
        const p = document.createElement('p');
        p.textContent = slide.description;
        slideDiv.appendChild(h2);
        slideDiv.appendChild(p);
        slidesFragment.appendChild(slideDiv);

        const indicator = document.createElement('span');
        indicator.className = 'indicator' + (index === 0 ? ' active' : '');
        indicatorsFragment.appendChild(indicator);
    });

    container.appendChild(slidesFragment);
    indicatorsContainer.appendChild(indicatorsFragment);
}

/**
 * 渲染个人介绍
 */
export function renderProfile() {
    const photoContainer = document.querySelector('.profile-photo');
    const infoContainer = document.querySelector('.profile-info');
    if (!photoContainer || !infoContainer) return;

    photoContainer.innerHTML = '';
    const img = document.createElement('img');
    img.src = profileData.avatar;
    img.alt = '个人照片';
    img.loading = 'lazy';
    photoContainer.appendChild(img);

    infoContainer.innerHTML = '';
    const name = document.createElement('h2');
    name.textContent = profileData.name;
    const title = document.createElement('h3');
    title.textContent = profileData.title;
    const bio = document.createElement('p');
    bio.textContent = profileData.bio;

    const skillsDiv = document.createElement('div');
    skillsDiv.className = 'skills';
    const skillsFragment = document.createDocumentFragment();
    profileData.skills.forEach(skill => {
        const span = document.createElement('span');
        span.textContent = skill;
        skillsFragment.appendChild(span);
    });
    skillsDiv.appendChild(skillsFragment);

    infoContainer.appendChild(name);
    infoContainer.appendChild(title);
    infoContainer.appendChild(bio);
    infoContainer.appendChild(skillsDiv);
}
