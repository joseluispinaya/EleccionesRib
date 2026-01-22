
var table;

$(document).ready(function () {
    mesasAsignadas();
})

function mesasAsignadas() {

    if ($.fn.DataTable.isDataTable("#tbPendientes")) {
        $("#tbPendientes").DataTable().destroy();
        $('#tbPendientes tbody').empty();
    }

    var request = {
        IdPersona: 1,
        IdEleccion: 1
    };


    table = $("#tbPendientes").DataTable({
        responsive: true,
        "ajax": {
            "url": 'Inicio.aspx/MesasAsignadasDelegados',
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
                "width": "140px"
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
    console.log(model);
    // $("#txtIdEleccion").val(model.IdEleccion);
    // $("#txtIdMesa").val(model.IdMesa);
    // $("#txtIdDelegado").val(model.IdDelegado);

    // $("#txtTotalNulos").val("0");
    // $("#txtTotalBlancos").val("0");
    // cargarPartidosPol(model.IdEleccion, model.IdMesa);


    $("#modalVotacion").modal("show");
});