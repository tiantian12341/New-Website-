/*
 * 版 本 Sprann ADMS V1.0.0 敏捷开发框架(http://www.sp.cn)
 * Copyright (c) 2017-2018 思普瑞云(深圳)科技有限公司
 * 创建人：力软-前端开发组
 * 日 期：2017.04.17
 * 描 述：自定义表单预览	
 */
var keyValue = request('keyValue');
var schemeInfoId = request('schemeInfoId');
var schemeId = request('schemeId');

var bootstrap = function ($, sp) {
    "use strict";
    var formData;
    var page = {
        init: function () {
            if (!!schemeInfoId) {
                $.spSetForm(top.$.rootUrl + '/LR_FormModule/Custmerform/GetFormData?keyValue=' + schemeInfoId, function (data) {//
                    formData = JSON.parse(data.schemeEntity.F_Scheme);
                    $('body').spCustmerFormRender(formData.data);
                });
            }
            else if (!!schemeId) {
                $.spSetForm(top.$.rootUrl + '/LR_FormModule/Custmerform/GetSchemeEntity?keyValue=' + schemeId, function (res) {//
                    formData = JSON.parse(res.F_Scheme);
                    $('body').spCustmerFormRender(formData.data);
                });
            }
            else if (!!keyValue) {
                formData = top[keyValue];
                $('body').spCustmerFormRender(formData);
            }
        }
    };
    page.init();
}