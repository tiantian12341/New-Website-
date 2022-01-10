/*
 * 版 本 Sprann ADMS V1.0.0 敏捷开发框架(http://www.sp.cn)
 * Copyright (c) 2017-2018 思普瑞云(深圳)科技有限公司
 * 创建人：力软-前端开发组
 * 日 期：2017.04.18
 * 描 述：单据编号规则	
 */
var acceptClick;
var currentColRow = top.layer_InterfaceForm.currentColRow;
var bootstrap = function ($, sp) {
    "use strict";

    var page = {
        init: function () {
            page.bind();
            page.initData();
        },
        bind: function () {
            $('#fieldType').spDataItemSelect({ code: 'FieldType',maxHeight:100 });
        },
        initData: function () {
            if (!!currentColRow) {
                $('#form').spSetFormData(currentColRow);
            }
        }
    };
    // 保存数据
    acceptClick = function (callBack) {
        if (!$('#form').spValidform()) {
            return false;
        }
        var data = $('#form').spGetFormData();
        if (!!callBack) { callBack(data); }
        return true;
    };
    page.init();
}