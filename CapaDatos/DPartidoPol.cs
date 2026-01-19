using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using CapaEntidad;

namespace CapaDatos
{
    public class DPartidoPol
    {
        #region "PATRON SINGLETON"
        private static DPartidoPol instancia = null;
        private DPartidoPol() { }
        public static DPartidoPol GetInstance()
        {
            if (instancia == null)
            {
                instancia = new DPartidoPol();
            }
            return instancia;
        }
        #endregion
    }
}
