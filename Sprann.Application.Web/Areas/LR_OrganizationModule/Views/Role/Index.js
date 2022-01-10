/*
 * 版 本 Sprann ADMS V1.0.0 敏捷开发框架(http://www.sp.cn)
 * Copyright (c) 2017-2018 思普瑞云(深圳)科技有限公司
 * 创建人：力软-前端开发组
 * 日 期：2017.03.22
 * 描 述：部门管理	
 */
var selectedRow;
var refreshGirdData;
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
                    id: 'form',
                    title: '添加角色',
                    url: top.$.rootUrl + '/LR_OrganizationModule/Role/Form',
                    width: 500,
                    height: 340,
                    callBack: function (id) {
                        return top[id].acceptClick(refreshGirdData);
                    }
                });
            });
            // 编辑
            $('#sp_edit').on('click', function () {
                var keyValue = $('#gridtable').jfGridValue('F_RoleId');
                selectedRow = $('#gridtable').jfGridGet('rowdata');
                if (sp.checkrow(keyValue)) {
                    sp.layerForm({
                        id: 'form',
                        title: '编辑角色',
                        url: top.$.rootUrl + '/LR_OrganizationModule/Role/Form',
                        width: 500,
                        height: 340,
                        callBack: function (id) {
                            return top[id].acceptClick(refreshGirdData);
                        }
                    });
                }
            });
            // 删除
            $('#sp_delete').on('click', function () {
                var keyValue = $('#gridtable').jfGridValue('F_RoleId');
                if (sp.checkrow(keyValue)) {
                    sp.layerConfirm('是否确认删除该项！', function (res) {
                        if (res) {
                            sp.deleteForm(top.$.rootUrl + '/LR_OrganizationModule/Role/DeleteForm', { keyValue: keyValue}, function () {
                                refreshGirdData();
                            });
                        }
                    });
                }
            });
            // 添加角色成员
            $('#sp_memberadd').on('click', function () {
                var keyValue = $('#gridtable').jfGridValue('F_RoleId');
                var loginInfo = sp.clientdata.get(['userinfo']);
                if (sp.checkrow(keyValue)) {
                    sp.layerForm({
                        id: 'form',
                        title: '添加角色成员',
                        url: top.$.rootUrl + '/LR_AuthorizeModule/UserRelation/SelectForm?objectId=' + keyValue + '&companyId=' + loginInfo.F_CompanyId + '&departmentId=' + loginInfo.F_DepartmentId + '&category=1',
                        width: 800,
                        height: 520,
                        callBack: function (id) {
                            return top[id].acceptClick();
                        }
                    });
                }
            });
            // 查看成员
            $('#sp_memberlook').on('click', function () {
                var keyValue = $('#gridtable').jfGridValue('F_RoleId');
                if (sp.checkrow(keyValue)) {
                    sp.layerForm({
                        id: 'form',
                        title: '查看角色成员',
                        url: top.$.rootUrl + '/LR_AuthorizeModule/UserRelation/LookForm?objectId=' + keyValue,
                        width: 800,
                        height: 520,
                        btn: null
                    });
                }
            });
            // 功能授权
            $('#sp_authorize').on('click', function () {
                var keyValue = $('#gridtable').jfGridValue('F_RoleId');
                selectedRow = $('#gridtable').jfGridGet('rowdata');
                if (sp.checkrow(keyValue)) {
                    sp.layerForm({
                        id: 'authorizeForm',
                        title: '功能授权 - ' + selectedRow.F_FullName,
                        url: top.$.rootUrl + '/LR_AuthorizeModule/Authorize/Form?objectId=' + keyValue + '&objectType=1',
                        width: 550,
                        height: 690,
                        btn: null
                    });
                }
            });
            // 数据授权
            $('#sp_dataauthorize').on('click', function () {
                var keyValue = $('#gridtable').jfGridValue('F_RoleId');
                selectedRow = $('#gridtable').jfGridGet('rowdata');
                if (sp.checkrow(keyValue)) {
                    sp.layerForm({
                        id: 'dataAuthorizeForm',
                        title: '数据授权 - ' + selectedRow.F_FullName,
                        url: top.$.rootUrl + '/LR_AuthorizeModule/DataAuthorize/Index?objectId=' + keyValue + '&objectType=1',
                        width: 1100,
                        height: 700,
                        maxmin: true,
                        btn: null
                    });
                }
            });
            // 移动功能授权
            $('#sp_appauthorize').on('click', function () {
                var keyValue = $('#gridtable').jfGridValue('F_RoleId');
                selectedRow = $('#gridtable').jfGridGet('rowdata');
                if (sp.checkrow(keyValue)) {
                    sp.layerForm({
                        id: 'appAuthorizeForm',
                        title: '移动功能授权 - ' + selectedRow.F_FullName,
                        url: top.$.rootUrl + '/LR_AuthorizeModule/Authorize/AppForm?objectId=' + keyValue + '&objectType=1',
                        width: 550,
                        height: 690,
                        callBack: function (id) {
                            return top[id].acceptClick();
                        }
                    });
                }
            });
            // 设置Ip过滤
            $('#sp_ipfilter').on('click', function () {
                var keyValue = $('#gridtable').jfGridValue('F_RoleId');
                selectedRow = $('#gridtable').jfGridGet('rowdata');
                if (sp.checkrow(keyValue)) {
                    sp.layerForm({
                        id: 'filterIPIndex',
                        title: 'TCP/IP 地址访问限制 - ' + selectedRow.F_FullName,
                        url: top.$.rootUrl + '/LR_AuthorizeModule/FilterIP/Index?objectId=' + keyValue + '&objectType=Role',
                        width: 600,
                        height: 400,
                        btn: null,
                        callBack: function (id) { }
                    });
                }
            });
            // 设置时间段过滤
            $('#sp_timefilter').on('click', function () {
                var keyValue = $('#gridtable').jfGridValue('F_RoleId');
                selectedRow = $('#gridtable').jfGridGet('rowdata');
                if (sp.checkrow(keyValue)) {
                    sp.layerForm({
                        id: 'filterTimeForm',
                        title: '时段访问过滤 - ' + selectedRow.F_FullName,
                        url: top.$.rootUrl + '/LR_AuthorizeModule/FilterTime/Form?objectId=' + keyValue + '&objectType=Role',
                        width: 610,
                        height: 470,
                        callBack: function (id) {
                            return top[id].acceptClick();
                        }
                    });
                }
            });
        },
        initGrid: function () {
            $('#gridtable').spAuthorizeJfGrid({
                url: top.$.rootUrl + '/LR_OrganizationModule/Role/GetPageList',
                headData: [
                    { label: '角色编号', name: 'F_EnCode', width: 100, align: 'left' },
                    { label: '角色名称', name: 'F_FullName', width: 200, align: 'left' },
                    {
                        label: '创建时间', name: 'F_CreateDate', width: 130, align: 'center'
                    },
                    {
                        label: '创建人', name: 'F_CreateUserName', width: 130, align: 'center'
                    },
                    {
                        label: "有效", name: "F_EnabledMark", width: 50, align: "center",
                        formatter: function (cellvalue) {
                            return cellvalue == 1 ? "<i class=\"fa fa-toggle-on\"></i>" : "<i class=\"fa fa-toggle-off\"></i>";
                        }
                    },
                    { label: "角色描述", name: "F_Description", index: "F_Description", width: 300, align: "left" }
                ],
                isPage: true,
                reloadSelected: true,
                mainId: 'F_RoleId'
            });

            page.search();
        },
        search: function (param) {
            param = param || {};
            $('#gridtable').jfGridSet('reload', param);
        }
    };

    refreshGirdData = function () {
        page.search();
    };

    page.init();
}


