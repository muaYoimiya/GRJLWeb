/**
 * 页面滚动动画模块
 * 负责页面元素的滚动进入动画效果
 */

import { getElements, throttle } from './utils.js';

export function initScrollAnimation() {
    const elements = getElements('.skills-section, .timeline, .project-card');
    
    function checkVisibility() {
        elements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight * 0.8;
            
            if (isVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', throttle(checkVisibility, 100));
    checkVisibility();
}