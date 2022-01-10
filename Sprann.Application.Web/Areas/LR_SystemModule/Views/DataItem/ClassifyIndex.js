/*
 * 版 本 Sprann ADMS V1.0.0 敏捷开发框架(http://www.sp.cn)
 * Copyright (c) 2017-2018 思普瑞云(深圳)科技有限公司
 * 创建人：力软-前端开发组
 * 日 期：2017.03.22
 * 描 述：数据字典管理	
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
                page.search({keyword: keyword });
            });
            // 刷新
            $('#sp_refresh').on('click', function () {
                location.reload();
            });
            // 新增
            $('#sp_add').on('click', function () {
                var f_ItemId = $('#gridtable').jfGridValue('F_ItemId');
                selectedRow = null;
                sp.layerForm({
                    id: 'ClassifyForm',
                    title: '添加分类',
                    url: top.$.rootUrl + '/LR_SystemModule/DataItem/ClassifyForm?parentId=' + f_ItemId,
                    width: 500,
                    height: 400,
                    callBack: function (id) {
                        return top[id].acceptClick(refreshGirdData);
                    }
                });
            });
            // 编辑
            $('#sp_edit').on('click', function () {
                selectedRow = $('#gridtable').jfGridGet('rowdata');
                var keyValue = $('#gridtable').jfGridValue('F_ItemId');
                if (sp.checkrow(keyValue)) {
                    sp.layerForm({
                        id: 'ClassifyForm',
                        title: '编辑分类',
                        url: top.$.rootUrl + '/LR_SystemModule/DataItem/ClassifyForm',
                        width: 500,
                        height: 400,
                        callBack: function (id) {
                            return top[id].acceptClick(refreshGirdData);
                        }
                    });
                }
            });
            // 删除
            $('#sp_delete').on('click', function () {
                var keyValue = $('#gridtable').jfGridValue('F_ItemId');
                if (sp.checkrow(keyValue)) {
                    sp.layerConfirm('是否确认删除该项！', function (res) {
                        if (res) {
                            sp.deleteForm(top.$.rootUrl + '/LR_SystemModule/DataItem/DeleteClassifyForm', { keyValue: keyValue }, function () {
                                refreshGirdData();
                            });
                        }
                    });
                }
            });
        },
        initGrid: function () {
            $('#gridtable').spAuthorizeJfGrid({
                url: top.$.rootUrl + '/LR_SystemModule/DataItem/GetClassifyList',
                headData: [
                    { label: '名称', name: 'F_ItemName', width: 200, align: 'left' },
                    { label: '编号', name: 'F_ItemCode', width: 200, align: 'left' },
                    { label: '排序', name: 'F_SortCode', width: 50, align: 'center' },
                    {
                        label: "树型", name: "F_IsTree",width: 50, align: "center",
                        formatter: function (cellvalue) {
                            return cellvalue == 1 ? "<i class=\"fa fa-toggle-on\"></i>" : "<i class=\"fa fa-toggle-off\"></i>";
                        }
                    },
                    {
                        label: "有效", name: "F_EnabledMark",width: 50, align: "center",
                        formatter: function (cellvalue) {
                            return cellvalue == 1 ? "<i class=\"fa fa-toggle-on\"></i>" : "<i class=\"fa fa-toggle-off\"></i>";
                        }
                    },
                    { label: "备注", name: "F_Description", width: 200, align: "left" }
                ],
                isTree: true,
                mainId: 'F_ItemId',
                parentId: 'F_ParentId',
                reloadSelected:true
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


