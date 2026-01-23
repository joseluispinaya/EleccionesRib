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
    public class DResultados
    {
        #region "PATRON SINGLETON"
        private static DResultados instancia = null;
        private DResultados() { }
        public static DResultados GetInstance()
        {
            if (instancia == null)
            {
                instancia = new DResultados();
            }
            return instancia;
        }
        #endregion

        public Respuesta<bool> GuardarVotos(string VotosXml)
        {
            var respuesta = new Respuesta<bool>();

            try
            {
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                using (SqlCommand cmd = new SqlCommand("usp_RegistrarDatosVotacion", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.Add("@VotosXml", SqlDbType.Xml).Value = VotosXml;

                    var resultado = new SqlParameter("@Resultado", SqlDbType.Bit)
                    {
                        Direction = ParameterDirection.Output
                    };
                    cmd.Parameters.Add(resultado);

                    con.Open();
                    cmd.ExecuteNonQuery();

                    respuesta.Estado = Convert.ToBoolean(resultado.Value);
                    respuesta.Mensaje = respuesta.Estado
                        ? "Registro realizado correctamente."
                        : "Esta mesa ya tiene votos registrados.";
                }
            }
            catch (Exception ex)
            {
                respuesta.Estado = false;
                respuesta.Mensaje = $"Error: {ex.Message}";
            }

            return respuesta;
        }
    }
}
