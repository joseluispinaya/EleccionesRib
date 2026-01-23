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
    public partial class Login : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            Response.AppendHeader("Cache-Control", "no-store");
        }

        [WebMethod]
        public static Respuesta<DelegadoDto> Logeo(string Usuario, string Clave)
        {
            try
            {
                var obj = NPersona.GetInstance().LoginDelegado(Usuario, Clave);

                if (!obj.Estado)
                {
                    return new Respuesta<DelegadoDto>
                    {
                        Estado = false,
                        Mensaje = obj.Mensaje
                    };
                }

                var objUser = obj.Data;
                if (!objUser.Estado)
                {
                    return new Respuesta<DelegadoDto>
                    {
                        Estado = false,
                        Mensaje = "El delegado no se encuentra activo para el uso del sistema."
                    };
                }

                //HttpContext.Current.Session["adminUs"] = objUser;

                return obj;
            }
            catch (Exception ex)
            {
                return new Respuesta<DelegadoDto>
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message
                };
            }
        }
    }
}