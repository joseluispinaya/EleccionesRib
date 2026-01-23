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
    public class DPartidoPol
    {
        #region "PATRON SINGLETON"
        private static DPartidoPol instancia = null;
        private DPartidoPol() { }
        public static DPartidoPol GetInstance()
        {
            if (instancia == null)
            {
                instancia = new DPartidoPol();
            }
            return instancia;
        }
        #endregion

        public Respuesta<List<EPartidoPol>> ListaPartidosPoliticos()
        {
            try
            {
                List<EPartidoPol> rptLista = new List<EPartidoPol>();

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ObtenerPartidosPoli", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new EPartidoPol()
                                {
                                    IdPartido = Convert.ToInt32(dr["IdPartido"]),
                                    Nombre = dr["Nombre"].ToString(),
                                    Sigla = dr["Sigla"].ToString(),
                                    LogoUrl = dr["LogoUrl"].ToString(),
                                    ColorHex = dr["ColorHex"].ToString(),
                                    Estado = Convert.ToBoolean(dr["Estado"])
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<EPartidoPol>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Partidos politicos obtenidos correctamente"
                };
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<EPartidoPol>>()
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message,
                    Data = null
                };
            }
        }
    }
}
