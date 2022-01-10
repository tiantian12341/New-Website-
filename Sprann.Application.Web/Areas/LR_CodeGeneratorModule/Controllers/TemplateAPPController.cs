using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Sprann.Application.Web.Areas.LR_CodeGeneratorModule.Controllers
{
    /// <summary>
    /// 版 本 Sprann ADMS V1.0.0 敏捷开发框架
    /// Copyright (c) 2017-2018 思普瑞云(深圳)科技有限公司
    /// 创建人：超级管理员
    /// 日 期：2017.03.09
    /// 描 述：移动端代码生成器
    /// </summary>
    public class TemplateAPPController : MvcControllerBase
    {
        #region 视图功能
        public ActionResult Index()
        {
            return View();
        }
        #endregion
    }
}