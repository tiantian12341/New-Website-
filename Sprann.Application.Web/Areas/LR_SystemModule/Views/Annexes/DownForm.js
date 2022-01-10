var keyVaule = request('keyVaule');
var bootstrap = function ($, sp) {
    "use strict";

    $.spSetForm(top.$.rootUrl + '/LR_SystemModule/Annexes/GetAnnexesFileList?folderId=' + keyVaule, function (data) {
        for (var i = 0, l = data.length; i < l; i++) {
            $('#sp_form_file_queue .sp-form-file-queue-bg').hide();
            var item = data[i];
            var $item = $('<div class="sp-form-file-queue-item" id="sp_filequeue_' + item.F_Id + '" ></div>');
            $item.append('<div class="sp-file-image"><img src="' + top.$.rootUrl + '/Content/images/filetype/' + item.F_FileType + '.png"></div>');
            $item.append('<span class="sp-file-name">' + item.F_FileName + '(' + sp.countFileSize(item.F_FileSize) + ')</span>');
            $item.append('<div class="sp-tool-bar"><i class="fa fa-cloud-download" title="下载"  data-value="' + item.F_Id + '" ></i></div>');

            $item.find('.sp-tool-bar .fa-cloud-download').on('click', function () {
                var fileId = $(this).attr('data-value');
                DownFile(fileId);
            });

            $('#sp_form_file_queue_list').append($item);
        }
    });
    // 下载文件
    var DownFile = function (fileId) {
        sp.download({ url: top.$.rootUrl + '/LR_SystemModule/Annexes/DownAnnexesFile', param: { fileId: fileId, __RequestVerificationToken: $.spToken }, method: 'POST' });
    }


    $('#sp_form_file_queue').spscroll();
}
