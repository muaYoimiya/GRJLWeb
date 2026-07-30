/**
 * 入场动画模块
 * 每次外部进入网站时显示全屏 Welcome 动画
 * 覆盖层上下两边同时向轮播图位置收缩，文字同步缩放
 */

const STORAGE_KEY = 'entrance_visited';

/**
 * 判断是否从外部进入网站
 * 通过 document.referrer 判断来源是否为本站，站内页面跳转不视为外部进入
 * @returns {boolean}
 */
function isExternalEntry() {
    if (!document.referrer) return true;
    try {
        const referrerUrl = new URL(document.referrer);
        return referrerUrl.origin !== window.location.origin;
    } catch {
        return true;
    }
}

/**
 * 初始化入场动画
 * 仅外部进入首页时触发（直接输入URL、外部链接、书签等），站内页面跳转不触发
 * @returns {Promise<boolean>} true 表示播放了入场动画，false 表示跳过
 */
export function initEntranceAnimation() {
    const path = window.location.pathname;
    const isIndexPage = /index\.html$/.test(path) || path === '/';

    if (!isIndexPage) return Promise.resolve(false);

    // 站内页面间跳转不触发入场动画
    if (!isExternalEntry()) return Promise.resolve(false);

    if (sessionStorage.getItem(STORAGE_KEY)) return Promise.resolve(false);

    sessionStorage.setItem(STORAGE_KEY, '1');
    return showAnimation();
}

/**
 * 执行入场动画
 * @returns {Promise<boolean>}
 */
function showAnimation() {
    const carousel = document.querySelector('.carousel');
    if (!carousel) return Promise.resolve(false);

    return new Promise((resolve) => {
        // 隐藏导航栏（入场动画期间不可见）
        const header = document.querySelector('header');
        if (header) {
            header.style.opacity = '0';
        }

        // 创建覆盖层
        const overlay = document.createElement('div');
        overlay.className = 'entrance-overlay';

        const text = document.createElement('span');
        text.className = 'entrance-text';
        text.textContent = 'Welcome';

        overlay.appendChild(text);
        document.body.appendChild(overlay);

        // 页面不可滚动
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        function cleanup() {
            overlay.remove();
            document.body.style.overflow = prevOverflow;
            resolve(true);
        }

        // 等待 1 秒后开始收缩动画
        setTimeout(() => {
            const carouselRect = carousel.getBoundingClientRect();
            const targetHeight = carouselRect.height;
            const targetTop = carouselRect.top;

            // 覆盖层：上下两边同时向轮播图位置收缩（1.3s）
            const overlayAnim = overlay.animate(
                [
                    { height: '100vh', top: '0px', opacity: 1 },
                    { height: `${targetHeight}px`, top: `${targetTop}px`, opacity: 1 },
                ],
                {
                    duration: 1300,
                    easing: 'cubic-bezier(0.42, 0, 1, 1)',
                    fill: 'forwards',
                },
            );

            // 文字：从 2 倍缩放恢复至原始大小（与轮播图 h2 字号一致，1.3s）
            text.animate(
                [
                    { transform: 'scale(2)' },
                    { transform: 'scale(1)' },
                ],
                {
                    duration: 1300,
                    easing: 'cubic-bezier(0.42, 0, 1, 1)',
                    fill: 'forwards',
                },
            );

            // 收缩完成后停留 0.5s，再以 0.7s 淡出消失
            overlayAnim.onfinish = () => {
                setTimeout(() => {
                    const fadeOut = overlay.animate(
                        [{ opacity: 1 }, { opacity: 0 }],
                        { duration: 700, fill: 'forwards' },
                    );
                    fadeOut.onfinish = cleanup;
                }, 500);
            };
        }, 1000);
    });
}
