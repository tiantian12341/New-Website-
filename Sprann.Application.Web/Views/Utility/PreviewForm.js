var keyValue = request('keyValue');
var bootstrap = function ($, sp) {
    "use strict";
    var formData;
    var page = {
        init: function () {
            if (!!keyValue) {
                formData = top[keyValue];
                $('body').spCustmerFormRender(formData);
            }
        }
    };
    page.init();
}