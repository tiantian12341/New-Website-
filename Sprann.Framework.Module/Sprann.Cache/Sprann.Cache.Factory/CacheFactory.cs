using System;
using Sprann.Cache.Base;
using Sprann.Cache.Redis;
using System.Runtime.Caching;
using Sprann.Util;
using System.Web;
using System.Collections;
using System.Configuration;

namespace Sprann.Cache.Factory
{
    /// <summary>
    
    
    
    /// 日 期：2017.03.06
    /// 描 述：定义缓存工厂类
    /// </summary>
    public class CacheFactory
    {
        public static ICache CaChe()
        {
            //没有配置则使用Redis缓存，默认的
            bool useRedisCache = Convert.ToBoolean(ConfigurationManager.AppSettings["SPRANN.MesPortal.RedisCache"] ?? "true");//Redis缓存
            if (useRedisCache)
                return new CacheByRedis();
            else
                return new SystemMemoryCache();
        }
    }

    /// <summary>
    /// 系统内存缓存实现
    /// <para>Ridge, 2018-12-20</para>
    /// </summary>
    public class SystemMemoryCache : ICache
    {
        System.Collections.ArrayList keyList = new ArrayList();

        public T Read<T>(string cacheKey, long dbId = 0) where T : class
        {
            var cacheContainer = MemoryCache.Default;
            if (cacheContainer.Contains(cacheKey))
            {
                return cacheContainer[cacheKey].As<T>();
            }
            else
            {
                return default(T);
            }
        }

        public void Remove(string cacheKey, long dbId = 0)
        {
            keyList.Remove(cacheKey);
            var cacheContainer = MemoryCache.Default;
            if (cacheContainer.Contains(cacheKey))
            {
                cacheContainer.Remove(cacheKey);
            }
        }

        public void RemoveAll(long dbId = 0)
        {
            #region Web模式缓存
            System.Web.Caching.Cache _cache = HttpRuntime.Cache;
            if (_cache != null)
            {
                IDictionaryEnumerator CacheEnum = _cache.GetEnumerator();
                if (_cache.Count > 0)
                {
                    ArrayList al = new ArrayList();
                    while (CacheEnum.MoveNext())
                    {
                        al.Add(CacheEnum.Key);
                    }
                    foreach (string key in al)
                    {
                        _cache.Remove(key);
                    }
                }
            }
            #endregion

            foreach (var item in keyList)
            {
                MemoryCache.Default.Remove(item.ToString());
            }
            keyList.Clear();
        }

        public void Write<T>(string cacheKey, T value, long dbId = 0) where T : class
        {
            if (!keyList.Contains(cacheKey))
                keyList.Add(cacheKey);

            var cacheContainer = MemoryCache.Default;
            var policy = new CacheItemPolicy();
            policy.Priority = CacheItemPriority.NotRemovable;
            cacheContainer.Set(new CacheItem(cacheKey, value), policy);
        }

        public void Write<T>(string cacheKey, T value, DateTime expireTime, long dbId = 0) where T : class
        {
            if (!keyList.Contains(cacheKey))
                keyList.Add(cacheKey);

            var cacheContainer = MemoryCache.Default;
            cacheContainer.Set(cacheKey, value, new DateTimeOffset(expireTime));
        }

        public void Write<T>(string cacheKey, T value, TimeSpan timeSpan, long dbId = 0) where T : class
        {
            if (!keyList.Contains(cacheKey))
                keyList.Add(cacheKey);

            var cacheContainer = MemoryCache.Default;
            var policy = new CacheItemPolicy();
            policy.Priority = CacheItemPriority.Default;
            policy.SlidingExpiration = timeSpan;
            cacheContainer.Set(new CacheItem(cacheKey, value), policy);
        }
    }
}

