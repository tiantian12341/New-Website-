using System;
using System.ComponentModel.DataAnnotations.Schema;
namespace Sprann.Application.CRM
{
    /// <summary>
    /// �� �� Learun-ADMS V7.0.0 ������ݿ������
    /// Copyright (c) 2013-2018 �Ϻ�������Ϣ�������޹�˾
    /// �� ������������Ա
    /// �� �ڣ�2017-07-11 14:48
    /// �� ����Ӧ���˿�
    /// </summary>
    public class CrmReceivableEntity 
    {
        #region ʵ���Ա
        /// <summary>
        /// �˿�����
        /// </summary>
        /// <returns></returns>
        [Column("F_RECEIVABLEID")]
        public string F_ReceivableId { get; set; }
        /// <summary>
        /// ��������
        /// </summary>
        /// <returns></returns>
        [Column("F_ORDERID")]
        public string F_OrderId { get; set; }
        /// <summary>
        /// �տ�����
        /// </summary>
        /// <returns></returns>
        [Column("F_PAYMENTTIME")]
        public DateTime? F_PaymentTime { get; set; }
        /// <summary>
        /// �տ���
        /// </summary>
        /// <returns></returns>
        [Column("F_PAYMENTPRICE")]
        public decimal? F_PaymentPrice { get; set; }
        /// <summary>
        /// �տʽ
        /// </summary>
        /// <returns></returns>
        [Column("F_PAYMENTMODE")]
        public string F_PaymentMode { get; set; }
        /// <summary>
        /// �տ��˻�
        /// </summary>
        /// <returns></returns>
        [Column("F_PAYMENTACCOUNT")]
        public string F_PaymentAccount { get; set; }
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
            this.F_ReceivableId = Guid.NewGuid().ToString();
            this.F_CreateDate = DateTime.Now;
        }
        /// <summary>
        /// �༭����
        /// </summary>
        /// <param name="keyValue"></param>
        public void Modify(string keyValue)
        {
            this.F_ReceivableId = keyValue;
            this.F_ModifyDate = DateTime.Now;
        }
        #endregion
    }
}


