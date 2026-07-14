/**
 * 首页轮播图模块
 * 负责首页轮播图的自动播放、指示器切换等功能
 */

import { getElement, getElements, addEventListeners } from './utils.js';

export function initCarousel() {
    const carousel = getElement('.carousel');
    if (!carousel) return;
    
    const slides = getElements('.carousel-slide');
    const indicators = getElements('.indicator');
    let currentSlide = 0;
    let slideInterval = null;
    
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
        currentSlide = index;
    }
    
    function nextSlide() {
        const nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    }
    
    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 3000);
    }
    
    addEventListeners(indicators, 'click', (e) => {
        const indicator = e.target;
        const index = Array.from(indicators).indexOf(indicator);
        showSlide(index);
        resetInterval();
    });
    
    slideInterval = setInterval(nextSlide, 3000);
}