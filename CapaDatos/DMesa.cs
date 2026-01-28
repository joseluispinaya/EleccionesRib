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
    public class DMesa
    {
        #region "PATRON SINGLETON"
        private static DMesa instancia = null;
        private DMesa() { }
        public static DMesa GetInstance()
        {
            if (instancia == null)
            {
                instancia = new DMesa();
            }
            return instancia;
        }
        #endregion

        public Respuesta<List<EMesa>> ListaMesas(int IdRecinto, int IdEleccion)
        {
            try
            {
                List<EMesa> rptLista = new List<EMesa>();

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_MesasIdRecintoEleccion", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        comando.Parameters.AddWithValue("@IdRecinto", IdRecinto);
                        comando.Parameters.AddWithValue("@IdEleccion", IdEleccion);
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new EMesa()
                                {
                                    IdMesa = Convert.ToInt32(dr["IdMesa"]),
                                    IdRecinto = Convert.ToInt32(dr["IdRecinto"]),
                                    IdEleccion = Convert.ToInt32(dr["IdEleccion"]),
                                    NumeroMesa = Convert.ToInt32(dr["NumeroMesa"]),
                                    CantidadInscritos = Convert.ToInt32(dr["CantidadInscritos"])
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<EMesa>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Mesa obtenidos correctamente"
                };
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<EMesa>>()
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message,
                    Data = null
                };
            }
        }

        public Respuesta<List<EMesa>> ListarMesasPorRecinto(int idRecinto)
        {
            try
            {
                List<EMesa> rptLista = new List<EMesa>();

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_MesasIdRecintoNuevo", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        comando.Parameters.AddWithValue("@IdRecinto", idRecinto);
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new EMesa()
                                {
                                    IdMesa = Convert.ToInt32(dr["IdMesa"]),
                                    IdRecinto = Convert.ToInt32(dr["IdRecinto"]),
                                    IdEleccion = Convert.ToInt32(dr["IdEleccion"]),
                                    NumeroMesa = Convert.ToInt32(dr["NumeroMesa"]),
                                    CantidadInscritos = Convert.ToInt32(dr["CantidadInscritos"])
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<EMesa>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Mesa obtenidos correctamente"
                };
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<EMesa>>()
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message,
                    Data = null
                };
            }
        }

        public Respuesta<List<EMesa>> ListaMesasSelect(int IdRecinto, int IdEleccion)
        {
            try
            {
                List<EMesa> rptLista = new List<EMesa>();

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ObtenerMesasSinDelegado", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        comando.Parameters.AddWithValue("@IdRecinto", IdRecinto);
                        comando.Parameters.AddWithValue("@IdEleccion", IdEleccion);
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new EMesa()
                                {
                                    IdMesa = Convert.ToInt32(dr["IdMesa"]),
                                    NumeroMesa = Convert.ToInt32(dr["NumeroMesa"]),
                                    CantidadInscritos = Convert.ToInt32(dr["CantidadInscritos"])
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<EMesa>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Mesa obtenidos correctamente"
                };
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<EMesa>>()
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message,
                    Data = null
                };
            }
        }

        public Respuesta<bool> RegistrarMesas(EMesa oMesa)
        {
            try
            {
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_RegistrarMesa", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        // Parámetros de entrada
                        cmd.Parameters.AddWithValue("@IdRecinto", oMesa.IdRecinto);
                        cmd.Parameters.AddWithValue("@IdEleccion", oMesa.IdEleccion);
                        cmd.Parameters.AddWithValue("@NumeroMesa", oMesa.NumeroMesa);
                        cmd.Parameters.AddWithValue("@CantidadInscritos", oMesa.CantidadInscritos);

                        // Parámetro de salida
                        SqlParameter outputParam = new SqlParameter("@Resultado", SqlDbType.Int)
                        {
                            Direction = ParameterDirection.Output
                        };
                        cmd.Parameters.Add(outputParam);

                        // Ejecutar
                        con.Open();
                        cmd.ExecuteNonQuery();

                        // Leer resultado
                        int resultado = Convert.ToInt32(outputParam.Value);

                        // Evaluar resultado
                        switch (resultado)
                        {
                            case 1:
                                return new Respuesta<bool>
                                {
                                    Estado = true,
                                    Mensaje = "Mesa registrada correctamente.",
                                    Data = true
                                };

                            case 0:
                                return new Respuesta<bool>
                                {
                                    Estado = false,
                                    Mensaje = "Ya existe una mesa con ese número para el recinto y elección.",
                                    Data = false
                                };

                            case 2:
                            default:
                                return new Respuesta<bool>
                                {
                                    Estado = false,
                                    Mensaje = "Error al registrar la mesa (valores inválidos).",
                                    Data = false
                                };
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return new Respuesta<bool>
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message,
                    Data = false
                };
            }
        }

        public Respuesta<List<MesaDto>> ListaMesasConDelegados(int IdRecinto, int IdEleccion)
        {
            try
            {
                List<MesaDto> rptLista = new List<MesaDto>();

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ListarMesasConDelegado", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        comando.Parameters.AddWithValue("@IdRecinto", IdRecinto);
                        comando.Parameters.AddWithValue("@IdEleccion", IdEleccion);
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new MesaDto()
                                {
                                    IdMesa = Convert.ToInt32(dr["IdMesa"]),
                                    NumeroMesa = Convert.ToInt32(dr["NumeroMesa"]),
                                    // Mapeo de los nuevos campos
                                    IdAsignacion = Convert.ToInt32(dr["IdAsignacion"]), // Vendrá 0 si no hay nadie
                                    IdPersona = Convert.ToInt32(dr["IdPersona"]),       // Vendrá 0 si no hay nadie
                                    CI = dr["CI"].ToString(),
                                    // Convertimos el 1 o 0 de SQL a booleano de C#
                                    EstaAsignada = Convert.ToBoolean(dr["EstaAsignada"]),

                                    NombreDelegado = dr["NombreDelegado"].ToString(),
                                    Celular = dr["Celular"].ToString()
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<MesaDto>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Mesas obtenidos correctamente"
                };
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<MesaDto>>()
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message,
                    Data = null
                };
            }
        }

        public Respuesta<List<MesaPendienteDto>> ListarPendientes(int idPersona)
        {
            try
            {
                List<MesaPendienteDto> lista = new List<MesaPendienteDto>();

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_ListarMesasPendientesDelegado", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@IdPersona", idPersona);

                        con.Open();

                        using (SqlDataReader dr = cmd.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                lista.Add(new MesaPendienteDto()
                                {
                                    IdAsignacion = Convert.ToInt32(dr["IdAsignacion"]),
                                    IdMesa = Convert.ToInt32(dr["IdMesa"]),
                                    Localidad = dr["Localidad"].ToString(),
                                    Recinto = dr["Recinto"].ToString(),
                                    NumeroMesa = Convert.ToInt32(dr["NumeroMesa"]),
                                    CantidadInscritos = Convert.ToInt32(dr["CantidadInscritos"])
                                });
                            }
                        }
                    }
                }

                return new Respuesta<List<MesaPendienteDto>>()
                {
                    Estado = true,
                    Data = lista,
                    Mensaje = lista.Count > 0 ? "Tienes mesas pendientes." : "¡Todo listo! No tienes mesas pendientes."
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<List<MesaPendienteDto>> { Estado = false, Mensaje = ex.Message };
            }
        }
    }
}
