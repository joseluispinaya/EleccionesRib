using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using CapaEntidad;
using CapaNegocio;
using System.Web.Services;

namespace CapaPresentacion
{
    public partial class Recintos : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static Respuesta<List<ERecinto>> ListaRecintos(int IdLocalidad, int IdEleccion)
        {
            return NRecinto.GetInstance().ListaRecintos(IdLocalidad, IdEleccion);
        }

        [WebMethod]
        public static Respuesta<List<ERecinto>> RecintosPorLocalidad(int IdLocalidad)
        {
            return NRecinto.GetInstance().ObtenerRecintosPorLocalidad(IdLocalidad);
        }

        [WebMethod]
        public static Respuesta<bool> Guardar(ERecinto oRecinto)
        {
            return NRecinto.GetInstance().RegistrarRecinto(oRecinto);
        }

        [WebMethod]
        public static Respuesta<bool> Editar(ERecinto oRecinto)
        {
            return NRecinto.GetInstance().EditarRecinto(oRecinto);
        }
    }
}