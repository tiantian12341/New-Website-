var bootstrap = function ($, sp) {
    "use strict";

    var page = {
        init: function () {
            page.bind();
        },
        bind: function () {
            // 点击切换验证码
            $("#Verifycode_img").click(function () {
                $("#Verifycode").val('');
                $("#Verifycode_img").attr("src", top.$.rootUrl + "/UserCenter/VerifyCode?time=" + Math.random());
            });
            // 旧密码验证
            $("#OldPassword").blur(function () {
                var $this = $(this);
                $this.parent().find('.tip').html('');
                if ($this.val() == "") {

                    return false;
                }
                var password = $.md5($this.val());
                sp.httpAsyncPost(top.$.rootUrl + "/UserCenter/ValidationOldPassword", { OldPassword: password }, function (res) {
                    if (res.code != 200) {
                        $this.parent().find('.tip').html('<div class="tip-error"><i class="fa  fa-exclamation-circle"></i>密码错误!</div>');
                    }
                    else {
                        $this.parent().find('.tip').html('<div class="tip-success"><i class="fa fa-check-circle"></i></div>');
                    }
                });
            });
            // 新密码
            $("#NewPassword").blur(function () {
                var $this = $(this);
                $this.parent().find('.tip').html('');
                if ($this.val() == "") {
                    return false;
                }
                $this.parent().find('.tip').html('<div class="tip-success"><i class="fa fa-check-circle"></i></div>');
            });
            $("#RedoNewPassword").blur(function () {
                var $this = $(this);
                $this.parent().find('.tip').html('');
                if ($this.val() == "") {
                    return false;
                }
                if ($this.val() == $('#NewPassword').val()) {

                    $this.parent().find('.tip').html('<div class="tip-success"><i class="fa fa-check-circle"></i></div>');
                }
                else {
                    $this.parent().find('.tip').html('<div class="tip-error"><i class="fa  fa-exclamation-circle"></i>两次密码输入不一样!</div>');
                }
                
            });

            $('#sp_save_btn').on('click', function () {
                if (!$('#form').spValidform()) {
                    return false;
                }
                if ($('#OldPassword').parent().find('.tip-success').length > 0 && $('#NewPassword').parent().find('.tip-success').length > 0 && $('#RedoNewPassword').parent().find('.tip-success').length > 0)
                {
                    var formData = $('#form').spGetFormData();
                    var postData = {
                        password: $.md5(formData.NewPassword),
                        oldPassword: $.md5(formData.OldPassword),
                        verifyCode: formData.Verifycode
                    };

                    sp.layerConfirm('注：请牢记当前设置密码，您确认要修改密码？', function (res, index) {
                        if (res) {
                            $.spSaveForm(top.$.rootUrl + '/UserCenter/SubmitResetPassword', postData, function (res) {
                                if (res.code == 200) {
                                    top.location.href = top.$.rootUrl + "/Login/Index";
                                }
                                console.log(res);
                            });
                            top.layer.close(index); //再执行关闭  
                        }
                    });

                   
                }
                return false;
            });
        }
    };
    page.init();
}