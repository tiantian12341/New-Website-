(function ($, sp) {
    "use strict";
    var httpCode = {
        success: 200,
        fail: 400,
        exception: 500
    };
    var exres = { code: httpCode.exception, info: '通信异常，请联系管理员！' };
    $.extend(sp, {
        // http 通信异常的时候调用此方法
        httpErrorLog: function (msg) {
            sp.log(msg);
        },
        // http请求返回数据码
        httpCode: httpCode,
        // get请求方法（异步）:url地址,callback回调函数
        httpAsyncGet: function (url, callback) {
            $.ajax({
                url: url,
                type: "GET",
                dataType: "json",
                async: true,
                cache: false,
                success: function (data) {
                    if (data.code == sp.httpCode.exception) {
                        sp.httpErrorLog(data.info);
                        data.info = '系统异常，请联系管理员！';
                    }
                    callback(data);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    sp.httpErrorLog(textStatus);
                    callback(exres);
                },
                beforeSend: function () {
                },
                complete: function () {
                }
            });
        },
        // get请求方法（同步）:url地址,param参数
        httpGet: function (url, param) {
            var res = {};
            $.ajax({
                url: url,
                data: param,
                type: "GET",
                dataType: "json",
                async: false,
                cache: false,
                success: function (data) {
                    if (data.code == sp.httpCode.exception) {
                        sp.httpErrorLog(data.info);
                        data.info = '系统异常，请联系管理员！';
                    }
                    res = data;
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    sp.httpErrorLog(textStatus);
                },
                beforeSend: function () {
                },
                complete: function () {
                }
            });
            return res;
        },
        // post请求方法（异步）:url地址,param参数,callback回调函数
        httpAsyncPost: function (url, param, callback) {
            $.ajax({
                url: url,
                data: param,
                type: "POST",
                dataType: "json",
                async: true,
                cache: false,
                success: function (data) {
                    if (data.code == sp.httpCode.exception) {
                        sp.httpErrorLog(data.info);
                        data.info = '系统异常，请联系管理员！';
                    }
                    callback(data);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    sp.httpErrorLog(textStatus);
                    callback(exres);
                },
                beforeSend: function () {
                },
                complete: function () {
                }
            });
        },
        // post请求方法（同步）:url地址,param参数,callback回调函数
        httpPost: function (url, param, callback) {
            $.ajax({
                url: url,
                data: param,
                type: "POST",
                dataType: "json",
                async: false,
                cache: false,
                success: function (data) {
                    if (data.code == sp.httpCode.exception) {
                        sp.httpErrorLog(data.info);
                        data.info = '系统异常，请联系管理员！';
                    }
                    callback(data);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    sp.httpErrorLog(textStatus);
                    callback(exres);
                },
                beforeSend: function () {
                },
                complete: function () {
                }
            });
        },
        // ajax 异步封装
        httpAsync: function (type, url, param, callback) {
            $.ajax({
                url: url,
                data: param,
                type: type,
                dataType: "json",
                async: true,
                cache: false,
                context: param,
                success: function (res) {
                    if (res.code == sp.httpCode.success) {
                        callback.apply(this, [res.data, res]);
                    }
                    else {
                        sp.httpErrorLog(res.info);
                        callback.apply(this);
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    sp.httpErrorLog(textStatus);
                    callback(null);
                },
                beforeSend: function () {
                },
                complete: function () {
                }
            });
        },

        deleteForm: function (url, param, callback) {
            sp.loading(true, '正在删除数据');
            sp.httpAsyncPost(url, param, function (res) {
                sp.loading(false);
                if (res.code == sp.httpCode.success) {
                    if (!!callback) {
                        callback(res);
                    }
                    sp.alert.success(res.info);
                }
                else {
                    sp.alert.error(res.info);
                    sp.httpErrorLog(res.info);
                }
                layer.close(layer.index);
            });
        },
        submitRequest: function (title,url, param, callback,showDialog,isCloseLayer) {
            sp.loading(true, title);
            sp.httpAsyncPost(url, param, function (res) {
                sp.loading(false);
                if (res.code == sp.httpCode.success) {
                    if (!!callback) {
                        callback(res);
                    }
                    if (showDialog) {
                        sp.alert.success(res.info);
                    } 
                }
                else {
                    sp.alert.error(res.info);
                    sp.httpErrorLog(res.info);
                }
                if (!!!isCloseLayer) {
                    layer.close(layer.index);
                }
            });
        },
        postForm: function (url, param, callback) {
            sp.loading(true, '正在提交数据');
            sp.httpAsyncPost(url, param, function (res) {
                sp.loading(false);
                if (res.code == sp.httpCode.success) {
                    if (!!callback) {
                        callback(res);
                    }
                    sp.alert.success(res.info);
                }
                else {
                    sp.alert.error(res.info);
                    sp.httpErrorLog(res.info);
                }
                layer.close(layer.index);
            });
        }
    });

})(window.jQuery, top.sp);
