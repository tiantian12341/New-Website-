/*
 * 版 本 Sprann ADMS V1.0.0 敏捷开发框架(http://www.sp.cn)
 * Copyright (c) 2017-2018 思普瑞云(深圳)科技有限公司
 * 创建人：力软-前端开发组
 * 日 期：2017.04.18
 * 描 述：账号添加	
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
            // 部门
            $('#F_DepartmentId').spDepartmentSelect({ companyId: companyId});
            // 性别
            $('#F_Gender').spselect();
            /*检测重复项*/
            $('#F_Account').on('blur', function () {
                $.spExistField(keyValue, 'F_Account', top.$.rootUrl + '/LR_OrganizationModule/User/ExistAccount');
            });
        },
        initData: function () {
            if (!!selectedRow) {
                keyValue = selectedRow.F_UserId;
                selectedRow.F_Passpord = "******";
                $('#form').spSetFormData(selectedRow);
                $('#F_Passpord').attr('readonly', 'readonly');
                $('#F_Account').attr('readonly', 'readonly');

                $('#F_Passpord').attr('unselectable', 'on');
                $('#F_Account').attr('unselectable', 'on');
            }
            else {
                $('#F_CompanyId').val(companyId);
            }
        }
    };
    // 保存数据
    acceptClick = function (callBack) {
        if (!$('#form').spValidform()) {
            return false;
        }
        var postData = $('#form').spGetFormData(keyValue);
        if (!keyValue) {
            postData.F_Passpord = $.md5(postData.F_Passpord);
        }
        $.spSaveForm(top.$.rootUrl + '/LR_OrganizationModule/User/SaveForm?keyValue=' + keyValue, postData, function (res) {
            // 保存成功后才回调
            if (!!callBack) {
                callBack();
            }
        });
    };
    page.init();
}