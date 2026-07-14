/**
 * 联系方式页表单验证模块
 * 负责联系表单的实时验证和提交验证功能
 */

export function initFormValidation() {
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
    
    function validateName() {
        if (nameInput.value.trim() === '') {
            nameError.textContent = '姓名不能为空';
            return false;
        } else {
            nameError.textContent = '';
            return true;
        }
    }
    
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
    
    nameInput.addEventListener('blur', validateName);
    emailInput.addEventListener('blur', validateEmail);
    subjectInput.addEventListener('blur', validateSubject);
    messageInput.addEventListener('blur', validateMessage);
    
    contactForm.addEventListener('submit', function(e) {
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
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

document.addEventListener('DOMContentLoaded', initFormValidation);