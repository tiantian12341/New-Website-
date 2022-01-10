using System;
using System.ComponentModel.DataAnnotations.Schema;
namespace Sprann.Application.CRM

{
    /// <summary>
    /// �� �� Learun-ADMS V7.0.0 ������ݿ������
    /// Copyright (c) 2013-2018 �Ϻ�������Ϣ�������޹�˾
    /// �� ������������Ա
    /// �� �ڣ�2017-07-10 17:47
    /// �� ������������
    /// </summary>
    public class CrmOrderEntity 
    {
        #region ʵ���Ա
        /// <summary>
        /// ��������
        /// </summary>
        /// <returns></returns>
        [Column("F_ORDERID")]
        public string F_OrderId { get; set; }
        /// <summary>
        /// �ͻ�����
        /// </summary>
        /// <returns></returns>
        [Column("F_CUSTOMERID")]
        public string F_CustomerId { get; set; }
        /// <summary>
        /// ������ԱId
        /// </summary>
        /// <returns></returns>
        [Column("F_SELLERID")]
        public string F_SellerId { get; set; }
        /// <summary>
        /// ��������
        /// </summary>
        /// <returns></returns>
        [Column("F_ORDERDATE")]
        public DateTime? F_OrderDate { get; set; }
        /// <summary>
        /// ���ݱ��
        /// </summary>
        /// <returns></returns>
        [Column("F_ORDERCODE")]
        public string F_OrderCode { get; set; }
        /// <summary>
        /// �Żݽ��
        /// </summary>
        /// <returns></returns>
        [Column("F_DISCOUNTSUM")]
        public decimal? F_DiscountSum { get; set; }
        /// <summary>
        /// Ӧ�ս��
        /// </summary>
        /// <returns></returns>
        [Column("F_ACCOUNTS")]
        public decimal? F_Accounts { get; set; }
        /// <summary>
        /// ���ս��
        /// </summary>
        /// <returns></returns>
        [Column("F_RECEIVEDAMOUNT")]
        public decimal? F_ReceivedAmount { get; set; }
        /// <summary>
        /// �տ�����
        /// </summary>
        /// <returns></returns>
        [Column("F_PAYMENTDATE")]
        public DateTime? F_PaymentDate { get; set; }
        /// <summary>
        /// �տʽ
        /// </summary>
        /// <returns></returns>
        [Column("F_PAYMENTMODE")]
        public string F_PaymentMode { get; set; }
        /// <summary>
        /// �տ�״̬��1-δ�տ�2-�����տ�3-ȫ���տ
        /// </summary>
        /// <returns></returns>
        [Column("F_PAYMENTSTATE")]
        public int? F_PaymentState { get; set; }
        /// <summary>
        /// ���۷���
        /// </summary>
        /// <returns></returns>
        [Column("F_SALECOST")]
        public decimal? F_SaleCost { get; set; }
        /// <summary>
        /// ժҪ��Ϣ
        /// </summary>
        /// <returns></returns>
        [Column("F_ABSTRACTINFO")]
        public string F_AbstractInfo { get; set; }
        /// <summary>
        /// ��ͬ���
        /// </summary>
        /// <returns></returns>
        [Column("F_CONTRACTCODE")]
        public string F_ContractCode { get; set; }
        /// <summary>
        /// ��ͬ����
        /// </summary>
        /// <returns></returns>
        [Column("F_CONTRACTFILE")]
        public string F_ContractFile { get; set; }
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
            this.F_OrderId = Guid.NewGuid().ToString();
            this.F_CreateDate = DateTime.Now;
        }
        /// <summary>
        /// �༭����
        /// </summary>
        /// <param name="keyValue"></param>
        public void Modify(string keyValue)
        {
            this.F_OrderId = keyValue;
            this.F_ModifyDate = DateTime.Now;
        }
        #endregion
    }
}


