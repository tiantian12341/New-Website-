/*
 * 版 本 Sprann ADMS V1.0.0 敏捷开发框架(http://www.sp.cn)
 * Copyright (c) 2017-2018 思普瑞云(深圳)科技有限公司
 * 创建人：力软-前端开发组
 * 日 期：2017.04.18
 * 描 述：人员选择	
 */
var acceptClick;
var dfopid = request('dfopid');
var userName = '';
var bootstrap = function ($, sp) {
    "use strict";
    var page = {
        init: function () {
            page.bind();
        },
        bind: function () {
            $('#userId').spselect({
                value: 'F_UserId',
                text: 'F_RealName',
                title: 'F_RealName',
                // 展开最大高度
                maxHeight: 110,
                // 是否允许搜索
                allowSearch: true,
                select: function (item) {
                    if (!!item) {
                        userName = item.F_RealName;
                    }
                    else {
                        userName = '';
                    }
                }
            });
            $('#department').spDepartmentSelect({
                maxHeight: 150
            }).on('change', function () {
                var value = $(this).spselectGet();
                $('#userId').spselectRefresh({
                    url: top.$.rootUrl + '/LR_OrganizationModule/User/GetList',
                    param: { departmentId: value }
                });
            });
        }
    };
    // 保存数据
    acceptClick = function (callBack) {
        if (!$('#form').spValidform()) {
            return false;
        }
        var formData = $('#form').spGetFormData();
        var postitem = { value: formData.userId, text: userName };
        callBack(postitem, dfopid);
        return true;
    };
    page.init();
}