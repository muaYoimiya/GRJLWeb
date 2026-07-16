/**
 * 个人简介页数据模块
 * 存放基本信息、技能、经历等数据
 */

export const basicInfo = {
    name: 'Yanami',
    gender: '水獭',
    age: '20岁',
    education: '本科在读',
    major: '软件工程',
    experience: '3年',
};

export const jobIntention = {
    position: 'Java后端开发工程师',
    salary: '18K-20K',
    location: '深圳',
    workHours: '双休',
    benefits: '有年终奖&加班双倍工资',
};

export const skillCategories = [
    {
        name: '编程语言',
        skills: [
            { name: 'Java', level: 95 },
            { name: 'SQL', level: 50 },
            { name: 'Python', level: 75 },
        ],
    },
    {
        name: '开发工具',
        skills: [
            { name: 'IDEA', level: 80 },
            { name: 'VScode', level: 60 },
            { name: 'Git', level: 99 },
        ],
    },
    {
        name: '软技能',
        skills: [
            { name: '团队协作', level: 90 },
            { name: '沟通能力', level: 95 },
            { name: '学习能力', level: 95 },
            { name: '加班能力', level: 20 },
        ],
    },
];

export const timelineItems = [
    {
        date: '2028.03 - 至今',
        title: 'Java后端开发工程师',
        company: '上海米哈游网络科技有限公司',
        duties: [
            '负责公司官网和产品后端的开发与维护',
            '使用框架开发单页应用',
            '优化算法，提升用户体验',
            '与前端团队协作，完成前后端数据交互',
        ],
    },
    {
        date: '2027.07 - 2028.02',
        title: '后端开发实习生',
        company: '上海鹰角网络科技有限公司',
        duties: [
            '参与公司内部系统的后端开发',
            '学习技术架构，编码标准',
            '协助主程序员师完成数据接口实现',
        ],
    },
    {
        date: '2024.09 - 2027.06',
        title: '人工智能企业计算',
        company: '广州理工学院',
        duties: [
            '主修课程：移动应用开发，网络编程，区块链',
            '拥有计算机四级，计算机技术与软件专业技术资格二级证书',
            '参与蓝桥杯竞赛并获三等奖',
            '负责学生管理系统项目主要框架开发,图书管理系统项目管理',
        ],
    },
];
