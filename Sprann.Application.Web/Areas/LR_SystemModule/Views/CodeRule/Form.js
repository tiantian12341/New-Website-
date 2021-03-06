/*
 * 版 本 Sprann ADMS V1.0.0 敏捷开发框架(http://www.sp.cn)
 * Copyright (c) 2017-2018 思普瑞云(深圳)科技有限公司
 * 创建人：力软-前端开发组
 * 日 期：2017.04.11
 * 描 述：单据编号	
 */
var acceptClick;
var keyValue = '';
var currentColRow = null;
var bootstrap = function ($, sp) {
    "use strict";
    var selectedRow = sp.frameTab.currentIframe().selectedRow;

    var page = {
        init: function () {
            page.bind();
            page.initData();
        },
        bind: function () {
            $('#sp_add_format').on('click', function () {
                currentColRow = null;
                sp.layerForm({
                    id: 'FormatForm',
                    title: '添加',
                    url: top.$.rootUrl + '/LR_SystemModule/CodeRule/FormatForm',
                    width: 450,
                    height: 310,
                    callBack: function (id) {
                        return top[id].acceptClick(function (data) {
                            $('#gridtable').jfGridSet('addRow', data);
                        });
                    }
                });
            });
            $('#sp_edit_format').on('click', function () {
                currentColRow = $('#gridtable').jfGridGet('rowdata');
                var _id = currentColRow ? currentColRow.itemTypeName : '';
                if (sp.checkrow(_id)) {
                    sp.layerForm({
                        id: 'FormatForm',
                        title: '修改',
                        url: top.$.rootUrl + '/LR_SystemModule/CodeRule/FormatForm',
                        width: 450,
                        height: 310,
                        callBack: function (id) {
                            return top[id].acceptClick(function (data) {
                                $.extend(currentColRow, data);
                                $('#gridtable').jfGridSet('updateRow');
                            });
                        }
                    });
                }
                
            });
            $('#sp_delete_format').on('click', function () {
                currentColRow = null;
                var row = $('#gridtable').jfGridGet('rowdata');
                var _id = row ? row.itemTypeName : '';
                if (sp.checkrow(_id)) {
                    sp.layerConfirm('是否确认删除该项！', function (res, index) {
                        if (res) {
                            $('#gridtable').jfGridSet('removeRow');
                            top.layer.close(index); //再执行关闭  
                        }
                    });
                }
            });

            $('#gridtable').jfGrid({
                headData: [
                    { label: "前缀", name: "itemTypeName", width: 140, align: "left" },
                    { label: "格式", name: "formatStr", width: 140, align: "left" },
                    { label: "步长", name: "stepValue", width: 80, align: "center" },
                    { label: "初始值", name: "initValue", width: 80, align: "center" },
                    { label: "说明", name: "description", width: 100, align: "left" }
                ]
            });

            /*检测重复项*/
            $('#F_EnCode').on('blur', function () {
                $.spExistField(keyValue, 'F_EnCode', top.$.rootUrl + '/LR_SystemModule/CodeRule/ExistEnCode');
            });
            $('#F_FullName').on('blur', function () {
                $.spExistField(keyValue, 'F_FullName', top.$.rootUrl + '/LR_SystemModule/CodeRule/ExistFullName');
            });
        },
        initData: function () {
            if (!!selectedRow) {
                keyValue = selectedRow.F_RuleId;
                $('#form1').spSetFormData(selectedRow);
                var formatdata = JSON.parse(selectedRow.F_RuleFormatJson);
                $('#gridtable').jfGridSet('refreshdata', formatdata);
            }
        }
    };
    // 保存数据
    acceptClick = function (callBack) {
        if (!$('#form1').spValidform()) {
            return false;
        }
        var postData = $('#form1').spGetFormData(keyValue);
        var formatdata = $('#gridtable').jfGridGet('rowdatas');
        if (formatdata.length == 0) {
            sp.alert.error('请设置规则！');
            return false;
        }
        postData.F_RuleFormatJson = JSON.stringify(formatdata);
        $.spSaveForm(top.$.rootUrl + '/LR_SystemModule/CodeRule/SaveForm?keyValue=' + keyValue, postData, function (res) {
            if (!!callBack) {
                callBack();
            }
        });
    };
    page.init();
}