<%@ Page Language="C#" AutoEventWireup="true" Inherits="Sprann.WebReport.ReportDesigner" %>
<%@ Register assembly="DevExpress.XtraReports.v17.2.Web, Version=17.2.7.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" namespace="DevExpress.XtraReports.Web" tagprefix="dx" %>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>报表设计</title>
</head>
<body>
    <div><form id="form1" runat="server">
        <dx:ASPxReportDesigner ID="ASPxReportDesigner" runat="server">
        </dx:ASPxReportDesigner>
      </form>
    </div>
</body>
</html>
