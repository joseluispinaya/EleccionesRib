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
    public class DEleccion
    {
        #region "PATRON SINGLETON"
        private static DEleccion instancia = null;
        private DEleccion() { }
        public static DEleccion GetInstance()
        {
            if (instancia == null)
            {
                instancia = new DEleccion();
            }
            return instancia;
        }
        #endregion

        public Respuesta<List<EEleccion>> ListaElecciones()
        {
            try
            {
                List<EEleccion> rptLista = new List<EEleccion>();

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ObtenerElecciones", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new EEleccion()
                                {
                                    IdEleccion = Convert.ToInt32(dr["IdEleccion"]),
                                    Descripcion = dr["Descripcion"].ToString(),
                                    Estado = Convert.ToBoolean(dr["Estado"]),
                                    FechaEleccionSt = Convert.ToDateTime(dr["FechaEleccion"]).ToString("dd/MM/yyyy"),
                                    FechaEleccion = Convert.ToDateTime(dr["FechaEleccion"].ToString())
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<EEleccion>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Eleccion obtenidos correctamente"
                };
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<EEleccion>>()
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message,
                    Data = null
                };
            }
        }

    }
}
