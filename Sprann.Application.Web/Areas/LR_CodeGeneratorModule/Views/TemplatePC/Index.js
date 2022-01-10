/*
 * 版 本 Sprann ADMS V1.0.0 敏捷开发框架(http://www.sp.cn)
 * Copyright (c) 2017-2018 思普瑞云(深圳)科技有限公司
 * 创建人：力软-前端开发组
 * 日 期：2017.04.17
 * 描 述：PC端代码生成模板管理	
 */
var bootstrap = function ($, sp) {
    "use strict";
    var page = {
        init: function () {
            page.bind();
        },
        bind: function () {
            // 快速开发模板
            $('#sp_fastCode').on('click', function () {
                sp.layerForm({
                    id: 'FastCodeIndex',
                    title: '在线代码生成器 并自动创建代码(快速开发模板)',
                    url: top.$.rootUrl + '/LR_CodeGeneratorModule/TemplatePC/FastCodeIndex',
                    width: 1100,
                    height: 700,
                    maxmin: true,
                    btn: null
                });
            });

            // 自定义开发模板
            $('#sp_custmerCode').on('click', function () {
                sp.layerForm({
                    id: 'CustmerCodeIndex',
                    title: '在线代码生成器 并自动创建代码(自定义开发模板)',
                    url: top.$.rootUrl + '/LR_CodeGeneratorModule/TemplatePC/CustmerCodeIndex',
                    width: 1100,
                    height: 700,
                    maxmin: true,
                    btn: null
                });
            });

            // 实体映射类生成
            $('#sp_entityCode').on('click', function () {
                sp.layerForm({
                    id: 'FastCodeIndex',
                    title: '在线代码生成器 并自动创建代码(实体映射类生成)',
                    url: top.$.rootUrl + '/LR_CodeGeneratorModule/TemplatePC/EntityCodeIndex',
                    width: 1100,
                    height: 700,
                    maxmin: true,
                    btn: null
                });
            });
            // 系统表单开发模板
            $('#sp_workflowCode').on('click', function () {
                sp.layerForm({
                    id: 'CustmerCodeIndex',
                    title: '在线代码生成器 并自动创建代码(流程系统表单开发模板)',
                    url: top.$.rootUrl + '/LR_CodeGeneratorModule/TemplatePC/WorkflowCodeIndex',
                    width: 1100,
                    height: 700,
                    maxmin: true,
                    btn: null
                });
            });
        }
    };
    page.init();
}