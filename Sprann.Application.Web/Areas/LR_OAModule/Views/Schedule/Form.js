/*
 * 版 本 Sprann ADMS V1.0.0 敏捷开发框架(http://www.sp.cn)
 * Copyright (c) 2017-2018 思普瑞云(深圳)科技有限公司
 * 创建人：力软-前端开发组
 * 日 期：2017.11.11
 * 描 述：日程管理
 */
var acceptClick;
var bootstrap = function ($, sp) {
    "use strict";
    var page = {
        init: function () {
            page.bind();
            page.initData();
        },
        bind: function () {
            //开始时间
            $('#F_StartTime').spselect({
                maxHeight: 150
            });
            //结束时间
            $('#F_EndTime').spselect({
                maxHeight: 150
            });
        },
        initData: function () {
            $("#F_StartDate").val(request('startDate'));
            $("#F_StartTime").spselectSet(request('startTime'));
        }
    };
    acceptClick = function () {
        if (!$('#form').spValidform()) {
            return false;
        }
        var postData = $('#form').spGetFormData("");
        $.spSaveForm(top.$.rootUrl + '/LR_OAModule/Schedule/SaveForm?keyValue=', postData, function (res) {
            sp.frameTab.currentIframe().location.reload();
        });
    }
    page.init();
}


