/**
 * 公共数据模块
 * 存放导航、页脚等全站共享的数据
 */

export const siteConfig = {
    name: '我的简历',
    logo: 'images/ui/3y7.webp',
    copyright: '© 2077 Yanami. 保留所有权利.',
};

export const navItems = [
    { label: '首页', href: 'index.html', id: 'index' },
    { label: '个人简介', href: 'about.html', id: 'about' },
    { label: '项目展示', href: 'projects.html', id: 'projects' },
    { label: '联系方式', href: 'contact.html', id: 'contact' },
];

export const footerData = {
    brand: {
        name: 'Yanami',
        title: 'Java后端开发工程师',
    },
    contact: {
        email: '1433223@qq.com',
        phone: '11451419198',
    },
    links: [
        { label: '首页', href: 'index.html' },
        { label: '个人简介', href: 'about.html' },
        { label: '项目展示', href: 'projects.html' },
        { label: '联系方式', href: 'contact.html' },
    ],
};
