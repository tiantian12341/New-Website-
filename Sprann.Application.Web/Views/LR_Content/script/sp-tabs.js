(function ($, sp) {
    "use strict";
    //初始化菜单和tab页的属性Id
    var iframeIdList = {};

    sp.frameTab = {
        iframeId: '',
        init: function () {
            sp.frameTab.bind();
        },
        bind: function () {
            $(".sp-frame-tabs-wrap").spscroll();
        },
        setCurrentIframeId: function (iframeId) {
            sp.iframeId = iframeId;
        },
        open: function (module, notAllowClosed) {
            var $tabsUl = $('#sp_frame_tabs_ul');
            var $frameMain = $('#sp_frame_main');

            if (iframeIdList[module.F_ModuleId] == undefined || iframeIdList[module.F_ModuleId] == null) {
                // 隐藏之前的tab和窗口
                if (sp.frameTab.iframeId != '') {
                    $tabsUl.find('#sp_tab_' + sp.frameTab.iframeId).removeClass('active');
                    $frameMain.find('#sp_iframe_' + sp.frameTab.iframeId).removeClass('active');
                    iframeIdList[sp.frameTab.iframeId] = 0;
                }
                var parentId = sp.frameTab.iframeId;
                sp.frameTab.iframeId = module.F_ModuleId;
                iframeIdList[sp.frameTab.iframeId] = 1;

                // 打开一个功能模块tab_iframe页面
                var $tabItem = $('<li class="sp-frame-tabItem active" id="sp_tab_' + module.F_ModuleId + '" parent-id="' + parentId + '"  ><span>' + module.F_FullName + '</span></li>');
                // 翻译
                sp.language.get(module.F_FullName, function (text) {
                    $tabItem.find('span').text(text);
                });

                if (!notAllowClosed) {
                    $tabItem.append('<span class="reomve" title="关闭窗口"><i class="fa fa-times" aria-hidden="true"></i></span>');
                }
                sp.spLoading(true);
                var $iframe = $('<iframe class="sp-frame-iframe active" id="sp_iframe_' + module.F_ModuleId + '" frameborder="0" src="' + $.rootUrl + module.F_UrlAddress + '"></iframe>');

                $iframe.load(function () {
                    if (module.F_ModuleId != '0') {
                        sp.spLoading(false);
                    }
                });

                $tabsUl.append($tabItem);
                $frameMain.append($iframe);

                var w = 0;
                var width = $tabsUl.children().each(function () {
                    w += $(this).outerWidth();
                });
                $tabsUl.css({ 'width': w });
                $tabsUl.parent().css({ 'width': w });

                $(".sp-frame-tabs-wrap").spscrollSet('moveRight');

                //绑定一个点击事件
                $tabItem.on('click', function () {
                    var id = $(this).attr('id').replace('sp_tab_', '');
                    sp.frameTab.focus(id);
                });
                $tabItem.find('.reomve').on('click', function () {
                    var id = $(this).parent().attr('id').replace('sp_tab_', '');
                    sp.frameTab.close(id);
                    return false;
                });

                if (!!sp.frameTab.opencallback) {
                    sp.frameTab.opencallback();
                }
                if (!notAllowClosed) {
                    $.ajax({
                        url: top.$.rootUrl + "/Home/VisitModule",
                        data: { moduleName: module.F_FullName, moduleUrl: module.F_UrlAddress },
                        type: "post",
                        dataType: "text"
                    });
                }
            }
            else {
                sp.frameTab.focus(module.F_ModuleId);
            }
        },
        focus: function (moduleId) {
            if (iframeIdList[moduleId] == 0) {
                // 定位焦点tab页
                $('#sp_tab_' + sp.frameTab.iframeId).removeClass('active');
                $('#sp_iframe_' + sp.frameTab.iframeId).removeClass('active');
                iframeIdList[sp.frameTab.iframeId] = 0;

                $('#sp_tab_' + moduleId).addClass('active');
                $('#sp_iframe_' + moduleId).addClass('active');
                sp.frameTab.iframeId = moduleId;
                iframeIdList[moduleId] = 1;

                if (!!sp.frameTab.opencallback) {
                    sp.frameTab.opencallback();
                }
            }
        },
        leaveFocus: function () {
            $('#sp_tab_' + sp.frameTab.iframeId).removeClass('active');
            $('#sp_iframe_' + sp.frameTab.iframeId).removeClass('active');
            iframeIdList[sp.frameTab.iframeId] = 0;
            sp.frameTab.iframeId = '';
        },
        close: function (moduleId) {
            delete iframeIdList[moduleId];

            var $this = $('#sp_tab_' + moduleId);
            var $prev = $this.prev();// 获取它的上一个节点数据;
            if ($prev.length < 1) {
                $prev = $this.next();
            }
            $this.remove();
            $('#sp_iframe_' + moduleId).remove();
            if (moduleId == sp.frameTab.iframeId && $prev.length > 0) {
                var prevId = $prev.attr('id').replace('sp_tab_', '');

                $prev.addClass('active');
                $('#sp_iframe_' + prevId).addClass('active');
                sp.frameTab.iframeId = prevId;
                iframeIdList[prevId] = 1;
            }
            else {
                if ($prev.length < 1) {
                    sp.frameTab.iframeId = "";
                }
            }

            var $tabsUl = $('#sp_frame_tabs_ul');
            var w = 0;
            var width = $tabsUl.children().each(function () {
                w += $(this).outerWidth();
            });
            $tabsUl.css({ 'width': w });
            $tabsUl.parent().css({ 'width': w });

            if (!!sp.frameTab.closecallback) {
                sp.frameTab.closecallback();
            }
        }
        // 获取当前窗口
        ,currentIframe: function () {
            var ifameId = 'sp_iframe_' + sp.frameTab.iframeId;
            if (top.frames[ifameId].contentWindow != undefined) {
                return top.frames[ifameId].contentWindow;
            }
            else {
                return top.frames[ifameId];
            }
        }
        ,parentIframe: function () {
            var ifameId = 'sp_iframe_' + top.$('#sp_tab_'+sp.frameTab.iframeId).attr('parent-id');
            if (top.frames[ifameId].contentWindow != undefined) {
                return top.frames[ifameId].contentWindow;
            }
            else {
                return top.frames[ifameId];
            }
        }
        , opencallback: false
        , closecallback: false
    };

    sp.frameTab.init();
})(window.jQuery, top.sp);
