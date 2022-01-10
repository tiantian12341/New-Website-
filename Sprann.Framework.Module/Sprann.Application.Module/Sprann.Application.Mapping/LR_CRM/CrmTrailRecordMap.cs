using Sprann.Application.CRM;
using System.Data.Entity.ModelConfiguration;

namespace  Sprann.Application.Mapping
{
    /// <summary>
    /// �� �� Learun-ADMS V7.0.0 ������ݿ������
    /// Copyright (c) 2013-2018 �Ϻ�������Ϣ�������޹�˾
    /// �� ������������Ա
    /// �� �ڣ�2017-07-11 11:20
    /// �� ����������¼
    /// </summary>
    public class CrmTrailRecordMap : EntityTypeConfiguration<CrmTrailRecordEntity>
    {
        public CrmTrailRecordMap()
        {
            #region �������
            //��
            this.ToTable("LR_CRM_TRAILRECORD");
            //����
            this.HasKey(t => t.F_TrailId);
            #endregion

            #region ���ù�ϵ
            #endregion
        }
    }
}


