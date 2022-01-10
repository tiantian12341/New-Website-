var dfopid = request('dfopid');
var acceptClick;

var bootstrap = function ($, sp) {
    "use strict";
    var selectItem;

    function loadData(_dfop) {
        if (_dfop._loaded) {
            $('#gridtable').jfGridSet('refreshdata', _dfop._data);
        }
        else {
            setTimeout(function () {
                loadData(_dfop);
            }, 100);
        }
    }

    var page = {
        init: function () {
            page.bind();
        },
        bind: function () {
            var dfop = top.spGirdSelect[dfopid];
            $('#btn_Search').on('click', function () {
                var keyword = $('#txt_Keyword').val();
                if (dfop._loaded) {
                    if (!!keyword) {
                        var _data = [];
                        $.each(dfop._data, function (id, item) {
                            if (item[dfop.selectWord].indexOf(keyword) != -1) {
                                _data.push(item);
                            }
                        });
                        $('#gridtable').jfGridSet('refreshdata', _data);
                    }
                    else {
                        $('#gridtable').jfGridSet('refreshdata', dfop._data);
                    }
                }
            });
            $('#gridtable').jfGrid({
                headData: dfop.headData,
                mainId: 'F_Id',
                onSelectRow: function (row) {
                    selectItem = row;
                }
            });
            loadData(dfop);
        }
    };
    // 保存数据
    acceptClick = function (callBack) {
        callBack(selectItem, dfopid);
        return true;
    };
    page.init();
}