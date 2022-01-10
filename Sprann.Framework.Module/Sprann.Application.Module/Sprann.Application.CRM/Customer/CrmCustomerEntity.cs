using System;
using System.ComponentModel.DataAnnotations.Schema;
namespace Sprann.Application.CRM
{
    /// <summary>
    /// �� �� Learun-ADMS V7.0.0 ������ݿ������
    /// Copyright (c) 2013-2018 �Ϻ�������Ϣ�������޹�˾
    /// �� ������������Ա
    /// �� �ڣ�2017-07-11 09:43
    /// �� �����ͻ�����
    /// </summary>
    public class CrmCustomerEntity 
    {
        #region ʵ���Ա
        /// <summary>
        /// �ͻ�����
        /// </summary>
        /// <returns></returns>
        [Column("F_CUSTOMERID")]
        public string F_CustomerId { get; set; }
        /// <summary>
        /// �ͻ����
        /// </summary>
        /// <returns></returns>
        [Column("F_ENCODE")]
        public string F_EnCode { get; set; }
        /// <summary>
        /// �ͻ�����
        /// </summary>
        /// <returns></returns>
        [Column("F_FULLNAME")]
        public string F_FullName { get; set; }
        /// <summary>
        /// �ͻ����
        /// </summary>
        /// <returns></returns>
        [Column("F_SHORTNAME")]
        public string F_ShortName { get; set; }
        /// <summary>
        /// �ͻ���ҵ
        /// </summary>
        /// <returns></returns>
        [Column("F_CUSTINDUSTRYID")]
        public string F_CustIndustryId { get; set; }
        /// <summary>
        /// �ͻ�����
        /// </summary>
        /// <returns></returns>
        [Column("F_CUSTTYPEID")]
        public string F_CustTypeId { get; set; }
        /// <summary>
        /// �ͻ�����
        /// </summary>
        /// <returns></returns>
        [Column("F_CUSTLEVELID")]
        public string F_CustLevelId { get; set; }
        /// <summary>
        /// �ͻ��̶�
        /// </summary>
        /// <returns></returns>
        [Column("F_CUSTDEGREEID")]
        public string F_CustDegreeId { get; set; }
        /// <summary>
        /// ����ʡ��
        /// </summary>
        /// <returns></returns>
        [Column("F_PROVINCE")]
        public string F_Province { get; set; }
        /// <summary>
        /// ���ڳ���
        /// </summary>
        /// <returns></returns>
        [Column("F_CITY")]
        public string F_City { get; set; }
        /// <summary>
        /// ��ϵ��
        /// </summary>
        /// <returns></returns>
        [Column("F_CONTACT")]
        public string F_Contact { get; set; }
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
        /// ����
        /// </summary>
        /// <returns></returns>
        [Column("F_HOBBY")]
        public string F_Hobby { get; set; }
        /// <summary>
        /// ���˴���
        /// </summary>
        /// <returns></returns>
        [Column("F_LEGALPERSON")]
        public string F_LegalPerson { get; set; }
        /// <summary>
        /// ��˾��ַ
        /// </summary>
        /// <returns></returns>
        [Column("F_COMPANYADDRESS")]
        public string F_CompanyAddress { get; set; }
        /// <summary>
        /// ��˾��վ
        /// </summary>
        /// <returns></returns>
        [Column("F_COMPANYSITE")]
        public string F_CompanySite { get; set; }
        /// <summary>
        /// ��˾���
        /// </summary>
        /// <returns></returns>
        [Column("F_COMPANYDESC")]
        public string F_CompanyDesc { get; set; }
        /// <summary>
        /// ������ԱId
        /// </summary>
        /// <returns></returns>
        [Column("F_TRACEUSERID")]
        public string F_TraceUserId { get; set; }
        /// <summary>
        /// ������Ա
        /// </summary>
        /// <returns></returns>
        [Column("F_TRACEUSERNAME")]
        public string F_TraceUserName { get; set; }
        /// <summary>
        /// ��������
        /// </summary>
        /// <returns></returns>
        [Column("F_ALERTDATETIME")]
        public DateTime? F_AlertDateTime { get; set; }
        /// <summary>
        /// ����״̬
        /// </summary>
        /// <returns></returns>
        [Column("F_ALERTSTATE")]
        public int? F_AlertState { get; set; }
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
            this.F_CustomerId = Guid.NewGuid().ToString();
            this.F_CreateDate = DateTime.Now;
        }
        /// <summary>
        /// �༭����
        /// </summary>
        /// <param name="keyValue"></param>
        public void Modify(string keyValue)
        {
            this.F_CustomerId = keyValue;
            this.F_ModifyDate = DateTime.Now;
        }
        #endregion
    }
}


