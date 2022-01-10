/*
 * 版 本 Sprann ADMS V1.0.0 敏捷开发框架(http://www.sp.cn)
 * Copyright (c) 2017-2018 思普瑞云(深圳)科技有限公司
 * 创建人：力软-前端开发组
 * 日 期：2017.03.22
 * 描 述：接口管理	
 */
var refreshGirdData; // 更新数据
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
                    id: 'InterfaceForm',
                    title: '添加接口',
                    url: top.$.rootUrl + '/LR_SystemModule/Interface/Form',
                    width: 700,
                    height: 400,
                    callBack: function (id) {
                        return top[id].acceptClick(refreshGirdData);
                    }
                });
            });
            // 编辑
            $('#sp_edit').on('click', function () {
                var keyValue = $('#gridtable').jfGridValue('F_Id');
                if (sp.checkrow(keyValue)) {
                    sp.layerForm({
                        id: 'InterfaceForm',
                        title: '编辑接口',
                        url: top.$.rootUrl + '/LR_SystemModule/Interface/Form?keyValue=' + keyValue,
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
                var keyValue = $('#gridtable').jfGridValue('F_Id');
                if (sp.checkrow(keyValue)) {
                    sp.layerConfirm('是否确认删除该项！', function (res) {
                        if (res) {
                            sp.deleteForm(top.$.rootUrl + '/LR_SystemModule/Interface/DeleteForm', { keyValue: keyValue }, function () {
                                refreshGirdData();
                            });
                        }
                    });
                }
            });
        },
        initGrid: function () {
            $('#gridtable').spAuthorizeJfGrid({
                url: top.$.rootUrl + '/LR_SystemModule/Interface/GetPageList',
                headData: [
                    { label: '接口名称', name: 'F_Name', width: 200, align: 'left' },
                    { label: '接口地址', name: 'F_Address', width: 500, align: 'left' }
                ],
                isPage: true,
                mainId: 'F_Id',
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


