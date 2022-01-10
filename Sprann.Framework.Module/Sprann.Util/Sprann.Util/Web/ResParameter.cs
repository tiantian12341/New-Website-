namespace Sprann.Util
{
    /// <summary>
    
    
    
    /// 日 期：2017.03.08
    /// 描 述：接口响应数据
    /// </summary>
    public class ResParameter
    {
        /// <summary>
        /// 接口响应码
        /// </summary>
        public ResponseCode code { get; set; }
        /// <summary>
        /// 接口响应消息
        /// </summary>
        public string info { get; set; }
        /// <summary>
        /// 接口响应数据
        /// </summary>
        public object data { get; set; }
    }
}

