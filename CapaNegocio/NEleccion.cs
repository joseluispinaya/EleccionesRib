using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDatos;
using CapaEntidad;

namespace CapaNegocio
{
    public class NEleccion
    {
        #region "PATRON SINGLETON"
        private static NEleccion instancia = null;
        private NEleccion() { }
        public static NEleccion GetInstance()
        {
            if (instancia == null)
            {
                instancia = new NEleccion();
            }
            return instancia;
        }
        #endregion
        public Respuesta<List<EEleccion>> ListaElecciones()
        {
            return DEleccion.GetInstance().ListaElecciones();
        }
    }
}
