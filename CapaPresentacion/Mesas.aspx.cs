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
    public partial class Mesas : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static Respuesta<List<EMesa>> ListaMesas(int IdRecinto, int IdEleccion)
        {
            if (IdRecinto <= 0 || IdEleccion <= 0)
            {
                return new Respuesta<List<EMesa>>() { Estado = false, Mensaje = "Debe seleccionar un Recinto y una Eleccion" };
            }

            return NMesa.GetInstance().ListaMesas(IdRecinto, IdEleccion);
        }

        [WebMethod]
        public static Respuesta<List<EMesa>> ListaMesasSelect(int IdRecinto, int IdEleccion)
        {
            if (IdRecinto <= 0 || IdEleccion <= 0)
            {
                return new Respuesta<List<EMesa>>() { Estado = false, Mensaje = "Debe seleccionar un Recinto y una Eleccion" };
            }

            return NMesa.GetInstance().ListaMesasSelect(IdRecinto, IdEleccion);
        }

        [WebMethod]
        public static Respuesta<List<MesaDto>> ListaMesasDelegados(int IdRecinto, int IdEleccion)
        {
            if (IdRecinto <= 0 || IdEleccion <= 0)
            {
                return new Respuesta<List<MesaDto>>() { Estado = false, Mensaje = "Debe seleccionar un Recinto y una Eleccion" };
            }

            return NMesa.GetInstance().ListaMesasConDelegados(IdRecinto, IdEleccion);
        }

        [WebMethod]
        public static Respuesta<bool> Guardar(EMesa oMesa)
        {
            return NMesa.GetInstance().RegistrarMesas(oMesa);
        }

        [WebMethod]
        public static Respuesta<List<EMesa>> ListarMesasPorRecinto(int IdRecinto)
        {
            return NMesa.GetInstance().ListarMesasPorRecinto(IdRecinto);
        }
    }
}