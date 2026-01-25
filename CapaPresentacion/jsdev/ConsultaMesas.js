
var table; // Variable global para la tabla
var select2ModalIniciado = false;

$(document).ready(function () {
    // Inicialización
    $("#cboLocalida").prop("disabled", true);
    $("#cboRecint").prop("disabled", true);

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

    // 2. BLOQUEAR HIJOS
    $("#cboLocalida").prop("disabled", true);
    $("#cboRecint").prop("disabled", true);

    // 3. LIMPIAR TABLA VISUALMENTE
    if ($.fn.DataTable.isDataTable("#tbMesaSinResult")) {
        $("#tbMesaSinResult").DataTable().clear().draw();
    }
    $('#tbMesaSinResult tbody').html('<tr><td colspan="6" class="text-center">Seleccione un recinto para ver los Detalles</td></tr>');

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

    if ($.fn.DataTable.isDataTable("#tbMesaSinResult")) {
        $("#tbMesaSinResult").DataTable().clear().draw();
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

    if (idRecinto) {
        //swal("Error", "Carga la tabla.", "error");
        listaResultado(idRecinto);
    }
});

function listaResultado(idRecinto) {
    const idEleccion = $("#cboEleccion").val();

    if (!idEleccion || !idRecinto) return;

    // Destrucción limpia
    if ($.fn.DataTable.isDataTable("#tbMesaSinResult")) {
        $("#tbMesaSinResult").DataTable().clear().destroy();
    }

    var request = {
        IdRecinto: parseInt(idRecinto),
        IdEleccion: parseInt(idEleccion)
    };

    table = $("#tbMesaSinResult").DataTable({
        responsive: true,
        "ajax": {
            "url": 'ConsultaMesas.aspx/ListaMesasSinResult',
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
            {
                "data": "NumeroMesaStr",
                "render": function (data, type, row) {
                    return `<span class="font-weight-bold text-primary">${data}</span>`;
                }
            },
            {
                "data": "NombreDelegado",
                "render": function (data, type, row) {
                    if (row.EstaAsignada) {
                        return `<i class="fas fa-user mr-2 text-muted"></i>${data}`;
                    } else {
                        return '<span class="text-muted font-italic small">-- Sin delegado asignado --</span>';
                    }
                }
            },
            {
                "data": "Celular",
                "render": function (data, type, row) {
                    if (row.EstaAsignada && data !== "-") {
                        return `<i class="fas fa-mobile-alt mr-1 text-success"></i> ${data}`;
                    }
                    return data;
                }
            },
            // el CI lo uso para EstadoRegistro
            {
                "data": "CI",
                "className": "text-center",
                "render": function (data, type, row) {
                    return `<span class="badge badge-danger">${data}</span>`;
                }
            },
            {
                "data": null,
                "className": "text-center",
                "orderable": false,
                "width": "100px",
                "render": function (data, type, row) {

                    // OPCIÓN A: Ya tiene delegado -> Botón para Registrar Votos
                    if (row.EstaAsignada === true) {
                        return `<button type="button" class="btn btn-info btn-sm btn-registrar-voto" title="Registrar Votos">
                        <i class="fas fa-pencil-alt"></i> Votar
                    </button>`;
                    }

                    // OPCIÓN B: No tiene delegado -> Botón para Asignar Delegado
                    else {
                        return `<button type="button" class="btn btn-warning btn-sm btn-asignar-delegado" title="Asignar Delegado">
                        <i class="fas fa-user-plus"></i> Asignar
                    </button>`;
                    }
                }
            }
        ],
        "order": [[0, "desc"]],
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        }
    });
}

