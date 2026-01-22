<%@ Page Title="" Language="C#" MasterPageFile="~/SiteHome.Master" AutoEventWireup="true" CodeBehind="Inicio.aspx.cs" Inherits="CapaPresentacion.Inicio" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        .input-reducido {
            width: 60px;
            /* Ajusta el valor según tus necesidades */
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div class="card shadow mb-4">
        <div class="card-header bg-second-primary">
            <h6 class="m-0 font-weight-bold text-white"><i class="fas fa-id-card mr-3"></i>PANEL DE ELECCIONES</h6>
        </div>
        <div class="card-body">
            <div class="form-row align-items-end">
                <input type="hidden" value="0" id="txtIdPerso">

                <div class="form-group col-sm-4">
                    <label for="txtNombrePac">Nombre Delegado:</label>
                    <input type="text" class="form-control form-control-sm" id="txtNombrePac" disabled>
                </div>

                <div class="form-group col-sm-4">
                    <label for="txtNroci">Nro CI:</label>
                    <input type="text" class="form-control form-control-sm" id="txtNroci" disabled>
                </div>
                <div class="form-group col-sm-4">
                    <label for="txtcelu">Celular:</label>
                    <input type="text" class="form-control form-control-sm" id="txtcelu" disabled>
                </div>

            </div>

            <h6 class="mb-3 font-weight-bold text-primary">Lista de mesas asignadas</h6>

            <div class="row">
                <div class="col-sm-12">
                    <table class="table table-striped table-bordered table-sm" id="tbPendientes" cellspacing="0" style="width: 100%">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Localidad</th>
                                <th>Recinto</th>
                                <th>Nro de Mesa</th>
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

    <div class="modal fade" id="modalVotacion" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static">
        <div class="modal-dialog" role="document">
            <div class="modal-content" id="loaddd">
                <div class="modal-header">
                    <h6>Lista de Partidos</h6>
                    <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <input type="hidden" value="0" id="txtIdEleccion">
                    <input type="hidden" value="0" id="txtIdMesa">
                    <input type="hidden" value="0" id="txtIdAsignacion">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-row">
                                <div class="input-group input-group-sm col-sm-4 mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="inputGroupTotalpa">Nulos:</span>
                                    </div>
                                    <input type="number" class="form-control text-right" aria-label="Small"
                                        aria-describedby="inputGroupTotalpa" id="txtTotalNulos">
                                </div>

                                <div class="input-group input-group-sm col-sm-4 mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="inputGroupDescuento">Blancos:</span>
                                    </div>
                                    <input type="number" class="form-control text-right" aria-label="Small"
                                        aria-describedby="inputGroupDescuento" id="txtTotalBlancos">
                                </div>
                                <div class="form-group col-sm-4">
                                    <button type="button" class="btn btn-primary btn-block btn-sm" id="btnRegistroVotos"><i class="fas fa-user-plus mr-2"></i>Registrar Votos</button>
                                </div>
                            </div>
                            <hr>
                            <div class="row">
                                <div class="col-sm-12">
                                    <table id="tbPartidosp" class="table table-sm table-striped">
                                        <thead>
                                            <tr>
                                                <th>Nombre</th>
                                                <th>Siglas</th>
                                                <th>Total Votos</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <!-- <a href="#" class="btn btn-primary btn-sm" target="_blank" id="linkImprimir">Imprimir</a> -->
                    <button class="btn btn-danger btn-sm" type="button" data-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="jsdev/Inicio.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
    <%--<script src="jsdev/Inicio.js" type="text/javascript"></script>--%>
</asp:Content>
