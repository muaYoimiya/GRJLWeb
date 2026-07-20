/**
 * 联系方式页数据模块
 * 存放联系信息、表单字段等数据
 */

export const contactInfo = [
    {
        icon: 'images/ui/telephone.webp',
        label: '电话：',
        value: '11451419198',
    },
    {
        icon: 'images/ui/email.webp',
        label: '邮箱：',
        value: '1433223@qq.com',
    },
    {
        icon: 'images/ui/wechat.webp',
        label: '微信：',
        value: 'yanamikawaii',
    },
    {
        icon: 'images/ui/github-mark.webp',
        label: 'GitHub：',
        value: 'https://github.com/muaYoimiya/GRJLWeb',
        isLink: true,
        href: 'https://github.com/muaYoimiya/GRJLWeb',
    },
    {
        icon: null,
        label: '地址：',
        value: '广州市黑云区太平天国广粥理公学院',
    },
];

export const formFields = [
    { id: 'name', label: '代号：', type: 'text', required: true, errorId: 'name-error' },
    { id: 'email', label: '邮箱：', type: 'email', required: true, errorId: 'email-error' },
    { id: 'subject', label: 'Top：', type: 'text', required: true, errorId: 'subject-error' },
    { id: 'message', label: 'Say my name!：', type: 'textarea', rows: 5, required: true, errorId: 'message-error' },
];
