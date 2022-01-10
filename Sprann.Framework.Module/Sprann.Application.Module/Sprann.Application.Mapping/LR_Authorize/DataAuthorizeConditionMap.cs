using Sprann.Application.Base.AuthorizeModule;
using System.Data.Entity.ModelConfiguration;

namespace Sprann.Application.Mapping
{
    /// <summary>
    /// �� �� Learun-ADMS V7.0.0 ������ݿ������
    /// Copyright (c) 2013-2018 �Ϻ�������Ϣ�������޹�˾
    /// �� ���������ܿ�����
    /// �� �ڣ�2017-06-21 16:30
    /// �� ��������Ȩ��
    /// </summary>
    public class DataAuthorizeConditionMap : EntityTypeConfiguration<DataAuthorizeConditionEntity>
    {
        public DataAuthorizeConditionMap()
        {
            #region �������
            //��
            this.ToTable("LR_BASE_DATACONDITION");
            //����
            this.HasKey(t => t.F_Id);
            #endregion

            #region ���ù�ϵ
            #endregion
        }
    }
}


