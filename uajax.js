(function() {
    uajax.ajax = function(url, method, formData, success, error) {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onreadystatechange = function() {
            if (xhr.readyState > 3 && xhr.status === 200) {
                success(xhr.responseText, xhr);
            } else if (xhr.readyState > 3 && xhr.status !== 200) {
                error(xhr, xhr.exception);
            }
        };
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.send(formData);
        return xhr;
    }

    function buttonPrepare(button, spinnerHtml) {
        if (button == null) {
            return;
        }
        if (!spinnerHtml) {
            return;
        }
        const domRect = button.getBoundingClientRect();
        button.style.width = domRect.width + 'px';
        button.style.height = domRect.height + 'px';

        button.disabled = true;
        button.innerHTML = spinnerHtml;
    }

    function buttonReset(button, buttonInnerHtml) {
        if (button == null) {
            return;
        }
        button.disabled = false;
        button.innerHTML = buttonInnerHtml;
    }

    document.querySelectorAll('.js-uajax-form').forEach(function (form) {
        form.addEventListener('submit', function (e) {
            // on form submission, prevent default
            e.preventDefault();
            // construct a FormData object, which fires the formdata event
            new FormData(form);
        });
        form.addEventListener('formdata', (e) => {
            if (form.getAttribute('data-confirm') && !confirm(form.getAttribute('data-confirm'))) {
                return;
            }
            const spinnerHtml = form.getAttribute('data-spinner') || uajax.spinnerHtml;
            const buttonQuery = form.querySelector('[type="submit"],button:not([type="button"])');
            const displayNotification = form.getAttribute('data-show-notification') === 'true' || (form.getAttribute('data-show-notification') !== 'false' && uajax.notificationMessageDisplay);
            let buttonInnerHtml = '';

            if (buttonQuery != null) {
                if (buttonQuery.disabled) {
                    alert('Already working');
                    return;
                }
                buttonInnerHtml = buttonQuery.innerHTML;
            }

            buttonPrepare(buttonQuery, spinnerHtml);

            uajax.ajax(form.action, form.method, e.formData,
                function(data, jqxhr) {
                    buttonReset(buttonQuery, buttonInnerHtml);
                    if (form.getAttribute('data-reload')) {
                        document.location.reload();
                        return;
                    }
                    if (form.getAttribute('data-redirect-replace')) {
                        window.location.replace(form.getAttribute('data-redirect-replace'));
                        return;
                    }
                    if (form.getAttribute('data-redirect')) {
                        window.location.assign(form.getAttribute('data-redirect'));
                        return;
                    }

                    if (form.getAttribute('data-toggle-hidden')) {
                        document.querySelectorAll(form.getAttribute('data-toggle-hidden')).forEach(function (el) {
                            el.hidden = !el.hidden;
                        });
                    }

                    const contentType = jqxhr.getResponseHeader('content-type');
                    let notificationMessage = uajax.notificationMessageDefault;

                    if (contentType && contentType.indexOf('application/json') !== -1) {
                        const obj = JSON.parse(data);
                        if (obj.redirect) {
                            window.location.assign(obj.redirect);
                        }
                        if (obj[uajax.notificationMessageObject]) {
                            notificationMessage = obj[uajax.notificationMessageObject];
                        }
                    } else {
                        if (form.getAttribute('data-target')) {
                            document.querySelector(form.getAttribute('data-target')).innerHTML = data;
                        }
                    }

                    const notificationMessageFromHeader = jqxhr.getResponseHeader(uajax.notificationMessageHeader);
                    if (notificationMessageFromHeader) {
                        notificationMessage = notificationMessageFromHeader;
                    }


                    if (form.getAttribute('data-remove-target')) {
                        document.querySelector(form.getAttribute('data-remove-target')).remove();
                    }
                    if (form.getAttribute('data-autohide')) {
                        form.hidden = true;
                    }
                    uajax.success(jqxhr, form, notificationMessage, displayNotification);
                    uajax.complete(jqxhr, form, notificationMessage, displayNotification, null);

                    if (form.getAttribute('data-callback-success')) {
                        window[form.getAttribute('data-callback-success')](jqxhr, form, notificationMessage);
                    }
                    if (form.getAttribute('data-callback')) {
                        window[form.getAttribute('data-callback')](jqxhr, form, notificationMessage);
                    }

                },
                function(jqxhr, exception) {
                    buttonReset(buttonQuery, buttonInnerHtml);
                    uajax.error(jqxhr, form, exception);
                    uajax.complete(jqxhr, form, null, null, exception);
                    if (uajax.htmlOnError && form.getAttribute('data-target') && jqxhr.getResponseHeader('content-type') && jqxhr.getResponseHeader('content-type').indexOf('application/json') === -1) {
                        document.querySelector(form.getAttribute('data-target')).innerHTML = jqxhr.responseText;
                    }
                    if (form.getAttribute('data-callback-error')) {
                        window[form.getAttribute('data-callback-error')](jqxhr, form, null, exception);
                    }
                    if (form.getAttribute('data-callback')) {
                        window[form.getAttribute('data-callback')](jqxhr, form, null, exception);
                    }
                });
        });
    });
})();