
var table; // Variable global para la tabla

$(document).ready(function () {
    // Inicialización
    $("#cboLocalida").prop("disabled", true);
    $("#cboRecint").prop("disabled", true);
    $("#cboMesa").prop("disabled", true);
    cargarPersosFil();
    cargarElecciones();
});

// ==================== CARGAR ELECCIONES ====================
function cargarElecciones() {
    $("#cboEleccion").html('<option value="">Cargando...</option>');

    $.ajax({
        type: "POST",
        url: "Elecciones.aspx/ListaElecciones",
        data: {},
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            // 1. PRIMER FILTRO: ¿El servidor procesó bien la solicitud?
            if (response.d.Estado) {

                const lista = response.d.Data;

                // 2. SEGUNDO FILTRO: ¿Hay datos en la lista?
                if (lista != null && lista.length > 0) {

                    // Recién aquí limpiamos y ponemos la opción "Seleccione"
                    $("#cboEleccion").empty().append('<option value="">Seleccione una Eleccion</option>');

                    let contadorActivos = 0;

                    $.each(lista, function (i, row) {
                        if (row.Estado === true) {
                            $("<option>").attr({ "value": row.IdEleccion }).text(row.Descripcion).appendTo("#cboEleccion");
                            contadorActivos++;
                        }
                    });

                    // CASO BORDE: ¿Qué pasa si hay elecciones en BD, pero todas tienen Estado = false?
                    if (contadorActivos === 0) {
                        $("#cboEleccion").html('<option value="">No hay elecciones activas</option>');
                    }

                } else {
                    // CASO: Estado = true, pero Data llegó vacío o nulo
                    $("#cboEleccion").html('<option value="">No se encontraron registros</option>');
                }

            } else {
                // CASO: Estado = false (Entró al Catch en C#)
                // Mostramos el mensaje de error real que viene del backend
                $("#cboEleccion").html('<option value="">' + response.d.Mensaje + '</option>');
                console.error("Error backend:", response.d.Mensaje);
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.responseText);
            $("#cboEleccion").html('<option value="">Error al cargar</option>');
        }
    });
}

// ==================== EVENTO CAMBIO DE ELECCIÓN (Cascada Completa) ====================
$("#cboEleccion").on("change", function () {
    const idEleccion = $(this).val();

    // 1. LIMPIEZA TOTAL EN CASCADA (Resetear hijos)
    $("#cboLocalida").empty().append('<option value="">Seleccione una localidad</option>');
    $("#cboRecint").empty().append('<option value="">Seleccione un recinto</option>');
    $("#cboMesa").empty().append('<option value="">Seleccione una Mesa</option>');

    // 2. BLOQUEAR HIJOS
    $("#cboLocalida").prop("disabled", true);
    $("#cboRecint").prop("disabled", true);
    $("#cboMesa").prop("disabled", true);

    // 3. LIMPIAR TABLA VISUALMENTE
    if ($.fn.DataTable.isDataTable("#tbDelegaMesa")) {
        $("#tbDelegaMesa").DataTable().clear().draw();
    }
    $('#tbDelegaMesa tbody').html('<tr><td colspan="6" class="text-center">Seleccione una localidad y recinto</td></tr>');

    // 4. CARGAR SIGUIENTE NIVEL SI HAY SELECCIÓN
    if (idEleccion) {
        $("#cboLocalida").prop("disabled", false);
        cargarLocalidades();
    }
});

// ==================== CARGAR LOCALIDADES ====================
function cargarLocalidades() {
    $("#cboLocalida").html('<option value="">Cargando...</option>');

    $.ajax({
        type: "POST",
        url: "Localidades.aspx/ListaLocalidades",
        data: "{}",
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            // 1. Validar que el servidor respondió OK
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
            console.log(xhr.responseText);
            $("#cboLocalida").html('<option value="">Error de conexión</option>');
        }
    });
}

// ==================== EVENTO CAMBIO DE LOCALIDAD (Cascada) ====================
$("#cboLocalida").on("change", function () {
    const idLocalidad = $(this).val();
    const idEleccion = $("#cboEleccion").val();

    // Limpieza de hijos (Recintos y Tabla)
    $("#cboRecint").empty().append('<option value="">Seleccione un recinto</option>');
    $("#cboMesa").empty().append('<option value="">Seleccione una Mesa</option>');
    $("#cboRecint").prop("disabled", true);
    $("#cboMesa").prop("disabled", true);

    if ($.fn.DataTable.isDataTable("#tbDelegaMesa")) {
        $("#tbDelegaMesa").DataTable().clear().draw();
    }

    if (idLocalidad && idEleccion) {
        cargarRecintos(idLocalidad, idEleccion);
    }
});

