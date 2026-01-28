
var table;

$(document).ready(function () {

    cargarResultLocali();

})

function cargarResultLocali() {
    // Limpieza previa
    if ($.fn.DataTable.isDataTable("#tbResuLocali")) {
        $("#tbResuLocali").DataTable().destroy();
        $('#tbResuLocali tbody').empty();
    }

    $("#tbResuLocali").DataTable({
        responsive: true,
        autoWidth: false,
        "ajax": {
            "url": 'ResultLocalidad.aspx/ResultPorLocalidad', // Asegúrate que este WebMethod devuelva la lista con ImageFulP
            "type": "POST",
            "contentType": "application/json; charset=utf-8",
            "dataType": "json",
            "data": function (d) { return JSON.stringify(d); },
            "dataSrc": function (json) {
                return json.d.Estado ? json.d.Data : [];
            }
        },
        "columns": [
            // COLUMNA 0: ID (Oculto)
            { "data": "IdLocalidad", "visible": false, "searchable": false },

            // COLUMNA 1: LOCALIDAD
            {
                "data": "NombreLocalidad",
                "className": "text-center align-middle",
                "render": function (data) {
                    return `<h6 class="mb-0 text-dark font-weight-bold">
                                <i class="fas fa-map-marker-alt text-danger mr-2"></i>${data}
                            </h6>`;
                }
            },

            // COLUMNA 2: PARTIDO (LOGO + SIGLA + NOMBRE)
            {
                "data": "NombrePartido",
                "className": "align-middle",
                "render": function (data, type, row) {
                    // 1. Obtenemos el Color (si es nulo, gris suave)
                    let colorBorde = row.ColorHex || '#e3e6f0';

                    // 2. Obtenemos la URL de la imagen (Tu propiedad C# ImageFulP)
                    // Si por alguna razón viene vacía, JS tiene una segunda protección
                    let imgUrl = row.ImageFulP || '/Imagenes/sinimagen.png';

                    // 3. Renderizado:
                    // - Usamos la imagen con un borde del color del partido
                    // - object-fit: cover asegura que la foto no se deforme
                    return `
                        <div class="d-flex align-items-center">
                            <div class="position-relative mr-3">
                                <img src="${imgUrl}" 
                                     alt="Logo"
                                     class="rounded-circle shadow-sm"
                                     style="width: 45px; height: 45px; object-fit: cover; border: 3px solid ${colorBorde}; padding: 2px; background: #fff;"
                                     onerror="this.src='/Imagenes/sinimagen.png';"> 
                            </div>
                            <div style="line-height: 1.2;">
                                <span class="font-weight-bold text-dark" style="font-size: 1.1em;">
                                    ${row.Sigla}
                                </span>
                                <br/>
                                <small class="text-muted">${data}</small>
                            </div>
                        </div>
                    `;
                }
            },

            // COLUMNA 3: VOTOS
            {
                "data": "TotalVotos",
                "className": "text-center align-middle",
                "render": function (data, type, row) {
                    if (type === 'display' || type === 'filter') {
                        return `<span class="badge badge-light border px-2 py-1" style="font-size:0.9em; font-weight:600">
                                    ${row.CantidadVotStr}
                                </span>`;
                    }
                    return data;
                }
            },

            // COLUMNA 4: BOTÓN
            {
                "data": null,
                "orderable": false,
                "className": "text-center align-middle",
                "render": function (data, type, row) {
                    return `<button class="btn btn-sm btn-primary btn-detalle-localidad shadow-sm rounded-pill px-3" 
                                    data-id="${row.IdLocalidad}" 
                                    data-nombre="${row.NombreLocalidad}">
                                <i class="fas fa-eye mr-1"></i> Ver
                            </button>`;
                }
            }
        ],
        "order": [[3, "desc"]], // Ordenar por votos
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        }
    });
}

// Evento delegado (porque la tabla se crea dinámicamente)
$('#tbResuLocali tbody').on('click', '.btn-detalle-localidad', function () {
    let idLocalidad = $(this).data('id');
    let nombreLocalidad = $(this).data('nombre');

    $("#txtNomLocalidad").val(nombreLocalidad);
    $("#txtGanador").val("Resultados por Localidad");

    cargarDetallePorLocalidad(idLocalidad); 

    $('#modalResultrecin').modal('show');
    // Ejemplo: Cargar la tabla de detalle que hicimos antes
    
});

function cargarDetallePorLocalidad(idLocalidad) {

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
        IdLocalidad: parseInt(idLocalidad)
    };

    $("#tablaResultados").DataTable({
        responsive: true,
        searching: false, // Opcional: si quieres ocultar el buscador
        //paging: false,    // Opcional: para ver todo de una vez
        ordering: true,
        "ajax": {
            "url": 'ResultLocalidad.aspx/DetalleResultLocalidad', // Asegúrate que la URL sea correcta
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