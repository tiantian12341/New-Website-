using Sprann.Util;
using Pechkin;
using Pechkin.Synchronized;
using System.IO;

namespace Sprann.Application.Excel
{
    /// <summary>
    
    
    
    /// 日 期：2017.04.01
    /// 描 述：模板导出功能
    /// </summary>
    public class ModuleExportBLL: ModuleExportIBLL
    {
        /// <summary>
        /// 导出PDF
        /// </summary>
        /// <param name="html">html页面字串</param>
        public void ExportPDF(string html)
        {
            SynchronizedPechkin sc = new SynchronizedPechkin(new GlobalConfig().SetMargins(new System.Drawing.Printing.Margins(100, 100, 100, 100)));

            byte[] buf = sc.Convert(new ObjectConfig(), html);

            var ms = new MemoryStream(buf);
            FileDownHelper.DownLoad(ms, "报价单.pdf");
            ms.Close();
        }
    }
}

