using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sprann.DataBase
{
    /// <summary>
    /// 扩展Load方法
    /// </summary>
    public class XDataSet : DataSet
    {
        public override void Load(IDataReader reader, LoadOption loadOption, FillErrorEventHandler handler, params DataTable[] tables)
        {
            XLoadAdapter adapter = new XLoadAdapter
            {
                FillLoadOption = loadOption,
                MissingSchemaAction = MissingSchemaAction.AddWithKey
            };
            if (handler != null)
            {
                adapter.FillError += handler;
            }
            adapter.FillFromReader(this, reader, 0, 0);
            if (!reader.IsClosed && !reader.NextResult())
            {
                reader.Close();
            }
        }
    }
}
