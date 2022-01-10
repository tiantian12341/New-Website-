using System;
using System.ComponentModel.DataAnnotations.Schema;
namespace Sprann.Application.CRM

{
    /// <summary>
    /// �� �� Learun-ADMS V7.0.0 ������ݿ������
    /// Copyright (c) 2013-2018 �Ϻ�������Ϣ�������޹�˾
    /// �� ������������Ա
    /// �� �ڣ�2017-07-11 14:28
    /// �� ��������֧��
    /// </summary>
    public class CrmExpensesEntity 
    {
        #region ʵ���Ա
        /// <summary>
        /// ֧������
        /// </summary>
        /// <returns></returns>
        [Column("F_EXPENSESID")]
        public string F_ExpensesId { get; set; }
        /// <summary>
        /// ֧������
        /// </summary>
        /// <returns></returns>
        [Column("F_EXPENSESDATE")]
        public DateTime? F_ExpensesDate { get; set; }
        /// <summary>
        /// ֧�����
        /// </summary>
        /// <returns></returns>
        [Column("F_EXPENSESPRICE")]
        public decimal? F_ExpensesPrice { get; set; }
        /// <summary>
        /// ֧���˻�
        /// </summary>
        /// <returns></returns>
        [Column("F_EXPENSESACCOUNT")]
        public string F_ExpensesAccount { get; set; }
        /// <summary>
        /// ֧������
        /// </summary>
        /// <returns></returns>
        [Column("F_EXPENSESTYPE")]
        public string F_ExpensesType { get; set; }
        /// <summary>
        /// ֧��ժҪ
        /// </summary>
        /// <returns></returns>
        [Column("F_EXPENSESABSTRACT")]
        public string F_ExpensesAbstract { get; set; }
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
        /// <summary>
        /// F_ExpensesObject
        /// </summary>
        /// <returns></returns>
        [Column("F_EXPENSESOBJECT")]
        public int? F_ExpensesObject { get; set; }
        /// <summary>
        /// ������
        /// </summary>
        /// <returns></returns>
        [Column("F_MANAGERS")]
        public string F_Managers { get; set; }
        #endregion

        #region ��չ����
        /// <summary>
        /// ��������
        /// </summary>
        public void Create()
        {
            this.F_ExpensesId = Guid.NewGuid().ToString();
            this.F_CreateDate = DateTime.Now;
        }
        /// <summary>
        /// �༭����
        /// </summary>
        /// <param name="keyValue"></param>
        public void Modify(string keyValue)
        {
            this.F_ExpensesId = keyValue;
            this.F_ModifyDate = DateTime.Now;
        }
        #endregion
    }
}


