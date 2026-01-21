
var table;

const MODELO_BASE = {
    IdRecinto: 0,
    IdLocalidad: 0,
    Nombre: ""
}

$(document).ready(function () {
    $("#cboLocalida").prop("disabled", true);
    listComboElecciones();
    //listaComboLocalidades();
})

function listComboElecciones() {
    $("#cboEleccion").html("");

    $.ajax({
        type: "POST",
        url: "Elecciones.aspx/ListaElecciones",
        data: {},
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            if (response.d.Estado) {

                // Limpia y agrega una opción por defecto
                $("#cboEleccion").empty().append('<option value="">Seleccione una Eleccion</option>');

                $.each(response.d.Data, function (i, row) {
                    if (row.Estado === true) {
                        $("<option>").attr({ "value": row.IdEleccion }).text(row.Descripcion).appendTo("#cboEleccion");
                    }

                })
            } else {
                $("#cboEleccion").html('<option value="">No se encontraron registros</option>');
                //swal("Mensaje", response.d.Mensaje, "warning");
            }

        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            $("#cboEleccion").html('<option value="">Error al cargar las elecciones</option>');
        }
    });
}

$("#cboEleccion").on("change", function () {
    const idEleccion = $(this).val();

    if (idEleccion) {
        $("#cboLocalida").prop("disabled", false);
        listaComboLocalidades();
    } else {
        $("#cboLocalida").html('<option value="">Seleccione una elección primero</option>');
        $("#cboLocalida").prop("disabled", true);
    }

});

function listaComboLocalidades() {
    $("#cboLocalida").html('<option value="">Cargando...</option>');

    $.ajax({
        type: "POST",
        url: "Localidades.aspx/ListaLocalidades",
        data: "{}",
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            if (response.d.Estado) {
                const localidades = response.d.Data;

                // Limpia y agrega una opción por defecto
                $("#cboLocalida").empty().append('<option value="">Seleccione una localidad</option>');

                // Crea los <option> usando la forma segura con jQuery
                $.each(localidades, function (i, row) {
                    $("<option>")
                        .attr("value", row.IdLocalidad)
                        .text(row.Nombre)
                        .appendTo("#cboLocalida");
                });
            } else {
                $("#cboLocalida").html('<option value="">No se encontraron localidades</option>');
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            $("#cboLocalida").html('<option value="">Error al cargar localidades</option>');
        }
    });
}

$("#cboLocalida").on("change", function () {
    const idLocalidad = $(this).val();
    const idEleccion = $("#cboEleccion").val();

    if (!idEleccion) {
        swal("Mensaje", "Debe seleccionar una elección antes de ver las localidades.", "warning");
        return;
    }

    if (idLocalidad) {
        listaRecintosFull(idLocalidad, idEleccion);
    } else {
        swal("Mensaje", "Debe Seleccionar una localidad", "warning");
    }
});

function listaRecintosFull(idLocalidad, idEleccion) {
    if ($.fn.DataTable.isDataTable("#tbRecintos")) {
        $("#tbRecintos").DataTable().destroy();
        $('#tbRecintos tbody').empty();
    }

    var request = {
        IdLocalidad: parseInt(idLocalidad),
        IdEleccion: parseInt(idEleccion)
    };

    table = $("#tbRecintos").DataTable({
        responsive: true,
        "ajax": {
            "url": 'Recintos.aspx/ListaRecintos',
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
            { "data": "IdRecinto", "visible": false, "searchable": false },
            { "data": "Nombre" },
            { "data": "CantiMesas" },
            {
                "defaultContent": '<button class="btn btn-primary btn-edit btn-sm"><i class="fas fa-pencil-alt mr-2"></i>Editar</button>',
                "orderable": false,
                "searchable": false,
                "width": "100px"
            }
        ],
        "order": [[0, "desc"]],
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        }
    });
}

$("#tbRecintos tbody").on("click", ".btn-edit", function (e) {
    e.preventDefault();
    let filaSeleccionada;

    if ($(this).closest("tr").hasClass("child")) {
        filaSeleccionada = $(this).closest("tr").prev();
    } else {
        filaSeleccionada = $(this).closest("tr");
    }

    const model = table.row(filaSeleccionada).data();

    const idLocalidad = $("#cboLocalida").val();
    const textoEleccion = $("#cboEleccion option:selected").text();
    const textoLocalidad = $("#cboLocalida option:selected").text();

    if (!idLocalidad) {
        swal("Mensaje", "Debe seleccionar una localidad antes de Editar.", "warning");
        return;
    }

    $("#txtEleccionRegi").val(textoEleccion);
    $("#txtLocalideRegi").val(textoLocalidad);
    $("#txtIdRecintoReg").val(model.IdRecinto);
    $("#txtNombreRecintor").val(model.Nombre);

    $('#modalAddRecin').modal('show');
})

//regis nuevo recinto
$('#btnAddRecinton').on('click', function () {

    const idLocalidad = $("#cboLocalida").val();
    const textoEleccion = $("#cboEleccion option:selected").text();
    const textoLocalidad = $("#cboLocalida option:selected").text();

    if (!idLocalidad) {
        swal("Mensaje", "Debe seleccionar una localidad antes de registrar.", "warning");
        return;
    }

    $("#txtEleccionRegi").val(textoEleccion);
    $("#txtLocalideRegi").val(textoLocalidad);
    $("#txtIdRecintoReg").val("0");
    $("#txtNombreRecintor").val("");

    $('#modalAddRecin').modal('show');
});

function habilitarBoton() {
    $('#btnGuardarCambioReci').prop('disabled', false);
}

function guardarOEditarRecinto(url, request) {

    const idLocalidad = $("#cboLocalida").val();
    const idEleccion = $("#cboEleccion").val();

    $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify(request),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $("#modalAddRecin").find("div.modal-content").LoadingOverlay("hide");

            if (response.d.Estado) {
                listaRecintosFull(idLocalidad, idEleccion);
                $('#modalAddRecin').modal('hide');
                swal("Mensaje", response.d.Mensaje, "success");
            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $("#modalAddRecin").find("div.modal-content").LoadingOverlay("hide");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        complete: function () {
            habilitarBoton();
        }
    });
}

// Guardar o editar al hacer clic
$('#btnGuardarCambioReci').on('click', function () {
    $('#btnGuardarCambioReci').prop('disabled', true);

    if ($("#txtNombreRecintor").val().trim() === "") {
        toastr.warning("", "Debe ingresar Nombre del Recinto");
        $("#txtNombreRecintor").focus();
        habilitarBoton();
        return;
    }

    const idLocalidad = $("#cboLocalida").val();

    const request = {
        oRecinto: {
            IdRecinto: parseInt($("#txtIdRecintoReg").val()),
            IdLocalidad: parseInt(idLocalidad),
            Nombre: $("#txtNombreRecintor").val().trim()
        }
    }

    const url = parseInt($("#txtIdRecintoReg").val()) === 0
        ? "Recintos.aspx/Guardar"
        : "Recintos.aspx/Editar";

    $("#modalAddRecin").find("div.modal-content").LoadingOverlay("show");
    guardarOEditarRecinto(url, request);
});

//fin