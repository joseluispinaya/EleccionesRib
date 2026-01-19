
let tablaData;
let idEditar = 0;

$(document).ready(function () {
    //colorpicker start
    $('.colorpicker-default').colorpicker({
        format: 'hex'
    });
})

function esImagen(file) {
    return file && file.type.startsWith("image/");
}

function mostrarImagenSeleccionada(input) {
    let file = input.files[0];
    let reader = new FileReader();

    // Si NO se seleccionó archivo (ej: presionaron "Cancelar")
    if (!file) {
        $('#imgLogo').attr('src', "Imagenes/sinimagen.png");
        //$(input).next('.custom-file-label').text('Ningún archivo seleccionado');
        return;
    }

    // Validación: si no es imagen, mostramos error
    if (!esImagen(file)) {
        swal("Error", "El archivo seleccionado no es una imagen válida.", "error");
        $('#imgLogo').attr('src', "Imagenes/sinimagen.png");
        //$(input).next('.custom-file-label').text('Ningún archivo seleccionado');
        input.value = ""; // Limpia el input de archivo
        return;
    }

    // Si todo es válido → mostrar vista previa
    reader.onload = (e) => $('#imgLogo').attr('src', e.target.result);
    reader.readAsDataURL(file);
    //if (input.files && input.files[0]) {
    //    var reader = new FileReader();

    //    reader.onload = function (e) {
    //        $('#imgLogo').attr('src', e.target.result);
    //    }

    //    reader.readAsDataURL(input.files[0]);
    //} else {
    //    $('#imgLogo').attr('src', "Imagenes/sinimagen.png");
    //}
}

$('#txtFoto').change(function () {
    mostrarImagenSeleccionada(this);
});


$("#btnAddNuevoReg").on("click", function () {
    idEditar = 0;
    $("#txtNombre").val("");
    $("#txtSigla").val("");
    $("#imgLogo").attr("src", "Imagenes/sinimagen.png");
    $("#txtFoto").val("");
    $("#cboEstado").val(1);

    $("#myTitulop").text("Registrar Partido");

    $("#modalData").modal("show");
})

$("#btnGuardarCambios").on("click", function () {
    let objeto = {
        IdPartido: idEditar,
        Nombre: $("#txtNombre").val().trim(),
        Sigla: $("#txtSigla").val().trim(),
        ColorHex: $("#txtColor").val().trim(),
        //ColorHexDos: $("#txtColordos").val().trim(),
        Estado: $("#cboEstado").val()
    }
    console.log(objeto);

    $('#modalData').modal('hide');
})

// fin