/*
 * 版 本 Sprann ADMS V1.0.0 敏捷开发框架(http://www.sp.cn)
 * Copyright (c) 2017-2018 思普瑞云(深圳)科技有限公司
 * 创建人：力软-前端开发组
 * 日 期：2017.04.17
 * 描 述：自定义查询
 */
var halfNo = request('code');


var bootstrap = function ($, sp) {
    "use strict";

    var fieldData = [];

    var page = {
        init: function () {
            page.bind();
        },
        bind: function () {
            //获取字段数据
            sp.httpAsync('GET', top.$.rootUrl + '/LR_SystemModule/DataSource/GetDataColName', { code: code }, function (data) {
                var headData = [];
                for (var i = 0, l = data.length; i < l; i++)
                {
                   
                    var item = data[i];
                    if (item != 'rownum') {
                        //var point = { id: item, text: item };
                        var point2 = { label: item, name: item, width: 150, align: "left" };
                        //fieldData.push(point);
                        headData.push(point2);
                    }
                }

                //$('#field').spselectRefresh({
                //    data: fieldData
                //});
              
                $('#gridtable').jfGrid({
                    url: top.$.rootUrl + '/LR_SystemModule/DataSource/GetDataTablePage',
                    headData: headData,
                    isPage: true
                });
               // page.search();
            });

            // 功能选择
            //$('#field').spselect({
            //    maxHeight: 300,
            //    allowSearch: true
            //});

            //$('#logic').spselect({
            //    maxHeight: 300
            //});

            // 查询
            $('#btn_Search').on('click', function () {
                page.search();
            });
        },
        search: function () {
            var param = {};
            param.code = code;

            //param.field = $('#field').spselectGet();
            //param.logic = $('#logic').spselectGet();
            //param.keyword = $('#keyword').val();

            $('#gridtable').jfGridSet('reload', param);
        }
    };

    page.init();
}


