using Sprann.Util;
using System.Web.Mvc;

namespace Sprann.Application.Web
{
    /// <summary>
    /// 版 本 Sprann ADMS V1.0.0 敏捷开发框架
    /// Copyright (c) 2017-2018 思普瑞云(深圳)科技有限公司
    /// 创建人：超级管理员
    /// 日 期：2017.03.08
    /// 描 述：控制器执行后执行
    /// </summary>
    public class ResultFillters : FilterAttribute, IResultFilter
    {
        /// <summary>
        /// 执行完action后跳转后执行
        /// </summary>
        /// <param name="filterContext"></param>
        public void OnResultExecuted(ResultExecutedContext filterContext)
        {
            if(filterContext.Result is ViewResult ){// 如果返回结果是视图
                var viewResult = (ViewResult)filterContext.Result;
                string html = string.Empty;
                IView view = ViewEngines.Engines.FindView(filterContext, viewResult.ViewName, string.Empty).View;
                using (System.IO.StringWriter sp = new System.IO.StringWriter())
                {
                    ViewContext vc = new ViewContext(filterContext, view, viewResult.ViewData, viewResult.TempData, sp);
                    vc.View.Render(vc, sp);
                    html = sp.ToString();
                }
                ContentResult Content = new ContentResult();
                Content.Content = html;
                filterContext.Result = Content;
            }
        }
        /// <summary>
        /// 执行完action后跳转前执行
        /// </summary>
        /// <param name="filterContext"></param>
        public void OnResultExecuting(ResultExecutingContext filterContext)
        {
        }
    }
}
