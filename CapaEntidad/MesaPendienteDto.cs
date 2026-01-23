using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class MesaPendienteDto
    {
        public int IdAsignacion { get; set; }
        public int IdMesa { get; set; }
        public string Localidad { get; set; }
        public string Recinto { get; set; }
        public int NumeroMesa { get; set; }
        public int CantidadInscritos { get; set; }

        // Propiedad auxiliar para mostrar "Mesa #5"
        public string NumeroMesaStr => "Mesa #" + NumeroMesa;

        public string CantidadInStr => $"{CantidadInscritos} Votantes";
    }
}
