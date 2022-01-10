using Sprann.Application.Base.AuthorizeModule;
using System.Data.Entity.ModelConfiguration;

namespace  Sprann.Application.Mapping
{
    /// <summary>
    /// 数据权限验证与过滤
    /// </summary>
    public class LR_Base_DataAuthorizeRelationMap : EntityTypeConfiguration<DataAuthorizeRelationEntity>
    {
        public LR_Base_DataAuthorizeRelationMap()
        {
            #region 数据表映射
            this.ToTable("LR_BASE_DATARELATION");
            this.HasKey(t => t.F_Id);
            #endregion
        }
    }
}


