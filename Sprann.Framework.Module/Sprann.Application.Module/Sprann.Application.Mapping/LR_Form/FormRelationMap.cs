using Sprann.Application.Form;
using System.Data.Entity.ModelConfiguration;

namespace Sprann.Application.Mapping
{
    /// <summary>
    
    
    
    /// 日 期：2017.04.01
    /// 描 述：表单关联功能
    /// </summary>
    public class FormRelationMap : EntityTypeConfiguration<FormRelationEntity>
    {
        public FormRelationMap()
        {
            #region 表、主键
            //表
            this.ToTable("LR_FORM_RELATION");
            //主键
            this.HasKey(t => t.F_Id);
            #endregion

            #region 配置关系
            #endregion
        }
    }
}

