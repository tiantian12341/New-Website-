var loaddfimg;
var baseinfo;
var bootstrap = function ($, sp) {
    "use strict";
    var getBaseinfo = function (callback) {
        baseinfo = sp.frameTab.currentIframe().baseinfo;
        if (!baseinfo) {
            setTimeout(function () { getBaseinfo(callback) }, 100);
        }
        else {
            callback();
        }
    };


    var page = {
        init: function () {
            getBaseinfo(function () {
                page.initData();
                page.bind();
            });
        },
        bind: function () {
            function uploadImg() {
                var f = document.getElementById('uploadFile').files[0]
                var src = window.URL.createObjectURL(f);
                document.getElementById('uploadPreview').src = src;
            };

            $('#uploadFile').on('change', uploadImg);
            
            $('#sp_save_btn').on('click', function () {
                var f = document.getElementById('uploadFile').files[0];
                if (!!f)
                {
                    sp.loading(true, '正在保存...');
                    $.ajaxFileUpload({
                        url: top.$.rootUrl + "/UserCenter/UploadFile",
                        secureuri: false,
                        fileElementId: 'uploadFile',
                        dataType: 'json',
                        success: function (data) {
                            sp.loading(false);
                            $('#uploadFile').on('change', uploadImg);
                            if (data.code == 200) {
                                sp.alert.success('保存成功');
                            }
                        }
                    });
                }
            });
        },
        initData: function () {
            $('.file').prepend('<img id="uploadPreview"  src="' + top.$.rootUrl + '/LR_OrganizationModule/User/GetImg?userId=' + baseinfo.userId + '" >');
        }
    };
    page.init();
}