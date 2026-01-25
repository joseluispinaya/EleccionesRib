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
            <h6 class="m-0 font-weight-bold text-white"><i class="fas fa-store mr-3"></i>Conteo de votación</h6>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-sm-12">
                    <div id="contenedorGrafico">
                        <canvas id="graficoVotacion" style="width: 100%; height: 450px;"></canvas>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="card shadow mb-4">
        <div class="card-header bg-second-primary">
            <h6 class="m-0 font-weight-bold text-white"><i class="fas fa-store mr-3"></i>Votos en porsentaje</h6>
        </div>
        <div class="card-body">

            <div class="row">
                <div class="col-sm-12">
                    <div class="table-responsive">
                        <table class="table table-striped table-bordered table-sm" id="tablaResultados" cellspacing="0" style="width: 100%">
                            <thead>
                                <tr>
                                    <th>Partido / Tipo</th>
                                    <th>Total Votos</th>
                                    <th>Porcentaje (%)</th>
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
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="vendor/chartnew/chart.js"></script>
    <script src="vendor/chartnew/chartjs-plugin-datalabels2.js"></script>
    <script src="jsdev/Inicio.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
    <%--<script src="jsdev/Inicio.js" type="text/javascript"></script>--%>
</asp:Content>
