using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDatos;
using CapaEntidad;

namespace CapaNegocio
{
    public class NPartidoPol
    {
        #region "PATRON SINGLETON"
        private static NPartidoPol instancia = null;
        private NPartidoPol() { }
        public static NPartidoPol GetInstance()
        {
            if (instancia == null)
            {
                instancia = new NPartidoPol();
            }
            return instancia;
        }
        #endregion
    }
}
