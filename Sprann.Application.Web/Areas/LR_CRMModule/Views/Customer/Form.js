/*
 * 版 本 Sprann ADMS V1.0.0 敏捷开发框架(http://www.sp.cn)
 * Copyright (c) 2017-2018 思普瑞云(深圳)科技有限公司
 * 创建人：力软-前端开发组
 * 日 期：2017.04.18
 * 描 述：公司管理	
 */

var acceptClick;
var keyValue = '';
var bootstrap = function ($, sp) {
    "use strict";
    var selectedRow = sp.frameTab.currentIframe().selectedRow;
    var page = {
        init: function () {
            page.bind();
            page.initData();
        },
        bind: function () {
            // 客户级别
            $('#F_CustLevelId').spDataItemSelect({ code: 'Client_Level', maxHeight: 230 });
            // 客户类别
            $('#F_CustTypeId').spDataItemSelect({ code: 'Client_Sort', maxHeight: 230 });
            // 客户程度
            $('#F_CustDegreeId').spDataItemSelect({ code: 'Client_Degree', maxHeight: 230 });
            //跟进人员
            $('#F_TraceUserId').spformselect({
                layerUrl: top.$.rootUrl + '/LR_OrganizationModule/User/SelectForm',
                layerUrlW: 800,
                layerUrlH: 520,
                dataUrl: top.$.rootUrl + '/LR_OrganizationModule/User/GetListByUserIds'
            });
            //公司行业
            $('#F_CustIndustryId').spDataItemSelect({ code: 'Client_Trade', maxHeight: 230 });


        },
        initData: function () {
            if (!!selectedRow) {
                keyValue = selectedRow.F_CustomerId;
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
        postData["F_TraceUserName"] = $("#TraceUserId").attr('data-text');
        $.spSaveForm(top.$.rootUrl + '/LR_CRMModule/Customer/SaveForm?keyValue=' + keyValue, postData, function (res) {
            // 保存成功后才回调
            if (!!callBack) {
                callBack();
            }
        });
    };
    page.init();
}