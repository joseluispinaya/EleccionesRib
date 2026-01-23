
$('#btnInicia').on('click', function () {

    $('#btnInicia').prop('disabled', true);

    //VALIDACIONES DE USUARIO
    if ($("#usuario").val().trim() === "" || $("#password").val().trim() === "") {
        swal("Mensaje", "Complete los datos para iniciar sesion", "warning");
        $('#btnInicia').prop('disabled', false);
        return;
    }

    loginSistema();
})

function loginSistema() {

    $.ajax({
        type: "POST",
        url: "Login.aspx/Logeo",
        data: JSON.stringify({ Usuario: $("#usuario").val().trim(), Clave: $("#password").val().trim() }),
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        beforeSend: function () {
            $.LoadingOverlay("show");
        },
        success: function (response) {
            $.LoadingOverlay("hide");
            if (response.d.Estado) {
                const user = response.d.Data;
                sessionStorage.setItem('usuDelegado', JSON.stringify(user));
                if (user.Rol === "Delegado") {
                    swal({
                        title: "Bienvenido Delegado",
                        text: `Hola ${user.NombreCompleto || "Usuario"} 👋`,
                        icon: "success",
                        timer: 1500,
                        buttons: false
                    });

                    $('#btnInicia').prop('disabled', false);
                    $("#usuario, #password").val("");
                    
                    setTimeout(() => window.location.href = 'MasterDelegado/InicioDelegado.aspx', 2000);
                } else {
                    swal({
                        title: "Bienvenido Admin",
                        text: `Hola ${user.NombreCompleto || "Usuario"} 👋`,
                        icon: "success",
                        timer: 1500,
                        buttons: false
                    });

                    $('#btnInicia').prop('disabled', false);
                    $("#usuario, #password").val("");

                    setTimeout(() => window.location.href = 'Inicio.aspx', 2000);
                }

            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
                $('#btnInicia').prop('disabled', false);
            }

        },
        error: function (xhr, ajaxOptions, thrownError) {
            $.LoadingOverlay("hide");
            swal("Error", "Ocurrió un problema al intentar iniciar sesión. Intente nuevamente.", "error");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            $('#btnInicia').prop('disabled', false);
        }
    });
}