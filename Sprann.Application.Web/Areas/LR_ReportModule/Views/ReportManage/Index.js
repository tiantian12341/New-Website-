﻿/*
 * 版 本 Sprann ADMS V1.0.0 敏捷开发框架(http://www.sp.cn)
 * Copyright (c) 2017-2018 思普瑞云(深圳)科技有限公司
 * 创建人：力软-前端开发组
 * 日 期：2017.11.11
 * 描 述：报表管理	
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
                sp.layerForm({
                    id: 'form',
                    title: '添加报表',
                    url: top.$.rootUrl + '/LR_ReportModule/ReportManage/Form',
                    width: 600,
                    height: 500,
                    btn: null
                });
            });
            // 编辑
            $('#sp_edit').on('click', function () {
                selectedRow = $('#gridtable').jfGridGet('rowdata');
                var keyValue = $('#gridtable').jfGridValue('F_TempId');
                if (sp.checkrow(keyValue)) {
                    sp.layerForm({
                        id: 'form',
                        title: '编辑报表',
                        url: top.$.rootUrl + '/LR_ReportModule/ReportManage/Form',
                        width: 600,
                        height: 500,
                        btn: null
                    });
                }
            });
            // 删除
            $('#sp_delete').on('click', function () {
                var keyValue = $('#gridtable').jfGridValue('F_TempId');
                if (sp.checkrow(keyValue)) {
                    sp.layerConfirm('是否确认删除该项！', function (res) {
                        if (res) {
                            sp.deleteForm(top.$.rootUrl + '/LR_ReportModule/ReportManage/DeleteForm', { keyValue: keyValue }, function () {
                                refreshGirdData();
                            });
                        }
                    });
                }
            });
            //预览
            $('#sp_preview').on('click', function () {
                var keyValue = $('#gridtable').jfGridValue('F_TempId');
                sp.frameTab.open({ F_ModuleId: 'preview_' + keyValue, F_Icon: 'fa fa fa-eye', F_FullName: '预览报表', F_UrlAddress: '/LR_ReportModule/ReportManage/Preview?reportId=' + keyValue + '&type=preview' });
            });
        },
        initGrid: function () {
            $('#gridtable').jfGrid({
                url: top.$.rootUrl + '/LR_ReportModule/ReportManage/GetPageList',
                headData: [
                    { label: "报表编号", name: "F_EnCode", width: 100, align: "left", sortable: false },
                    { label: "报表名称", name: "F_FullName", width: 200, align: "left", sortable: false },
                    {
                        label: "报表分类", name: "F_TempCategory", width: 100, align: "center", sortable: false,
                        formatterAsync: function (callback, value, row) {
                            sp.clientdata.getAsync('dataItem', {
                                key: value,
                                code: 'ReportSort',
                                callback: function (_data) {
                                    callback(_data.text);
                                }
                            });
                        }
                    },
                    {
                        label: "报表风格", name: "F_TempStyle", width: 100, align: "center", sortable: false,
                        formatter: function (cellvalue) {
                            if (cellvalue == 1) {
                                return "列表"
                            } else if (cellvalue == 2) {
                                return "图表";
                            } else if (cellvalue == 3) {
                                return "混合";
                            }
                        }
                    },
                    { label: "报表介绍", name: "F_Description", width: 300, align: "left", sortable: false }
                ],
                mainId: 'F_TempId',
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


