
var table;


$(document).ready(function () {
    $("#cboRecint").prop("disabled", true);
    listaComboLocalidades();
})

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

                const lista = response.d.Data;

                // 2. Validar que la lista no sea nula y tenga elementos
                if (lista != null && lista.length > 0) {

                    // RECIÉN AQUÍ limpiamos y ponemos "Seleccione"
                    $("#cboLocalida").empty().append('<option value="">Seleccione una localidad</option>');

                    $.each(lista, function (i, row) {
                        // Aquí no validamos row.Estado porque asumimos que el SP trae las activas
                        $("<option>").attr("value", row.IdLocalidad).text(row.Nombre).appendTo("#cboLocalida");
                    });

                } else {
                    // Si la lista está vacía
                    $("#cboLocalida").html('<option value="">No se encontraron localidades</option>');
                }

            } else {
                // Si hubo error controlado en C# (response.d.Mensaje)
                $("#cboLocalida").html('<option value="">' + response.d.Mensaje + '</option>');
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            $("#cboLocalida").html('<option value="">Error de conexión</option>');
        }
    });
}

$("#cboLocalida").on("change", function () {
    const idLocalidad = $(this).val();
    $("#cboRecint").empty().append('<option value="">Seleccione un recinto</option>');
    $("#cboRecint").prop("disabled", true);

    if ($.fn.DataTable.isDataTable("#tbMesas")) {
        $("#tbMesas").DataTable().clear().draw();
    }
    $('#tbMesas tbody').html('<tr><td colspan="4" class="text-center">Seleccione una localidad y recinto</td></tr>');

    if (idLocalidad) {
        $("#cboRecint").prop("disabled", false);
        cargarRecintos(idLocalidad);
    } else {
        swal("Mensaje", "Debe Seleccionar una localidad", "warning");
    }
});

function cargarRecintos(idLocalidad) {
    $("#cboRecint").html('<option value="">Cargando...</option>');
    $("#cboRecint").prop("disabled", true); // Bloqueamos mientras carga

    var request = {
        IdLocalidad: parseInt(idLocalidad)
    };

    $.ajax({
        type: "POST",
        url: "Recintos.aspx/RecintosPorLocalidad",
        data: JSON.stringify(request),
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            // 1. Validar respuesta del servidor
            if (response.d.Estado) {

                const lista = response.d.Data;

                // 2. Validar contenido
                if (lista != null && lista.length > 0) {

                    $("#cboRecint").empty().append('<option value="">Seleccione un recinto</option>');

                    $.each(lista, function (i, row) {
                        $("<option>").attr("value", row.IdRecinto).text(row.Nombre).appendTo("#cboRecint");
                    });

                    // IMPORTANTE: Solo habilitamos si hay datos
                    $("#cboRecint").prop("disabled", false);

                } else {
                    $("#cboRecint").html('<option value="">No hay recintos en esta localidad</option>');
                    // Mantenemos disabled true
                }

            } else {
                // Error del servidor (ej. IdLocalidad inválido)
                $("#cboRecint").html('<option value="">' + response.d.Mensaje + '</option>');
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.responseText);
            $("#cboRecint").html('<option value="">Error al cargar recintos</option>');
        }
    });
}

$("#cboRecint").on("change", function () {
    const idRecinto = $(this).val();
    //const textoRecinto = $("#cboRecint option:selected").text();

    if (idRecinto) {
        listaMesas(idRecinto);
    }
});

function listaMesas(idRecinto) {
    if ($.fn.DataTable.isDataTable("#tbMesas")) {
        $("#tbMesas").DataTable().destroy();
        $('#tbMesas tbody').empty();
    }

    var request = {
        IdRecinto: parseInt(idRecinto)
    };

    table = $("#tbMesas").DataTable({
        responsive: true,
        "ajax": {
            "url": 'Mesas.aspx/ListarMesasPorRecinto',
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
            { "data": "NroMesaLite" },
            { "data": "CantidadInStr" },
            {
                "defaultContent": '<button class="btn btn-primary btn-detalle btn-sm"><i class="fas fa-tags mr-2"></i>Ver Resultado</button>',
                "orderable": false,
                "searchable": false,
                "className": "text-center",
                "width": "150px"
            }
        ],
        "order": [[0, "desc"]],
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        }
    });
}

