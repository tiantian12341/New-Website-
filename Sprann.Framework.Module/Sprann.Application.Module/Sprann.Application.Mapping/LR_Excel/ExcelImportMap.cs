using Sprann.Application.Excel;
using System.Data.Entity.ModelConfiguration;

namespace Sprann.Application.Mapping.LR_Excel
{
    /// <summary>
    
    
    /// 创 建：超级管理员
    /// 日 期：2017-09-05 16:07
    /// 描 述：Excel数据导入设置
    /// </summary>
    public class ExcelImportMap : EntityTypeConfiguration<ExcelImportEntity>
    {
        public ExcelImportMap()
        {
            #region 表、主键
            //表
            this.ToTable("LR_EXCEL_IMPORT");
            //主键
            this.HasKey(t => t.F_Id);
            #endregion

            #region 配置关系
            #endregion
        }
    }
}

