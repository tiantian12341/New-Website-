/*
 * 版 本 Sprann ADMS V1.0.0 敏捷开发框架(http://www.sp.cn)
 * Copyright (c) 2017-2018 思普瑞云(深圳)科技有限公司
 * 创建人：力软-前端开发组
 * 日 期：2017.03.22
 * 描 述：数据字典管理	
 */
var refreshGird;
var bootstrap = function ($, sp) {
    "use strict";
    var classify_itemCode = '';
    var page = {
        init: function () {
            page.initTree();
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
                if (!classify_itemCode) {
                    sp.alert.warning('请选择字典分类！');
                    return false;
                }
                top.selectedDataItemRow = null;
                var parentId = $('#gridtable').jfGridValue('F_ItemDetailId') || '0';
                sp.layerForm({
                    id: 'form',
                    title: '添加字典',
                    url: top.$.rootUrl + '/LR_SystemModule/DataItem/Form?parentId=' + parentId + '&itemCode=' + classify_itemCode,
                    width: 500,
                    height: 370,
                    callBack: function (id) {
                        return top[id].acceptClick(refreshGird);
                    }
                });
            });
            // 编辑
            $('#sp_edit').on('click', function () {
                var keyValue = $('#gridtable').jfGridValue('F_ItemDetailId');
                top.selectedDataItemRow = $('#gridtable').jfGridGet('rowdata');


               

                if (sp.checkrow(keyValue)) {
                    sp.layerForm({
                        id: 'form',
                        title: '编辑字典',
                        url: top.$.rootUrl + '/LR_SystemModule/DataItem/Form?itemCode=' + classify_itemCode,
                        width: 500,
                        height: 370,
                        callBack: function (id) {
                            return top[id].acceptClick(refreshGird);
                        }
                    });
                }
            });
            // 删除
            $('#sp_delete').on('click', function () {
                var keyValue = $('#gridtable').jfGridValue('F_ItemDetailId');
                if (sp.checkrow(keyValue)) {
                    sp.layerConfirm('是否确认删除该项！', function (res) {
                        if (res) {
                            sp.deleteForm(top.$.rootUrl + '/LR_SystemModule/DataItem/DeleteDetailForm', { keyValue: keyValue }, function () {
                                refreshGird();
                            });
                        }
                    });
                }
            });
            /*分类管理*/
            $('#sp_category').on('click', function () {
                sp.layerForm({
                    id: 'ClassifyIndex',
                    title: '分类管理',
                    url: top.$.rootUrl + '/LR_SystemModule/DataItem/ClassifyIndex',
                    width: 800,
                    height: 500,
                    maxmin: true,
                    btn: null,
                    end: function () {
                        location.reload();
                    }
                });
            });
        },
        initTree: function () {
            $('#sp_left_tree').sptree({
                url: top.$.rootUrl + '/LR_SystemModule/DataItem/GetClassifyTree',
                nodeClick: function (item) {
                    classify_itemCode = item.value;
                    $('#titleinfo').text(item.text + '(' + classify_itemCode + ')');
                    page.search();
                }
            });
        },
        initGrid: function () {
            $('#gridtable').spAuthorizeJfGrid({
                url: top.$.rootUrl + '/LR_SystemModule/DataItem/GetDetailList',
                headData: [
                    { label: '项目名', name: 'F_ItemName', width: 200, align: 'left' },
                    { label: '项目值', name: 'F_ItemValue', width: 200, align: 'left' },
                    { label: '简拼', name: 'F_SimpleSpelling', width: 150, align: 'left' },
                    { label: '排序', name: 'F_SortCode', width: 80, align: 'center' },
                    {
                        label: "有效", name: "F_EnabledMark", width: 50, align: "center",
                        formatter: function (cellvalue) {
                            return cellvalue == 1 ? "<i class=\"fa fa-toggle-on\"></i>" : "<i class=\"fa fa-toggle-off\"></i>";
                        }
                    },
                    { label: "备注", name: "F_Description", width: 200, align: "left" }
                ],

                isTree: true,
                mainId: 'F_ItemDetailId',
                parentId: 'F_ParentId',
            });
        },
        search: function (param) {
            param = param || {};
            param.itemCode = classify_itemCode;
            $('#gridtable').jfGridSet('reload', param);
        }
    };

    refreshGird = function () {
        page.search();
    };

    page.init();
}


    