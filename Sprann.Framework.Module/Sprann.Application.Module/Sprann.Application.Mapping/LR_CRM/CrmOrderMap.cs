using Sprann.Application.CRM;
using System.Data.Entity.ModelConfiguration;

namespace  Sprann.Application.Mapping
{
    /// <summary>
    /// �� �� Learun-ADMS V7.0.0 ������ݿ������
    /// Copyright (c) 2013-2018 �Ϻ�������Ϣ�������޹�˾
    /// �� ������������Ա
    /// �� �ڣ�2017-07-10 17:59
    /// �� ������������
    /// </summary>
    public class LR_CRM_OrderMap : EntityTypeConfiguration<CrmOrderEntity>
    {
        public LR_CRM_OrderMap()
        {
            #region �������
            //��
            this.ToTable("LR_CRM_ORDER");
            //����
            this.HasKey(t => t.F_OrderId);
            #endregion

            #region ���ù�ϵ
            #endregion
        }
    }
}


