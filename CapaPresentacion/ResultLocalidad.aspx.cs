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
    public partial class ResultLocalidad : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static Respuesta<List<ResultLocalidadDto>> ResultPorLocalidad()
        {
            return NResultados.GetInstance().ResultPorLocalidad();
        }

        [WebMethod]
        public static Respuesta<List<ResultadoVotacionDto>> DetalleResultLocalidad(int IdLocalidad)
        {
            return NResultados.GetInstance().DetalleResultLocalidad(IdLocalidad);
        }

    }
}