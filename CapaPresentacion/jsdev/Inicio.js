
let graficoVotos = null;
let mensajeMostrado = false;

$(document).ready(function () {
    // Carga inicial
    resultadosData();

    //5 minutos = 5 * 60 * 1000 = 300000 ms
    //3 min = 3 * 60 * 1000 = 180000
    setInterval(resultadosData, 60000);
});

function resultadosData() {

    $.ajax({
        type: "POST",
        url: "Inicio.aspx/ResultGeneralVotacion",
        data: {},
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {

            // 1. Validación de Errores Backend
            if (!response.d.Estado) {
                if (!mensajeMostrado) {
                    console.warn(response.d.Mensaje); // Solo consola para no molestar tanto
                    // swal("Aviso", response.d.Mensaje, "warning"); 
                    mensajeMostrado = true;
                }
                return;
            }

            let lista = response.d.Data;

            // 2. Validación: Sin Elección Activa
            // Asumimos que tu SP devuelve un row con NombrePartido = "Sin Elección Activa" o lista vacía
            if (lista.length === 0 || (lista.length === 1 && lista[0].NombrePartido.includes("Sin Elección"))) {

                if (!mensajeMostrado) {
                    swal("Información", "No hay resultados disponibles por el momento.", "info");
                    mensajeMostrado = true;
                }

                if (graficoVotos !== null) {
                    graficoVotos.destroy();
                    graficoVotos = null;
                }
                $("#tablaResultados tbody").html("");
                $("#graficoVotacion").hide();
                $("#tablaResultados").hide();
                return;
            }

            // Datos válidos recibidos
            mensajeMostrado = false;
            $("#graficoVotacion").show();
            $("#tablaResultados").show();

            // ======================================================
            // 3. PREPARACIÓN DE DATOS (Mapeo)
            // ======================================================

            // Nombres: "Comunidad Ciudadana (CC)"
            let labels = lista.map(x => x.NombrePartido + (x.Sigla ? ` (${x.Sigla})` : ""));

            // Datos numéricos
            let datos = lista.map(x => x.TotalVotos);

            // COLORES: Usamos DIRECTAMENTE lo que viene de SQL
            let backgroundColors = lista.map(x => x.ColorHex);

            // Bordes: Usamos el mismo color (o podrías oscurecerlo un poco con JS, pero así está bien)
            let borderColors = lista.map(x => x.ColorHex);

            // ======================================================
            // 4. RENDERIZADO DEL GRÁFICO
            // ======================================================

            // Destruir previo para actualizar
            if (graficoVotos !== null) {
                graficoVotos.destroy();
            }

            // Truco para limpiar el canvas y evitar "ghosting"
            $("#graficoVotacion").remove();
            $("#contenedorGrafico").append('<canvas id="graficoVotacion" style="width:100%; height:450px;"></canvas>');

            const ctx = document.getElementById('graficoVotacion').getContext('2d');

            graficoVotos = new Chart(ctx, {
                type: 'bar', // 'bar' con indexAxis: 'y' hace barras horizontales
                plugins: [ChartDataLabels],
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Votos',
                        data: datos,
                        borderWidth: 1,
                        backgroundColor: backgroundColors,
                        borderColor: borderColors,
                        barPercentage: 0.7 // Hace las barras un poco más delgadas y elegantes
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    indexAxis: 'y', // ESTO HACE QUE SEA HORIZONTAL
                    // SOLUCIÓN AL CORTE DE TEXTO
                    layout: {
                        padding: {
                            right: 50 // Reserva 50px a la derecha para que entre el texto
                        }
                    },
                    scales: {
                        x: {
                            beginAtZero: true,
                            // Opcional: Ocultar la cuadrícula del eje X para que se vea más limpio
                            grid: { display: false },
                            // ticks: { display: false }, // Opcional: Ocultar números abajo si ya los muestras en las barras
                            ticks: { precision: 0 } // Evita decimales en el eje X (votos son enteros)
                        },
                        y: {
                            grid: { display: false } // Opcional: Quitar lineas horizontales
                        }
                    },
                    plugins: {
                        legend: { display: false }, // Ocultamos leyenda porque los nombres ya están en el eje Y
                        tooltip: {
                            callbacks: {
                                label: function (context) {
                                    return ` ${context.raw} votos`;
                                }
                            }
                        },
                        datalabels: {
                            anchor: 'end',
                            align: 'right', // Pone el % a la derecha de la barra
                            color: '#000',
                            font: { weight: 'bold', size: 12 },
                            formatter: function (value, ctx) {
                                // Cálculo de porcentaje dinámico
                                let total = ctx.chart.data.datasets[0].data.reduce((acc, x) => acc + x, 0);
                                if (total === 0) return "0%"; // Evitar división por cero
                                let pct = ((value / total) * 100).toFixed(1);
                                return pct + "%";
                            }
                        }
                    }
                }
            });

            // ======================================================
            // 5. LLENADO DE LA TABLA
            // ======================================================
            let totalGeneral = datos.reduce((acc, num) => acc + num, 0);
            let rows = "";

            lista.forEach(item => {
                let porcentaje = totalGeneral === 0 ? "0.00" : ((item.TotalVotos / totalGeneral) * 100).toFixed(2);

                // Agregué un <span> con el color para referencia visual
                rows += `
                    <tr>
                        <td class="align-middle">
                            <span style="display:inline-block; width:12px; height:12px; background-color:${item.ColorHex}; border-radius:50%; margin-right:8px;"></span>
                            ${item.NombrePartido} ${item.Sigla ? `<small class="text-muted">(${item.Sigla})</small>` : ""}
                        </td>
                        <td class="text-center align-middle font-weight-bold">${item.TotalVotos.toLocaleString()}</td>
                        <td class="text-center align-middle">${porcentaje}%</td>
                    </tr>
                `;
            });

            $("#tablaResultados tbody").html(rows);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.error("Error al cargar resultados: " + xhr.responseText);
        }
    });
}

// fin