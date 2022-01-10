using Sprann.Application.Base.SystemModule;
using Sprann.Cache.Base;
using Sprann.Cache.Factory;
using Sprann.Util;
using System;
using System.Collections.Generic;

namespace Sprann.Application.Base.AuthorizeModule
{
    /// <summary>
    /// 数据权限处理逻辑
    /// </summary>
    public class DataAuthorizeBLL : DataAuthorizeIBLL
    {
        private DataAuthorizeService dataAuthorizeService = new DataAuthorizeService();
        private ICache cache = CacheFactory.CaChe();
        private string cacheKey = "learun_adms_dataauthorize_";

        private InterfaceIBLL interfaceIBLL = new InterfaceBLL();

        #region 配置读取
        /// <summary>
        /// 获取数据处理条件配置
        /// </summary>
        /// <param name="relationId">��ϵ����</param>
        /// <returns></returns>
        public IEnumerable<DataAuthorizeConditionEntity> GetDataAuthorizeConditionList(string relationId)
        {
            try
            {
                IEnumerable<DataAuthorizeConditionEntity> list = cache.Read<IEnumerable<DataAuthorizeConditionEntity>>(cacheKey + relationId, CacheId.dataAuthorize);
                if (list == null)
                {
                    list = dataAuthorizeService.GetDataAuthorizeConditionList(relationId);
                    cache.Write<IEnumerable<DataAuthorizeConditionEntity>>(cacheKey + relationId, list, CacheId.dataAuthorize);
                }
                return list;
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowBusinessException(ex);
                }
            }
        }

