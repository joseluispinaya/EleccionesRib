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
    public partial class ConsultaMesas : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static Respuesta<List<MesaDto>> ListaMesasSinResult(int IdRecinto, int IdEleccion)
        {
            if (IdRecinto <= 0 || IdEleccion <= 0)
            {
                return new Respuesta<List<MesaDto>>() { Estado = false, Mensaje = "Debe seleccionar un Recinto y una Eleccion" };
            }

            return NResultados.GetInstance().ListaMesasSinResult(IdRecinto, IdEleccion);
        }
    }
}