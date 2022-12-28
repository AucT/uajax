var uajax = {
    spinnerHtml: '...',
    notificationMessageDisplay: true,
    notificationMessageDefault: 'Request completed successfully',
    notificationMessageObject: 'message', //on success if json response have message field it will use it instead of notificationMessageDefault
    notificationMessageHeader: 'uajax-note',
    htmlOnError: false, //if true and response is html, will replace data-target with html even on error


    success: function (jqxhr, form, notificationMessage, displayNotification) {
        // Uncomment next line if you don't want message yourself when using html target
        // if (form.hasAttribute('data-target')) return;
        if (displayNotification) {
            alert('success!' + '\n' + notificationMessage);
        }
    },
    error: function (jqxhr, form, exception) {
        alert('error!' + '\n' + 'status: '+jqxhr.status + '\n' + 'exception: ' + exception);
    },
    complete: function (jqxhr, form, notificationMessage, displayNotification, exception) {
        console.log('completed');
    },
};