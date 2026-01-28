using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDatos;
using CapaEntidad;

namespace CapaNegocio
{
    public class NRecinto
    {
        #region "PATRON SINGLETON"
        private static NRecinto instancia = null;
        private NRecinto() { }
        public static NRecinto GetInstance()
        {
            if (instancia == null)
            {
                instancia = new NRecinto();
            }
            return instancia;
        }
        #endregion
        public Respuesta<List<ERecinto>> ListaRecintos(int IdLocalidad, int IdEleccion)
        {
            return DRecinto.GetInstance().ListaRecintos(IdLocalidad, IdEleccion);
        }

        public Respuesta<List<ERecinto>> ObtenerRecintosPorLocalidad(int idLocalidad)
        {
            return DRecinto.GetInstance().ObtenerRecintosPorLocalidad(idLocalidad);
        }

        public Respuesta<bool> RegistrarRecinto(ERecinto oRecinto)
        {
            return DRecinto.GetInstance().RegistrarRecinto(oRecinto);
        }

        public Respuesta<bool> EditarRecinto(ERecinto oRecinto)
        {
            return DRecinto.GetInstance().EditarRecinto(oRecinto);
        }
    }
}
