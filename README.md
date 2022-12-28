# uajax - universal ajax forms
uajax is universal ajax function (javascript) to make your forms ajax. Uses formdata, so any form will work (both file upload and simple text posting)

This can be useful for people that use server-side generation and don't like to touch javascript, but needs their forms to be ajaxed.

## Requirements

Add uajax script anywhere you want. It has no dependencies. If you use custom notification place uajax after notification.
```html
<script defer src="/uajax.settings.js"></script>
<script defer src="/uajax.js"></script>
```

## Demo
[Demo](https://auct.github.io/uajax/demo)


## Usage

Add class `js-uajax-form` to form that you want to be ajaxed.  
Change uajax.settings for your notification/alert function. See demo for bootstrap 5 notification and alerts.

#### Global defaults from uajax.settings
```javascript
var uajax = {
    spinnerHtml: '...',
    notificationMessageDisplay: true,
    notificationMessageDefault: 'Request completed successfully',
    notificationMessageObject: 'message', //on success if json response have message field it will use it instead of notificationMessageDefault
    notificationMessageHeader: 'uajax-note',
    htmlOnError: false, //if response is error and you are using target to replace html


    success: function (jqxhr, form, notificationMessage, displayNotification) {
        // Uncomment next line if you don't want message yourself when using html target
        // if (form.hasAttribute('data-target')) return;

        //Change this for your success notification. See demo for bootstrap 5
        if (displayNotification) {
            alert('success!' + '\n' + notificationMessage);
        }
    },
    error: function (jqxhr, form, exception) {
        //Change this for your error notification. See demo for bootstrap 5 and custom messages
        alert('error!' + '\n' + 'status: '+jqxhr.status + '\n' + 'exception: ' + exception);
    },
    complete: function (jqxhr, form, notificationMessage, displayNotification, exception) {
        //if error you will have exception but notificationMessage and displayNotification will be null
        //if success you will have notificationMessage and displayNotification  but exception will be null
        console.log('completed');
    },
};
```


## Dynamic options for the form

You can place options in html of the form. For example `<form data-reload="1" class="js-uajax-form">`
```
data-show-notification="0" - don't show notification on success (override global setting)
data-show-notification="1" - show notification on success (overrides global setting)
data-spinner="loading..." - spinner html (overrides global setting)

data-confirm="Delete this world?" - ask confirm dialog. Procceeds only after OK is clicked (confirmed)

data-reload="1" - reload page after success
data-redirect-replace="/success" - after success open url
data-toggle-hidden=".target" - querySelector for elements which will toggle visibility after success
data-remove-target=".target" - querySelector for elements to remove after success
data-autohide="1" - autohide form after success

//special data-target works only for html responses
data-target=".target" - querySelector where to place html response after both success and error

//callback function example: function myFunc (jqxhr, form, message, exception)
data-callback="myFunc" - callback function after success or error
data-callback-success="myFunc" - callback function after success
data-callback-error="myFunc" - callback function after error
```


## Server responses
```
{"redirect":"/example"} //will redirect to /example
{"message":"successfully build reactjs alternative"} //will use this notification message instead of default. `message` field can be changed in settings

//headers
uajax-note: successfully build javascript alternative  //if your response has `uajax-note` header, it's value will be used as message. Header name can be changed in settings
```


## Successful message is:  
header `uajax-note` > json value from `message` > default message in settings

## Error message:
Error message you need to build by yourself. Check demo/uajax.settings.js and demo/uajax.demo-notifications.js for example 
