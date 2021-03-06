/*
 * 日 期：2017.03.16
 * 描 述：excel 导入导出
 */
(function ($, sp) {
    "use strict";
    $(function () {
        function excelInit() {
            if (!!spModule) {
                // 导入
                sp.httpAsync('GET', top.$.rootUrl + '/LR_SystemModule/ExcelImport/GetList', { moduleId: spModule.F_ModuleId }, function (data) {
                    if (!!data && data.length > 0) {
                        var $layouttool = $('.sp-layout-tool-right');
                        var $btnGroup = $('<div class=" btn-group btn-group-sm"></div>');
                        var hasBtn = false;
                        $.each(data, function (id, item) {
                            if (!!spModuleButtonList[item.F_ModuleBtnId]) {
                                hasBtn = true;
                                var $btn = $('<a id="' + item.F_ModuleBtnId + '" data-value="' + item.F_Id + '"  class="btn btn-default"><i class="fa fa-sign-in"></i>&nbsp;' + item.F_BtnName + '</a>');
                                $btn.on('click', function () {
                                    var id = $(this).attr('data-value');
                                    var text = $(this).text();
                                    sp.layerForm({
                                        id: 'ImportForm', title: text,
                                        url: top.$.rootUrl + '/LR_SystemModule/ExcelImport/ImportForm?id=' + id,
                                        callBack: function (id) {
                                            if (spModule.excelImportAcceptClick != undefined)
                                              return spModule.excelImportAcceptClick();
                                            if (top[id].acceptClick != undefined)
                                                return top[id].acceptClick();
                                            return false;
                                        },
                                        width: 600, height: 400, maxmin: true, btn: spModule.excelImportButton || null
                                    });
                                });
                                $btnGroup.append($btn);
                            }
                        });
                        $layouttool.append($btnGroup);
                    }
                });
                // 导出
                sp.httpAsync('GET', top.$.rootUrl + '/LR_SystemModule/ExcelExport/GetList', { moduleId: spModule.F_ModuleId }, function (data) {
                    if (!!data && data.length > 0) {
                        var $layouttool = $('.sp-layout-tool-right');
                        var $btnGroup = $('<div class=" btn-group btn-group-sm"></div>');
                        var hasBtn = false;
                        $.each(data, function (id, item) {
                            if (!!spModuleButtonList[item.F_ModuleBtnId]) {
                                hasBtn = true;
                                var $btn = $('<a id="' + item.F_ModuleBtnId + '" class="btn btn-default"><i class="fa fa-sign-out"></i>&nbsp;' + item.F_BtnName + '</a>');
                                $btn[0].dfop = item;
                                $btn.on('click', function () {
                                    item = $btn[0].dfop;
                                    sp.layerForm({
                                        id: "ExcelExportForm",
                                        title: '导出Excel数据',
                                        url: top.$.rootUrl + '/Utility/ExcelExportForm?gridId=' + item.F_GridId + '&filename=' + encodeURI(item.F_Name),
                                        width: 650,height: 400, maxmin: true,
                                        callBack: function (id) {
                                            return top[id].acceptClick();
                                        },
                                        btn: ['导出Excel', '关闭']
                                    });
                                });
                                $btnGroup.append($btn);
                            }
                        });
                        $layouttool.append($btnGroup);
                    }
                });
            }
            else {
                setTimeout(excelInit, 100);
            }
        };
        excelInit();
    });

})(window.jQuery, top.sp);
