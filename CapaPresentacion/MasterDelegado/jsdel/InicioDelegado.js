var table;

$(document).ready(function () {
    mesasAsignadas();
    datosDelegado();
})

function datosDelegado() {
    const usuadet = JSON.parse(sessionStorage.getItem('usuDelegado'));
    $("#txtNombrePac").val(usuadet.NombreCompleto);
    $("#txtNroci").val(usuadet.CI);
    $("#txtcelu").val(usuadet.Celular);
    $("#txtCorreode").val(usuadet.Correo);
}

function mesasAsignadas() {

    if ($.fn.DataTable.isDataTable("#tbPendientes")) {
        $("#tbPendientes").DataTable().destroy();
        $('#tbPendientes tbody').empty();
    }

    const usuario = sessionStorage.getItem('usuDelegado');
    const usua = JSON.parse(usuario);

    var request = {
        IdPersona: parseInt(usua.IdPersona)
    };
    //console.log(request);

    table = $("#tbPendientes").DataTable({
        responsive: true,
        autoWidth: false,
        "ajax": {
            "url": 'InicioDelegado.aspx/MesasAsignadasDelegados',
            "type": "POST",
            "contentType": "application/json; charset=utf-8",
            "dataType": "json",
            "data": function () {
                return JSON.stringify(request);
            },
            "dataSrc": function (json) {
                if (json.d.Estado) {
                    return json.d.Data;
                } else {
                    return [];
                }
            }
        },
        "columns": [
            { "data": "IdMesa", "visible": false, "searchable": false },
            {
                "data": "Localidad",
                "className": "align-middle",
                "render": function (data, type, row) {

                    return `
                        <div class="d-flex align-items-center">
                            <div style="line-height: 1.2;">
                                <span class="font-weight-bold text-dark" style="font-size: 1.1em;">${data}</span>
                                <br/>
                                <small class="text-muted">${row.Recinto}</small>
                            </div>
                        </div>
                    `;
                }
            },
            {
                "data": "NumeroMesaStr",
                "className": "text-center align-middle",
                "render": function (data) {
                    return `<h6 class="mb-0 text-dark font-weight-bold">
                                <i class="fas fa-archive text-danger mr-2"></i>${data}
                            </h6>`;
                }
            },
            {
                "defaultContent": '<button class="btn btn-sm btn-primary btn-Regi shadow-sm rounded-pill px-3"><i class="fas fa-edit mr-2"></i>Registrar</button>',
                "orderable": false,
                "searchable": false,
                "className": "text-center align-middle"
            }
        ],
        "order": [[0, "desc"]],
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        }
    });
}

function mesasAsignadasOrigi() {

    if ($.fn.DataTable.isDataTable("#tbPendientes")) {
        $("#tbPendientes").DataTable().destroy();
        $('#tbPendientes tbody').empty();
    }

    const usuario = sessionStorage.getItem('usuDelegado');
    const usua = JSON.parse(usuario);

    var request = {
        IdPersona: parseInt(usua.IdPersona)
    };

    table = $("#tbPendientes").DataTable({
        responsive: true,
        "ajax": {
            "url": 'InicioDelegado.aspx/MesasAsignadasDelegados',
            "type": "POST",
            "contentType": "application/json; charset=utf-8",
            "dataType": "json",
            "data": function () {
                return JSON.stringify(request);
            },
            "dataSrc": function (json) {
                if (json.d.Estado) {
                    return json.d.Data;
                } else {
                    return [];
                }
            }
        },
        "columns": [
            { "data": "IdMesa", "visible": false, "searchable": false },
            { "data": "Localidad" },
            { "data": "Recinto" },
            { "data": "NumeroMesaStr" },
            {
                "defaultContent": '<button class="btn btn-primary btn-Regi btn-sm"><i class="fas fa-edit mr-2"></i>Registrar</button>',
                "orderable": false,
                "searchable": false,
                "width": "120px"
            }
        ],
        "order": [[0, "desc"]],
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        }
    });
}

$("#tbPendientes tbody").on("click", ".btn-Regi", function (e) {
    e.preventDefault();

    let filaSeleccionada = $(this).closest("tr").hasClass("child")
        ? $(this).closest("tr").prev()
        : $(this).closest("tr");

    const model = table.row(filaSeleccionada).data();
    $("#txtIdMesa").val(model.IdMesa);
    $("#txtIdAsignacion").val(model.IdAsignacion);

    $("#txtTotalNulos").val("");
    $("#txtTotalBlancos").val("");
    $("#txtObservacion").val("");
    cargarPartidosPol();


    $("#modalVotacion").modal("show");
});

let listaPartidos = [];

