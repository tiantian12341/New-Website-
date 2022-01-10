/*
 * 版 本 Sprann ADMS V1.0.0 敏捷开发框架(http://www.sp.cn)
 * Copyright (c) 2017-2018 思普瑞云(深圳)科技有限公司
 * 创建人：力软-前端开发组
 * 日 期：2017.04.17
 * 描 述：自定义查询	
 */
var refreshGirdData; // 更新数据
var selectedRow;
var bootstrap = function ($, sp) {
    "use strict";
    var page = {
        init: function () {
            page.initGrid();
            page.bind();
        },
        bind: function () {
            // 查询
            $('#btn_Search').on('click', function () {
                var keyword = $('#txt_Keyword').val();
                page.search({ keyword: keyword });
            });
            // 刷新
            $('#sp_refresh').on('click', function () {
                location.reload();
            });
            // 新增
            $('#sp_add').on('click', function () {
                selectedRow = null;
                sp.layerForm({
                    id: 'Form',
                    title: '添加公共自定义查询',
                    url: top.$.rootUrl + '/LR_SystemModule/CustmerQuery/Form',
                    width: 700,
                    height: 400,
                    callBack: function (id) {
                        return top[id].acceptClick(refreshGirdData);
                    }
                });
            });
            // 编辑
            $('#sp_edit').on('click', function () {
                selectedRow = $('#gridtable').jfGridGet('rowdata');
                var keyValue = $('#gridtable').jfGridValue('F_CustmerQueryId');
                if (sp.checkrow(keyValue)) {
                    sp.layerForm({
                        id: 'Form',
                        title: '编辑公共自定义查询',
                        url: top.$.rootUrl + '/LR_SystemModule/CustmerQuery/Form',
                        width: 700,
                        height: 400,
                        callBack: function (id) {
                            return top[id].acceptClick(refreshGirdData);
                        }
                    });
                }
            });
            // 删除
            $('#sp_delete').on('click', function () {
                var keyValue = $('#gridtable').jfGridValue('F_CustmerQueryId');
                if (sp.checkrow(keyValue)) {
                    sp.layerConfirm('是否确认删除该项！', function (res) {
                        if (res) {
                            sp.deleteForm(top.$.rootUrl + '/LR_SystemModule/CustmerQuery/DeleteForm', { keyValue: keyValue }, function () {
                                refreshGirdData();
                            });
                        }
                    });
                }
            });
        },
        initGrid: function () {
            $('#gridtable').spAuthorizeJfGrid({
                url: top.$.rootUrl + '/LR_SystemModule/CustmerQuery/GetPageList',
                headData: [
                    { label: "功能名称", name: "ModuleName", width: 150, align: "left" },
                    { label: "查询名称", name: "F_Name", width: 150, align: "left" },
                    { label: "功能地址", name: "F_ModuleUrl", width: 500, align: "left" }
                ],
                mainId: 'F_CustmerQueryId',
                reloadSelected: true,
                isPage:true
            });
            page.search();
        },
        search: function (param) {
            $('#gridtable').jfGridSet('reload', param);
        }
    };

    // 保存数据后回调刷新
    refreshGirdData = function () {
        page.search();
    }

    page.init();
}


