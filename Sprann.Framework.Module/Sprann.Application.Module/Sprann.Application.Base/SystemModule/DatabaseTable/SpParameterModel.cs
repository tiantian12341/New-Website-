using System;

namespace Sprann.Application.Base.SystemModule
{
    /// <summary>
    /// 存储过程参数模型
    /// 2018-12-28 Ridge W.
    /// </summary>
    public class SpParameterModel
    {
        /// <summary>
        /// 参数名称
        /// </summary>
        public string name { get; set; }

        /// <summary>
        /// 参数值
        /// </summary>
        public string value { get; set; }

        /// <summary>
        /// 存储过程参数类型（默认不设置则为字符型)
        /// </summary>
        public string type { get; set; }

        /// <summary>
        /// 获取存储过程的实际传值参数
        /// </summary>
        /// <returns></returns>
        public object GetParameterValue()
        {
            if (string.IsNullOrEmpty(type))
            {
                return value;
            }
            else
            {
                switch (type)
                {
                    case "int":
                        return Convert.ToInt32(value);
                    case "long":
                        return Convert.ToInt64(value);
                    case "guid":
                        return Guid.Parse(value);
                    case "datetime":
                        return Convert.ToDateTime(value);
                    case "bool":
                        return value == "true" || value == "1";
                    default:
                        break;
                }
                return value;
            }
        }
    }
}
