
var table; // Variable global para la tabla
var select2ModalIniciado = false;

$(document).ready(function () {
    // Inicialización
    $("#cboLocalida").prop("disabled", true);
    $("#cboRecint").prop("disabled", true);
    $("#cboMesa").prop("disabled", true);
    //cargarPersosFil();
    cargarElecciones();
    // Inicializamos el Select2 del modal UNA SOLA VEZ al cargar la página
    cargarPersonasModal();
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
    $('#tbDelegaMesa tbody').html('<tr><td colspan="7" class="text-center">Seleccione una localidad y recinto</td></tr>');

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

    // Destrucción limpia
    if ($.fn.DataTable.isDataTable("#tbDelegaMesa")) {
        $("#tbDelegaMesa").DataTable().clear().destroy();
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
            // 1. MESA (Resaltada)
            {
                "data": "NumeroMesaStr",
                "render": function (data, type, row) {
                    return `<span class="font-weight-bold text-primary">${data}</span>`;
                }
            },
            // 2. ESTADO (Badge Visual)
            {
                "data": "EstaAsignada",
                "className": "text-center",
                "render": function (data, type, row) {
                    if (data === true) {
                        return '<span class="badge badge-success px-2 py-1">ASIGNADA</span>';
                    } else {
                        return '<span class="badge badge-danger px-2 py-1">VACANTE</span>';
                    }
                }
            },
            // 3. NOMBRE DELEGADO
            {
                "data": "NombreDelegado",
                "render": function (data, type, row) {
                    if (row.EstaAsignada) {
                        return `<i class="fas fa-user mr-2 text-muted"></i>${data}`;
                    } else {
                        return '<span class="text-muted font-italic small">-- Sin Asignar --</span>';
                    }
                }
            },
            // 4. CI
            { "data": "CI" },

            // 5. CELULAR (Con enlace a WhatsApp opcional si quisieras)
            {
                "data": "Celular",
                "render": function (data, type, row) {
                    if (row.EstaAsignada && data !== "-") {
                        return `<i class="fas fa-mobile-alt mr-1 text-success"></i> ${data}`;
                    }
                    return data;
                }
            },
            // 6. BOTONES DE ACCIÓN (Dinámicos)
            {
                "data": null,
                "className": "text-center",
                "orderable": false,
                "width": "100px",
                "render": function (data, type, row) {
                    // LOGICA DE NEGOCIO EN EL FRONTEND
                    if (row.EstaAsignada === true) {
                        // Si ya tiene delegado: Botón ROJO para eliminar asignación
                        // Usamos row.IdAsignacion para saber qué borrar
                        return `<button type="button" class="btn btn-outline-danger btn-sm btn-eliminar-asig" 
                                        data-idasignacion="${row.IdAsignacion}" title="Quitar Delegado">
                                    <i class="fas fa-trash-alt"></i>
                                </button>`;
                    } else {
                        // Si está vacante: Botón VERDE para asignar
                        // Usamos row.IdMesa para saber a dónde asignar
                        // Nota: data-mesa es para mostrar en el modal "Asignando a Mesa X"
                        return `<button type="button" class="btn btn-success btn-sm btn-asignar-modal" 
                                        data-idmesa="${row.IdMesa}" data-nromesa="${row.NumeroMesaStr}" title="Asignar Delegado">
                                    <i class="fas fa-user-plus"></i> Asignar
                                </button>`;
                    }
                }
            }
        ],
        "order": [[0, "desc"]], // Ordenar por Nro Mesa (Columna 1 visible)
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        }
    });
}

