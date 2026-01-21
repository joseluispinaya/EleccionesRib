using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDatos;
using CapaEntidad;

namespace CapaNegocio
{
    public class NPersona
    {
        #region "PATRON SINGLETON"
        private static NPersona instancia = null;
        private NPersona() { }
        public static NPersona GetInstance()
        {
            if (instancia == null)
            {
                instancia = new NPersona();
            }
            return instancia;
        }
        #endregion

        public Respuesta<List<EPersona>> ListaPersonas()
        {
            return DPersona.GetInstance().ListaPersonas();
        }

        public Respuesta<bool> RegistrarPersona(EPersona oPersona)
        {
            return DPersona.GetInstance().RegistrarPersona(oPersona);
        }

        public Respuesta<List<EPersona>> ObtenerPersonasFiltro(string Busqueda)
        {
            return DPersona.GetInstance().ObtenerPersonasFiltro(Busqueda);
        }
    }
}
