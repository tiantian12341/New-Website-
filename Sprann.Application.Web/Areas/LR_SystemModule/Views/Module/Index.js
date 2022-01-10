/*
 * 日 期：2017.03.22
 * 描 述：功能模块	
 */
var refreshGirdData; // 更新数据
var bootstrap = function ($, sp) {
    "use strict";
    var moduleId = '0';
    var page = {
        init: function () {
            page.inittree();
            page.initGrid();
            page.bindEvent();
        },
        bindEvent: function () {
            // 查询
            $('#btn_Search').on('click', function () {
                var keyword = $('#txt_Keyword').val();
                page.search({ parentId: moduleId, keyword: keyword });
            });
            // 刷新
            $('#sp_refresh').on('click', function () {
                location.reload();
            });
            // 新增
            $('#sp_add').on('click', function () {
                sp.layerForm({
                    id: 'form',
                    title: '添加功能',
                    url: top.$.rootUrl + '/LR_SystemModule/Module/Form?moduleId=' + moduleId,
                    height: 430,
                    width: 700,
                    btn: null
                });
            });
            // 编辑
            $('#sp_edit').on('click', function () {
                var keyValue = $('#gridtable').jfGridValue('F_ModuleId');
                if (sp.checkrow(keyValue)) {
                    sp.layerForm({
                        id: 'form',
                        title: '编辑功能',
                        url: top.$.rootUrl + '/LR_SystemModule/Module/Form?keyValue=' + keyValue,
                        height: 430,
                        width: 700,
                        btn: null
                    });
                }
            });
            // 删除
            $('#sp_delete').on('click', function () {
                var keyValue = $('#gridtable').jfGridValue('F_ModuleId');
                if (sp.checkrow(keyValue)) {
                    sp.layerConfirm('是否确认删除该项！', function (res) {
                        if (res) {
                            sp.deleteForm(top.$.rootUrl + '/LR_SystemModule/Module/DeleteForm', { keyValue: keyValue }, function () {
                                refreshGirdData();
                            });
                        }
                    });
                }
            });
        },
        inittree: function () {
            $('#module_tree').sptree({
                url: top.$.rootUrl + '/LR_SystemModule/Module/GetModuleTree',
                nodeClick: page.treeNodeClick
            });
        },
        treeNodeClick: function (item) {
            moduleId = item.id;
            $('#titleinfo').text(item.text);
            page.search({ parentId: moduleId });
        },
        initGrid: function () {
            $('#gridtable').spAuthorizeJfGrid({
                url: top.$.rootUrl + '/LR_SystemModule/Module/GetModuleListByParentId',
                headData: [
                    { label: "编号", name: "F_EnCode", width: 150, align: "left" },
                    { label: "名称", name: "F_FullName", width: 150, align: "left" },
                    { label: "地址", name: "F_UrlAddress", width: 350, align: "left" },
                    { label: "目标", name: "F_Target", width: 60, align: "center" },
                    {
                        label: "菜单", name: "F_IsMenu", width: 50, align: "center",
                        formatter: function (cellvalue, rowObject) {
                            return cellvalue == 1 ? "<i class=\"fa fa-toggle-on\"></i>" : "<i class=\"fa fa-toggle-off\"></i>";
                        }
                    },
                    {
                        label: "展开", name: "F_AllowExpand", width: 50, align: "center",
                        formatter: function (cellvalue, rowObject) {
                            return cellvalue == 1 ? "<i class=\"fa fa-toggle-on\"></i>" : "<i class=\"fa fa-toggle-off\"></i>";
                        }
                    },
                    //{
                    //    label: "公共", name: "F_IsPublic", width: 50, align: "center",
                    //    formatter: function (cellvalue, rowObject) {
                    //        return cellvalue == 1 ? "<i class=\"fa fa-toggle-on\"></i>" : "<i class=\"fa fa-toggle-off\"></i>";
                    //    }
                    //},
                    {
                        label: "有效", name: "F_EnabledMark", width: 50, align: "center",
                        formatter: function (cellvalue, rowObject) {
                            return cellvalue == 1 ? "<i class=\"fa fa-toggle-on\"></i>" : "<i class=\"fa fa-toggle-off\"></i>";
                        }
                    },
                    { label: "描述", name: "F_Description", width: 200, align: "left" }
                ]
            });
            page.search({ parentId: moduleId });
        },
        search: function (param) {
            $('#gridtable').jfGridSet('reload', param);
        }
    };
    // 保存数据后回调刷新
    refreshGirdData = function () {
        page.search({ parentId: moduleId });
        //$('#module_tree').sptreeSet('refresh');
    }

    page.init();
}