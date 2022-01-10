using System;

namespace Sprann.DataBase
{
    [Serializable]
    public struct AppDomainDatabaseLink
    {
        public string LinkName { get; set; }

        public string ConnectionString { get; set; }

        public string ProviderName { get; set; }
    }

    [Serializable]
    public class AppDomainDatabaseLinkObject
    {
        public DateTimeOffset? LastSyncDatetime { get; set; }

        public AppDomainDatabaseLink[] Links { get; set; }

        /// <summary>
        /// 存储到当前应用作用域
        /// </summary>
        public void StoreInAppDomain()
        {
            AppDomain.CurrentDomain.SetData(typeof(AppDomainDatabaseLinkObject).FullName, this);
        }

        /// <summary>
        /// 从当前应用作用域还原
        /// </summary>
        public static AppDomainDatabaseLinkObject RestoreInAppDomain()
        {
            object valObj = AppDomain.CurrentDomain.GetData(typeof(AppDomainDatabaseLinkObject).FullName);
            return valObj as AppDomainDatabaseLinkObject;
        }
    }
}
