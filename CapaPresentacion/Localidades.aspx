<%@ Page Title="" Language="C#" MasterPageFile="~/SiteHome.Master" AutoEventWireup="true" CodeBehind="Localidades.aspx.cs" Inherits="CapaPresentacion.Localidades" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div class="card shadow mb-4">
        <div class="card-header bg-second-primary">
            <h6 class="m-0 font-weight-bold text-white"><i class="fas fa-store mr-3"></i>PANEL DE LOCALIDADES</h6>
        </div>
        <div class="card-body">

            <div class="row">
                <div class="col-sm-6">
                    <h6 class="mb-0 font-weight-bold text-primary">Lista Localidades</h6>
                </div>
                <div class="col-sm-6">
                    <button type="button" id="btnAddNuevoRegLoca" class="btn btn-success btn-sm mr-3"><i class="fas fa-store mr-2"></i>Registrar Localidad</button>
                </div>
            </div>

            <div class="row">
                <div class="col-sm-12">
                    <table class="table table-striped table-bordered table-sm" id="tbLocalida" cellspacing="0" style="width: 100%">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Localidad</th>
                                <th>Nro. Recintos</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    </div>

    <div class="modal fade" id="modalRegisLoca" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h6 id="myTituloLocal">Detalle</h6>
                    <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <input type="hidden" value="0" id="txtIdLocalidad">
                    <div class="input-group input-group-sm">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroupregilocal">Nombre Localidad:</span>
                        </div>
                        <input type="text" class="form-control text-left" aria-label="Small" aria-describedby="inputGroupregilocal"
                            id="txtNombreLocali">
                    </div>
                </div>
                <div class="modal-footer">
                    <button id="btnGuardarCambiosLo" class="btn btn-primary btn-sm" type="button">Guardar Cambios</button>
                    <button class="btn btn-danger btn-sm" type="button" data-dismiss="modal">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="jsdev/Localidades.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
<%--<script src="jsdev/Localidades.js" type="text/javascript"></script> --%>
</asp:Content>
