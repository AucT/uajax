var uajax = {
    spinnerHtml: '<div class="spinner-border spinner-border-sm text-light"></div>',
    notificationMessageDisplay: true,
    notificationMessageDefault: 'Request completed successfully',
    notificationMessageObject: 'message',
    notificationMessageHeader: 'uajax-note',
    htmlOnError: false,


    success: function (jqxhr, form, notificationMessage, displayNotification) {
        // Uncomment next line if you don't want message yourself when using html target
        // if (form.hasAttribute('data-target')) return;

        if (displayNotification) {
            demoNotification.success(form, notificationMessage)
        }
    },
    error: function (jqxhr, form, exception) {
        demoNotification.error(jqxhr, exception, form)
    },
    complete: function (jqxhr, form, notificationMessage, displayNotification, exception) {
        console.log('completed');
    },
};