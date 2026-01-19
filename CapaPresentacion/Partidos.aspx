<%@ Page Title="" Language="C#" MasterPageFile="~/SiteHome.Master" AutoEventWireup="true" CodeBehind="Partidos.aspx.cs" Inherits="CapaPresentacion.Partidos" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="vendor/bootstrap-colorpicker/css/bootstrap-colorpicker.min.css" rel="stylesheet">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div class="card shadow mb-4">
        <div class="card-header bg-second-primary">
            <h6 class="m-0 font-weight-bold text-white"><i class="fas fa-store mr-3"></i>PANEL DE PARTIDOS POLITICOS</h6>
        </div>
        <div class="card-body">
            <div class="row justify-content-center mb-4">
                <button type="button" id="btnAddNuevoReg" class="btn btn-success btn-sm mr-3"><i class="fas fa-store mr-2"></i>Nuevo Registro</button>
            </div>

            <div class="row">
                <div class="col-sm-12">
                    <table class="table table-striped table-bordered table-sm" id="tbPartidos" cellspacing="0" style="width: 100%">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Logo</th>
                                <th>Nombre</th>
                                <th>Sigla</th>
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

    <div class="modal fade" id="modalData" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h6 id="myTitulop">Detalle Partidos</h6>
                    <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <input type="hidden" value="0" id="txtIdPartido">
                    <div class="form-row">
                        <div class="form-group col-sm-12">
                            <label for="txtNombre">Nombre</label>
                            <input type="text" class="form-control form-control-sm input-validar" id="txtNombre" name="Nombre">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-7">
                            
                            <div class="form-row">
                                <div class="form-group col-sm-6">
                                    <label for="txtSigla">Siglas</label>
                                    <input type="text" class="form-control form-control-sm input-validar" id="txtSigla" name="Sigla">
                                </div>
                                <div class="form-group col-sm-6">
                                    <label for="cboEstado">Estado</label>
                                    <select class="form-control form-control-sm" id="cboEstado">
                                        <option value="1">Activo</option>
                                        <option value="0">No Activo</option>
                                    </select>
                                </div>
                            </div>
                            <%--<div class="form-group">
                                <label>Color del Partido</label>
                                <input type="text" class="colorpicker-default form-control" value="#8fff00">
                            </div>--%>

                            <%--<div class="form-group">
                                <label>Color del Partido Ia</label>
                                <div class="colorpicker-default input-group">

                                    <input type="text" id="txtColor" readonly="readonly" value="" class="form-control">

                                    <span class="input-group-append add-on">
                                        <button class="btn btn-secondary" type="button">
                                            <i style="background-color: rgb(124, 66, 84); margin-top: 2px;"></i>
                                        </button>
                                    </span>
                                </div>
                            </div>--%>

                            <div class="form-group">
                                <label>Color del Partido</label>
                                <div data-color-format="rgb" data-color="rgb(255, 146, 180)" class="colorpicker-default input-group">
                                    <input type="text" id="txtColor" readonly="readonly" value="" class="form-control">
                                    <span class="input-group-append add-on">
                                        <button class="btn btn-secondary" type="button">
                                            <i style="background-color: rgb(124, 66, 84); margin-top: 2px;"></i>
                                        </button>
                                    </span>
                                </div>
                            </div>
                            
                        </div>
                        <div class="col-sm-5 text-center">
                            
                            <img id="imgLogo" src="Imagenes/sinimagen.png" alt="Foto usuario" style="height: 130px; max-width: 130px; border-radius: 50%;">
                            <!-- <img id="imgUsuario" style="max-width:200px;" src="Imagenes/sinimagen.png" class="rounded mx-auto d-block" alt="Foto usuario"> -->
                        </div>

                    </div>
                    <div class="form-row">
                        <div class="form-group col-sm-12">
                            <%--<label for="txtFoto">Foto</label>--%>
                            <input class="form-control-file" type="file" id="txtFoto" accept="image/*" />
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
    <script src="vendor/bootstrap-colorpicker/js/bootstrap-colorpicker.min.js"></script>
    <script src="jsdev/Partidos.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
    <%--<script src="jsdev/PagePartidos.js" type="text/javascript"></script>--%>
</asp:Content>
