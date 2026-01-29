<%@ Page Title="" Language="C#" MasterPageFile="~/MasterDelegado/HomeDelegado.Master" AutoEventWireup="true" CodeBehind="InicioDelegado.aspx.cs" Inherits="CapaPresentacion.MasterDelegado.InicioDelegado" %>
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
            <h6 class="m-0 font-weight-bold text-white"><i class="fas fa-id-card mr-3"></i>PANEL DE REGISTRO DE VOTOS</h6>
        </div>
        <div class="card-body">

            <div class="row">
                <div class="col-sm-8">
                    <h6 class="mb-3 font-weight-bold text-primary text-center">Lista de mesas asignadas</h6>

                    <table class="table table-striped table-bordered table-hover table-sm" id="tbPendientes" cellspacing="0" style="width: 100%">
                        <thead class="thead-dark">
                            <tr>
                                <th>Id</th>
                                <th>Localidad / Recinto</th>
                                <%--<th>Recinto</th>--%>
                                <th>Nro Mesas</th>
                                <%--<th>Nro Inscritos</th>--%>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>

                <div class="col-sm-4">
                    <div class="card border-left-primary shadow h-100 py-2">
                        <div class="card-body">
                            <h6 class="mb-3 font-weight-bold text-primary text-center">Delegad@</h6>

                            <div class="input-group input-group-sm mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text font-weight-bold" id="inputGroupNroMesas">Nombre:</span>
                                </div>
                                <input type="text" class="form-control text-center font-weight-bold"
                                    aria-label="Small" aria-describedby="inputGroupNroMesas"
                                    id="txtNombrePac" disabled>
                            </div>

                            <div class="input-group input-group-sm mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text font-weight-bold" id="inputGroupNroInscritoss">Nro CI:</span>
                                </div>
                                <input type="text" class="form-control text-center"
                                    aria-label="Small" aria-describedby="inputGroupNroInscritoss"
                                    id="txtNroci" disabled>
                            </div>

                            <div class="input-group input-group-sm mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text font-weight-bold" id="inputGroupNroInscritocel">Nro Cel:</span>
                                </div>
                                <input type="text" class="form-control text-center"
                                    aria-label="Small" aria-describedby="inputGroupNroInscritocel"
                                    id="txtcelu" disabled>
                            </div>
                            <div class="input-group input-group-sm mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text font-weight-bold" id="inputGroupNroCorre">Correo:</span>
                                </div>
                                <input type="text" class="form-control text-center font-weight-bold"
                                    aria-label="Small" aria-describedby="inputGroupNroCorre"
                                    id="txtCorreode" disabled>
                            </div>
                        </div>
                    </div>
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
    <script src="jsdel/InicioDelegado.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
<%--<script src="jsdev/Inicio.js" type="text/javascript"></script>--%>
</asp:Content>
