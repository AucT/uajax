var uajax = {
    spinnerHtml: '...',
    notificationMessageDisplay: true,
    notificationMessageDefault: 'Request completed successfully',
    notificationMessageObject: 'message', //on success if json response have message field it will use it instead of notificationMessageDefault
    notificationMessageHeader: 'uajax-note',
    htmlOnError: true, //if true and response is html, will insert into data-target html response even on error
    jsonParseErrorSuffix: '<br>Error parsing JSON: Please contact webmaster', //if json can't be parse this will be added to response in message


    success: function (xhr, form, notificationMessage, displayNotification) {
        // Uncomment next line if you don't want message yourself when using html target
        // if (form.hasAttribute('data-target')) return;
        if (displayNotification) {
            alert('success!' + '\n' + notificationMessage);
        }
    },
    error: function (xhr, form, exception) {
        alert('error!' + '\n' + 'status: '+xhr.status + '\n' + 'exception: ' + exception);
    },
    complete: function (xhr, form, notificationMessage, displayNotification, exception) {
        console.log('completed');
    },
};