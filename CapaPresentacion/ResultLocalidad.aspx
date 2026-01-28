<%@ Page Title="" Language="C#" MasterPageFile="~/SiteHome.Master" AutoEventWireup="true" CodeBehind="ResultLocalidad.aspx.cs" Inherits="CapaPresentacion.ResultLocalidad" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div class="card shadow mb-4">
        <div class="card-header bg-second-primary">
            <h6 class="m-0 font-weight-bold text-white"><i class="fas fa-id-card mr-3"></i>PANEL DE RESULTADOS POR LOCALIDAD</h6>
        </div>
        <div class="card-body">
            <div class="row justify-content-center mb-4">
                <button type="button" id="btnPdfexp" class="btn btn-success btn-sm mr-3"><i class="fas fa-file-pdf mr-2"></i>Reporte PDF</button>
            </div>

            <div class="row">
                <div class="col-sm-12">
                    <table class="table table-striped table-bordered table-hover table-sm" id="tbResuLocali" cellspacing="0" style="width: 100%">
                        <thead class="thead-dark">
                            <tr>
                                <th>Id</th>
                                <th>Localidad</th>
                                <th>Partido Ganador</th>
                                <th>Total Votos</th>
                                <th>Detalle</th>
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
                    <h6 id="lblTituloVotacion">Informacion Detallada</h6>
                    <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">

                    <div class="form-row">
                        <div class="input-group input-group-sm col-sm-6 mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="inputGroupRecinto">Localidad:</span>
                            </div>
                            <input type="text" class="form-control text-center" aria-label="Small" aria-describedby="inputGroupRecinto"
                                id="txtNomLocalidad" disabled>
                        </div>
                        <div class="input-group input-group-sm col-sm-6 mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="inputGroupNromesa">Detalle:</span>
                            </div>
                            <input type="text" class="form-control text-center" aria-label="Small" aria-describedby="inputGroupNromesa"
                                id="txtGanador" disabled>
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
    <script src="jsdev/ResultLocalidad.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
    <%--<script src="jsdev/ResultLocalidad.js" type="text/javascript"></script> --%>
</asp:Content>
