/*
 * 版 本 Sprann ADMS V1.0.0 敏捷开发框架(http://www.sp.cn)
 * Copyright (c) 2017-2018 思普瑞云(深圳)科技有限公司
 * 创建人：力软-前端开发组
 * 日 期：2017.04.11
 * 描 述：列表字段添加	
 */
var id = request('id');

var acceptClick;
var bootstrap = function ($, sp) {
    "use strict";
    var formscheme = top.layer_Form.formscheme;
    var formFields = top.layer_Form.formFields;
    var colData = top.layer_Form.colData;


    var fieldName = '';
    var compontId = '';

    var page = {
        init: function () {
            page.bind();
            page.initData();
        },
        bind: function () {
            $('#fieldId').spselect({
                text: 'title',
                value: 'field',
                data: formFields,
                allowSearch: true,
                select: function (item) {
                    fieldName = item.title;
                    compontId = item.id;
                }
            });
            // 所在行所占比
            $('#align').spselect().spselectSet('left');
        },
        initData: function () {
            if (!!id) {
                for (var i = 0, l = colData.length; i < l; i++) {
                    if (colData[i].id == id) {
                        $('#form').spSetFormData(colData[i]);
                        break;
                    }
                }
            }
        }
    };
    // 保存数据
    acceptClick = function (callBack) {
        if (!$('#form').spValidform()) {
            return false;
        }
        var postData = $('#form').spGetFormData();
        postData.id = id || sp.newGuid();
        postData.fieldName = fieldName;
        postData.compontId = compontId;
        callBack(postData);
        return true;
    };
    page.init();
}