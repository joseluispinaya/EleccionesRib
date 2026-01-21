<%@ Page Title="" Language="C#" MasterPageFile="~/SiteHome.Master" AutoEventWireup="true" CodeBehind="Delegados.aspx.cs" Inherits="CapaPresentacion.Delegados" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="vendor/select2/select2.min.css" rel="stylesheet">
    <style>
        .select2 {
            width: 100% !important;
        }

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
            <div class="form-row align-items-end">
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

            </div>

            <h6 class="mb-3 font-weight-bold text-primary">Lista de mesas por recinto</h6>

            <div class="row">
                <div class="col-sm-12">
                    <table class="table table-striped table-bordered table-sm" id="tbDelegaMesa" cellspacing="0" style="width: 100%">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nro Mesa</th>
                                <th>Nombre Delegado</th>
                                <th>Nro CI</th>
                                <th>Celular</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colspan="6" class="text-center">Seleccione una localidad y recinto para ver los delegados</td>
                            </tr>
                        </tbody>
                    </table>
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
