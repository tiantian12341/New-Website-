/*
 * 版 本 sp-ADMS V6.1.6.0 思普瑞云(http://www.sp.cn)
 * Copyright (c) 2013-2017 上海力软信息技术有限公司
 * 创建人：力软-前端开发组
 * 日 期：2018.06.05
 * 描 述：写邮件	
 */
var keyValue = request('keyValue');
var data = request('data');

var acceptClick;
var ue;
var bootstrap = function ($, sp) {
    "use strict";

    var page = {
        init: function () {
            page.bind();
            page.initData();
        },
        bind: function () {
            //内容编辑器
            ue = UE.getEditor('F_BodyText');
            $('#F_Attachment').spUploader({ isUpload: false });
        },
        initData: function () {
            if (!!keyValue) {
                $.spSetForm(top.$.rootUrl + '/LR_OAModule/Email/GetReceiveEntity?keyValue=' + keyValue, function (data) {//
                    $('#form').spSetFormData(data);
                });
            }
        }
    };
    // 保存数据
    acceptClick = function (callBack) {
        if (!$('#form').spValidform()) {
            return false;
        }
        var postData = $('#form').spGetFormData(keyValue);
        postData['F_BodyText'] = ue.getContentTxt(null, null, true);
        $.spSaveForm(top.$.rootUrl + '/LR_OAModule/Email/SendMail', postData, function (res) {
            // 保存成功后才回调
            if (!!callBack) {
                callBack();
            }
        });
    };
    page.init();
}