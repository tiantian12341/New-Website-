using Sprann.Application.Base.AuthorizeModule;
using System.Data.Entity.ModelConfiguration;

namespace Sprann.Application.Mapping
{
    /// <summary>
    
    
    
    /// 日 期：2017.04.17
    /// 描 述：授权功能
    /// </summary>
    public class AuthorizeMap : EntityTypeConfiguration<AuthorizeEntity>
    {
        public AuthorizeMap()
        {
            #region 表、主键
            //表
            this.ToTable("LR_BASE_AUTHORIZE");
            //主键
            this.HasKey(t => t.F_AuthorizeId);
            #endregion

            #region 配置关系
            #endregion
        }
    }
}

