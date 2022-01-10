using System;
using System.ComponentModel.DataAnnotations.Schema;
namespace Sprann.Application.CRM

{
    /// <summary>
    /// �� �� Learun-ADMS V7.0.0 ������ݿ������
    /// Copyright (c) 2013-2018 �Ϻ�������Ϣ�������޹�˾
    /// �� ������������Ա
    /// �� �ڣ�2017-07-11 14:20
    /// �� �����ֽ����
    /// </summary>
    public class CrmCashBalanceEntity 
    {
        #region ʵ���Ա
        /// <summary>
        /// �ֽ��������
        /// </summary>
        /// <returns></returns>
        [Column("F_CASHBALANCEID")]
        public string F_CashBalanceId { get; set; }
        /// <summary>
        /// ��������
        /// </summary>
        /// <returns></returns>
        [Column("F_OBJECTID")]
        public string F_ObjectId { get; set; }
        /// <summary>
        /// F_ExecutionDate
        /// </summary>
        /// <returns></returns>
        [Column("F_EXECUTIONDATE")]
        public DateTime? F_ExecutionDate { get; set; }
        /// <summary>
        /// F_CashAccount
        /// </summary>
        /// <returns></returns>
        [Column("F_CASHACCOUNT")]
        public string F_CashAccount { get; set; }
        /// <summary>
        /// F_Receivable
        /// </summary>
        /// <returns></returns>
        [Column("F_RECEIVABLE")]
        public decimal? F_Receivable { get; set; }
        /// <summary>
        /// F_Expenses
        /// </summary>
        /// <returns></returns>
        [Column("F_EXPENSES")]
        public decimal? F_Expenses { get; set; }
        /// <summary>
        /// F_Balance
        /// </summary>
        /// <returns></returns>
        [Column("F_BALANCE")]
        public decimal? F_Balance { get; set; }
        /// <summary>
        /// F_Abstract
        /// </summary>
        /// <returns></returns>
        [Column("F_ABSTRACT")]
        public string F_Abstract { get; set; }
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
            this.F_CashBalanceId = Guid.NewGuid().ToString();
            this.F_CreateDate = DateTime.Now;
        }
        /// <summary>
        /// �༭����
        /// </summary>
        /// <param name="keyValue"></param>
        public void Modify(string keyValue)
        {
            this.F_CashBalanceId = keyValue;
            this.F_ModifyDate = DateTime.Now;
        }
        #endregion
    }
}


