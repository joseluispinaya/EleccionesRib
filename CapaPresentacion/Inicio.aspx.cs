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
    public partial class Inicio : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static Respuesta<List<MesaPendienteDto>> MesasAsignadasDelegados(int IdPersona, int IdEleccion)
        {
            if (IdPersona <= 0 || IdEleccion <= 0)
            {
                return new Respuesta<List<MesaPendienteDto>>() { Estado = false, Mensaje = "Debe seleccionar un Recinto y una Eleccion" };
            }

            return NMesa.GetInstance().ListarPendientes(IdPersona, IdEleccion);
        }
    }
}