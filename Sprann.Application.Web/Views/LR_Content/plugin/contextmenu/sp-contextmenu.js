(function ($, sp) {
    "use strict";

    $.fn.spcontextmenu = function (op) {
        var dfop = {
            menulist: [],
            before: false
        };
        $.extend(dfop, op || {});

        var $self = $(this);
        dfop.id = $self.attr('id');
        if (!dfop.id) {
            return false;
        };
        if (!!$self[0]._spcontextmenu) {
            return false;
        };
        $self[0]._spcontextmenu = { "dfop": dfop };
        $self.on('contextmenu', function (e) {
            e.preventDefault();

            var $self = $(this);
            var dfop = $self[0]._spcontextmenu.dfop;
            var wrapid = dfop.id + '_contextmenu_wrap';
            var $wrap = $('#' + wrapid);
            if ($wrap.length > 0) {
                if (!!dfop.before) {
                    dfop.before(e, $wrap);
                }
                $wrap.show();
            }
            else {
                $wrap = $('<div class="sp-contextmenu-wrap" id="' + wrapid + '" ><ul class="sp-contextmenu-ul"></ul></div>');
                var $ul = $wrap.find('.sp-contextmenu-ul');

                for (var i = 0, l = dfop.menulist.length; i < l; i++) {
                    var item = dfop.menulist[i];
                    var $li = $('<li data-value="' + item.id + '" ><a href="javascript:;"><span>' + item.text + '</span><a></li>');
                    $li.on('click', item.click);
                    $ul.append($li);
                }

                $('body').append($wrap);
                $wrap.show();
                if (!!dfop.before) {
                    dfop.before(e, $wrap);
                }
            };

            var clientTop = $(window).scrollTop() + e.clientY,
                 x = ($wrap.width() + e.clientX < $(window).width()) ? e.clientX : e.clientX - $wrap.width(),
                 y = ($wrap.height() + e.clientY < $(window).height()) ? clientTop : clientTop - $wrap.height();

            $wrap.css({ 'left': x, 'top': y });

        });
        $(document).on('click', function () {
            var wrapid = dfop.id + '_contextmenu_wrap';
            var $wrap = $('#' + wrapid);
            $wrap.hide();
        });
    }

})(jQuery, top.sp);
