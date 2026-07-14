/**
 * 联系方式页渲染模块
 * 负责渲染联系信息和表单
 */

import { contactInfo, formFields } from '../data/contact.js';

/**
 * 渲染联系信息列表
 */
export function renderContactInfo() {
    const section = document.querySelector('.contact-info');
    if (!section) return;

    // 保留标题
    const title = section.querySelector('h3');
    section.innerHTML = '';
    if (title) section.appendChild(title);

    contactInfo.forEach(info => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'info-item';

        if (info.icon) {
            const icon = document.createElement('img');
            icon.src = info.icon;
            icon.alt = info.label.replace('：', '');
            icon.className = 'info-icon';
            itemDiv.appendChild(icon);
        }

        const labelSpan = document.createElement('span');
        labelSpan.className = 'info-label';
        labelSpan.textContent = info.label;

        const valueSpan = document.createElement('span');
        valueSpan.className = 'info-value';

        if (info.isLink) {
            const a = document.createElement('a');
            a.href = info.href || '#';
            a.textContent = info.value;
            valueSpan.appendChild(a);
        } else {
            valueSpan.textContent = info.value;
        }

        itemDiv.appendChild(labelSpan);
        itemDiv.appendChild(valueSpan);
        section.appendChild(itemDiv);
    });
}

/**
 * 渲染联系表单
 */
export function renderContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.innerHTML = '';

    formFields.forEach(field => {
        const group = document.createElement('div');
        group.className = 'form-group';

        const label = document.createElement('label');
        label.htmlFor = field.id;
        label.textContent = field.label;

        let input;
        if (field.type === 'textarea') {
            input = document.createElement('textarea');
            if (field.rows) input.rows = field.rows;
        } else {
            input = document.createElement('input');
            input.type = field.type;
        }
        input.id = field.id;
        input.name = field.id;
        if (field.required) input.required = true;

        const errorSpan = document.createElement('span');
        errorSpan.className = 'error-message';
        errorSpan.id = field.errorId;

        group.appendChild(label);
        group.appendChild(input);
        group.appendChild(errorSpan);
        form.appendChild(group);
    });

    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.className = 'submit-btn';
    submitBtn.textContent = '咕咕bird传书';
    form.appendChild(submitBtn);
}
