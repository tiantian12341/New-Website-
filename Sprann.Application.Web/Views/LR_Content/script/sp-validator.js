(function ($, sp) {
    "use strict";
    
    $.spValidformMessage = function ($this, errormsg) {
        /*错误处理*/
        $this.addClass('sp-field-error');
        $this.parent().append('<div class="sp-field-error-info" title="' + errormsg + '！"><i class="fa fa-info-circle"></i></div>');
        var validatemsg = $this.parent().find('.form-item-title').text() + ' ' + errormsg;
        sp.alert.error('表单信息输入有误,请检查！</br>' + validatemsg);
        if ($this.attr('type') == 'spselect') {
            $this.on('change', function () {
                removeErrorMessage($(this));
            });
        }
        else if ($this.attr('type') == 'formselect') {
            $this.on('change', function () {
                removeErrorMessage($(this));
            });
        }
        else if ($this.hasClass('sp-input-wdatepicker')) {
            $this.on('change', function () {
                var $input = $(this);
                if ($input.val()) {
                    removeErrorMessage($input);
                }
            });
        }
        else {
            $this.on('input propertychange', function () {
                var $input = $(this);
                if ($input.val()) {
                    removeErrorMessage($input);
                }
            });
        }
    };

    $.fn.spRemoveValidMessage = function () {
        removeErrorMessage($(this));
    };

    $.fn.spValidform = function () {
        var validateflag = true;
        var validHelper = sp.validator;
        var formdata = $(this).spGetFormData();

        $(this).find("[isvalid=yes]").each(function () {
            var $this = $(this);

            if ($this.parent().find('.sp-field-error-info').length > 0) {
                validateflag = false;
                return true;
            }

            var checkexpession = $(this).attr("checkexpession");
            var checkfn = validHelper['is' + checkexpession];
            if (!checkexpession || !checkfn) { return false; }
            var errormsg = $(this).attr("errormsg") || "";

            var id = $this.attr('id');
            var value = formdata[id];

            //var type = $this.attr('type');
            //if (type == 'spselect') {
            //    value = $this.spselectGet();
            //}
            //else if (type == 'formselect') {
            //    value = $this.spformselectGet();
            //}
            //else {
            //    value = $this.val();
            //}
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
    };

    function removeErrorMessage($obj) {
        $obj.removeClass('sp-field-error');
        $obj.parent().find('.sp-field-error-info').remove();
    };

})(window.jQuery, top.sp);
