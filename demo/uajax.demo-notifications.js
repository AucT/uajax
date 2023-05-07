var demoNotification = {};
demoNotification.success = function (form, message, title) {
    b5toast.success(message, title);
};

demoNotification.error = function (xhr, exception, form) {

    //check if json and try to get error message
    const contentType = xhr.getResponseHeader('content-type');
    if (contentType && contentType.indexOf('application/json') !== -1) {
        const obj = JSON.parse(xhr.responseText);
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
    b5alert.error(form, demoNotification.getErrorMessage(xhr, exception));
};

demoNotification.getErrorMessage = function (xhr, exception) {
    const contentType = xhr.getResponseHeader('content-type');
    if (contentType && contentType.indexOf('application/json') !== -1) {
        const obj = JSON.parse(xhr.responseText);
        if (obj.error) {
            return 'Помилка<br>'+obj.error;
        }
        if (obj.errors) {
            let message ='<ul>';
            const keys = Object.keys(obj.errors);
            for (let i = 0; i < keys.length; i++) {
                message += '<li>'+obj.errors[keys[i]]+'</li>';
            }
            message += '</ul>'
            return 'Помилковий запит<br>' + message;
        }
    }

    if (xhr.status === 0) {
        return 'Server error<br>Not connected. Verify Network.';
    } else if (xhr.status === 400) {
        return 'Bad Request';
    } else if (xhr.status === 401) {
        window.location.assign('/login');
        return '401 Unauthorized';
    } else if (xhr.status === 403) {
        return '403 Forbidden';
    } else if (xhr.status === 404) {
        return '404 Not Found<br>The server cannot find the requested resource';
    } else if (jqxhr.status === 405) {
        return ' 405 Method Not Allowed ';
    } else if (xhr.status === 422) {
        return 'Bad Request';
    } else if (exception === 'parsererror') {
        return 'Requested JSON parse failed';
    } else if (exception === 'timeout') {
        return 'Time out error';
    } else if (exception === 'abort') {
        return 'Ajax request aborted';
    } else {
        return 'Unknown error!';
    }
}