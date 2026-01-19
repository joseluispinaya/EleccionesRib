using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class EActa
    {
        public int IdActa { get; set; }
        public int IdMesa { get; set; }
        public int IdAsignacion { get; set; }
        public int VotosNulos { get; set; }
        public int VotosBlancos { get; set; }
        public int TotalVotosEmitidos { get; set; }
        public string ObservacionDelegado { get; set; }
    }
}
