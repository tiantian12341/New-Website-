/*
 * 版 本 Sprann ADMS V1.0.0 敏捷开发框架(http://www.sp.cn)
 * Copyright (c) 2017-2018 思普瑞云(深圳)科技有限公司
 * 创建人：力软-前端开发组
 * 日 期：2017.04.17
 * 描 述：导入配置
 */
var keyValue = request('keyValue');
var moduleId = request('moduleId');
var currentData;

var acceptClick;
var bootstrap = function ($, sp) {
    "use strict";
    var cols = [];
    var dbTable = '';
    var dbId = '';
    var btnName = '';

    function setDes(row, data) {
        var type = Number(data.F_RelationType);
        switch (type) {
            case 0://无关联
                row.F_Description = '无关联';
                break;
            case 1://GUID
                row.F_Description = '系统产生GUID';
                break;
            case 2://数据字典
                row.F_Description = '关联数据字典';
                break;
            case 3://数据表
                row.F_Description = '关联数据表';
                break;
            case 4://固定值
                row.F_Description = '固定数值/' + data.F_Value;
                break;
            case 5://操作人ID
                row.F_Description = '登录者ID';
                break;
            case 6://操作人名字
                row.F_Description = '登录者名字';
                break;
            case 7://操作时间
                row.F_Description = '导入时间';
                break;
        }

    }

    var page = {
        init: function () {
            page.bind();
            page.initData();
        },
        bind: function () {
            $('#F_ModuleBtnId').spselect({
                url: top.$.rootUrl + '/LR_SystemModule/Module/GetButtonListNoAuthorize',
                param: {
                    moduleId: moduleId
                },
                value: 'F_EnCode',
                text: 'F_FullName',
                select: function (item) {
                    if (!!item) {
                        btnName = item.F_FullName
                    }
                    else {
                        btnName = '';
                    }
                   
                }
            });
            $('#F_ErrorType').spselect({ placeholder: false }).spselectSet('1');
            $('#gridtable').jfGrid({
                headData: [
                    { label: "字段", name: "F_Name", width: 170, align: "left" },
                    { label: "Excel列名", name: "F_ColName", width: 170, align: "left" },
                    {
                        label: "唯一性", name: "F_OnlyOne", width: 60, align: "center", formatter: function (cellVal, row, dfop, $dcell) {
                            return cellVal == "0" ? "无" : "组成";
                        }
                    },
                    { label: "描述", name: "F_Description", width: 180, align: "left"},
                    {
                        label: "", name: "F_Op", width: 50, align: "center",
                        formatter: function (cellvalue, row, dfop, $dcell) {
                            $dcell.on('click', function () {
                                currentData = row;
                                sp.layerForm({
                                    id: 'SetFieldForm',
                                    title: '设置字段属性【' + row.F_Name + '】',
                                    url: top.$.rootUrl + '/LR_SystemModule/ExcelImport/SetFieldForm',
                                    width: 500, height: 360,
                                    callBack: function (id) {
                                        return top[id].acceptClick(function (data) {
                                            row.F_RelationType = data.F_RelationType;
                                            row.F_Value = data.F_Value;
                                            row.F_OnlyOne = data.F_OnlyOne;
                                            row.F_DataItemCode = data.F_DataItemCode;
                                            row.F_DataSourceId = data.F_DataSourceId;
                                            setDes(row, data);
                                            $('#gridtable').jfGridSet('refreshdata', cols);
                                        });
                                    }
                                });
                            });
                            return '<span class=\"label label-success \" style=\"cursor: pointer;\">设置</span>';
                        }
                    }
                ]
            });
            $('#sp_filedtree').sptree({
                nodeCheck: function (item) {
                    if (item.checkstate == '1') {
                        var point = {
                            F_Name: item.value,
                            F_ColName: item.title,
                            F_OnlyOne: 0,
                            F_SortCode: cols.length,
                            F_RelationType: 0,
                            F_DataItemCode: '',
                            F_DataSourceId: '',
                            F_Value:'',
                            F_Description: '无关联',
                            
                        };
                        cols.push(point);
                    }
                    else {
                        for (var i = 0, l = cols.length; i < l; i++) {
                            if (cols[i].F_Name == item.value) {
                                cols.splice(i, 1);
                                break;
                            }
                        }
                    }
                    $('#gridtable').jfGridSet('refreshdata', cols);
                }
            });
            $('#sp_dbtree').sptree({
                url: top.$.rootUrl + '/LR_SystemModule/DatabaseTable/GetTreeList',
                nodeClick: function (item) {
                    if (!item.hasChildren) {
                        dbTable = item.text;
                        dbId = item.value;
                        sp.httpAsync('GET', top.$.rootUrl + '/LR_SystemModule/DatabaseTable/GetFieldTreeList', { databaseLinkId: item.value, tableName: item.text }, function (res) {
                            cols.length = 0;
                            $('#gridtable').jfGridSet('refreshdata', cols);
                            $('#sp_filedtree').sptreeSet('refresh', { data: res });
                            $('#sp_filedtree').sptreeSet('allCheck');
                        });
                    }
                    else {
                        dbTable = '';
                        dbId = '';
                        $('#sp_filedtree').sptreeSet('refresh', { data: [] });
                    }
                }
            });
            
        },
        initData: function () {
            $('#F_ModuleId').val(moduleId);
            if (!!keyValue) {
                $.spSetForm(top.$.rootUrl + '/LR_SystemModule/ExcelImport/GetFormData?keyValue=' + keyValue, function (data) {//
                    $('#F_ModuleBtnId').spselectRefresh({
                        param: {
                            moduleId: data.entity.F_ModuleId
                        }
                    });
                    $('.sp-form-layout-header').spSetFormData(data.entity);
                    dbTable = data.entity.F_DbTable;
                    dbId = data.entity.F_DbId;
                    cols = data.list;
                    
                    sp.httpAsync('GET', top.$.rootUrl + '/LR_SystemModule/DatabaseTable/GetFieldTreeList', { databaseLinkId: dbId, tableName: dbTable }, function (res) {
                        var map = {};
                        $.each(cols, function (id, item) {
                            map[item.F_Name] = "1"; //设置字段选中
                            setDes(item, item);
                        });
                        $('#gridtable').jfGridSet('refreshdata', cols);
                        $.each(res, function (id, item) {
                            if (!!map[item.value]) {
                                item.checkstate = '1';  //绑定字段选中
                            }
                        });
                        $('#sp_filedtree').sptreeSet('refresh', { data: res });
                    });
                });
            }
        }
    };

    acceptClick = function (callBack) {
        if (!$('.sp-form-layout-header').spValidform()) {
            return false;
        }
        if (cols.length == 0) {
            sp.alert.error('请添加设置字段');
            return false;
        }
        var formData = $('.sp-form-layout-header').spGetFormData(keyValue);
        formData.F_DbId = dbId;
        formData.F_DbTable = dbTable;
        formData.F_BtnName = btnName;
        //console.log(cols);
        var postData = {
            keyValue: keyValue,
            strEntity: JSON.stringify(formData),
            strList: JSON.stringify(cols)
        };
        $.spSaveForm(top.$.rootUrl + '/LR_SystemModule/ExcelImport/SaveForm', postData, function (res) {
            // 保存成功后才回调
            if (!!callBack) {
                callBack();
            }
        });
    }
    page.init();


   
}
