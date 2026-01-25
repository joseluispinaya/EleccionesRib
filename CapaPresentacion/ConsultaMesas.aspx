<%@ Page Title="" Language="C#" MasterPageFile="~/SiteHome.Master" AutoEventWireup="true" CodeBehind="ConsultaMesas.aspx.cs" Inherits="CapaPresentacion.ConsultaMesas" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="vendor/select2/select2.min.css" rel="stylesheet">
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
            <h6 class="m-0 font-weight-bold text-white"><i class="fas fa-calendar mr-3"></i>PANEL DE CONSULTAS</h6>
        </div>
        <div class="card-body" id="cargann">
            <div class="row">
                <div class="col-sm-4">
                    <div class="input-group input-group-sm mb-3">
                        <div class="input-group-prepend">
                            <label class="input-group-text" for="cboEleccion">Eleccion</label>
                        </div>
                        <select class="custom-select" id="cboEleccion">
                        </select>
                    </div>
                </div>
                <div class="col-sm-4">
                    <div class="input-group input-group-sm mb-3">
                        <div class="input-group-prepend">
                            <label class="input-group-text" for="cboLocalida">Localidad</label>
                        </div>
                        <select class="custom-select" id="cboLocalida" disabled>
                        </select>
                    </div>
                </div>
                <div class="col-sm-4">
                    <div class="input-group input-group-sm mb-3">
                        <div class="input-group-prepend">
                            <label class="input-group-text" for="cboRecint">Recinto</label>
                        </div>
                        <select class="custom-select" id="cboRecint" disabled>
                        </select>
                    </div>
                </div>
            </div>

            <hr />
            <div class="row">
                <div class="col-sm-12">
                    <h6 class="mb-3 font-weight-bold text-primary text-center">Lista de Mesas Sin Resultados</h6>

                    <table class="table table-striped table-bordered table-hover table-sm" id="tbMesaSinResult" cellspacing="0" style="width: 100%">
                        <thead class="thead-dark">
                            <tr>
                                <th>Id</th>
                                <th>Nro de Mesa</th>
                                <th>Nombre Delegado</th>
                                <th>Celular</th>
                                <th>Estado</th>
                                <th>Accion</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colspan="6" class="text-center">Seleccione un recinto para ver los Detalles</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="modalAsignacion" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h6 id="myTituloAsig">Asignar Delegado</h6>
                    <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <input type="hidden" value="0" id="txtIdMesaAsignada">
                    <input type="hidden" value="0" id="txtIdPersom">
                    <div class="form-row">
                        <div class="input-group input-group-sm col-sm-7 mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="inputGroupRecinto">Recinto:</span>
                            </div>
                            <input type="text" class="form-control text-center" aria-label="Small" aria-describedby="inputGroupRecinto"
                                id="txtNomRecinto" disabled>
                        </div>
                        <div class="input-group input-group-sm col-sm-5 mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="inputGroupNromesa">Nro Mesa:</span>
                            </div>
                            <input type="text" class="form-control text-center" aria-label="Small" aria-describedby="inputGroupNromesa"
                                id="txtNroMesaAsig" disabled>
                        </div>
                    </div>

                    <div class="form-row align-items-end">
                        <div class="form-group col-sm-7">
                            <label for="cboBuscarPersom">Buscar Persona</label>
                            <select class="form-control form-control-sm" id="cboBuscarPersom">
                                <option value=""></option>
                            </select>
                        </div>
                        <div class="form-group col-sm-5">
                            <label for="txtNrocim">Nro CI:</label>
                            <input type="text" class="form-control form-control-sm" id="txtNrocim" disabled>
                        </div>
                    </div>

                    <div class="form-row align-items-end">
                        <div class="form-group col-sm-6">
                            <label for="txtNombrePacm">Nombre Delegado:</label>
                            <input type="text" class="form-control form-control-sm" id="txtNombrePacm" disabled>
                        </div>
                        <div class="form-group col-sm-3">
                            <button type="button" class="btn btn-success btn-block btn-sm" id="btnGuardarRegistro">
                                <i class="fas fa-plus-circle mr-2"></i>Registrar
                            </button>
                        </div>
                        <div class="form-group col-sm-3">
                            <button class="btn btn-danger btn-block btn-sm" type="button" data-dismiss="modal">Cancelar</button>
                        </div>
                    </div>

                </div>
                <div class="modal-footer">
                    <!-- <button id="btnGuardarRegistro" class="btn btn-primary btn-sm" type="button">Registrar</button> -->
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="modalVotacion" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static">
        <div class="modal-dialog" role="document">
            <div class="modal-content" id="loaddd">
                <div class="modal-header">
                    <h6 id="lblTituloVotacion">Registro Resultados</h6>
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
    <script src="vendor/select2/select2.min.js"></script>
    <script src="vendor/select2/es.min.js"></script>
    <script src="jsdev/ConsultaMesas.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
    <%--<script src="jsdev/ConsultaMesas.js" type="text/javascript"></script> --%>
</asp:Content>
