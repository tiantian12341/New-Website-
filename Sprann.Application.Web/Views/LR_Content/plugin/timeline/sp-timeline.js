$.fn.sptimeline = function (nodelist) {

    // title   标题
    // people  审核人
    // content 内容
    // time    时间

    var $self = $(this);
    if ($self.length == 0) {
        return $self;
    };
    $self.addClass('sp-timeline');
    var $wrap = $('<div class="sp-timeline-allwrap"></div>');
    var $ul = $('<ul></ul>');

    // 开始节点
    var $begin = $('<li class="sp-timeline-header"><div>当前</div></li>');
    $ul.append($begin);

    $.each(nodelist, function (_index, _item) {
        // 中间节点
        var $li = $('<li class="sp-timeline-item" ><div class="sp-timeline-wrap" ></div></li>');
        if (_index == 0) {
            $li.find('div').addClass('sp-timeline-current');
        }
        var $itemwrap = $li.find('.sp-timeline-wrap');
        var $itemcontent = $('<div class="sp-timeline-content"><span class="arrow"></span></div>');
        $itemcontent.append('<div class="sp-timeline-title">' + _item.title + '</div>');
        $itemcontent.append('<div class="sp-timeline-body"><span>' + _item.people + '</span>' + _item.content + '</div>');
        $itemwrap.append('<span class="sp-timeline-date">' + _item.time + '</span>');
        $itemwrap.append($itemcontent);
        $ul.append($li);
    });

    // 结束节点
    $ul.append('<li class="sp-timeline-ender"><div>开始</div></li>');
    
    $wrap.html($ul);
    $self.html($wrap);

};