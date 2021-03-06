using Sprann.Application.Base.SystemModule;
using System.Web.Mvc;

namespace Sprann.Application.Web.Areas.LR_SystemModule.Controllers
{
    /// <summary>
    /// 版 本 Sprann ADMS V1.0.0 敏捷开发框架
    /// Copyright (c) 2017-2018 思普瑞云(深圳)科技有限公司
    /// 创建人：超级管理员
    /// 日 期：2017.04.01
    /// 描 述：行政区域
    /// </summary>
    public class AreaController : MvcControllerBase
    {
        private AreaIBLL areaIBLL = new AreaBLL();

        #region 视图功能
        /// <summary>
        /// 行政区域管理
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ActionResult Index()
        {
            return View();
        }
        /// <summary>
        /// 表单
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ActionResult Form()
        {
            return View();
        }
        #endregion

        #region 获取数据
        /// <summary>
        /// 获取列表数据
        /// </summary>
        /// <param name="parentId">父级主键</param>
        /// <param name="keyword">关键字查询（名称/编号）</param>
        /// <returns></returns>
        [HttpGet]
        [AjaxOnly]
        public ActionResult Getlist(string parentId, string keyword) {
            var data = areaIBLL.GetList(parentId, keyword);
            return Success(data);
        }
        /// <summary>
        /// 获取树形数据
        /// </summary>
        /// <param name="parentId"></param>
        /// <returns></returns>
        [HttpGet]
        [AjaxOnly]
        public ActionResult GetTree(string parentId)
        {
            var data = areaIBLL.GetTree(parentId);
            return Success(data);
        }
        #endregion

        #region 提交数据
        /// <summary>
        /// 保存表单数据
        /// </summary>
        /// <param name="keyValue"></param>
        /// <param name="entity"></param>
        /// <returns></returns>
        [HttpPost]
        [ValidateAntiForgeryToken]
        [AjaxOnly]
        public ActionResult SaveForm(string keyValue, AreaEntity entity)
        {
            areaIBLL.SaveEntity(keyValue, entity);
            return Success("保存成功！");
        }
        /// <summary>
        /// 删除表单数据
        /// </summary>
        /// <param name="keyValue"></param>
        /// <returns></returns>
        [HttpPost]
        [AjaxOnly]
        public ActionResult DeleteForm(string keyValue)
        {
            areaIBLL.VirtualDelete(keyValue);
            return Success("删除成功！");
        }
        #endregion       
    }
}
