/* * 版 本 sp-ADMS V6.1.6.0 思普瑞云(http://www.sp.cn)
 * Copyright (c) 2013-2017 上海力软信息技术有限公司
 * 创建人：超级管理员
 * 日  期：2017-09-04 16:04
 * 描  述：会员信息
 */
var refreshGirdData;
var bootstrap = function ($, sp) {
    "use strict";
    var page = {
        init: function () {
            page.initGird();
            page.bind();
        },
        bind: function () {
            $('#multiple_condition_query').spMultipleQuery(function (queryJson) {
                page.search(queryJson);
            }, 220, 400);
            $('#Sex').spDataItemSelect({ code: 'usersex' });
            // 刷新
            $('#sp_refresh').on('click', function () {
                location.reload();
            });
            // 新增
            $('#sp_add').on('click', function () {
                sp.layerForm({
                    id: 'form',
                    title: '新增',
                    url: top.$.rootUrl + '/LR_CodeDemo/CustomerInfo/Form',
                    width: 800,
                    height: 600,
                    callBack: function (id) {
                        return top[id].acceptClick(refreshGirdData);
                    }
                });
            });
            // 编辑
            $('#sp_edit').on('click', function () {
                var keyValue = $('#girdtable').jfGridValue('ID');
                if (sp.checkrow(keyValue)) {
                    sp.layerForm({
                        id: 'form',
                        title: '编辑',
                        url: top.$.rootUrl + '/LR_CodeDemo/CustomerInfo/Form?keyValue=' + keyValue,
                        width: 800,
                        height: 600,
                        callBack: function (id) {
                            return top[id].acceptClick(refreshGirdData);
                        }
                    });
                }
            });
            // 删除
            $('#sp_delete').on('click', function () {
                var keyValue = $('#girdtable').jfGridValue('ID');
                if (sp.checkrow(keyValue)) {
                    sp.layerConfirm('是否确认删除该项！', function (res) {
                        if (res) {
                            sp.deleteForm(top.$.rootUrl + '/LR_CodeDemo/CustomerInfo/DeleteForm', { keyValue: keyValue}, function () {
                                refreshGirdData();
                            });
                        }
                    });
                }
            });
        },
        // 初始化列表
        initGird: function () {
            $('#girdtable').spAuthorizeJfGrid({
                url: top.$.rootUrl + '/LR_CodeDemo/CustomerInfo/GetPageList',
                headData: [
                    { label: "姓名", name: "Name", width: 160, align: "left"},
                    { label: "性别", name: "Sex", width: 160, align: "left",
                        formatterAsync: function (callback, value, row) {
                             sp.clientdata.getAsync('dataItem', {
                                 key: value,
                                 itemCode: 'usersex',
                                 callback: function (_data) {
                                     callback(_data.F_ItemName);
                                 }
                             });
                        }},
                    { label: "年龄", name: "Age", width: 160, align: "left"},
                    { label: "地址", name: "Address", width: 160, align: "left"},
                ],
                mainId:'ID',
                reloadSelected: true,
                isPage: true
            });
            page.search();
        },
        search: function (param) {
            param = param || {};
            $('#girdtable').jfGridSet('reload', { param: { queryJson: JSON.stringify(param) } });
        }
    };
    refreshGirdData = function () {
        page.search();
    };
    page.init();
}
