/*
 * 版 本 Sprann ADMS V1.0.0 敏捷开发框架(http://www.sp.cn)
 * Copyright (c) 2017-2018 思普瑞云(深圳)科技有限公司
 * 创建人：力软-前端开发组
 * 日 期：2017.04.11
 * 描 述：表单设计数据表添加	
 */
var dbId = request('dbId');

var selectedRow = top.layer_Form.selectedRow;
var dbTable = top.layer_Form.dbTable;


var acceptClick;
var bootstrap = function ($, sp) {
    "use strict";

    var page = {
        init: function () {
            page.bind();
            page.initData();
        },
        bind: function () {
            $('#field').spselect({
                value: 'f_column',
                text: 'f_column',
                title: 'f_remark',
                allowSearch: true
            });
            $('#relationField').spselect({
                value: 'f_column',
                text: 'f_column',
                title: 'f_remark',
                allowSearch: true
            });
            $('#name').spselect({
                url: top.$.rootUrl + '/LR_SystemModule/DatabaseTable/GetList',
                param: { databaseLinkId: dbId },
                value: 'name',
                text: 'name',
                title: 'tdescription',
                allowSearch: true,
                select: function (item) {
                    if (!!item) {
                        $('#field').spselectRefresh({
                            url: top.$.rootUrl + '/LR_SystemModule/DatabaseTable/GetFieldList',
                            param: { databaseLinkId: dbId, tableName: item.name }
                        });
                    }
                }
            });
            $('#relationName').spselect({
                data: dbTable,
                param: { databaseLinkId: dbId },
                value: 'name',
                text: 'name',
                maxHeight: 160,
                allowSearch: true,
                select: function (item) {
                    if (!!item) {
                        $('#relationField').spselectRefresh({
                            url: top.$.rootUrl + '/LR_SystemModule/DatabaseTable/GetFieldList',
                            param: { databaseLinkId: dbId, tableName: item.name }
                        });
                    }
                }
            });
        },
        initData: function () {
            if (!!selectedRow) {
                $('#form').spSetFormData(selectedRow);
            }
        }
    };
    // 保存数据
    acceptClick = function (callBack) {
        if (!$('#form').spValidform()) {
            return false;
        }

        var data = $('#form').spGetFormData();
        if (data.name == data.relationName)
        {
            sp.alert.error('关联表不能是自己本身！');
            return false;
        }
        if (!!callBack) {
            callBack(data);
        }
        return true;
    };
    page.init();
}