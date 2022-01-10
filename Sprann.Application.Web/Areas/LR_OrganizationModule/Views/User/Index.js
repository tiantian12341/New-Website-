/*
 * 版 本 Sprann ADMS V1.0.0 敏捷开发框架(http://www.sp.cn)
 * Copyright (c) 2017-2018 思普瑞云(深圳)科技有限公司
 * 创建人：力软-前端开发组
 * 日 期：2017.03.22
 * 描 述：人员管理	
 */
var selectedRow;
var refreshGirdData;
var bootstrap = function ($, sp) {
    "use strict";
    var companyId = '';
    var departmentId = '';

    var page = {
        init: function () {
            page.inittree();
            page.initGrid();
            page.bind();
        },
        bind: function () {
            // 查询
            $('#btn_Search').on('click', function () {
                var keyword = $('#txt_Keyword').val();
                page.search({ keyword: keyword });
            });

            // 部门选择
            $('#department_select').spselect({
                type: 'tree',
                placeholder:'请选择部门',
                // 是否允许搜索
                allowSearch: true,
                select: function (item) {


                    if (!item || item.value == '-1') {
                        departmentId = '';
                    }
                    else {
                        departmentId = item.value;
                    }
                    page.search();
                }
            });

            // 刷新
            $('#sp_refresh').on('click', function () {
                location.reload();
            });
            // 新增
            $('#sp_add').on('click', function () {
                if (!companyId) {
                    sp.alert.warning('请选择公司！');
                    return false;
                }
                selectedRow = null;
                sp.layerForm({
                    id: 'form',
                    title: '添加账号',
                    url: top.$.rootUrl + '/LR_OrganizationModule/User/Form?companyId=' + companyId,
                    width: 750,
                    height: 450,
                    callBack: function (id) {
                        return top[id].acceptClick(refreshGirdData);
                    }
                });
            });
            // 编辑
            $('#sp_edit').on('click', function () {
                var keyValue = $('#gridtable').jfGridValue('F_UserId');
                selectedRow = $('#gridtable').jfGridGet('rowdata');
                if (sp.checkrow(keyValue)) {
                    sp.layerForm({
                        id: 'form',
                        title: '编辑账号',
                        url: top.$.rootUrl + '/LR_OrganizationModule/User/Form?companyId=' + companyId,
                        width: 750,
                        height: 450,
                        callBack: function (id) {
                            return top[id].acceptClick(refreshGirdData);
                        }
                    });
                }
            });
            // 删除
            $('#sp_delete').on('click', function () {
                var keyValue = $('#gridtable').jfGridValue('F_UserId');
                if (sp.checkrow(keyValue)) {
                    sp.layerConfirm('是否确认删除该项！', function (res) {
                        if (res) {
                            sp.deleteForm(top.$.rootUrl + '/LR_OrganizationModule/User/DeleteForm', { keyValue: keyValue }, function () {
                                refreshGirdData();
                            });
                        }
                    });
                }
            });
            // 用户数据导出
            $('#sp_export').on('click', function () {
                location.href = top.$.rootUrl + "/LR_OrganizationModule/User/ExportUserList";
            });
            // 启用
            $('#sp_enabled').on('click', function () {
                var keyValue = $('#gridtable').jfGridValue('F_UserId');
                if (sp.checkrow(keyValue)) {
                    sp.layerConfirm('是否确认要【启用】账号！', function (res) {
                        if (res) {
                            sp.postForm(top.$.rootUrl + '/LR_OrganizationModule/User/UpdateState', { keyValue: keyValue, state: 1 }, function () {
                                refreshGirdData();
                            });
                        }
                    });
                }
            });
            // 禁用
            $('#sp_disabled').on('click', function () {
                var keyValue = $('#gridtable').jfGridValue('F_UserId');
                if (sp.checkrow(keyValue)) {
                    sp.layerConfirm('是否确认要【禁用】账号！', function (res) {
                        if (res) {
                            sp.postForm(top.$.rootUrl + '/LR_OrganizationModule/User/UpdateState', { keyValue: keyValue, state: 0 }, function () {
                                refreshGirdData();
                            });
                        }
                    });
                }
            });
      
            // 重置账号
            $('#sp_resetpasspord').on('click', function () {
                var keyValue = $('#gridtable').jfGridValue('F_UserId');
                if (sp.checkrow(keyValue)) {
                    top.layer.prompt({ title: '请输入要重置修改的密码，并确认', formType: 0 }, function (pass, index) {
                        if (pass) {
                            sp.postForm(top.$.rootUrl + '/LR_OrganizationModule/User/ResetPasspord', { keyValue: keyValue, newpasspord: pass }, function () {
                            });
                        } 
                        top.layer.close(index);
                    });
                  
                }
            });
            // 功能授权
            $('#sp_authorize').on('click', function () {
                var keyValue = $('#gridtable').jfGridValue('F_UserId');
                selectedRow = $('#gridtable').jfGridGet('rowdata');
                if (sp.checkrow(keyValue)) {
                    sp.layerForm({
                        id: 'authorizeForm',
                        title: '功能授权 - ' + selectedRow.F_RealName,
                        url: top.$.rootUrl + '/LR_AuthorizeModule/Authorize/Form?objectId=' + keyValue + '&objectType=2',
                        width: 550,
                        height: 690,
                        btn: null
                    });
                }
            });
            // 移动功能授权
            $('#sp_appauthorize').on('click', function () {
                var keyValue = $('#gridtable').jfGridValue('F_UserId');
                selectedRow = $('#gridtable').jfGridGet('rowdata');
                if (sp.checkrow(keyValue)) {
                    sp.layerForm({
                        id: 'appAuthorizeForm',
                        title: '移动功能授权 - ' + selectedRow.F_RealName,
                        url: top.$.rootUrl + '/LR_AuthorizeModule/Authorize/AppForm?objectId=' + keyValue + '&objectType=2',
                        width: 550,
                        height: 690,
                        callBack: function (id) {
                            return top[id].acceptClick();
                        }
                    });
                }
            });
            // 数据授权
            $('#sp_dataauthorize').on('click', function () {
                var keyValue = $('#gridtable').jfGridValue('F_UserId');
                selectedRow = $('#gridtable').jfGridGet('rowdata');
                if (sp.checkrow(keyValue)) {
                    sp.layerForm({
                        id: 'dataAuthorizeForm',
                        title: '数据授权 - ' + selectedRow.F_RealName,
                        url: top.$.rootUrl + '/LR_AuthorizeModule/DataAuthorize/Index?objectId=' + keyValue + '&objectType=2',
                        width: 1100,
                        height: 700,
                        maxmin: true,
                        btn: null
                    });
                }
            });

            // 设置Ip过滤
            $('#sp_ipfilter').on('click', function () {
                var keyValue = $('#gridtable').jfGridValue('F_UserId');
                selectedRow = $('#gridtable').jfGridGet('rowdata');
                if (sp.checkrow(keyValue)) {
                    sp.layerForm({
                        id: 'filterIPIndex',
                        title: 'TCP/IP 地址访问限制 - ' + selectedRow.F_RealName,
                        url: top.$.rootUrl + '/LR_AuthorizeModule/FilterIP/Index?objectId=' + keyValue + '&objectType=Uesr',
                        width: 600,
                        height: 400,
                        btn: null,
                        callBack: function (id) { }
                    });
                }
            });
            // 设置时间段过滤
            $('#sp_timefilter').on('click', function () {
                var keyValue = $('#gridtable').jfGridValue('F_UserId');
                selectedRow = $('#gridtable').jfGridGet('rowdata');
                if (sp.checkrow(keyValue)) {
                    sp.layerForm({
                        id: 'filterTimeForm',
                        title: '时段访问过滤 - ' + selectedRow.F_RealName,
                        url: top.$.rootUrl + '/LR_AuthorizeModule/FilterTime/Form?objectId=' + keyValue + '&objectType=Uesr',
                        width: 610,
                        height: 470,
                        callBack: function (id) {
                            return top[id].acceptClick();
                        }
                    });
                }
            });
        },
        inittree: function () {
            var mspTree =  $('#companyTree').sptree({
                url: top.$.rootUrl + '/LR_OrganizationModule/Company/GetTree',
                param: { parentId: '0' },
                nodeClick: page.treeNodeClick,
                initialCallback: function (data) {
                    if (data && $.isArray(data) && data.length > 0) {
                        $('#companyTree').sptreeSet('setValue', data[0]["id"]);
                    }
                }
            });
            
        },
        treeNodeClick: function (item) {
            companyId = item.id;
            $('#titleinfo').text(item.text);

            $('#department_select').spselectRefresh({
                // 访问数据接口地址
                url: top.$.rootUrl + '/LR_OrganizationModule/Department/GetTree',
                // 访问数据接口参数
                param: { companyId: companyId, parentId: '0' },
            });
            departmentId = '';
            page.search();
        },
        initGrid: function () {
            $('#gridtable').spAuthorizeJfGrid({
                url: top.$.rootUrl + '/LR_OrganizationModule/User/GetPageList',
                headData: [
                        { label: '账户', name: 'F_Account', width: 100, align: 'left' },
                        { label: '姓名', name: 'F_RealName',  width: 160, align: 'left' },
                        {
                            label: '性别', name: 'F_Gender', width: 45, align: 'center',
                            formatter: function (cellvalue) {
                                return cellvalue == 0 ? "女" : "男";
                            }
                        },
                        { label: '手机', name: 'F_Mobile', width: 100, align: 'center'},
                        {
                            label: '部门', name: 'F_DepartmentId', width: 100, align: 'left',
                            formatterAsync: function (callback, value, row) {
                                sp.clientdata.getAsync('department', {
                                    key: value,
                                    callback: function (item) {
                                        callback(item.name);
                                    }
                                });
                            }
                        },
                        {
                            label: "状态", name: "F_EnabledMark", index: "F_EnabledMark", width: 50, align: "center",
                            formatter: function (cellvalue) {
                                if (cellvalue == 1) {
                                    return '<span class=\"label label-success\" style=\"cursor: pointer;\">正常</span>';
                                } else if (cellvalue == 0) {
                                    return '<span class=\"label label-default\" style=\"cursor: pointer;\">禁用</span>';
                                }
                            }
                        },
                        { label: "备注", name: "F_Description", index: "F_Description", width: 200, align: "left" }

                ],
                isPage: true,
                reloadSelected: true,
                mainId: 'F_UserId'
            });
        },
        search: function (param) {
            param = param || {};
            param.companyId = companyId;
            param.departmentId = departmentId;
            $('#gridtable').jfGridSet('reload', param);
        }
    };

    refreshGirdData = function () {
        var keyword = $('#txt_Keyword').val();
        page.search({ keyword: keyword });
    };

    page.init();
}


