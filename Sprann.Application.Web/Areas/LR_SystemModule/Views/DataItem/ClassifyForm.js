/*
 * 版 本 Sprann ADMS V1.0.0 敏捷开发框架(http://www.sp.cn)
 * Copyright (c) 2017-2018 思普瑞云(深圳)科技有限公司
 * 创建人：力软-前端开发组
 * 日 期：2017.04.05
 * 描 述：分类管理	
 */
var parentId = request('parentId');
var selectedRow = top.layer_ClassifyIndex.selectedRow;

var keyValue = '';
var acceptClick;
var bootstrap = function ($, sp) {
    "use strict";

    var page = {
        init: function () {
            page.bind();
            page.initData();
        },
        bind: function () {
            // 上级
            $('#F_ParentId').spselect({
                url: top.$.rootUrl + '/LR_SystemModule/DataItem/GetClassifyTree',
                type: 'tree',
                allowSearch: true,
                maxHeight:225
            }).spselectSet(parentId);
            /*检测重复项*/
            $('#F_ItemName').on('blur', function () {
                $.spExistField(keyValue, 'F_ItemName', top.$.rootUrl + '/LR_SystemModule/DataItem/ExistItemName');
            });
            $('#F_ItemCode').on('blur', function () {
                $.spExistField(keyValue, 'F_ItemCode', top.$.rootUrl + '/LR_SystemModule/DataItem/ExistItemCode');
            });
        },
        initData: function () {
            if (!!selectedRow) {
                keyValue = selectedRow.F_ItemId || '';
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
        else if (postData["F_ParentId"] == keyValue) {
            sp.alert.error('上级不能是自己本身');
            return false;
        }
        $.spSaveForm(top.$.rootUrl + '/LR_SystemModule/DataItem/SaveClassifyForm?keyValue=' + keyValue, postData, function (res) {
            // 保存成功后才回调
            if (!!callBack) {
                callBack();
            }
        });
    };

    page.init();
}