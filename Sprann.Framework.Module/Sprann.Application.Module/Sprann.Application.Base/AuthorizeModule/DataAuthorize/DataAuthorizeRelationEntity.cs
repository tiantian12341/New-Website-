using Sprann.Util;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Sprann.Application.Base.AuthorizeModule
{
    /// <summary>
    /// 数据认证关系实体类
    /// </summary>
    public class DataAuthorizeRelationEntity 
    {
        #region 数据认证关系实体
        /// <summary>
        /// 规则表示
        /// </summary>
        /// <returns></returns>
        [Column("F_ID")]
        public string F_Id { get; set; }
        /// <summary>
        /// 接口名称
        /// </summary>
        /// <returns></returns>
        [Column("F_NAME")]
        public string F_Name { get; set; }
        /// <summary>
        /// 接口标识
        /// </summary>
        /// <returns></returns>
        [Column("F_INTERFACEID")]
        public string F_InterfaceId { get; set; }
        /// <summary>
        /// 对象标识(用户或角色)
        /// </summary>
        /// <returns></returns>
        [Column("F_OBJECTID")]
        public string F_ObjectId { get; set; }
        /// <summary>
        /// 对象类型(指定是用户还是角色)
        /// </summary>
        /// <returns></returns>
        [Column("F_OBJECTTYPE")]
        public int? F_ObjectType { get; set; }
        /// <summary>
        /// 公式定义
        /// </summary>
        /// <returns></returns>
        [Column("F_FORMULA")]
        public string F_Formula { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        /// <returns></returns>
        [Column("F_CREATEDATE")]
        public DateTime? F_CreateDate { get; set; }
        /// <summary>
        /// 创建用户
        /// </summary>
        /// <returns></returns>
        [Column("F_CREATEUSERID")]
        public string F_CreateUserId { get; set; }
        /// <summary>
        /// 创建用户名称
        /// </summary>
        /// <returns></returns>
        [Column("F_CREATEUSERNAME")]
        public string F_CreateUserName { get; set; }
        /// <summary>
        /// 修改时间
        /// </summary>
        /// <returns></returns>
        [Column("F_MODIFYDATE")]
        public DateTime? F_ModifyDate { get; set; }
        /// <summary>
        /// 修改人员
        /// </summary>
        /// <returns></returns>
        [Column("F_MODIFYUSERID")]
        public string F_ModifyUserId { get; set; }
        /// <summary>
        /// 修改用户名称
        /// </summary>
        /// <returns></returns>
        [Column("F_MODIFYUSERNAME")]
        public string F_ModifyUserName { get; set; }
        #endregion

        #region 扩展属性
        /// <summary>
        /// 创建
        /// </summary>
        public void Create()
        {
            this.F_Id = Guid.NewGuid().ToString();
            this.F_CreateDate = DateTime.Now;

            UserInfo userInfo = LoginUserInfo.Get();
            this.F_CreateUserId = userInfo.userId;
            this.F_CreateUserName = userInfo.realName;
        }
        /// <summary>
        /// x修改
        /// </summary>
        /// <param name="keyValue">����</param>
        public void Modify(string keyValue)
        {
            this.F_Id = keyValue;
            this.F_ModifyDate = DateTime.Now;

            UserInfo userInfo = LoginUserInfo.Get();
            this.F_ModifyUserId = userInfo.userId;
            this.F_ModifyUserName = userInfo.realName;
        }
        #endregion

        #region 非映射字段
        /// <summary>
        /// 用户名称
        /// </summary>
        [NotMapped]
        public string UserName { set; get; }
        /// <summary>
        /// 角色名称
        /// </summary>
        [NotMapped]
        public string RoleName { set; get; }
        #endregion
    }
}


