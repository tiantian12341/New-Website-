using Sprann.Application.Organization;
using Sprann.Util;
using System.Web.Mvc;

namespace Sprann.Application.Web.Areas.LR_OrganizationModule.Controllers
{
    /// <summary>
    /// 版 本 Sprann ADMS V1.0.0 敏捷开发框架
    /// Copyright (c) 2017-2018 思普瑞云(深圳)科技有限公司
    /// 创建人：超级管理员
    /// 日 期：2017.03.09
    /// 描 述：角色管理
    /// </summary>
    public class RoleController : MvcControllerBase
    {
        private RoleIBLL roleIBLL = new RoleBLL();

        #region 获取视图
        /// <summary>
        /// 主页
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
        /// 获取角色列表信息
        /// </summary>
        /// <param name="keyWord">查询关键字</param>
        /// <returns></returns>
        [HttpGet]
        [AjaxOnly]
        public ActionResult GetList(string keyword)
        {
            var data = roleIBLL.GetList(keyword);
            return Success(data);
        }
        /// <summary>
        /// 获取分页数据
        /// </summary>
        /// <param name="pagination">分页参数</param>
        /// <param name="keyword">关键字</param>
        /// <returns></returns>
        [HttpGet]
        [AjaxOnly]
        public ActionResult GetPageList(string pagination, string keyword)
        {
            Pagination paginationobj = pagination.ToObject<Pagination>();
            var data = roleIBLL.GetPageList(paginationobj, keyword);
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
        public ActionResult SaveForm(string keyValue, RoleEntity entity)
        {
            roleIBLL.SaveEntity(keyValue, entity);
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
            roleIBLL.VirtualDelete(keyValue);
            return Success("删除成功！");
        }
        #endregion
    }
}