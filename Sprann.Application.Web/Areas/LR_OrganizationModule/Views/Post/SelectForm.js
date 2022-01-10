/*
 * 版 本 Sprann ADMS V1.0.0 敏捷开发框架(http://www.sp.cn)
 * Copyright (c) 2017-2018 思普瑞云(深圳)科技有限公司
 * 创建人：力软-前端开发组
 * 日 期：2017.04.18
 * 描 述：岗位选择
 */
var dfopid = request('dfopid');
var selectValue = request('selectValue');

var acceptClick;
var bootstrap = function ($, sp) {
    "use strict";
    var postitem = { value: '', text: '' };

    var page = {
        init: function () {
            page.bind();
            page.initData();
        },
        bind: function () {
            $('#form_company_list').sptree({
                url: top.$.rootUrl + '/LR_OrganizationModule/Company/GetTree',
                param: { parentId: '0' },
                nodeClick: function (item) {
                    $('#form_post_list').sptreeSet('refresh', {
                        url: top.$.rootUrl + '/LR_OrganizationModule/Post/GetTree',
                        param: { companyId: item.id }
                    });
                }
            });

            $('#form_post_list').sptree({
                nodeClick: function (item) {
                    postitem.value = item.id;
                    postitem.text = item.text;
                }
            });


            $('.form-post-search>input').on("keypress", function (e) {
                if (event.keyCode == "13") {
                    var keyword = $(this).val();
                    $('#form_post_list').sptreeSet('search', { keyword: keyword });

                }
            });
        },
        initData: function () {
            if (!!selectValue && selectValue != "0") {
                sp.httpAsync('GET', top.$.rootUrl + '/LR_OrganizationModule/Post/GetEntity', { keyValue: selectValue }, function (data) {
                    if (!!data) {
                        $('#form_company_list').sptreeSet('setValue', data.F_CompanyId);
                        $('#form_post_list').sptreeSet('setValue', data.F_PostId);
                    }
                });
            }
        }
    };
    // 保存数据
    acceptClick = function (callBack) {
        callBack(postitem, dfopid);
        return true;
    };
    page.init();
}