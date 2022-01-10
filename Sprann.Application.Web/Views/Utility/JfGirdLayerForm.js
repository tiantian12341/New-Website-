var acceptClick;
var op = top.spGirdLayerEdit;
var bootstrap = function ($, sp) {
    "use strict";

    var selectItem;
    var griddata = null;
    var page = {
        init: function () {
            page.bind();
        },
        bind: function () {
            $('#btn_Search').on('click', function () {
                if (griddata != null) {
                    var data = [];
                    var keyword = $('#txt_Keyword').val();
                    if (!!keyword) {
                        for (var i = 0, l = griddata.length; i < l; i++) {
                            var item = griddata[i];
                            for (var j = 0, jl = op.edit.op.colData.length; j < jl; j++) {
                                if (item[op.edit.op.colData[j].name] && item[op.edit.op.colData[j].name].indexOf(keyword) != -1) {
                                    data.push(item);
                                    break;
                                }
                            }
                        }
                        $('#gridtable').jfGridSet('refreshdata', data);
                    }
                    else {
                        $('#gridtable').jfGridSet('refreshdata', griddata);
                    }

                }
            });

            $('#gridtable').jfGrid({
                headData: op.edit.op.colData,
                url: op.edit.op.url,
                param: op.edit.op.param,
                onRenderComplete: function (data) {
                    griddata = data;
                },
                dblclick: function (row) {
                    top.spGirdLayerEditCallBack(row);
                    sp.layerClose(window.name);
                },
                onSelectRow: function (row) {
                    selectItem = row;
                },
                isPage: op.edit.op.isPage
            });

            $('#gridtable').jfGridSet('reload');
        }
    };
    // 保存数据
    acceptClick = function (callBack) {
        callBack(selectItem);
        return true;
    };
    page.init();
}