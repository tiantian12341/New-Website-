using System.Collections.Generic;

namespace Sprann.Application.Base.AuthorizeModule
{
    /// <summary>
    
    
    
    /// 日 期：2017.04.17
    /// 描 述：授權功能
    /// </summary>
    public interface AuthorizeIBLL
    {
        #region 获取数据
        /// <summary>
        /// 获取被授权的功能的主键字串
        /// </summary>
        /// <param name="objectId">对象主键（角色,用户）</param>
        /// <param name="itemType">项目类型:1-菜单2-按钮3-视图</param>
        /// <returns></returns>
        List<string> GetItemIdList(string objectId, int itemType);
        /// <summary>
        /// 获取被授权的功能的主键字串
        /// </summary>
        /// <param name="objectIds">对象主键串（角色,用户）</param>
        /// <param name="itemType">功能类型 1菜单功能 2按钮 3视图列表</param>
        /// <returns></returns>
        List<string> GetItemIdListByobjectIds(string objectIds, int itemType);
        #endregion

        #region 提交数据
        /// <summary>
        /// 添加授权
        /// </summary>
        /// <param name="objectType">权限分类-1角色2用户</param>
        /// <param name="objectId">对象Id</param>
        /// <param name="moduleIds">功能Id</param>
        /// <param name="moduleButtonIds">按钮Id</param>
        /// <param name="moduleColumnIds">视图Id</param>
        /// <param name="moduleForms">表单Id</param>
        void SaveAuthorize(int objectType, string objectId, string[] moduleIds, string[] moduleButtonIds, string[] moduleColumnIds, string[] moduleForms);
        /// <summary>
        /// 添加授权
        /// </summary>
        /// <param name="objectType">权限分类-1角色2用户</param>
        /// <param name="objectId">对象Id</param>
        /// <param name="appModuleIds">功能Id</param>
        void SaveAppAuthorize(int objectType, string objectId, string[] appModuleIds);
        #endregion
    }
}