// EVENTO PARA ASIGNAR (Botón Verde)
$("#tbDelegaMesa tbody").on("click", ".btn-asignar-modal", function () {
    let idMesa = $(this).data("idmesa");
    let nroMesa = $(this).data("nromesa");
    const textoRecinto = $("#cboRecint option:selected").text();

    $("#txtIdMesaAsignada").val(idMesa);
    $("#txtNomRecinto").val(textoRecinto);
    $("#txtNroMesaAsig").val(nroMesa);

    // 2. LIMPIEZA DE CAMPOS (UX: Que no aparezca el dato del anterior asignado)
    $("#txtIdPersom").val("0");
    $("#txtNombrePacm").val("");
    $("#txtNrocim").val("");

    // Limpiar el Select2 visualmente
    if ($("#cboBuscarPersom").hasClass("select2-hidden-accessible")) {
        $("#cboBuscarPersom").val("").trigger("change")
        //$("#cboBuscarPersom").val(null).trigger("change");
    }

    // 3. Mostrar Modal
    $("#modalAsignacion").modal("show");

    // 4. (Opcional pero recomendado) Poner foco en el select2 tras abrir
    setTimeout(function () {
        $("#cboBuscarPersom").select2("open");
    }, 500);

    //swal("Mensaje", "Voy a asignar a la mesa: " + nroMesa, "success")

    // Aquí tu lógica:
    // 1. Guardar idMesa en una variable global o hidden input
    // 2. Abrir el modal de búsqueda de personas
    // console.log("Voy a asignar a la mesa: " + nroMesa);
    // $("#modalAsignar").modal("show");
});

// ==================== CONFIGURACIÓN SELECT2 (MODAL) ====================
function cargarPersonasModal() {

    // Evitamos reinicializar si ya existe
    if (select2ModalIniciado) return;

    $("#cboBuscarPersom").select2({
        // CLAVE DEL ÉXITO: Esto soluciona el problema de z-index y foco en modales
        dropdownParent: $('#modalAsignacion'),

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
                        persona: item
                    }))
                };
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.status + " : " + xhr.responseText);
            }
        },
        language: "es",
        placeholder: 'Escriba nombre o CI...',
        minimumInputLength: 1,
        templateResult: formatoResMod,
        width: '100%'
    });
    // width: '100%' Asegura que ocupe todo el ancho del form-group
    select2ModalIniciado = true;
}

// FORMATO VISUAL (Tu código estaba bien, lo mantengo igual)
function formatoResMod(data) {
    var imagenes = "Imagenes/Avanzar.png"; // Asegúrate que esta ruta sea correcta
    if (data.loading) return data.text;

    var contenedor = $(
        `<table width="100%">
            <tr>
                <td style="width:40px">
                    <img style="height:40px;width:40px;margin-right:10px" src="${imagenes}"/>
                </td>
                <td>
                    <div style="font-weight: bold;">${data.text}</div>
                    <div style="font-size: 0.85em; color: #666;">CI: ${data.NroCi}</div>
                </td>
            </tr>
        </table>`
    );
    return contenedor;
}

// SELECCIÓN DE PERSONA
$("#cboBuscarPersom").on("select2:select", function (e) {
    var data = e.params.data.persona;

    // Llenar campos ocultos o visibles
    $("#txtIdPersom").val(data.IdPersona);
    $("#txtNombrePacm").val(data.NombreCompleto);
    $("#txtNrocim").val(data.CI);

    $("#cboBuscarPersom").val("").trigger("change")

    // Limpiar el select para que quede listo para otra búsqueda si se equivocó
    // $("#cboBuscarPersom").val(null).trigger("change"); // Opcional: Si prefieres que se vea el nombre seleccionado, quita esta línea
});

// FOCO EN CAMPO DE BÚSQUEDA DEL SELECT2
$(document).on("select2:open", function (e) {
    // Solo aplicamos el foco si el select2 abierto está dentro del modal
    if ($(e.target).attr('id') === 'cboBuscarPersom') {
        document.querySelector(".select2-search__field").focus();
    }
});

// EVENTO PARA ELIMINAR (Botón Rojo)
$("#tbDelegaMesa tbody").on("click", ".btn-eliminar-asig", function () {
    let idAsignacion = $(this).data("idasignacion");

    swal("Mensaje", "Quitar asignacion del Id: " + idAsignacion, "warning")
});

