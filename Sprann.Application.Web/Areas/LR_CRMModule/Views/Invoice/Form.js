/*
 * 版 本 Sprann ADMS V1.0.0 敏捷开发框架(http://www.sp.cn)
 * Copyright (c) 2017-2018 思普瑞云(深圳)科技有限公司
 * 创建人：力软-前端开发组
 * 日 期：2017.04.18
 * 描 述：客户开票信息管理	
 */

var acceptClick;
var keyValue = '';
var bootstrap = function ($, sp) {
    "use strict";
    var customerName = '';

    var selectedRow = sp.frameTab.currentIframe().selectedRow;
    var page = {
        init: function () {
            page.bind();
            page.initData();
        },
        bind: function () {
            //客户名称
            $('#F_CustomerId').spselect({
                url: '/LR_CRMModule/Customer/GetList',
                maxHeight: 230,
                value: "F_CustomerId",
                text: "F_FullName",
                select: function (item) {
                    customerName = item.F_FullName;
                }
            });
        },
        initData: function () {
            if (!!selectedRow) {
                keyValue = selectedRow.F_InvoiceId;
                $('#form').spSetFormData(selectedRow);
            }
        }
    };
    // 保存数据
    acceptClick = function (callBack) {
        if (!$('#form').spValidform()) {
            return false;
        }
        var postData = $('#form').spGetFormData(keyValue);
        postData["F_CustomerName"] = customerName;
        $.spSaveForm(top.$.rootUrl + '/LR_CRMModule/Invoice/SaveForm?keyValue=' + keyValue, postData, function (res) {
            // 保存成功后才回调
            if (!!callBack) {
                callBack();
            }
        });
    };
    page.init();
}