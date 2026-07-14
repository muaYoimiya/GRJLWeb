/**
 * 项目详情页图片轮播模块
 * 负责项目详情页图片画廊的切换和自动播放功能
 */

export function initProjectGallery() {
    const gallery = document.querySelector('.project-gallery');
    if (!gallery) return;
    
    const slides = document.querySelectorAll('.gallery-slide');
    const indicators = document.querySelectorAll('.gallery-indicators .indicator');
    let currentSlide = 0;
    
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
        currentSlide = index;
    }
    
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    setInterval(() => {
        const nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    }, 3000);
}

document.addEventListener('DOMContentLoaded', initProjectGallery);