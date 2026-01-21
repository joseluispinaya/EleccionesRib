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
    public class DPersona
    {
        #region "PATRON SINGLETON"
        private static DPersona instancia = null;
        private DPersona() { }
        public static DPersona GetInstance()
        {
            if (instancia == null)
            {
                instancia = new DPersona();
            }
            return instancia;
        }
        #endregion

        public Respuesta<List<EPersona>> ListaPersonas()
        {
            try
            {
                List<EPersona> rptLista = new List<EPersona>();

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ObtenerPersonas", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new EPersona()
                                {
                                    IdPersona = Convert.ToInt32(dr["IdPersona"]),
                                    NombreCompleto = dr["NombreCompleto"].ToString(),
                                    CI = dr["CI"].ToString(),
                                    Correo = dr["Correo"].ToString(),
                                    Celular = dr["Celular"].ToString(),
                                    ClaveHash = dr["ClaveHash"].ToString(),
                                    Rol = dr["Rol"].ToString(),
                                    Estado = Convert.ToBoolean(dr["Estado"])
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<EPersona>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "EPersona obtenidos correctamente"
                };
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<EPersona>>()
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message,
                    Data = null
                };
            }
        }

        public Respuesta<bool> RegistrarPersona(EPersona oPersona)
        {
            try
            {
                bool respuesta = false;
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_RegistrarPersona", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@NombreCompleto", oPersona.NombreCompleto);
                        cmd.Parameters.AddWithValue("@CI", oPersona.CI);
                        cmd.Parameters.AddWithValue("@Correo", oPersona.Correo);
                        cmd.Parameters.AddWithValue("@Celular", oPersona.Celular);
                        cmd.Parameters.AddWithValue("@ClaveHash", oPersona.ClaveHash);

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
                    Mensaje = respuesta ? "Se registro correctamente" : "Error al registrar intente con otro nro ci o correo"
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }

        public Respuesta<List<EPersona>> ObtenerPersonasFiltro(string Busqueda)
        {
            try
            {
                List<EPersona> rptLista = new List<EPersona>();

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ObtenerPersonasFiltro", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        comando.Parameters.AddWithValue("@Busqueda", Busqueda);
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new EPersona()
                                {
                                    IdPersona = Convert.ToInt32(dr["IdPersona"]),
                                    NombreCompleto = dr["NombreCompleto"].ToString(),
                                    CI = dr["CI"].ToString(),
                                    Correo = dr["Correo"].ToString(),
                                    Celular = dr["Celular"].ToString()
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<EPersona>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "EPersona obtenidos correctamente"
                };
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<EPersona>>()
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message,
                    Data = null
                };
            }
        }
    }
}
