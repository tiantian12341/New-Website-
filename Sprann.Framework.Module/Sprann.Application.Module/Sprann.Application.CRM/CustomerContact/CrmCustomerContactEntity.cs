using System;
using System.ComponentModel.DataAnnotations.Schema;
namespace Sprann.Application.CRM
{
    /// <summary>
    /// �� �� Learun-ADMS V7.0.0 ������ݿ������
    /// Copyright (c) 2013-2018 �Ϻ�������Ϣ�������޹�˾
    /// �� ������������Ա
    /// �� �ڣ�2017-07-11 09:58
    /// �� �����ͻ���ϵ��
    /// </summary>
    public class CrmCustomerContactEntity 
    {
        #region ʵ���Ա
        /// <summary>
        /// ��ϵ������
        /// </summary>
        /// <returns></returns>
        [Column("F_CUSTOMERCONTACTID")]
        public string F_CustomerContactId { get; set; }
        /// <summary>
        /// �ͻ�����
        /// </summary>
        /// <returns></returns>
        [Column("F_CUSTOMERID")]
        public string F_CustomerId { get; set; }
        /// <summary>
        /// ��ϵ��
        /// </summary>
        /// <returns></returns>
        [Column("F_CONTACT")]
        public string F_Contact { get; set; }
        /// <summary>
        /// �Ա�
        /// </summary>
        /// <returns></returns>
        [Column("F_GENDER")]
        public int? F_Gender { get; set; }
        /// <summary>
        /// �ֻ�
        /// </summary>
        /// <returns></returns>
        [Column("F_MOBILE")]
        public string F_Mobile { get; set; }
        /// <summary>
        /// �绰
        /// </summary>
        /// <returns></returns>
        [Column("F_TEL")]
        public string F_Tel { get; set; }
        /// <summary>
        /// ����
        /// </summary>
        /// <returns></returns>
        [Column("F_FAX")]
        public string F_Fax { get; set; }
        /// <summary>
        /// QQ
        /// </summary>
        /// <returns></returns>
        [Column("F_QQ")]
        public string F_QQ { get; set; }
        /// <summary>
        /// Email
        /// </summary>
        /// <returns></returns>
        [Column("F_EMAIL")]
        public string F_Email { get; set; }
        /// <summary>
        /// ΢��
        /// </summary>
        /// <returns></returns>
        [Column("F_WECHAT")]
        public string F_Wechat { get; set; }
        /// <summary>
        /// ְλ
        /// </summary>
        /// <returns></returns>
        [Column("F_POSTID")]
        public string F_PostId { get; set; }
        /// <summary>
        /// ����
        /// </summary>
        /// <returns></returns>
        [Column("F_HOBBY")]
        public string F_Hobby { get; set; }
        /// <summary>
        /// ������
        /// </summary>
        /// <returns></returns>
        [Column("F_SORTCODE")]
        public int? F_SortCode { get; set; }
        /// <summary>
        /// ɾ�����
        /// </summary>
        /// <returns></returns>
        [Column("F_DELETEMARK")]
        public int? F_DeleteMark { get; set; }
        /// <summary>
        /// ��Ч��־
        /// </summary>
        /// <returns></returns>
        [Column("F_ENABLEDMARK")]
        public int? F_EnabledMark { get; set; }
        /// <summary>
        /// ��ע
        /// </summary>
        /// <returns></returns>
        [Column("F_DESCRIPTION")]
        public string F_Description { get; set; }
        /// <summary>
        /// ��������
        /// </summary>
        /// <returns></returns>
        [Column("F_CREATEDATE")]
        public DateTime? F_CreateDate { get; set; }
        /// <summary>
        /// �����û�����
        /// </summary>
        /// <returns></returns>
        [Column("F_CREATEUSERID")]
        public string F_CreateUserId { get; set; }
        /// <summary>
        /// �����û�
        /// </summary>
        /// <returns></returns>
        [Column("F_CREATEUSERNAME")]
        public string F_CreateUserName { get; set; }
        /// <summary>
        /// �޸�����
        /// </summary>
        /// <returns></returns>
        [Column("F_MODIFYDATE")]
        public DateTime? F_ModifyDate { get; set; }
        /// <summary>
        /// �޸��û�����
        /// </summary>
        /// <returns></returns>
        [Column("F_MODIFYUSERID")]
        public string F_ModifyUserId { get; set; }
        /// <summary>
        /// �޸��û�
        /// </summary>
        /// <returns></returns>
        [Column("F_MODIFYUSERNAME")]
        public string F_ModifyUserName { get; set; }
        #endregion

        #region ��չ����
        /// <summary>
        /// ��������
        /// </summary>
        public void Create()
        {
            this.F_CustomerContactId = Guid.NewGuid().ToString();
            this.F_CreateDate = DateTime.Now;
        }
        /// <summary>
        /// �༭����
        /// </summary>
        /// <param name="keyValue"></param>
        public void Modify(string keyValue)
        {
            this.F_CustomerContactId = keyValue;
            this.F_ModifyDate = DateTime.Now;
        }
        #endregion
    }
}


