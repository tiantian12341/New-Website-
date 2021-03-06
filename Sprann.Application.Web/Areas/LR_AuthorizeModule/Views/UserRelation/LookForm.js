/*
 * 版 本 Sprann ADMS V1.0.0 敏捷开发框架(http://www.sp.cn)
 * Copyright (c) 2017-2018 思普瑞云(深圳)科技有限公司
 * 创建人：力软-前端开发组
 * 日 期：2017.04.18
 * 描 述：成员添加
 */
var objectId = request('objectId');

var bootstrap = function ($, sp) {
    "use strict";

    var page = {
        init: function () {
            page.bind();
            page.initData();
        },
        bind: function () {
            // 滚动条
            $('#user_list_warp').spscroll();
        },
        initData: function () {
            $.spSetForm(top.$.rootUrl + '/LR_AuthorizeModule/UserRelation/GetUserIdList?objectId=' + objectId, function (data) {
                if (data.userIds == "") {
                    return false;
                }
                var $warp = $('#user_list');
                var userlistselectedobj = {};
                $.each(data.userInfoList, function (id, item) {
                    if (item) {
                        userlistselectedobj[item.F_UserId] = item;
                    }
                });
                var userList = data.userIds.split(',');
                for (var i = 0, l = userList.length; i < l; i++) {
                    var userId = userList[i];
                    var item = userlistselectedobj[userId];
                    if (!!item) {
                        var imgName = "UserCard02.png";
                        if (item.F_Gender == 0) {
                            imgName = "UserCard01.png";
                        }
                        var _cardbox = "";
                        _cardbox += '<div class="card-box active " data-value="' + item.F_UserId + '" >';
                        _cardbox += '    <div class="card-box-img">';
                        _cardbox += '        <img src="' + top.$.rootUrl + '/Content/images/' + imgName + '" />';
                        _cardbox += '    </div>';
                        _cardbox += '    <div class="card-box-content">';
                        _cardbox += '        <p>账户：' + item.F_Account + '</p>';
                        _cardbox += '        <p>姓名：' + item.F_RealName + '</p>';
                        _cardbox += '        <p>部门：<span data-id="' + item.F_DepartmentId + '"></span></p>';
                        _cardbox += '    </div>';
                        _cardbox += '</div>';
                        $warp.append(_cardbox);
                        sp.clientdata.getAsync('department', {
                            key: item.F_DepartmentId,
                            callback: function (_data,op) {
                                $warp.find('[data-id="' + op.key + '"]').text(_data.name);
                            }
                        });
                    }
                }
            });
        }
    };
    page.init();
}