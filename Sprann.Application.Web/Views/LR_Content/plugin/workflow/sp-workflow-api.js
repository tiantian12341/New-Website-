(function ($, sp) {
    "use strict";

    var api = {
        bootstraper: top.$.rootUrl + '/LR_WorkFlowModule/WfEngine/Bootstraper',
        taskinfo: top.$.rootUrl + '/LR_WorkFlowModule/WfEngine/Taskinfo',
        processinfo: top.$.rootUrl + '/LR_WorkFlowModule/WfEngine/Processinfo',
        processinfoByMonitor: top.$.rootUrl + '/LR_WorkFlowModule/WfEngine/ProcessinfoByMonitor',
        auditer: top.$.rootUrl + '/LR_WorkFlowModule/WfEngine/Auditer',

        create: top.$.rootUrl + '/LR_WorkFlowModule/WfEngine/Create',
        audit: top.$.rootUrl + '/LR_WorkFlowModule/WfEngine/Audit',
    };

    var httpGet = function (url, param, callback, loadmsg) {
        sp.loading(true, loadmsg || '正在获取数据');
        sp.httpAsync('GET', url, param, function (res) {
            sp.loading(false);
            callback(res);
        });
    };
    var httpPost = function (url, param, callback, loadmsg) {
        sp.loading(true, loadmsg || '正在获取数据');
        sp.httpAsync('Post', url, param, function (data) {
            sp.loading(false);
            callback(data);
        });
    };

    // 读取登录秘钥信息
    function getLoginInfo() {
        var req = {
            token: top.$.cookie('sp_ADMS_V7_Token'),
            loginMark: top.$.cookie('sp_ADMS_V7_Mark'),
        };

        return req;
    }

    sp.workflowapi = {
        // 流程初始化用于发起:
        // isNew是否是新发起的流程,processId:发起的流程实例主键,schemeCode:发起的流程模板编码
        // callback:回调函数 res：true/false,data:返回的节点数据
        bootstraper: function (op) {
            var dfop = {
                isNew: true,
                processId: '',
                schemeCode: '',
            };
            $.extend(dfop, op);
            //var req = getLoginInfo();
            var req = {
                isNew: dfop.isNew,
                processId: dfop.processId,
                schemeCode: dfop.schemeCode
            };
            httpGet(api.bootstraper, req, function (res) {
                if (res != null) {
                    if (res.status == 1) {
                        op.callback(true, res.data);
                    }
                    else {
                        sp.alert.error(res.desc);
                        op.callback(false);
                    }
                }
                else {
                    sp.alert.error('获取流程信息失败!');
                    op.callback(false);
                }
            }, '正在获取流程信息...');
        },
        // 流程实例发起:
        // isNew是否是新发起的流程,processId:发起的流程实例主键,schemeCode:发起的流程模板编码
        // callback:回调函数 res：true/false,data:返回的节点数据
        create: function (op) {
            var dfop = {
                isNew: true,
                processId: '',
                schemeCode: '',
                auditers: '{}'
            };
            $.extend(dfop, op);
            var req = {
                isNew: dfop.isNew,
                processId: dfop.processId,
                schemeCode: dfop.schemeCode,
                processName: dfop.processName,
                processLevel: dfop.processLevel,
                description: dfop.description,
                auditers: dfop.auditers,
                formData: op.formData
            };

            httpPost(api.create, req, function (res) {
                if (res != null) {
                    if (res.status == 1) {
                        op.callback(true);
                    }
                    else {
                        sp.alert.error(res.desc);
                        op.callback(false);
                    }
                }
                else {
                    sp.alert.error('创建流程失败!');
                    op.callback(false);
                }
            }, '正在创建流程实例...');
        },

        taskinfo: function (op) {
            var dfop = {
                processId: '',
                taskId: '',
            };
            $.extend(dfop, op);
            var req = {
                processId: dfop.processId,
                taskId: dfop.taskId
            };

            httpGet(api.taskinfo, req, function (res) {
                if (res != null) {
                    if (res.status == 1) {
                        op.callback(true, res.data);
                    }
                    else {
                        sp.alert.error(res.desc);
                        op.callback(false);
                    }
                }
                else {
                    sp.alert.error('获取流程信息失败!');
                    op.callback(false);
                }
            }, '正在获取流程信息...');
        },
        audit: function (op) {
            var dfop = {
                verifyType: '',
                taskId: '',
                auditers: '{}'
            };
            $.extend(dfop, op);
            var req = {
                taskId: dfop.taskId,
                verifyType: dfop.verifyType,
                description: dfop.description,
                auditorId: dfop.auditorId,
                auditorName: dfop.auditorName,
                auditers: dfop.auditers,
                formData: op.formData
            };
            httpPost(api.audit, req, function (res) {
                if (res != null) {
                    if (res.status == 1) {
                        op.callback(true);
                    }
                    else {
                        sp.alert.error(res.desc);
                        op.callback(false);
                    }
                }
                else {
                    sp.alert.error('流程审核失败!');
                    op.callback(false);
                }
            }, '正在审核流程实例...');
        },

        processinfo: function (op) {
            var dfop = {
                processId: '',
                taskId: '',
            };
            $.extend(dfop, op);
            var req = {
                processId: dfop.processId,
                taskId: dfop.taskId
            };

            httpGet(api.processinfo, req, function (res) {
                if (res != null) {
                    if (res.status == 1) {
                        op.callback(true, res.data);
                    }
                    else {
                        sp.alert.error(res.desc);
                        op.callback(false);
                    }
                }
                else {
                    sp.alert.error('获取流程信息失败!');
                    op.callback(false);
                }
            }, '正在获取流程信息...');
        },
        processinfoByMonitor: function (op) {
            var dfop = {
                processId: '',
                taskId: '',
            };
            $.extend(dfop, op);
            var req = {
                processId: dfop.processId,
                taskId: dfop.taskId
            };

            httpGet(api.processinfoByMonitor, req, function (res) {
                if (res != null) {
                    if (res.status == 1) {
                        op.callback(true, res.data);
                    }
                    else {
                        sp.alert.error(res.desc);
                        op.callback(false);
                    }
                }
                else {
                    sp.alert.error('获取流程信息失败!');
                    op.callback(false);
                }
            }, '正在获取流程信息...');
        },

        auditer: function (op) {// 获取下一个节点审核人员
            var dfop = {
                isNew: false,
                taskId: '',
                processId: '',
                schemeCode: '',
                formData: '{}'
            };
            $.extend(dfop, op);

            var req = {
                isNew: dfop.isNew,
                processId: dfop.processId,
                schemeCode: dfop.schemeCode,
                taskId: dfop.taskId,
                formData: dfop.formData
            };
            httpPost(api.auditer, req, function (res) {
                if (res != null) {
                    op.callback(res);
                }
                else {
                    //sp.alert.error('获取下一个节点审核人员失败!');
                    op.callback([]);
                }
            }, '获取下个节点审核人员...');
        }

    };

})(jQuery, top.sp);
