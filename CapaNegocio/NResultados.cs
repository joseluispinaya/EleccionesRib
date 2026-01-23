using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDatos;
using CapaEntidad;

namespace CapaNegocio
{
    public class NResultados
    {
        #region "PATRON SINGLETON"
        private static NResultados instancia = null;
        private NResultados() { }
        public static NResultados GetInstance()
        {
            if (instancia == null)
            {
                instancia = new NResultados();
            }
            return instancia;
        }
        #endregion
        public Respuesta<bool> GuardarVotos(string VotosXml)
        {
            return DResultados.GetInstance().GuardarVotos(VotosXml);
        }
    }
}
