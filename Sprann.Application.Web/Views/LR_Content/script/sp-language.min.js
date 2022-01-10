(function ($, sp) {
    "use strict";

    sp.language = {
        getMainCode: function () {
            return '';
        },
        get: function (text, callback) {
            callback(text);
        },
        getSyn: function (text) {
            return text;
        }
    };
})(window.jQuery, top.sp);
