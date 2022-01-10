/*
 * 版 本 Sprann ADMS V1.0.0 敏捷开发框架(http://www.sp.cn)
 * Copyright (c) 2017-2018 思普瑞云(深圳)科技有限公司
 * 创建人：力软-前端开发组
 * 日 期：2017.04.11
 * 描 述：清空日志管理	
 */
var categoryId = request('categoryId');
var acceptClick;
var bootstrap = function ($, sp) {
    "use strict";

    var page = {
        init: function () {
            $('#keepTime').spselect({maxHeight:75,placeholder:false}).spselectSet(7);
        }
    };
    // 保存数据
    acceptClick = function (callBack) {
        if (!$('#form').spValidform()) {
            return false;
        }
        var postData = $('#form').spGetFormData();
        postData['categoryId'] = categoryId;
        $.spSaveForm(top.$.rootUrl + '/LR_SystemModule/Log/SaveRemoveLog', postData, function (res) {
            // 保存成功后才回调
            if (!!callBack) {
                callBack();
            }
        });
    };
    page.init();
}