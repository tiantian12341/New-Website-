using Sprann.Application.Base.AuthorizeModule;
using System.Web.Mvc;

namespace Sprann.Application.Web.Areas.LR_AuthorizeModule.Controllers
{
    /// <summary>
    /// 版 本 Sprann ADMS V1.0.0 敏捷开发框架
    /// Copyright (c) 2017-2018 思普瑞云(深圳)科技有限公司
    /// 创建人：超级管理员
    /// 日 期：2017.04.17
    /// 描 述：时间过滤
    /// </summary>
    public class FilterTimeController : MvcControllerBase
    {
        private FilterTimeIBLL filterTimeIBLL = new FilterTimeBLL();

        #region 视图功能
        /// <summary>
        /// 过滤时段表单
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
        /// 过滤时段实体 
        /// </summary>
        /// <param name="keyValue">主键值</param>
        /// <returns>返回对象Json</returns>
        [HttpGet]
        [AjaxOnly]
        public ActionResult GetFormData(string keyValue)
        {
            var data = filterTimeIBLL.GetEntity(keyValue);
            return Success(data);
        }
        #endregion

        #region 提交数据
        /// <summary>
        /// 保存过滤时段表单（新增、修改）
        /// </summary>
        /// <param name="filterTimeEntity">过滤时段实体</param>
        /// <returns></returns>
        [HttpPost]
        [ValidateAntiForgeryToken]
        [AjaxOnly]
        public ActionResult SaveForm(FilterTimeEntity filterTimeEntity)
        {
            filterTimeIBLL.SaveForm(filterTimeEntity);
            return Success("操作成功。");
        }
        /// <summary>
        /// 删除过滤时段
        /// </summary>
        /// <param name="keyValue">主键值</param>
        /// <returns></returns>
        [HttpPost]
        [ValidateAntiForgeryToken]
        [AjaxOnly]
        public ActionResult DeleteForm(string keyValue)
        {
            filterTimeIBLL.DeleteEntiy(keyValue);
            return Success("删除成功。");
        }
        #endregion
    }
}