        /// <summary>
        /// ��ȡ����Ȩ�޶�Ӧ��ϵ�����б�
        /// <param name="interfaceId">�ӿ�����</param>
        /// <summary>
        /// <returns></returns>
        public IEnumerable<DataAuthorizeRelationEntity> GetRelationList(string interfaceId)
        {
            try
            {
                IEnumerable<DataAuthorizeRelationEntity> list = cache.Read<IEnumerable<DataAuthorizeRelationEntity>>(cacheKey + interfaceId, CacheId.dataAuthorize);
                if (list == null)
                {
                    list = dataAuthorizeService.GetRelationList(interfaceId);
                    cache.Write<IEnumerable<DataAuthorizeRelationEntity>>(cacheKey + interfaceId, list, CacheId.dataAuthorize);
                }
                return list;
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowBusinessException(ex);
                }
            }
        }

        /// <summary>
        /// ��ȡ����Ȩ�޶�Ӧ��ϵ�����б�
        /// <param name="interfaceId">�ӿ�����</param>
        /// <param name="pagination">��ҳ����</param>
        /// <param name="keyword">��ѯ�ؼ���</param>
        /// <param name="objectId">��������</param>
        /// <summary>
        /// <returns></returns>
        public IEnumerable<DataAuthorizeRelationEntity> GetRelationPageList(Pagination pagination, string interfaceId, string keyword, string objectId)
        {
            try
            {
                return dataAuthorizeService.GetRelationPageList(pagination, interfaceId, keyword, objectId);
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowBusinessException(ex);
                }
            }
        }

        /// <summary>
        /// ��ȡ����Ȩ��������
        /// </summary>
        /// <param name="interfaceId">�ӿ�����</param>
        /// <param name="objectId">��Ӧ��ɫ���û�����</param>
        /// <returns></returns>
        public IEnumerable<DataAuthorizeConditionEntity> GetConditionList(string interfaceId, string objectId)
        {
            try
            {
                List<DataAuthorizeRelationEntity> list = (List<DataAuthorizeRelationEntity>)GetRelationList(interfaceId);
                DataAuthorizeRelationEntity relationEntity = list.Find(t => t.F_ObjectId == objectId);
                if (relationEntity != null)
                {
                    return GetDataAuthorizeConditionList(relationEntity.F_Id);
                }
                else
                {
                    return new List<DataAuthorizeConditionEntity>();
                }

            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowBusinessException(ex);
                }
            }
        }
        /// <summary>
        /// ��ȡʵ��
        /// </summary>
        /// <param name="keyValue">����</param>
        /// <returns></returns>
        public DataAuthorizeRelationEntity GetRelationEntity(string keyValue)
        {
            try
            {
                return dataAuthorizeService.GetRelationEntity(keyValue);
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowBusinessException(ex);
                }
            }
        }
        #endregion

        #region 配置删除与保存
        /// <summary>
        /// ɾ��ʵ������
        /// <param name="keyValue">����</param>
        /// <summary>
        /// <returns></returns>
        public void DeleteEntity(string keyValue)
        {

            try
            {
                var entity = dataAuthorizeService.GetRelationEntity(keyValue);
                cache.Remove(cacheKey + entity.F_InterfaceId, CacheId.dataAuthorize);
                cache.Remove(cacheKey + entity.F_Id, CacheId.dataAuthorize);
                dataAuthorizeService.DeleteEntity(keyValue);
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowBusinessException(ex);
                }
            }
        }


        /// <summary>
        /// 保存数据权限验证实体方法
        /// <param name="keyValue">数据权限键值</param>
        /// <summary>
        /// <returns></returns>
        public void SaveEntity(string keyValue, DataAuthorizeRelationEntity relationEntity, List<DataAuthorizeConditionEntity> conditionEntityList)
        {
            try
            {
                cache.Remove(cacheKey + relationEntity.F_InterfaceId, CacheId.dataAuthorize);
                cache.Remove(cacheKey + keyValue, CacheId.dataAuthorize);
                dataAuthorizeService.SaveEntity(keyValue, relationEntity, conditionEntityList);
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowBusinessException(ex);
                }
            }
        }

        #endregion

        #region SQL查询应用
        /// <summary>
        /// 设置接口地址的SQL过滤条件(超级管理员则忽略条件设置)
        /// </summary>
        /// <param name="url">基于站点根目录的接口地址</param>
        /// <returns></returns>
        public bool SetWhereSql(string url)
        {
            try
            {
                UserInfo userInfo = LoginUserInfo.Get();
                if (userInfo.isSystem)
                {
                    return true;
                }

                InterfaceEntity interfaceEntity = interfaceIBLL.GetEntityByUrl(url);
                if (interfaceEntity == null)
                {
                    return true;
                }
                else
                {
                    List<DataAuthorizeRelationEntity> relationList = (List<DataAuthorizeRelationEntity>)GetRelationList(interfaceEntity.F_Id);
                    if (relationList.Count <= 0)
                    {
                        return true;
                    }
                    else
                    {
                        #region 接口条件配置值存在
                        relationList = relationList.FindAll(t => t.F_ObjectId.Equals(userInfo.userId) || t.F_ObjectId.Like(userInfo.roleIds));
                        if (relationList.Count <= 0)
                        {
                            return false;
                        }
                        else
                        {
                            #region 符合当前用户或角色的条件配置

                            string whereSql = "";
                            DbWhere dbWhere = new DbWhere();
                            dbWhere.dbParameters = new List<FieldValueParam>();

                            int relationnum = 0;
                            foreach (var item in relationList)
                            {
                                if (whereSql != "")
                                {
                                    whereSql += " OR ";
                                }
                                whereSql += " ( ";
                                string strSql = "";
                                List<DataAuthorizeConditionEntity> conditionList = (List<DataAuthorizeConditionEntity>)GetDataAuthorizeConditionList(item.F_Id);

                                if (!string.IsNullOrEmpty(item.F_Formula))
                                {
                                    strSql = item.F_Formula;
                                    for (int i = 1; i < conditionList.Count + 1; i++)
                                    {
                                        strSql = strSql.Replace("" + i, "{@learun" + i + "learun@}");
                                    }
                                }
                                else
                                {
                                    for (int i = 1; i < conditionList.Count + 1; i++)
                                    {
                                        if (strSql != "")
                                        {
                                            strSql += " AND ";
                                        }
                                        strSql += " {@learun" + i + "learun@} ";
                                    }
                                }

                                int num = 1;

                                foreach (var conditionItem in conditionList)
                                {
                                    string strone = " " + conditionItem.F_FieldId;
                                    string value = " @" + conditionItem.F_FieldId + relationnum;

                                    FieldValueParam dbParameter = new FieldValueParam();
                                    dbParameter.name = conditionItem.F_FieldId + relationnum;
                                    dbParameter.value = getValue(conditionItem.F_FiledValueType, conditionItem.F_FiledValue);
                                    dbParameter.type = conditionItem.F_FieldType;
                                    dbWhere.dbParameters.Add(dbParameter);

                                    switch (conditionItem.F_Symbol)
                                    {
                                        case 1:// 等于
                                            strone += " = " + value;
                                            break;
                                        case 2:// 大于
                                            strone += " > " + value;
                                            break;
                                        case 3:// 大于等于
                                            strone += " >= " + value;
                                            break;
                                        case 4:// 小于
                                            strone += " < " + value;
                                            break;
                                        case 5:// 小于等于
                                            strone += " <= " + value;
                                            break;
                                        case 6:// 相似
                                            strone += " like %" + value + "%";
                                            break;
                                        case 7:// 包含(在集合中)
                                            strone += " in ( '" + value.Replace(",", "','") + "' )";
                                            break;
                                        case 8:// 不等于
                                            strone += " != " + value;
                                            break;
                                        case 9:// 不相似于
                                            strone += " not like %" + value + "%";
                                            break;
                                        case 10:// 不包含(不在集合中)
                                            strone += " not in ( '" + value.Replace(",", "','") + "' )";
                                            break;
                                        default:
                                            break;
                                    }
                                    strone += " ";
                                    strSql = strSql.Replace("{@learun" + num + "learun@}", strone);
                                    num++;
                                }

                                whereSql += strSql;
                                whereSql += " ) ";
                                relationnum++;
                            }
                            dbWhere.sql = whereSql;
                            WebHelper.AddHttpItems("DataAhthorCondition", dbWhere);

                            #endregion
                        }
                        #endregion
                    }
                }
                return true;
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowBusinessException(ex);
                }
            }
        }

        /// <summary>
        /// ���ò�ѯ���
        /// </summary>
        /// <returns></returns>
        public bool SetWhereSql()
        {
            UserInfo userInfo = LoginUserInfo.Get();
            if (userInfo.departmentIds != null)
            {
                string whereSql = string.Format(" CHARINDEX(F_DepartmentId,'{0}') > 0", string.Join(",", userInfo.departmentIds));
                DbWhere dbWhere = new DbWhere();
                dbWhere.sql = whereSql;
                WebHelper.AddHttpItems("DataAhthorCondition", dbWhere);
            }
            return true;
        }

        /// <summary>
        /// ��ȡ����
        /// </summary>
        /// <param name="type">��������</param>
        /// <param name="value">����ֵ</param>
        /// <returns></returns>
        private string getValue(int? type, string value)
        {
            UserInfo userInfo = LoginUserInfo.Get();
            //1.�ı�2.��¼��ID3.��¼���˺�4.��¼�߹�˾5.��¼�߲���6.��¼�߸�λ7.��¼�߽�ɫ
            string text = "";
            switch (type)
            {
                case 1:// �ı�
                    text = value;
                    break;
                case 2:// ��¼��ID
                    text = userInfo.userId;
                    break;
                case 3:// ��¼���˺�
                    text = userInfo.account;
                    break;
                case 4:// ��¼�߹�˾
                    text = userInfo.companyId;
                    break;
                case 41:// ��¼�߹�˾�������˾
                    foreach (var id in userInfo.companyIds)
                    {
                        if (text != "")
                        {
                            text += ",";
                        }
                        text += id;
                    }
                    break;
                case 5:// ��¼�߲���
                    text = userInfo.departmentId;
                    break;
                case 51:// ��¼�߲��ż��������
                    foreach (var id in userInfo.departmentIds)
                    {
                        if (text != "")
                        {
                            text += ",";
                        }
                        text += id;
                    }
                    break;
                case 6:// ��¼�߸�λ
                    text = userInfo.postIds;
                    break;
                case 7:// ��¼�߽�ɫ
                    text = userInfo.roleIds;
                    break;
                default:
                    text = value;
                    break;
            }
            return text;
        }
        #endregion
    }
}

