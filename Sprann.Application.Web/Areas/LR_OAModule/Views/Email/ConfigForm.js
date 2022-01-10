/*
 * 版 本 sp-ADMS V6.1.6.0 思普瑞云(http://www.sp.cn)
 * Copyright (c) 2013-2017 上海力软信息技术有限公司
 * 创建人：力软-前端开发组
 * 日 期：2018.06.05
 * 描 述：邮件配置	
 */

var acceptClick;
var keyValue = '';
var Id = '';
var bootstrap = function ($, sp) {
    "use strict";

    var page = {
        init: function () {
            page.bind();
            page.initData();
        },
        bind: function () {

        },
        initData: function () {
            var loginInfo = sp.clientdata.get(['userinfo']); //登陆者信息
            $.spSetForm(top.$.rootUrl + '/LR_OAModule/Email/GetConfigEntity?keyValue=' + loginInfo.userId, function (data) {//
                console.log(data);
                Id = data.F_Id;
                $('#form').spSetFormData(data);
            });
        }
    };
    // 保存数据
    acceptClick = function (callBack) {
        if (!$('#form').spValidform()) {
            return false;
        }
        var postData = $('#form').spGetFormData(keyValue);
        $.spSaveForm(top.$.rootUrl + '/LR_OAModule/Email/SaveConfigEntity?keyValue=' + Id, postData, function (res) {
            // 保存成功后才回调
            if (!!callBack) {
                callBack();
            }
        });
    };
    page.init();
}