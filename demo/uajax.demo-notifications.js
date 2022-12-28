var demoNotification = {};
demoNotification.success = function (form, message, title) {
    b5toast.success(message, title);
};

demoNotification.error = function (jqxhr, exception, form) {

    //check if json and try to get error message
    const contentType = jqxhr.getResponseHeader('content-type');
    if (contentType && contentType.indexOf('application/json') !== -1) {
        const obj = JSON.parse(jqxhr.responseText);
        //checking json {error:'my custom error xD'}
        if (obj.error) {
            b5alert.error(form, obj.error, 'Error');
            return;
        }
        //this is for default laravel error ajax response. It has errors array with error strings
        if (obj.errors) {
            let message ='<ul>';
            const keys = Object.keys(obj.errors);
            for (let i = 0; i < keys.length; i++) {
                message += '<li>'+obj.errors[keys[i]]+'</li>';
            }
            message += '</ul>'
            b5alert.error(form, message, 'Error');
            return;
        }
    }

    if (jqxhr.status === 0) {
        b5alert.error(form, 'Not connect.\n Verify Network.', 'Server error');
    } else if (jqxhr.status === 404) {
        b5alert.error(form, 'The server cannot find the requested resource', '404 Not Found');
    } else if (jqxhr.status === 401) {
        //window.location.assign('/login');
        b5alert.error(form, '401 Unauthorized');
    } else if (jqxhr.status === 403) {
        b5alert.error(form, '403 Forbidden');
    } else if (jqxhr.status === 400) {
        b5alert.error(form, 'Bad Request');
    }  else if (jqxhr.status === 422) {
        b5alert.error(form, 'Bad Request');
    }  else if (jqxhr.status === 500) {
        b5alert.error(form, '500 Server error');
    } else if (exception === 'parsererror') {
        b5alert.error(form, 'Requested JSON parse failed');
    } else if (exception === 'timeout') {
        b5alert.error(form, 'Time out error');
    } else if (exception === 'abort') {
        b5alert.error(form, 'Ajax request aborted');
    } else {
        b5alert.error(form, 'Unknown error!');
    }
};