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
 * 初始化头像点击左右探望动画（所有设备通用）
 * 模拟人观望节奏：快速转向一侧 → 短暂停留 → 转向另一侧 → 停留 → 缓慢归位
 */
export function initProfileClickAnim() {
    const container = document.querySelector('.profile-photo');
    const img = container?.querySelector('img');
    if (!container || !img) return;

    img.style.transform = 'translate(0px, 0px) scale(1.1)';

    let isSwinging = false;
    container.addEventListener('click', () => {
        if (isSwinging) return;
        isSwinging = true;

        const amplitude = 14;
        const maxRotate = 5;
        const duration = 1800;
        const startTime = performance.now();

        // [进度, translateX归一化值, rotate归一化值]
        const keyframes = [
            [0,    0,  0],
            [0.20, 1,  1],
            [0.26, 1,  1],
            [0.48, -1, -1],
            [0.54, -1, -1],
            [1.0,  0,  0],
        ];

        function lerpKeyframes(t) {
            for (let i = 0; i < keyframes.length - 1; i++) {
                const [t0] = keyframes[i];
                const [t1] = keyframes[i + 1];
                if (t >= t0 && t <= t1) {
                    const local = (t - t0) / (t1 - t0);
                    const s = local * local * (3 - 2 * local);
                    const [, x0, r0] = keyframes[i];
                    const [, x1, r1] = keyframes[i + 1];
                    return [
                        x0 + (x1 - x0) * s,
                        r0 + (r1 - r0) * s,
                    ];
                }
            }
            return [0, 0];
        }

        function animate(now) {
            const elapsed = now - startTime;
            if (elapsed >= duration) {
                img.style.transform = 'translate(0px, 0px) rotate(0deg) scale(1.1)';
                isSwinging = false;
                return;
            }

            const progress = elapsed / duration;
            const [nx, nr] = lerpKeyframes(progress);
            const tx = nx * amplitude;
            const rot = nr * maxRotate;
            img.style.transform = `translate(${tx.toFixed(2)}px, 0px) rotate(${rot.toFixed(2)}deg) scale(1.1)`;
            requestAnimationFrame(animate);
        }

        requestAnimationFrame(animate);
    });
}
