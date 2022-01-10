/*
 * 版 本 Sprann ADMS V1.0.0 敏捷开发框架(http://www.sp.cn)
 * Copyright (c) 2017-2018 思普瑞云(深圳)科技有限公司
 * 创建人：力软-前端开发组
 * 日 期：2017.04.11
 * 描 述：区域管理	
 */
var keyValue = '';
var acceptClick;
var moduleId = request('moduleId');
var bootstrap = function ($, sp) {
    "use strict";
    var selectedRow = sp.frameTab.currentIframe().selectedRow;
    var btnName = '';
    var page = {
        init: function () {
            page.bind();
            page.initData();
        },
        bind: function () {
            $('#F_ModuleBtnId').spselect({
                url: top.$.rootUrl + '/LR_SystemModule/Module/GetButtonListNoAuthorize',
                param: {
                    moduleId: moduleId
                },
                value: 'F_EnCode',
                text: 'F_FullName',
                select: function (item) {
                    if (!!item) {
                        btnName = item.F_FullName
                    }
                    else {
                        btnName = '';
                    }

                },
                maxHeight:170
            });
        },
        initData: function () {
            $('#F_ModuleId').val(moduleId);
            if (!!selectedRow) {
                $('#F_ModuleBtnId').spselectRefresh({
                    param: {
                        moduleId: selectedRow.F_ModuleId
                    }
                });
                keyValue = selectedRow.F_Id;
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
        postData.F_BtnName = btnName;
        $.spSaveForm(top.$.rootUrl + '/LR_SystemModule/ExcelExport/SaveForm?keyValue=' + keyValue, postData, function (res) {
            // 保存成功后才回调
            if (!!callBack) {
                callBack();
            }
        });
    };
    page.init();
}