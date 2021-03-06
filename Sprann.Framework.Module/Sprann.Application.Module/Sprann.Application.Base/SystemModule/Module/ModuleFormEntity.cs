using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Sprann.Application.Base.SystemModule
{
    /// <summary>
    
    
    
    /// 日 期：2018.05.08
    /// 描 述：功能模块视图列
    /// </summary>
    public class ModuleFormEntity
    {
        #region 实体成员
        /// <summary>
        /// 列主键
        /// </summary>
        /// <returns></returns>
        [Column("F_MODULEFORMID")]
        public string F_ModuleFormId { get; set; }
        /// <summary>
        /// 功能主键
        /// </summary>
        /// <returns></returns>
        [Column("F_MODULEID")]
        public string F_ModuleId { get; set; }
        /// <summary>
        /// 编码
        /// </summary>
        /// <returns></returns>
        [Column("F_ENCODE")]
        public string F_EnCode { get; set; }
        /// <summary>
        /// 名称
        /// </summary>
        /// <returns></returns>
        [Column("F_FULLNAME")]
        public string F_FullName { get; set; }
        /// <summary>
        /// 排序码
        /// </summary>
        /// <returns></returns>
        [Column("F_SORTCODE")]
        public int? F_SortCode { get; set; }
        #endregion

        #region 扩展操作
        /// <summary>
        /// 新增调用
        /// </summary>
        public void Create()
        {
            this.F_ModuleFormId = Guid.NewGuid().ToString();
        }
        /// <summary>
        /// 编辑调用
        /// </summary>
        /// <param name="keyValue"></param>
        public void Modify(string keyValue)
        {
            this.F_ModuleFormId = keyValue;
        }
        #endregion
    }
}

