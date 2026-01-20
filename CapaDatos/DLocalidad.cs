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
    public class DLocalidad
    {
        #region "PATRON SINGLETON"
        private static DLocalidad instancia = null;
        private DLocalidad() { }
        public static DLocalidad GetInstance()
        {
            if (instancia == null)
            {
                instancia = new DLocalidad();
            }
            return instancia;
        }
        #endregion

        public Respuesta<bool> RegistrarLocalidad(ELocalidad oLocalidad)
        {
            try
            {
                bool respuesta = false;
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_RegistrarLocalidad", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@Nombre", oLocalidad.Nombre);

                        SqlParameter outputParam = new SqlParameter("@Resultado", SqlDbType.Bit)
                        {
                            Direction = ParameterDirection.Output
                        };
                        cmd.Parameters.Add(outputParam);

                        con.Open();
                        cmd.ExecuteNonQuery();
                        respuesta = Convert.ToBoolean(outputParam.Value);
                    }
                }
                return new Respuesta<bool>
                {
                    Estado = respuesta,
                    Mensaje = respuesta ? "Localidad registrada correctamente." : "El nombre de la Localidad ya existe, intente con otro."
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }

        public Respuesta<bool> EditarLocalidad(ELocalidad oLocalidad)
        {
            try
            {
                bool respuesta = false;
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_ModificarLocalidad", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@IdLocalidad", oLocalidad.IdLocalidad);
                        cmd.Parameters.AddWithValue("@Nombre", oLocalidad.Nombre);

                        SqlParameter outputParam = new SqlParameter("@Resultado", SqlDbType.Bit)
                        {
                            Direction = ParameterDirection.Output
                        };
                        cmd.Parameters.Add(outputParam);

                        con.Open();
                        cmd.ExecuteNonQuery();
                        respuesta = Convert.ToBoolean(outputParam.Value);
                    }
                }
                return new Respuesta<bool>
                {
                    Estado = respuesta,
                    Mensaje = respuesta ? "Localidad actualizada correctamente." : "No se pudo actualizar. Verifique que el nombre no esté duplicado o que el registro exista."
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }

        public Respuesta<List<ELocalidad>> ListaLocalidades()
        {
            try
            {
                List<ELocalidad> rptLista = new List<ELocalidad>();

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ObtenerLocalidadesConConteo", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new ELocalidad()
                                {
                                    IdLocalidad = Convert.ToInt32(dr["IdLocalidad"]),
                                    Nombre = dr["Nombre"].ToString(),
                                    NroRecintos = Convert.ToInt32(dr["NroRecintos"])
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<ELocalidad>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Localidades obtenidos correctamente"
                };
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<ELocalidad>>()
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message,
                    Data = null
                };
            }
        }
    }
}
