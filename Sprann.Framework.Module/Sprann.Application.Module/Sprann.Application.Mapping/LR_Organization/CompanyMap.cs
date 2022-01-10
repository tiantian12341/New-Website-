using Sprann.Application.Organization;
using System.Data.Entity.ModelConfiguration;

namespace Sprann.Application.Mapping
{
    /// <summary>
    
    
    
    /// 日 期：2017.03.04
    /// 描 述：机构管理
    /// </summary>
    public class CompanyMap : EntityTypeConfiguration<CompanyEntity>
    {
        public CompanyMap()
        {
            #region 表、主键
            //表
            this.ToTable("LR_BASE_COMPANY");
            //主键
            this.HasKey(t => t.F_CompanyId);
            #endregion

            #region 配置关系
            #endregion
        }
    }
}

