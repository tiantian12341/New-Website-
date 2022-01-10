/*
 * 版 本 sp-ADMS V6.1.6.0 思普瑞云(http://www.sp.cn)
 * Copyright (c) 2013-2017 上海力软信息技术有限公司
 * 创建人：力软-前端开发组
 * 日 期：2018.06.05
 * 描 述：写邮件	
 */
var keyValue = request('keyValue');
var type = request('type');
var data = request('data');

var acceptClick;
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
            if (!!keyValue) {
                if (type == '2') {
                    $.spSetForm(top.$.rootUrl + '/LR_OAModule/Email/GetReceiveEntity?keyValue=' + keyValue, function (data) {//
                        console.log(data);
                        $('#F_frame').attr("srcdoc", data.F_BodyText);
                        $('#form').spSetFormData(data);
                    });
                }
                else {
                    $.spSetForm(top.$.rootUrl + '/LR_OAModule/Email/GetSendEntity?keyValue=' + keyValue, function (data) {//
                        console.log(data);
                        $('#F_frame').attr("srcdoc", data.F_BodyText);
                        $('#form').spSetFormData(data);
                    });
                }
            }
        }
    };
    // 保存数据
    acceptClick = function (callBack) {
        return true;
    };
    page.init();
}