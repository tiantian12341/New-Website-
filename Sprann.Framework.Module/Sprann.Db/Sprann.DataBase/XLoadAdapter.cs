using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sprann.DataBase
{
    /// <summary>
    /// 数据适配器，扩展Fill方法
    /// .NET的DataSet.Load方法，底层调用DataAdapter.Fill(DataTable[], IDataReader, int, int)
    /// Dapper想要返回DataSet，需要重写Load方法，不必传入DataTable[]，因为数组长度不确定
    /// </summary>
    public class XLoadAdapter : DataAdapter
    {
        public XLoadAdapter()
        {

        }
        public int FillFromReader(DataSet ds, IDataReader dataReader, int startRecord, int maxRecords)
        {
            return this.Fill(ds, "Table", dataReader, startRecord, maxRecords);
        }
    }
}
