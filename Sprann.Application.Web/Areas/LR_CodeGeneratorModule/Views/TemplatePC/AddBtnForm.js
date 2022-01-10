/*
 * 版 本 Sprann ADMS V1.0.0 敏捷开发框架(http://www.sp.cn)
 * Copyright (c) 2017-2018 思普瑞云(深圳)科技有限公司
 * 创建人：力软-前端开发组
 * 日 期：2018.05.11
 * 描 述：添加扩展按钮	
 */
var acceptClick;
var bootstrap = function ($, sp) {
    "use strict";

    // 保存数据
    acceptClick = function (callBack) {
        if (!$('#form').spValidform()) {
            return false;
        }
        var formData = $('#form').spGetFormData();
        if (!!callBack) {
            callBack(formData);
        }

        return true;
    };
}