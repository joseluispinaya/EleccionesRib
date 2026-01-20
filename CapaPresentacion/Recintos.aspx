<%@ Page Title="" Language="C#" MasterPageFile="~/SiteHome.Master" AutoEventWireup="true" CodeBehind="Recintos.aspx.cs" Inherits="CapaPresentacion.Recintos" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div class="card shadow mb-4">
        <div class="card-header bg-second-primary">
            <h6 class="m-0 font-weight-bold text-white"><i class="fas fa-store mr-3"></i>PANEL DE RECINTOS</h6>
        </div>
        <div class="card-body">

            <div class="form-row align-items-end">

                <div class="form-group col-sm-4">
                    <label for="cboEleccion">Seleccione Eleccion</label>
                    <select class="form-control form-control-sm" id="cboEleccion">
                    </select>
                </div>

                <div class="form-group col-sm-4">
                    <label for="cboLocalida">Seleccione Localidad</label>
                    <select class="form-control form-control-sm" id="cboLocalida">
                    </select>
                </div>

                <div class="form-group text-center col-sm-4">
                    <button type="button" class="btn btn-success btn-sm" id="btnAddRecinton"><i class="fas fa-plus mr-2"></i>Nuevo Recinto</button>
                </div>

            </div>
            <hr />
            <h6 class="mb-3 font-weight-bold text-primary text-center">LISTA DE RECINTOS</h6>
            <div class="row">
                <div class="col-sm-12">
                    <table class="table table-striped table-bordered table-sm" id="tbRecintos" cellspacing="0" style="width: 100%">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nombre Recinto</th>
                                <th>Nro. de Mesas</th>
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

    <div class="modal fade" id="modalAddRecin" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h6 id="myTituloRecintoa">Agregar Recinto</h6>
                    <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <input type="hidden" value="0" id="txtIdRecintoReg">
                    <div class="form-row">

                        <div class="input-group input-group-sm col-sm-6 mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="inputGroupcodigoRe">:</span>
                            </div>
                            <input type="text" class="form-control text-right" aria-label="Small" aria-describedby="inputGroupcodigoRe"
                                id="txtEleccionRegi" disabled>
                        </div>

                        <div class="input-group input-group-sm col-sm-6 mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="inputGroupfecharRe">Para:</span>
                            </div>
                            <input type="text" class="form-control text-right" aria-label="Small" aria-describedby="inputGroupfecharRe"
                                id="txtLocalideRegi" disabled>
                        </div>

                    </div>

                    <div class="input-group input-group-sm">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGrouprerecin">Nombre del Recinto:</span>
                        </div>
                        <input type="text" class="form-control text-right" aria-label="Small" aria-describedby="inputGrouprerecin"
                            id="txtNombreRecintor">
                    </div>
                </div>
                <div class="modal-footer">
                    <button id="btnGuardarCambioReci" class="btn btn-primary btn-sm" type="button">Guardar Cambios</button>
                    <button class="btn btn-danger btn-sm" type="button" data-dismiss="modal">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
        <script src="jsdev/Recintos.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
<%--<script src="jsdev/Recintos.js" type="text/javascript"></script> --%>
</asp:Content>
