<%@ Page Title="" Language="C#" MasterPageFile="~/SiteHome.Master" AutoEventWireup="true" CodeBehind="Personas.aspx.cs" Inherits="CapaPresentacion.Personas" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div class="card shadow mb-4">
        <div class="card-header bg-second-primary">
            <h6 class="m-0 font-weight-bold text-white"><i class="fas fa-id-card mr-3"></i>PANEL DE REGISTRO DE PERSONAL</h6>
        </div>
        <div class="card-body">
            <div class="row justify-content-center mb-4">
                <button type="button" id="btnAddNuevoReg" class="btn btn-success btn-sm mr-3"><i class="fas fa-user-plus mr-2"></i>Nuevo Registro</button>
            </div>

            <div class="row">
                <div class="col-sm-12">
                    <table class="table table-bordered table-sm" id="tbPersonas" cellspacing="0" style="width: 100%">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nombre Completo</th>
                                <th>Nro CI</th>
                                <th>Celular</th>
                                <th>Correo</th>
                                <th>Estado</th>
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

    <div class="modal fade" id="modalPersona" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h6 id="myTitulodr">Detalle</h6>
                    <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <input type="hidden" value="0" id="txtIdPersona">
                    <div class="row">
                        <div class="col-sm-12">

                            <div class="form-row">
                                <div class="form-group col-sm-8">
                                    <label for="txtNombre">Nombre Completo</label>
                                    <input type="text" class="form-control form-control-sm input-validar" id="txtNombre" name="Nombres">
                                </div>
                                <div class="form-group col-sm-4">
                                    <label for="txtnroci">Nro CI</label>
                                    <input type="text" class="form-control form-control-sm input-validar" id="txtnroci" name="Nro ci">
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="form-group col-sm-6">
                                    <label for="txtCelular">Celular</label>
                                    <input type="text" class="form-control form-control-sm input-validar" id="txtCelular" name="Celular">
                                </div>
                                <div class="form-group col-sm-6">
                                    <label for="cboEstado">Estado</label>
                                    <select class="form-control form-control-sm" id="cboEstado">
                                        <option value="1">Activo</option>
                                        <option value="0">No Activo</option>
                                    </select>
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="form-group col-sm-6">
                                    <label for="txtCorreo">Correo</label>
                                    <input type="text" class="form-control form-control-sm input-validar" id="txtCorreo" name="Correo">
                                </div>
                                <div class="form-group col-sm-6">
                                    <label for="txtClave">Contraseña</label>
                                    <input type="text" class="form-control form-control-sm input-validar" id="txtClave" name="Contraseña">
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button id="btnGuardarCambios" class="btn btn-primary btn-sm" type="button">Guardar</button>
                    <button class="btn btn-danger btn-sm" type="button" data-dismiss="modal">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="jsdev/Personas.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
    <%--<script src="jsdev/Personas.js" type="text/javascript"></script> --%>
</asp:Content>
