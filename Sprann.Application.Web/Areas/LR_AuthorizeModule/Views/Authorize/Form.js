/*
 * 版 本 Sprann ADMS V1.0.0 敏捷开发框架(http://www.sp.cn)
 * Copyright (c) 2017-2018 思普瑞云(深圳)科技有限公司
 * 创建人：力软-前端开发组
 * 日 期：2017.04.05
 * 描 述：功能模块	
 */
var objectId = request('objectId');
var objectType = request('objectType');

var bootstrap = function ($, sp) {
    "use strict";

    var selectData;

    var treeData;
    var checkModuleIds = [];

    function setTreeData1() {
        if (!!selectData) {
            $('#step-1').sptreeSet('setCheck', selectData.modules);
        }
        else {
            setTimeout(setTreeData1,100);
        }
    }
    function setTreeData2() {
        if (!!selectData) {
            $('#step-2').sptreeSet('setCheck', selectData.buttons);
        }
        else {
            setTimeout(setTreeData2, 100);
        }
    }
    function setTreeData3() {
        if (!!selectData) {
            $('#step-3').sptreeSet('setCheck', selectData.columns);
        }
        else {
            setTimeout(setTreeData3, 100);
        }
    }
    function setTreeData4() {
        if (!!selectData) {
            $('#step-4').sptreeSet('setCheck', selectData.forms);
        }
        else {
            setTimeout(setTreeData4, 100);
        }
    }

    var page = {
        init: function () {
            page.bind();
            page.initData();
        },
        /*绑定事件和初始化控件*/
        bind: function () {
            sp.httpAsyncGet(top.$.rootUrl + '/LR_SystemModule/Module/GetCheckTree', function (res) {
                if (res.code == 200) {
                    treeData = res.data;
                    setTimeout(function () {
                        $('#step-1').sptree({
                            data: treeData.moduleList
                        });
                        if (!!objectId) {
                            setTreeData1();
                        }
                    }, 10);
                    setTimeout(function () {
                        $('#step-2').sptree({
                            data: treeData.buttonList
                        });
                        if (!!objectId) {
                            setTreeData2();
                        }
                    }, 50);
                    setTimeout(function () {
                        $('#step-3').sptree({
                            data: treeData.columnList
                        });
                        if (!!objectId) {
                            setTreeData3();
                        }
                    }, 90);
                    setTimeout(function () {
                        $('#step-4').sptree({
                            data: treeData.formList
                        });
                        if (!!objectId) {
                            setTreeData4();
                        }
                    }, 200);
                }
            });
            // 加载导向
            $('#wizard').wizard().on('change', function (e, data) {
                var $finish = $("#btn_finish");
                var $next = $("#btn_next");
                if (data.direction == "next") {
                    if (data.step == 1) {
                        checkModuleIds = $('#step-1').sptreeSet('getCheckNodeIds');
                        $('#step-2 .sp-tree-root [id$="_sp_moduleId"]').parent().hide();
                        $('#step-3 .sp-tree-root [id$="_sp_moduleId"]').parent().hide();
                        $('#step-4 .sp-tree-root [id$="_sp_moduleId"]').parent().hide();
                        $.each(checkModuleIds, function (id, item) {
                            $('#step-2_' + item.replace(/-/g, '_') + '_sp_moduleId').parent().show();
                            $('#step-3_' + item.replace(/-/g, '_') + '_sp_moduleId').parent().show();
                            $('#step-4_' + item.replace(/-/g, '_') + '_sp_moduleId').parent().show();
                        });
                    } else if (data.step == 3) {
                       
                        $finish.removeAttr('disabled');
                        $next.attr('disabled', 'disabled');
                    } else {
                        $finish.attr('disabled', 'disabled');
                    }
                } else {
                    $finish.attr('disabled', 'disabled');
                    $next.removeAttr('disabled');
                }
            });
            // 保存数据按钮
            $("#btn_finish").on('click', page.save);
        },
        /*初始化数据*/
        initData: function () {
            if (!!objectId) {
                $.spSetForm(top.$.rootUrl + '/LR_AuthorizeModule/Authorize/GetFormData?objectId=' + objectId, function (data) {//
                    selectData = data;
                });
            }
        },
        /*保存数据*/
        save: function () {
            var buttonList = [], columnList = [],formList = [];
            var checkButtonIds = $('#step-2').sptreeSet('getCheckNodeIds');
            var checkColumnIds = $('#step-3').sptreeSet('getCheckNodeIds');
            var checkFormIds = $('#step-4').sptreeSet('getCheckNodeIds');


            $.each(checkButtonIds, function (id, item) {
                if (item.indexOf('_sp_moduleId') == -1) {
                    buttonList.push(item);
                }
            });
            $.each(checkColumnIds, function (id, item) {
                if (item.indexOf('_sp_moduleId') == -1) {
                    columnList.push(item);
                }
            });
            $.each(checkFormIds, function (id, item) {
                if (item.indexOf('_sp_moduleId') == -1) {
                    formList.push(item);
                }
            });


            var postData = {
                objectId: objectId,
                objectType: objectType,
                strModuleId: String(checkModuleIds),
                strModuleButtonId: String(buttonList),
                strModuleColumnId: String(columnList),
                strModuleFormId: String(formList)
            };

            $.spSaveForm(top.$.rootUrl + '/LR_AuthorizeModule/Authorize/SaveForm', postData, function (res) {});
        }
    };

    page.init();
}