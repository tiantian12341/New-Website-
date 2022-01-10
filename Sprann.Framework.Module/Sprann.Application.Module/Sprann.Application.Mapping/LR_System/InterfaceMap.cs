using Sprann.Application.Base.SystemModule;
using System.Data.Entity.ModelConfiguration;

namespace Sprann.Application.Mapping
{
    /// <summary>
    
    
    
    /// 日 期：2017.04.01
    /// 描 述：接口管理
    /// </summary>
    public class InterfaceMap : EntityTypeConfiguration<InterfaceEntity>
    {
        /// <summary>
        /// 映射
        /// </summary>
        public InterfaceMap()
        {
            #region 表、主键
            //表
            this.ToTable("LR_BASE_INTERFACE");
            //主键
            this.HasKey(t => t.F_Id);
            #endregion

            #region 配置关系
            #endregion
        }
    }
}
