using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDatos;
using CapaEntidad;

namespace CapaNegocio
{
    public class NLocalidad
    {
        #region "PATRON SINGLETON"
        private static NLocalidad instancia = null;
        private NLocalidad() { }
        public static NLocalidad GetInstance()
        {
            if (instancia == null)
            {
                instancia = new NLocalidad();
            }
            return instancia;
        }
        #endregion
        public Respuesta<bool> RegistrarLocalidad(ELocalidad oLocalidad)
        {
            return DLocalidad.GetInstance().RegistrarLocalidad(oLocalidad);
        }

        public Respuesta<bool> EditarLocalidad(ELocalidad oLocalidad)
        {
            return DLocalidad.GetInstance().EditarLocalidad(oLocalidad);
        }

        public Respuesta<List<ELocalidad>> ListaLocalidades()
        {
            return DLocalidad.GetInstance().ListaLocalidades();
        }
    }
}
