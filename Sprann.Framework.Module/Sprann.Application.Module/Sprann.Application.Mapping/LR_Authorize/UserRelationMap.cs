using Sprann.Application.Base.AuthorizeModule;
using System.Data.Entity.ModelConfiguration;

namespace Sprann.Application.Mapping
{
    /// <summary>
    
    
    
    /// 日 期：2017.04.17
    /// 描 述：用户关联对象
    /// </summary>
    public class UserRelationMap : EntityTypeConfiguration<UserRelationEntity>
    {
        public UserRelationMap()
        {
            #region 表、主键
            //表
            this.ToTable("LR_BASE_USERRELATION");
            //主键
            this.HasKey(t => t.F_UserRelationId);
            #endregion

            #region 配置关系
            #endregion
        }
    }
}

