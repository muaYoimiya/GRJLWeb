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

/**
 * 初始化头像视差倾斜效果
 * PC端根据鼠标位置偏移，移动端根据重力感应偏移
 */
export function initProfileTilt() {
    const container = document.querySelector('.profile-photo');
    const img = container?.querySelector('img');
    if (!container || !img) return;

    const maxOffset = 15;
    const lerpFactor = 0.12;
    const stopThreshold = 0.05;
    const normalizeFactor = 300;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId = null;

    function update() {
        const diffX = targetX - currentX;
        const diffY = targetY - currentY;

        if (Math.abs(diffX) < stopThreshold && Math.abs(diffY) < stopThreshold) {
            currentX = targetX;
            currentY = targetY;
            img.style.transform = `translate(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px) scale(1.1)`;
            rafId = null;
            return;
        }

        currentX += diffX * lerpFactor;
        currentY += diffY * lerpFactor;
        img.style.transform = `translate(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px) scale(1.1)`;
        rafId = requestAnimationFrame(update);
    }

    function scheduleUpdate() {
        if (!rafId) {
            rafId = requestAnimationFrame(update);
        }
    }

    function onMouseMove(e) {
        const rect = container.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distX = e.clientX - centerX;
        const distY = e.clientY - centerY;

        targetX = Math.max(-maxOffset, Math.min(maxOffset, distX / normalizeFactor * maxOffset));
        targetY = Math.max(-maxOffset, Math.min(maxOffset, distY / normalizeFactor * maxOffset));
        scheduleUpdate();
    }

    function onTouchMove(e) {
        if (usingOrientation) return;
        const touch = e.touches[0];
        const rect = container.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distX = touch.clientX - centerX;
        const distY = touch.clientY - centerY;

        targetX = Math.max(-maxOffset, Math.min(maxOffset, distX / normalizeFactor * maxOffset));
        targetY = Math.max(-maxOffset, Math.min(maxOffset, distY / normalizeFactor * maxOffset));
        scheduleUpdate();
    }

    let usingOrientation = false;

    function onDeviceOrientation(e) {
        const gamma = e.gamma;
        const beta = e.beta;
        // 部分浏览器首次事件数据为 null，需过滤
        if (gamma == null || beta == null) return;

        if (!usingOrientation) {
            usingOrientation = true;
            window.removeEventListener('touchmove', onTouchMove);
            window.removeEventListener('mousemove', onMouseMove);
        }

        targetX = Math.max(-maxOffset, Math.min(maxOffset, gamma / 45 * maxOffset));
        targetY = Math.max(-maxOffset, Math.min(maxOffset, (beta - 45) / 45 * maxOffset));
        scheduleUpdate();
    }

    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (isTouchDevice) {
        // 触摸设备优先尝试陀螺仪，同时用 touchmove 兜底
        if (window.DeviceOrientationEvent) {
            window.addEventListener('deviceorientation', onDeviceOrientation);
        }
        window.addEventListener('touchmove', onTouchMove, { passive: true });

        // iOS 13+ 需要用户交互后才能申请陀螺仪权限
        if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
            const requestPermission = () => {
                DeviceOrientationEvent.requestPermission()
                    .then(state => {
                        if (state === 'granted') {
                            window.addEventListener('deviceorientation', onDeviceOrientation);
                        }
                    })
                    .catch(() => {});
            };
            window.addEventListener('click', requestPermission, { once: true });
            window.addEventListener('touchstart', requestPermission, { once: true });
        }
    } else {
        window.addEventListener('mousemove', onMouseMove);
    }
}
