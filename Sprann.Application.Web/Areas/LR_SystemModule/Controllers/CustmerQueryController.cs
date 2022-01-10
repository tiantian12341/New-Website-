using Sprann.Application.Base.SystemModule;
using Sprann.Util;
using System.Web.Mvc;

namespace Sprann.Application.Web.Areas.LR_SystemModule.Controllers
{
    /// <summary>
    /// 版 本 Sprann ADMS V1.0.0 敏捷开发框架
    /// Copyright (c) 2017-2018 思普瑞云(深圳)科技有限公司
    /// 创建人：超级管理员
    /// 日 期：2017.04.01
    /// 描 述：自定义查询
    /// </summary>
    public class CustmerQueryController : MvcControllerBase
    {
        CustmerQueryIBLL custmerQueryBLL = new CustmerQueryBLL();

        #region 视图功能
        /// <summary>
        /// 自定义查询公共界面
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ActionResult Index()
        {
            return View();
        }
        /// <summary>
        /// 自定义查询公共界面(表单)
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ActionResult Form()
        {
            return View();
        }
        /// <summary>
        /// 条件添加和编辑
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ActionResult QueryForm() {
            return View();
        }
        #endregion

        #region 获取数据
        /// <summary>
        /// 获取分页数据
        /// </summary>
        /// <param name="pagination">分页参数</param>
        /// <param name="keyword">关键字</param>
        /// <returns></returns>
        public ActionResult GetPageList(string pagination, string keyword)
        {
            Pagination paginationobj = pagination.ToObject<Pagination>();
            var data = custmerQueryBLL.GetPageList(paginationobj, keyword);
            var jsonData = new
            {
                rows = data,
                total = paginationobj.total,
                page = paginationobj.page,
                records = paginationobj.records,
            };
            return Success(jsonData);
        }
        #endregion 
     
        #region 提交数据
        /// <summary>
        /// 保存表单数据
        /// </summary>
        /// <param name="keyValue">主键</param>
        /// <param name="entity">实体</param>
        /// <returns></returns>
        [HttpPost]
        [ValidateAntiForgeryToken]
        [AjaxOnly]
        public ActionResult SaveForm(string keyValue, CustmerQueryEntity entity)
        {
            custmerQueryBLL.SaveEntity(keyValue, entity);
            return Success("保存成功！");
        }
        /// <summary>
        /// 删除表单数据
        /// </summary>
        /// <param name="keyValue">主键</param>
        /// <returns></returns>
        [HttpPost]
        [AjaxOnly]
        public ActionResult DeleteForm(string keyValue)
        {
            custmerQueryBLL.DeleteEntity(keyValue);
            return Success("删除成功！");
        }
        #endregion
    }
}