$(document).ready(function () {
    // Validar si existen tanto el token como el usuario en sessionStorage
    const usuarioL = sessionStorage.getItem('usuDelegado');

    if (usuarioL) {
        obtenerDetalleUsuarioR();

    } else {
        window.location.href = '../Login.aspx';
    }

});

$('#salirsis').on('click', function (e) {
    e.preventDefault();
    CerrarSesion();
});

function obtenerDetalleUsuarioR() {
    const usuario = sessionStorage.getItem('usuDelegado');
    if (usuario) {
        const usua = JSON.parse(usuario);
        $("#nomUsergA").text(usua.NombreCompleto);

    } else {
        window.location.href = '../Login.aspx';
    }
}


// Función para cerrar sesión
function CerrarSesion() {
    sessionStorage.clear();
    window.location.replace('../Login.aspx');
}