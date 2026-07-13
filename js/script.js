// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化轮播图
    initCarousel();
    
    // 初始化项目筛选和排序
    initProjectFilter();
    
    // 初始化项目详情页图片轮播
    initProjectGallery();
    
    // 初始化表单验证
    initFormValidation();
    
    // 初始化页面滚动动画
    initScrollAnimation();
});

// 轮播图功能
function initCarousel() {
    const carousel = document.querySelector('.carousel');
    if (!carousel) return;
    
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    let currentSlide = 0;
    let slideInterval = null;
    
    // 显示指定幻灯片
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
        currentSlide = index;
    }
    
    // 下一张幻灯片
    function nextSlide() {
        const nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    }
    
    // 指示器点击事件
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
            resetInterval();
        });
    });
    
    // 重置自动播放间隔
    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 3000);
    }
    
    // 启动自动播放
    slideInterval = setInterval(nextSlide, 3000);
}

// 项目筛选和排序功能
function initProjectFilter() {
    const projectsGrid = document.getElementById('projects-grid');
    if (!projectsGrid) return;
    
    const filterBtns = document.querySelectorAll('.filter-btn');
    const sortSelect = document.getElementById('sort-select');
    const projectCards = Array.from(document.querySelectorAll('.project-card'));
    
    // 筛选功能
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 更新按钮状态
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const category = btn.dataset.category;
            
            // 显示/隐藏项目卡片
            projectCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // 排序功能
    sortSelect.addEventListener('change', () => {
        const sortValue = sortSelect.value;
        const visibleCards = projectCards.filter(card => card.style.display !== 'none');
        
        // 根据排序值排序卡片
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
        
        // 重新排列卡片
        visibleCards.forEach(card => projectsGrid.appendChild(card));
    });
}

// 项目详情页图片轮播
function initProjectGallery() {
    const gallery = document.querySelector('.project-gallery');
    if (!gallery) return;
    
    const slides = document.querySelectorAll('.gallery-slide');
    const indicators = document.querySelectorAll('.gallery-indicators .indicator');
    let currentSlide = 0;
    
    // 显示指定幻灯片
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
        currentSlide = index;
    }
    
    // 指示器点击事件
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // 自动播放
    setInterval(() => {
        const nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    }, 3000);
}

// 表单验证功能
function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const subjectError = document.getElementById('subject-error');
    const messageError = document.getElementById('message-error');
    
    // 验证姓名
    function validateName() {
        if (nameInput.value.trim() === '') {
            nameError.textContent = '姓名不能为空';
            return false;
        } else {
            nameError.textContent = '';
            return true;
        }
    }
    
    // 验证邮箱
    function validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            emailError.textContent = '请输入有效的邮箱地址';
            return false;
        } else {
            emailError.textContent = '';
            return true;
        }
    }
    
    // 验证主题
    function validateSubject() {
        if (subjectInput.value.trim() === '') {
            subjectError.textContent = '主题不能为空';
            return false;
        } else {
            subjectError.textContent = '';
            return true;
        }
    }
    
    // 验证消息内容
    function validateMessage() {
        if (messageInput.value.trim() === '') {
            messageError.textContent = '消息内容不能为空';
            return false;
        } else {
            messageError.textContent = '';
            return true;
        }
    }
    
    // 实时验证
    nameInput.addEventListener('blur', validateName);
    emailInput.addEventListener('blur', validateEmail);
    subjectInput.addEventListener('blur', validateSubject);
    messageInput.addEventListener('blur', validateMessage);
    
    // 表单提交验证
    contactForm.addEventListener('submit', function(e) {
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isSubjectValid = validateSubject();
        const isMessageValid = validateMessage();
        
        if (!isNameValid || !isEmailValid || !isSubjectValid || !isMessageValid) {
            e.preventDefault();
        } else {
            // 表单验证通过，可以添加提交逻辑
            alert('消息发送成功！');
            contactForm.reset();
            e.preventDefault(); // 阻止默认提交行为，仅用于演示
        }
    });
}

