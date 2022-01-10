/*
 * 版 本 Sprann ADMS V1.0.0 敏捷开发框架(http://www.sp.cn)
 * Copyright (c) 2017-2018 思普瑞云(深圳)科技有限公司
 * 创建人：力软-前端开发组
 * 日 期：2017.04.11
 * 描 述：数据源管理	
 */
var keyValue = "";
var acceptClick;
var bootstrap = function ($, sp) {
    "use strict";
    var selectedRow = sp.frameTab.currentIframe().selectedRow;
    var page = {
        init: function () {
            page.bind();
            page.initData();
        },
        bind: function () {
            $('#F_DbId').spDbSelect();
        },
        initData: function () {
            if (!!selectedRow) {
                keyValue = selectedRow.F_Id;
                sp.httpAsync('GET', top.$.rootUrl + '/LR_SystemModule/DataSource/GetEntityByCode', { keyValue: selectedRow.F_Code }, function (data) {
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
        $.spSaveForm(top.$.rootUrl + '/LR_SystemModule/DataSource/SaveForm?keyValue=' + keyValue, postData, function (res) {
            // 保存成功后才回调
            if (!!callBack) {
                callBack();
            }
        });
    };
    page.init();
}