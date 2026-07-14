/**
 * 个人简介页渲染模块
 * 负责渲染基本信息、技能和时间轴
 */

import { basicInfo, jobIntention, skillCategories, timelineItems } from '../data/about.js';

/**
 * 渲染基本信息和求职意向
 */
export function renderPersonalInfo() {
    const section = document.querySelector('.personal-info');
    if (!section) return;

    section.innerHTML = '';

    const basicDiv = document.createElement('div');
    basicDiv.className = 'info-item';
    const basicTitle = document.createElement('h3');
    basicTitle.textContent = '基本信息';
    basicDiv.appendChild(basicTitle);
    const basicData = [
        { label: '姓名：', value: basicInfo.name },
        { label: '性别：', value: basicInfo.gender },
        { label: '年龄：', value: basicInfo.age },
        { label: '学历：', value: basicInfo.education },
        { label: '专业：', value: basicInfo.major },
    ];
    basicData.forEach(item => {
        const p = document.createElement('p');
        const strong = document.createElement('strong');
        strong.textContent = item.label;
        p.appendChild(strong);
        p.appendChild(document.createTextNode(item.value));
        basicDiv.appendChild(p);
    });

    const jobDiv = document.createElement('div');
    jobDiv.className = 'info-item';
    const jobTitle = document.createElement('h3');
    jobTitle.textContent = '求职意向';
    jobDiv.appendChild(jobTitle);
    const jobData = [
        { label: '职位：', value: jobIntention.position },
        { label: '期望薪资：', value: jobIntention.salary },
        { label: '工作地点：', value: jobIntention.location },
    ];
    jobData.forEach(item => {
        const p = document.createElement('p');
        const strong = document.createElement('strong');
        strong.textContent = item.label;
        p.appendChild(strong);
        p.appendChild(document.createTextNode(item.value));
        jobDiv.appendChild(p);
    });

    section.appendChild(basicDiv);
    section.appendChild(jobDiv);
}

/**
 * 渲染技能展示
 */
export function renderSkills() {
    const section = document.querySelector('.skills-section');
    if (!section) return;

    section.innerHTML = '';

    const title = document.createElement('h3');
    title.textContent = '技能展示';
    section.appendChild(title);

    const categoriesDiv = document.createElement('div');
    categoriesDiv.className = 'skills-categories';

    skillCategories.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'skill-category';
        const categoryTitle = document.createElement('h4');
        categoryTitle.textContent = category.name;
        categoryDiv.appendChild(categoryTitle);

        category.skills.forEach(skill => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'skill-item';
            const nameSpan = document.createElement('span');
            nameSpan.textContent = skill.name;
            const barDiv = document.createElement('div');
            barDiv.className = 'skill-bar';
            const progressDiv = document.createElement('div');
            progressDiv.className = 'skill-progress';
            progressDiv.style.width = skill.level + '%';
            barDiv.appendChild(progressDiv);
            itemDiv.appendChild(nameSpan);
            itemDiv.appendChild(barDiv);
            categoryDiv.appendChild(itemDiv);
        });

        categoriesDiv.appendChild(categoryDiv);
    });

    section.appendChild(categoriesDiv);
}

/**
 * 渲染时间轴
 */
export function renderTimeline() {
    const section = document.querySelector('.timeline');
    if (!section) return;

    section.innerHTML = '';

    const title = document.createElement('h3');
    title.textContent = '工作与教育经历';
    section.appendChild(title);

    const itemsDiv = document.createElement('div');
    itemsDiv.className = 'timeline-items';

    timelineItems.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'timeline-item';

        const dateDiv = document.createElement('div');
        dateDiv.className = 'timeline-date';
        dateDiv.textContent = item.date;

        const contentDiv = document.createElement('div');
        contentDiv.className = 'timeline-content';
        const contentTitle = document.createElement('h4');
        contentTitle.textContent = item.title;
        const companyP = document.createElement('p');
        companyP.textContent = item.company;
        const ul = document.createElement('ul');
        item.duties.forEach(duty => {
            const li = document.createElement('li');
            li.textContent = duty;
            ul.appendChild(li);
        });

        contentDiv.appendChild(contentTitle);
        contentDiv.appendChild(companyP);
        contentDiv.appendChild(ul);

        itemDiv.appendChild(dateDiv);
        itemDiv.appendChild(contentDiv);
        itemsDiv.appendChild(itemDiv);
    });

    section.appendChild(itemsDiv);
}
