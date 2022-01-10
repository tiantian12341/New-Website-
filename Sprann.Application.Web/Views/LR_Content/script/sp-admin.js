var loaddfimg;
(function ($, sp) {
    "use strict";

    var page = {
        init: function () {
            page.initSetting();

            /*判断当前浏览器是否是IE浏览器*/
            if ($('body').hasClass('IE') || $('body').hasClass('InternetExplorer')) {
                //$('#sp_loadbg').append('<img data-img="imgdl" src="' + top.$.rootUrl + '/Content/images/ie-loader.gif" style="position: absolute;top: 0;left: 0;right: 0;bottom: 0;margin: auto;vertical-align: middle;">');
                //Pace.stop();
            }
            else {
                //Pace.on('done', function () {
                //    $('#sp_loadbg').fadeOut();
                //    Pace.options.target = '#sppacenone';
                //});
            }
            // 通知栏插件初始化设置
            toastr.options = {
                "closeButton": true,
                "debug": false,
                "newestOnTop": true,
                "progressBar": false,
                "positionClass": "toast-top-center",
                "preventDuplicates": false,
                "onclick": null,
                "showDuration": "300",
                "hideDuration": "1000",
                "timeOut": "3000",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
            };
            // 打开首页模板
            sp.frameTab.open({ F_ModuleId: '0', F_Icon: 'fa fa-desktop', F_FullName: '我的桌面', F_UrlAddress: '/Home/AdminDesktop' }, true);
            sp.clientdata.init(function () {
                page.userInit();
                // 初始页面特例
                bootstrap($, sp);
                //if ($('body').hasClass('IE') || $('body').hasClass('InternetExplorer')) {
                //    $('#sp_loadbg').fadeOut();
                //}
                sp.spLoading(false);
            });

            // 加载数据进度
            page.loadbarInit();
            // 全屏按钮
            page.fullScreenInit();
            // 主题选择初始化
            //page.uitheme();
        },
        // 登录头像和个人设置
        userInit: function () {
            var loginInfo = sp.clientdata.get(['userinfo']);
            var _html = '<div class="sp-frame-personCenter"><a href="javascript:void(0);" class="dropdown-toggle" data-toggle="dropdown">';
            _html += '<img id="userhead"src="' + top.$.rootUrl + '/LR_OrganizationModule/User/GetImg?userId=' + loginInfo.userId + '" >';
            _html += '<span>' + loginInfo.realName + '</span>';
            _html += '</a>';
            _html += '<ul class="dropdown-menu pull-right">';
            _html += '<li><a href="javascript:void(0);" id="sp_userinfo_btn"><i class="fa fa-user"></i>个人信息</a></li>';
            //_html += '<li><a href="javascript:void(0);" id="sp_schedule_btn"><i class="fa fa-calendar"></i>我的日程</a></li>';
            if (loginInfo.isSystem) {
                _html += '<li><a href="javascript:void(0);" id="sp_clearredis_btn"><i class="fa fa-refresh"></i>清空缓存</a></li>';
            }
            _html += '<li><a href="javascript:void(0);" id="sp_loginout_btn"><i class="fa fa-power-off"></i>安全退出</a></li>';
            _html += '</ul></div>';
            $('body').append(_html);

            $('#sp_loginout_btn').on('click', page.loginout);
            $('#sp_userinfo_btn').on('click', page.openUserCenter);
            $('#sp_clearredis_btn').on('click', page.clearredis);

            if (!loginInfo['isSystem']) {
                $('#sp_frame_menu').css('display', 'none');
            }
        },
        loginout: function () { // 安全退出
            sp.layerConfirm("您确定要退出系统吗？", function (r) {
                if (r) {
                    sp.spLoading(true, '退出中');
                    sp.httpAsyncPost($.rootUrl + '/Login/OutLogin', {}, function (data) {
                        window.location.href = $.rootUrl + "/Login/Index";
                    });
                }
            }, '提示');
        },
        clearredis: function () {
            sp.layerConfirm("您确定要清空后台缓存数据吗？", function (r) {
                if (r) {
                    sp.spLoading(true, '清理中');
                    sp.httpAsyncPost($.rootUrl + '/Home/ClearRedis', {}, function (data) {
                        window.location.href = $.rootUrl + "/Login/Index";
                    });
                }
            }, '提示');
        },
        openUserCenter: function () {
            // 打开个人中心
            sp.frameTab.open({ F_ModuleId: '1', F_Icon: 'fa fa-user', F_FullName: '个人中心', F_UrlAddress: '/UserCenter/Index' });
        },
        // 全屏按钮
        fullScreenInit: function () {
            var _html = '<div class="sp_frame_fullscreen"><a href="javascript:void(0);" id="sp_fullscreen_btn" title="全屏"><i class="fa fa-arrows-alt"></i></a></div>';
            $('body').append(_html);
            $('#sp_fullscreen_btn').on('click', function () {
                if (!$(this).attr('fullscreen')) {
                    $(this).attr('fullscreen', 'true');
                    page.requestFullScreen();
                } else {
                    $(this).removeAttr('fullscreen');
                    page.exitFullscreen();
                }
            });
        },
        requestFullScreen: function () {
            var de = document.documentElement;
            if (de.requestFullscreen) {
                de.requestFullscreen();
            } else if (de.mozRequestFullScreen) {
                de.mozRequestFullScreen();
            } else if (de.webkitRequestFullScreen) {
                de.webkitRequestFullScreen();
            }
        },
        exitFullscreen: function () {
            var de = document;
            if (de.exitFullscreen) {
                de.exitFullscreen();
            } else if (de.mozCancelFullScreen) {
                de.mozCancelFullScreen();
            } else if (de.webkitCancelFullScreen) {
                de.webkitCancelFullScreen();
            }
        },
        // 加载数据进度
        loadbarInit: function () {
            var _html = '<div class="sp-loading-bar" id="sp_loading_bar" >';
            _html += '<div class="sp-loading-bar-bg"></div>';
            _html += '<div class="sp-loading-bar-message" id="sp_loading_bar_message"></div>';
            _html += '</div>';
            $('body').append(_html);
        },
        // 主题设置
        uitheme: function () {
            var uitheme = top.$.cookie('SprannMesPortalUItheme') || '1';
            var $setting = $('<div class="sp-theme-setting"></div>');
            var $btn = $('<button class="btn btn-default"><i class="fa fa-spin fa-gear"></i></button>');
            var _html = '<div class="panel-heading">界面风格</div>';
            _html += '<div class="panel-body">';
            _html += '<div><label><input type="radio" name="ui_theme" value="1" ' + (uitheme == '1' ? 'checked' : '') + '>经典版</label></div>';
            _html += '<div><label><input type="radio" name="ui_theme" value="2" ' + (uitheme == '2' ? 'checked' : '') + '>风尚版</label></div>';
            _html += '<div><label><input type="radio" name="ui_theme" value="3" ' + (uitheme == '3' ? 'checked' : '') + '>炫动版</label></div>';
            _html += '<div><label><input type="radio" name="ui_theme" value="4" ' + (uitheme == '4' ? 'checked' : '') + '>飞扬版</label></div>';
            _html += '</div>';
            $setting.append($btn);
            $setting.append(_html);
            //$('body').append($setting);

            $btn.on('click', function () {
                var $parent = $(this).parent();
                if ($parent.hasClass('opened')) {
                    $parent.removeClass('opened');
                }
                else {
                    $parent.addClass('opened');
                }
            });
            $setting.find('input').click(function () {
                var value = $(this).val();
                top.$.cookie('SprannMesPortalUItheme', value, { path: "/" });
                window.location.href = $.rootUrl + '/Home/Index';
            });

        },
        initSetting: function () {
            $('#sp_frame_menu').addClass('sp-default-theme');
            $('.sp-frame-tabs').addClass('sp-default-theme');

            sp['screenInfo']['width'] = $(window).width();
            sp['screenInfo']['height'] = $(window).height();

            $('body').resize(function () {
                sp['screenInfo']['width'] = $(window).width();
                sp['screenInfo']['height'] = $(window).height();
            });

            $('body').append('<div class="sp-loading-overlay" id="sp-loading"><div class="sp-loading-bg"><div class="loading  bar"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div><div class="loading-title" id="loading-title">加载中</div></div></div>');
            $('#sp-loading').addClass('show');
        },
    };

    $(function () {
        page.init();
    });
})(window.jQuery, top.sp);
