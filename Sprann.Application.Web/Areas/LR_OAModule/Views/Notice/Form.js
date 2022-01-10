/*
 * 版 本 Sprann ADMS V1.0.0 敏捷开发框架(http://www.sp.cn)
 * Copyright (c) 2017-2018 思普瑞云(深圳)科技有限公司
 * 创建人：力软-前端开发组
 * 日 期：2017.11.11
 * 描 述：公告通知
 */
var acceptClick;
var keyValue = '';
var bootstrap = function ($, sp) {
    "use strict";
    var selectedRow = sp.frameTab.currentIframe().selectedRow;
    var ue;
    var page = {
        init: function () {
            page.bind();
            page.initData();
        },
        bind: function () {
            //公告类别
            $('#F_CategoryId').spDataItemSelect({ code: 'NoticeCategory', maxHeight: 230 });
            //内容编辑器
            ue = UE.getEditor('editor');
        },
        initData: function () {
            if (!!selectedRow) {
                keyValue = selectedRow.F_NewsId;
                $('#form').spSetFormData(selectedRow);
                $("#F_ReleaseTime").val(sp.formatDate(selectedRow.F_ReleaseTime, 'yyyy/MM/dd hh:mm'));
                $.spSetForm(top.$.rootUrl + '/LR_OAModule/Notice/GetEntity?keyValue=' + keyValue, function (data) {
                    setTimeout(function () {
                        ue.setContent(data.F_NewsContent);
                    }, 100);
                });
            }
        }
    };
    acceptClick = function (callBack) {
        if (!$('#form').spValidform()) {
            return false;
        }
        var postData = $('#form').spGetFormData(keyValue);
        postData["F_NewsContent"] = ue.getContent(null, null, true);
        $.spSaveForm(top.$.rootUrl + '/LR_OAModule/Notice/SaveForm?keyValue=' + keyValue, postData, function (res) {
            // 保存成功后才回调
            if (!!callBack) {
                callBack();
            }
        });
    }

    page.init();
}


