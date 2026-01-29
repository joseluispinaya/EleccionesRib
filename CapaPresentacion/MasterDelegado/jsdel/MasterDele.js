$(document).ready(function () {
    // AHORA BUSCAMOS SOLO AL ADMIN
    const usuarioDel = sessionStorage.getItem('usuDelegado');

    if (!usuarioDel) {
        // Si no existe la llave de Admin (incluso si hay una de Delegado), lo saca.
        window.location.replace('../Login.aspx'); // Usar replace es mejor
        return;
    }

    try {
        const usuad = JSON.parse(usuarioDel);
        $("#nomUsergA").text(usuad.NombreCompleto);
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
    window.location.replace('../Login.aspx');
}