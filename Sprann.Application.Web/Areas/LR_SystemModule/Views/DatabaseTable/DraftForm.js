/* * 版 本 Sprann ADMS V1.0.0 敏捷开发框架(http://www.sp.cn)
 * Copyright (c) 2017-2018 思普瑞云(深圳)科技有限公司
 * 创建人：超级管理员
 * 日  期：2017-12-12 11:52
 * 描  述：数据表草稿管理
 */
var selectedRow;
var acceptClick;
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
            // 删除
            $('#sp_delete').on('click', function () {
                var keyValue = $('#gridtable').jfGridValue('F_Id');
                if (sp.checkrow(keyValue)) {
                    sp.layerConfirm('是否确认删除！', function (res) {
                        if (res) {
                            sp.deleteForm(top.$.rootUrl + '/LR_SystemModule/DatabaseTable/DeleteDraft', { keyValue: keyValue }, function () {
                                page.search();
                            });
                        }
                    });
                }
            });
        },
        initGrid: function () {
            $('#gridtable').jfGrid({
                url: top.$.rootUrl + '/LR_SystemModule/DatabaseTable/GetDraftList',
                headData: [
                    { label: '表名', name: 'F_Name', width: 180, align: 'left' },
                    { label: '表备注', name: 'F_Remark', width: 180, align: 'left' },

                    { label: '创建人', name: 'F_CreateUserName', width: 100, align: "center" },
                    {
                        label: "创建时间", name: "F_CreateDate", width: 120, align: "center",
                        formatter: function (cellvalue) {
                            return sp.formatDate(cellvalue, 'yyyy-MM-dd hh:mm');
                        }
                    }
                ],
                mainId: 'F_Id',
                onSelectRow: function (rowdata) {
                    selectedRow = rowdata;
                },
                reloadSelected: true
            });
            page.search();
        },
        search: function (param) {
            param = param || {};
            $('#gridtable').jfGridSet('reload', { queryJson: JSON.stringify(param) });
        }
    };
    page.init();

    // 保存数据
    acceptClick = function (callBack) {
        callBack(selectedRow);
        return true;
    };
}