$("#btnGuardarRegistro").on("click", function () {

    // Bloquear botón para evitar doble click
    let $btn = $(this);
    $btn.prop('disabled', true).html('<i class="fas fa-spinner fa-spin"></i> Guardando...');

    // 1. Obtener datos
    let idPersona = $("#txtIdPersom").val();
    let idMesa = $("#txtIdMesaAsignada").val();
    let idRecinto = $("#cboRecint").val(); // Necesario para refrescar la tabla después
    let idEleccion = $("#cboEleccion").val();

    // 2. Validaciones
    if (idPersona === "0" || idPersona === "") {
        //swal("Atención", "Debe buscar y seleccionar una persona.", "warning");
        toastr.warning("Debe buscar y seleccionar una persona.");
        resetBtn($btn); return;
    }

    if (idMesa === "0" || idMesa === "") {
        swal("Error", "No se identificó la mesa. Cierre y vuelva a intentar.", "error");
        resetBtn($btn); return;
    }

    // 3. Objeto para enviar
    var request = {
        idPersona: parseInt(idPersona),
        idMesa: parseInt(idMesa)
    };

    // 4. AJAX
    // let $btn = $(this);
    // $btn.prop("disabled", true).text("Guardando...");

    $.ajax({
        type: "POST",
        url: "Delegados.aspx/RegistrarAsignacion", // Asegúrate de crear este WebMethod (ver punto 3 abajo)
        data: JSON.stringify(request),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if (response.d.Estado) {
                // Éxito
                $("#modalAsignacion").modal("hide");
                toastr.success(response.d.Mensaje);

                // Recargar tabla para ver el cambio (Verde -> Rojo)
                listaMesasDelegados(idRecinto, idEleccion);
                cargarMesas(idRecinto, idEleccion);
            } else {
                // Error de negocio (Ej: Ya tiene mesa en otro recinto)
                swal("No se pudo asignar", response.d.Mensaje, "warning");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.responseText);
            swal("Error", "Error de conexión con el servidor.", "error");
        },
        complete: function () {
            resetBtn($btn);
            //$btn.prop("disabled", false).text("Registrar");
        }
    });
});

// Función auxiliar para restaurar botón
function resetBtn($btn) {
    $btn.prop('disabled', false).html('<i class="fas fa-plus-circle mr-2"></i>Registrar');
}

//function cargarPersosFil() {

//    $("#cboBuscarPerso").select2({
//        ajax: {
//            url: "Personas.aspx/ObtenerPersonasFiltro",
//            dataType: 'json',
//            type: "POST",
//            contentType: "application/json; charset=utf-8",
//            delay: 250,
//            data: function (params) {
//                return JSON.stringify({ busqueda: params.term });
//            },
//            processResults: function (data) {

//                return {
//                    results: data.d.Data.map((item) => ({
//                        id: item.IdPersona,
//                        NroCi: item.CI,
//                        text: item.NombreCompleto,
//                        Correo: item.Correo,
//                        persona: item
//                    }))
//                };
//            },
//            error: function (xhr, ajaxOptions, thrownError) {
//                console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
//            }
//        },
//        language: "es",
//        placeholder: 'Buscar Persona',
//        minimumInputLength: 1,
//        templateResult: formatoRes
//    });
//}

//function formatoRes(data) {

//    var imagenes = "Imagenes/Avanzar.png";
//    if (data.loading)
//        return data.text;

//    var contenedor = $(
//        `<table width="100%">
//            <tr>
//                <td style="width:60px">
//                    <img style="height:60px;width:60px;margin-right:10px" src="${imagenes}"/>
//                </td>
//                <td>
//                    <p style="font-weight: bolder;margin:2px">${data.text}</p>
//                    <p style="margin:2px">${data.NroCi}</p>
//                </td>
//            </tr>
//        </table>`
//    );

//    return contenedor;
//}

//$(document).on("select2:open", function () {
//    document.querySelector(".select2-search__field").focus();

//});

//$("#cboBuscarPerso").on("select2:select", function (e) {

//    var data = e.params.data.persona;
//    $("#txtIdPerso").val(data.IdPersona);
//    $("#txtNombrePac").val(data.NombreCompleto);
//    $("#txtNroci").val(data.CI);

//    $("#cboBuscarPerso").val("").trigger("change")
//});

// fin del archivo