using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sprann.Application.Excel
{
    /// <summary>
    
    
    
    /// 日 期：2017.04.01
    /// 描 述：模板导出
    /// </summary>
    public interface ModuleExportIBLL
    {
        /// <summary>
        /// 导出PDF
        /// </summary>
        /// <param name="html">html页面字串</param>
        void ExportPDF(string html);
    }
}