// ============================================================
// EVENTO 1: ASIGNAR DELEGADO (Botón Amarillo)
// ============================================================
$("#tbMesaSinResult tbody").on("click", ".btn-asignar-delegado", function () {

    // 1. Detectar la fila correcta (incluso si es responsive/child)
    let $tr = $(this).closest("tr");
    if ($tr.hasClass("child")) {
        $tr = $tr.prev();
    }

    // 2. Obtener el objeto de datos completo de esa fila
    const model = table.row($tr).data();

    $("#txtIdMesaAsignada").val(model.IdMesa);
    $("#txtNroMesaAsig").val(model.NumeroMesaStr);

    const textoRecinto = $("#cboRecint option:selected").text();
    $("#txtNomRecinto").val(textoRecinto);

    $("#txtIdPersom").val("0");
    $("#txtNombrePacm").val("");
    $("#txtNrocim").val("");
    if ($("#cboBuscarPersom").hasClass("select2-hidden-accessible")) {
        $("#cboBuscarPersom").val("").trigger("change")
        //$("#cboBuscarPersom").val(null).trigger("change");
    }

    $("#modalAsignacion").modal("show");
    
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

$("#btnGuardarRegistro").on("click", function () {

    // Bloquear botón para evitar doble click
    let $btn = $(this);
    $btn.prop('disabled', true).html('<i class="fas fa-spinner fa-spin"></i> Guardando...');

    // 1. Obtener datos
    let idPersona = $("#txtIdPersom").val();
    let idMesa = $("#txtIdMesaAsignada").val();
    let idRecinto = $("#cboRecint").val();

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
                listaResultado(idRecinto);
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
        }
    });
});

// Función auxiliar para restaurar botón
function resetBtn($btn) {
    $btn.prop('disabled', false).html('<i class="fas fa-plus-circle mr-2"></i>Registrar');
}

// ============================================================
// EVENTO 2: REGISTRAR VOTOS (Botón Azul)
// ============================================================
$("#tbMesaSinResult tbody").on("click", ".btn-registrar-voto", function () {

    let $tr = $(this).closest("tr");
    if ($tr.hasClass("child")) {
        $tr = $tr.prev();
    }

    const model = table.row($tr).data();
    //console.log("Registrando votos para:", model);
    //swal("Mensaje", "Registrando votos para: " + model.IdAsignacion, "success");

    $("#txtIdMesa").val(model.IdMesa);
    $("#txtIdAsignacion").val(model.IdAsignacion);

    $("#lblTituloVotacion").text("Registrando para: " + model.NumeroMesaStr);

    // $(".cantidad-input").val(0);
    $("#txtTotalNulos").val("");
    $("#txtTotalBlancos").val("");
    $("#txtObservacion").val("");
    cargarPartidosPol();

    $("#modalVotacion").modal("show");
});

let listaPartidos = [];

function cargarPartidosPol() {

    $("#tbPartidosp tbody").html("");

    $.ajax({
        type: "POST",
        url: "Partidos.aspx/ListaPartidos",
        data: {},
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {

            if (response.d.Estado) {

                listaPartidos = response.d.Data;

                listaPartidos.forEach((item, index) => {

                    $("#tbPartidosp tbody").append(
                        $("<tr>").append(
                            $("<td>").text(item.Nombre),
                            $("<td>").text(item.Sigla),
                            $("<td>").append(
                                $("<input>").attr({
                                    type: "number",
                                    value: 0,
                                    min: 0,
                                    step: "1",
                                    class: "form-control form-control-sm cantidad-input input-reducido",
                                    "data-index": index
                                }).on("input", function () {
                                    if (this.value === "" || isNaN(this.value) || parseInt(this.value) < 0) {
                                        this.value = 0;
                                    }
                                })
                            )
                        )
                    );
                });
            }
        }
    });
}

