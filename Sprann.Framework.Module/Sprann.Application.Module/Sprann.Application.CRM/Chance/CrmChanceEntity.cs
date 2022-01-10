using System;
using System.ComponentModel.DataAnnotations.Schema;
namespace Sprann.Application.CRM

{
    /// <summary>
    /// �� �� Learun-ADMS V7.0.0 ������ݿ������
    /// Copyright (c) 2013-2018 �Ϻ�������Ϣ�������޹�˾
    /// �� ������������Ա
    /// �� �ڣ�2017-07-11 11:30
    /// �� �����̻�����
    /// </summary>
    public class CrmChanceEntity 
    {
        #region ʵ���Ա
        /// <summary>
        /// �̻�����
        /// </summary>
        /// <returns></returns>
        [Column("F_CHANCEID")]
        public string F_ChanceId { get; set; }
        /// <summary>
        /// �̻����
        /// </summary>
        /// <returns></returns>
        [Column("F_ENCODE")]
        public string F_EnCode { get; set; }
        /// <summary>
        /// �̻�����
        /// </summary>
        /// <returns></returns>
        [Column("F_FULLNAME")]
        public string F_FullName { get; set; }
        /// <summary>
        /// �̻���Դ
        /// </summary>
        /// <returns></returns>
        [Column("F_SOURCEID")]
        public string F_SourceId { get; set; }
        /// <summary>
        /// �̻��׶�
        /// </summary>
        /// <returns></returns>
        [Column("F_STAGEID")]
        public string F_StageId { get; set; }
        /// <summary>
        /// �ɹ���
        /// </summary>
        /// <returns></returns>
        [Column("F_SUCCESSRATE")]
        public decimal? F_SuccessRate { get; set; }
        /// <summary>
        /// Ԥ�ƽ��
        /// </summary>
        /// <returns></returns>
        [Column("F_AMOUNT")]
        public decimal? F_Amount { get; set; }
        /// <summary>
        /// Ԥ������
        /// </summary>
        /// <returns></returns>
        [Column("F_PROFIT")]
        public decimal? F_Profit { get; set; }
        /// <summary>
        /// �̻�����
        /// </summary>
        /// <returns></returns>
        [Column("F_CHANCETYPEID")]
        public string F_ChanceTypeId { get; set; }
        /// <summary>
        /// ���۷���
        /// </summary>
        /// <returns></returns>
        [Column("F_SALECOST")]
        public decimal? F_SaleCost { get; set; }
        /// <summary>
        /// Ԥ�Ƴɽ�ʱ��
        /// </summary>
        /// <returns></returns>
        [Column("F_DEALDATE")]
        public DateTime? F_DealDate { get; set; }
        /// <summary>
        /// ת���ͻ�
        /// </summary>
        /// <returns></returns>
        [Column("F_ISTOCUSTOM")]
        public int? F_IsToCustom { get; set; }
        /// <summary>
        /// ��˾����
        /// </summary>
        /// <returns></returns>
        [Column("F_COMPANYNAME")]
        public string F_CompanyName { get; set; }
        /// <summary>
        /// ��˾����
        /// </summary>
        /// <returns></returns>
        [Column("F_COMPANYNATUREID")]
        public string F_CompanyNatureId { get; set; }
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
        [Column("F_CONTACTS")]
        public string F_Contacts { get; set; }
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
        /// �̻�״̬����
        /// </summary>
        /// <returns></returns>
        [Column("F_CHANCESTATE")]
        public int? F_ChanceState { get; set; }
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
            this.F_ChanceId = Guid.NewGuid().ToString();
            this.F_CreateDate = DateTime.Now;
        }
        /// <summary>
        /// �༭����
        /// </summary>
        /// <param name="keyValue"></param>
        public void Modify(string keyValue)
        {
            this.F_ChanceId = keyValue;
            this.F_ModifyDate = DateTime.Now;
        }
        #endregion
    }
}


