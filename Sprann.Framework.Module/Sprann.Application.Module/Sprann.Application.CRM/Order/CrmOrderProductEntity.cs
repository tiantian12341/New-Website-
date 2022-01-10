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
    public class CrmOrderProductEntity 
    {
        #region ʵ���Ա
        /// <summary>
        /// ������ϸ����
        /// </summary>
        /// <returns></returns>
        [Column("F_ORDERENTRYID")]
        public string F_OrderEntryId { get; set; }
        /// <summary>
        /// ��������
        /// </summary>
        /// <returns></returns>
        [Column("F_ORDERID")]
        public string F_OrderId { get; set; }
        /// <summary>
        /// ��ƷId
        /// </summary>
        /// <returns></returns>
        [Column("F_PRODUCTID")]
        public string F_ProductId { get; set; }
        /// <summary>
        /// ��Ʒ���
        /// </summary>
        /// <returns></returns>
        [Column("F_PRODUCTCODE")]
        public string F_ProductCode { get; set; }
        /// <summary>
        /// ��Ʒ����
        /// </summary>
        /// <returns></returns>
        [Column("F_PRODUCTNAME")]
        public string F_ProductName { get; set; }
        /// <summary>
        /// ��λ
        /// </summary>
        /// <returns></returns>
        [Column("F_UNITID")]
        public string F_UnitId { get; set; }
        /// <summary>
        /// ����
        /// </summary>
        /// <returns></returns>
        [Column("F_QTY")]
        public decimal? F_Qty { get; set; }
        /// <summary>
        /// ����
        /// </summary>
        /// <returns></returns>
        [Column("F_PRICE")]
        public decimal? F_Price { get; set; }
        /// <summary>
        /// ���
        /// </summary>
        /// <returns></returns>
        [Column("F_AMOUNT")]
        public decimal? F_Amount { get; set; }
        /// <summary>
        /// ��˰����
        /// </summary>
        /// <returns></returns>
        [Column("F_TAXPRICE")]
        public decimal? F_Taxprice { get; set; }
        /// <summary>
        /// ˰��
        /// </summary>
        /// <returns></returns>
        [Column("F_TAXRATE")]
        public decimal? F_TaxRate { get; set; }
        /// <summary>
        /// ˰��
        /// </summary>
        /// <returns></returns>
        [Column("F_TAX")]
        public decimal? F_Tax { get; set; }
        /// <summary>
        /// ��˰���
        /// </summary>
        /// <returns></returns>
        [Column("F_TAXAMOUNT")]
        public decimal? F_TaxAmount { get; set; }
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
        #endregion

        #region ��չ����
        /// <summary>
        /// ��������
        /// </summary>
        public void Create()
        {
            this.F_OrderEntryId = Guid.NewGuid().ToString();
        }
        /// <summary>
        /// �༭����
        /// </summary>
        /// <param name="keyValue"></param>
        public void Modify(string keyValue)
        {
            this.F_OrderEntryId = keyValue;
        }
        #endregion
    }
}


