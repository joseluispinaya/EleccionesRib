<%@ Page Title="" Language="C#" MasterPageFile="~/SiteHome.Master" AutoEventWireup="true" CodeBehind="Delegados.aspx.cs" Inherits="CapaPresentacion.Delegados" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="vendor/select2/select2.min.css" rel="stylesheet">
    <style>
        /*.select2 {
            width: 100% !important;
        }*/

        .textocenter {
            text-align: center;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div class="card shadow mb-4">
        <div class="card-header bg-second-primary">
            <h6 class="m-0 font-weight-bold text-white"><i class="fas fa-calendar mr-3"></i>PANEL REGISTRO DE DELEGADO</h6>
        </div>
        <div class="card-body" id="cargann">
            <div class="form-row align-items-end">

                <div class="form-group col-sm-3">
                    <label for="cboEleccion">Seleccione Eleccion</label>
                    <select class="form-control form-control-sm" id="cboEleccion">
                    </select>
                </div>

                <div class="form-group col-sm-3">
                    <label for="cboLocalida">Seleccione Localidad</label>
                    <select class="form-control form-control-sm" id="cboLocalida" disabled>
                    </select>
                </div>

                <div class="form-group col-sm-3">
                    <label for="cboRecint">Seleccione Recinto</label>
                    <select class="form-control form-control-sm" id="cboRecint" disabled>
                    </select>
                </div>

                <div class="form-group col-sm-3">
                    <label for="cboMesa">Seleccione Mesa</label>
                    <select class="form-control form-control-sm" id="cboMesa" disabled>
                    </select>
                </div>

            </div>
            <hr />
            <%--<div class="form-row align-items-end">
                <input type="hidden" value="0" id="txtIdPerso">
                <div class="form-group col-sm-5">
                    <label for="cboBuscarPerso">Buscar Personal</label>
                    <select class="form-control form-control-sm" id="cboBuscarPerso">
                        <option value=""></option>
                    </select>
                </div>

                <div class="form-group col-sm-3">
                    <label for="txtNombrePac">Nombre personal:</label>
                    <input type="text" class="form-control form-control-sm" id="txtNombrePac" disabled>
                </div>

                <div class="form-group col-sm-2">
                    <label for="txtNroci">Nro CI:</label>
                    <input type="text" class="form-control form-control-sm" id="txtNroci" disabled>
                </div>
                <div class="form-group col-sm-2">
                    <button type="button" class="btn btn-success btn-block btn-sm" id="btnAgregarDelegado"><i class="fas fa-plus-circle mr-2"></i>Asignar Mesa</button>
                </div>

            </div>--%>

            <h6 class="mb-3 font-weight-bold text-primary">Lista de mesas por recinto</h6>

            <div class="row">
                <div class="col-sm-12">
                    <table class="table table-striped table-bordered table-hover table-sm" id="tbDelegaMesa" cellspacing="0" style="width: 100%">
                        <thead class="thead-dark">
                            <tr>
                                <th>Id</th>
                                <th>Mesa</th>
                                <th>Estado</th> <th>Delegado Asignado</th>
                                <th>C.I.</th>
                                <th>Celular</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
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

</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="vendor/select2/select2.min.js"></script>
    <script src="vendor/select2/es.min.js"></script>
    <script src="jsdev/Delegados.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
    <%--<script src="jsdev/Delegados.js" type="text/javascript"></script> --%>
</asp:Content>
