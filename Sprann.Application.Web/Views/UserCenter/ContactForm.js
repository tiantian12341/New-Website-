var baseinfo;
var bootstrap = function ($, sp) {
    "use strict";

    var getBaseinfo = function (callback) {
        baseinfo = sp.frameTab.currentIframe().baseinfo;
        if (!baseinfo) {
            setTimeout(function () { getBaseinfo(callback) }, 100);
        }
        else {
            callback();
        }
    };

    var page = {
        init: function () {
            getBaseinfo(function () {
                page.bind();
                page.initData();
            });
        },
        bind: function () {
            $('#sp_save_btn').on('click', function () {
                var postData = $('#form').spGetFormData();
                postData.F_CompanyId = baseinfo.companyId;
                postData.F_Account = baseinfo.account;
                $.spSaveForm(top.$.rootUrl + '/LR_OrganizationModule/User/SaveForm?keyValue=' + baseinfo.userId, postData, function (res) { });
            });
        },
        initData: function () {
            $('#F_Mobile').val(baseinfo.mobile);
            $('#F_Telephone').val(baseinfo.telephone);
            $('#F_Email').val(baseinfo.email);
            $('#F_WeChat').val(baseinfo.weChat);
            $('#F_OICQ').val(baseinfo.oICQ);

        }
    };
    page.init();
}