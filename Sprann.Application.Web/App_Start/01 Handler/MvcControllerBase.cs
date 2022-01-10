using Sprann.Loger;
using Sprann.Util;
using Sprann.Util.Operat;
using System.Web.Mvc;

namespace Sprann.Application.Web
{
    /// <summary>
    /// 版 本 Sprann ADMS V1.0.0 敏捷开发框架
    /// Copyright (c) 2017-2018 思普瑞云(深圳)科技有限公司
    /// 创建人：超级管理员
    /// 日 期：2017.03.08
    /// 描 述：基础控制器
    /// </summary>
    [HandlerLogin(FilterMode.Enforce)]
    public abstract class MvcControllerBase : Controller
    {
        #region 日志操作
        /// <summary>
        /// 日志对象实体
        /// </summary>
        private Log _logger;
        /// <summary>
        /// 日志操作
        /// </summary>
        public Log Logger
        {
            get { return _logger ?? (_logger = LogFactory.GetLogger(this.GetType().ToString())); }
        }
        #endregion

        #region 请求响应
        /// <summary>
        /// 返回成功消息
        /// </summary>
        /// <param name="data">数据</param>
        /// <returns></returns>
        protected virtual ActionResult ToJsonResult(object data)
        {
            return Content(data.ToJson());
        }
        /// <summary>
        /// 返回成功消息
        /// </summary>
        /// <param name="info">消息</param>
        /// <returns></returns>
        protected virtual ActionResult Success(string info)
        {
            return Content(new ResParameter { code = ResponseCode.success, info = info, data = new object { } }.ToJson());
        }
        /// <summary>
        /// 返回成功消息
        /// </summary>
        /// <param name="data">数据</param>
        /// <returns></returns>
        protected virtual ActionResult SuccessString(string data)
        {
            return Content(new ResParameter { code = ResponseCode.success, info = "响应成功", data = data }.ToJson());
        }
        /// <summary>
        /// 返回成功数据
        /// </summary>
        /// <param name="data">数据</param>
        /// <returns></returns>
        protected virtual ActionResult Success(object data)
        {
            return Content(new ResParameter { code = ResponseCode.success, info = "响应成功", data = data }.ToJson());
        }

        protected virtual ActionResult SuccessExt(object data, object ext)
        {
            return Content(new { code = ResponseCode.success, info = "响应成功", data = data, ext = ext }.ToJson());
        }

        /// <summary>
        /// 返回成功消息
        /// </summary>
        /// <param name="info">消息</param>
        /// <param name="data">数据</param>
        /// <returns></returns>
        protected virtual ActionResult Success(string info, object data)
        {
            return Content(new ResParameter { code = ResponseCode.success, info = info, data = data }.ToJson());
        }

        /// <summary>
        /// 带操作日志
        /// </summary>
        /// <param name="info"></param>
        /// <returns></returns>
        protected virtual ActionResult Success(string info, string title, OperationType type, string keyValue, string content)
        {
            OperateLogModel operateLogModel = new OperateLogModel();
            operateLogModel.title = title;
            operateLogModel.type = type;
            operateLogModel.url = (string)WebHelper.GetHttpItems("currentUrl");
            operateLogModel.sourceObjectId = keyValue;
            operateLogModel.sourceContentJson = content;
            OperatorHelper.Instance.WriteOperateLog(operateLogModel);
            return Content(new ResParameter { code = ResponseCode.success, info = info, data = new object { } }.ToJson());
        }

        /// <summary>
        /// 返回失败消息
        /// </summary>
        /// <param name="info">消息</param>
        /// <returns></returns>
        protected virtual ActionResult Fail(string info)
        {
            return Content(new ResParameter { code = ResponseCode.fail, info = info }.ToJson());
        }
        /// <summary>
        /// 返回失败消息
        /// </summary>
        /// <param name="info">消息</param>
        /// <param name="data">消息</param>
        /// <returns></returns>
        protected virtual ActionResult Fail(string info, object data)
        {
            return Content(new ResParameter { code = ResponseCode.fail, info = info, data = data }.ToJson());
        }
        #endregion
    }
}
