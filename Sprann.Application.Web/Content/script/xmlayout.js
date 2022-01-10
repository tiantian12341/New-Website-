$.xmlayout = {
    pop_zindex: 0,
    xmparams: {},
    panel_ids: [],
    panel_tree_list_i: [],
    resize_fun: [],
    timer: 1e4,
    play_panel: [],
    anim_wd: null,
    anim_tf: !1,
    playbottom: null,
    playheader: null,
    playfi: !1,
    playfn: !1,
    LANG: null,
    change_panel: null,
    pages: [],
    layout: function(e) {
        if (null == e || null == e) throw "XMlayout info: param 'panel' in function $.xmlayout init() is null!";
        if ($.xmlayout.__isNaN(e.height()) || $.xmlayout.__isNaN(e.width()) || e.height() <= 0 || e.width() <= 0) throw "XMlayout info: can't get the width and height of 'panel'";
        return {
            root_panel: e,
            panel_data: null,
            panel_tree: null,
            panel_tree_list: [],
            random_class: {
                tool_random_class: null,
                f_tool_random_class: null,
                targ_panel_random_class: null,
                targ_title_random_class: null,
                f_targ_panel_random_class: null,
                f_targ_title_random_class: null
            },
            panel_arr: [],
            panel_offset: null,
            drag_bar_unit: 4,
            drag_bar_color: "black",
            pop_count: [],
            popped_count: 0,
            RPID: {
                ZOOM_IN: 0,
                ZOOM_OUT: 1,
                FULLSCREEN_RESIZE: 2,
                POPPED_BERTH: 3,
                FULLSCREEN_RESIZE1: 4,
                CHANGE_PANEL: 5
            },
            POPWH: {
                width: 800,
                height: 600
            },
            RPCOLOR: "#CFCFCF",
            resize_fun: [],
            pborder: "no",
            dragfix: 100,
            iszoom: !1,
            ispop: !1,
            isradius: !0,
            isindexshow: !1,
            playuseable: !0,
            init: function(e) {
                var l = this,
                    t = e.data,
                    n = e.drag_bar_unit,
                    a = e.drag_bar_color,
                    i = e.lang,
                    o = e.popw,
                    p = e.poph,
                    r = e.timer,
                    s = e.playuseable,
                    d = e.isborder,
                    u = e.isradius,
                    c = e.pborder,
                    h = e.isindexshow,
                    m = e.dragfix,
                    f = e.isdestroy;
                try {
                    if (null == t || null == t) throw "XMlayout info: param 'data' in function $.xmlayout init() is null!";
                    if (null != n && null != n) {
                        if ($.xmlayout.__isNaN(n)) throw "XMlayout info: param 'drag_bar_unit' in function $.xmlayout init() is not a number!";
                        if (n < 0) throw "XMlayout info: param 'drag_bar_unit' < 0 in function $.xmlayout init()!";
                        l.drag_bar_unit = n
                    }
                    if (null != a && null != a) {
                        if ("string" != typeof a) throw "XMlayout info: param 'drag_bar_color' in function $.xmlayout init() is not a string!";
                        l.drag_bar_color = a
                    }
                    if (null != i && null != i) {
                        if ("string" != typeof i) throw "XMlayout info: param 'drag_bar_color' in function $.xmlayout init() is not a string!"
                    } else i = "chs";
                    if ($.xmlayout.LANG = $.xmlayout.__getLang(i), null != o && null != o) {
                        if ($.xmlayout.__isNaN(o)) throw "XMlayout info: param 'popw' in function $.xmlayout init() is not a number!";
                        if (o < 1) throw "XMlayout info: param 'popw' < 1 in function $.xmlayout init()!";
                        l.POPWH.width = o
                    }
                    if (null != p && null != p) {
                        if ($.xmlayout.__isNaN(p)) throw "XMlayout info: param 'poph' in function $.xmlayout init() is not a number!";
                        if (p < 1) throw "XMlayout info: param 'poph' < 1 in function $.xmlayout init()!";
                        l.POPWH.height = p
                    }
                    if (null != r && null != r) {
                        if ($.xmlayout.__isNaN(r)) throw "XMlayout info: param 'timer' in function $.xmlayout init() is not a number!";
                        $.xmlayout.timer = r
                    }
                    if (null != m && null != m) {
                        if ($.xmlayout.__isNaN(m)) throw "XMlayout info: param 'dragfix' in function $.xmlayout init() is not a number!";
                        l.dragfix = m
                    }
                    if (null != s && null != s) {
                        if ("boolean" != typeof s) throw "XMlayout info: param 'playuseable' in function $.xmlayout init() is not a boolean!";
                        l.playuseable = s
                    }
                    if (null != d && null != d) {
                        if ("boolean" != typeof d && !$.isArray(d)) throw "XMlayout info: param 'isborder' in function $.xmlayout init() is not a boolean or object!";
                        if ($.isArray(d) && 4 != d.length) throw "XMlayout info: param 'isborder' in function $.xmlayout init() must be a array of length 4!";
                        $.isArray(d) && $.each(d, function(e, l) {
                            if ("boolean" != typeof l) throw "XMlayout info: param 'isborder' in function $.xmlayout init() must be a array of boolean!"
                        })
                    } else d = !0;
                    if (null != u && null != u) {
                        if ("boolean" != typeof u) throw "XMlayout info: param 'isradius' in function $.xmlayout init() is not a boolean!";
                        l.isradius = u
                    } else l.isradius = !0;
                    if (null != f && null != f) {
                        if ("boolean" != typeof f) throw "XMlayout info: param 'isdestroy' in function $.xmlayout init() is not a boolean!"
                    } else f = !0;
                    if (null != h && null != h) {
                        if ("boolean" != typeof h) throw "XMlayout info: param 'isindexshow' in function $.xmlayout init() is not a boolean!";
                        l.isindexshow = h
                    } else l.isindexshow = !1;
                    0 < l.root_panel.children().length && l.root_panel.children().remove(), null != c && null != c && (l.pborder = c)
                } catch (e) {
                    throw e
                }
                var g = $('<div style="width:100%; height:100%;"></div>');
                g.prop("isDestory", f), l.root_panel.append(g);
                var y = Math.random().toString().substr(2);
                l.random_class.tool_random_class = "xm" + y, l.random_class.f_tool_random_class = "." + l.random_class.tool_random_class, l.random_class.targ_panel_random_class = "targ_panel" + y, l.random_class.f_targ_panel_random_class = "." + l.random_class.targ_panel_random_class, l.random_class.targ_title_random_class = "targ_title" + y, l.random_class.f_targ_title_random_class = "." + l.random_class.targ_title_random_class, l.panel_offset = {
                    left: 0,
                    top: 0
                }, g.css("overflow", "hidden"), g.css("background-color", l.drag_bar_color), "boolean" == typeof d && d ? g.css("border", l.drag_bar_unit + "px solid " + l.drag_bar_color) : $.isArray(d) && (d[0] && g.css("border-top", l.drag_bar_unit + "px solid " + l.drag_bar_color), d[1] && g.css("border-right", l.drag_bar_unit + "px solid " + l.drag_bar_color), d[2] && g.css("border-bottom", l.drag_bar_unit + "px solid " + l.drag_bar_color), d[3] && g.css("border-left", l.drag_bar_unit + "px solid " + l.drag_bar_color)), g.prop({
                    zoom: !1,
                    popped: 0,
                    id: "id" + Math.random().toString().substr(2)
                }), xmid = parseInt(1e6 * Math.random()), l.panel_tree = {
                    panel: g,
                    lcpanel: null,
                    rcpanel: null,
                    parent: null,
                    ref_id: g.prop("id")
                }, l.panel_tree_list[g.prop("id")] = l.panel_tree, l.__createLayout(t, g, 1, l.panel_tree), l.__changePanelLayout(), $.xmlayout.__clearInvalidObjects(), $.xmlayout.panel_tree_list_i.push(l.panel_tree), $.xmlayout.panel_ids.push(g.prop("id")), l.playuseable ? $.xmlayout.addPlay(l.panel_arr) : ($.xmlayout.playheader.prop("ap", $.xmlayout.play_panel.length), $.xmlayout.playheader.prop("np", 1), $.xmlayout.playheader.find("span").text("1/" + $.xmlayout.play_panel.length))
            },
            __createLayout: function(e, l, t, n) {
                var a, i;
                if (obj_this = this, 2 == e.lr.length) {
                    if ($.xmlayout.__isNaN(e.lr[0].value) || $.xmlayout.__isNaN(e.lr[1].value)) !$.xmlayout.__isNaN(e.lr[0].value) && $.xmlayout.__isPx(e.lr[1].value) ? (a = $('<div style="width:calc(100% - ' + e.lr[1].value + '); height:100%; float:left;"></div>'), i = $('<div style="width:' + e.lr[1].value + '; height:100%; float:left;"></div>')) : $.xmlayout.__isPx(e.lr[0].value) && (a = $('<div style="width:' + e.lr[0].value + '; height:100%; float:left;"></div>'), i = $('<div style="width:calc(100% - ' + e.lr[0].value + '); height:100%; float:left;"></div>'));
                    else {
                        var o = e.lr[0].value + e.lr[1].value,
                            p = 100 - (r = parseInt(100 * e.lr[0].value / o));
                        a = $('<div style="width:' + r + '%; height:100%; float:left;"></div>'), i = $('<div style="width:' + p + '%; height:100%; float:left;"></div>')
                    }
                    a.prop({
                        zoom: !1,
                        popped: 0,
                        pvalue: "width",
                        key: 1,
                        ovalue: r
                    }), i.prop({
                        zoom: !1,
                        popped: 0,
                        pvalue: "width",
                        key: 2,
                        ovalue: p
                    }), (s = $('<div style="width:' + obj_this.drag_bar_unit + "px; height:100%; background-color:" + obj_this.drag_bar_color + '; float:left; overflow:hidden;"></div>')).prop({
                        key: 2
                    }), (d = $('<div style="width:100%; height:100%; opacity:0;"></div>')).prop({
                        pvalue: "width"
                    }), s.append(d), e.lr[0].resize && e.lr[1].resize && (s.css("cursor", "w-resize"), $.xmlayout.div_drag(d, "axis-x"), obj_this.__addListener(d)), (u = $('<div style="width: -moz-calc(100% - ' + obj_this.drag_bar_unit + "px);width: -webkit-calc(100% - " + obj_this.drag_bar_unit + "px);width: calc(100% - " + obj_this.drag_bar_unit + 'px); height:100%; float:left;" ></div>')).prop({
                        key: 1
                    }), i.append(s), i.append(u), l.append(a), l.append(i), a.prop("id", "id" + Math.random().toString().substr(2)), i.prop("id", "id" + Math.random().toString().substr(2)), n.lcpanel = {
                        panel: a,
                        lcpanel: null,
                        rcpanel: null,
                        parent: n,
                        ref_id: obj_this.panel_tree.ref_id
                    }, n.rcpanel = {
                        panel: i,
                        lcpanel: null,
                        rcpanel: null,
                        parent: n,
                        ref_id: obj_this.panel_tree.ref_id
                    }, obj_this.panel_tree_list[a.prop("id")] = n.lcpanel, obj_this.panel_tree_list[i.prop("id")] = n.rcpanel, $.xmlayout.panel_tree_list_i.push(n.lcpanel), $.xmlayout.panel_tree_list_i.push(n.rcpanel), obj_this.__createLayout(e.lr[0], a, ++t, n.lcpanel), obj_this.__createLayout(e.lr[1], u, t, n.rcpanel)
                } else if (2 == e.ud.length) {
                    if ($.xmlayout.__isNaN(e.ud[0].value) || $.xmlayout.__isNaN(e.ud[1].value)) !$.xmlayout.__isNaN(e.ud[0].value) && $.xmlayout.__isPx(e.ud[1].value) ? (a = $('<div style="height:calc(100% - ' + e.ud[1].value + '); width:100%;"></div>'), i = $('<div style="height:' + e.ud[1].value + '; width:100%;"></div>')) : $.xmlayout.__isPx(e.ud[0].value) && (a = $('<div style="height:' + e.ud[0].value + '; width:100%;"></div>'), i = $('<div style="height:calc(100% - ' + e.ud[0].value + '); width:100%;"></div>'));
                    else {
                        var r;
                        o = e.ud[0].value + e.ud[1].value, p = 100 - (r = parseInt(100 * e.ud[0].value / o));
                        a = $('<div style="height:' + r + '%; width:100%;"></div>'), i = $('<div style="height:' + p + '%; width:100%;;"></div>')
                    }
                    var s, d, u;
                    a.prop({
                        zoom: !1,
                        popped: 0,
                        pvalue: "height",
                        key: 1,
                        ovalue: r
                    }), i.prop({
                        zoom: !1,
                        popped: 0,
                        pvalue: "height",
                        key: 2,
                        ovalue: p
                    }), (s = $('<div style="height:' + obj_this.drag_bar_unit + "px; width:100%; background-color:" + obj_this.drag_bar_color + '; overflow:hidden;"></div>')).prop({
                        key: 2
                    }), (d = $('<div style="width:100%; height:100%; opacity:0;"></div>')).prop({
                        pvalue: "height"
                    }), s.append(d), e.ud[0].resize && e.ud[1].resize && (s.css("cursor", "n-resize"), $.xmlayout.div_drag(d, "axis-y"), obj_this.__addListener(d)), (u = $('<div style="width:100%; height: -moz-calc(100% - ' + obj_this.drag_bar_unit + "px); height: -webkit-calc(100% - " + obj_this.drag_bar_unit + "px); height: calc(100% - " + obj_this.drag_bar_unit + 'px);"></div>')).prop({
                        key: 1
                    }), i.append(s), i.append(u), l.append(a), l.append(i), a.prop("id", "id" + Math.random().toString().substr(2)), i.prop("id", "id" + Math.random().toString().substr(2)), n.lcpanel = {
                        panel: a,
                        lcpanel: null,
                        rcpanel: null,
                        parent: n,
                        ref_id: obj_this.panel_tree.ref_id
                    }, n.rcpanel = {
                        panel: i,
                        lcpanel: null,
                        rcpanel: null,
                        parent: n,
                        ref_id: obj_this.panel_tree.ref_id
                    }, obj_this.panel_tree_list[a.prop("id")] = n.lcpanel, obj_this.panel_tree_list[i.prop("id")] = n.rcpanel, $.xmlayout.panel_tree_list_i.push(n.lcpanel), $.xmlayout.panel_tree_list_i.push(n.rcpanel), obj_this.__createLayout(e.ud[0], a, ++t, n.lcpanel), obj_this.__createLayout(e.ud[1], u, t, n.rcpanel)
                } else obj_this.isradius && l.css("border-radius", "4px"), l.css({
                    backgroundColor: "white",
                    boxSizing: "border-box",
                    border: obj_this.pborder
                }), null == n.parent && (e.rp = !1, e.tb = !1), obj_this.__addRightPanel(l, e)
            },
            __changePanelLayout: function() {
                var n = this,
                    t = [];
                $.each(n.getPanels(), function(e, l) {
                    t.push(l.parent()), l.prop({
                        seq: e + 1
                    })
                }), $.each(t, function(e, l) {
                    if (l.prop("mdata")) {
                        var t = l.prop("mdata").pos_mark;
                        t.opid !== t.npid && l.append(n.getPanels(t.npid))
                    }
                })
            },
            __addListener: function(e) {
                var a, i, o, p, r, s = {
                    x: 0,
                    y: 0
                };
                e.on("dragstart", function(e, l) {
                    s.x = l.pageX, s.y = l.pageY, p = $(this).parent().parent().siblings(), r = $(this).parent().parent(), o = $(this).prop("pvalue")
                }), e.on("drag", function(e, l) {
                    "width" == o ? (a = l.pageX - s.x, s.x = l.pageX) : (a = l.pageY - s.y, s.y = l.pageY);
                    var t = parseFloat(r.parent().css(o));
                    if (0 < a) {
                        if ((i = parseFloat(r.css(o))) <= obj_this.dragfix) return;
                        var n = 100 * (i - a) / t;
                        r.css(o, n + "%"), p.css(o, 100 - n + "%")
                    } else {
                        if ((i = parseFloat(p.css(o))) <= obj_this.dragfix) return;
                        n = 100 * (i + a) / t;
                        p.css(o, n + "%"), r.css(o, 100 - n + "%")
                    }
                }), e.on("dragstop", function(e, l) {
                    "width" == o ? $(this).css("left", "0px") : $(this).css("top", "0px");
                    var t = parseInt($(this).parent().parent().parent().css(o)),
                        n = (100 * parseInt(p.css(o)) / t).toFixed(4),
                        a = 100 - n;
                    p.css(o, n + "%"), r.css(o, a + "%"), p.prop("ovalue", n), r.prop("ovalue", a);
                    for (var i = 0; i < obj_this.resize_fun.length; i++) null != obj_this.resize_fun[i].params ? obj_this.resize_fun[i].fun(obj_this.resize_fun[i].params) : obj_this.resize_fun[i].fun()
                }), e.parent().mouseover(function() {
                    $(this).css("opacity", .5)
                }), e.parent().mouseout(function() {
                    $(this).css("opacity", 1)
                })
            },
            __load: function(e, a, l, i, t, n) {
                var o = e;
                if (null != t && null != t) {
                    var p = e.parent().find(this.random_class.f_targ_title_random_class);
                    p[0] && (p.children().remove(), null != n && null != n && null != n.bgcolor && null != n.bgcolor && p.css("background-color", n.bgcolor), null != n && null != n && "center" == n.pos ? p.append($('<center><span class="xmlayout_tt" style="font-size:15px; margin-left: 5px;">' + t + "</label></center>")) : p.append($('<span class="xmlayout_tt" style="font-size:15px;margin-left: 5px;">' + t + "</label>")), null != n && null != n && null != n.fontsize && null != n.fontsize && (24 < n.fontsize ? n.fontsize = 24 : n.fontsize, p.find(".xmlayout_tt").css("font-size", n.fontsize + "px"), p.find("div").css("height", (25 - n.fontsize) / 2 + "px")), null != n && null != n && null != n.fontcolor && null != n.fontcolor && p.find(".xmlayout_tt").css("color", n.fontcolor)), o.prop("mtitle", t)
                }
                if (null == a || null == a) throw "XMlayout info: param 'url/obj' in function __load is null!";
                "string" == typeof a ? (a = $.trim(a), o.load(a, l, function(e, l, t) {
                    null != i && null != i && i(e, l, t);
                    for (var n = a.indexOf("/"); - 1 < n && null == $.xmlayout.pages[a];) n = (a = a.substr(n + 1)).indexOf("/");
                    null != $.xmlayout.pages[a] && $.xmlayout.pages[a]()
                })) : "object" == typeof a && (o.text(""), o.children().remove(), o.append(a), null != i && null != i && i())
            },
            __addRightPanel: function(v, e) {
                var w = this,
                    l = e.rp,
                    t = e.tb,
                    n = e.indexp;
                if (e.pos_mark || (e.pos_mark = {
                        opid: n,
                        npid: n
                    }), t) {
                    var a = "xmlayout_tb" + Math.random().toString().substr(2);
                    v.prop({
                        mindex1: "#" + a,
                        mdata: e
                    }), v.css("overflow", "hidden");
                    var i = $('<div id="' + a + '" class="' + w.random_class.tool_random_class + '" style = "float:right; right:10px; margin-top:5px; width:140px; height:25px;"><div type="button" class="xm-list-group-item popped" action=3 popped="false" value=3 style="height:25px; width: 20px; float:right; opacity:0.25; margin-right:5px;"></div><div type="button" class="xm-list-group-item fullscreen1" action=4 fullscreen="false" value=4 style="height:25px; width: 20px; float:right; display:none; opacity:0.25; margin-right:5px;"></div><div type="button" class="xm-list-group-item fullscreen" action=2 fullscreen="false" value=2 style="height:25px; width: 20px; float:right; opacity:0.25; margin-right:5px;"></div><div type="button" class="xm-list-group-item change" action=5 value=5 style="height:25px; width: 20px; float:right; opacity:0.25; margin-right:5px;"></div><div type="button" class="xm-list-group-item zoom-out" action=1 value=1 style="height: 25px; width: 20px; float:right; opacity:0.25; margin-right:5px; display:none;"></div><div type="button" class="xm-list-group-item zoom-in" action=0 value=0 style="height: 25px; width: 20px; float:right; opacity:0.25; margin-right:5px;"></div></div>');
                    v.append(i), i.children().eq(0).append($.xmlayout.__getPNGs(4)), i.children().eq(0).append($.xmlayout.__getPNGs(5)), i.children().eq(1).append($.xmlayout.__getPNGs(3)), i.children().eq(2).append($.xmlayout.__getPNGs(3)), i.children().eq(3).append($.xmlayout.__getPNGs(11)), i.children().eq(4).append($.xmlayout.__getPNGs(2)), i.children().eq(5).append($.xmlayout.__getPNGs(1)), i.find(".xm-list-group-item").mouseover(function() {
                        $(this).css("opacity", "0.8")
                    }), i.find(".xm-list-group-item").mouseout(function() {
                        $(this).css("opacity", "0.25")
                    })
                }
                var o = '<div class="' + w.random_class.targ_panel_random_class + '" style="width:100%; height:100%; background-color: white; border-radius : 4px; overflow: auto;"></div>';
                w.isradius || (o = '<div class="' + w.random_class.targ_panel_random_class + '" style="width:100%; height:100%; background-color: white; overflow: auto;"></div>');
                var p = $(o);
                if (t && (v.append($('<div class="' + w.random_class.targ_title_random_class + '" style="width:100%; height: 30px; border-bottom : 0.5px solid #E3E3E3; padding : 5px 5px 0px 5px;"></div>')), p.css({
                        height: "-moz-calc(100% - 30px)",
                        height: "-webkit-calc(100% - 30px)",
                        height: "calc(100% - 30px)"
                    })), p.attr("id", n), p.prop({
                        role: "targ_panel",
                        indexp: n,
                        ref_id: w.panel_tree.ref_id
                    }), w.isindexshow && p.html("<span>D " + n + "</span>"), p.design_i = function(e, l, t, n, a) {
                        w.__design(e, l, t, $(this), n, a);
                        var i = $(this).find(".xmlayout-in");
                        if (null != i && null != i)
                            for (var o = 0; o < i.children().length; o++) {
                                var p = i.children().eq(o);
                                null != p.attr("xmidx") && null != p.attr("xmidx") && null != $(this).prop("mchildren")[p.attr("xmidx")] && null != $(this).prop("mchildren")[p.attr("xmidx")] && ($(this).prop("mchildren")[p.attr("xmidx")].children().remove(), $(this).prop("mchildren")[p.attr("xmidx")].append(p), o--)
                            }
                    }, p.getPanels_i = function(e) {
                        return null == e || null == e ? $(this).prop("mchildren") : $(this).prop("mchildren")[e]
                    }, p.draw = function() {
                        if ($(this).find(".xmlayout-in")[0]) {
                            var e = $(this).find(".xmlayout-in").eq(0);
                            if (null == e.attr("type") || "inherit" == e.attr("type")) e.css({
                                width: "100%",
                                height: "100%"
                            });
                            else if ("auto" == e.attr("type")) e.css({
                                width: "auto",
                                height: "auto"
                            });
                            else if ("self-def" == !e.attr("type")) throw "XMlayout info : unknow value of 'type' [" + e.attr("type") + "] which should be [auto], [inherit] and [self-def]!";
                            $(this).find(".xmlayout-in").children().remove();
                            for (var l = 1; l < $(this).find(".xmlayout-in").length; l++) $(this).find(".xmlayout-in").eq(l).remove();
                            e.css("display", "block"), e.append(e.siblings())
                        }
                    }, v.append(p), w.panel_arr.push(p), p.loadPage = function(e, l, t, n, a) {
                        w.__load($(this), e, l, t, n, a)
                    }, p.loadElement = function(e, l, t, n) {
                        if (null == e || e.length < 1) throw "XMlayout Error : 'element' in function 'loadElement' should not be null!";
                        w.__load($(this), e, null, l, t, n)
                    }, p.getTitlePanel = function() {
                        return $(this).parent().find(w.random_class.f_targ_title_random_class)
                    }, l) {
                    a = "xmlayout_rp" + Math.random().toString().substr(2);
                    v.prop("mindex", "#" + a);
                    l = $('<div id="' + a + '" class="' + w.random_class.tool_random_class + '" style = "z-index:10000000; left:0px; top:0px; width:100px; height:auto; position:fixed; display:none;"> <ul class="list-group" style="margin-top: 0; padding-left: 0;"><li class="xm-list-group-item zoom-in" action=0 value=0 style="position: relative;display: block;padding: 5px 15px;margin-bottom: -1px;background-color: #fff;border: 1px solid #ddd;"><span style="cursor:default; font-size:12px;">' + $.xmlayout.LANG.zi + '</span></li><li class="xm-list-group-item zoom-out" action=1 value=1 style="position: relative;display: none;padding: 5px 15px;margin-bottom: -1px;background-color: #fff;border: 1px solid #ddd;"><span style="cursor:default; font-size:12px;">' + $.xmlayout.LANG.zo + '</span></li><li class="xm-list-group-item fullscreen" action=2 fullscreen="false" value=2 style="position: relative;display: block;padding: 5px 15px;margin-bottom: -1px;background-color: #fff;border: 1px solid #ddd;"><span style="cursor:default;font-size:12px;">' + $.xmlayout.LANG.fs + '</span></li><li class="xm-list-group-item fullscreen1" action=4 fullscreen="false" value=4 style="position: relative;display: block;padding: 5px 15px;margin-bottom: -1px;background-color: #fff;border: 1px solid #ddd; display:none;"><span style="cursor:default;font-size:12px;">' + $.xmlayout.LANG.ff + '</span></li><li class="xm-list-group-item popped" action=3 popped="false" value=3 style="position: relative;display: block;padding: 5px 15px;margin-bottom: -1px;background-color: #fff;border: 1px solid #ddd;"><span style="cursor:default;font-size:12px;">' + $.xmlayout.LANG.pp + "</span></li></ul></div>");
                    v.append(l), l.find("ul .xm-list-group-item").mouseover(function() {
                        $(this).css("background-color", w.RPCOLOR)
                    }), l.find("ul .xm-list-group-item").mouseout(function() {
                        $(this).css("background-color", "#fff")
                    }), v.mousedown(function(e) {
                        var l = $($(this).prop("mindex"));
                        0 < e.button ? (l.css("left", e.clientX + "px"), l.css("top", e.clientY + "px"), l.css("display", "block")) : l.css("display", "none")
                    }), v.bind("mousewheel", function() {
                        $($(this).prop("mindex")).css("display", "none")
                    })
                }
                v.mouseover(function() {
                    for (var e = 0; e < w.panel_arr.length; e++) {
                        var l = w.panel_arr[e].parent().prop("mindex");
                        l != $(this).prop("mindex") && $(l).css("display", "none")
                    }
                }), (l || t) && v.find(w.random_class.f_tool_random_class).find(".xm-list-group-item").mousedown(function(e) {
                    var l = parseInt($(this).attr("action"));
                    switch (l) {
                        case 0:
                            null != (d = v).prop("zoom") && null != d.prop("zoom") || (d = v.parent());
                            for (var t = w.panel_tree_list[d.prop("id")]; t.panel.prop("zoom") && null != (t = t.parent).parent.parent;);
                            if (null == t.parent.parent) {
                                (s = v.find(w.random_class.f_tool_random_class).find(".fullscreen")).attr("fullscreen", "true");
                                for (var n = 0; n < s.length; n++) "button" != s.eq(n).attr("type") ? s.eq(n).find("span").text($.xmlayout.LANG.rs) : s.eq(n).find("img").attr("title", $.xmlayout.LANG.rs);
                                w.disablePanelItem(v.find(w.random_class.f_targ_panel_random_class), w.RPID.ZOOM_IN)
                            }
                            w.useablePanelItem(v.find(w.random_class.f_targ_panel_random_class), w.RPID.ZOOM_OUT), t.panel.prop("zoom", !0), t = w.panel_tree_list[d.prop("id")], w.__drawz(t);
                            for (n = 0; n < w.panel_arr.length; n++) w.disablePanelItem(w.panel_arr[n], w.RPID.POPPED_BERTH);
                            w.iszoom = !0;
                            break;
                        case 1:
                            null != (d = v).prop("zoom") && null != d.prop("zoom") || (d = v.parent());
                            for (t = w.panel_tree_list[d.prop("id")]; null != t.parent && t.parent.panel.prop("zoom");) t = t.parent;
                            t.panel.prop("zoom", !1), w.__drawz(w.panel_tree_list[d.prop("id")]), (s = v.find(w.random_class.f_tool_random_class).find(".fullscreen")).attr("fullscreen", "false");
                            for (n = 0; n < s.length; n++) "button" != s.eq(n).attr("type") ? s.eq(n).find("span").text($.xmlayout.LANG.fs) : s.eq(n).find("img").attr("title", $.xmlayout.LANG.fs);
                            null == t.lcpanel && null == t.rcpanel && w.disablePanelItem(v.find(w.random_class.f_targ_panel_random_class), w.RPID.ZOOM_OUT), w.useablePanelItem(v.find(w.random_class.f_targ_panel_random_class), w.RPID.ZOOM_IN);
                            var a = !1;
                            for (n = 0; n < w.panel_arr.length; n++) {
                                if (null != (i = w.panel_arr[n].parent()).prop("zoom") && null != i.prop("zoom") || (i = i.parent()), i.prop("zoom")) {
                                    a = !0;
                                    break
                                }
                            }
                            if (!a) {
                                for (n = 0; n < w.panel_arr.length; n++) w.useablePanelItem(w.panel_arr[n], w.RPID.POPPED_BERTH);
                                w.iszoom = !1
                            }
                            break;
                        case 2:
                            if ("false" == $(this).attr("fullscreen")) {
                                null != (d = v).prop("zoom") && null != d.prop("zoom") || (d = v.parent());
                                for (t = w.panel_tree_list[d.prop("id")]; null != t.parent;) t.panel.prop("zoom", !0), t = t.parent;
                                t = w.panel_tree_list[d.prop("id")], w.__drawz(t);
                                for (n = 0; n < w.panel_arr.length; n++) w.disablePanelItem(w.panel_arr[n], w.RPID.POPPED_BERTH);
                                (s = v.find(w.random_class.f_tool_random_class).find(".fullscreen")).attr("fullscreen", "true");
                                for (n = 0; n < s.length; n++) "button" != s.eq(n).attr("type") ? s.eq(n).find("span").text($.xmlayout.LANG.rs) : s.eq(n).find("img").attr("title", $.xmlayout.LANG.rs);
                                w.disablePanelItem(v.find(w.random_class.f_targ_panel_random_class), w.RPID.ZOOM_IN), w.useablePanelItem(v.find(w.random_class.f_targ_panel_random_class), w.RPID.ZOOM_OUT), w.iszoom = !0
                            } else if ("true" == $(this).attr("fullscreen")) {
                                for (n = 0; n < w.panel_arr.length; n++) {
                                    var i;
                                    null != (i = w.panel_arr[n].parent()).prop("zoom") && null != i.prop("zoom") || (i = i.parent());
                                    t = w.panel_tree_list[i.prop("id")];
                                    for (var o = !1; t.panel.prop("zoom");) t.panel.prop("zoom", !1), t.panel.css(t.panel.prop("pvalue"), t.panel.prop("ovalue") + "%"), t.panel.siblings().css("display", "block"), w.__drawdragbar(t.panel, !0), w.__drawdragbar(t.panel.siblings(), !0), t = t.parent, o = !0;
                                    o && w.__drawz(t)
                                }
                                for (n = 0; n < w.panel_arr.length; n++) w.useablePanelItem(w.panel_arr[n], w.RPID.POPPED_BERTH), w.useablePanelItem(w.panel_arr[n], w.RPID.ZOOM_IN), w.disablePanelItem(w.panel_arr[n], w.RPID.ZOOM_OUT);
                                (s = v.find(w.random_class.f_tool_random_class).find(".fullscreen")).attr("fullscreen", "false");
                                for (n = 0; n < s.length; n++) "button" != s.eq(n).attr("type") ? s.eq(n).find("span").text($.xmlayout.LANG.fs) : s.eq(n).find("img").attr("title", $.xmlayout.LANG.fs);
                                w.iszoom = !1
                            }
                            break;
                        case 3:
                            null != (d = v).prop("zoom") && null != d.prop("zoom") || (d = v.parent());
                            t = w.panel_tree_list[d.prop("id")];
                            if ("false" == $(this).attr("popped")) {
                                t.panel.prop("popped", 2);
                                var p = t;
                                for (w.pop_count.push(d.prop("id")); 2 == t.panel.prop("popped") && null != t.parent;)(t = t.parent).panel.prop("popped", t.panel.prop("popped") + 1);
                                d.css("z-index", ++$.xmlayout.pop_zindex), w.__drawp(w.panel_tree), (s = v.find(w.random_class.f_tool_random_class).find(".popped")).attr("popped", "true");
                                for (n = 0; n < s.length; n++) "button" != s.eq(n).attr("type") && s.eq(n).find("span").text($.xmlayout.LANG.bt);
                                (s = v.find(w.random_class.f_tool_random_class).find(".fullscreen1")).attr("fullscreen", "false");
                                for (n = 0; n < s.length; n++) "button" != s.eq(n).attr("type") ? s.eq(n).find("span").text($.xmlayout.LANG.ff) : s.eq(n).find("img").attr("title", $.xmlayout.LANG.ff);
                                if (w.popped_count++, 1 == w.popped_count)
                                    for (n = 0; n < w.panel_arr.length; n++) w.disablePanelItem(w.panel_arr[n], w.RPID.ZOOM_IN), w.disablePanelItem(w.panel_arr[n], w.RPID.FULLSCREEN_RESIZE), w.disablePanelItem(w.panel_arr[n], w.RPID.CHANGE_PANEL);
                                $(v.prop("mindex1")).children().eq(0).children().eq(0).css("display", "none"), $(v.prop("mindex1")).children().eq(0).children().eq(1).css("display", "block"), w.useablePanelItem(v.find(w.random_class.f_targ_panel_random_class), w.RPID.FULLSCREEN_RESIZE1), p.panel.prop("ispopped", !0), $.xmlayout.pop_zindex += w.pop_count.length, w.ispop = !0
                            } else if ("true" == $(this).attr("popped")) {
                                t.panel.prop("ispopped", !1), t.panel.prop("popped", 0), $.xmlayout.div_undrag(t.panel), $.xmlayout.div_unresize(t.panel);
                                for (n = 0; n < w.pop_count.length; n++)
                                    if (w.pop_count[n] == d.prop("id")) {
                                        w.pop_count.splice(n, 1);
                                        break
                                    } for (t = t.parent; null != t && 2 == t.panel.prop("popped");) t.panel.prop("popped", t.panel.prop("popped") - 1), t = t.parent;
                                null != t && t.panel.prop("popped", t.panel.prop("popped") - 1), d.css("z-index", 0), w.__drawp(w.panel_tree), (s = v.find(w.random_class.f_tool_random_class).find(".popped")).attr("popped", "false");
                                for (n = 0; n < s.length; n++) "button" != s.eq(n).attr("type") && s.eq(n).find("span").text($.xmlayout.LANG.pp);
                                if (w.popped_count--, 0 == w.popped_count) {
                                    for (n = 0; n < w.panel_arr.length; n++) w.useablePanelItem(w.panel_arr[n], w.RPID.ZOOM_IN), w.useablePanelItem(w.panel_arr[n], w.RPID.FULLSCREEN_RESIZE), w.useablePanelItem(w.panel_arr[n], w.RPID.CHANGE_PANEL);
                                    w.ispop = !1
                                }
                                $(v.prop("mindex1")).children().eq(0).children().eq(0).css("display", "block"), $(v.prop("mindex1")).children().eq(0).children().eq(1).css("display", "none"), w.disablePanelItem(v.find(w.random_class.f_targ_panel_random_class), w.RPID.FULLSCREEN_RESIZE1);
                                var r = $(this).siblings();
                                for (n = 0; n < r.length; n++)
                                    if (4 == r.eq(n).attr("action")) {
                                        r.eq(n).attr("fullscreen", "false"), "button" != $(this).attr("type") && r.eq(n).find("span").text($.xmlayout.LANG.ff);
                                        break
                                    }
                            }
                            break;
                        case 4:
                            null != (d = v).prop("zoom") && null != d.prop("zoom") || (d = v.parent());
                            t = w.panel_tree_list[d.prop("id")];
                            if ("false" == $(this).attr("fullscreen")) {
                                t.panel.prop("mw", t.panel.css("width")), t.panel.prop("mh", t.panel.css("height")), t.panel.prop("ml", t.panel.css("left")), t.panel.prop("mt", t.panel.css("top")), t.panel.css("width", $(document).width() + "px"), t.panel.css("height", $(document).height() + "px"), t.panel.css("left", "0px"), t.panel.css("top", "0px"), $.xmlayout.div_undrag(t.panel), $.xmlayout.div_unresize(t.panel), (s = v.find(w.random_class.f_tool_random_class).find(".fullscreen1")).attr("fullscreen", "true");
                                for (n = 0; n < s.length; n++) "button" != s.eq(n).attr("type") ? s.eq(n).find("span").text($.xmlayout.LANG.rs) : s.eq(n).find("img").attr("title", $.xmlayout.LANG.rs)
                            } else if ("true" == $(this).attr("fullscreen")) {
                                var s;
                                t.panel.css("width", t.panel.prop("mw")), t.panel.css("height", t.panel.prop("mh")), t.panel.css("left", t.panel.prop("ml")), t.panel.css("top", t.panel.prop("mt")), $.xmlayout.div_drag(t.panel), $.xmlayout.div_resize(t.panel), (s = v.find(w.random_class.f_tool_random_class).find(".fullscreen1")).attr("fullscreen", "false");
                                for (n = 0; n < s.length; n++) "button" != s.eq(n).attr("type") ? s.eq(n).find("span").text($.xmlayout.LANG.ff) : s.eq(n).find("img").attr("title", $.xmlayout.LANG.ff)
                            }
                            break;
                        case 5:
                            var d, u = (d = v).find(w.random_class.f_targ_panel_random_class);
                            if (u.prop("otc") || u.prop({
                                    otc: u.parent().find(w.random_class.f_targ_title_random_class).css("background-color")
                                }), u.parent().find(w.random_class.f_targ_title_random_class).css("background-color", "#EBEBEB"), $.xmlayout.change_panel && $.xmlayout.change_panel.parent().prop("mindex1") !== u.parent().prop("mindex1") && $.xmlayout.change_panel.prop("ref_id") === u.prop("ref_id")) {
                                var c = u,
                                    h = $.xmlayout.change_panel;
                                c.css({
                                    width: u.width() + "px",
                                    height: u.height() + "px",
                                    position: "absolute",
                                    border: "1px solid #CCCCCC"
                                }), h.css({
                                    width: u.width() + "px",
                                    height: u.height() + "px",
                                    position: "absolute",
                                    border: "1px solid #CCCCCC"
                                });
                                var m = c.position().left,
                                    f = c.position().top,
                                    g = h.position().left,
                                    y = h.position().top;
                                c.css({
                                    left: m + "px",
                                    top: f + "px"
                                }), h.css({
                                    left: g + "px",
                                    top: y + "px"
                                });
                                var A = c.parent().find(w.random_class.f_targ_title_random_class),
                                    x = h.parent().find(w.random_class.f_targ_title_random_class),
                                    _ = c.parent(),
                                    b = h.parent();
                                c.animate({
                                    left: g + "px",
                                    top: y + "px"
                                }, "normal", null, function() {
                                    c.css({
                                        position: "static",
                                        width: "100%",
                                        height: "-moz-calc(100% - 30px)",
                                        height: "-webkit-calc(100% - 30px)",
                                        height: "calc(100% - 30px)",
                                        left: "auto",
                                        top: "auto",
                                        border: "none"
                                    }), A.css({
                                        backgroundColor: c.prop("otc")
                                    }), b.append(A), b.append(c), b.prop("mdata").pos_mark.npid = c.prop("indexp")
                                }), h.animate({
                                    left: m + "px",
                                    top: f + "px"
                                }, "normal", null, function() {
                                    h.css({
                                        position: "static",
                                        width: "100%",
                                        height: "-moz-calc(100% - 30px)",
                                        height: "-webkit-calc(100% - 30px)",
                                        height: "calc(100% - 30px)",
                                        left: "auto",
                                        top: "auto",
                                        border: "none"
                                    }), x.css({
                                        backgroundColor: h.prop("otc")
                                    }), _.append(x), _.append(h), _.prop("mdata").pos_mark.npid = h.prop("indexp")
                                }), $.xmlayout.change_panel = null
                            } else $.xmlayout.change_panel ? ($.xmlayout.change_panel.prop("ref_id") !== u.prop("ref_id") && (u.parent().find(w.random_class.f_targ_title_random_class).css("background-color", u.prop("otc")), alert("Not in the same layout!")), $.xmlayout.change_panel.parent().find(w.random_class.f_targ_title_random_class).css("background-color", $.xmlayout.change_panel.prop("otc")), $.xmlayout.change_panel = null) : $.xmlayout.change_panel = u
                    }
                    if (0 == l || 1 == l || 2 == l || 3 == l || 4 == l || 5 == l)
                        for (n = 0; n < w.resize_fun.length; n++) null != w.resize_fun[n].params ? w.resize_fun[n].fun(w.resize_fun[n].params) : w.resize_fun[n].fun();
                    5 != l && ($.xmlayout.change_panel && $.xmlayout.change_panel.parent().find(w.random_class.f_targ_title_random_class).css("background-color", $.xmlayout.change_panel.prop("otc")), $.xmlayout.change_panel = null)
                })
            },
            __getScroll: function(e) {
                var l = {
                    st: 0,
                    sl: 0
                };
                for (e = e.parent(); 0 < e.length;) l.st += parseInt(e.scrollTop()), l.sl += parseInt(e.scrollLeft()), e = e.parent();
                return l
            },
            __drawz: function(e) {
                if (null != e.parent)
                    if (e.panel.prop("zoom")) {
                        var l = e.parent.lcpanel.panel,
                            t = e.parent.rcpanel.panel,
                            n = l.prop("pvalue");
                        l.prop("zoom") && (l = e.parent.rcpanel.panel, t = e.parent.lcpanel.panel), l.css("display", "none"), t.css(n, "100%"), this.__drawdragbar(t, !1), this.__drawz(e.parent)
                    } else {
                        l = e.parent.lcpanel.panel, t = e.parent.rcpanel.panel, n = l.prop("pvalue");
                        "none" == l.css("display") && (l.css("display", "block"), l.css(n, l.prop("ovalue") + "%"), t.css(n, t.prop("ovalue") + "%"), this.__drawdragbar(t, !0)), "none" == t.css("display") && (t.css("display", "block"), l.css(n, l.prop("ovalue") + "%"), t.css(n, t.prop("ovalue") + "%"), this.__drawdragbar(t, !0))
                    }
            },
            __drawp: function(e) {
                null != e && (2 == e.panel.prop("popped") ? this.__drawp2(e) : 1 == e.panel.prop("popped") ? (this.__drawp1(e), this.__drawp(e.lcpanel), this.__drawp(e.rcpanel)) : 0 == e.panel.prop("popped") && (this.__drawp0(e), this.__drawp(e.lcpanel), this.__drawp(e.rcpanel)))
            },
            __drawp0: function(e) {
                if (null != e && null != e.lcpanel) {
                    var l = e.lcpanel.panel,
                        t = e.rcpanel.panel,
                        n = l.prop("pvalue");
                    l.css(n, l.prop("ovalue") + "%"), t.css(n, t.prop("ovalue") + "%"), this.__drawdragbar(l, !0), this.__drawdragbar(t, !0), null == e.lcpanel.lcpanel && this.__drawleafnode(l, l.prop("ovalue")), null == e.rcpanel.lcpanel && this.__drawleafnode(t, t.prop("ovalue"))
                }
            },
            __drawp1: function(e) {
                var l = e.lcpanel.panel,
                    t = e.lcpanel;
                2 != e.rcpanel.panel.prop("popped") && (l = e.rcpanel.panel, t = e.rcpanel);
                var n = l.prop("pvalue");
                null == t.lcpanel ? this.__drawleafnode(l, 100) : l.css(n, "100%"), this.__drawdragbar(l, !1)
            },
            __drawp2: function(e) {
                if (null != e.lcpanel) {
                    null != (n = (l = e.panel).prop("pvalue")) && null != n && l.css(n, "0%"), this.__drawp2(e.lcpanel), this.__drawp2(e.rcpanel)
                } else {
                    var l, t = this;
                    if ("fixed" != (l = e.panel).css("position")) {
                        var n = l.prop("pvalue");
                        if (l.css("position", "fixed"), l.css("width", this.POPWH.width + "px"), l.css("height", this.POPWH.height + "px"), null == l.prop("ispopped") || !l.prop("ispopped"))
                            for (var a = 0; a < t.pop_count.length; a++)
                                if (t.pop_count[a] == l.prop("id")) {
                                    l.css("left", t.panel_offset.left + 100 + 20 * a + "px"), l.css("top", t.panel_offset.top + 160 + 20 * a + "px"), l.css("z-index", $.xmlayout.pop_zindex + a + 1);
                                    break
                                } if ($.xmlayout.div_drag(l), $.xmlayout.div_resize(l), l.on("resize", function() {
                                for (var e = 0; e < t.resize_fun.length; e++) null != t.resize_fun[e].params ? t.resize_fun[e].fun(t.resize_fun[e].params) : t.resize_fun[e].fun()
                            }), this.__drawdragbar(l, !1), 2 == l.prop("key")) l.children().eq(1).css(n, "100%");
                        var i = l;
                        if (2 == l.prop("key")) 2 == (i = l.children().eq(1)).prop("key") && (i = l.children().eq(0));
                        null != i.prop("mindex") && null != i.prop("mindex") && (t.disablePanelItem(i.find(t.random_class.f_targ_panel_random_class), t.RPID.ZOOM_IN), t.disablePanelItem(i.find(t.random_class.f_targ_panel_random_class), t.RPID.FULLSCREEN_RESIZE)), l.click(function() {
                            $(this).css("z-index", ++$.xmlayout.pop_zindex)
                        })
                    }
                }
            },
            __drawdragbar: function(e, l) {
                if (l) {
                    if (2 == e.prop("key")) {
                        var t = e.children().eq(0),
                            n = e.children().eq(1);
                        1 == t.prop("key") && (t = e.children().eq(1), n = e.children().eq(0)), t.css("display", "block"), n.css(e.prop("pvalue"), "calc(100% - " + this.drag_bar_unit + "px)")
                    }
                } else if (2 == e.prop("key")) {
                    t = e.children().eq(0), n = e.children().eq(1);
                    1 == t.prop("key") && (t = e.children().eq(1), n = e.children().eq(0)), t.css("display", "none"), n.css(e.prop("pvalue"), "100%")
                }
            },
            __drawleafnode: function(e, l) {
                if (e.css(e.prop("pvalue"), l + "%"), "fixed" == e.css("position")) {
                    e.css("position", "static");
                    var t = "width";
                    if ("width" == e.prop("pvalue") && (t = "height"), this.__drawdragbar(e, !0), 2 == e.prop("key")) e.children().eq(1).css(e.prop("pvalue"), "calc(100% - " + this.drag_bar_unit + "px)");
                    e.css(t, "100%");
                    if (2 == e.prop("key")) 2 == e.children().eq(1).prop("key") && e.children().eq(0)
                }
            },
            getPanels: function(e) {
                if (null == e || null == e) return this.panel_arr;
                for (var l = 0; l < this.panel_arr.length; l++)
                    if (e === this.panel_arr[l].prop("seq") || e === this.panel_arr[l].prop("indexp")) return this.panel_arr[l];
                return null
            },
            element: function(e, l, t, n, a, i) {
                try {
                    if ($.xmlayout.__isNaN(e)) throw "XMlayout info: value='" + e + "' in function $.xmlayout element() is not a number!";
                    if (null == l || null == l) l = !0;
                    else if ("boolean" != typeof l) throw "XMlayout info: 'resize' in function $.xmlayout element() is not a boolean!";
                    if (null == t || null == t) t = !0;
                    else if ("boolean" != typeof t) throw "XMlayout info: 'rp' in function $.xmlayout element() is not a boolean!";
                    if (null == n || null == n) n = !0;
                    else if ("boolean" != typeof n) throw "XMlayout info: 'tb' in function $.xmlayout element() is not a boolean!"
                } catch (e) {
                    throw e
                }
                var o = {
                    value: e,
                    resize: l,
                    rp: t,
                    tb: n,
                    lr: [],
                    ud: [],
                    index: null,
                    indexp: null,
                    p_vw: null,
                    p_vh: null
                };
                if (null != a && 2 <= a.length)
                    for (var p = 0; p < 2; p++) o.lr.push(a[p]);
                if (null != i && 2 <= i.length)
                    for (p = 0; p < 2; p++) o.ud.push(i[p]);
                return o
            },
            design: function(e, l, t, n, y, A) {
                var x = this;
                if ($.xmlayout.__isNaN(e)) throw "XMlayout info: 'rows' in function $.xmlayout design() is not a number!";
                if ($.xmlayout.__isNaN(l)) throw "XMlayout info: 'cols' in function $.xmlayout design() is not a number!";
                if (0 != t && 1 != t && (t = 0), e = parseInt(e), l = parseInt(l), e < 1) throw "XMlayout info: 'rows' in function $.xmlayout design() should be bigger than 0!";
                if (l < 1) throw "XMlayout info: 'cols' in function $.xmlayout design() should be bigger than 0!";
                if (null != n)
                    if (0 == t) {
                        if (n.length != e) throw "XMlayout info: 'values' length in function $.xmlayout design() is invalid, it should be equal with 'rows'=" + e + "!";
                        for (var a = 0; a < e; a++) {
                            if (n[a].length != l + 1) throw "XMlayout info: 'values[" + a + "]' length in function $.xmlayout design() is invalid, it should be equal with 'cols'+1=" + l + "1!";
                            for (var i = 0; i < n[a].length; i++)
                                if (!(!$.xmlayout.__isNaN(n[a][i]) && 0 < n[a][i] || $.xmlayout.__isPx(n[a][i]))) throw "XMlayout info: 'values[" + a + "," + i + "]=" + n[a][i] + "' in function $.xmlayout design() is invalid!"
                        }
                    } else if (1 == t) {
                    if (n.length != l) throw "XMlayout info: 'values' length in function $.xmlayout design() is invalid, it should be equal with 'cols'=" + l + "!";
                    for (a = 0; a < l; a++) {
                        if (n[a].length != e + 1) throw "XMlayout info: 'values[" + a + "]' length in function $.xmlayout design() is invalid, it should be equal with 'rows'+1=" + e + "1!";
                        for (i = 0; i < n[a].length; i++)
                            if (!(!$.xmlayout.__isNaN(n[a][i]) && 0 < n[a][i] || $.xmlayout.__isPx(n[a][i]))) throw "XMlayout info: 'values[" + a + "," + i + "]=" + n[a][i] + "' in function $.xmlayout design() is invalid!"
                    }
                }
                var o = null;

                function _(e, l) {
                    if (null != l && null != l) {
                        if (2 == l.length && "boolean" == typeof l[0] && "boolean" == typeof l[1]) return l[0] || (e.rp = !1), void(l[1] || (e.tb = !1));
                        for (var t = 0; t < l.length; t++) {
                            if (3 != l[t].length) throw "XMlayout info: 'attr' in function $.xmlayout design() is out off index!";
                            if (e.index == l[t][0]) {
                                "boolean" == typeof l[t][1] && (e.rp = l[t][1]), "boolean" == typeof l[t][2] && (e.tb = l[t][2]);
                                break
                            }
                        }
                    }
                }

                function p(e, t, i) {
                    var o = [],
                        p = 0,
                        r = 0;
                    if ($.each(e, function(e, l) {
                            o[e] = [], $.xmlayout.__isPx(l[0]) ? p += parseInt(l[0]) : (l[0] *= 100, r += l[0]);
                            for (var t = 0, n = 0, a = 1; a < l.length; a++) $.xmlayout.__isPx(l[a]) ? t += parseInt(l[a]) : (l[a] *= 100, n += l[a]);
                            if (i < t) throw "XMlayout info: parent panel's value is v='" + i + "' which is less than sum of set value sv='" + t + "'";
                            for (a = 1; a < l.length; a++) $.xmlayout.__isPx(l[a]) ? (o[e][a] = l[a], 0 < n ? l[a] = parseInt(l[a]) * n / (i - t) : (l[a] = 100 * parseInt(l[a]) / t, o[e][a] = l[a] / 100 * i)) : o[e][a] = l[a] * (i - t) / n + "px"
                        }), t < p) throw "XMlayout info: parent panel's value is v='" + t + "' which is less than sum of set value sv='" + p + "'";
                    return $.each(e, function(e, l) {
                        $.xmlayout.__isPx(l[0]) ? (o[e][0] = l[0], 0 < r ? l[0] = parseInt(l[0]) * r / (t - p) : (l[0] = 100 * parseInt(l[0]) / p, o[e][0] = l[0] / 100 * t)) : o[e][0] = l[0] * (t - p) / r + "px"
                    }), o
                }

                function r(e, l, t, n, a, i) {
                    for (var o = a, p = 1; p <= e; p++) {
                        var r, s;
                        if (p < e) {
                            if (null != t) {
                                for (var d = 0, u = 0, c = 0; c < t.length; c++) c < p && (d += t[c][0]), u += t[c][0];
                                r = x.element(t[p - 1][0], !0, !0, !0), s = x.element(u - d, !0, !0, !0)
                            } else r = x.element(1, !0, !0, !0), s = x.element(e - p, !0, !0, !0);
                            1 == i ? (o.lr.push(r), o.lr.push(s)) : (o.ud.push(r), o.ud.push(s)), o = s
                        } else r = o;
                        for (var h = r, m = 1; m < l; m++) {
                            var f, g;
                            if (null != t) {
                                for (d = 0, u = 0, c = 1; c < t[p - 1].length; c++) c <= m && (d += t[p - 1][c]), u += t[p - 1][c];
                                f = x.element(t[p - 1][m], !0, !0, !0), g = x.element(u - d, !0, !0, !0)
                            } else f = x.element(1, !0, !0, !0), g = x.element(l - m, !0, !0, !0);
                            1 == i ? (h.ud.push(f), h.ud.push(g)) : (h.lr.push(f), h.lr.push(g)), h = g, 0 == i ? (f.index = p + ":" + m, null != n && (f.p_vw = n[p - 1][m], f.p_vh = n[p - 1][0])) : (f.index = m + ":" + p, null != n && (f.p_vw = n[p - 1][0], f.p_vh = n[p - 1][m])), f.indexp = null == A ? f.index : A.indexp + ";" + f.index, f.deep = a.deep + 1, _(f, y), l - m == 1 && (0 == i ? (g.index = p + ":" + l, null != n && (g.p_vw = n[p - 1][m], g.p_vh = n[p - 1][0])) : (g.index = l + ":" + p, null != n && (g.p_vw = n[p - 1][0], g.p_vh = n[p - 1][m])), g.indexp = null == A ? g.index : A.indexp + ";" + g.index, g.deep = a.deep + 1, _(g, y))
                        }
                        1 == l && (0 == i ? (r.index = p + ":" + l, null != n && (r.p_vw = n[p - 1][1], r.p_vh = n[p - 1][0])) : (r.index = l + ":" + p, null != n && (r.p_vw = n[p - 1][0], r.p_vh = n[p - 1][1])), r.indexp = null == A ? r.index : A.indexp + ";" + r.index, r.deep = a.deep + 1, _(r, y))
                    }
                }
                n && (o = A ? 0 == t ? p(n, parseInt(A.p_vh), parseInt(A.p_vw)) : p(n, parseInt(A.p_vw), parseInt(A.p_vh)) : 0 == t ? p(n, x.root_panel.height(), x.root_panel.width()) : p(n, x.root_panel.width(), x.root_panel.height()));
                var s = A;
                return 1 == e && 1 == l && (null != s && null != s || ((s = x.element(e, !1, !0, !0)).deep = 1), s.index = "1:1", _(s, y)), 0 == t ? (null != s && null != s || ((s = x.element(e, !0, !0, !0)).deep = 1), r(e, l, n, o, s, t)) : 1 == t && (null != s && null != s || ((s = x.element(l, !0, !0, !0)).deep = 1), r(l, e, n, o, s, t)), null == A && (x.panel_data = s, x.getData = function() {
                    return x.panel_data
                }), s.getData = function(e) {
                    var l = x.__getDesignNode(e, s.deep + 1, this);
                    return null != l && (l.design = function(e, l, t, n, a) {
                        return x.design(e, l, t, n, a, this)
                    }), l
                }, s
            },
            __getDesignNode: function(e, l, t) {
                if (e == t.index && l == t.deep) return t;
                for (var n = 0; n < t.lr.length; n++) {
                    if (null != (a = this.__getDesignNode(e, l, t.lr[n])) && null != a) return a
                }
                for (n = 0; n < t.ud.length; n++) {
                    var a;
                    if (null != (a = this.__getDesignNode(e, l, t.ud[n])) && null != a) return a
                }
                return null
            },
            getDesignNode: function(e, l) {
                if (e == l.indexp) return l;
                for (var t = 0; t < l.lr.length; t++) {
                    if (null != (n = this.getDesignNode(e, l.lr[t])) && null != n) return n
                }
                for (t = 0; t < l.ud.length; t++) {
                    var n;
                    if (null != (n = this.getDesignNode(e, l.ud[t])) && null != n) return n
                }
                return null
            },
            __design: function(e, l, s, d, u, c) {
                var h = this;
                if (d.find(".xmlayout-asdfzxcv").remove(), $.xmlayout.__isNaN(e)) throw "XMlayout info: 'rows' in function $.xmlayout __design() is not a number!";
                if ($.xmlayout.__isNaN(l)) throw "XMlayout info: 'cols' in function $.xmlayout __design() is not a number!";
                if (null == s || null == s) {
                    s = new Array;
                    for (var t = 0; t < e; t++) {
                        for (var n = new Array, a = 0; a < l + 1; a++) n.push(1);
                        s.push(n)
                    }
                }
                var m = new Array;
                if (m.push({
                        v: 0,
                        p: 0
                    }), null != s) {
                    if (!$.isArray(s)) throw "XMlayout info: 'datas' in function $.xmlayout __design() is not a array!";
                    if (s.length != e) throw "XMlayout info: rows of 'datas' in function $.xmlayout __design() is not equal with '" + e + "'!";
                    $.each(s, function(t, e) {
                        if (!$.isArray(e)) throw "XMlayout info: 'datas[" + t + "]' in function $.xmlayout __design() is not a array!";
                        if (e.length != l + 1) throw "XMlayout info: rows of 'datas[" + t + "]' in function $.xmlayout __design() is not equal with '" + (l + 1) + "'!";
                        var n = 0,
                            a = 0;
                        $.each(e, function(e, l) {
                            if (0 == e)
                                if ("number" == typeof l) {
                                    if (l <= 0) throw "XMlayout info: rows of 'datas[" + t + "," + e + "]' in function $.xmlayout __design() is " + l + ", but it should be > 0 !";
                                    m[0].v += l
                                } else "string" == typeof l && ("auto" == $.trim(l) ? s[t][e] = 0 : m[0].p += parseInt(l));
                            else if ("number" == typeof l) {
                                if (l <= 0) throw "XMlayout info: rows of 'datas[" + t + "," + e + "]' in function $.xmlayout __design() is " + l + ", but it should be > 0 !";
                                n += l
                            } else if ("string" == typeof l) {
                                if ("auto" == $.trim(l)) throw "XMlayout info: rows of 'datas[" + t + "," + e + "]' in function $.xmlayout __design() is " + l + ", but it should not be 'auto' !";
                                a += parseInt(l)
                            }
                        }), m.push({
                            v: n,
                            p: a
                        })
                    })
                }
                var f = new Array,
                    g = new Array;
                d.prop("mchildren", f), d.prop("_mchildren", g);
                var y = 0;
                $.each(s, function(e, l) {
                    var t = $('<div class="xmlayout-asdfzxcv"></div>');
                    if ("string" == typeof l[0]) t.css({
                        width: "100%",
                        height: l[0]
                    });
                    else {
                        var n = 0;
                        0 < m[0].v && 0 < l[0] && (n = Math.floor(100 * l[0] / m[0].v), e != s.length - 1 ? y += n : n = 100 - y), 0 < n && 0 < m[0].p ? t.css({
                            width: "100%",
                            height: "calc(" + n + "% - " + (m[0].p * n / 100 + .01).toFixed(2) + "px)"
                        }) : 0 < n && t.css({
                            width: "100%",
                            height: n + "%"
                        })
                    }
                    for (var a = 0, i = 1; i < l.length; i++) {
                        var o = $("<div></div>");
                        if ("string" == typeof l[i]) o.css({
                            width: l[i],
                            height: "100%",
                            float: "left"
                        });
                        else {
                            var p = 0;
                            0 < m[e + 1].v && 0 < l[i] && (p = Math.floor(100 * l[i] / m[e + 1].v), i != l.length - 1 ? a += p : p = 100 - a), 0 == p ? o.css({
                                width: "auto",
                                height: "100%",
                                float: "left"
                            }) : 0 < p && 0 < m[e + 1].p ? o.css({
                                width: "calc(" + p + "% - " + (m[e + 1].p * p / 100 + .01).toFixed(2) + "px)",
                                height: "100%",
                                float: "left"
                            }) : 0 < p && o.css({
                                width: p + "%",
                                height: "100%",
                                float: "left"
                            })
                        }
                        c && o.css({
                            boxSizing: "border-box",
                            border: "1px solid #E8E8E8"
                        });
                        var r = e + 1 + ":" + i;
                        g[r] = o, null != d.prop("midx") && null != d.prop("midx") && (r = d.prop("midx") + ";" + r), o.prop("midx", r), u ? (o.css({
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap"
                        }), o.append($("<span>S " + r + "</span>")), o.attr("title", r)) : o.append($("<span>&nbsp;</span>")), null != d.prop("mtagd") && null != d.prop("mtagd") ? o.prop("mtagd", d.prop("mtagd")) : o.prop("mtagd", d), (f[r] = o).design_i = function(e, l, t, n, a) {
                            $(this).text(""), h.__design(e, l, t, $(this), n, a);
                            var i = $(this).prop("mtagd").find(".xmlayout-in");
                            if (null != i && null != i)
                                for (var o = 0; o < i.children().length; o++) {
                                    var p = i.children().eq(o);
                                    null != p.attr("xmidx") && null != p.attr("xmidx") && null != $(this).prop("mchildren")[p.attr("xmidx")] && null != $(this).prop("mchildren")[p.attr("xmidx")] && ($(this).prop("mchildren")[p.attr("xmidx")].children().remove(), $(this).prop("mchildren")[p.attr("xmidx")].append(p), o--)
                                }
                        }, o.getPanels_i = function(e) {
                            return null == e || null == e ? $(this).prop("_mchildren") : $(this).prop("_mchildren")[e]
                        }, t.append(o)
                    }
                    d.append(t)
                })
            },
            resize: function(e, l) {
                return this.resize_fun.push({
                    id: "id" + Math.random().toString().substr(2),
                    fun: e,
                    params: l,
                    ref_id: this.panel_tree.ref_id
                }), $.xmlayout.resize_fun.push(this.resize_fun[this.resize_fun.length - 1]), this.resize_fun[this.resize_fun.length - 1].id
            },
            removeResize: function(e) {
                for (var l = 0; l < this.resize_fun.length; l++)
                    if (this.resize_fun[l].id == e) {
                        this.resize_fun.splice(l, 1);
                        break
                    }
            },
            addRightPanelItem: function(e, l, t) {
                if (null == e.parent() || "targ_panel" != e.prop("role")) throw "XMlayout info: param [panel] is invalid in function $.xmlayout addRightPanelItem() !";
                if (null != e.parent().prop("mindex")) {
                    var n = this,
                        a = "id" + Math.random().toString().substr(2),
                        i = $('<li class="xm-list-group-item" value=' + a + ' style="position: relative;display: block;padding: 5px 15px;margin-bottom: -1px;background-color: #fff;border: 1px solid #ddd;"><span style="cursor:default; font-size:12px;">' + l + "</span></li>");
                    return $(e.parent().prop("mindex")).find("ul").append(i), i.mousedown(function(e) {
                        t(e)
                    }), i.mouseover(function() {
                        $(this).css("background-color", n.RPCOLOR)
                    }), i.mouseout(function() {
                        $(this).css("background-color", "#fff")
                    }), a
                }
            },
            removeRightPanelItem: function(e, l) {
                if (null == e.parent() || "targ_panel" != e.prop("role")) throw "XMlayout info: param 'panel' is invalid in function $.xmlayout removeRightPanelItem() !";
                if (null != e.parent().prop("mindex"))
                    for (var t = $(e.parent().prop("mindex")).find("ul").find("li"), n = 0; n < t.length; n++)
                        if (t.eq(n).attr("value") == l) {
                            t.eq(n).remove();
                            break
                        }
            },
            disablePanelItem: function(e, l, t) {
                if (null == e.parent() || "targ_panel" != e.prop("role")) throw "XMlayout info: param 'panel' is invalid in function $.xmlayout disablePanelItem() !";
                if (null != e.parent().prop("mindex"))
                    for (var n = $(e.parent().prop("mindex")).find("ul").find("li"), a = 0; a < n.length; a++)
                        if (n.eq(a).attr("value") == l) {
                            n.eq(a).css("display", "none"), null != t && t && n.eq(a).prop("disable", !0);
                            break
                        } if (null != e.parent().prop("mindex1")) {
                    var i = $(e.parent().prop("mindex1")).find("div");
                    for (a = 0; a < i.length; a++)
                        if (i.eq(a).attr("value") == l) {
                            i.eq(a).css("display", "none"), null != t && t && i.eq(a).prop("disable", !0);
                            break
                        }
                }
            },
            useablePanelItem: function(e, l, t) {
                if (null == e.parent() || "targ_panel" != e.prop("role")) throw "XMlayout info: param 'panel' is invalid in function useablePanelItem() !";
                if (null != e.parent().prop("mindex"))
                    for (var n = $(e.parent().prop("mindex")).find("ul").find("li"), a = 0; a < n.length; a++)
                        if (n.eq(a).attr("value") == l) {
                            if ((null == t || !t) && null != n.eq(a).prop("disable") && n.eq(a).prop("disable")) continue;
                            n.eq(a).css("display", "block");
                            break
                        } if (null != e.parent().prop("mindex1")) {
                    var i = $(e.parent().prop("mindex1")).find("div");
                    for (a = 0; a < i.length; a++)
                        if (i.eq(a).attr("value") == l) {
                            if ((null == t || !t) && null != i.eq(a).prop("disable") && i.eq(a).prop("disable")) continue;
                            i.eq(a).css("display", "block");
                            break
                        }
                }
            }
        }
    },
    addParam: function(e) {
        if (null == e || null == e || "object" != typeof e) throw "XMlayout info: param 'data' is not a object in function addParam() !";
        var t = this;
        $.each(e, function(e, l) {
            t.xmparams[e] = l
        })
    },
    getParam: function(e) {
        return this.xmparams[e]
    },
    __play: function() {
        var t = this;
        $(window).keydown(function(e) {
            if (!(t.play_panel.length <= 0)) {
                var l = e.which || e.keyCode;
                if (t.__isNaN(l)) throw "XMlayout info: can't get the keyCode in function keydown()!";
                17 == l && $(this).prop("ctrl", !0), $(this).prop("ctrl") && 81 == l && (t.anim_tf ? (t.__playTurnoff(), $(document).scrollTop($(document).prop("msct")), $(document).scrollLeft($(document).prop("mscl")), $("html").css("overflow", "auto")) : ($(document).prop("msct", $(document).scrollTop()), $(document).prop("mscl", $(document).scrollLeft()), $(document).scrollTop(0), $(document).scrollLeft(0), $("html").css("overflow", "hidden"), t.__playOpen()))
            }
        }), $(window).keyup(function(e) {
            if (!(t.play_panel.length <= 0)) {
                var l = e.which || e.keyCode;
                if (t.__isNaN(l)) throw "XMlayout info: can't get the keyCode in function keydown()!";
                17 == l && $(this).prop("ctrl", !1)
            }
        })
    },
    __playOpen: function() {
        var e = this;
        if (0 != e.play_panel.length) {
            e.anim_tf = !0, $(".xmlayout_anim").eq(0).css("display", "block");
            var l = e.playbottom.find("center").children().eq(1).find("div>img");
            l.eq(0).css("visibility", "visible"), l.eq(1).css("display", "block"), l.eq(3).css("visibility", "visible"), l.eq(2).css("display", "none"), e.playbottom.animate({
                bottom: "40px"
            }, "normal"), e.playbottom.find("center").children().eq(1).prop("display", !0);
            for (var t = 0; t < e.play_panel.length; t++) {
                null != (n = e.play_panel[t].parent()).prop("zoom") && null != n.prop("zoom") || (n = n.parent()), n.prop("ispopped") && n.css("position", "static")
            }
            for (t = 0; t < e.panel_tree_list_i.length; t++) {
                var n;
                "none" == (n = e.panel_tree_list_i[t].panel).css("display") && (n.prop("odisplay", "none"), n.css("display", "block"))
            }
            for (t = 0; t < e.play_panel.length; t++) {
                var a = 5 + 100 * t;
                e.play_panel[t].css({
                    position: "fixed",
                    zIndex: 10000001,
                    left: a + "%",
                    top: "60px",
                    width: "90%",
                    height: "calc(100% - 100px)"
                }), e.play_panel[t].prop("mparent", e.play_panel[t].parent()), $("body").append(e.play_panel[t])
            }
            for (t = 0; t < e.resize_fun.length; t++) null != e.resize_fun[t].params ? e.resize_fun[t].fun(e.resize_fun[t].params) : e.resize_fun[t].fun();
            null != e.play_panel[0].prop("mtitle") && null != e.play_panel[0].prop("mtitle") ? e.playheader.find("div").eq(1).find("span").text(e.play_panel[0].prop("mtitle")) : e.playheader.find("div").eq(1).find("span").text("无标题"), e.playheader.css("display", "block"), $.dcdc0xdc = 0, $.dtdt0xdt = setInterval('if($.dcdc0xdc == 5){$.xmlayout.playbottom.children().css("opacity", 0.0);clearInterval($.dtdt0xdt);}else $.dcdc0xdc++;', 1e3), e.playbottom.mouseover(function() {
                $.xmlayout.playbottom.children().css("opacity", 1), $.dcdc0xdc = 0, null != $.dtdt0xdt && null != $.dtdt0xdt && clearInterval($.dtdt0xdt)
            }), e.playbottom.mouseout(function() {
                null != $.dtdt0xdt && null != $.dtdt0xdt && clearInterval($.dtdt0xdt), $.dtdt0xdt = setInterval('if($.dcdc0xdc == 5){$.xmlayout.playbottom.children().css("opacity", 0.0);clearInterval($.dtdt0xdt);}else $.dcdc0xdc++;', 1e3)
            })
        }
    },
    __playTurnoff: function(e) {
        (e = this).anim_tf = !1, null != e.anim_wd && (clearInterval(e.anim_wd), e.anim_wd = null);
        for (var l = 0; l < e.play_panel.length; l++) e.play_panel[l].prop("mparent").append(e.play_panel[l]), e.play_panel[l].css({
            position: "static",
            zIndex: 0,
            width: "100%",
            height: "100%"
        });
        $(".xmlayout_anim").css("display", "none");
        for (l = 0; l < e.resize_fun.length; l++) null != e.resize_fun[l].params ? e.resize_fun[l].fun(e.resize_fun[l].params) : e.resize_fun[l].fun();
        for (l = 0; l < e.play_panel.length; l++) {
            null != (t = e.play_panel[l].parent()).prop("zoom") && null != t.prop("zoom") || (t = t.parent()), t.prop("ispopped") && t.css("position", "fixed")
        }
        for (l = 0; l < e.panel_tree_list_i.length; l++) {
            var t;
            "none" == (t = e.panel_tree_list_i[l].panel).prop("odisplay") && (t.prop("odisplay", "block"), t.css("display", "none"))
        }
        e.playbottom.animate({
            bottom: "0px"
        }, "normal"), e.playbottom.children().css("opacity", 1), e.playbottom.find("center").children().eq(1).prop("display", !1), e.playheader.css("display", "none"), null != $.dtdt0xdt && null != $.dtdt0xdt && clearInterval($.dtdt0xdt), e.playbottom.children().css("display", "block"), e.playbottom.unbind("mouseover"), e.playbottom.unbind("mouseout")
    },
    __anim: function(e) {
        var t = this;
        if (1 < t.play_panel.length) {
            var l = t.playheader.prop("np"),
                n = t.playheader.prop("ap");
            if (0 == e) {
                n < ++l && (l = 1), t.playheader.prop("np", l), t.playheader.find("span").text(l + "/" + n), null != t.play_panel[1].prop("mtitle") && null != t.play_panel[1].prop("mtitle") ? t.playheader.find("div").eq(1).find("span").text(t.play_panel[1].prop("mtitle")) : t.playheader.find("div").eq(1).find("span").text("无标题");
                for (var a = 0; a < 2; a++) {
                    var i = 5 + 100 * a;
                    1 == a && t.play_panel[a].css("left", i + "%"), i -= 100, 1 == a ? t.play_panel[a].animate({
                        left: i + "%"
                    }, "normal", null, function() {
                        for (var e = t.play_panel[0], l = 1; l < t.play_panel.length; l++) t.play_panel[l - 1] = t.play_panel[l];
                        t.play_panel[t.play_panel.length - 1] = e, t.playfi = !1
                    }) : t.play_panel[a].animate({
                        left: i + "%"
                    }, "normal")
                }
            } else if (1 == e) {
                --l < 1 && (l = n), t.playheader.prop("np", l), t.playheader.find("span").text(l + "/" + n), null != t.play_panel[t.play_panel.length - 1].prop("mtitle") && null != t.play_panel[t.play_panel.length - 1].prop("mtitle") ? t.playheader.find("div").eq(1).find("span").text(t.play_panel[t.play_panel.length - 1].prop("mtitle")) : t.playheader.find("div").eq(1).find("span").text("无标题");
                for (a = 0; a < 2; a++) {
                    i = 5 - 100 * a;
                    1 == a && t.play_panel[t.play_panel.length - 1].css("left", i + "%"), i += 100, 1 == a ? t.play_panel[t.play_panel.length - 1].animate({
                        left: i + "%"
                    }, "normal", null, function() {
                        for (var e = t.play_panel[t.play_panel.length - 1], l = t.play_panel.length - 1; 0 < l; l--) t.play_panel[l] = t.play_panel[l - 1];
                        t.play_panel[0] = e, t.playfi = !1
                    }) : t.play_panel[a].animate({
                        left: i + "%"
                    }, "normal")
                }
            }
        } else t.playfi = !1
    },
    __header: function() {
        var e = $('<div style="position: fixed; width: 350px; height: auto; left:calc(50% - 175px); left:-webkit-calc(50% - 175px); left:-moz-calc(50% - 175px); top:10px; z-index: 10000003;"><div style="width: 80px; height: 23px; background-color: white; border-top-left-radius: 5px; border-bottom-left-radius: 5px; float: left; border-right: 1px solid gray;"><center><span style="font-size:16px; font-weight:bold;"></span></center></div><div style="width: 265px; height: 23px; background-color: white; border-top-right-radius: 5px; border-bottom-right-radius: 5px; float: left; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;"><span style="font-size:15px; margin-left: 5px;"></span></div></div>');
        return e.prop("np", 1), e.css("display", "none"), e
    },
    __bottom: function() {
        var t = this,
            n = $('<div style="position: fixed; width: 168px; height: 0px; bottom:-0px;  z-index: 10000003; background-color:red; left:calc(50% - 84px); left:-moz-calc(50% - 84px); left:-webkit-calc(50% - 84px);"><center><div style="width: 80px; height: 20px; background-color: #848484; border-radius: 4px; margin-top:-20px;"></div><div style="width: 168px; height: 38px; background-color: #848484; border-radius: 4px;"><div style="margin-left:23px;"></div></div></center></div>'),
            e = n.find("center").children().eq(0);
        e.append(t.__getPNGs(10)), e.find("img").css("opacity", .4), e.find("img").mouseover(function(e) {
            $(this).css("opacity", 1)
        }), e.find("img").mouseout(function(e) {
            $(this).css("opacity", .4)
        }), e.find("img").click(function(e) {
            var l = n.find("center").children().eq(1);
            l.prop("display") ? (t.__playTurnoff(), $(document).scrollTop($(document).prop("msct")), $(document).scrollLeft($(document).prop("mscl")), $("html").css("overflow", "auto"), l.prop("display", !1)) : ($(document).prop("msct", $(document).scrollTop()), $(document).prop("mscl", $(document).scrollLeft()), $(document).scrollTop(0), $(document).scrollLeft(0), $("html").css("overflow", "hidden"), t.__playOpen(), l.prop("display", !0))
        }), e = n.find("center").children().eq(1).find("div");
        var a = t.__getPNGs(6);
        a.click(function(e) {
            t.playfi || (t.playfi = !0, t.__anim(0))
        }), e.append(a), e.append($("<span style=\"font-family:'Times New Roman';\">&nbsp;&nbsp;</span>"));
        var i = t.__getPNGs(7);
        e.append(i);
        var o = t.__getPNGs(8);
        e.append(o), e.append($("<span style=\"font-family:'Times New Roman';\">&nbsp;&nbsp;</span>"));
        var p = t.__getPNGs(9);
        p.click(function(e) {
            t.playfi || (t.playfi = !0, t.__anim(1))
        }), e.append(p), o.css("display", "none"), e.find("img").css("margin-top", "2px"), e.find("img").css("opacity", .4), e.children().css("float", "left"), e.find("img").mouseover(function(e) {
            $(this).css("opacity", 1)
        }), e.find("img").mouseout(function(e) {
            $(this).css("opacity", .4)
        });
        var l = $('<div class="xmlayout_anim" style="position:fixed; left:0px; top:0px; width:100%; height:100%; z-index:10000000; background-color:black; opacity:1.0;"></div>'),
            r = $('<div class="xmlayout_anim" style="position:fixed; left:0px; top:0px; width:100%; height:100%; z-index:10000002; opacity:0.0;"></div>');
        return i.click(function(e) {
            null == t.anim_wd && ($(this).css("display", "none"), a.css("visibility", "hidden"), p.css("visibility", "hidden"), o.css("display", "block"), r.css("display", "block"), t.anim_wd = setInterval("$.xmlayout.__anim(0)", t.timer), t.playfn = !0)
        }), o.click(function(e) {
            null != t.anim_wd && ($(this).css("display", "none"), a.css("visibility", "visible"), p.css("visibility", "visible"), i.css("display", "block"), r.css("display", "none"), clearInterval(t.anim_wd), t.anim_wd = null, t.playfn = !1)
        }), $(window.document.body).append(l), $(window.document.body).append(r), $(".xmlayout_anim").css("display", "none"), $(window).keydown(function(e) {
            if (t.anim_tf) {
                var l = 0;
                if (null != e.which && null != e.which) l = e.which;
                else {
                    if (null == e.keyCode || null == e.keyCode) throw "can't get the keyCode in function keydown()!";
                    l = e.keyCode
                }
                37 == l ? t.playfi || t.playfn || (t.playfi = !0, t.__anim(0)) : 39 == l ? t.playfi || t.playfn || (t.playfi = !0, t.__anim(1)) : 38 == l && null == t.anim_wd ? (i.css("display", "none"), a.css("visibility", "hidden"), p.css("visibility", "hidden"), o.css("display", "block"), r.css("display", "block"), t.anim_wd = setInterval("$.xmlayout.__anim(0)", t.timer), t.playfn = !0) : 40 == l && null != t.anim_wd && (o.css("display", "none"), a.css("visibility", "visible"), p.css("visibility", "visible"), i.css("display", "block"), r.css("display", "none"), clearInterval(t.anim_wd), t.anim_wd = null, t.playfn = !1)
            }
        }), n
    },
    setPlay: function(e) {
        if (null == e.length || null == e.length) throw "XMlayout info: param 'panels' is not a array in function setPlay(panels)!";
        for (var l = this.play_panel.length = 0; l < e.length; l++) {
            if ("targ_panel" != e[l].prop("role")) throw "XMlayout info: the panel whoes index is " + l + " in array param 'panels' is invalid !";
            this.play_panel.push(e[l])
        }
        0 < this.play_panel.length ? (this.playbottom.css("display", "block"), this.playheader.prop("ap", this.play_panel.length), this.playheader.prop("np", 1), this.playheader.find("span").text("1/" + this.play_panel.length)) : this.playbottom.css("display", "none")
    },
    addPlay: function(e) {
        if (null == e.length || null == e.length) throw "XMlayout info: param 'panels' is not a array in function addPlay(panels)!";
        for (var l = 0; l < e.length; l++) {
            if ("targ_panel" != e[l].prop("role")) throw "XMlayout info: the panel whoes index is " + l + " in array param 'panels' is invalid !";
            this.play_panel.push(e[l])
        }
        0 < this.play_panel.length ? (this.playbottom.css("display", "block"), this.playheader.prop("ap", this.play_panel.length), this.playheader.prop("np", 1), this.playheader.find("span").text("1/" + this.play_panel.length)) : this.playbottom.css("display", "none")
    },
    __clearInvalidObjects: function() {
        for (var e = this, l = 0; l < e.panel_ids.length; l++)
            if (!$("#" + e.panel_ids[l])[0] || $("#" + e.panel_ids[l]).prop("isDestory")) {
                for (var t = 0; t < e.panel_tree_list_i.length; t++) e.panel_tree_list_i[t].ref_id == e.panel_ids[l] && (e.panel_tree_list_i.splice(t, 1), t--);
                for (t = 0; t < e.play_panel.length; t++) e.play_panel[t].prop("ref_id") == e.panel_ids[l] && (e.play_panel.splice(t, 1), t--);
                for (t = 0; t < e.resize_fun.length; t++) e.resize_fun[t].ref_id == e.panel_ids[l] && (e.resize_fun.splice(t, 1), t--);
                e.panel_ids.splice(l, 1), l--
            } 0 == e.play_panel.length && e.playbottom.css("display", "none")
    },
    __getPNGs: function(e) {
        if (this.__isNaN(e)) throw "XMlayout info: the param in function __getPNGs() is not a number!";
        switch (e) {
            case 1:
                return $("<img title=" + $.xmlayout.LANG.zi + ' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAtCAYAAAA6GuKaAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjg5MDMzMjFBNDhDQjExRTdBMTcyRDM1MDg2MDdFMjkxIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjg5MDMzMjFCNDhDQjExRTdBMTcyRDM1MDg2MDdFMjkxIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ODkwMzMyMTg0OENCMTFFN0ExNzJEMzUwODYwN0UyOTEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6ODkwMzMyMTk0OENCMTFFN0ExNzJEMzUwODYwN0UyOTEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4MqOVTAAAEiklEQVR42sRZO0wbQRA9d0aJEjqgiGyEASs0IAroIG7idDRIlJSgUFDSgZ3CdHRQGlFgKhAVXYyEZCyhYCSU4AawlSA6sFEi7uTA5s3J56zP9/V9WGlk+7y3827uzdvZ3QBjTHDY3sNiZ2dno5VKJSpJ0rt8Pv8a194ODg5Wu7u7f+P7z8nJySI+v8G+wn6Q30Ag0J5HurkNC19fXyfX1tYu4/E4PbUlGxkZYSsrK6xQKFxijCSN8/z83DK+1jXe7IKN7O3tbUWj0ZpVoHoWDocZHroGgFs0rh0cVjsGj4+PE+Pj4yJeKXMKWA0egRDrkQ+6Ahpg+2dmZgrkgADrgVaut/tQ4DzRpgCf/Y5AY4yPw8PDVTcja/TASFp2dHRUhe94W6Cz2ex0Z2enZNdxO/3hh83OzhJNGLX9/X0JH9O2QIMSsWAwKDkFZmQK0N3dXca329tb+f9MJkPAY5ZAE4eRHBUvKKCOqFbb2NiQ+yNoLJfLVXBpwAx0EAlx6sbr13v1Zo0SUvHV29vLEMRTtao0gYZuJtwCjARuAQpNNgSsUIO3qakpVpfDVtCY4SJ4JaLbGpxOp5nVtr6+rjkOVEzkJ6AG6MXFxW2vkg4zKCsWiy2RVv8mamjdj0mN/t5uAg3e9HV0dPz1SoeJKiimDAFrUYM3UO0J3fpk0FScLC0tpbwEfH9/b0oNRTX0jAoztNVGpPH6SlqUcEoRAnx3d9cC8Pz8XFM1jMYiCUQry6CRgENezHp6EabSlABcXFw0aGJGDcV2dnboliEhlUp9dnuKNgLMK8vj42ODGlZ8kN6jLQio4NJ+cJgHrJgih2bU4B8ULS3ghpxfgPlo0nfqb5UaHK9zAtDf+B1htSrY8YP2S4A+V18KcDtWKpWqgtWEowLdDuDl5WXHqxktOzw8lLcPqlaAHxwcsK6uLt8irPfAkMoHS5ymKFNDFWgKOJFIeLIU4zh9I6AYyZl1npubkwGRrlJ9TPsXasA0SVCE3aKC3jiyeqBeNdVprBcb4E5OTnxLOvVDNHQaxdKC2QrZrIDnAbu9L8KPVy+aFmjVbVh7KNQwA+w2WC2j6V6uPahqQjTLVqihjnhdfnwzFHdU5QVk0ChEVrU69fT0mNbBtA6k5PQaMKlVUz0NDe7DH09m1NDjNSUm0URvAnLDILf/Vy7KuguF07YZNfSa8jBU/NB6zm3AdTHItCxsseKNoIOonlDMwFKUqcSkpb6HCSjyG5NN+x6orZNKx/n5eV2wXgPllajO5S+GO0yIcEGLGn5EVKt+Rr4VDHeY6kk5EAqFKi8BVK31oIW8l6c+ztDcNc1kMjEAlfzUYA3lsr5rqhim92ncLLlZ7Fg1Cpjt/Wku4nHwqupFtaZnWDw8wPcnx2cuSnJ6nXQIkvMzF15VQJck1pOiF8kHqZVcPd1SHUpG4GALzmpuAJ6YmKhhUvPsHLHJUG2FUQskMfVf2eUzTRaoU64AVj6xbcd/wIWz8aHNzc0P5XJ5FN+j+Xw+JIriKwB+g98PY2Njf8DXMhbFRcgYnY1nYd+dOPwnwAASbPFBAW4BygAAAABJRU5ErkJggg==" style="width: 20px;"/>');
            case 2:
                return $("<img title=" + $.xmlayout.LANG.zo + ' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAtCAYAAAA6GuKaAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjg5MDMzMjE2NDhDQjExRTdBMTcyRDM1MDg2MDdFMjkxIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjg5MDMzMjE3NDhDQjExRTdBMTcyRDM1MDg2MDdFMjkxIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ODkwMzMyMTQ0OENCMTFFN0ExNzJEMzUwODYwN0UyOTEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6ODkwMzMyMTU0OENCMTFFN0ExNzJEMzUwODYwN0UyOTEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7zw+FrAAAFFUlEQVR42rxZPUwbSRQeR5awdMkFKuCki5GOJFYoDIoQUMHR4KugQZCOBgFKkCgpiQ8JOkokmkgUMVRAw09zIBojpMQ0FxyhGKMUQIXtJGALzNz39jxod9n17np38qTntb0/75u37398nHPmkl5kMplu8Mt0Oh3y+Xy/x+Pxh4VC4TEo29zc/B3XfA2FQkkcP9TV1f2D4ye6kWTjeucS6cYKuOHq6ioai8W+DA0N8erqalr5PQYgzW8A5mNjY3xlZeXL5eVllJ6jf/bt7a2lfKdgG4+PjxcHBwevjUA64UAgwEdHR69TqdQiPdcJDrsXBg4PD99OTEzkrbRp95zgqqoqPjU1lcfzo9BywCvQT+fn5xNmJuAVk+nAbBIkzy3oHrzCrF3BdjRrxdB6FnIjFYFOJBL9XV1dBbcgnCwEkYbDZyCeF8D9TkF3t7e3F7x8/QSenM9sEeFwmF9cXHAVEfBuu6CfIjpkZNjt3NycqYYR57meFhYW6M9nZUGT987MzHyUAZiAEdFR/79OwwrBtpXzyAUfKXqZgoYdv5UVHRCBFDCIEBqTMNKwACziOew8aga6sa+vLy8DMAlGBr0DRVnUSsNqpvygTkBqLb+XpWWETQ0w1CU8l8vZAiwWjcz5Xg/6j5aWlhtZoKEQbkVmgEW0gRUUCecdaKTQGVmAhQM6BawPjaTt09PTWcL7gCq95eXlV8xjEiXnyMhI2etubm5YMpk0rD7VlM/n2ebm5itxsgmJhP8MB9QTQuzd99XV1XvhUM/IH3RPE0M4ef2zHNCKaBEUEtE8mGZU0Bv2DlRpoWN1nx0HJKJ6g+J4JBKxlLm9vf3Of3Z29rzSlku0S0b341UrbEZkxzAJ8id2cHBgWybh9Wez2aAbhzNbMDmgvgfc29tTQBJY9JMVyUMGfUKafuh15IDtMWQ9BTABJN7a2iItuX72+fn5I4aamXtdgra2tvLx8XHFcbxuFqgEeIA2J+ck7ppRQ0MDQ6fN1tfX2f7+Pjs6OlJiqxOTsoMBeL/58UFziV+d2K5wvlAoxJBe2cDAgMbpYHcMXu5ZkhKy6VhbW/vNj4b1BL9/s6vptrY2BSSBJe0aETIXQ1HkKWBBhNcfDAY/42RHuVdGAHt7e1lPTw+rr6+3FLa2tuaJlo0wQVGfWTwef2Nk8DjJl5aWyqZhI4Id85qaGmmjBiUjUu1BAM2AU1/nBPjGxoY0wJ2dnSSiSZmdoUY4sRqkINvbAk31htdgKUQSo389gYj/DR2ePmvn5unpaU1lZkS0QFmaRo0yq+lcIKxoVcwb9XTqRcA/pAFG+aztXIhhu6Y9IloxQ8B68JOTk9JAoxSIGXbj0GbeSsNCs1S06wnJRgpgmhKoB5OauQcK8KiTQYqYZRChz5SmZdTlf6uH7vfm0CjEE3YAkzeT04lwCM+W0kggGiXKTphK/CwcDmfQ+drqmimOE+n7TC/GvqhAzWd5+n2OVCrVXZpaWs4lSNvULnltEkhsmqmpGqPpfLpYLPYL4GaAhUatuminpgJFVDSfFhwZHh7OMonbFnru6OigedlfrvdchHPK3AUozTXc77mo7CgQi8WisDMpU1WYVwGFVlQfJVzvI5YW0IhosYhC/Jp5s6N1jUJM2j7ivR1b0jyazJTTrTqKNoi9KUpkRju2dthnt8kU1xk0uE07Ozt/7u7uvqRMnk6ng+BfSn1nDqn9B4BSSZlEOv4AU6Dm8V83Hc1/AgwAjaKB+j42DzQAAAAASUVORK5CYII=" style="width: 20px;"/>');
            case 3:
                return $("<img title=" + $.xmlayout.LANG.fs + ' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAtCAYAAAA6GuKaAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkY0MTU2M0M3NDhENjExRTdBMTcyRDM1MDg2MDdFMjkxIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkY0MTU2M0M4NDhENjExRTdBMTcyRDM1MDg2MDdFMjkxIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ODkwMzMyMUM0OENCMTFFN0ExNzJEMzUwODYwN0UyOTEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RjQxNTYzQzY0OEQ2MTFFN0ExNzJEMzUwODYwN0UyOTEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7kBqdzAAAEl0lEQVR42tRZPUxaURS+EAeStlY3HVpJlIKtg4lNdFNZihuJMZEuOjrqJJtCB9kYHf0Zqps6oUvRCRclDq0wFCUd0EmwbeTF1tfvEK65vDzg/QH2Jif8vHfv+9653z33O+faZFlm9RrdY7PZql1+i+teSZKGjo+PPbjv1cXFxfNsNvsS1wrDw8O/HA7Hj46OjtTg4OAJ/vsC+8bMNAKkxR4eHsTfzlwuF04kEt/n5+dlj8dDb67J/H6/vLq6+p360zhany+a3g59mUxmc3l5+b6rq0sz0Go2MjJyH4/HN2ncRoB2wELwUNEKsErz+XzF8/PzcPk59WaZaaGECzRIgo+aAIDTFZ/17hMtGAwm6XlmPf1hZ2engEWky3P1ANeysbGxQjKZ9BkFPQXuSlZTQYs5nU7p8PBwShdo0MK7srLSEsDcsHYk0NKrRlk10K5YLJZvJWBuWEd54HlTz9MOvN2pXg43wvi6mJ6ePlVGFSXokNYo0UxDMAiLYa9i48DFYiMiggX8LoobkI1rj1Qq9XliYiJweXlZ+j07O8uwilmrG+HZ3t5mCAxbkAwfS3+W3d4bjUb/0FtB3MjYnWSx4R65le3m5kZ2u91/gatXpMcKFz1zc3PyU2yLi4sktCKE107ehowMgB4lz4M/DZtqLTK4Wr+joyO2t7cXoN9tsHdbW1s91TpgZyp14I10tdGHG+0PnV4yUPc14SXQYwcHBxWDio0AYztvGsBarVgs0qIcJ9DvyZtmp9BKOtRqZ2dnQ21XV1fuZj7UbCO8bfl8vqfW9D61hrj92g7kz/8XL1O7vr5+YQfydj1eNup95IOWgL67u2u3Iy7f6vGw0RmYmZlhyEgYMhOzuH8S6F+iB63ksTjWxsYGg4JkyL4ZhJlhXYN+P+3QztlGcVgckzYHLsb8fj+DjmCRSITh+brGhJOzdiBPix4Rv6u9iJmZILXGG3Y3Bj1RAg+9owd0mrTHCRSUKlA1yhiZEd4/nU6rgWAQQjX5Tv35GMB6QjtinKaLpkqtjY6OsqWlJUvownmsVhvkfN/d3WULCwuPVFI6CrMSL/2Bm7M8S4DOaLmOhsaQIfplZa6KsJnFZRvX0xF+QzAYfDIaOpfLVRQ3Q6FQRCwh9CKV+Ut5INXq6E3VWjM9v7a2RkUbMTd9zFwec0Rw6HN/f3+A5B/ejiF1Nx3uOG/594GBATY5OVmz7r2+vs7g0QpOl3PWbbxIQFmf7gM1LM3GlX2oll3Ps2rjIDwWxcKkspQaJno0qlwQi8V0gRWqqZ9qVpiQeiUbAbi7u1uG2NEFlgxUTYoVpmq1vDd4M8treZwaWsGSIaJpquVx8/p8PkurpljYVcFWoaMEOnl116cRzFtV7pWwtU8ZPQnwYdssNKtCWqbELXboCbMHRa5oNJo0Egr1RqHyonNZdrpFp090CmWFN5XW2dkpQWtUPd0yfY5I535QZPcWUeMeUaVh54hKcyYSiTAemNFzWiuc2maw0Ayf2NrMplno/w7ifnx/f3+oUCh4oF16kFo9wyXK8m+xsH5jZkj6pkjAI/TF8f2rmWf+E2AA7UAkiMKWRkEAAAAASUVORK5CYII=" style="width: 20px;"/>');
            case 4:
                return $("<img title=" + $.xmlayout.LANG.pp + ' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAtCAYAAAA6GuKaAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkY0MTU2M0NCNDhENjExRTdBMTcyRDM1MDg2MDdFMjkxIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkY0MTU2M0NDNDhENjExRTdBMTcyRDM1MDg2MDdFMjkxIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RjQxNTYzQzk0OEQ2MTFFN0ExNzJEMzUwODYwN0UyOTEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RjQxNTYzQ0E0OEQ2MTFFN0ExNzJEMzUwODYwN0UyOTEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6bSXbNAAAEv0lEQVR42sxZPUwbWRB+tpAwSgIUSNDkDDouMUFISCmAjtDEVNAg7I7SKCmgAioIKUgHHXQWFDYd7qDK0kGDTXOHLZEAQsLQgCE5YcOFl282eLVedr0/b4NvpCfvru15386b+d7MPA/nnNkR+r3H41E/epXL5fowXh8eHgZw/3x7e/tpoVCoa2xsvGxra/uO/xx3dnam6+vrd/D9Z4x/LOgtD8LBaL64uJiNx+NfQqEQBxh6c9PR3NzMI5EIX19f/0L/Jz1O5n/w4O7urtwfWlOp1AqA3hoBg7V0r7WDXnRsbOx2b29vhfS6AloNHte+g4ODDyMjI3krFrUz6urq+PT0dB76yfI+R6B1xl9zc3Mpn89nCqCcZc1GU1MTlyQpRfOJgn4LV7j8XUD1xvz8/CXmDToCvbW1NdTd3V1w2x2svCwMVQCGIaP4MgLcB4oqiACwyigmwPv0CELXhwcHB3MiE5L/g2XkTxH3QSzlgOeFmaV9k5OTSdGlB5VxEvoU1QVOTxJ7qS1eYvpkMvlBdBKy7snJiQw6m81yK6xTbmBXJVWzRpZu7e3tzYsGFZaUq2V4eNixruL1zMxMXr0BKaDX1tZiolYmrr2+vi4BTb4tqrempoZj84lpQf8JtvjPBY7leoLA5i7EyQ/CqYAGxc25aWXESFlrO2EUolDIJwX0xMTEoSjoRCKhC7goWEk3mOSoCLqdUkarVtD7ngCZCWJGGDQSNlLVTq7xTlQZAbIiota+d5H3bHFxMSqiCPkJtyooGoQTLOTfUe/Z2dlLvYrGaumDl7Zcqg0MDDBsFrbKOy2O09PTl17UdX6jMswMPKiMYcmVe9SGDPpKfkP36XRavgbfUtDbrkk1+v7wAvlTm4WsIqg4GFiDhcNhGVBPTw9bXl4uqT3pHsUtAyWy0dFRBneSr50K8D6rQhVdq14Kvepc7xmCgvX395MSS8sKN2RLS0vyQD7iGPTNzU1tFRRc4brWCJyR4GUdx0E+n3cMGhi/ecHR351MbMX/7Ire3MVnxU+/3//NC/86cnNiOzq0IMu5ZvGT8HpBQRmny2zHYm6tDEBnvIFAYMftZf5dQgEMit2pCgaDEjGBXmBhr2fweVuKUUg8uEcSb0sHcfvq6uqDgL3XLclWBbgjbcmE7ZJXUs7Pz+V0V40rGo1SlveLl2Ox2CedbMoVMUpVrcjU1FQJ6JJ8mioCvNUPdUKPpeGVFkrGipiQMiiVi4cqcYr2hYWF2Pj4eLjoPwhQFgqFHAVMQ0MD6+joYMfHx2x/f9+RDspjNjY2lF0a1c8qgjCs7U+3wsKud0XdGLByXt2YLGnWwNFn/2+AiRQgHx80a9QdJtBK6rGBlSsMQJcpbd9ar/P/oqWlJVcJ0Frw2EMs9fKUrik2nEIl3QJEYKtrKg+U60OVAo5dWO5POzoJ2NzcDELB5WMCRkxdYe5+4TMXlFGPEpyRSMSVMxeFVYgOjXhctC3Q1dVVkCTJ+emW2TkiKGgFvn7rku/exuNxsXNEE8AlJ7aYbBbb/Fe7Zyv3p7ZfEeiOT2w9Rgm/UetA53l7IpF4s7u7+xrPA5lMxp/NZp/cF8tXoK5/qUSqrq5Og3d3kD9I0PG3SHX0U4ABAM74kh2xTlAgAAAAAElFTkSuQmCC" style="width: 20px;"/>');
            case 5:
                return $("<img title=" + $.xmlayout.LANG.bt + ' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAtCAYAAAA6GuKaAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkY0MTU2M0NGNDhENjExRTdBMTcyRDM1MDg2MDdFMjkxIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkY0MTU2M0QwNDhENjExRTdBMTcyRDM1MDg2MDdFMjkxIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RjQxNTYzQ0Q0OEQ2MTFFN0ExNzJEMzUwODYwN0UyOTEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RjQxNTYzQ0U0OEQ2MTFFN0ExNzJEMzUwODYwN0UyOTEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4ofirfAAAE0UlEQVR42sxZPUwbSRRe56LE0kUBKkNxsRGYoOMksGgojRtMBQ2J3YF0J0B3BXTmKnAK00FnUcVQxKbhpzI0gQrTIIOUHKRIwLpD0OGN7mAtK2y+t1pLi9k1O7NzCU96sr3e2fnm7ZtvvjfjUlVVcmg/w0Pw7t3d3XZFUX4qFotPDg4O6nBNbm9v/9fj8fyN70fBYHAPn2/hfznqkUDb8evra8313z54/PDw8OPc3Jza09NDI7flXV1daiKR+Ii2cf05EquzNmiFL6XT6TIiaBuolft8vnIymVzSnysctBs+s7W1pVCkzAC4XC5u8AiAks1m43o/QkD7c7lcPhKJOAJnp104HM7D/E5B9wGwzJMKmHSq2+1mHiRSRkaf4co8YgU9tLq6Wqqvr2eKIgHFJFPJLi4uVDAH84DxjBLmzRBrpEPIsRIBYO1wbGxMNVosFuPN/RIwhMzwPTBhQT/4dmVkZOQROJeZQhsbG2/8xsBvUaxNexSNRleApa36j2rQbty0PD4+Xnd+fs7F+4gk0/VaJstyHYKXIVy1QE8tLy8H9vf3uUFaRZJn5aU2R0dHgcnJyT+tVsTW4+NjpZLHvNQ2PT19I6dnZma4+duAQQEVtprldHxqaupxJY8FaBLNiLZ4U8WA4TEGH69OjxakxItMJiMEqHHAZgB5ArK2tvZyY2OjRQOtP+DXhYWFHyRBxjPpjO0s2j9IpVK/aV/0G6IYBXNnUHcStAgzUKywWlurN2D1JjY3N6P0+RDeAZrznpycMEeG2mDySoVCQVpcXJQgqCzv7ezslHp7e6XR0VEJS7XU3NzM3B90+rPt7e0OGtXvNON5FRvp6VpWLpdvXaM2vAyFFfcPAv2axA0vLWEFVK+urlS7RvdSG97+kFaviT2e865+ZNQWM9v2/aAuyWF/zynSp01NTY4qECoM7NjZ2ZnKI8Kq0ugfAi07LZvIIWPvBD0xMeG40kE7mWY/d/Vh/E3RxuonPMqmjokhJNLk0AeWoAcHB4X0gUB9Jm1waqc6seMEzMxoMKICAz+lnN4B0av/Z7QFRpnococo74PX6xWmNWZnZ2/8h9WWiRLvEmIA/YFA75EWEKXq1tfXb/AwqiBHIspEt+y50GEHxNK7/v7+WzcMDw9rOoHVSAz19fVR1SGhEmIafGVwpGdQkUvVdSqu/aLdiFK/YKQj4zbAtzIzuqQtCOOSD1wFXHZpRQDYI02RqVgkEpFYUkZElWOWPsClvW3DG0xrA9DrrhasaF+MIujy8lK9D2bYkf2STCZbtBQyROlNIBCIVipxijRF/HsZRT6Xy0lUnOh4MkjZ6K1qPJvNKgIXAZGuIBP8Vtti8YGBgXsHGinyqtZenpu2dRsaGhzvOYtyMEYezOI27qCabT62IU2K9yTKRfByW81dU8NoQolEovSdAZdisVjIbJ+65v40ishvDlxPyRKYa4j3JCAMbpSFiXd7/hnVer/jMxfkeF6U5q5VDaGPPPryizzdiqPGU+6q8TgZp4RUFHq6Vb0dvARRXxYU6XI4HLY8R+Q5KKrlPjpxnZ+f/2TntLY6+iiCP4Gd6MTXZwdktbsEKLQOeG8qleqGBiZp6EW18iN08FOaVPD/gsFggc7GPR7PHtKANvzeO+nwqwADAO3OmCHzO2owAAAAAElFTkSuQmCC" style="width: 20px; display: none;"/>');
            case 11:
                return $("<img title=" + $.xmlayout.LANG.cp + ' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC8AAAAvCAYAAABzJ5OsAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAKTWlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVN3WJP3Fj7f92UPVkLY8LGXbIEAIiOsCMgQWaIQkgBhhBASQMWFiApWFBURnEhVxILVCkidiOKgKLhnQYqIWotVXDjuH9yntX167+3t+9f7vOec5/zOec8PgBESJpHmomoAOVKFPDrYH49PSMTJvYACFUjgBCAQ5svCZwXFAADwA3l4fnSwP/wBr28AAgBw1S4kEsfh/4O6UCZXACCRAOAiEucLAZBSAMguVMgUAMgYALBTs2QKAJQAAGx5fEIiAKoNAOz0ST4FANipk9wXANiiHKkIAI0BAJkoRyQCQLsAYFWBUiwCwMIAoKxAIi4EwK4BgFm2MkcCgL0FAHaOWJAPQGAAgJlCLMwAIDgCAEMeE80DIEwDoDDSv+CpX3CFuEgBAMDLlc2XS9IzFLiV0Bp38vDg4iHiwmyxQmEXKRBmCeQinJebIxNI5wNMzgwAABr50cH+OD+Q5+bk4eZm52zv9MWi/mvwbyI+IfHf/ryMAgQAEE7P79pf5eXWA3DHAbB1v2upWwDaVgBo3/ldM9sJoFoK0Hr5i3k4/EAenqFQyDwdHAoLC+0lYqG9MOOLPv8z4W/gi372/EAe/tt68ABxmkCZrcCjg/1xYW52rlKO58sEQjFu9+cj/seFf/2OKdHiNLFcLBWK8ViJuFAiTcd5uVKRRCHJleIS6X8y8R+W/QmTdw0ArIZPwE62B7XLbMB+7gECiw5Y0nYAQH7zLYwaC5EAEGc0Mnn3AACTv/mPQCsBAM2XpOMAALzoGFyolBdMxggAAESggSqwQQcMwRSswA6cwR28wBcCYQZEQAwkwDwQQgbkgBwKoRiWQRlUwDrYBLWwAxqgEZrhELTBMTgN5+ASXIHrcBcGYBiewhi8hgkEQcgIE2EhOogRYo7YIs4IF5mOBCJhSDSSgKQg6YgUUSLFyHKkAqlCapFdSCPyLXIUOY1cQPqQ28ggMor8irxHMZSBslED1AJ1QLmoHxqKxqBz0XQ0D12AlqJr0Rq0Hj2AtqKn0UvodXQAfYqOY4DRMQ5mjNlhXIyHRWCJWBomxxZj5Vg1Vo81Yx1YN3YVG8CeYe8IJAKLgBPsCF6EEMJsgpCQR1hMWEOoJewjtBK6CFcJg4Qxwicik6hPtCV6EvnEeGI6sZBYRqwm7iEeIZ4lXicOE1+TSCQOyZLkTgohJZAySQtJa0jbSC2kU6Q+0hBpnEwm65Btyd7kCLKArCCXkbeQD5BPkvvJw+S3FDrFiOJMCaIkUqSUEko1ZT/lBKWfMkKZoKpRzame1AiqiDqfWkltoHZQL1OHqRM0dZolzZsWQ8ukLaPV0JppZ2n3aC/pdLoJ3YMeRZfQl9Jr6Afp5+mD9HcMDYYNg8dIYigZaxl7GacYtxkvmUymBdOXmchUMNcyG5lnmA+Yb1VYKvYqfBWRyhKVOpVWlX6V56pUVXNVP9V5qgtUq1UPq15WfaZGVbNQ46kJ1Bar1akdVbupNq7OUndSj1DPUV+jvl/9gvpjDbKGhUaghkijVGO3xhmNIRbGMmXxWELWclYD6yxrmE1iW7L57Ex2Bfsbdi97TFNDc6pmrGaRZp3mcc0BDsax4PA52ZxKziHODc57LQMtPy2x1mqtZq1+rTfaetq+2mLtcu0W7eva73VwnUCdLJ31Om0693UJuja6UbqFutt1z+o+02PreekJ9cr1Dund0Uf1bfSj9Rfq79bv0R83MDQINpAZbDE4Y/DMkGPoa5hpuNHwhOGoEctoupHEaKPRSaMnuCbuh2fjNXgXPmasbxxirDTeZdxrPGFiaTLbpMSkxeS+Kc2Ua5pmutG003TMzMgs3KzYrMnsjjnVnGueYb7ZvNv8jYWlRZzFSos2i8eW2pZ8ywWWTZb3rJhWPlZ5VvVW16xJ1lzrLOtt1ldsUBtXmwybOpvLtqitm63Edptt3xTiFI8p0in1U27aMez87ArsmuwG7Tn2YfYl9m32zx3MHBId1jt0O3xydHXMdmxwvOuk4TTDqcSpw+lXZxtnoXOd8zUXpkuQyxKXdpcXU22niqdun3rLleUa7rrStdP1o5u7m9yt2W3U3cw9xX2r+00umxvJXcM970H08PdY4nHM452nm6fC85DnL152Xlle+70eT7OcJp7WMG3I28Rb4L3Le2A6Pj1l+s7pAz7GPgKfep+Hvqa+It89viN+1n6Zfgf8nvs7+sv9j/i/4XnyFvFOBWABwQHlAb2BGoGzA2sDHwSZBKUHNQWNBbsGLww+FUIMCQ1ZH3KTb8AX8hv5YzPcZyya0RXKCJ0VWhv6MMwmTB7WEY6GzwjfEH5vpvlM6cy2CIjgR2yIuB9pGZkX+X0UKSoyqi7qUbRTdHF09yzWrORZ+2e9jvGPqYy5O9tqtnJ2Z6xqbFJsY+ybuIC4qriBeIf4RfGXEnQTJAntieTE2MQ9ieNzAudsmjOc5JpUlnRjruXcorkX5unOy553PFk1WZB8OIWYEpeyP+WDIEJQLxhP5aduTR0T8oSbhU9FvqKNolGxt7hKPJLmnVaV9jjdO31D+miGT0Z1xjMJT1IreZEZkrkj801WRNberM/ZcdktOZSclJyjUg1plrQr1zC3KLdPZisrkw3keeZtyhuTh8r35CP5c/PbFWyFTNGjtFKuUA4WTC+oK3hbGFt4uEi9SFrUM99m/ur5IwuCFny9kLBQuLCz2Lh4WfHgIr9FuxYji1MXdy4xXVK6ZHhp8NJ9y2jLspb9UOJYUlXyannc8o5Sg9KlpUMrglc0lamUycturvRauWMVYZVkVe9ql9VbVn8qF5VfrHCsqK74sEa45uJXTl/VfPV5bdra3kq3yu3rSOuk626s91m/r0q9akHV0IbwDa0b8Y3lG19tSt50oXpq9Y7NtM3KzQM1YTXtW8y2rNvyoTaj9nqdf13LVv2tq7e+2Sba1r/dd3vzDoMdFTve75TsvLUreFdrvUV99W7S7oLdjxpiG7q/5n7duEd3T8Wej3ulewf2Re/ranRvbNyvv7+yCW1SNo0eSDpw5ZuAb9qb7Zp3tXBaKg7CQeXBJ9+mfHvjUOihzsPcw83fmX+39QjrSHkr0jq/dawto22gPaG97+iMo50dXh1Hvrf/fu8x42N1xzWPV56gnSg98fnkgpPjp2Snnp1OPz3Umdx590z8mWtdUV29Z0PPnj8XdO5Mt1/3yfPe549d8Lxw9CL3Ytslt0utPa49R35w/eFIr1tv62X3y+1XPK509E3rO9Hv03/6asDVc9f41y5dn3m978bsG7duJt0cuCW69fh29u0XdwruTNxdeo94r/y+2v3qB/oP6n+0/rFlwG3g+GDAYM/DWQ/vDgmHnv6U/9OH4dJHzEfVI0YjjY+dHx8bDRq98mTOk+GnsqcTz8p+Vv9563Or59/94vtLz1j82PAL+YvPv655qfNy76uprzrHI8cfvM55PfGm/K3O233vuO+638e9H5ko/ED+UPPR+mPHp9BP9z7nfP78L/eE8/sl0p8zAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAPfSURBVHjazFotjOpAEF5ZCa7niiuuuJ4rjnOH4xyYl8NcwFx65nVdz3EOXHFFXAKuCJI9V1xxlSuRlcjvmYNQSv+AljfJJISw7Pdtv52dnSkBQG7h0+lUMwwDhmGg1WpB07SD67oOwzAwmUxat5oPALlq8GQyabXb7REhhP86UpwTQnij0Zh/fX093wV8v99/zwE4kUi73R5tNptK4eAppd0bgD5LpNfr/S0E/GazqRQEOvIkZrOZejPws9lMLRh0hMTHx8efq8EfyQQlO2+326OLwQ+Hw7c7Ac9MoFSpSJKESqWSi0C/33/PDH69XotFrriu69B1PQ8JHncmRL8oWCqKogAAgiCAaZoQRTETgZ+fHykR/MvLi1mGzn3fx952ux0sy4IkSYljHh8f7VjwR7G88M04Go1wzmzbhqIomeVz+PCbo4QGdLtdUEpv7qvVCknGGIOmaRECtVqNRcAvl0v5eNUFQQg92nuZ53nodDqxq08AkF6v9/d0xf8n45xDluWI9s9GGFEUsdvt/gvgjuOc7gN+AB8X12VZLkTvlFIsFotU0K7rntU9IYR/fn52ABCi63rpRz+lNBa07/t4fn7OFDZJ2g+LcNu2I6C32y263W6m8dVq1QNAiKqqpQIXBAFBEBxAB0GAwWAAQRDy/IcPgJC0k+3W3ul0DicrpTRvohbatKRsycznc4xGo6w5TWKuQ26ZcGWRzJWgD84Yw9XgVVWF67oYj8elXlTW67V4seZFUQxFjZiYXBh4AITknVQQBFBKQycw57z0KyIAQk4Sn9RIsd1uIzHaNM1SwT88PLgACMky8V7XcTYYDC4GclzTPPakuP/09DQGQIjv+0LcJeRU13H2/f0dyl0YYxHnnOdKyIIgiItMfDqdaoesUpZlJ03X97Bzedc+NTiA13X99bg8cU7X97BzwaTZbFoh8J7nhe6vkiTBsqxSALquG5GYbdux6fBisVAid9jX11f9VPtZSaxWq5DmT5sLmqYdbkLXeKPRmMeWPuI2bhqJkk7X0KpHwBuGkVhYjSNRwiHF9+ExsWKmaZqVVr85R6LI9OBULomFVlVV7ayF0z0Jy7IKW/XlcilnBu+6bq5iqyRJKOguzJMab7G1b8uytHvX59P6VImdh/l8rtyrM0Ip7V7dk/J9X/jdA6WQaDab1mlIvLqV2Wq1xkV3A+v1upOnJ5ur7+k4jqwoyvzGJHi9Xncuae1f1AEfj8ctSZLYtR3warXqZdF2Ie8eeJ5XMQyje/Q00sjwWq3GhsPh27k2TangT50xJjHGYJom9m+AGIYBx3HAGIPv+8It5/s3ACa6Av95eMXyAAAAAElFTkSuQmCC" style="width: 20px;"/>');
            case 6:
                return $('<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAtCAYAAAA6GuKaAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAADI2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS41LWMwMTQgNzkuMTUxNDgxLCAyMDEzLzAzLzEzLTEyOjA5OjE1ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDYzOEVCRDk0OEQ4MTFFN0ExNzJEMzUwODYwN0UyOTEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDYzOEVCREE0OEQ4MTFFN0ExNzJEMzUwODYwN0UyOTEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0NjM4RUJENzQ4RDgxMUU3QTE3MkQzNTA4NjA3RTI5MSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0NjM4RUJEODQ4RDgxMUU3QTE3MkQzNTA4NjA3RTI5MSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PuuBSUoAAAVUSURBVGhDzZk7TCNHGMeHVEhJTpR0h3Q8rKMBIRCichAQp4MC4QpokJCCBAgh0cFBYTpXVBQWLqAEKqh4SIiXlFtAikhBQi6ENwKbN0qOve+/3tnMrmfXuz4b8kk/e3Z2Hv/95rmzOaqqMq92cnLC5ufn2ezsLFtaWiqNxWI/UHQF4SPeEt8Sb4hr4o74RPxG/OLz+RYDgcCvLS0trLq6mqIYg4acnBwt7MqQwQ3Pz8/s6uqK9fT0sAIyyjpM/IEi0gD5hsvKygrm5uak9TkhjQQQycMPDw8sHA5DbCFVFiX+0Sv/WlBOlDxfqCiKqX4npJEi+/v7jDySS4XDs096ZSmh5pbG2/BIDI+OjubKNFiRRnIWFxchuIgKVIQKsokSDAaL0LIyPRxpJEB3IPuJwGCyFp5N4n6/P3B8fCzVBaSRoVCI8rJmwnV3yDBPNLM0Y+DL9CVFYDST1SKjXsBr8UQDtNaqD5hmid3dXcydxZQhZingtYjRFFssCgZGAJ2/vLwcs8RLDTq3KJFIxDSrGIHBwUG6z0aExP8baAYbFgem9nN0dISFA1Mb5kstIeZZj3OtLXblHBwcuK3jkbpJoUk0lmayKSFRxrATdXh4qF5fX0vv2eSZ5N5mCJCX31HkZ0uijCATQC2r3t7eSkU7eP5zb2/vO020PiePCjfdNllakJPUu7s7TfTNzY00jYioJT8/f/TxkXowrT7YE2LraErshFjQ0NCQ6Z4Mnp62tOr9/b0h2q57OPAJWwtG6kslN1NSX1+v7u3tua4Ygmla9Sza2uqdnZ3Qy7rESI5TF5mZmTGa103FEEzNahIN0vA0ukjXNxTAG4dhJFb71zq8xfr7+9nl5SUjL+sxqe309JTl5eXpV/+ZrHw3Rg6ogOiSxGXCZIVVVVWx7e1tNjIywnJzsWi6s7OzM6ngr7QSiMY7XZJxj4+Pj7Pl5WVWUmJ6tpR2fn6uCeblyMzpnsz09G8h+nuErNba2qpVjH+xy7ip6OLiwvAwbzlZC2Kz5sX0Mr6Tim5ra2NjY2Mp+6L1AXC9sLAgzSd7WDcOkNgbiMabickmJiZYTU2N1i24yTxljcN1bW2t1v8zbcIDXkP0TSJstp2dHVZXV8c6Ojq0GcCLVyoqKtjW1pZ+lTDZQ3sxIf8tRP+VCMstGo2yhoYGbUB6scrKSpPHxYfmAtLsHli9WYRAKVKoYCNMU5+6trZmrGhuFpfNzU1tYREXF543Ho9L86QAeuUrohN9fX3a1tLtirixsZH2iig6Dfh8vp8x0l3tPayZi4uL1ampqaSKrek4EM5Fc2+ns4zTG1YpCwaDFPa2yxOhwSqNlwHh3NNuW8nCn3j5ZuQtCpv309lkfX3dU/cAvPWoa4S0QUxNltU3FxkYzGl0j3/D4XDizQU/+hHYpJAg66yurnr19CQcbIjGBb2m4xjXeBvPJHaDc2VlJemeTdrHSCRifhsH09PTdE87zrVmeDHsHo4c+oHrNIkGNJNgs/zRmumV+agoivyECaCbZPMsz86TDsSoBxSJGoHpAvtbnPyTZeXU1Em05N5TKBSSn5paIyAc3z/ItPPpNLxjC8pyWd5Te3t7s1UbRxoJ9K1lgIjrBb0UcVqqf5Rp4kgjOTiJ9/v9ReQdJZMed0ChFTqpD1uRRloZGBjgX7c8zeMeHhTlfrDOEnYkRYhfBkSwUWlqasrKd0RakY2Fww1JEXaiOThLCwQC/Ivt73rlKbF4HfmGqe8WiB+DUtXNkUY6wQvGETEtrayxsfE9CcCLRISErdH/3wSf5/GPa8RHaJfW1d3d/Z42TEnlukdlXwAR0zYFK7vJ6AAAAABJRU5ErkJggg==" style="width: 35px;"/>');
            case 7:
                return $('<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAtCAYAAAA6GuKaAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjgwRDc2NzFBNDhENzExRTdBMTcyRDM1MDg2MDdFMjkxIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjgwRDc2NzFCNDhENzExRTdBMTcyRDM1MDg2MDdFMjkxIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ODBENzY3MTg0OEQ3MTFFN0ExNzJEMzUwODYwN0UyOTEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6ODBENzY3MTk0OEQ3MTFFN0ExNzJEMzUwODYwN0UyOTEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6Mh756AAAEoklEQVR42sxZO0zbYBA+og6eKkZYSiTygHYgUosAsUQIRBhALIhkADHwiAQDCwtLSIoEW0bEVOhQJBYkFh5LBAgFhiYLBSrUolYVj4mQ8Ahqi3tn2fTHdYj9x4b+0sV2bJ+///P953uAKIrwkNze3mr+f3Z2BnNzc9DZ2fmyqKhoCADeocRx/wduUyiivKXjOJ232+1DwWDw5cLCAuR77kNi+Ia9vT0IBAJ2BBFB+SKDMyp0XwQnYD8+PuYHnYtRRUg5PsSBD3uP8pMTrFpIz/tQKOS4urrKiYU9pn1dgKempgRUHkbJmgRWLaQ3EovFhILN4/r6mth1osKkRWDVkoxGo05u0GQOXq+3GRWdPxJgRc79fr+PCMvlGDRPHB4e4r3QgXJjNij0Lnquu2lvb+/IBVzTJHA0WAHYoNwg4w1aa+4f0Hihk/GzTy2piYkJ14Og8QLyEgmrweg0EUUSS0tL97yKRD1JMkkOAsIGFUrS2Nho6STxSxph7ftuBw3fweuH0+m0OD09LbpcLquAZ4eHhx33QCP9xPIHXqWZTEaSg4MDsampySrgH5RPvvTj8XjK0Sx+8SokphXgl5eX4szMjKmsyyb7G51EuQQ6HqcADCYKUaqApu3FxYWIcYR4dHQkdnV1mc32JEWXtuXlZQIdABMGMiJtiY3i4mJAO4fFxUWoqKgAk0ZgZWUFSOGrQhlgzYOYJhMhIcZx1YsnJydiX1+fKWz39PQQXhjk8J2GQGezWWm7trYmVlVVFQS6pKRkyIY7b5RXyr5iswfprampgfX1dRgZGeE2PXxrrwm0mz2pgLdqCIIA4+PjsLGxAW63W/d9DC43gS5Tz8ZKtpWH19bWws7OjjQBg+NFkRwvPy8EDNr0vQmr91kStM7v7+9Db28vbG1t6XqcrVDAPENtgpWVlbC5uQnoGfS8recEOg1PPNC7wOjoKOCXVM+EM89we/HYbLPmsr29DfX19UbWUYaY/vYU5pFKpWBwcFACbNBrfSOmP6PUWQVOWWwsqNXVVWhtbeVV+5mY/milGbCAid3+/v68gNXehh34Rfxow5+YVX6Zfe3z8/NQWloKs7OzhryL2mwwDIjZWlpaPuGJ71aBPj09hba2Nuju7s5rtzrI+44Z1i5QBZPiVCuiPErBzI6npZoMJYyYOJZTZmAW6N3dXVPSLiXyVDIXDLjK79KtaDRaUI7Igg6Hw7ylgnwyF4vF/uaIxDZGXFI2zvMgAp1IJMTq6mrLsnG0Zec/JQTZtiM8SsfGxgyxykHMW6rLaFaYmpubhUcs6+ou/4ZCISFnWYwyXYxzXf9TLc/n87nyVk2pp6KnamryItOsmiKBDUSkrqK6XHHSXZ/ONwGOCRLgDiLQUCdAXpi+fJ0AlS81Q9Iej6eFXXiGei4007q6OlN7LlqTY/5Ler1ep5ZJGOojkgJUJMju0KruFplhZGBgQDC1+UndWfzcc/UR1ewyx1IfEc3BoXzt9LQIDXVKqUE5OTkJZWVlSsf2KyezdF8Ew2I7kWFam/mh2Sp9cb/fT4VGqq3d9cZRjpjFey4fx+XzQwj0VTAYhEL6438EGAAFV2yYgEXdLAAAAABJRU5ErkJggg==" style="width: 35px;"/>');
            case 8:
                return $('<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAtCAYAAAA6GuKaAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjQ2MzhFQkRENDhEODExRTdBMTcyRDM1MDg2MDdFMjkxIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjQ2MzhFQkRFNDhEODExRTdBMTcyRDM1MDg2MDdFMjkxIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDYzOEVCREI0OEQ4MTFFN0ExNzJEMzUwODYwN0UyOTEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NDYzOEVCREM0OEQ4MTFFN0ExNzJEMzUwODYwN0UyOTEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4fAltyAAADtElEQVR42tRZP0waURi/O0i8pI1l1KEWIyqpHTR2YANZoJMuBkaHNnFkdDPSxUlH4+rgERdlcypuToImbVOHKrSJuknVKqYg/X30nuW/9+5O7nzJL1yA977f++773vv+iOVyWdA7stmssLW19TqZTAZ3dnbG8ZUXeCmK4nOs+wLPv4Ar4CfwDdgbHR39FIlEvobDYQHP+gQTaV5sbm66vV5vHNO/0xJagc2wZ5oXd2MsLy9zy+f68+7ursfn861B4J8mRPSA1lkDdw8UoYnD3d2dNtI3NzdyNBpdgIBCNUmDhKtRIM37/X759PTUmKZpV8fHx4NYMGMSuYdAcgbxRu/lc5OGc4VUZyp3ECQvvLKywq9pRVGmMfnWKAmdJkRyp+fn57WTzmQyQZrIBJpou1zEITcI5TWYSgNhOALZcN4Cks1APIagxNaavr6+lnHop21CmIH41JwqNaSXlpYWbEaYIT41NdVIGjvxqOelHUkTLw8zk3vSsVhs3UTvfwys4zb+TzqdTg/gy6JNtcxQAgboupcoaNrY2HiPD4fWIEt3dGZsENcPq6ur/zSNiC3Lu/NSqWQKOOXmXC6XICK2GOnv7/8M2xV4YutisWhYdSTT4XDwznkjJRKJgGDR0JOAYM6E8+Dg4K2eBYxkPAbHuPPs7Gy4U1oyaQw7kee9emKk+0Q1fu1mjqGVTKFQMMURu7q6eKddSIzwU3FE4usk5ow4LaJV2xaax6WETPhKDxk9pYeamFj/xi+lnp6eXKfqJfVJczvS9MZbjByRPrSCdLXGOc3vUELcsWdHTbcZe1IoFEpZ4U30+tuYQLuREmm3vb29OdyMfVyH5cWFKeS7u7lO3B+Au/KKZmZmFq0I7OtLFPT5QKa0WInlifT29vaAmhmYXXQxPXOhKuu9YwQCgXWbp1sK7hQqhgrVVSW7Z+ODVN9rKPVGIpH4I9bnjODj2NhY82LNycmJDEPP2EzLxEdOpVLNSZPq8eOQ3Wp59WXfprcV/hQ0o8xrtGoKBGdnZ7XXp/HnaQuJV+rTVL+j04KrExCLxcJGOgE6HZau2neMMJlsfRvjwcBGUZSO91xadQC4WnI4w2W1b1h4pOPuVu0ryqzyb0of8fz8XJibm/Ng4Zo+okGTqPQRMccTjUYFLe047uanWscWIMBNmgGOdJI+Uue7ET4I9e2JVrE3g6g3QVX74kIymRzZ39+fyOfzrDdOdZRnarJMTvWbUiTWG8ebSrlcri+Tk5MCORtvBZb4/hVgAIOSul6DsD0aAAAAAElFTkSuQmCC" style="width: 35px;"/>');
            case 9:
                return $('<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAtCAYAAAA6GuKaAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAADI2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS41LWMwMTQgNzkuMTUxNDgxLCAyMDEzLzAzLzEzLTEyOjA5OjE1ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDYzOEVCRDk0OEQ4MTFFN0ExNzJEMzUwODYwN0UyOTEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDYzOEVCREE0OEQ4MTFFN0ExNzJEMzUwODYwN0UyOTEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0NjM4RUJENzQ4RDgxMUU3QTE3MkQzNTA4NjA3RTI5MSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0NjM4RUJEODQ4RDgxMUU3QTE3MkQzNTA4NjA3RTI5MSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PuuBSUoAAAV0SURBVGhDzZk7SCRZFIavRsLuDo34yrZhfDGCDxbEzF5RtjdSA6EjNREEB1RMTETXDbrBwMDQoNFgxMhQQVEE0VZx2mRRwV238dFmvrV1d6bm/Ncqrcfp6mrXmtkDX3fVua+/Tp26VXVLKIryYtbW1kR3d/e70tLS90KIMLFGHBHnhKL+H2VkZMCP8vdNTU3vwuGwiMfjso/Pnz9b+k0F6zSj7/js7EwMDg56ScAw8ScBcQoJk/8OQbthv9/vXVpaMoxlhjsoi8OO0dHRQhpskvhHHfy/gn4mm5ubC3d2dtgxXyw6Go1mUee/EQl1MFvSjDpAv8P9/f1Z3PhmWKeeqampIuowqhvAFXCgRNTn8xUhBTktGqxTg3L3F+rwwjyAy2A8//b2NqsJsE7Q3t7eQo3vdZ2xqBFiy16C2hfGbaG0dJ7TwWCwTm1o7ozlNUXrwPh1BwcHFuGGHTAzM4Mc1uZZR7gkGpzX1NQU393dGTQadtRZ4qOp4bfmYyAQMMwqBtGVlZWY1syN3IykU4YpA6yi6daKG4dlHjYLxv7KyorBpy/j/K9AggJaqKWJ/MEO2Qeng15eXiqrq6tsmYt8oDvys2jaeUvOf02VkgLR19fXCj0wseUu8cnr9b6VAYZoekoLoiCdSN/c3EgikQhbxyVCdIcWAg8qZH/rClIC0VdXV1L07e2tsr6+ztbjqK+vZ/0OidFMInCrLmMKbdHSA4IBnbKkws1nD20pWkpxcbHB7/QsezyeMqRGl97ppLE+PTTRiUTCUcS1s3R8fKz09fWxdVKAFw75RsEVJuXi4kIOrEVbEw02NjbYNhqaaLTFQeNirq6ufip3ELRwJv2UEGlZZmamoM7VPaNVVFSIzc1NdS+1of7y8rIYGxsTJSUlj1OavUm9x4T5aGzRclqfHlq07+/vlYeHB4WEJ22rj7T+TMViMaW1tZVtp+MIkf6eSBo5p2ZuT3cwsbW1pe6lNkQ4Pz9fjI+Pi4WFBVFeXq6WWOwHiH6DLQenJW3DqV9cXLQcEBcgva+2tlbQHVe0tbWpHoO9gejLx23nxh0g5zs/Pxd1dXWWMv0+dwBo19XVJSYmJlSPwa4g+ppraGe4EM2m9aH9Y+CcnBy5bWc4AK0NticnJ0Vubq78T2JSdIyLkp3Z1UcZBGPgdGxvb0+mRUdHh9y3GSMG0XuP269jEJyXl6fupTaaNcTAwIDMf5rjVe+zMVmwl1lQUOD8EtcZl1IQjBnAqc3Pz4vs7GwxMjKiep5NnzIm2xKdnZ2GZw+q/LSdDG6ePj09ZeuaQdv9/X2loaGBLU8FBblMYC2NLKYvSIVZtCbYyQEPDQ09bTupbyLm8/kyZE6R+pBW4KQj/R0tHo+zdV4DRksoGKRHf+RMb28v3lw+mSpIuIPQIn1ycmIpe0H0nCLfXLBELEXLDXoH01WQJBMA0Xi05MpcFD3V09PzeGHiB5CDfRs3A1GHh4dJyzh/uqAfU18JinIRnVmjaESbHnKwUK6v/H/hd3rDetL6tAHC4TBWmFxf1k2TaFVVVRZNq7xoQGlSTBXTWstzEbmWp/9KgMVIg2ANv99vWTX9BshV09nZWYs+iwNgJZ6O0NH6tEtg3BbMyZw+1glwYdLdx0+Nv/aXADzf/6otgXGwTg0kfyAQ+CrfXFSiNIMVpfpMxzrNhEIhzCqYDh193QJpztlIh2ESnIWVf06DHtbJge8fdIG68h2RbhyFSAf9tMZ9a9FgnXbgaqaIaF9s/1IHTxe0GyaxXtyaceHbiTSTgR+nJhuoD+eRSERMT0+Lubm5st3d3Z/J9RNRSvxIfEfgLR8X1Q2BR99dYsvj8SzRBf5HY2MjzhyeMMmdjgnxBXICSJ/VttInAAAAAElFTkSuQmCC" style="width: 35px;"/>');
            case 10:
                return $('<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAF0AAAATCAIAAAB9QZaIAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFuSURBVFhH7dfPasJAEAbwebSCF70kF8lB8giV6kGQkEQQLKQQSQzRmJqm/x60HzrYJW687c7F3334dgY3O9Lvgw793FXX9Zthh8OBwxRSuVe9c2maxvf9Jys8zyuKQja3g757WDvcheu6bdsK5nbQl85ut+M6i9brtVQut62gT53VasVFFs1mM6lcbluhn8t2u+Uii8IwlMrlthWE23XrdDrh4nGdFYPBYL/fS+Vy2wr66JEkyWg04mrDcLgoimRzO3rnAlVVLRaLF8MQUZYlR55J5aruzQVQ+WoY3iAOU0jlXhH2KC2sg5PJhH9who3HY3xxZXM7CJ86LWuHu3Ac53g8CuZ20LtOmqZcZ1Ecx1K53LZCPxc86Vxk0XQ6lcrlthWEf6638FhykUXL5VIql9tWEG7XLaw6uHhcZwVWiTzPpXK5bQVhWdDabDbD4ZCrDcPhgiCQze3onQvghZ/P58+GISLLMo48k8r9V1V/JQTUcER8rgkAAAAASUVORK5CYII=" style="width:75px;"/>');
            default:
                return null
        }
    },
    __isNaN: function(e) {
        return null == e || null == e || 0 != (e = e.toString().replace(/\s+/g, "")).length && isNaN(e)
    },
    __isPx: function(e) {
        return !!(e = e.toString()).match(/^[1-9][0-9]*px/)
    },
    __getLang: function(e) {
        if ("chs" != e && "en" != e) throw "XMlayout info: param 'lang' is invalid in $.xmlayout function __getLang()!";
        return "chs" == e ? {
            zi: "放大",
            zo: "缩小",
            fs: "全屏",
            rs: "还原",
            pp: "弹出",
            bt: "嵌入",
            ff: "全屏",
            cp: "换位"
        } : "en" == e ? {
            zi: "zoom-in",
            zo: "zoom-out",
            fs: "fullpanel",
            rs: "resize",
            pp: "popped",
            bt: "berth",
            ff: "fullscreen",
            cp: "transfer"
        } : null
    },
    div_resize: function(u) {
        null == u.prop("drag_resize") ? (u.prop("drag_resize", !0), null == u.prop("ismr01") && u.prop({
            ismr01: !1
        }), u.mousemove(function(e) {
            if (u.prop("drag_resize")) {
                var l = (e = e || window.event).clientX + $(window).scrollLeft(),
                    t = e.clientY + $(window).scrollTop(),
                    n = u.offset().left,
                    a = u.offset().top,
                    i = u.height(),
                    o = u.width(),
                    p = n + o - 20,
                    r = n + o + 20,
                    s = a + i - 20,
                    d = a + i + 20;
                p < l && l < r && s < t && t < d && !u.prop("ismr02") ? ($(this).css("cursor", "nw-resize"), u.prop({
                    ismr01: !0,
                    r_type: 1
                })) : p < l && l < r && a + 50 < t && !u.prop("ismr02") ? ($(this).css("cursor", "e-resize"), u.prop({
                    ismr01: !0,
                    r_type: 2
                })) : s < t && t < d && !u.prop("ismr02") ? ($(this).css("cursor", "s-resize"), u.prop({
                    ismr01: !0,
                    r_type: 3
                })) : ($(this).css("cursor", "default"), u.prop("ismr01", !1))
            }
        }), u.mousedown(function(e) {
            if (u.prop("ismr01")) {
                u.prop({
                    ismr02: !0
                });
                var i = e.clientX + $(window).scrollLeft(),
                    o = e.clientY + $(window).scrollTop(),
                    p = u.height(),
                    r = u.width();
                $(document).mousemove(function(e) {
                    var l = (e = e || window.event).clientX + $(window).scrollLeft(),
                        t = e.clientY + $(window).scrollTop();
                    if (1 == u.prop("r_type")) {
                        var n = p + (t - o);
                        if ((a = r + (l - i)) < 80 || n < 80) return;
                        u.width(a), u.height(n)
                    } else if (2 == u.prop("r_type")) {
                        var a;
                        if ((a = r + (l - i)) < 80) return;
                        u.width(a)
                    } else if (3 == u.prop("r_type")) {
                        if ((n = p + (t - o)) < 80) return;
                        u.height(n)
                    }
                }), $(document).mouseup(function() {
                    u.prop({
                        ismr01: !1,
                        ismr02: !1
                    }), u.trigger("resize"), $(this).unbind("mousemove"), $(this).unbind("mouseup")
                })
            }
        })) : u.prop("drag_resize", !0)
    },
    div_drag: function(i, o) {
        null == i.prop("drag_event") ? (i.prop("drag_event", !0), null == i.prop("ismr01") && i.prop({
            ismr01: !1
        }), i.css({
            position: "position",
            MozUserSelect: "none",
            KhtmlUserSelect: "none",
            userSelect: "none"
        }), i.mousedown(function(e) {
            if (i.prop("drag_event") && !i.prop("ismr01")) {
                $(this).offset();
                var n = e.pageX,
                    a = e.pageY;
                i.trigger("dragstart", [e]), $(document).mousemove(function(e) {
                    i.stop();
                    var l = e.pageX - n + parseInt(i.css("left")),
                        t = e.pageY - a + parseInt(i.css("top"));
                    n = e.pageX, a = e.pageY, "axis-x" == o ? i.animate({
                        left: l + "px"
                    }, 0) : "axis-y" == o ? i.animate({
                        top: t + "px"
                    }, 0) : i.animate({
                        left: l + "px",
                        top: t + "px"
                    }, 0), i.trigger("drag", [e])
                }), $(document).mouseup(function(e) {
                    i.prop("ismr01") || (i.trigger("dragstop", [e]), $(this).unbind("mousemove"), $(this).unbind("mouseup"))
                })
            }
        })) : i.prop("drag_event", !0)
    },
    div_undrag: function(e) {
        e.prop("drag_event", !1)
    },
    div_unresize: function(e) {
        e.prop("drag_resize", !1)
    },
    init: function() {
        var e = this;
        if ($(document).unbind("contextmenu"), $(document).bind("contextmenu", function(e) {
                return window.event.returnValue = !1
            }), $(".xmlayout-in").css("display", "none"), !(0 < $(".xmlayout_anim").length)) {
            var l = $(document.body);
            e.__play(), e.playbottom = e.__bottom(), e.playheader = e.__header(), l.append(e.playheader), l.append(e.playbottom), l.prop("playbottom", e.playbottom), l.prop("playheader", e.playheader), e.playbottom.css("display", "none")
        }
    }
}, $(document).ready(function() {
    $.xmlayout.init()
});