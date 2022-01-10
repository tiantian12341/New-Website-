/*
 * 版 本 Sprann ADMS V1.0.0 敏捷开发框架(http://www.sp.cn)
 * Copyright (c) 2017-2018 思普瑞云(深圳)科技有限公司
 * 创建人：力软-前端开发组
 * 日 期：2017.04.18
 * 描 述：部门管理	
 */
var companyId = request('companyId');


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
            // 部门性质
            $('#F_Nature').spDataItemSelect({ code: 'DepartmentNature', maxHeight: 230 });
            // 上级部门
            $('#F_ParentId').spDepartmentSelect({ companyId: companyId, maxHeight: 160 });
        },
        initData: function () {
            if (!!selectedRow) {
                keyValue = selectedRow.F_DepartmentId;
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
        if (postData["F_ParentId"] == '' || postData["F_ParentId"] == '&nbsp;') {
            postData["F_ParentId"] = '0';
        }
        postData["F_CompanyId"] = companyId;
        $.spSaveForm(top.$.rootUrl + '/LR_OrganizationModule/Department/SaveForm?keyValue=' + keyValue, postData, function (res) {
            // 保存成功后才回调
            if (!!callBack) {
                callBack();
            }
        });
    };
    page.init();
}