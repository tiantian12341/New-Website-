using Sprann.DataBase.Repository;
using Sprann.Util;
using System.Collections.Generic;
using System.Data;

namespace Sprann.Application.Base.SystemModule
{
    /// <summary>
    
    
    /// 创建人：王小龙 wxl 
    /// 日 期：2018.12.15
    /// 描 述：我的桌面
    /// </summary>
    public interface DesktopIBLL
    {
        #region 获取数据
        /// <summary>
        /// 获取列表数据
        /// </summary>
        /// <returns></returns>
        DataTable GetSqlData(string databaseLinkId, string sql);
        #endregion
    }
}
