/**
 * 项目详情页数据加载模块
 * 负责根据URL参数加载对应项目的详细信息
 */

export function loadProjectDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');
    
    if (!projectId) return;
    
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
    
    const project = projects.find(p => p.id === projectId);
    
    if (project) {
        document.getElementById('project-title').textContent = project.title;
        document.getElementById('project-description').textContent = project.description;
        
        const techStackContainer = document.getElementById('project-tech-stack');
        techStackContainer.innerHTML = '';
        project.techStack.forEach(tech => {
            const span = document.createElement('span');
            span.textContent = tech;
            techStackContainer.appendChild(span);
        });
        
        document.getElementById('project-demo').href = project.demoLink;
        document.getElementById('project-github').href = project.githubLink;
    }
}

if (window.location.pathname.includes('project-detail.html')) {
    document.addEventListener('DOMContentLoaded', loadProjectDetails);
}