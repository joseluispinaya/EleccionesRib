<%@ Page Title="" Language="C#" MasterPageFile="~/SiteHome.Master" AutoEventWireup="true" CodeBehind="ResultRecinto.aspx.cs" Inherits="CapaPresentacion.ResultRecinto" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div class="card shadow mb-4">
        <div class="card-header bg-second-primary">
            <h6 class="m-0 font-weight-bold text-white"><i class="fas fa-store mr-3"></i>PANEL DE RESULTADOS POR RECINTO</h6>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-md-6 offset-md-3">
                    <div class="row">
                        <div class="col-sm-8">
                            <div class="input-group input-group-sm mb-3">
                                <div class="input-group-prepend">
                                    <label class="input-group-text" for="cboLocalida">Localidad</label>
                                </div>
                                <select class="custom-select" id="cboLocalida">
                                </select>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group mb-3">
                                <button class="btn btn-primary btn-sm" type="button" id="btnReport">
                                    <i class="fas fa-print mr-2"></i>Reporte
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <h6 class="mb-3 font-weight-bold text-primary text-center">RESULTADOS</h6>
            <div class="row">
                <div class="col-sm-12">
                    <table class="table table-striped table-bordered table-hover table-sm" id="tbRecintos" cellspacing="0" style="width: 100%">
                        <thead class="thead-dark">
                            <tr>
                                <th>Id</th>
                                <th>Nombre Recinto</th>
                                <th>Nro. de Mesas</th>
                                <th>Opcion</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    </div>

    <div class="modal fade" id="modalResultrecin" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content" id="loaddd">
                <div class="modal-header">
                    <h6 id="lblTituloVotacion">Resultados</h6>
                    <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">

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
                                <span class="input-group-text" id="inputGroupNromesa">Cantidad Mesas:</span>
                            </div>
                            <input type="text" class="form-control text-center" aria-label="Small" aria-describedby="inputGroupNromesa"
                                id="txtNroMesaAsig" disabled>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-sm-12">
                            <table class="table table-striped table-bordered table-sm" id="tablaResultados" cellspacing="0" style="width: 100%">
                                <thead>
                                    <tr>
                                        <th>Partido</th>
                                        <th>Total Votos</th>
                                        <th>(%)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-danger btn-sm" type="button" data-dismiss="modal"><i class="fas fa-window-close mr-2"></i>Cancelar</button>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="jsdev/ResultRecinto.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
    <%--<script src="jsdev/ResultRecinto.js" type="text/javascript"></script> --%>
</asp:Content>
