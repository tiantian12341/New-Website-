/*
 * 版 本 sp-ADMS V6.1.6.0 思普瑞云(http://www.sp.cn)
 * Copyright (c) 2013-2017 上海力软信息技术有限公司
 * 创建人：力软-前端开发组
 * 日 期：2017.06.20
 * 描 述：文件管理	
 */
var keyValue = request('keyValue');

var acceptClick;
var bootstrap = function ($, sp) {
    "use strict";

    var Extension = "";
    var page = {
        init: function () {
            page.initControl();
        },
        //初始化控件
        initControl: function () {
            console.log(keyValue);
            //获取表单
            if (!!keyValue) {
                $.spSetForm(top.$.rootUrl + "/LR_OAModule/ResourceFile/GetFileFormJson?keyValue=" + keyValue, function (data) {//
                    console.log(data);
                    $('#form').spSetFormData(data);
                    Extension = data.F_FileExtensions;
                    var FileName = data.F_FileName.replace(Extension, '');
                    $("#FileName").val(F_FileName).focus().select();
                });
            }
        }
    };
    //保存表单
    acceptClick = function (callBack) {
        if (!$('#form').spValidform()) {
            return false;
        }
        var postData = $("#form").spGetFormData(keyValue);
        postData["keyValue"] = keyValue;
        postData["F_FileName"] = $("#F_FileName").val() + Extension;
        $.spSaveForm(top.$.rootUrl + '/LR_OAModule/ResourceFile/SaveFileForm', postData, function (res) {
            // 保存成功后才回调
            if (!!callBack) {
                callBack();
            }
        });
    }
    page.init();
}


