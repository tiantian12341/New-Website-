/*
 * 版 本 Sprann ADMS V1.0.0 敏捷开发框架(http://www.sp.cn)
 * Copyright (c) 2017-2018 思普瑞云(深圳)科技有限公司
 * 创建人：力 软-前端开 发组
 * 日 期：2017.03.22
 * 描 述：自定义表单渲染
 */
(function ($, sp) {
    "use strict";

    function getFontHtml(verify) {
        var res = "";
        switch (verify) {
            case "NotNull":
            case "Num":
            case "Email":
            case "EnglishStr":
            case "Phone":
            case "Fax":
            case "Mobile":
            case "MobileOrPhone":
            case "Uri":
                res = '<font face="宋体">*</font>';
                break;
        }
        return res;
    }
    function getTdValidatorHtml(verify) {
        var res = "";
        if (verify != "") {
            res = 'isvalid="yes" checkexpession="' + verify + '"';
        }
        return res;

    }

    $.fn.spCustmerFormRender = function (data) {
        var $this = $(this);
        var compontsMap = {};


        var girdCompontMap = {};
        var iLen = data.length;
        var $ul;
        var $container;
        if (iLen > 1) {
            var html = '<div class="sp-form-tabs" id="sp_form_tabs">';
            html += '<ul class="nav nav-tabs"></ul></div>';
            html += '<div class="tab-content sp-tab-content" id="sp_tab_content">';
            html += '</div>';
            $this.append(html);
            $('#sp_form_tabs').spFormTab();
            $ul = $('#sp_form_tabs ul');
            $container = $('#sp_tab_content');
        }
        else {
            $container = $this;
        }
        $this[0].compontsMap = compontsMap;

        for (var i = 0; i < iLen; i++) {
            var $content = $('<div class="sp-form-wrap"></div>');
            $container.append($content);
            for (var j = 0, jLen = data[i].componts.length; j < jLen; j++) {
                var compont = data[i].componts[j];
                if (!!compont.table && !!compont.field) {
                    compontsMap[compont.table + compont.field.toLowerCase()] = compont.id;
                }

                var $row = $('<div class="col-xs-' + (12 / parseInt(compont.proportion)) + ' sp-form-item" ></div>');
                var $title = $(' <div class="sp-form-item-title">' + compont.title + getFontHtml(compont.verify) + '</div>');
                if (compont.title != '') {
                    $row.append($title);
                }
                $content.append($row);
                var $compont = $.spFormComponents[compont.type].renderTable(compont, $row);
                if (!!$compont && !!compont.verify && compont.verify != "") {
                    $compont.attr('isvalid', 'yes').attr('checkexpession', compont.verify);
                }
                if (compont.type == 'girdtable') {
                    girdCompontMap[compont.table] = compont;
                }
            }


            if (iLen > 1) {// 如果大于一个选项卡，需要添加选项卡，否则不需要
                $ul.append('<li><a data-value="' + data[i].id + '">' + data[i].text + '</a></li>');
                $content.addClass('tab-pane').attr('id', data[i].id);
                if (i == 0) {
                    $ul.find('li').trigger('click');
                }
            }
        }

        $('.sp-form-wrap').spscroll();

        return girdCompontMap;
    };

    // 验证自定义表单数据
    $.spValidCustmerform = function () {
        var validateflag = true;
        var validHelper = sp.validator;
        $('body').find("[isvalid=yes]").each(function () {
            var $this = $(this);
            if ($this.parent().find('.sp-field-error-info').length > 0) {
                validateflag = false;
                return true;
            }

            var checkexpession = $(this).attr("checkexpession");
            var checkfn = validHelper['is' + checkexpession];
            if (!checkexpession || !checkfn) { return false; }
            var errormsg = $(this).attr("errormsg") || "";
            var value;
            var type = $this.attr('type');
            if (type == 'spselect') {
                value = $this.spselectGet();
            }
            else if (type == 'formselect') {
                value = $this.spformselectGet();
            }
            else {
                value = $this.val();
            }
            var r = { code: true, msg: '' };
            if (checkexpession == 'LenNum' || checkexpession == 'LenNumOrNull' || checkexpession == 'LenStr' || checkexpession == 'LenStrOrNull') {
                var len = $this.attr("length");
                r = checkfn(value, len);
            } else {
                r = checkfn(value);
            }
            if (!r.code) {
                validateflag = false;
                $.spValidformMessage($this, errormsg + r.msg);
            }
        });
        return validateflag;
    }

    // 获取自定义表单数据
    $.fn.spGetCustmerformData = function () {
        var resdata = {};
        $(this).find('input,select,textarea,.sp-select,.sp-formselect,.spUploader-wrap,.jfgrid-layout,.edui-default').each(function (r) {
            var $self = $(this);
            var id = $self.attr('id') || $self.attr('name');
            if (!!id) {
                var type = $self.attr('type');
                switch (type) {
                    case "checkbox":
                        if ($self.is(":checked")) {
                            if (resdata[id] != undefined && resdata[id] != '') {
                                resdata[id] += ',';
                            }
                            else {
                                resdata[id] = '';
                            }
                            resdata[id] += $self.val();
                        }
                        break;
                    case "radio":
                        if ($self.is(":checked")) {
                            resdata[id] = $self.val();
                        }
                        break;
                    case "spselect":
                        resdata[id] = $self.spselectGet();
                        break;
                    case "formselect":
                        resdata[id] = $self.spformselectGet();
                        break;
                    case "sp-Uploader":
                        resdata[id] = $self.spUploaderGet();
                        break;
                    default:
                        if ($self.hasClass('sp-currentInfo')) {
                            resdata[id] = $self[0].spvalue;
                        }
                        else if ($self.hasClass('jfgrid-layout')) {
                            var _resdata = [];
                            var _resdataTmp = $self.jfGridGet('rowdatas');
                            for (var i = 0, l = _resdataTmp.length; i < l; i++) {
                                _resdata.push(_resdataTmp[i]);
                            }
                            resdata[id] = JSON.stringify(_resdata);
                        }
                        else if ($self.hasClass('edui-default')) {
                            if ($self[0].ue) {
                                resdata[id] = $self[0].ue.getContent(null, null, true);
                            }
                        }
                        else {
                            var value = $self.val();
                            resdata[id] = $.trim(value);
                        }
                        break;
                }
            }
        });
        return resdata;
    }
    // 设置自定义表单数据
    $.fn.spSetCustmerformData = function (data, tablename) {// 设置表单数据
        var compontsMap = $(this)[0].compontsMap;
        for (var field in data) {
            var value = data[field];
            var id = compontsMap[tablename + field];
            var $obj = $('#' + id);
            if (!$obj.length || $obj.length == 0) {
                var vs = (value + "").split(',');
                for (var i = 0, l = vs.length; i < l; i++) {
                    _setvalue(vs[i]);
                }

                function _setvalue(_value) {
                    var _$obj = $('input[name="' + id + '"][value="' + _value + '"]');
                    if (!!_$obj.length && _$obj.length > 0) {
                        if (!_$obj.is(":checked")) {
                            _$obj.trigger('click');
                        }
                    }
                    else {
                        setTimeout(function () {
                            _setvalue(_value);
                        }, 100);
                    }
                }
            }
            else {
                var type = $obj.attr('type');
                if ($obj.hasClass("sp-input-wdatepicker")) {
                    type = "datepicker";
                }
                switch (type) {
                    case "spselect":
                        $obj.spselectSet(value);
                        break;
                    case "formselect":
                        $obj.spformselectSet(value);
                        break;
                    case "datepicker":
                        $obj.val(sp.formatDate(value, 'yyyy-MM-dd'));
                        break;
                    case "sp-Uploader":
                        $obj.spUploaderSet(value);
                        break;
                    default:
                        if ($obj.hasClass('sp-currentInfo-user')) {
                            $obj[0].spvalue = value;
                            $obj.val('');
                            sp.clientdata.getAsync('user', {
                                key: value,
                                callback: function (item, op) {
                                    op.obj.val(item.name);
                                },
                                obj: $obj
                            });
                        }
                        else if ($obj.hasClass('sp-currentInfo-company')) {
                            $obj[0].spvalue = value;
                            $obj.val('');
                            sp.clientdata.getAsync('company', {
                                key: value,
                                callback: function (_data, op) {
                                    op.obj.val(_data.name);
                                },
                                obj: $obj
                            });
                        }
                        else if ($obj.hasClass('sp-currentInfo-department')) {
                            $obj[0].spvalue = value;
                            $obj.val('');
                            sp.clientdata.getAsync('department', {
                                key: value,
                                callback: function (item, op) {
                                    op.obj.val(item.name);
                                },
                                obj: $obj
                            });
                        }
                        else if ($obj.hasClass('sp-currentInfo-guid')) {
                            $obj[0].spvalue = value;
                            $obj.val(value);
                        }
                        else if ($obj.hasClass('edui-default')) {
                            ueSet($obj[0].ue, value);
                            //$obj[0].ue.setContent(value);
                        }
                        else {
                            $obj.val(value);
                        }
                        break;
                }
            }
        }
    };

    function ueSet(ue, content) {
        ue.ready(function() {
            ue.setContent(content);
        });
    }

})(jQuery, top.sp);
