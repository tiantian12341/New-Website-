<%@ Page Language="C#" AutoEventWireup="true" Inherits="Sprann.WebReport.Viewer" %>
<%@ Register Assembly="DevExpress.XtraReports.v17.2.Web, Version=17.2.7.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" Namespace="DevExpress.XtraReports.Web" TagPrefix="dx" %>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0" />
    <title>查看报表</title>
    <script type="text/javascript" src="scripts/ClientFileDialogControl.js"></script>
    <script type="text/javascript" src="scripts/Script.js"></script>
</head>
<body>
<div class="content-wrapper">
    <div class="content">
        <form id="form1" runat="server">
            <dx:ASPxWebDocumentViewer ID="ASPxWebDocumentViewer1" runat="server">
            </dx:ASPxWebDocumentViewer>
        </form>
    </div>
</div>
</body>
</html>