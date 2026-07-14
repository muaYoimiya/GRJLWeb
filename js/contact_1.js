/**
 * 联系方式页表单验证模块
 * 负责联系表单的实时验证和提交验证功能
 */

import { getElementById, addEventListeners, validateEmail } from './utils.js';

export function initFormValidation() {
    const contactForm = getElementById('contactForm');
    if (!contactForm) return;
    
    const nameInput = getElementById('name');
    const emailInput = getElementById('email');
    const subjectInput = getElementById('subject');
    const messageInput = getElementById('message');
    
    const nameError = getElementById('name-error');
    const emailError = getElementById('email-error');
    const subjectError = getElementById('subject-error');
    const messageError = getElementById('message-error');
    
    function validateName() {
        if (nameInput.value.trim() === '') {
            nameError.textContent = '姓名不能为空';
            return false;
        } else {
            nameError.textContent = '';
            return true;
        }
    }
    
    function validateEmailField() {
        if (!validateEmail(emailInput.value)) {
            emailError.textContent = '请输入有效的邮箱地址';
            return false;
        } else {
            emailError.textContent = '';
            return true;
        }
    }
    
    function validateSubject() {
        if (subjectInput.value.trim() === '') {
            subjectError.textContent = '主题不能为空';
            return false;
        } else {
            subjectError.textContent = '';
            return true;
        }
    }
    
    function validateMessage() {
        if (messageInput.value.trim() === '') {
            messageError.textContent = '消息内容不能为空';
            return false;
        } else {
            messageError.textContent = '';
            return true;
        }
    }
    
    const inputs = [nameInput, emailInput, subjectInput, messageInput];
    const validators = [validateName, validateEmailField, validateSubject, validateMessage];
    
    inputs.forEach((input, index) => {
        input.addEventListener('blur', validators[index]);
    });
    
    contactForm.addEventListener('submit', function(e) {
        const isNameValid = validateName();
        const isEmailValid = validateEmailField();
        const isSubjectValid = validateSubject();
        const isMessageValid = validateMessage();
        
        if (!isNameValid || !isEmailValid || !isSubjectValid || !isMessageValid) {
            e.preventDefault();
        } else {
            alert('消息发送成功！');
            contactForm.reset();
            e.preventDefault();
        }
    });
}