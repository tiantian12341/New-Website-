/*
 * 版 本 Sprann ADMS V1.0.0 敏捷开发框架(http://www.sp.cn)
 * Copyright (c) 2017-2018 思普瑞云(深圳)科技有限公司
 * 创建人：力软-前端开发组
 * 日 期：2017.04.17
 * 描 述：Excel导入配置	
 */
var refreshGirdData; // 更新数据
var selectedRow;
var bootstrap = function ($, sp) {
    "use strict";
    var moduleId = "";
    var page = {
        init: function () {
            page.initGrid();
            page.bind();
        },
        bind: function () {
            $('#module_tree').sptree({
                url: top.$.rootUrl + '/LR_SystemModule/Module/GetModuleTree',
                nodeClick: function (item) {
                    if (item.hasChildren) {
                        moduleId = '';
                    }
                    else {
                        moduleId = item.id;
                    }
                    $('#titleinfo').text(item.text);
                }
            });

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
                if (!moduleId) {
                    sp.alert.warning('请选择功能！');
                    return false;
                }
                selectedRow = null;
                sp.layerForm({
                    id: 'Form',
                    title: '添加快速导出',
                    url: top.$.rootUrl + '/LR_SystemModule/ExcelExport/Form?moduleId=' + moduleId,
                    width: 500,
                    height: 300,
                    callBack: function (id) {
                        return top[id].acceptClick(refreshGirdData);
                    }
                });
            });
            // 编辑
            $('#sp_edit').on('click', function () {
                selectedRow = $('#gridtable').jfGridGet('rowdata');
                var keyValue = $('#gridtable').jfGridValue('F_Id');
                if (sp.checkrow(keyValue)) {
                    sp.layerForm({
                        id: 'Form',
                        title: '编辑快速导出',
                        url: top.$.rootUrl + '/LR_SystemModule/ExcelExport/Form',
                        width: 500,
                        height: 300,
                        callBack: function (id) {
                            return top[id].acceptClick(refreshGirdData);
                        }
                    });
                }
            });
            // 删除
            $('#sp_delete').on('click', function () {
                var keyValue = $('#gridtable').jfGridValue('F_Id');
                if (sp.checkrow(keyValue)) {
                    sp.layerConfirm('是否确认删除该项！', function (res) {
                        if (res) {
                            sp.deleteForm(top.$.rootUrl + '/LR_SystemModule/ExcelExport/DeleteForm', { keyValue: keyValue }, function () {
                                refreshGirdData();
                            });
                        }
                    });
                }
            });
            // 启用
            $('#sp_enable').on('click', function () {
                var keyValue = $('#gridtable').jfGridValue('F_Id');
                if (sp.checkrow(keyValue)) {
                    sp.layerConfirm('是否确认要【启用】！', function (res) {
                        if (res) {
                            sp.postForm(top.$.rootUrl + '/LR_SystemModule/ExcelExport/UpdateState', { keyValue: keyValue, state: 1 }, function () {
                                refreshGirdData();
                            });
                        }
                    });
                }
            });
            // 禁用
            $('#sp_disable').on('click', function () {
                var keyValue = $('#gridtable').jfGridValue('F_Id');
                if (sp.checkrow(keyValue)) {
                    sp.layerConfirm('是否确认要【停用】！', function (res) {
                        if (res) {
                            sp.postForm(top.$.rootUrl + '/LR_SystemModule/ExcelExport/UpdateState', { keyValue: keyValue, state: 0 }, function () {
                                refreshGirdData();
                            });
                        }
                    });
                }
            });
        },
        initGrid: function () {
            $('#gridtable').spAuthorizeJfGrid({
                url: top.$.rootUrl + '/LR_SystemModule/ExcelExport/GetPageList',
                headData: [
                    { label: "导出名称", name: "F_Name", width: 160, align: "left" },
                    {
                         label: "绑定功能", name: "F_ModuleId", width: 160, align: "left",
                         formatter: function (cellvalue) {
                             var data = sp.clientdata.get(['modulesMap']);
                             return data[cellvalue].F_FullName;
                         }
                     },
                    { label: "绑定按钮", name: "F_BtnName", width: 160, align: "left" },
                    {
                        label: "状态", name: "F_EnabledMark", width: 50, align: "center",
                        formatter: function (cellvalue) {
                            if (cellvalue == 1) {
                                return '<span class=\"label label-success\" style=\"cursor: pointer;\">启用</span>';
                            } else if (cellvalue == 0) {
                                return '<span class=\"label label-default\" style=\"cursor: pointer;\">停用</span>';
                            }
                        }
                    },
                    {
                        label: '创建人', name: 'F_CreateUserName', width: 130, align: 'left'

                    },
                    {
                        label: '创建时间', name: 'F_CreateDate', width: 130, align: 'left',
                        formatter: function (cellvalue) {
                            return sp.formatDate(cellvalue, 'yyyy-MM-dd');
                        }
                    }
                ],
                mainId: 'F_CustmerQueryId',
                reloadSelected: true,
                isPage: true
            });
            page.search();
        },
        search: function (param) {
            param = param || {};
            param.moduleId = moduleId;
            $('#gridtable').jfGridSet('reload', { queryJson: JSON.stringify(param) });
        }
    };

    // 保存数据后回调刷新
    refreshGirdData = function () {
        page.search();
    }

    page.init();
}
