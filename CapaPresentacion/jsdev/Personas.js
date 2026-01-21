
var table;

const MODELO_BASE = {
    IdPersona: 0,
    NombreCompleto: "",
    CI: "",
    Correo: "",
    Celular: "",
    ClaveHash: "",
    Estado: true
}

$(document).ready(function () {

    cargarListaPersonas();

})

function cargarListaPersonas() {
    if ($.fn.DataTable.isDataTable("#tbPersonas")) {
        $("#tbPersonas").DataTable().destroy();
        $('#tbPersonas tbody').empty();
    }

    table = $("#tbPersonas").DataTable({
        responsive: true,
        "ajax": {
            "url": 'Personas.aspx/ListaPersonas',
            "type": "POST", // Cambiado a POST
            "contentType": "application/json; charset=utf-8",
            "dataType": "json",
            "data": function (d) {
                return JSON.stringify(d);
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
            { "data": "IdPersona", "visible": false, "searchable": false },
            { "data": "NombreCompleto" },
            { "data": "CI" },
            { "data": "Celular" },
            { "data": "Correo" },
            {
                "data": "Estado",
                "className": "text-center",
                "render": function (data) {
                    if (data === true) {
                        return '<span class="badge badge-info">Activo</span>';
                    } else {
                        return '<span class="badge badge-danger">No Activo</span>';
                    }
                }
            },
            {
                "defaultContent": '<button class="btn btn-primary btn-editar btn-sm"><i class="fas fa-pencil-alt"></i></button>',
                "orderable": false,
                "searchable": false,
                "width": "50px",
                "className": "text-center"
            }
        ],
        "order": [[0, "desc"]],
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        }
    });
}

$.fn.inputFilter = function (inputFilter) {
    return this.on("input keydown keyup mousedown mouseup select contextmenu drop", function (e) { // Captura el evento como 'e'
        if (inputFilter(this.value) || e.key === "Backspace" || e.key === " ") { // Se usa 'e' en lugar de 'event'
            this.oldValue = this.value;
            this.oldSelectionStart = this.selectionStart;
            this.oldSelectionEnd = this.selectionEnd;
        } else if (this.hasOwnProperty("oldValue")) {
            this.value = this.oldValue;
            this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
        } else {
            this.value = "";
        }
    });
};

$("#txtCelular").inputFilter(function (value) {
    return /^\d*$/.test(value) && value.length <= 8;
});

$("#txtNombre").inputFilter(function (value) {
    return /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]*$/u.test(value);
});

function mostrarModal(modelo, cboEstadoDeshabilitado = true) {
    // Verificar si modelo es null
    modelo = modelo ?? MODELO_BASE;

    $("#txtIdPersona").val(modelo.IdPersona);
    $("#txtNombre").val(modelo.NombreCompleto);
    $("#txtnroci").val(modelo.CI);
    $("#txtCelular").val(modelo.Celular);

    $("#txtCorreo").val(modelo.Correo);
    $("#txtClave").val(modelo.ClaveHash);
    $("#cboEstado").val(modelo.Estado ? 1 : 0);

    $("#cboEstado").prop("disabled", cboEstadoDeshabilitado);
    $("#myTitulodr").text(cboEstadoDeshabilitado ? "Nuevo Registro" : "Editar Persona");


    $("#modalPersona").modal("show");
}

$("#tbPersonas tbody").on("click", ".btn-editar", function (e) {
    e.preventDefault();

    let filaSeleccionada = $(this).closest("tr").hasClass("child")
        ? $(this).closest("tr").prev()
        : $(this).closest("tr");

    const model = table.row(filaSeleccionada).data();
    mostrarModal(model, false);
});

$('#btnAddNuevoReg').on('click', function () {
    mostrarModal(null, true);
});

function habilitarBoton() {
    $('#btnGuardarCambios').prop('disabled', false);
}

// Función genérica para guardar o editar
function guardarOEditarPesona(url, request) {
    $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify(request),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $("#modalPersona").find("div.modal-content").LoadingOverlay("hide");

            if (response.d.Estado) {
                cargarListaPersonas();
                $('#modalPersona').modal('hide');
                swal("Mensaje", response.d.Mensaje, "success");
            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $("#modalPersona").find("div.modal-content").LoadingOverlay("hide");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        complete: function () {
            habilitarBoton();
        }
    });
}

// Guardar o editar al hacer clic
$('#btnGuardarCambios').on('click', function () {
    $('#btnGuardarCambios').prop('disabled', true);

    const inputs = $("input.input-validar").serializeArray();
    const inputs_sin_valor = inputs.filter((item) => item.value.trim() === "");

    if (inputs_sin_valor.length > 0) {
        const campo = inputs_sin_valor[0].name;
        const $inputVacio = $(`input[name="${campo}"]`);
        toastr.warning("", `Debe completar el campo: "${campo}"`);
        $inputVacio.focus();
        habilitarBoton();
        return;
    }

    const modelo = structuredClone(MODELO_BASE);
    modelo["IdPersona"] = parseInt($("#txtIdPersona").val());
    modelo["NombreCompleto"] = $("#txtNombre").val().trim();
    modelo["CI"] = $("#txtnroci").val().trim();
    modelo["Celular"] = $("#txtCelular").val().trim();
    modelo["Correo"] = $("#txtCorreo").val().trim();
    modelo["ClaveHash"] = $("#txtClave").val().trim();
    modelo["Estado"] = ($("#cboEstado").val() == "1" ? true : false);

    const request = { oPersona: modelo };
    const url = modelo.IdPersona === 0
        ? "Personas.aspx/Guardar"
        : "Personas.aspx/Editar";

    $("#modalPersona").find("div.modal-content").LoadingOverlay("show");
    guardarOEditarPesona(url, request);
});

//fin