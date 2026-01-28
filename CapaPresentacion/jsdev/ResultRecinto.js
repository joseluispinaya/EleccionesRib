
var table;


$(document).ready(function () {
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

    if (idLocalidad) {
        listaRecintosRe(idLocalidad);
    }
});

function listaRecintosRe(idLocalidad) {
    if ($.fn.DataTable.isDataTable("#tbRecintos")) {
        $("#tbRecintos").DataTable().destroy();
        $('#tbRecintos tbody').empty();
    }

    var request = {
        IdLocalidad: parseInt(idLocalidad)
    };

    table = $("#tbRecintos").DataTable({
        responsive: true,
        "ajax": {
            "url": 'Recintos.aspx/RecintosPorLocalidad',
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

$("#tbRecintos tbody").on("click", ".btn-detalle", function (e) {
    e.preventDefault();
    let filaSeleccionada;

    if ($(this).closest("tr").hasClass("child")) {
        filaSeleccionada = $(this).closest("tr").prev();
    } else {
        filaSeleccionada = $(this).closest("tr");
    }

    const model = table.row(filaSeleccionada).data();

    if (model.NroMesas === 0) {
        swal("Mensaje", "El recinto no cuenta con resultados", "warning");
        return;
    }

    const textoLoca = $("#cboLocalida option:selected").text();

    $("#lblTituloVotacion").text("Resultado de: " + textoLoca);

    //$("#txtIdRecintoReg").val(model.IdRecinto);
    $("#txtNomRecinto").val(model.Nombre);
    $("#txtNroMesaAsig").val(model.CantiMesas);

    listaResultados(model.IdRecinto);

    $('#modalResultrecin').modal('show');
})

function listaResultados(idRecinto) {

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
        IdRecinto: parseInt(idRecinto)
    };

    $("#tablaResultados").DataTable({
        responsive: true,
        searching: false, // Opcional: si quieres ocultar el buscador
        //paging: false,    // Opcional: para ver todo de una vez
        ordering: true,
        "ajax": {
            "url": 'ResultRecinto.aspx/ResultadosPorRecinto', // Asegúrate que la URL sea correcta
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

            // COLUMNA 2: TOTAL VOTOS (Formato numérico)
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

            // COLUMNA 3: PORCENTAJE (Calculado dinámicamente)
            {
                "data": "TotalVotos", // Usamos los votos como base
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

// fin codigo DataTable