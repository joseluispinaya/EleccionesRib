<%@ Page Title="" Language="C#" MasterPageFile="~/SiteHome.Master" AutoEventWireup="true" CodeBehind="Mesas.aspx.cs" Inherits="CapaPresentacion.Mesas" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div class="card shadow mb-4">
        <div class="card-header bg-second-primary">
            <h6 class="m-0 font-weight-bold text-white"><i class="fas fa-calendar mr-3"></i>PANEL REGISTRO DE MESAS</h6>
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
                    <button type="button" class="btn btn-success btn-block btn-sm" id="btnAgregarMesa"><i class="fas fa-plus-circle mr-2"></i>Nueva Mesa</button>
                </div>
            </div>

            <hr />
            <div class="row">
                <div class="col-sm-8">
                    <h6 class="mb-3 font-weight-bold text-primary text-center">Lista de Mesas Registradas</h6>

                    <table class="table table-striped table-bordered table-sm" id="tbMesas" cellspacing="0" style="width: 100%">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nro de Mesa</th>
                                <th>Nro Inscritos</th>
                                <th>Accion</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colspan="4" class="text-center">Seleccione una localidad y recinto para ver las mesas</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="col-sm-4">
                    <div class="card border-left-primary shadow h-100 py-2">
                        <div class="card-body">
                            <h6 class="mb-3 font-weight-bold text-primary text-center">Registro Rápido</h6>

                            <div class="input-group input-group-sm mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text font-weight-bold" id="inputGroupNroMesa">Nro Mesa:</span>
                                </div>
                                <input type="number" class="form-control text-center font-weight-bold"
                                    aria-label="Small" aria-describedby="inputGroupNroMesa"
                                    id="txtNroMesa" autocomplete="off" placeholder="Ej: 1">
                            </div>

                            <div class="input-group input-group-sm mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text font-weight-bold" id="inputGroupNroInscritos">Inscritos:</span>
                                </div>
                                <input type="number" class="form-control text-center"
                                    aria-label="Small" aria-describedby="inputGroupNroInscritos"
                                    id="txtNroInscritos" autocomplete="off" placeholder="Ej: 200">
                            </div>

                            <div class="form-row">
                                <div class="form-group col-sm-6">
                                    <button type="button" class="btn btn-success btn-block btn-sm" id="btnRegistrarMesa">
                                        <i class="fas fa-check-square mr-2"></i>Registrar
                                    </button>
                                </div>
                                <div class="form-group col-sm-6">
                                    <button class="btn btn-danger btn-block btn-sm" type="button" id="btnNuevore">
                                        <i class="fas fa-broom mr-2"></i>Limpiar
                                    </button>
                                </div>
                            </div>
                            <small class="text-muted text-center d-block mt-2">
                                <i class="fas fa-info-circle"></i> Tip: Presione ENTER para guardar rápido.
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="jsdev/Mesas.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
<%--<script src="jsdev/Mesas.js" type="text/javascript"></script> --%>
</asp:Content>
