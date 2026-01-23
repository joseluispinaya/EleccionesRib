using CapaEntidad;
using CapaNegocio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Xml.Linq;

namespace CapaPresentacion.MasterDelegado
{
    public partial class InicioDelegado : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static Respuesta<List<EPartidoPol>> ListaPartidos()
        {

            return NPartidoPol.GetInstance().ListaPartidosPoliticos();
        }

        [WebMethod]
        public static Respuesta<List<MesaPendienteDto>> MesasAsignadasDelegados(int IdPersona)
        {
            if (IdPersona <= 0)
            {
                return new Respuesta<List<MesaPendienteDto>>() { Estado = false, Mensaje = "Debe seleccionar un Recinto" };
            }

            return NMesa.GetInstance().ListarPendientes(IdPersona);
        }

        [WebMethod]
        public static Respuesta<bool> GuardarVotos(EActa oActa, List<EDetalleVoto> ListaDetalleVoto)
        {
            try
            {
                if (ListaDetalleVoto == null || !ListaDetalleVoto.Any())
                {
                    return new Respuesta<bool> { Estado = false, Mensaje = "No se encontró datos de votación de los partidos." };
                }

                XElement actastr = new XElement("Acta",
                    new XElement("IdMesa", oActa.IdMesa),
                    new XElement("IdAsignacion", oActa.IdAsignacion),
                    new XElement("VotosNulos", oActa.VotosNulos),
                    new XElement("VotosBlancos", oActa.VotosBlancos),
                    new XElement("TotalVotosEmitidos", oActa.TotalVotosEmitidos),
                    new XElement("ObservacionDelegado", oActa.ObservacionDelegado)
                );

                XElement detalleVoto = new XElement("DetalleVoto");

                foreach (EDetalleVoto item in ListaDetalleVoto)
                {
                    detalleVoto.Add(new XElement("Item",

                        new XElement("IdPartido", item.IdPartido),
                        new XElement("VotosObtenidos", item.VotosObtenidos)
                        )

                    );
                }

                actastr.Add(detalleVoto);
                return NResultados.GetInstance().GuardarVotos(actastr.ToString());
            }
            catch (Exception ex)
            {
                // Capturar cualquier error y retornar una respuesta de fallo
                return new Respuesta<bool>
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message
                };
            }
        }
    }
}