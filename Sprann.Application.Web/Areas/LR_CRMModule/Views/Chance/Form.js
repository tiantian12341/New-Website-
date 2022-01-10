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
            // 商机类别
            $('#F_ChanceTypeId').spDataItemSelect({ code: 'Client_ChanceSort', maxHeight: 230 });
            // 商机来源
            $('#F_SourceId').spDataItemSelect({ code: 'Client_ChanceSource', maxHeight: 230 });
            // 商机阶段
            $('#F_StageId').spDataItemSelect({ code: 'Client_ChancePhase', maxHeight: 230 });
            //跟进人员
            $('#F_TraceUserId').spformselect({
                layerUrl: top.$.rootUrl + '/LR_OrganizationModule/User/SelectForm',
                layerUrlW: 800,
                layerUrlH: 520,
                dataUrl: top.$.rootUrl + '/LR_OrganizationModule/User/GetListByUserIds'
            });
            //公司行业
            $('#F_CompanyNatureId').spDataItemSelect({ code: 'Client_Trade', maxHeight: 230 });


        },
        initData: function () {
            if (!!selectedRow) {
                keyValue = selectedRow.F_ChanceId;
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
        $.spSaveForm(top.$.rootUrl + '/LR_CRMModule/Chance/SaveForm?keyValue=' + keyValue, postData, function (res) {
            // 保存成功后才回调
            if (!!callBack) {
                callBack();
            }
        });
    };
    page.init();
}