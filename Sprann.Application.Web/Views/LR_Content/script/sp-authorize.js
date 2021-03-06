(function ($, sp) {
    "use strict";

    $.fn.spAuthorizeJfGrid = function (op) {
        if (!op["skipInspection"]) {
            var _headData = [];
            $.each(op.headData, function (id, item) {
                if (!!spModuleColumnList[item.name.toLowerCase()]) {
                    _headData.push(item);
                }
            });
            op.headData = _headData;
        };
        $(this).jfGrid(op);
    };

    $(function () {
        function btnAuthorize() {
            if (!!spModuleButtonList) {
                console.log(spModuleButtonList);
                var $container = $('[sp-authorize="yes"]');
                $container.find('[id]').each(function () {
                    var $this = $(this);
                    var id = $this.attr('id');
                    if (!spModuleButtonList[id]) {
                        $this.remove();
                    }
                });
                $container.find('.dropdown-menu').each(function () {
                    var $this = $(this);
                    if ($this.find('li').length == 0) {
                        $this.remove();
                    }
                });
                $container.css({'display': 'inline-block' });
            }
            else {
                setTimeout(btnAuthorize,100);
            }
        };
        btnAuthorize();
    });

})(window.jQuery, top.sp);
