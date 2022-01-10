using Sprann.Application.CRM;
using System.Data.Entity.ModelConfiguration;

namespace  Sprann.Application.Mapping
{
    /// <summary>
    /// �� �� Learun-ADMS V7.0.0 ������ݿ������
    /// Copyright (c) 2013-2018 �Ϻ�������Ϣ�������޹�˾
    /// �� ������������Ա
    /// �� �ڣ�2017-07-11 09:43
    /// �� �����ͻ�����
    /// </summary>
    public class CrmCustomerMap : EntityTypeConfiguration<CrmCustomerEntity>
    {
        public CrmCustomerMap()
        {
            #region �������
            //��
            this.ToTable("LR_CRM_CUSTOMER");
            //����
            this.HasKey(t => t.F_CustomerId);
            #endregion

            #region ���ù�ϵ
            #endregion
        }
    }
}


