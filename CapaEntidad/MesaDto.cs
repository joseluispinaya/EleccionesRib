using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class MesaDto
    {
        public int IdMesa { get; set; }
        public int NumeroMesa { get; set; }

        // --- NUEVOS CAMPOS ---
        public int IdAsignacion { get; set; } // Vital para el botón "Eliminar Asignación"
        public int IdPersona { get; set; }    // Útil si quieres ver el perfil del delegado
        public string CI { get; set; }        // Para verificar identidad rápidamente en la lista
        public bool EstaAsignada { get; set; } // Para pintar la fila verde (ocupada) o roja (libre)

        public string NombreDelegado { get; set; }
        public string Celular { get; set; }

        // Opcional: Una propiedad de solo lectura para mostrar bonito en la tabla
        public string NumeroMesaStr => "Mesa #" + NumeroMesa;
    }
}
