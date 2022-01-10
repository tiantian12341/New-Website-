/*
 * 版 本 Sprann ADMS V1.0.0 敏捷开发框架(http://www.sp.cn)
 * Copyright (c) 2017-2018 思普瑞云(深圳)科技有限公司
 * 创建人：力软-前端开发组
 * 日 期：2017.03.22
 * 描 述：附件上传管理	
 */
var keyVaule = request('keyVaule');
var extensions = request('extensions');

var bootstrap = function ($, sp) {
    "use strict";
   
    $.spSetForm(top.$.rootUrl + '/LR_SystemModule/Annexes/GetAnnexesFileList?folderId=' + keyVaule, function (data) {
        for (var i = 0, l = data.length; i < l; i++) {
            $('#sp_form_file_queue .sp-form-file-queue-bg').hide();
            var item = data[i];
            fileInfo[item.F_Id] = {
                fileGuid: item.F_Id,
                chunks: 1
            }
            var $item = $('<div class="sp-form-file-queue-item" id="sp_filequeue_' + item.F_Id + '" ></div>');
            $item.append('<div class="sp-file-image"><img src="' + top.$.rootUrl + '/Content/images/filetype/' + item.F_FileType + '.png"></div>');
            $item.append('<span class="sp-file-name">' + item.F_FileName + '(' + sp.countFileSize(item.F_FileSize) + ')</span>');

            $item.append('<div class="sp-msg"><i class="fa fa-check-circle"></i></div>');
            $item.append('<div class="sp-tool-bar"><i class="fa fa-cloud-download" title="下载"  data-value="' + item.F_Id + '" ></i><i class="fa fa-minus-circle" title="删除"  data-value="' + item.F_Id + '" ></i></div>');

            $item.find('.sp-tool-bar .fa-minus-circle').on('click', function () {
                var fileId = $(this).attr('data-value');
                DeleteFile(fileId);
            });

            $item.find('.sp-tool-bar .fa-cloud-download').on('click', function () {
                var fileId = $(this).attr('data-value');
                DownFile(fileId);
            });

            $('#sp_form_file_queue_list').append($item);
        }
    });

    var fileInfo = {};
    
    // 触发合并文件碎片
    var mergeFileChunks = function (file) {
        var param = {};

        param['__RequestVerificationToken'] = $.spToken;
        param['folderId'] = keyVaule;
        param['fileGuid'] = fileInfo[file.id].fileGuid;
        param['fileName'] = fileInfo[file.id].name;
        param['chunks'] = fileInfo[file.id].chunks;
        sp.httpAsyncPost(top.$.rootUrl + "/LR_SystemModule/Annexes/MergeAnnexesFile", param, function (res) {
            var $fileItem = $('#sp_form_file_queue_list').find('#sp_filequeue_' + file.id);
            $fileItem.find('.sp-uploader-progress').remove();
            if (res.code == sp.httpCode.success) {
                // 文件保存成功后
                $fileItem.append('<div class="sp-msg"><i class="fa fa-check-circle"></i></div>');
                $fileItem.append('<div class="sp-tool-bar"><i class="fa fa-minus-circle" title="删除"  data-value="' + file.id + '" ></i></div>');

                $fileItem.find('.sp-tool-bar .fa-minus-circle').on('click', function () {
                    var fileId = $(this).attr('data-value');
                    DeleteFile(fileId);
                });
            }
            else {
                $fileItem.append('<div class="sp-msg"><i class="fa fa-exclamation-circle"></i></div>');
            }
        });
    }
    // 触发清楚文件碎片
    var reomveFileChunks = function (file) {
        var param = {};
        param['__RequestVerificationToken'] = $.spToken;
        param['fileGuid'] = fileInfo[file.id].fileGuid;
        param['chunks'] = fileInfo[file.id].chunks;
        sp.httpAsyncPost(top.$.rootUrl + "/LR_SystemModule/Annexes/MergeAnnexesFile", param, function (res) {});
        var $fileItem = $('#sp_form_file_queue_list').find('#sp_filequeue_' + file.id);
        $fileItem.find('.sp-uploader-progress').remove();
        $fileItem.append('<div class="sp-msg"><i class="fa fa-exclamation-circle"></i></div>');
    }
    // 删除文件
    var DeleteFile = function (fileId) {
        var param = {};
        param['__RequestVerificationToken'] = $.spToken;
        param['fileId'] = fileInfo[fileId].fileGuid;
        sp.httpAsyncPost(top.$.rootUrl + "/LR_SystemModule/Annexes/DeleteAnnexesFile", param, function (res) {});
        var file = page.uploader.getFile(fileId);
        if (!!file) {
            page.uploader.removeFile(file);
        }
        delete fileInfo[fileId];
        var $fileItem = $('#sp_form_file_queue_list').find('#sp_filequeue_' + fileId);
        $fileItem.remove();
        if ($('#sp_form_file_queue_list>div').length == 0) {
            $('#sp_form_file_queue .sp-form-file-queue-bg').show();
        }
            }
    // 下载文件
    var DownFile = function (fileId) {
        sp.download({ url: top.$.rootUrl + '/LR_SystemModule/Annexes/DownAnnexesFile', param: { fileId: fileId, __RequestVerificationToken: $.spToken }, method: 'POST' });
    }

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
                server: top.$.rootUrl + "/LR_SystemModule/Annexes/UploadAnnexesFileChunk",
                // 选择文件的按钮。可选。
                // 内部根据当前运行是创建，可能是input元素，也可能是flash.
                pick: '#sp_add_file_btn',
                dnd: '#sp_form_file_queue',
                paste: 'document.body',
                disableGlobalDnd:true,
                accept: {
                    extensions: extensions || "gif,jpeg,jpg,png,psd,rar,zip,pdf,doc,docx,ppt,pptx,txt,xls,xlsx"
                },
                multiple: true,
                // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
                resize: false,
                // 文件分片上传
                chunked: true,
                chunkRetry: 3,
                prepareNextFile: true,
                chunkSize:'1048576',
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
            data.chunk = data.chunk || 0;
            data.chunks = data.chunks || 1;
            fileInfo[data.id].fileGuid = fileInfo[data.id].fileGuid || WebUploader.Base.guid();
            data.fileGuid = fileInfo[data.id].fileGuid;
            fileInfo[data.id].chunks = data.chunks;
        },
        uploadProgress: function (file, percentage) {
            var $fileItem = $('#sp_form_file_queue_list').find('#sp_filequeue_' + file.id);
            $fileItem.find('.sp-uploader-progress-bar').css('width', (percentage * 100 + '%'));
        },
        uploadSuccess: function (file, res) {
            if (res.code == 200) {// 上传成功
                mergeFileChunks(file);
            }
            else {// 上传失败
                reomveFileChunks(file);
            }
        },
        uploadError: function (file, code) {
            reomveFileChunks(file);
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
