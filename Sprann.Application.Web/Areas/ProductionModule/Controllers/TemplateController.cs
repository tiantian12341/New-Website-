using Newtonsoft.Json;
using Sprann.DataBase.Repository;
using Sprann.Util;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Web.Mvc;

namespace Sprann.Application.Web.Areas.ProductionModule.Controllers
{
    [HandlerLogin(FilterMode.Ignore)]
    public class TemplateController : MvcControllerBase
    {
        public ActionResult Kanban()
        {
            return View();
        }

        public ActionResult UpdateTableData(string requestParam)
        {
            try
            {
                var execParam = requestParam.ToJObject();
                var commandText = string.Empty;
                var postKey = execParam["postKey"] != null ? JsonConvert.DeserializeObject<Dictionary<string, string>>(execParam["postKey"].ToString()) : null;
                var postValue = JsonConvert.DeserializeObject<Dictionary<string, string>>(execParam["postValue"].ToString());
                var updateKeys = string.Empty;
                var updateFileds = string.Empty;

                if (postKey != null)
                {
                    foreach (var item in postKey)
                    {
                        updateKeys += $" AND {item.Key} = '{item.Value}' \r";
                    }

                    foreach (var item in postValue)
                    {
                        updateFileds += $" {item.Key} = '{item.Value}',";
                    }
                    updateFileds = updateFileds.Substring(0, updateFileds.Length - 1);

                    commandText = $" UPDATE {execParam["table"]} SET {updateFileds} WHERE 1 = 1 {updateKeys} ";
                }
                else
                {
                    var insertFiled = string.Empty;
                    var insertValue = string.Empty;
                    foreach (var item in postValue)
                    {
                        insertFiled += item.Key + ",";
                        insertValue += $"'{item.Value}',";
                    }
                    insertFiled = insertFiled.Substring(0, insertFiled.Length - 1);
                    insertValue = insertValue.Substring(0, insertValue.Length - 1);

                    commandText = $" INSERT INTO {execParam["table"]}({insertFiled}) SELECT {insertValue} ";
                }

                var affected = new RepositoryFactory().BaseRepository("MesDb").ExecuteBySql(commandText);

                return Success("保存成功");
            }
            catch (Exception ex)
            {
                return Fail(ex.Message);
            }
        }

        [HttpPost, ValidateInput(false)]
        public void ExportExcel(string fileName, string columnJson, string queryJson, string exportField)
        {
            ExcelConfig excelconfig = new ExcelConfig();
            excelconfig.Title = Server.UrlDecode(fileName);
            excelconfig.TitleFont = "微软雅黑";
            excelconfig.TitlePoint = 15;
            excelconfig.FileName = Server.UrlDecode(fileName) + ".xls";
            excelconfig.IsAllSizeColumn = true;
            excelconfig.ColumnEntity = new List<ColumnModel>();

            List<jfGridModel> columnList = columnJson.ToList<jfGridModel>();

            var queryParam = queryJson.ToJObject();
            var commandText = string.Empty;

            switch (fileName)
            {
                case "团队建设":
                    break;
                case "项目节点":
                    break;
                default:
                    break;
            }

            var data = new RepositoryFactory().BaseRepository("MesDb").FindTable(commandText);

            Dictionary<string, string> exportFieldMap = new Dictionary<string, string>();
            if (!string.IsNullOrEmpty(exportField))
            {
                string[] exportFields = exportField.Split(',');
                foreach (var field in exportFields)
                {
                    if (!exportFieldMap.ContainsKey(field))
                    {
                        exportFieldMap.Add(field, "1");
                    }
                }
            }

            foreach (jfGridModel columnModel in columnList)
            {
                if (exportFieldMap.ContainsKey(columnModel.name) || string.IsNullOrEmpty(exportField))
                {
                    excelconfig.ColumnEntity.Add(new ColumnModel()
                    {
                        Column = columnModel.name,  //英文字段
                        ExcelColumn = columnModel.label,//中文标题
                        Alignment = columnModel.align,
                    });
                }
            }
            ExcelHelper.ExcelDownload(data, excelconfig);
        }
    }
}
