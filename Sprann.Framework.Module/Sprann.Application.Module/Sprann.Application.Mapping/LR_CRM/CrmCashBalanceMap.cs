using Sprann.Application.CRM;
using System.Data.Entity.ModelConfiguration;

namespace  Sprann.Application.Mapping
{
    /// <summary>
    /// �� �� Learun-ADMS V7.0.0 ������ݿ������
    /// Copyright (c) 2013-2018 �Ϻ�������Ϣ�������޹�˾
    /// �� ������������Ա
    /// �� �ڣ�2017-07-11 14:20
    /// �� �����ֽ����
    /// </summary>
    public class CrmCashBalanceMap : EntityTypeConfiguration<CrmCashBalanceEntity>
    {
        public CrmCashBalanceMap()
        {
            #region �������
            //��
            this.ToTable("LR_CRM_CASHBALANCE");
            //����
            this.HasKey(t => t.F_CashBalanceId);
            #endregion

            #region ���ù�ϵ
            #endregion
        }
    }
}


