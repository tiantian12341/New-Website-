using Sprann.Application.Base.SystemModule;
using System.Data.Entity.ModelConfiguration;

namespace Sprann.Application.Mapping
{
    /// <summary>
    
    
    
    /// 日 期：2017.04.01
    /// 描 述：数据库连接
    /// </summary>
    public class DataBaseLinkMap : EntityTypeConfiguration<DatabaseLinkEntity>
    {
        public DataBaseLinkMap()
        {
            #region 表、主键
            //表
            this.ToTable("LR_BASE_DATABASELINK");
            //主键
            this.HasKey(t => t.F_DatabaseLinkId);
            #endregion

            #region 配置关系
            #endregion
        }
    }
}

