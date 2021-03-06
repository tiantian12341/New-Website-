(function ($, sp) {
    "use strict";

    $.spUploader = {
        init: function ($self) {
            var dfop = $self[0]._spUploader.dfop;
            $.spUploader.initRender($self, dfop);
        },
        initRender: function ($self, dfop) {
            $self.attr('type', 'sp-Uploader').addClass('spUploader-wrap');
            var $wrap = $('<div class="spUploader-input" ></div>');

            var $btnGroup = $('<div class="spUploader-btn-group"></div>');
            var $uploadBtn = $('<a id="spUploader_uploadBtn_' + dfop.id + '" class="btn btn-success spUploader-input-btn">上传</a>');
            var $downBtn = $('<a id="spUploader_downBtn_' + dfop.id + '" class="btn btn-danger spUploader-input-btn">下载</a>');

            $self.append($wrap);

            $btnGroup.append($uploadBtn);
            $btnGroup.append($downBtn);
            $self.append($btnGroup);

            $uploadBtn.on('click', $.spUploader.openUploadForm);
            $downBtn.on('click', $.spUploader.openDownForm);
           
        },
        openUploadForm: function () {
            var $btn = $(this);
            var $self = $btn.parents('.spUploader-wrap');
            var dfop = $self[0]._spUploader.dfop;
            sp.layerForm({
                id: dfop.id,
                title: dfop.placeholder,
                url: top.$.rootUrl + '/LR_SystemModule/Annexes/UploadForm?keyVaule=' + dfop.value + "&extensions=" + dfop.extensions,
                width: 600,
                height: 400,
                maxmin: true,
                btn: null,
                end: function () {
                    sp.httpAsyncGet(top.$.rootUrl + '/LR_SystemModule/Annexes/GetFileNames?folderId=' + dfop.value, function (res) {
                        if (res.code == sp.httpCode.success) {
                            $('#' + dfop.id).find('.spUploader-input').text(res.info);
                        }
                    });
                }
            });
        },
        openDownForm: function () {
            var $btn = $(this);
            var $self = $btn.parents('.spUploader-wrap');
            var dfop = $self[0]._spUploader.dfop;
            sp.layerForm({
                id: dfop.id,
                title: dfop.placeholder,
                url: top.$.rootUrl + '/LR_SystemModule/Annexes/DownForm?keyVaule=' + dfop.value,
                width: 600,
                height: 400,
                maxmin: true,
                btn: null
            });
        }
    };

    $.fn.spUploader = function (op) {
        var $this = $(this);
        if (!!$this[0]._spUploader) {
            return $this;
        };
        var dfop = {
            placeholder: '上传附件',
            isUpload: true,
            isDown: true,
            extensions: ''
        };

        $.extend(dfop, op || {});
        dfop.id = $this.attr('id');
        dfop.value = sp.newGuid();

        $this[0]._spUploader = { dfop: dfop };
        $.spUploader.init($this);
    };

    $.fn.spUploaderSet = function (value) {
        var $self = $(this);
        var dfop = $self[0]._spUploader.dfop;
        dfop.value = value;
        sp.httpAsyncGet(top.$.rootUrl + '/LR_SystemModule/Annexes/GetFileNames?folderId=' + dfop.value, function (res) {
            if (res.code == sp.httpCode.success) {
                $('#' + dfop.id).find('.spUploader-input').text(res.info);
            }
        });
    };

    $.fn.spUploaderGet = function () {
        var $this = $(this);
        var dfop = $this[0]._spUploader.dfop;
        return dfop.value;
    }
})(jQuery, top.sp);
