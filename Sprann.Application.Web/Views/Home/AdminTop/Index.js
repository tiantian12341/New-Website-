var bootstrap = function ($, sp) {
    "use strict";
    var meuns = {
        init: function () {
            this.load();
            this.bind();
        },
        load: function () {
            var modulesTree = sp.clientdata.get(['modulesTree']);

            // 第一级菜单
            var parentId = '0';
            var modules = modulesTree[parentId] || [];
            var $firstmenus = $('<ul class="sp-first-menu-list"></ul>');
            for (var i = 0, l = modules.length; i < l; i++) {
                var item = modules[i];
                if (item.F_IsMenu == 1) {
                    var $firstMenuItem = $('<li></li>');
                    if (!!item.F_Description) {
                        $firstMenuItem.attr('title', item.F_Description);
                    };
                    var menuItemHtml = '<a id="' + item.F_ModuleId + '" href="javascript:void(0);" class="sp-menu-item">';
                    menuItemHtml += '<i class="' + item.F_Icon + ' sp-menu-item-icon"></i>';
                    menuItemHtml += '<span class="sp-menu-item-text">' + item.F_FullName + '</span>';
                    menuItemHtml += '</a>';
                    $firstMenuItem.append(menuItemHtml);

                    // 第二级菜单
                    var secondModules = modulesTree[item.F_ModuleId] || [];
                    var $secondMenus = $('<ul class="sp-second-menu-list"></ul>');
                    var secondMenuHad = false;
                    for (var j = 0, sl = secondModules.length ; j < sl; j++) {
                        var secondItem = secondModules[j];
                        if (secondItem.F_IsMenu == 1) {
                            secondMenuHad = true;
                            var $secondMenuItem = $('<li></li>');
                            if (!!secondItem.F_Description) {
                                $secondMenuItem.attr('title', secondItem.F_Description);
                            };
                            var secondItemHtml = '<a id="' + secondItem.F_ModuleId + '" href="javascript:void(0);" class="sp-menu-item" >';
                            secondItemHtml += '<i class="' + secondItem.F_Icon + ' sp-menu-item-icon"></i>';
                            secondItemHtml += '<span class="sp-menu-item-text">' + secondItem.F_FullName + '</span>';
                            secondItemHtml += '</a>';

                            $secondMenuItem.append(secondItemHtml);
                            // 第三级菜单
                            var threeModules = modulesTree[secondItem.F_ModuleId] || [];
                            var $threeMenus = $('<ul class="sp-three-menu-list"></ul>');
                            var threeMenuHad = false;
                            for (var m = 0, tl = threeModules.length ; m < tl; m++) {
                                var threeItem = threeModules[m];
                                if (threeItem.F_IsMenu == 1) {
                                    threeMenuHad = true;
                                    var $threeMenuItem = $('<li></li>');
                                    $threeMenuItem.attr('title', threeItem.F_FullName);
                                    var threeItemHtml = '<a id="' + threeItem.F_ModuleId + '" href="javascript:void(0);" class="sp-menu-item" >';
                                    threeItemHtml += '<i class="' + threeItem.F_Icon + ' sp-menu-item-icon"></i>';
                                    threeItemHtml += '<span class="sp-menu-item-text">' + threeItem.F_FullName + '</span>';
                                    threeItemHtml += '</a>';
                                    $threeMenuItem.append(threeItemHtml);
                                    $threeMenus.append($threeMenuItem);
                                }
                            };
                            if (threeMenuHad) {
                                $secondMenuItem.addClass('sp-meun-had');
                                $secondMenuItem.find('a').append('<span class="sp-menu-item-arrow"><i class="fa fa-angle-left"></i></span>');
                                //$secondMenuItem.find('a').addClass('open').append('<span class="sp-menu-item-arrow"><i class="fa fa-angle-left"></i></span>');
                                $secondMenuItem.append($threeMenus);
                                $threeMenus.css('display', 'none');
                            };
                            $secondMenus.append($secondMenuItem);
                        }
                    }
                    if (secondMenuHad) {
                        $secondMenus.attr('data-value', item.F_ModuleId);
                        $('#sp_second_menu_wrap').append($secondMenus);
                    };
                    $firstmenus.append($firstMenuItem);
                }
            };
            $('#sp_frame_menu').html($firstmenus);

            // 语言包翻译
            //$('.sp-menu-item-text').each(function () {
            //    var $this = $(this);
            //    var text = $this.text();
            //    sp.language.get(text, function (_text) {
            //        $this.text(_text);
            //        $this.parent().parent().attr('title', _text);
            //    });
            //});

        },
        bind: function () {
            $("#sp_frame_menu").spscroll();
            $("#sp_second_menu_wrap").spscroll();

            var w = 0;
            var width = $('.sp-first-menu-list').children('li').each(function () {
                w += $(this).outerWidth();
            });
            $('.sp-first-menu-list').css({ 'width': w+60 });
            $('.sp-first-menu-list').parent().css({ 'width': w + 60 });

            // 添加点击事件
            $('#sp_frame_menu .sp-menu-item').on('click', function () {
                var $obj = $(this);
                var id = $obj.attr('id');
                var _module = sp.clientdata.get(['modulesMap', id]);

                //debugger; //3

                switch (_module.F_Target) {
                    case 'iframe':// 窗口
                        if (sp.validator.isNotNull(_module.F_UrlAddress).code) {
                            sp.frameTab.open(_module);
                        }
                        else {

                        }
                        break;
                    case 'expand':
                        if (!$obj.hasClass('active')) {
                            $('#sp_frame_menu .active').removeClass('active');
                            $obj.addClass('active');
                            $obj.parent().addClass('active');
                            var $subMenu = $('#sp_second_menu_wrap');
                            $subMenu.find('.sp-second-menu-list').hide();
                            $subMenu.find('.sp-second-menu-list[data-value="' + id + '"]').show();
                        }
                        break;
                }
            });

            // 添加点击事件
            $('#sp_second_menu_wrap .sp-menu-item').on('click', function () {
                var $obj = $(this);
                var id = $obj.attr('id');
                var _module = sp.clientdata.get(['modulesMap', id]);

                //var $parent = $obj.parent().parent();
                //if ($parent.is($('.sp-three-menu-list'))) {
                //    $obj.addClass('active');
                //    $('a', $parent).not($obj).removeClass('active');
                //} 
                //debugger; //4

                switch (_module.F_Target) {
                    case 'iframe':// 窗口
                        if (sp.validator.isNotNull(_module.F_UrlAddress).code) {
                            sp.frameTab.open(_module);
                        }
                        else {

                        }
                        break;
                    case 'open': //新开窗口
                        top.open(_module.F_UrlAddress);
                        break;
                    case 'expand':// 打开子菜单
                        var $ul = $obj.next();
                        //if ($ul.is(':visible')) {
                        //    $ul.slideUp(180, function () {
                        //        $obj.removeClass('open');
                        //    });
                        //}
                        //else {
                        //    $ul.slideDown(180, function () {
                        //        $obj.addClass('open');
                        //    });
                        //}
                        $ul.stop(false, true).slideToggle(150);
                        $obj.toggleClass('open');
                        break;
                }
            });

            $('.sp-first-menu-list>li').eq(0).find('a').trigger('click');

            $('#sp_frame_menu_btn').on('click', function () {
                var $body = $('body');
                if ($body.hasClass('sp-menu-closed')) {
                    $body.removeClass('sp-menu-closed');
                }
                else {
                    $body.addClass('sp-menu-closed');
                }
            });

            $('#sp_second_menu_wrap a').hover(function () {
                if ($('body').hasClass('sp-menu-closed')) {
                    var id = $(this).attr('id');
                    var text = $('#' + id + '>span').text();
                    layer.tips(text, $(this));
                }
            }, function () {
                if ($('body').hasClass('sp-menu-closed')) {
                    layer.closeAll('tips');
                }
            });
        }
    };

    meuns.init();

    var companyMap = {};
    var departmentMap = {};
    var userMap = {};

    var imUserId = '';

    var getHeadImg = function (user) {
        var url = top.$.rootUrl;
        switch (user.img) {
            case '0':
                url += '/Content/images/head/on-girl.jpg';
                break;
            case '1':
                url += '/Content/images/head/on-boy.jpg';
                break;
            default:
                url += '/LR_OrganizationModule/User/GetImg?userId=' + user.id;
                break;
        }
        return url;
    };
    // 发送聊天信息
    //var sendMsg = function (msg, time) {
    //    var loginInfo = sp.clientdata.get(['userinfo']);
    //    sp.clientdata.getAsync('user', {
    //        key: loginInfo.userId,
    //        callback: function (data, op) {
    //            data.id = op.key;
    //            var _html = '\
    //            <div class="me im-time">'+ (time || '') + '</div>\
    //            <div class="im-me">\
    //                <div class="headimg"><img src="'+ getHeadImg(data) + '"></div>\
    //                <div class="arrow"></div>\
    //                <span class="content">'+ msg + '</span>\
    //            </div>';

    //            $('.sp-im-msgcontent .sp-scroll-box').append(_html);
    //            $('.sp-im-msgcontent').spscrollSet('moveBottom');
    //        }
    //    });
    //};
    // 接收聊天消息
    //var revMsg = function (userId, msg, time) {
    //    sp.clientdata.getAsync('user', {
    //        key: userId,
    //        callback: function (data, op) {
    //            data.id = op.key;
    //            var _html = '\
    //            <div class="im-time">'+ (time || '') + '</div>\
    //            <div class="im-other">\
    //                <div class="headimg"><img src="'+ getHeadImg(data) + '"></div>\
    //                <div class="arrow"></div>\
    //                <span class="content">'+ msg + '</span>\
    //            </div>';


    //            $('.sp-im-msgcontent .sp-scroll-box').append(_html);
    //            $('.sp-im-msgcontent').spscrollSet('moveBottom');
    //        }
    //    });
    //};

    //var getTime = function (time) {
    //    var d = new Date();
    //    var c = d.DateDiff('d', time);
    //    if (c <= 1) {
    //        return sp.formatDate(time, 'hh:mm:ss');
    //    }
    //    else {
    //        return sp.formatDate(time, 'yyyy/MM/dd');
    //    }
    //}

    // 即时通讯
    //var im = {
    //    init: function () {
    //        this.bind();
    //        this.load();
    //    },
    //    load: function () {
    //        // 获取下公司列表
    //        sp.clientdata.getAllAsync('company', {
    //            callback: function (data) {
    //                $.each(data, function (_id, _item) {
    //                    companyMap[_item.parentId] = companyMap[_item.parentId] || [];
    //                    _item.id = _id;
    //                    companyMap[_item.parentId].push(_item);
    //                });
    //                var $list = $('#sp_im_content_userlist .sp-scroll-box');
    //                $.each(companyMap["0"], function (_index, _item) {
    //                    var _html = '\
    //                        <div class="sp-im-company-item">\
    //                            <div class="sp-im-item-name sp-im-company" data-value="'+ _item.id + '"  data-deep="0" >\
    //                                <i class="fa fa-angle-right"></i>'+ _item.name + '\
    //                            </div>\
    //                        </div>';
    //                    $list.append(_html);

    //                });
    //                // 获取部门列表
    //                sp.clientdata.getAllAsync('department', {
    //                    callback: function (data) {
    //                        $.each(data, function (_id, _item) {
    //                            _item.id = _id;
    //                            if (_item.parentId == "0") {
    //                                departmentMap[_item.companyId] = departmentMap[_item.companyId] || [];
    //                                departmentMap[_item.companyId].push(_item);
    //                            }
    //                            else {
    //                                departmentMap[_item.parentId] = departmentMap[_item.parentId] || [];
    //                                departmentMap[_item.parentId].push(_item);
    //                            }
    //                        });

    //                        // 获取人员数据
    //                        sp.clientdata.getAllAsync('user', {
    //                            callback: function (data) {
    //                                $.each(data, function (_id, _item) {
    //                                    _item.id = _id;
    //                                    if (_item.departmentId) {
    //                                        userMap[_item.departmentId] = userMap[_item.departmentId] || [];
    //                                        userMap[_item.departmentId].push(_item);
    //                                    }
    //                                    else if (_item.companyId) {
    //                                        userMap[_item.companyId] = userMap[_item.companyId] || [];
    //                                        userMap[_item.companyId].push(_item);
    //                                    }
    //                                });

    //                                // 获取最近联系人列表
    //                                sp.im.getContacts(function (data) {
    //                                    var $userList = $('#sp_immsg_userlist .sp-scroll-box');
    //                                    $.each(data, function (_index, _item) {
    //                                        var html = '\
    //                                        <div class="msg-item'+ (_item.F_IsRead == '1' ? 'imHasMsg' : '') + '" data-value="' + _item.F_OtherUserId + '" >\
    //                                            <div class="photo">\
    //                                                <img src="'+ top.$.rootUrl + '/Content/images/head/on-boy.jpg">\
    //                                                <div class="point"></div>\
    //                                            </div>\
    //                                            <div class="name"></div>\
    //                                            <div class="msg">'+ (_item.F_Content || '') + '</div>\
    //                                            <div class="date">'+ getTime(_item.F_Time) + '</div>\
    //                                        </div>';
    //                                        $userList.append(html);
    //                                        sp.clientdata.getAsync('user', {
    //                                            key: _item.F_OtherUserId,
    //                                            callback: function (data, op) {
    //                                                var $item = $userList.find('[data-value="' + op.key + '"]');
    //                                                $item.find('.name').text(data.name);
    //                                                data.id = op.key;
    //                                                $item.find('img').attr('src', getHeadImg(data));
    //                                                $item = null;
    //                                            }
    //                                        });
    //                                    });
    //                                });

    //                            }
    //                        });

    //                    }
    //                });

    //            }
    //        });
    //    },
    //    bind: function () {
    //        $('#sp_immsg_userlist').spscroll();
    //        $('#sp_im_content_userlist').spscroll();
    //        $('.sp-im-msgcontent').spscroll();

    //        // 打开关闭聊天窗
    //        $('.sp-im-bell').on('click', function () {
    //            var $this = $(this);
    //            if ($this.hasClass('open')) {
    //                $this.removeClass('open');
    //                $('.sp-im-body').removeClass('open');

    //                $('.sp-im-black-overlay').hide();
    //                imUserId = '';
    //            }
    //            else {
    //                $this.addClass('open');
    //                $('.sp-im-bell .point').hide();
    //                $('.sp-im-body').addClass('open');
    //            }
    //        });

    //        // 最近消息 与 联系人之间的切换
    //        $('.sp-im-title .title-item').on('click', function () {
    //            var $this = $(this);
    //            if (!$this.hasClass('active')) {
    //                $('.sp-im-body>.active').removeClass('active');
    //                $('.sp-im-title>.active').removeClass('active');
    //                $this.addClass('active');
    //                var v = $this.attr('data-value');
    //                $('#' + v).addClass('active');
    //            }
    //        });

    //        // 联系人
    //        $('#sp_im_content_userlist .sp-scroll-box').on('click', function (e) {
    //            e = e || window.event;
    //            var et = e.target || e.srcElement;
    //            var $et = $(et);

    //            if (et.tagName == 'IMG' || et.tagName == 'I') {
    //                $et = $et.parent();
    //            }

    //            if ($et.hasClass('sp-im-company')) {// 点击公司项
    //                // 判断是否是打开的状态
    //                if ($et.hasClass('open')) {
    //                    $et.removeClass('open');
    //                    $et.parent().find('.sp-im-user-list').remove();

    //                } else {
    //                    var id = $et.attr('data-value');
    //                    var deep = parseInt($et.attr('data-deep'));
    //                    var $list = $('<div class="sp-im-user-list" ></div>');
    //                    $list.css({ 'padding-left': '10px' });
    //                    var flag = false;
    //                    // 加载员工
    //                    $.each(userMap[id] || [], function (_index, _item) {
    //                        var _html = '\
    //                        <div class="sp-im-company-item">\
    //                            <div class="sp-im-item-name sp-im-user" data-value="'+ _item.id + '" >\
    //                                 <img src="'+ getHeadImg(_item) + '" >' + _item.name + '\
    //                            </div>\
    //                        </div>';
    //                        $list.append(_html);
    //                        flag = true;
    //                    });
    //                    // 加载部门
    //                    $.each(departmentMap[id] || [], function (_index, _item) {
    //                        var _html = '\
    //                        <div class="sp-im-company-item">\
    //                            <div class="sp-im-item-name sp-im-department" data-value="'+ _item.id + '"  data-deep="' + (deep + 1) + '" >\
    //                                <i class="fa fa-angle-right"></i>'+ _item.name + '\
    //                            </div>\
    //                        </div>';
    //                        $list.append(_html);
    //                        flag = true;
    //                    });
    //                    // 加载下属公司
    //                    $.each(companyMap[id] || [], function (_index, _item) {
    //                        var _html = '\
    //                        <div class="sp-im-company-item">\
    //                            <div class="sp-im-item-name sp-im-company" data-value="'+ _item.id + '"  data-deep="' + (deep + 1) + '" >\
    //                                <i class="fa fa-angle-right"></i>'+ _item.name + '\
    //                            </div>\
    //                        </div>';
    //                        $list.append(_html);
    //                        flag = true;
    //                    });



    //                    if (flag) {
    //                        $et.parent().append($list);
    //                    }
    //                    $et.addClass('open');
    //                }
    //                return false;
    //            }
    //            else if ($et.hasClass('sp-im-department')) {
    //                // 判断是否是打开的状态
    //                if ($et.hasClass('open')) {
    //                    $et.removeClass('open');
    //                    $et.parent().find('.sp-im-user-list').remove();

    //                } else {
    //                    var id = $et.attr('data-value');
    //                    var deep = parseInt($et.attr('data-deep'));
    //                    var $list = $('<div class="sp-im-user-list" ></div>');
    //                    $list.css({ 'padding-left': '10px' });
    //                    var flag = false;
    //                    // 加载员工
    //                    $.each(userMap[id] || [], function (_index, _item) {
    //                        var _html = '\
    //                        <div class="sp-im-company-item">\
    //                            <div class="sp-im-item-name sp-im-user" data-value="'+ _item.id + '" >\
    //                                 <img src="'+ getHeadImg(_item) + '" >' + _item.name + '\
    //                            </div>\
    //                        </div>';
    //                        $list.append(_html);
    //                        flag = true;
    //                    });
    //                    // 加载部门
    //                    $.each(departmentMap[id] || [], function (_index, _item) {
    //                        var _html = '\
    //                        <div class="sp-im-company-item">\
    //                            <div class="sp-im-item-name sp-im-department" data-value="'+ _item.id + '"  data-deep="' + (deep + 1) + '" >\
    //                                <i class="fa fa-angle-right"></i>'+ _item.name + '\
    //                            </div>\
    //                        </div>';
    //                        $list.append(_html);
    //                        flag = true;
    //                    });

    //                    if (flag) {
    //                        $et.parent().append($list);
    //                    }
    //                    $et.addClass('open');

    //                }

    //            }
    //            else if ($et.hasClass('sp-im-user')) {
    //                // 如果是用户列表
    //                // 1.打开聊天窗口
    //                // 2.添加一条最近联系人数据（如果没有添加的话）
    //                // 3.获取最近的20条聊天数据或者最近的聊天信息


    //                var id = $et.attr('data-value');
    //                var $userList = $('#sp_immsg_userlist .sp-scroll-box');
    //                var $userItem = $userList.find('[data-value="' + id + '"]');

    //                // 更新下最近的联系人列表数据
    //                $('.sp-im-title .title-item').eq(0).trigger('click');

    //                imUserId = id;
    //                if ($userItem.length > 0) {
    //                    $userList.prepend($userItem);
    //                    $userItem.trigger('click');
    //                }
    //                else {
    //                    var imgurl = $et.find('img').attr('src');
    //                    var _html = '\
    //                        <div class="msg-item" data-value="' + id + '" >\
    //                            <div class="photo">\
    //                                <img src="'+ imgurl + '">\
    //                                <div class="point"></div>\
    //                            </div>\
    //                            <div class="name"></div>\
    //                            <div class="msg"></div>\
    //                            <div class="date"></div>\
    //                        </div>';
    //                    $userList.prepend(_html);
    //                    $userItem = $userList.find('[data-value="' + id + '"]');
    //                    // 获取人员数据
    //                    sp.clientdata.getAsync('user', {
    //                        key: id,
    //                        callback: function (data, op) {
    //                            $userList.find('[data-value="' + op.key + '"] .name').text(data.name);
    //                            $userItem.trigger('click');
    //                        }
    //                    });
    //                    sp.im.addContacts(id);
    //                }

    //            }
    //        });
    //        // 最近联系人列表点击
    //        $('#sp_immsg_userlist .sp-scroll-box').on('click', function (e) {
    //            e = e || window.event;
    //            var et = e.target || e.srcElement;
    //            var $et = $(et);

    //            if (!$et.hasClass('msg-item')) {
    //                $et = $et.parents('.msg-item');
    //            }
    //            if ($et.length > 0) {
    //                if (!$et.hasClass('active')) {
    //                    var name = $et.find('.name').text();
    //                    imUserId = $et.attr('data-value');

    //                    $('#sp_immsg_userlist .sp-scroll-box .active').removeClass('active');
    //                    $et.addClass('active');

    //                    $('.sp-im-black-overlay').show();
    //                    var $imdialog = $('.sp-im-dialog');
    //                    $imdialog.find('.im-title').text("与" + name + "对话中");

    //                    $('#sp_im_input').val('');
    //                    $('#sp_im_input').select();

    //                    $('.sp-im-msgcontent .sp-scroll-box').html('');
    //                    // 获取聊天信息
    //                    sp.im.getMsgList(imUserId, function (data) {
    //                        var len = data.length;
    //                        if (len > 0) {
    //                            for (var i = len - 1; i >= 0; i--) {
    //                                var _item = data[i];
    //                                sp.clientdata.getAsync('user', {
    //                                    key: _item.userId,
    //                                    msg: _item.content,
    //                                    time: _item.time,
    //                                    callback: function (data, op) {
    //                                        data.id = op.key;
    //                                        var loginInfo = sp.clientdata.get(['userinfo']);
    //                                        var _html = '\
    //                                        <div class="im-time '+ (loginInfo.userId == op.key ? 'me' : '') + ' ">' + op.time + '</div>\
    //                                        <div class="'+ (loginInfo.userId == op.key ? 'im-me' : 'im-other') + '">\
    //                                            <div class="headimg"><img src="'+ getHeadImg(data) + '"></div>\
    //                                            <div class="arrow"></div>\
    //                                            <span class="content">'+ op.msg + '</span>\
    //                                        </div>';
    //                                        $('.sp-im-msgcontent .sp-scroll-box').prepend(_html);
    //                                    }
    //                                });
    //                            }
    //                            $('.sp-im-msgcontent').spscrollSet('moveBottom');
    //                        }
    //                    }, $et.hasClass('imHasMsg'));
    //                    $et.removeClass('imHasMsg');
    //                    sp.im.updateContacts(imUserId);
    //                }
    //            }
    //        });


    //        // 联系人搜索
    //        $('.sp-im-search input').on("keypress", function (e) {
    //            e = e || window.event;
    //            if (e.keyCode == "13") {
    //                var $this = $(this);
    //                var keyword = $this.val();
    //                var $list = $('#sp_im_content_userlist .sp-scroll-box');
    //                $list.html("");
    //                if (keyword) {
    //                    sp.clientdata.getAllAsync('user', {
    //                        callback: function (data) {
    //                            $.each(data, function (_index, _item) {
    //                                if (_item.name.indexOf(keyword) != -1) {
    //                                    _item.id = _index;
    //                                    var _html = '\
    //                                    <div class="sp-im-company-item">\
    //                                        <div class="sp-im-item-name sp-im-user" data-value="'+ _item.id + '" >\
    //                                             <img src="'+ getHeadImg(_item) + '" >' + _item.name + '\
    //                                        </div>\
    //                                    </div>';
    //                                    $list.append(_html);
    //                                }
    //                            });
    //                        }
    //                    });
    //                }
    //                else {
    //                    $.each(companyMap["0"], function (_index, _item) {
    //                        var _html = '\
    //                        <div class="sp-im-company-item">\
    //                            <div class="sp-im-item-name sp-im-company" data-value="'+ _item.id + '"  data-deep="0" >\
    //                                <i class="fa fa-angle-right"></i>'+ _item.name + '\
    //                            </div>\
    //                        </div>';
    //                        $list.append(_html);
    //                    });
    //                }

    //            }
    //        });

    //        // 发送消息
    //        $('#sp_im_input').on("keypress", function (e) {
    //            e = e || window.event;
    //            if (e.keyCode == "13") {
    //                var text = $(this).val();
    //                $(this).val('');
    //                if (text.replace(/(^\s*)|(\s*$)/g, "") != '') {
    //                    var time = sp.im.sendMsg(imUserId, text);
    //                    sendMsg(text, time);
    //                    var $userItem = $('#sp_immsg_userlist .sp-scroll-box [data-value="' + imUserId + '"]');
    //                    $userItem.find('.msg').text(text);
    //                    $userItem.find('.date').text(getTime(sp.getDate('yyyy-MM-dd hh:mm:ss')));
    //                    $userItem = null;
    //                }
    //                return false;
    //            }
    //        });
    //        // 注册消息接收
    //        sp.im.registerRevMsg(function (userId, msg, dateTime) {
    //            var $userList = $('#sp_immsg_userlist .sp-scroll-box');
    //            var $userItem = $userList.find('[data-value="' + userId + '"]');
    //            // 判断当前账号是否打开聊天窗口
    //            if (userId == imUserId) {
    //                revMsg(userId, msg, dateTime);
    //                sp.im.updateContacts(userId);
    //                $userItem.find('.msg').text(msg);
    //                $userItem.find('.date').text(getTime(dateTime));
    //            }
    //            else {
    //                if ($userItem.length > 0) {
    //                    $userList.prepend($userItem);
    //                    if (!$userItem.hasClass('imHasMsg')) {
    //                        $userItem.addClass('imHasMsg');
    //                    }
    //                    $userItem.find('.msg').text(msg);
    //                    $userItem.find('.date').text(getTime(dateTime));
    //                }
    //                else {
    //                    var html = '\
    //                        <div class="msg-item" data-value="' + userId + '" >\
    //                            <div class="photo">\
    //                                <img src="'+ top.$.rootUrl + '/Content/images/head/on-boy.jpg">\
    //                                <div class="point"></div>\
    //                            </div>\
    //                            <div class="name"></div>\
    //                            <div class="msg">'+ msg + '</div>\
    //                            <div class="date">'+ getTime(dateTime) + '</div>\
    //                        </div>';
    //                    $userList.prepend(html);
    //                    sp.clientdata.getAsync('user', {
    //                        key: userId,
    //                        callback: function (data, op) {
    //                            var $item = $userList.find('[data-value="' + op.key + '"]');
    //                            $item.find('.name').text(data.name);
    //                            data.id = op.key;
    //                            $item.find('img').attr('src', getHeadImg(data));
    //                            $item = null;
    //                        }
    //                    });
    //                }
    //            }
    //            if (!$('.sp-im-bell').hasClass('open')) {
    //                $('.sp-im-bell .point').show();
    //            }
    //        });


    //        // 查看聊天记录
    //        $('#sp_im_look_msg_btn').on('click', function () {
    //            sp.layerForm({
    //                id: 'LookMsgIndex',
    //                title: '查看聊天记录-' + $('#sp_im_msglist .sp-im-right .sp-im-touser').text(),
    //                url: top.$.rootUrl + '/LR_IM/IMMsg/Index?userId=' + imUserId,
    //                width: 800,
    //                height: 500,
    //                maxmin: true,
    //                btn: null
    //            });
    //        });

    //        $('.im-close').on('click', function () {
    //            $('#sp_immsg_userlist .sp-scroll-box [data-value="' + imUserId + '"]').removeClass('active');
    //            $('.sp-im-black-overlay').hide();
    //            imUserId = '';
    //        });
    //    }
    //};

    //im.init();
};