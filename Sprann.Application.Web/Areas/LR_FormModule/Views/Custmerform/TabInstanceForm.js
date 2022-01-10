﻿/*
 * 版 本 Sprann ADMS V1.0.0 敏捷开发框架(http://www.sp.cn)
 * Copyright (c) 2017-2018 思普瑞云(深圳)科技有限公司
 * 创建人：力软-前端开发组
 * 日 期：2017.04.17
 * 描 述：自定义表单
 */
var id = request('id');
var keyValue = request('keyValue');
var acceptClick;

var bootstrap = function ($, sp) {
    "use strict";
    var formModule;
    var girdCompontMap;

    var page = {
        init: function () {
            if (!!id) {
                $.spSetForm(top.$.rootUrl + '/LR_FormModule/Custmerform/GetFormData?keyValue=' + id, function (data) {//
                    formModule = JSON.parse(data.schemeEntity.F_Scheme);
                    girdCompontMap = $('body').spCustmerFormRender(formModule.data);
                    page.bind();
                });
            }
            page.initData();

        },
        initData: function () {
            if (!!keyValue) {
                $.spSetForm(top.$.rootUrl + '/LR_FormModule/Custmerform/GetInstanceForm?schemeInfoId=' + id + '&keyValue=' + keyValue, function (data) {//
                    page.setFormData(data);
                });
            }
        },
        setFormData: function (data) {
            if (!!formModule) {
                $.each(data, function (id, item) {
                    if (!!girdCompontMap[id]) {
                        var fieldMap = {};
                        $.each(girdCompontMap[id].fieldsData, function (id, girdFiled) {
                            if (!!girdFiled.field) {
                                fieldMap[girdFiled.field.toLowerCase()] = girdFiled.field;
                            }
                        });
                        var rowDatas = [];
                        for (var i = 0, l = item.length; i < l; i++) {
                            var _point = {};
                            for (var _field in item[i]) {
                                _point[fieldMap[_field]] = item[i][_field];
                            }
                            rowDatas.push(_point);
                        }
                        $('#' + girdCompontMap[id].id).jfGridSet('refreshdata', rowDatas);
                    }
                    else {
                        $('body').spSetCustmerformData(item[0],id);
                    }
                });
            }
            else {
                setTimeout(function () {
                    page.setFormData(data);
                }, 100);
            }
        },
        bind: function () {
            // 保存数据
            $('#savaAndAdd').on('click', function () {
                acceptClick(0);
            });
            $('#save').on('click', function () {
                acceptClick(1);
            });
        }
    };
    page.init();

    // 保存数据
    acceptClick = function (type) {// 0保存并新增 1保存
        if (!$.spValidCustmerform()) {
            return false;
        }
        var formData = $('body').spGetCustmerformData(keyValue);
        var postData =
        {
            formData: JSON.stringify(formData)
        };
        $.spSaveForm(top.$.rootUrl + '/LR_FormModule/Custmerform/SaveInstanceForm?keyValue=' + keyValue + "&schemeInfoId=" + id, postData, function (res) {
            if (res.code == 200) {
                sp.frameTab.parentIframe().refreshGirdData();
                if (type == 0) {
                    window.location.href = top.$.rootUrl + '/LR_FormModule/Custmerform/TabInstanceForm?id=' + id;
                }
                else {
                    sp.frameTab.close(sp.frameTab.iframeId);
                }
            }
        });
    };
}