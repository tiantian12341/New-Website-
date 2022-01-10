using System;

namespace Sprann.DataBase.Repository
{
    /// <summary>
    
    
    
    /// 日 期：2017.03.04
    /// 描 述：定义仓储模型工厂
    /// </summary>
    public class RepositoryFactory
    {
        /// <summary>
        /// 定义仓储
        /// </summary>
        /// <param name="connString">连接字符串</param>
        /// <param name="type">数据库类型</param>
        /// <returns></returns>
        public IRepository BaseRepository(string connString, DatabaseType type)
        {
            return new Repository(DbFactory.GetIDatabase(connString, type));
        }
        /// <summary>
        /// 定义仓储
        /// </summary>
        /// <param name="connString">连接字符串</param>
        /// <param name="type">数据库类型</param>
        /// <returns></returns>
        public IRepository BaseRepository(string connString, string type)
        {
            return new Repository(DbFactory.GetIDatabase(connString, type));
        }
        /// <summary>
        /// 定义仓储
        /// </summary>
        /// <param name="name">连接配置名称</param>
        /// <returns></returns>
        public IRepository BaseRepository(string name)
        {
            return new Repository(DbFactory.GetIDatabase(name));
        }
        /// <summary>
        /// 定义仓储（基础库）
        /// </summary>
        /// <returns></returns>
        public IRepository BaseRepository()
        {
            return new Repository(DbFactory.GetIDatabase());
        }

        /// <summary>
        /// 获取定义仓储（静态方法）
        /// </summary>
        /// <param name="sysDbLinkName">框架系统内的数据库连接名称</param>
        /// <returns></returns>
        public static IRepository GetRepositoryFromAppDomain(string sysDbLinkName)
        {
            string connstr = string.Empty;
            string dbType = string.Empty;

            AppDomainDatabaseLinkObject linkObj = AppDomainDatabaseLinkObject.RestoreInAppDomain();
            if (linkObj != null)
            {
                int linkIdx = Array.FindIndex(linkObj.Links, l => l.LinkName.Equals(sysDbLinkName));
                if (linkIdx != -1)
                {
                    connstr = linkObj.Links[linkIdx].ConnectionString;
                    dbType = linkObj.Links[linkIdx].ProviderName;
                }
            }

            if (!string.IsNullOrEmpty(connstr) && !string.IsNullOrEmpty(dbType))
                return new Repository(DbFactory.GetIDatabase(connstr, dbType));

            return null;
        }
    }
}

