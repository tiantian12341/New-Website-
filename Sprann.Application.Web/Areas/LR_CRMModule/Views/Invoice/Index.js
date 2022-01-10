/*
 * 版 本 Sprann ADMS V1.0.0 敏捷开发框架(http://www.sp.cn)
 * Copyright (c) 2017-2018 思普瑞云(深圳)科技有限公司
 * 创建人：力软-前端开发组
 * 日 期：2017.11.12
 * 描 述：客户开票信息管理	
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
                selectedRow = null;//新增前请清空已选中行
                sp.layerForm({
                    id: 'form',
                    title: '新增客户',
                    url: top.$.rootUrl + '/LR_CRMModule/Invoice/Form',
                    width: 500,
                    height: 400,
                    maxmin: true,
                    callBack: function (id) {
                        return top[id].acceptClick(refreshGirdData);
                    }
                });
            });
            // 编辑
            $('#sp_edit').on('click', function () {
                selectedRow = $('#gridtable').jfGridGet('rowdata');
                var keyValue = $('#gridtable').jfGridValue('F_InvoiceId');
                if (sp.checkrow(keyValue)) {
                    sp.layerForm({
                        id: 'form',
                        title: '编辑客户',
                        url: top.$.rootUrl + '/LR_CRMModule/Invoice/Form',
                        width: 500,
                        height: 400,
                        maxmin: true,
                        callBack: function (id) {
                            return top[id].acceptClick(refreshGirdData);
                        }
                    });
                }
            });
            // 删除
            $('#sp_delete').on('click', function () {
                var keyValue = $('#gridtable').jfGridValue('F_InvoiceId');
                if (sp.checkrow(keyValue)) {
                    sp.layerConfirm('是否确认删除该项！', function (res) {
                        if (res) {
                            sp.deleteForm(top.$.rootUrl + '/LR_CRMModule/Invoice/DeleteForm', { keyValue: keyValue }, function () {
                                refreshGirdData();
                            });
                        }
                    });
                }
            });
        },
        initGrid: function () {
            $('#gridtable').jfGrid({
                url: top.$.rootUrl + '/LR_CRMModule/Invoice/GetPageListJson',
                headData: [
                    { label: '客户名称', name: 'F_CustomerName', width: 200, align: 'left' },
                    { label: '开票信息', name: 'F_InvoiceContent', width: 500, align: 'left' }
                ],
                mainId: 'F_InvoiceId',
                reloadSelected: true,
                isPage: true,
                sidx: 'F_CreateDate'
            });
            page.search();
        },
        search: function (param) {
            $('#gridtable').jfGridSet('reload', { queryJson: JSON.stringify(param) });
        }
    };
    // 保存数据后回调刷新
    refreshGirdData = function () {
        page.search();
    }
    page.init();
}