$("#tbMesas tbody").on("click", ".btn-detalle", function (e) {
    e.preventDefault();
    let filaSeleccionada;

    if ($(this).closest("tr").hasClass("child")) {
        filaSeleccionada = $(this).closest("tr").prev();
    } else {
        filaSeleccionada = $(this).closest("tr");
    }

    const model = table.row(filaSeleccionada).data();

    const textoLoca = $("#cboRecint option:selected").text();

    $("#lblTituloVotacion").text("Resultado de: " + textoLoca);

    //$("#txtIdRecintoReg").val(model.IdRecinto);
    $("#txtNroMesa").val(model.NroMesaLite);
    $("#txtCantIns").val(model.CantidadInStr);

    listaResultados(model.IdMesa);

    $('#modalResultrecin').modal('show');
})

function listaResultados(idMesa) {

    // 1. Limpieza previa de la tabla si ya existe
    //if ($.fn.DataTable.isDataTable("#tablaResultados")) {
    //    $("#tablaResultados").DataTable().clear().destroy();
    //}

    if ($.fn.DataTable.isDataTable("#tablaResultados")) {
        $("#tablaResultados").DataTable().destroy();
        $('#tablaResultados tbody').empty();
    }

    // Variable local para almacenar el total de votos de este recinto
    let totalGeneralRecinto = 0;

    var request = {
        IdMesa: parseInt(idMesa)
    };

    $("#tablaResultados").DataTable({
        responsive: true,
        searching: false, // Opcional: si quieres ocultar el buscador
        ordering: true,
        "ajax": {
            "url": 'ResultMesa.aspx/ResultadosPorMesa', // Asegúrate que la URL sea correcta
            "type": "POST",
            "contentType": "application/json; charset=utf-8",
            "dataType": "json",
            "data": function () {
                return JSON.stringify(request);
            },
            "dataSrc": function (json) {

                if (json.d.Estado) {

                    let datos = json.d.Data;

                    // --- PASO CLAVE: CALCULAR EL TOTAL ANTES DE DIBUJAR ---
                    // Sumamos todos los votos para poder calcular porcentajes después
                    totalGeneralRecinto = datos.reduce((acc, item) => acc + item.TotalVotos, 0);

                    return datos;
                } else {
                    return [];
                }
            }
        },
        "columns": [
            // COLUMNA 1: PARTIDO (Con círculo de color y Sigla)
            {
                "data": "NombrePartido",
                "className": "align-middle",
                "render": function (data, type, row) {
                    // Recreamos tu HTML personalizado aquí
                    let siglaHtml = row.Sigla ? `<small class="text-muted">(${row.Sigla})</small>` : "";

                    // El círculo de color
                    let colorDot = `<span style="display:inline-block; width:12px; height:12px; background-color:${row.ColorHex}; border-radius:50%; margin-right:8px;"></span>`;

                    return `${colorDot} ${data} ${siglaHtml}`;
                }
            },
            {
                "data": "TotalVotos",
                "className": "text-center align-middle font-weight-bold",
                "render": function (data, type, row) {

                    // Si DataTables pide el dato para MOSTRAR ('display') o FILTRAR ('filter')
                    if (type === 'display' || type === 'filter') {
                        return data.toLocaleString(); // Devolvemos texto con formato "1.200"
                    }

                    // Si DataTables pide el dato para ORDENAR ('sort') o TIPO ('type')
                    // Devolvemos el número puro (1200) para que ordene matemáticamente bien
                    return data;
                }
            },
            {
                "data": "TotalVotos",
                "className": "text-center align-middle",
                "render": function (data, type, row) {
                    // Evitamos división por cero
                    if (totalGeneralRecinto === 0) return "0.00%";

                    let porcentaje = ((data / totalGeneralRecinto) * 100).toFixed(2);
                    return `<span class="badge badge-light" style="font-size:1em">${porcentaje}%</span>`;
                }
            }
        ],
        "order": [[1, "desc"]], // Ordenar por cantidad de votos (Columna índice 1) descendente
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        }
    });
}