// 页面滚动动画
function initScrollAnimation() {
    const elements = document.querySelectorAll('.skills-section, .timeline, .project-card');
    
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
    
    // 初始设置
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // 监听滚动事件
    window.addEventListener('scroll', checkVisibility);
    
    // 初始检查
    checkVisibility();
}

// 项目详情页根据URL参数加载不同项目信息
function loadProjectDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');
    
    if (!projectId) return;
    
    // 项目数据（实际应用中可以从服务器获取）
    const projects = [
        {
            id: '1',
            title: '个人博客系统',
            description: '这是一个使用React和Node.js开发的个人博客系统，支持用户注册登录、文章发布、评论、分类等功能。系统采用前后端分离架构，前端使用React框架构建，后端使用Node.js和Express提供API接口，数据库使用MongoDB。',
            techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Redux', 'Bootstrap'],
            demoLink: '#',
            githubLink: '#'
        },
        {
            id: '2',
            title: '电商网站',
            description: '基于Vue.js开发的响应式电商网站，包含商品展示、购物车、订单管理等功能。使用Vuex进行状态管理，Vue Router进行路由管理，Axios与后端API进行交互。',
            techStack: ['Vue.js', 'Vuex', 'Vue Router', 'Axios', 'Element UI', 'SCSS'],
            demoLink: '#',
            githubLink: '#'
        },
        {
            id: '3',
            title: 'API接口服务',
            description: '使用Node.js和Express开发的RESTful API接口服务，提供用户管理、数据查询、文件上传等功能。采用JWT进行身份验证，Mongoose操作MongoDB数据库。',
            techStack: ['Node.js', 'Express', 'MongoDB', 'JWT', 'Mongoose', 'multer'],
            demoLink: '#',
            githubLink: '#'
        },
        {
            id: '4',
            title: '任务管理系统',
            description: '前后端分离的任务管理系统，使用React和Spring Boot开发。支持任务的创建、编辑、删除、分配等功能，具有权限管理和数据统计功能。',
            techStack: ['React', 'Spring Boot', 'MySQL', 'Ant Design', 'MyBatis', 'Redis'],
            demoLink: '#',
            githubLink: '#'
        },
        {
            id: '5',
            title: '响应式网站',
            description: '使用HTML、CSS和JavaScript开发的响应式网站，适配各种设备。采用Flexbox和Grid布局，使用CSS动画和过渡效果增强用户体验。',
            techStack: ['HTML5', 'CSS3', 'JavaScript', 'Flexbox', 'Grid', 'Responsive Design'],
            demoLink: '#',
            githubLink: '#'
        },
        {
            id: '6',
            title: '在线聊天系统',
            description: '基于WebSocket的实时在线聊天系统，支持多用户聊天、私聊、文件传输等功能。前端使用React开发，后端使用Node.js和Socket.io实现实时通信。',
            techStack: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Material-UI', 'Redux'],
            demoLink: '#',
            githubLink: '#'
        }
    ];
    
    // 根据ID查找项目
    const project = projects.find(p => p.id === projectId);
    
    if (project) {
        // 更新页面内容
        document.getElementById('project-title').textContent = project.title;
        document.getElementById('project-description').textContent = project.description;
        
        // 更新技术栈
        const techStackContainer = document.getElementById('project-tech-stack');
        techStackContainer.innerHTML = '';
        project.techStack.forEach(tech => {
            const span = document.createElement('span');
            span.textContent = tech;
            techStackContainer.appendChild(span);
        });
        
        // 更新链接
        document.getElementById('project-demo').href = project.demoLink;
        document.getElementById('project-github').href = project.githubLink;
    }
}

// 当页面是项目详情页时，加载项目信息
if (window.location.pathname.includes('project-detail.html')) {
    document.addEventListener('DOMContentLoaded', loadProjectDetails);
}
