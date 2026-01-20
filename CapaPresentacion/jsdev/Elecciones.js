
var table;

const MODELO_BASE = {
    IdEleccion: 0,
    Descripcion: "",
    FechaEleccionSt: "",
    Estado: true,
}

function ObtenerFecha() {
    const d = new Date();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${day}/${month}/${d.getFullYear()}`;
}

$(document).ready(function () {
    $.datepicker.setDefaults($.datepicker.regional["es"])

    $("#txtFechaElecc").datepicker({ dateFormat: "dd/mm/yy" });

    $("#txtFechaElecc").val(ObtenerFecha());

    listaElecciones();

});

function listaElecciones() {
    if ($.fn.DataTable.isDataTable("#tbEleccion")) {
        $("#tbEleccion").DataTable().destroy();
        $('#tbEleccion tbody').empty();
    }

    table = $("#tbEleccion").DataTable({
        responsive: true,
        "ajax": {
            "url": 'Elecciones.aspx/ListaElecciones',
            "type": "POST", // Cambiado a POST
            "contentType": "application/json; charset=utf-8",
            "dataType": "json",
            "data": function (d) {
                return JSON.stringify(d);
            },
            "dataSrc": function (json) {
                //console.log("Response from server:", json.d.objeto);
                if (json.d.Estado) {
                    return json.d.Data; // Asegúrate de que esto apunta al array de datos
                } else {
                    return [];
                }
            }
        },
        "columns": [
            { "data": "IdEleccion", "visible": false, "searchable": false },
            { "data": "Descripcion" },
            { "data": "FechaEleccionSt" },
            {
                "data": "Estado", render: function (data) {
                    if (data === true)
                        return '<span class="badge badge-info">Activa</span>';
                    else
                        return '<span class="badge badge-danger">Cerrada</span>';
                }
            },
            {
                "defaultContent": '<button class="btn btn-primary btn-detalle btn-sm mr-2"><i class="fas fa-tags"></i></button>',
                "orderable": false,
                "searchable": false,
                "width": "50px"
            }
        ],
        "order": [[0, "desc"]],
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        }
    });
}

function mostrarModal(modelo, cboEstadoDeshabilitado = true) {
    // Verificar si modelo es null
    modelo = modelo ?? MODELO_BASE;

    $("#txtIdEleccion").val(modelo.IdEleccion);
    $("#txtDescipcion").val(modelo.Descripcion);
    $("#cboEstado").val(modelo.Estado == true ? 1 : 0);
    $("#txtFechaElecc").val(modelo.FechaEleccionSt == "" ? ObtenerFecha() : modelo.FechaEleccionSt);

    $("#cboEstado").prop("disabled", cboEstadoDeshabilitado);

    $("#myTitulodr").text(cboEstadoDeshabilitado ? "Nuevo Registro" : "Detalle Eleccion");

    $("#modalEleccion").modal("show");
}

$("#tbEleccion tbody").on("click", ".btn-detalle", function (e) {
    e.preventDefault();
    let filaSeleccionada;

    if ($(this).closest("tr").hasClass("child")) {
        filaSeleccionada = $(this).closest("tr").prev();
    } else {
        filaSeleccionada = $(this).closest("tr");
    }

    const model = table.row(filaSeleccionada).data();

    swal("Mensaje", "Detalle de Eleccion del Id: " + model.IdEleccion, "success")
    //mostrarModal(model, false);
})

$('#btnAddNuevoReg').on('click', function () {
    mostrarModal(null, true);
});

// fin