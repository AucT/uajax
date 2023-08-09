var uajax = {
    spinnerHtml: '<div class="spinner-border spinner-border-sm text-light"></div>',
    notificationMessageDisplay: true,
    notificationMessageDefault: 'Request completed successfully',
    notificationMessageObject: 'message',
    notificationMessageHeader: 'uajax-note',
    htmlOnError: true,
    jsonParseErrorSuffix: '<br>Error parsing JSON: Please contact webmaster',


    success: function (xhr, form, notificationMessage, displayNotification) {
        // Uncomment next line if you don't want message yourself when using html target
        // if (form.hasAttribute('data-target')) return;

        if (displayNotification) {
            demoNotification.success(form, notificationMessage)
        }
    },
    error: function (xhr, form, exception) {
        demoNotification.error(xhr, exception, form)
    },
    complete: function (xhr, form, notificationMessage, displayNotification, exception) {
        console.log('completed');
    },
};