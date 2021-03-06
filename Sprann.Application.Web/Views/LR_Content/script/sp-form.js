$.request = (function () {
    var apiMap = {};
    function request(queryStr) {
        var api = {};
        if (apiMap[queryStr]) { return apiMap[queryStr]; };
        api.queryString = (function () {
            var urlParams = {};
            var e,
                d = function (s) { return decodeURIComponent(s.replace(/\+/g, " ")); },
                q = queryStr.substring(queryStr.indexOf('?') + 1),
                r = /([^&=]+)=?([^&]*)/g;
            while (e = r.exec(q)) urlParams[d(e[1])] = d(e[2]);
            return urlParams;
        })();
        api.getUrl = function () {
            var url = queryStr.substring(0, queryStr.indexOf('?') + 1);
            for (var p in api.queryString) { url += p + '=' + api.queryString[p] + "&"; };
            if (url.lastIndexOf('&') == url.length - 1) { return url.substring(0, url.lastIndexOf('&')); };
            return url;
        };
        apiMap[queryStr] = api;
        return api;
    };
    $.extend(request, request(window.location.href));
    return request;
})();
//start by wxl 获取页面参数

(function ($, sp) {
    "use strict";

    /*获取和设置表单数据*/
    $.fn.spGetFormData = function (keyValue) {// 获取表单数据
        var resdata = {};
        $(this).find('input,select,textarea,.sp-select,.sp-formselect,.spUploader-wrap,.sp-radio,.sp-checkbox,.edui-default').each(function (r) {
            var id = $(this).attr('id');
            if (!!id) {
                var type = $(this).attr('type');
                var ctlName = $(this).attr('name');
                switch (type) {
                    case "radio":
                        if ($("#" + id).is(":checked")) {
                            resdata[ctlName] = $("#" + id).val();
                            return true;
                        }
                        else {
                            if (ctlName) return true;
                        }
                        break;
                    case "checkbox":
                        if ($("#" + id).is(":checked")) {
                            if (ctlName) {
                                var myVal = $("#" + id).val();
                                if (resdata[ctlName] != undefined) {
                                    resdata[ctlName] += ',' + ((myVal == undefined) ? "1" : myVal);
                                }
                                else {
                                    resdata[ctlName] = ((myVal == undefined) ? "1" : myVal);
                                }
                                return true;
                            }
                            resdata[id] = 1;
                        } else {
                            if (ctlName) return true;
                            resdata[id] = 0;
                        }
                        break;
                    case "spselect":
                        resdata[id] = $(this).spselectGet();
                        break;
                    case "formselect":
                        resdata[id] = $(this).spformselectGet();
                        break;
                    case "spGirdSelect":
                        resdata[id] = $(this).spGirdSelectGet();
                        break;
                    case "sp-Uploader":
                        resdata[id] = $(this).spUploaderGet();
                        break;
                    case "sp-radio":
                        resdata[id] = $(this).find('input:checked').val();
                        break;
                    case "sp-checkbox":
                        var _idlist = [];
                        $(this).find('input:checked').each(function () {
                            _idlist.push($(this).val());
                        });
                        resdata[id] = String(_idlist);
                        break;
                    default:
                        if ($("#" + id).hasClass('currentInfo')) {
                            var value = $("#" + id)[0].spvalue;
                            resdata[id] = $.trim(value);
                        }
                        else if ($(this).hasClass('edui-default')) {
                            if ($(this)[0].ue) {
                                resdata[id] = $(this)[0].ue.getContent(null, null, true);
                            }
                        }
                        else {

                            var value = $("#" + id).val();
                            resdata[id] = $.trim(value);
                        }

                        break;
                }
                resdata[id] += '';
                if (resdata[id] == '') {
                    resdata[id] = '&nbsp;';
                }
                if (resdata[id] == '&nbsp;' && !keyValue) {
                    resdata[id] = '';
                }
            }
        });
        return resdata;
    };
    $.fn.spSetFormData = function (data) {// 设置表单数据

        var $this = $(this);
        for (var id in data) {
            var value = data[id];
            var $obj = $this.find('#' + id);
            if ($obj.length == 0 && value != null) {
                $obj = $this.find('[name="' + id + '"][value="' + value + '"]');
                if ($obj.length > 0) {
                    if (!$obj.is(":checked")) {
                        $obj.trigger('click');
                    }
                }
            }
            else {
                var type = $obj.attr('type');
                if ($obj.hasClass("sp-input-wdatepicker")) {
                    type = "datepicker";
                }
                switch (type) {
                    case "checkbox":
                        var isck = 0;
                        if ($obj.is(":checked")) {
                            isck = 1;
                        } else {
                            isck = 0;
                        }
                        if (isck != parseInt(value)) {
                            $obj.trigger('click');
                        }
                        break;
                    case "spselect":
                        $obj.spselectSet(value);
                        break;
                    case "formselect":
                        $obj.spformselectSet(value);
                        break;
                    case "spGirdSelect":
                        $obj.spGirdSelectSet(value);
                        break;
                    case "datepicker":
                        $obj.val(sp.formatDate(value, 'yyyy-MM-dd'));
                        break;
                    case "sp-Uploader":
                        $obj.spUploaderSet(value);
                        break;
                    case "sp-radio":
                        if (!$obj.find('input[value="' + value + '"]').is(":checked")) {
                            $obj.find('input[value="' + value + '"]').trigger('click');
                        }
                        break;
                    default:
                        if ($obj.hasClass('currentInfo')) {
                            $obj[0].spvalue = value;
                            if ($obj.hasClass('currentInfo-user')) {
                                $obj.val('');
                                sp.clientdata.getAsync('user', {
                                    key: value,
                                    callback: function (item, op) {
                                        op.obj.val(item.name);
                                    },
                                    obj: $obj
                                });
                            }
                            else if ($obj.hasClass('currentInfo-company')) {
                                $obj.val('');
                                sp.clientdata.getAsync('company', {
                                    key: value,
                                    callback: function (_data, op) {
                                        op.obj.val(_data.name);
                                    },
                                    obj: $obj
                                });
                            }
                            else if ($obj.hasClass('currentInfo-department')) {
                                $obj.val('');
                                sp.clientdata.getAsync('department', {
                                    key: value,
                                    callback: function (_data, op) {
                                        op.obj.val(_data.name);
                                    },
                                    obj: $obj
                                });
                            }
                            else {
                                $obj.val(value);
                            }

                        }
                        else if ($obj.hasClass('edui-default')) {
                            var ue = $obj[0].ue;
                            setUe(ue, value);
                        }
                        else {
                            $obj.val(value);
                        }

                        
                        break;
                }
            }
        }
    };

    function setUe(ue, value) {
        ue.ready(function () {
            ue.setContent(value);
        });
    }

    /*表单数据操作*/
    $.spSetForm = function (url, callback) {
        sp.loading(true, '正在获取数据');
        sp.httpAsyncGet(url, function (res) {
            sp.loading(false);
            if (res.code == sp.httpCode.success) {
                callback(res.data);
            }
            else {
                sp.layerClose(window.name);
                sp.alert.error('表单数据获取失败,请重新获取！');
                sp.httpErrorLog(res.info);
            }
        });
    };
    $.spSaveForm = function (url, param, callback, isNotClosed) {
        param['__RequestVerificationToken'] = $.spToken;
        sp.spLoading(true, '保存中');
        sp.httpAsyncPost(url, param, function (res) {
            sp.spLoading(false);
            if (res.code == sp.httpCode.success) {
                if (!!callback) {
                    callback(res);
                }
                sp.alert.success(res.info);
                if (!isNotClosed) {
                    sp.layerClose(window.name);
                }
            }
            else {
                sp.alert.error(res.info);
                sp.httpErrorLog(res.info);
            }
        });
    };
    $.spPostForm = function (url, param) {
        param['__RequestVerificationToken'] = $.spToken;
        sp.spLoading(true, '提交中');
        sp.httpAsyncPost(url, param, function (res) {
            sp.spLoading(false);
            if (res.code == sp.httpCode.success) {
                sp.alert.success(res.info);
            }
            else {
                sp.alert.error(res.info);
                sp.httpErrorLog(res.info);
            }
        });
    };

    /*tab页切换*/
    $.fn.spFormTab = function () {
        var $this = $(this);
        $this.parent().css({ 'padding-top': '44px' });
        $this.spscroll();

        $this.on('DOMNodeInserted', function (e) {
            var $this = $(this);
            var w = 0;
            $this.find('li').each(function () {
                w += $(this).outerWidth();
            });
            $this.find('.sp-scroll-box').css({ 'width': w });
        });





        $this.delegate('li', 'click', { $ul: $this }, function (e) {
            var $li = $(this);
            if (!$li.hasClass('active')) {
                var $parent = $li.parent();
                var $content = e.data.$ul.next();

                var id = $li.find('a').attr('data-value');
                $parent.find('li.active').removeClass('active');
                $li.addClass('active');
                $content.find('.tab-pane.active').removeClass('active');
                $content.find('#' + id).addClass('active');
            }
        });
    };
    $.fn.spFormTabEx = function (callback) {
        var $this = $(this);
        $this.delegate('li', 'click', { $ul: $this }, function (e) {
            var $li = $(this);
            if (!$li.hasClass('active')) {
                var $parent = $li.parent();
                var $content = e.data.$ul.next();

                var id = $li.find('a').attr('data-value');
                $parent.find('li.active').removeClass('active');
                $li.addClass('active');
                $content.find('.tab-pane.active').removeClass('active');
                $content.find('#' + id).addClass('active');

                if (!!callback) {
                    callback(id);
                }
            }
        });
    };
    
    /*检测字段是否重复*/
    $.spExistField = function (keyValue, controlId, url, param) {
        var $control = $("#" + controlId);
        if (!$control.val()) {
            return false;
        }
        var data = {
            keyValue: keyValue
        };
        data[controlId] = $control.val();
        $.extend(data, param);
        sp.httpAsync('GET', url, data, function (data) {
            if (data == null) {
                $.spValidformMessage($control, '服务器端数据错误！');
                return;
            }

            if (data == false) {
                $.spValidformMessage($control, '已存在,请重新输入');
            }
        });
    };

    /*固定下拉框的一些封装：数据字典，组织机构，省市区级联*/
    // 数据字典下拉框
    $.fn.spDataItemSelect = function (op) {
        // op:code 码,parentId 父级id,maxHeight 200,allowSearch， childId 级联下级框id
        var dfop = {
            // 是否允许搜索
            allowSearch: false,
            // 访问数据接口地址
            //url: top.$.rootUrl + '/LR_SystemModule/DataItem/GetDetailListByParentId',
            // 访问数据接口参数
            param: { itemCode: '', parentId: '0' },
            // 级联下级框
        };
        op = op || {};
        if (!op.code) {
            return $(this);
        };
        dfop.param.itemCode = op.code;
        dfop.param.parentId = op.parentId || '0';
        dfop.allowSearch = op.allowSearch;

        var list = [];

        if (!!op.childId) {
            var list2 = [];
            $('#' + op.childId).spselect({
                // 是否允许搜索
                allowSearch: dfop.allowSearch
            });
            dfop.select = function (item) {
                if (!item) {
                    $('#' + op.childId).spselectRefresh({
                        data: []
                    });
                }
                else {
                    list2 = [];
                    sp.clientdata.getAllAsync('dataItem', {
                        code: dfop.param.itemCode,
                        callback: function (dataes) {
                            $.each(dataes, function (_index, _item) {
                                if (_item.parentId == item.k) {
                                    list2.push({ id: _item.text, text: _item.value, title: _item.text, k: _index });
                                }
                            });
                            $('#' + op.childId).spselectRefresh({
                                data: list2
                            });
                        }
                    });
                }
            };
        }
        var $select = $(this).spselect(dfop);
        sp.clientdata.getAllAsync('dataItem', {
            code: dfop.param.itemCode,
            callback: function (dataes) {
                $.each(dataes, function (_index, _item) {
                    if (_item.parentId == dfop.param.parentId) {
                        list.push({ id: _item.value, text: _item.text, title: _item.text, k: _index });
                    }
                });
                $select.spselectRefresh({
                    data: list
                });
            }
        });
        return $select;
    };
    // 数据源下拉框
    $.fn.spDataSourceSelect = function (op) {
        op = op || {};
        var dfop = {
            // 是否允许搜索
            allowSearch: true,
            select: op.select,
            placeholder: op.placeholder
        };
        if (!op.code) {
            return $(this);
        };
        $.extend(dfop, op);
        var $select = $(this).spselect(dfop);
        sp.clientdata.getAllAsync('sourceData', {
            code: op.code,
            callback: function (dataes) {
                $select.spselectRefresh({
                    value: op.value,
                    text: op.text,
                    title: op.text,
                    data: dataes
                });
                if (dfop['refreshComplete']) {
                    dfop['refreshComplete']();
                }
            }
        });
        return $select;
    };

    // 公司信息下拉框
    $.fn.spCompanySelect = function (op) {
        // op:parentId 父级id,maxHeight 200,
        var dfop = {
            type: 'tree',
            // 是否允许搜索
            allowSearch: true,
            // 访问数据接口地址
            url: top.$.rootUrl + '/LR_OrganizationModule/Company/GetTree',
            // 访问数据接口参数
            param: { parentId: '0' },
        };
        op = op || {};
        dfop.param.parentId = op.parentId || '0';

        if (!!op.isLocal) {
            dfop.url = '';
        };
        var $select = $(this).spselect(dfop);
        if (!!op.isLocal) {
            sp.clientdata.getAllAsync('company', {
                callback: function (dataes) {
                    var mapdata = {};
                    var resdata = [];
                    $.each(dataes, function (_index, _item) {
                        mapdata[_item.parentId] = mapdata[_item.parentId] || [];
                        _item.id = _index;
                        mapdata[_item.parentId].push(_item);
                    });
                    _fn(resdata, dfop.param.parentId);
                    function _fn(_data, vparentId) {
                        var pdata = mapdata[vparentId] || [];
                        for (var j = 0, l = pdata.length; j < l; j++) {
                            var _item = pdata[j];
                            var _point = {
                                id: _item.id,
                                text: _item.name,
                                value: _item.id,
                                showcheck: false,
                                checkstate: false,
                                hasChildren: false,
                                isexpand: false,
                                complete: true,
                                ChildNodes: []
                            };
                            if (_fn(_point.ChildNodes, _item.id)) {
                                _point.hasChildren = true;
                                _point.isexpand = true;
                            }
                            _data.push(_point);
                        }
                        return _data.length > 0;
                    }
                    $select.spselectRefresh({
                        data: resdata
                    });
                }
            });
        }

        return $select;

    };
    // 部门信息下拉框
    $.fn.spDepartmentSelect = function (op) {
        // op:parentId 父级id,maxHeight 200,
        var dfop = {
            type: 'tree',
            // 是否允许搜索
            allowSearch: true,
            // 访问数据接口地址
            url: top.$.rootUrl + '/LR_OrganizationModule/Department/GetTree',
            // 访问数据接口参数
            param: { companyId: '', parentId: '0' },
        };
        op = op || {};
        dfop.param.companyId = op.companyId;
        dfop.param.parentId = op.parentId;

        return $(this).spselect(dfop);;
    };
    // 人员下拉框
    $.fn.spUserSelect = function (type) {//0单选1多选
        if (type == 0) {
            $(this).spformselect({
                layerUrl: top.$.rootUrl + '/LR_OrganizationModule/User/SelectOnlyForm',
                layerUrlW: 400,
                layerUrlH: 300,
                dataUrl: top.$.rootUrl + '/LR_OrganizationModule/User/GetListByUserIds'
            });
        }
        else {
            $(this).spformselect({
                layerUrl: top.$.rootUrl + '/LR_OrganizationModule/User/SelectForm',
                layerUrlW: 800,
                layerUrlH: 520,
                dataUrl: top.$.rootUrl + '/LR_OrganizationModule/User/GetListByUserIds'
            });
        }
    };

    // 省市区级联
    $.fn.spAreaSelect = function (op) {
        // op:parentId 父级id,maxHeight 200,
        var dfop = {
            // 字段
            value: "F_AreaCode",
            text: "F_AreaName",
            title: "F_AreaName",
            // 是否允许搜索
            allowSearch: true,
            // 访问数据接口地址
            url: top.$.rootUrl + '/LR_SystemModule/Area/Getlist',
            // 访问数据接口参数
            param: { parentId: '' },
        };
        op = op || {};
        if (!!op.parentId) {
            dfop.param.parentId = op.parentId;
        };
        var _obj = [], i = 0;
        var $this = $(this);
        $(this).find('div').each(function () {
            var $div = $('<div></div>');
            var $obj = $(this);
            dfop.placeholder = $obj.attr('placeholder');
            $div.addClass($obj.attr('class'));
            $obj.removeAttr('class');
            $obj.removeAttr('placeholder');
            $div.append($obj);
            $this.append($div);
            if (i == 0) {
                $obj.spselect(dfop);
            }
            else {
                dfop.url = "";
                dfop.parentId = "";
                $obj.spselect(dfop);
                _obj[i - 1].on('change', function () {
                    var _value = $(this).spselectGet();
                    if (_value == "") {
                        $obj.spselectRefresh({
                            url: '',
                            param: { parentId: _value },
                            data:[]
                        });
                    }
                    else {
                        $obj.spselectRefresh({
                            url: top.$.rootUrl + '/LR_SystemModule/Area/Getlist',
                            param: { parentId: _value },
                        });
                    }
                  
                });
            }
            i++;
            _obj.push($obj);
        });
    };
    // 数据库选择
    $.fn.spDbSelect = function (op) {
        // op:maxHeight 200,
        var dfop = {
            type: 'tree',
            // 是否允许搜索
            allowSearch: true,
            // 访问数据接口地址
            url: top.$.rootUrl + '/LR_SystemModule/DatabaseLink/GetTreeList'
        };
        op = op || {};

        return $(this).spselect(dfop);
    };

    // 动态获取和设置radio，checkbox
    $.fn.spRadioCheckbox = function (op) {
        var dfop = {
            type: 'radio',        // checkbox
            dataType: 'dataItem', // 默认是数据字典 dataSource（数据源）
            code: '',
            text: 'F_ItemName',
            value: 'F_ItemValue'
        };
        $.extend(dfop, op || {});
        var $this = $(this);
        $this.addClass(dfop.type);
        $this.addClass('sp-' + dfop.type);
        $this.attr('type', 'sp-' + dfop.type);
        var thisId = $this.attr('id');

        if (dfop.dataType == 'dataItem') {
            sp.clientdata.getAllAsync('dataItem', {
                code: dfop.code,
                callback: function (dataes) {
                    var i = 0;
                    $.each(dataes, function (id, item) {
                        i = i + 1;
                        var $point = $('<label><input id="' + thisId + i +'" name="' + thisId + '" value="' + item.value + '"' + ' type="' + dfop.type + '">' + item.text + '</label>');
                        $this.append($point);
                    });
                    $this.find('input').eq(0).trigger('click');
                }
            });
        }
        else {
            sp.clientdata.getAllAsync('sourceData', {
                code: dfop.code,
                callback: function (dataes) {
                    $.each(dataes, function (id, item) {
                        var $point = $('<label><input name="' + thisId + '" value="' + item[dfop.value] + '"' + '" type="' + dfop.type + '">' + item[dfop.text] + '</label>');
                        $this.append($point);
                    });
                    $this.find('input').eq(0).trigger('click');
                }
            });
        }
    };
    // 多条件查询框
    $.fn.spMultipleQuery = function (search, height, width) {
        var $this = $(this);
        var contentHtml = $this.html();
        $this.addClass('sp-query-wrap');
        var _html = '';
        _html += '<div class="sp-query-btn"><i class="fa fa-search"></i>&nbsp;搜索</div>';
        _html += '<div class="sp-query-content">';
        //_html += '<div class="sp-query-formcontent">';
        _html += contentHtml;
        //_html += '</div>';
        _html += '<div class="sp-query-arrow"><div class="sp-query-inside"></div></div>';
        _html += '<div class="sp-query-content-left">';
        _html += '<a id="sp_btn_queryReset" class="btn btn-default"><i class="fa fa-undo"></i>&nbsp;重置</a>';
        _html += '<a id="sp_btn_close" class="btn btn-default" style="margin-left:.55rem;"><i class="fa fa-close"></i>&nbsp;关闭</a>';
        _html += '</div>';
        _html += '<div class="sp-query-content-bottom">';
        //_html += '<a id="sp_btn_queryReset" class="btn btn-default">&nbsp;重置</a>';
        _html += '<a id="sp_btn_querySearch" class="btn btn-primary"><i class="fa fa-check"></i>&nbsp;查询</a>';
        _html += '</div>';
        _html += '</div>';
        $this.html(_html);
        $this.find('.sp-query-formcontent').show();
        $this.find('.sp-query-content').css({ 'width': width || 400, 'height': height || 300 });
        $this.find('.sp-query-btn').on('click', function () {
            var $content = $this.find('.sp-query-content');
            if ($content.hasClass('active')) {
                $content.removeClass('active');
            }
            else {
                $content.addClass('active');
            }
        });

        $this.find('#sp_btn_querySearch').on('click', function () {
            var $content = $this.find('.sp-query-content');
            var query = $content.spGetFormData();
            $content.removeClass('active');
            search(query);
        });

        $this.find('#sp_btn_queryReset').on('click', function () {
            var $content = $this.find('.sp-query-content');
            var query = $content.spGetFormData();
            for (var id in query) {
                query[id] = "";
            }
            $content.spSetFormData(query);
        });

        $this.find('#sp_btn_close').on('click', function (e) {
            $('.sp-query-content').removeClass('active');
        });

        $(document).click(function (e) {
            var et = e.target || e.srcElement;
            var $et = $(et);
            if (!$et.hasClass('sp-query-wrap') && $et.parents('.sp-query-wrap').length <= 0) {

                $('.sp-query-content').removeClass('active');
            }
        });
    };

})(jQuery, top.sp);