function registrarVotos(listaFinal, nulos, blancos, totalGeneral) {

    let idRecinto = $("#cboRecint").val();

    var request = {
        oActa: {
            IdMesa: parseInt($("#txtIdMesa").val()),
            IdAsignacion: parseInt($("#txtIdAsignacion").val()),
            VotosNulos: nulos,
            VotosBlancos: blancos,
            TotalVotosEmitidos: totalGeneral,
            ObservacionDelegado: $("#txtObservacion").val().trim() || "Sin Observación"
        },
        ListaDetalleVoto: listaFinal
    };

    $.ajax({
        type: "POST",
        url: "Inicio.aspx/GuardarVotos",
        data: JSON.stringify(request),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            $("#loaddd").LoadingOverlay("show");
        },
        success: function (response) {
            $("#loaddd").LoadingOverlay("hide");
            if (response.d.Estado) {
                $('#modalVotacion').modal('hide');
                toastr.success(response.d.Mensaje);

                listaPartidos = [];
                $("#txtIdMesa").val("0");
                $("#txtIdAsignacion").val("0");
                listaResultado(idRecinto);

            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $("#loaddd").LoadingOverlay("hide");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            swal("Error", "Ocurrió un problema, intente más tarde.", "error");
        },
        complete: function () {
            $('#btnRegistroVotos').prop('disabled', false);
        }
    });
}

$('#btnRegistroVotos').on('click', function () {

    let listaFinal = [];
    let sumaVotosPartidos = 0; // Variable para sumar votos válidos
    let valido = true;

    // Evita múltiples clicks (sevolverá a activar al final en complete)
    $('#btnRegistroVotos').prop('disabled', true);

    $(".cantidad-input").each(function () {

        let valor = $(this).val();

        // Validación: vacío, NaN, negativo o no número
        if (valor === "" || isNaN(valor) || parseInt(valor) < 0) {

            valido = false;

        } else {
            let votos = parseInt(valor);
            let index = $(this).data("index");

            // Agregamos a la lista
            listaFinal.push({
                IdPartido: listaPartidos[index].IdPartido,
                VotosObtenidos: votos
            });

            // SUMAMOS AL ACUMULADOR
            sumaVotosPartidos += votos;
        }
    });

    // Si hay error, no registra
    if (!valido) {
        swal("Advertencia", "Verifique los votos ingresados.", "warning");

        $('#btnRegistroVotos').prop('disabled', false); // habilitar de nuevo
        return; // Detener ejecución
    }

    // Validación simplificada de IdMesa, IdAsignacion
    if (!parseInt($("#txtIdMesa").val()) || !parseInt($("#txtIdAsignacion").val())
    ) {
        toastr.warning("Ocurrió un error, intente nuevamente");
        $('#btnRegistroVotos').prop('disabled', false);
        return;
    }

    //if ($("#txtObservacion").val().trim() === "") {
    //    toastr.warning("Debe completar el campo Observacion");
    //    $("#txtObservacion").focus();
    //    $('#btnRegistroVotos').prop('disabled', false);
    //    return;
    //}

    const nulosStr = $("#txtTotalNulos").val().trim();
    const blancosStr = $("#txtTotalBlancos").val().trim();

    if (nulosStr === "" || parseInt(nulosStr) < 0) {
        toastr.warning("Ingrese un nro positivo o 0.");
        $("#txtTotalNulos").focus();
        $('#btnRegistroVotos').prop('disabled', false);
        return;
    }

    if (blancosStr === "" || parseInt(blancosStr) < 0) {
        toastr.warning("Ingrese un nro positivo o 0.");
        $("#txtTotalBlancos").focus();
        $('#btnRegistroVotos').prop('disabled', false);
        return;
    }

    // 2. Obtenemos Blancos y Nulos
    let nulos = parseInt($("#txtTotalNulos").val()) || 0;
    let blancos = parseInt($("#txtTotalBlancos").val()) || 0;

    // 3. CALCULAMOS EL TOTAL REAL
    let totalCalculado = sumaVotosPartidos + nulos + blancos;

    //console.log(listaFinal);

    registrarVotos(listaFinal, nulos, blancos, totalCalculado);

});

// fin del archivo "dom": 'rtip' // Ocultamos el buscador global para que se vea más limpio (opcional)