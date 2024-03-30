var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);

// Đối tượng `Validator`
function Validator(options) {

    function getParent(element, selector) {
        while(element.parentElement) {
            if(element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }   
    }

    var selectorRules = {};

    // Hàm thực hiện validate
    function validate(inputElement, rule) {
        // var errElement = getParent(inputElement, '.form-group')
        var errElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errSelector);
        var errMessage;

        // Lấy ra các rules của selector
        var rules = selectorRules[rule.selector];

        // lặp qua từng rule & kiểm tra
        // Nếu có lỗi thì dừng việc kiểm tra
        for(var i = 0; i < rules.length; ++i) {
            switch(inputElement.type) {
                case 'radio':
                case 'checkbox':
                    errMessage = rules[i](
                        formElement.querySelector(rule.selector + ':checked')
                    );
                    break;
                default:
                    errMessage = rules[i](inputElement.value);
            }
            if(errMessage) break;
        }

        if(errMessage) {
            errElement.innerHTML = errMessage;
            getParent(inputElement, options.formGroupSelector).classList.add('invalid') 
        } else {
            errElement.innerHTML = '';
            getParent(inputElement, options.formGroupSelector).classList.remove('invalid') 
        }

        return !errMessage;
    }

    // Lấy element của form cần validate
    var formElement = $(options.form);
    if(formElement) {
        // Khi submit form 
        formElement.onsubmit = function(e) {
            e.preventDefault();

            var isFormValid = true;

            // Lặp qua từng rules và validate
            options.rules.forEach(rule => {
                var inputElement = formElement.querySelector(rule.selector);
                var isValid = validate(inputElement, rule);
                if(!isValid) {
                    isFormValid = false;
                }
            });

            if(isFormValid) {
                // Trường hợp submit với javascript
                if(typeof options.onSubmit === 'function') {

                    var enableInput = formElement.querySelectorAll('[name]');

                    var formValues = Array.from(enableInput).reduce((values, input) => {
                        
                        switch(input.type) {
                            case 'radio':
                                values[input.name] = formElement.querySelector('input[name="' + input.name + '"]:checked').value;
                                break;
                            case 'checkbox':
                                if(!input.matches(':checked')) {
                                    values[input.name] = '';
                                    return values;
                                }

                                if(!Array.isArray(values[input.name])) {
                                    values[input.name] = [];
                                }
                                values[input.name].push(input.value);
                                break;

                            case 'file':
                                values[input.name] = input.files;
                                break;
                            default:
                                values[input.name] = input.value;
                        }

                        return values;
                    }, {});

                    options.onSubmit(formValues);
                } 
                // Trường hợp submit với hành vi mặc định
                else {
                    formElement.submit();
                }
            }
        }

        // lặp qua mỗi rule và xử lí
        options.rules.forEach(rule => {

            // Lưu lại các rules cho mỗi input
            if(Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            } else {
                selectorRules[rule.selector] = [rule.test];
            }
            
            var inputElements = formElement.querySelectorAll(rule.selector);

            Array.from(inputElements).forEach(inputElement => {
                // Xử lí trường hợp blur khỏi input
                inputElement.onblur = function() {
                    validate(inputElement, rule);
                }
                // Xử lí mỗi khi người dùng nhập vào input 
                inputElement.oninput = function() {
                    var errElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errSelector);
                    errElement.innerHTML = '';
                    getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
                }
            });
        });
    }
}

// Định nghĩ rules
// Nguyên tắc của các rules:
// 1. Khi có lỗi => trả ra message lỗi 
// 2. Khi hợp lệ => trả ra undefined
Validator.isRequired = function(selector, message) {
    return {
        selector: selector,
        test: function(value) {
            return value ? undefined : message || 'Please enter this field';
        }
    }
}

Validator.isEmail = function(selector, message) {
    return {
        selector: selector,
        test: function(value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

            return regex.test(value) ? undefined : message || 'Please enter correct email';
        }
    }
}

Validator.minLength = function(selector, min, message) {
    return {
        selector: selector,
        test: function(value) {
            return value.length >= min ? undefined : message || `Please enter at least ${min} characters`;
        }
    }
}

Validator.isConfirmed = function(selector, getConfirmValue, message) {
    return {
        selector: selector,
        test: function(value) {
            return value === getConfirmValue() ? undefined : message || 'The value entered is incorrect';
        }
    }
}