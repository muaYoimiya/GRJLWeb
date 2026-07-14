/**
 * 项目详情页图片轮播模块
 * 负责项目详情页图片画廊的切换和自动播放功能
 */

import { getElement, getElements, addEventListeners } from './utils.js';

export function initProjectGallery() {
    const gallery = getElement('.project-gallery');
    if (!gallery) return;
    
    const slides = getElements('.gallery-slide');
    const indicators = getElements('.gallery-indicators .indicator');
    let currentSlide = 0;
    
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
        currentSlide = index;
    }
    
    addEventListeners(indicators, 'click', (e) => {
        const indicator = e.target;
        const index = Array.from(indicators).indexOf(indicator);
        showSlide(index);
    });
    
    setInterval(() => {
        const nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    }, 3000);
}