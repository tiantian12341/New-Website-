using DevExpress.XtraReports.Security;
using DevExpress.XtraReports.Web;
using DevExpress.XtraReports.Native;
using log4net;
using Sprann.Application.Base.SystemModule;
using Sprann.Cache.Base;
using Sprann.Cache.Factory;
using System;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using System.IO;
using log4net.Config;

namespace Sprann.Application.Web
{
    /// <summary>
    /// 版 本 Sprann ADMS V1.0.0 敏捷开发框架
    /// Copyright (c) 2017-2018 思普瑞云(深圳)科技有限公司
    /// 创建人：超级管理员
    /// 日 期：2017.03.08
    /// 描 述：应用程序全局设置
    /// </summary>
    public class MvcApplication : HttpApplication
    {
        ILog log = LogManager.GetLogger(typeof(MvcApplication));

        /// <summary>
        /// 启动应用程序
        /// </summary>
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            // 启动的时候清除全部缓存
            ICache cache = CacheFactory.CaChe();
            cache.RemoveAll(6);

            //保存所有数据库连接信息到应用程序域
            DatabaseLinkService.SyncDatabaseLinkInAppDomain();

            //相应的AssemblyInfo中添加[assembly: XmlConfigurator(ConfigFile = "log4net.config", Watch = true)]
            var logCfg = new FileInfo(AppDomain.CurrentDomain.BaseDirectory + "XmlConfig\\log4net.config");
            XmlConfigurator.ConfigureAndWatch(logCfg);
            log = LogManager.GetLogger(typeof(MvcApplication));

            //System.Web.Routing.RouteTable.Routes.MapPageRoute("defaultRoute", "", "~/Default.aspx");
            DevExpress.XtraReports.Configuration.Settings.Default.UserDesignerOptions.DataBindingMode = DevExpress.XtraReports.UI.DataBindingMode.ExpressionsAdvanced;
            DevExpress.XtraReports.Web.WebDocumentViewer.Native.WebDocumentViewerBootstrapper.SessionState = System.Web.SessionState.SessionStateBehavior.Required;
            DevExpress.XtraReports.Web.QueryBuilder.Native.QueryBuilderBootstrapper.SessionState = System.Web.SessionState.SessionStateBehavior.Required;
            DevExpress.XtraReports.Web.ReportDesigner.Native.ReportDesignerBootstrapper.SessionState = System.Web.SessionState.SessionStateBehavior.Required;

            ScriptPermissionManager.GlobalInstance = new ScriptPermissionManager(ExecutionMode.Unrestricted);

            //SerializationService.RegisterSerializer(MyDataViewSerializer.Name, new MyDataViewSerializer());
            //DevExpress.XtraReports.Web.Extensions.ReportStorageWebExtension.RegisterExtensionGlobal(new FilesystemReportStorageWebExtension(this.Context));
            ASPxReportDesigner.StaticInitialize();

            //var writer = System.IO.File.CreateText(Server.MapPath("~/App_Data/Reporting.log"));
            //writer.AutoFlush = true;
            DevExpress.XtraReports.Web.ClientControls.LoggerService.Initialize((ex, message) =>
            {
                //writer.WriteLine("[{0}]: Exception occurred. Message: '{1}'. Exception Details:\r\n{2}", DateTime.Now, message, ex)
                log.DebugFormat("[{0}]: Exception occurred. Message: '{1}'. Exception Details:\r\n{2}", DateTime.Now, message, ex);
            }
             );

            DevExpress.Web.ASPxWebControl.CallbackError += new EventHandler(Application_Error);
        }

        /// <summary>
        /// 应用程序错误处理
        /// </summary>
        /// <param name="sender">sender</param>
        /// <param name="e">EventArgs</param>
        protected void Application_Error(object sender, EventArgs e)
        {
            var lastError = Server.GetLastError();
        }
    }
}

