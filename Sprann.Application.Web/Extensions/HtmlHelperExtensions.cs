using Sprann.Cache.Base;
using Sprann.Cache.Factory;
using Sprann.Util;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace Sprann.Application.Web
{
    /// <summary>
    /// 版 本 Sprann ADMS V1.0.0 敏捷开发框架
    /// Copyright (c) 2017-2018 思普瑞云(深圳)科技有限公司
    /// 创建人：超级管理员
    /// 日 期：2017.03.07
    /// 描 述：对HtmlHelper类进行扩展
    /// </summary>
    public static class HtmlHelperExtensions
    {
        private static ICache cache = CacheFactory.CaChe();
        /// <summary>
        /// 往页面中写入js文件
        /// </summary>
        /// <param name="htmlHelper">需要扩展对象</param>
        /// <param name="jsFiles">文件路径</param>
        /// <returns></returns>
        public static MvcHtmlString AppendJsFile(this HtmlHelper htmlHelper, params string[] jsFiles)
        {
            string jsFile = "";
            foreach (string file in jsFiles)
            {
                if (jsFile != "")
                {
                    jsFile += ",";
                }
                jsFile += file;
            }
            string jsStr = "";
            if (Config.GetValue("JsCompressorCache") == "true")
            {
                jsStr = cache.Read<string>(jsFile, CacheId.jscss);
            }
            if (string.IsNullOrEmpty(jsStr))
            {
                jsStr = JsCssHelper.ReadJSFile(jsFiles);
                cache.Write<string>(jsFile, jsStr, CacheId.jscss);
            }
            
            StringBuilder content = new StringBuilder();
            string jsFormat = "<script>{0}</script>";
            
            content.AppendFormat(jsFormat, jsStr);
            return new MvcHtmlString(content.ToString());
        }
        /// <summary>
        /// 往页面中写入css样式
        /// </summary>
        /// <param name="htmlHelper">需要扩展对象</param>
        /// <param name="cssFiles">文件路径</param>
        /// <returns></returns>
        public static MvcHtmlString AppendCssFile(this HtmlHelper htmlHelper, params string[] cssFiles)
        {
            string cssFile = "";
            foreach (string file in cssFiles)
            {
                if (cssFile != "")
                {
                    cssFile += ",";
                }
                cssFile += file;
            }
            string cssStr = "";
            if (Config.GetValue("JsCompressorCache") == "true")
            {
               cssStr = cache.Read<string>(cssFile, CacheId.jscss);
            }
            
            if (string.IsNullOrEmpty(cssStr))
            {
               var url =  HttpContext.Current.Request.ApplicationPath;
               cssStr = JsCssHelper.ReadCssFile(cssFiles);
                if (url != "/")
                {
                    cssStr = cssStr.Replace("url(", "url(" + url);
                }
                cache.Write<string>(cssFile, cssStr, CacheId.jscss);
            }
            StringBuilder content = new StringBuilder();
            string cssFormat = "<style>{0}</style>";
            content.AppendFormat(cssFormat, cssStr);
            return new MvcHtmlString(content.ToString());
        }

        #region 权限模块
        /// <summary>
        /// 设置当前页面地址
        /// </summary>
        /// <param name="htmlHelper"></param>
        /// <returns></returns>
        public static MvcHtmlString SetCurrentUrl(this HtmlHelper htmlHelper)
        {
            string currentUrl = (string)WebHelper.GetHttpItems("currentUrl");
            return new MvcHtmlString("<script>var spCurrentUrl='" + currentUrl + "';var spModuleButtonList;var spModuleColumnList;var spModule;</script>");
        }
        #endregion
    }
}
