var baseinfo;
var bootstrap = function ($, sp) {
    "use strict";

    var page = {
        init: function () {
            page.initleft();
            page.bind();
            page.initData();
        },
        bind: function () {
            
        },
        initleft: function () {
            $('#sp_left_list li').on('click', function () {
                var $this = $(this);
                if (!$this.hasClass('active')) {
                    var $parent = $this.parent();
                    $parent.find('.active').removeClass('active');
                    $this.addClass('active');
                    var _type = $this.attr('data-value');
                    $('.sp-layout-wrap-item').removeClass('active');
                    $('#sp_layout_item' + _type).addClass('active');
                }
            });
        },
        initData: function () {
            sp.httpAsyncGet(top.$.rootUrl + '/UserCenter/GetUserInfo', function (res) {
                if (res.code == 200) {
                    baseinfo  = res.data.baseinfo;
                    /*基础信息*/
                    $('#F_Account').val(baseinfo.account);
                    $('#F_EnCode').val(baseinfo.enCode);
                    $('#F_RealName').val(baseinfo.realName);
                    $('#F_Gender').val(baseinfo.gender == 0 ? '女' : '男');
                    sp.clientdata.getAsync('company', {
                        key: baseinfo.companyId,
                        callback: function (_data) {
                            $('#F_Company').val(_data.name);
                        }
                    });

                    sp.clientdata.getAsync('department', {
                        key: baseinfo.departmentId,
                        callback: function (_data) {
                            $('#F_Department').val(_data.name);
                        }
                    });
                    var post = [], role = [];
                    $.each(res.data.post, function (id, item) {
                        post.push(item.F_Name);
                    });
                    $.each(res.data.role, function (id, item) {
                        role.push(item.F_FullName);
                    });
                    $('#Post').val(String(post));
                    $('#Role').val(String(role));
                    $('#F_Description').val(baseinfo.description);
                }
                else {
                    sp.alert.error('数据加载失败');
                }
            });


        }
    };



    page.init();
}


