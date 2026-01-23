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
                                <th>Nro Inscritos</th>
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
                    <h6>Registro Resultados</h6>
                    <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <input type="hidden" value="0" id="txtIdMesa">
                    <input type="hidden" value="0" id="txtIdAsignacion">

                    <div class="form-row">
                        <div class="input-group input-group-sm col-sm-6 mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="inputGroupVotosNulos">Votos Nulos:</span>
                            </div>
                            <input type="number" class="form-control text-center" aria-label="Small" aria-describedby="inputGroupVotosNulos"
                                id="txtTotalNulos" autocomplete="off" placeholder="Ej: 10">
                        </div>

                        <div class="input-group input-group-sm col-sm-6 mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="inputGroupVotosBlanco">Votos en Blanco:</span>
                            </div>
                            <input type="number" class="form-control text-center" aria-label="Small" aria-describedby="inputGroupVotosBlanco"
                                id="txtTotalBlancos" autocomplete="off" placeholder="Ej: 10">
                        </div>
                    </div>

                    <div class="form-group mb-3">
                        <label for="txtObservacion">Observacion</label>
                        <textarea class="form-control" rows="2" id="txtObservacion"></textarea>
                    </div>

                    <div class="row">
                        <div class="col-sm-12">
                            <table id="tbPartidosp" class="table table-sm table-striped">
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Sigla</th>
                                        <th>Total Votos</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button id="btnRegistroVotos" class="btn btn-primary btn-sm" type="button"><i class="fas fa-user-plus mr-2"></i>Registrar Votos</button>
                    <button class="btn btn-danger btn-sm" type="button" data-dismiss="modal"><i class="fas fa-window-close mr-2"></i>Cancelar</button>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="jsdev/Inicio.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
    <%--<script src="jsdev/Inicio.js" type="text/javascript"></script>--%>
</asp:Content>
