
$(document).ready(function () {
    // AHORA BUSCAMOS SOLO AL ADMIN
    const usuarioAdmin = sessionStorage.getItem('usuAdmin');

    if (!usuarioAdmin) {
        // Si no existe la llave de Admin (incluso si hay una de Delegado), lo saca.
        window.location.replace('Login.aspx'); // Usar replace es mejor
        return;
    }

    try {
        const usua = JSON.parse(usuarioAdmin);
        $("#nomUserg").text(usua.NombreCompleto);
    } catch (error) {
        console.error("Error leyendo sesión", error);
        CerrarSesion();
    }
});

$('#salirsis').on('click', function (e) {
    e.preventDefault();
    CerrarSesion();
});

function CerrarSesion() {
    sessionStorage.clear();
    window.location.replace('Login.aspx');
}