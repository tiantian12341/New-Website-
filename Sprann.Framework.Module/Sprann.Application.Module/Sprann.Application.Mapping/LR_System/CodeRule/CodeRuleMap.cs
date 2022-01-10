using Sprann.Application.Base.SystemModule;
using System.Data.Entity.ModelConfiguration;

namespace Sprann.Application.Mapping
{
    /// <summary>
    
    
    
    /// 日 期：2017.03.04
    /// 描 述：编号规则
    /// </summary>
    public class CodeRuleMap : EntityTypeConfiguration<CodeRuleEntity>
    {
        public CodeRuleMap()
        {
            #region 表、主键
            //表
            this.ToTable("LR_BASE_CODERULE");//Base_CodeRule
            //主键
            this.HasKey(t => t.F_RuleId);
            #endregion

            #region 配置关系
            #endregion
        }
    }
}

