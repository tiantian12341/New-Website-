/*
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
            // 刷新
            $('#sp_refresh').on('click', function () {
                refreshGirdData();
            });
        },
        initGrid: function () {
            $('#gridtable').jfGrid({
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
        },
        search: function (param) {
            param = param || {};
            $('#gridtable').jfGridSet('reload', { queryJson: JSON.stringify(param) });
        }

    };

    refreshGirdData = function () {
        page.search();
    };
    page.init();
}


