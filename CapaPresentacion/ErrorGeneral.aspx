<%@ Page Title="" Language="C#" MasterPageFile="~/SiteHome.Master" AutoEventWireup="true" CodeBehind="ErrorGeneral.aspx.cs" Inherits="CapaPresentacion.ErrorGeneral" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div class="text-center">
        <div class="error mx-auto" data-text="500">500</div>
        <p class="lead text-gray-800 mb-5">Ocurrio un error</p>
        <p class="text-gray-500 mb-0">Parece que encontraste un fallo en la matriz....</p>
        <a href="Inicio.aspx">&larr; Volver a Inicio</a>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
</asp:Content>
