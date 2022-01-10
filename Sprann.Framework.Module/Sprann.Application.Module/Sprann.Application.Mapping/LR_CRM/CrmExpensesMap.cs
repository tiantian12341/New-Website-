using Sprann.Application.CRM;
using System.Data.Entity.ModelConfiguration;

namespace  Sprann.Application.Mapping
{
    /// <summary>
    /// �� �� Learun-ADMS V7.0.0 ������ݿ������
    /// Copyright (c) 2013-2018 �Ϻ�������Ϣ�������޹�˾
    /// �� ������������Ա
    /// �� �ڣ�2017-07-11 14:28
    /// �� ��������֧��
    /// </summary>
    public class CrmExpensesMap : EntityTypeConfiguration<CrmExpensesEntity>
    {
        public CrmExpensesMap()
        {
            #region �������
            //��
            this.ToTable("LR_CRM_EXPENSES");
            //����
            this.HasKey(t => t.F_ExpensesId);
            #endregion

            #region ���ù�ϵ
            #endregion
        }
    }
}


