/*
 * 版 本 sp-ADMS V6.1.6.0 思普瑞云(http://www.sp.cn)
 * Copyright (c) 2013-2017 上海力软信息技术有限公司
 * 创建人：力软-前端开发组
 * 日 期：2017.06.20
 * 描 述：文件管理	
 */
var folderId = request('folderId');
var acceptClick;
var bootstrap = function ($, sp) {
    "use strict";

    var fileInfo = {};

    var page = {
        uploader: null,
        init: function () {
            if (!WebUploader.Uploader.support()) {
                alert('Web Uploader 不支持您的浏览器！如果你使用的是IE浏览器，请尝试升级 flash 播放器');
                throw new Error('WebUploader does not support the browser you are using.');
            }

            page.uploader = WebUploader.create({
                auto: true,
                spf: top.$.rootUrl + '/Content/webuploader/Uploader.spf',
                // 文件接收服务端。
                server: top.$.rootUrl + '/LR_OAModule/ResourceFile/UploadifyFile?folderId=' + folderId,
                // 选择文件的按钮。可选。
                // 内部根据当前运行是创建，可能是input元素，也可能是flash.
                pick: '#sp_add_file_btn',
                dnd: '#sp_form_file_queue',
                paste: 'document.body',
                accept: {
                    extensions: "jpg,gif,png,bmp,jpeg,doc,docx,ppt,pptx,xls,xlsx,pdf,txt,rar,zip,csv"
                },
                multiple: true,
                // 上传参数
                formData: {
                    __RequestVerificationToken: $.spToken
                }
            });
            page.uploader.on('fileQueued', page.fileQueued);
            page.uploader.on('uploadStart', page.uploadStart);
            page.uploader.on('uploadBeforeSend', page.uploadBeforeSend);
            page.uploader.on('uploadProgress', page.uploadProgress);
            page.uploader.on('uploadSuccess', page.uploadSuccess);
            page.uploader.on('uploadError', page.uploadError);
            page.uploader.on('uploadComplete', page.uploadComplete);
            page.uploader.on('error', page.error);


            $('#sp_form_file_queue').spscroll();

        },
        fileQueued: function (file) {// 文件加载到队列
            fileInfo[file.id] = { name: file.name };
            $('#sp_form_file_queue .sp-form-file-queue-bg').hide();
            // 添加一条文件记录
            var $item = $('<div class="sp-form-file-queue-item" id="sp_filequeue_' + file.id + '" ></div>');
            $item.append('<div class="sp-file-image"><img src="' + top.$.rootUrl + '/Content/images/filetype/' + file.ext + '.png"></div>');
            $item.append('<span class="sp-file-name">' + file.name + '(' + sp.countFileSize(file.size) + ')</span>');

            $('#sp_form_file_queue_list').append($item);
        },
        uploadStart: function (file) {
            var $fileItem = $('#sp_form_file_queue_list').find('#sp_filequeue_' + file.id);
            $fileItem.append('<div class="sp-uploader-progress"><div class="sp-uploader-progress-bar" style="width:0%;"></div></div>');
        },
        uploadBeforeSend: function (object, data, headers) {
        },
        uploadProgress: function (file, percentage) {
            var $fileItem = $('#sp_form_file_queue_list').find('#sp_filequeue_' + file.id);
            $fileItem.find('.sp-uploader-progress-bar').css('width', (percentage * 100 + '%'));
        },
        uploadSuccess: function (file, res) {
            var $fileItem = $('#sp_form_file_queue_list').find('#sp_filequeue_' + file.id);
            $fileItem.find('.sp-uploader-progress').remove(); 
            if (res.code == 200) {// 上传成功
                // 文件保存成功后
                $fileItem.append('<div class="sp-msg"><i class="fa fa-check-circle"></i></div>');
                sp.frameTab.currentIframe().$('#gridTable').jfGridSet('reload', {});
            }
            else {// 上传失败
                $fileItem.append('<div class="sp-msg"><i class="fa fa-exclamation-circle"></i></div>');
            }
            console.log(file);
        },
        uploadError: function (file, code) {
            var $fileItem = $('#sp_form_file_queue_list').find('#sp_filequeue_' + file.id);
            $fileItem.find('.sp-uploader-progress').remove();
            $fileItem.append('<div class="sp-msg"><i class="fa fa-exclamation-circle"></i></div>');
        },
        uploadComplete: function (file) {
        },
        error: function (type) {
            switch (type) {
                case 'Q_TYPE_DENIED':
                    sp.alert.error('当前文件类型不允许上传');
                    break;
            };
        }
    };
    page.init();
}