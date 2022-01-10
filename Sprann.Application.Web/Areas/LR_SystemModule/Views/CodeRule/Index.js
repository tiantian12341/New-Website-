/*
 * 版 本 Sprann ADMS V1.0.0 敏捷开发框架(http://www.sp.cn)
 * Copyright (c) 2017-2018 思普瑞云(深圳)科技有限公司
 * 创建人：力软-前端开发组
 * 日 期：2017.04.17
 * 描 述：单据编码	
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
                    title: '添加单据编码',
                    url: top.$.rootUrl + '/LR_SystemModule/CodeRule/Form',
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
                var keyValue = $('#gridtable').jfGridValue('F_RuleId');
                if (sp.checkrow(keyValue)) {
                    sp.layerForm({
                        id: 'Form',
                        title: '编辑单据编码',
                        url: top.$.rootUrl + '/LR_SystemModule/CodeRule/Form',
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
                var keyValue = $('#gridtable').jfGridValue('F_RuleId');
                if (sp.checkrow(keyValue)) {
                    sp.layerConfirm('是否确认删除该项！', function (res) {
                        if (res) {
                            sp.deleteForm(top.$.rootUrl + '/LR_SystemModule/CodeRule/DeleteForm', { keyValue: keyValue }, function () {
                                refreshGirdData();
                            });
                        }
                    });
                }
            });
        },
        initGrid: function () {
            $('#gridtable').spAuthorizeJfGrid({
                url: top.$.rootUrl + '/LR_SystemModule/CodeRule/GetPageList',
                headData: [
                    { label: '对象编号', name: 'F_EnCode', width: 150, align: 'left' },
                    { label: '对象名称', name: 'F_FullName', width: 200, align: 'left' },
                    {
                        label: '当前流水号', name: 'F_CurrentNumber', width: 150, align: 'left',
                        formatter: function (cellvalue) {
                            if (cellvalue) {
                                return cellvalue;
                            } else {
                                return "<span class=\"label label-danger\">未使用</span>";
                            }
                        }
                    },
                    { label: '创建用户', name: 'F_CreateUserName', width: 100, align: 'left' },
                    {
                        label: '创建时间', name: 'F_CreateDate', width: 130, align: 'left',
                        formatter: function (cellvalue) {
                            return sp.formatDate(cellvalue, 'yyyy-MM-dd hh:mm');
                        }
                    },
                    { label: "说明", name: "F_Description", width: 200, align: "left" }

                ],
                mainId: 'F_RuleId',
                reloadSelected: true,
                isPage: true
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


