
var tablere; // Variable global para la tabla

$(document).ready(function () {
    // Inicialización
    $("#cboLocalida").prop("disabled", true);
    $("#cboRecint").prop("disabled", true);

    cargarElecciones();

    // UX: Permitir guardar presionando ENTER en los inputs
    $("#txtNroMesa, #txtNroInscritos").on("keypress", function (e) {
        if (e.which === 13) { // Código 13 es Enter
            $("#btnRegistrarMesa").click(); // Dispara el evento del botón
        }
    });
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

    // 2. BLOQUEAR HIJOS
    $("#cboLocalida").prop("disabled", true);
    $("#cboRecint").prop("disabled", true);

    // 3. LIMPIAR TABLA VISUALMENTE
    if ($.fn.DataTable.isDataTable("#tbMesas")) {
        $("#tbMesas").DataTable().clear().draw();
    }
    $('#tbMesas tbody').html('<tr><td colspan="4" class="text-center">Seleccione una localidad y recinto</td></tr>');

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
    $("#cboRecint").prop("disabled", true);

    if ($.fn.DataTable.isDataTable("#tbMesas")) {
        $("#tbMesas").DataTable().clear().draw();
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
    //const textoRecinto = $("#cboRecint option:selected").text();

    if (idRecinto) {
        listaMesas(idRecinto);
        // UX: Poner foco directo en el Nro Mesa para empezar a registrar
        $("#txtNroMesa").focus();
    }
});

// ==================== LISTAR MESAS (DATATABLE) ====================
function listaMesas(idRecinto) {
    const idEleccion = $("#cboEleccion").val();

    if (!idEleccion || !idRecinto) return;

    // Si la tabla ya existe, solo recargamos los datos (No destruimos para evitar parpadeo)
    if ($.fn.DataTable.isDataTable("#tbMesas")) {
        // Actualizamos la URL del AJAX y recargamos
        var tabla = $("#tbMesas").DataTable();
        tabla.ajax.url('Mesas.aspx/ListaMesas').load();
        // Nota: Para que .load() funcione con WebMethod, a veces es complejo pasar params dinámicos
        // Por seguridad y simplicidad, mantenemos tu lógica de destruir y crear si cambian los parámetros base
        tabla.destroy();
    }

    var request = {
        IdRecinto: parseInt(idRecinto),
        IdEleccion: parseInt(idEleccion)
    };

    tablere = $("#tbMesas").DataTable({
        responsive: true,
        "ajax": {
            "url": 'Mesas.aspx/ListaMesas',
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
            { "data": "NroMesaStr", "className": "text-center font-weight-bold" }, // Centrado y negrita
            { "data": "CantidadInStr", "className": "text-center" },
            {
                "defaultContent": '<button class="btn btn-primary btn-ver btn-sm" title="Ver Detalles"><i class="fas fa-eye"></i></button>',
                "orderable": false,
                "searchable": false,
                "width": "50px",
                "className": "text-center"
            }
        ],
        "order": [[0, "asc"]], // Ordenar por Nro de Mesa Ascendente (más lógico para lectura)
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        },
        "dom": 'rtip' // Ocultamos el buscador global para que se vea más limpio (opcional)
    });
}

// ==================== REGISTRAR MESA ====================
$('#btnRegistrarMesa').on('click', function () {
    // Bloquear botón para evitar doble click
    let $btn = $(this);
    $btn.prop('disabled', true).html('<i class="fas fa-spinner fa-spin"></i> Guardando...');

    const idRecinto = $("#cboRecint").val();
    const idEleccion = $("#cboEleccion").val();
    const nroMesaStr = $("#txtNroMesa").val().trim();
    const inscritosStr = $("#txtNroInscritos").val().trim();

    // Validaciones
    if (!idEleccion || !idRecinto) {
        toastr.warning("Seleccione Elección y Recinto.");
        resetBtn($btn); return;
    }

    if (nroMesaStr === "" || parseInt(nroMesaStr) <= 0) {
        toastr.warning("Ingrese un Nro de Mesa válido.");
        $("#txtNroMesa").focus();
        resetBtn($btn); return;
    }

    // Si inscritos está vacío, asumimos 0
    let cantidadInscritos = inscritosStr === "" ? 0 : parseInt(inscritosStr);

    var request = {
        oMesa: {
            IdRecinto: parseInt(idRecinto),
            IdEleccion: parseInt(idEleccion),
            NumeroMesa: parseInt(nroMesaStr),
            CantidadInscritos: cantidadInscritos
        }
    };

    $.ajax({
        type: "POST",
        url: "Mesas.aspx/Guardar",
        data: JSON.stringify(request),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if (response.d.Estado) {
                // 1. Recargar tabla
                if (tablere) tablere.ajax.reload();

                // 2. Feedback Rápido (Toastr es mejor que Swal para ingreso continuo)
                toastr.success(response.d.Mensaje, "Registrado");

                // 3. UX: Preparar siguiente registro (Autoincrementar mesa)
                //let siguienteMesa = parseInt(nroMesaStr) + 1;
                //$("#txtNroMesa").val(siguienteMesa);
                $("#txtNroMesa").val("");
                $("#txtNroInscritos").val(""); // O mantener el anterior si prefieres

                // 4. Foco listo para seguir escribiendo o dar Enter
                $("#txtNroMesa").focus();

            } else {
                swal("Atención", response.d.Mensaje, "warning");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.responseText);
            swal("Error", "Ocurrió un problema de conexión.", "error");
        },
        complete: function () {
            resetBtn($btn);
        }
    });
});

// Función auxiliar para restaurar botón
function resetBtn($btn) {
    $btn.prop('disabled', false).html('<i class="fas fa-check-square mr-2"></i>Registrar');
}

// Botón Limpiar / Nuevo
$("#btnNuevore").on("click", function () {
    $("#txtNroMesa").val("");
    $("#txtNroInscritos").val("");
    $("#txtNroMesa").focus();
});

// fin del archivo