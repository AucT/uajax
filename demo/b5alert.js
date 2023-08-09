const b5alert = {
    htmlToElement: function (html) {
        const template = document.createElement("template");
        html = html.trim();
        template.innerHTML = html;
        return template.content.firstChild;
    },
    show: function (form, color, message, title) {
        title = title ? title : "";
        const html = `<div class="mt-1 alert alert-${color} js-b5alert" role="alert"><b>${title}</b> ${message}</div>`;
        const alertElement = b5alert.htmlToElement(html);
        const prevAlert = form.querySelector('.js-b5alert');
        if (prevAlert) prevAlert.remove();
        form.appendChild(alertElement);
    },
    error: function (form, message, title) {
        b5alert.show(form, "danger", message, title);
    },
    success: function (form, message, title) {
        b5alert.show(form,"success", message, title);
    }
};