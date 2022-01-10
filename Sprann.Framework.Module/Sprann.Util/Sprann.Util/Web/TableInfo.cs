using System.Collections.Generic;
using System.Data;

namespace Sprann.Util
{
    public class TableInfo
    {
        public TableColumn[] columns { get; set; }

        public static TableInfo GetFromDataTable(DataTable tab)
        {
            TableInfo info = new TableInfo();
            List<TableColumn> cols = new List<TableColumn>();
            foreach (DataColumn col in tab.Columns)
            {
                cols.Add(new TableColumn { name = col.ColumnName, label = col.Caption, type = col.DataType.ToString() });
            }
            info.columns = cols.ToArray();
            return info;
        }
    }

    public class TableColumn
    {
        public string label { get; set; }

        public string name { get; set; }

        public string type { get; set; }
    }
}