function cargarPartidosPol() {

    $("#tbPartidosp tbody").html("");

    $.ajax({
        type: "POST",
        url: "InicioDelegado.aspx/ListaPartidos",
        data: {},
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {

            if (response.d.Estado) {

                listaPartidos = response.d.Data;

                listaPartidos.forEach((item, index) => {

                    $("#tbPartidosp tbody").append(
                        $("<tr>").append(
                            $("<td>").text(item.Nombre),
                            $("<td>").text(item.Sigla),
                            $("<td>").append(
                                $("<input>").attr({
                                    type: "number",
                                    value: 0,
                                    min: 0,
                                    step: "1",
                                    class: "form-control form-control-sm cantidad-input input-reducido",
                                    "data-index": index
                                }).on("input", function () {
                                    if (this.value === "" || isNaN(this.value) || parseInt(this.value) < 0) {
                                        this.value = 0;
                                    }
                                })
                            )
                        )
                    );
                });
            }
        }
    });
}

function registrarVotos(listaFinal, nulos, blancos, totalGeneral) {

    var request = {
        oActa: {
            IdMesa: parseInt($("#txtIdMesa").val()),
            IdAsignacion: parseInt($("#txtIdAsignacion").val()),
            VotosNulos: nulos,
            VotosBlancos: blancos,
            TotalVotosEmitidos: totalGeneral,
            ObservacionDelegado: $("#txtObservacion").val().trim() || "Sin Observación"
        },
        ListaDetalleVoto: listaFinal
    };

    $.ajax({
        type: "POST",
        url: "InicioDelegado.aspx/GuardarVotos",
        data: JSON.stringify(request),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            $("#loaddd").LoadingOverlay("show");
        },
        success: function (response) {
            $("#loaddd").LoadingOverlay("hide");
            if (response.d.Estado) {
                $('#modalVotacion').modal('hide');
                swal("Éxito", response.d.Mensaje, "success");

                listaPartidos = [];
                $("#txtIdMesa").val("0");
                $("#txtIdAsignacion").val("0");

                mesasAsignadas(); // recargar tabla
            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $("#loaddd").LoadingOverlay("hide");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            swal("Error", "Ocurrió un problema, intente más tarde.", "error");
        },
        complete: function () {
            $('#btnRegistroVotos').prop('disabled', false);
        }
    });
}

$('#btnRegistroVotos').on('click', function () {

    let listaFinal = [];
    let sumaVotosPartidos = 0; // Variable para sumar votos válidos
    let valido = true;

    // Evita múltiples clicks (sevolverá a activar al final en complete)
    $('#btnRegistroVotos').prop('disabled', true);

    $(".cantidad-input").each(function () {

        let valor = $(this).val();

        // Validación: vacío, NaN, negativo o no número
        if (valor === "" || isNaN(valor) || parseInt(valor) < 0) {

            valido = false;

        } else {
            let votos = parseInt(valor);
            let index = $(this).data("index");

            // Agregamos a la lista
            listaFinal.push({
                IdPartido: listaPartidos[index].IdPartido,
                VotosObtenidos: votos
            });

            // SUMAMOS AL ACUMULADOR
            sumaVotosPartidos += votos;
        }
    });

    // Si hay error, no registra
    if (!valido) {
        swal("Advertencia", "Verifique los votos ingresados.", "warning");

        $('#btnRegistroVotos').prop('disabled', false); // habilitar de nuevo
        return; // Detener ejecución
    }

    // Validación simplificada de IdMesa, IdAsignacion
    if (!parseInt($("#txtIdMesa").val()) || !parseInt($("#txtIdAsignacion").val())
    ) {
        toastr.warning("Ocurrió un error, intente nuevamente");
        $('#btnRegistroVotos').prop('disabled', false);
        return;
    }

    //if ($("#txtObservacion").val().trim() === "") {
    //    toastr.warning("Debe completar el campo Observacion");
    //    $("#txtObservacion").focus();
    //    $('#btnRegistroVotos').prop('disabled', false);
    //    return;
    //}

    const nulosStr = $("#txtTotalNulos").val().trim();
    const blancosStr = $("#txtTotalBlancos").val().trim();

    if (nulosStr === "" || parseInt(nulosStr) < 0) {
        toastr.warning("Ingrese un nro positivo o 0.");
        $("#txtTotalNulos").focus();
        $('#btnRegistroVotos').prop('disabled', false);
        return;
    }

    if (blancosStr === "" || parseInt(blancosStr) < 0) {
        toastr.warning("Ingrese un nro positivo o 0.");
        $("#txtTotalBlancos").focus();
        $('#btnRegistroVotos').prop('disabled', false);
        return;
    }

    // 2. Obtenemos Blancos y Nulos
    let nulos = parseInt($("#txtTotalNulos").val()) || 0;
    let blancos = parseInt($("#txtTotalBlancos").val()) || 0;

    // 3. CALCULAMOS EL TOTAL REAL
    let totalCalculado = sumaVotosPartidos + nulos + blancos;

    //console.log(listaFinal);

    registrarVotos(listaFinal, nulos, blancos, totalCalculado);

});

// fin