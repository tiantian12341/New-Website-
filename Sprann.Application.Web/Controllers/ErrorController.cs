using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Sprann.Application.Web.Controllers
{
    /// <summary>
    
    
    
    /// 日 期：2017.03.09
    /// 描 述：错误页控制器
    /// </summary>
    public class ErrorController : Controller
    {
        /// <summary>
        /// 错误页面（异常页面）
        /// </summary>
        /// <param name="message"></param>
        /// <returns></returns>
        public ActionResult ErrorMessage(string message)
        {
            Dictionary<string, string> modulesError = (Dictionary<string, string>)HttpContext.Application["error"];
            ViewData["Message"] = modulesError;
            return View();
        }
        /// <summary>
        /// 错误页面（错误路径404）
        /// </summary>
        /// <returns></returns>
        public ActionResult ErrorPath404()
        {
            return View();
        }
        /// <summary>
        /// 错误页面（升级浏览器软件）
        /// </summary>
        /// <returns></returns>
        public ActionResult ErrorBrowser()
        {
            return View();
        }
    }
}
