using Sprann.Util;
using System.Collections.Generic;

namespace Sprann.Application.Base.AuthorizeModule
{
    /// <summary>
    /// 数据权限验证处理接口
    /// </summary>
    public interface DataAuthorizeIBLL
    {
        #region 读取数据验证配置
        /// <summary>
        /// ��ȡ�����б�����
        /// </summary>
        /// <param name="relationId">��ϵ����</param>
        /// <returns></returns>
        IEnumerable<DataAuthorizeConditionEntity> GetDataAuthorizeConditionList(string relationId);
        /// <summary>
        /// ��ȡ����Ȩ�޶�Ӧ��ϵ�����б�
        /// <param name="moduleId">ģ������</param>
        /// <summary>
        /// <returns></returns>
        IEnumerable<DataAuthorizeRelationEntity> GetRelationList(string moduleId);
        /// <summary>
        /// ��ȡ����Ȩ�޶�Ӧ��ϵ�����б�
        /// <param name="moduleId">ģ������</param>
        /// <param name="pagination">��ҳ����</param>
        /// <param name="keyword">��ѯ�ؼ���</param>
        /// <param name="objectId">��������</param>
        /// <summary>
        /// <returns></returns>
        IEnumerable<DataAuthorizeRelationEntity> GetRelationPageList(Pagination pagination, string moduleId, string keyword, string objectId);
        /// <summary>
        /// ��ȡ����Ȩ��������
        /// </summary>
        /// <param name="moduleId">����ģ������</param>
        /// <param name="objectId">��Ӧ��ɫ���û�����</param>
        /// <returns></returns>
        IEnumerable<DataAuthorizeConditionEntity> GetConditionList(string moduleId, string objectId);
        /// <summary>
        /// ��ȡʵ��
        /// </summary>
        /// <param name="keyValue">����</param>
        /// <returns></returns>
        DataAuthorizeRelationEntity GetRelationEntity(string keyValue);
        #endregion

        #region 删除与保存
        /// <summary>
        /// ɾ��ʵ������
        /// <param name="keyValue">����</param>
        /// <summary>
        /// <returns></returns>
        void DeleteEntity(string keyValue);
        /// <summary>
        /// ����ʵ�����ݣ��������޸ģ�
        /// <param name="keyValue">����</param>
        /// <summary>
        /// <returns></returns>
        void SaveEntity(string keyValue, DataAuthorizeRelationEntity relationEntity, List<DataAuthorizeConditionEntity> conditionEntityList);
        #endregion

        #region 过滤条件验证
        /// <summary>
        /// 判断当前接口是否需要加载数据权限
        /// </summary>
        /// <param name="url">当前基于根目录的完整路径</param>
        /// <returns></returns>
        bool SetWhereSql(string url);
        #endregion
    }
}

