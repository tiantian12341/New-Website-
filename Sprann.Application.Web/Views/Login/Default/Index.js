(function ($) {
    "use strict";

    var spPage = {
        init: function () {
            $('#psw_change').css({
                'background': 'url(' + $.rootUrl + '/Content/images/Login/psw0.png) no-repeat center center'
            });

            var error = request('error');
            if (error == "ip") {
                spPage.tip("登录IP限制");
            }
            else if (error == "time") {
                spPage.tip("登录时间限制");
            }

            if (window.location.href != top.window.location.href) {
                top.window.location.href = window.location.href;
            };
            var isIE = !!window.ActiveXObject;
            var isIE6 = isIE && !window.XMLHttpRequest;
            if (isIE6) {
                window.location.href = $.rootUrl + "/Error/ErrorBrowser";
            };
            spPage.bind();
        },
        bind: function () {
            // 回车键
            document.onkeydown = function (e) {
                e = e || window.event;
                if ((e.keyCode || e.which) == 13) {
                    $('#sp_login_btn').trigger('click');
                }
            };
            //输入框获取焦点
            $('.sp-login-input input').on('focus', function () {
                var src = $(this).prev().attr('src');
                $(this).prev().attr('src', src.replace(/0.png$/, '1.png'));
            }).on('blur', function () {
                var src = $(this).prev().attr('src');
                $(this).prev().attr('src', src.replace(/1.png$/, '0.png'));
            });

            // 点击切换验证码
            $("#sp_verifycode_img").click(function () {
                $("#sp_verifycode_input").val('');
                $("#sp_verifycode_img").attr("src", $.rootUrl + "/Login/VerifyCode?time=" + Math.random());
            });
            var errornum = $('#errornum').val();
            if (errornum >= 3) {

                $('#kt_login_signin_form').removeClass('noreg');
                $("#sp_verifycode_img").trigger('click');
            };

            //点击密码icon  显示／隐藏
            $('#psw_change').click(function (event) {
                var event = event || window.event;
                event.stopPropagation();
                var $this = $(this);
                $this.toggleClass('psw_show');
                //如果当前隐藏  变显示
                if ($this.hasClass('psw_show')) {
                    $this.css({
                        'background': 'url(' + $.rootUrl + '/Content/images/Login/psw1.png) no-repeat center center'
                    });
                    $this.prev().attr('type', 'text');
                } else {
                    $this.css(
                        'background', 'url(/Content/images/Login/psw0.png) no-repeat center center'
                    );
                    $this.prev().attr('type', 'password');
                }
            });

            //登录方式点击
            $('.sp-login-toCode').click(function () {
                var _this = $(this);
                if (_this.attr('login-access') == 'psw') {
                    $('.sp-login-bycode').show();
                    $('.sp-login-bypsw').hide();

                } else {
                    $('.sp-login-bypsw').show();
                    $('.sp-login-bycode').hide();
                }
            });

            // 登录按钮事件
            $("#sp_login_btn").on('click', function () {
                spPage.login();
            });
        },
        login: function () {
            spPage.tip();

            var $username = $("#sp_username"), $password = $("#sp_password"), $verifycode = $("#sp_verifycode_input");
            var username = $.trim($username.val()), password = $.trim($password.val()), verifycode = $.trim($verifycode.val());

            if (username == "") {
                spPage.tip('请输入账户');
                $username.focus();
                return false;
            }
            if (password == "") {
                spPage.tip('请输入密码');
                $password.focus();
                return false;
            }

            if ($("#sp_verifycode_input").is(":visible") && verifycode == "") {
                spPage.tip('请输入验证码');
                $verifycode.focus();
                return false;
            };
            password = $.md5(password);
            spPage.logining(true);
            $.ajax({
                url: $.rootUrl + "/Login/CheckLogin",
                headers: { __RequestVerificationToken: $.spToken },
                data: { username: username, password: password, verifycode: verifycode },
                type: "post",
                dataType: "json",
                success: function (res) {
                    if (res.code == 200) {
                        window.location.href = $.rootUrl + '/Home/Index';
                    }
                    else if (res.code == 400) {
                        spPage.logining(false);
                        spPage.tip(res.info, true);
                        $('#errornum').val(res.data);
                        if (res.data >= 3) {
                            $('#sp_verifycode_input').parent().show();
                            $("#sp_verifycode_img").trigger('click');
                        }
                    }
                    else if (res.code == 500) {
                        console.error(res.info);
                        spPage.logining(false);
                        spPage.tip('服务端异常，请联系管理员', true);
                    }
                }
            });
        },
        logining: function (isShow) {
            if (isShow) {
                $('input').attr('disabled', 'disabled');
                $('#sp_login_btn').prepend($('<div class="spinner-border mr-2" role="status"><span class="sr-only">Loading...</span></div>'));
                $("#sp_login_btn").unbind('click');
                //$("#sp_login_btn").addClass('active').attr('disabled', 'disabled').find('span').hide();
                //$("#sp_login_btn").css('background', '#eeecec url(/Content/images/Login/loading.gif) no-repeat center 10px');
            }
            else {
                $('input').removeAttr('disabled');
                $('.spinner-border').remove();
                $("#sp_login_btn").on('click', function () {
                    spPage.login();
                });
                //$("#sp_login_btn").removeClass('active').removeAttr('disabled').find('span').show();
                //$("#sp_login_btn").css('background', '#268fe2');
            }
        },
        tip: function (msg) {
            var $tip = $('.lsw-login-error');
            $tip.hide();
            if (!!msg) {
                $tip.html(msg);
                $tip.show();
            }
        }
    };
    $(function () {
        spPage.init();
    });
})(window.jQuery);