// ==================== CARGAR RECINTOS ====================
function cargarRecintos(idLocalidad, idEleccion) {
    $("#cboRecint").html('<option value="">Cargando...</option>');
    $("#cboRecint").prop("disabled", true); // Bloqueamos mientras carga

    var request = {
        IdLocalidad: parseInt(idLocalidad),
        IdEleccion: parseInt(idEleccion)
    };

    $.ajax({
        type: "POST",
        url: "Recintos.aspx/ListaRecintos",
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

// ==================== EVENTO CAMBIO DE RECINTO (Cargar Tabla) ====================
$("#cboRecint").on("change", function () {
    const idRecinto = $(this).val();
    const idEleccion = $("#cboEleccion").val();
    //const textoRecinto = $("#cboRecint option:selected").text();
    $("#cboMesa").empty().append('<option value="">Seleccione una Mesa</option>');
    $("#cboMesa").prop("disabled", true);

    if (idRecinto) {
        cargarMesas(idRecinto, idEleccion);
        listaMesasDelegados(idRecinto, idEleccion);
    }
});

// ==================== LISTAR MESAS (DATATABLE) ====================
function cargarMesas(idRecinto, idEleccion) {
    $("#cboMesa").html('<option value="">Cargando...</option>');
    $("#cboMesa").prop("disabled", true);

    var request = {
        IdRecinto: parseInt(idRecinto),
        IdEleccion: parseInt(idEleccion)
    };

    $.ajax({
        type: "POST",
        url: "Mesas.aspx/ListaMesasSelect",
        data: JSON.stringify(request),
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            if (response.d.Estado) {

                const lista = response.d.Data;

                // 2. Validar contenido
                if (lista != null && lista.length > 0) {

                    $("#cboMesa").empty().append('<option value="">Seleccione una mesa</option>');

                    $.each(lista, function (i, row) {
                        $("<option>").attr("value", row.IdMesa).text(row.NroMesaStr).appendTo("#cboMesa");
                    });

                    // IMPORTANTE: Solo habilitamos si hay datos
                    $("#cboMesa").prop("disabled", false);

                } else {
                    $("#cboMesa").html('<option value="">No hay mesas disponibles</option>');
                    // Mantenemos disabled true
                }

            } else {
                // Error del servidor (ej. IdLocalidad inválido)
                $("#cboMesa").html('<option value="">' + response.d.Mensaje + '</option>');
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            $("#cboMesa").html('<option value="">Error al cargar mesas</option>');
        }
    });
}

function listaMesasDelegados(idRecinto, idEleccion) {

    if ($.fn.DataTable.isDataTable("#tbDelegaMesa")) {
        $("#tbDelegaMesa").DataTable().destroy();
        $('#tbDelegaMesa tbody').empty();
    }

    var request = {
        IdRecinto: parseInt(idRecinto),
        IdEleccion: parseInt(idEleccion)
    };

    table = $("#tbDelegaMesa").DataTable({
        responsive: true,
        "ajax": {
            "url": 'Mesas.aspx/ListaMesasDelegados',
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
            { "data": "NumeroMesaStr" },
            { "data": "NombreDelegado" },
            { "data": "CI" },
            { "data": "Celular" },
            {
                "defaultContent": '<button class="btn btn-primary btn-ver btn-sm"><i class="fas fa-tags"></i></button>',
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

function cargarPersosFil() {

    $("#cboBuscarPerso").select2({
        ajax: {
            url: "Personas.aspx/ObtenerPersonasFiltro",
            dataType: 'json',
            type: "POST",
            contentType: "application/json; charset=utf-8",
            delay: 250,
            data: function (params) {
                return JSON.stringify({ busqueda: params.term });
            },
            processResults: function (data) {

                return {
                    results: data.d.Data.map((item) => ({
                        id: item.IdPersona,
                        NroCi: item.CI,
                        text: item.NombreCompleto,
                        Correo: item.Correo,
                        persona: item
                    }))
                };
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            }
        },
        language: "es",
        placeholder: 'Buscar Persona',
        minimumInputLength: 1,
        templateResult: formatoRes
    });
}

function formatoRes(data) {

    var imagenes = "Imagenes/Avanzar.png";
    // Esto es por defecto, ya que muestra el "buscando..."
    if (data.loading)
        return data.text;

    var contenedor = $(
        `<table width="100%">
            <tr>
                <td style="width:60px">
                    <img style="height:60px;width:60px;margin-right:10px" src="${imagenes}"/>
                </td>
                <td>
                    <p style="font-weight: bolder;margin:2px">${data.text}</p>
                    <p style="margin:2px">${data.NroCi}</p>
                </td>
            </tr>
        </table>`
    );

    return contenedor;
}

$(document).on("select2:open", function () {
    document.querySelector(".select2-search__field").focus();

});

// Evento para manejar la selección del cliente
$("#cboBuscarPerso").on("select2:select", function (e) {

    var data = e.params.data.persona;
    $("#txtIdPerso").val(data.IdPersona);
    $("#txtNombrePac").val(data.NombreCompleto);
    $("#txtNroci").val(data.CI);
    //console.log(data);

    $("#cboBuscarPerso").val("").trigger("change")
});

// fin del archivo