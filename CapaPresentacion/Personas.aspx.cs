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
    public partial class Personas : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static Respuesta<List<EPersona>> ListaPersonas()
        {
            return NPersona.GetInstance().ListaPersonas();
        }

        [WebMethod]
        public static Respuesta<bool> Guardar(EPersona oPersona)
        {
            return NPersona.GetInstance().RegistrarPersona(oPersona);
        }

        [WebMethod]
        public static Respuesta<bool> Editar(EPersona oPersona)
        {
            return new Respuesta<bool>
            {
                Estado = oPersona != null,
                Mensaje = oPersona != null ? "Actualizado correctamente" : "Ocurrio un error al actualizar"
            };
        }

        [WebMethod]
        public static Respuesta<List<EPersona>> ObtenerPersonasFiltro(string busqueda)
        {
            return NPersona.GetInstance().ObtenerPersonasFiltro(busqueda);
        }
    }
}