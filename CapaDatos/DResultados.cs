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

        public Respuesta<List<ResultadoVotacionDto>> ResultGeneVotacion()
        {
            try
            {
                List<ResultadoVotacionDto> rptLista = new List<ResultadoVotacionDto>();

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ObtenerResultadosEleccionActiva", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new ResultadoVotacionDto()
                                {
                                    NombrePartido = dr["NombrePartido"].ToString(),
                                    Sigla = dr["Sigla"].ToString(),
                                    ColorHex = dr["ColorHex"].ToString(),
                                    TotalVotos = Convert.ToInt32(dr["TotalVotos"]),
                                    Orden = Convert.ToInt32(dr["Orden"])
                                });
                            }
                        }
                    }
                }

                return new Respuesta<List<ResultadoVotacionDto>>() { Estado = true, Data = rptLista };
            }
            catch (Exception ex)
            {
                return new Respuesta<List<ResultadoVotacionDto>>()
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message,
                    Data = null
                };
            }
        }

        public Respuesta<List<MesaDto>> ListaMesasSinResult(int IdRecinto, int IdEleccion)
        {
            try
            {
                List<MesaDto> rptLista = new List<MesaDto>();

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ListarMesasSinResultados", con))
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
                                    IdAsignacion = Convert.ToInt32(dr["IdAsignacion"]), // Vendrá 0 si no hay nadie
                                    IdPersona = Convert.ToInt32(dr["IdPersona"]),
                                    NombreDelegado = dr["NombreDelegado"].ToString(),
                                    Celular = dr["Celular"].ToString(),
                                    // el CI lo uso para EstadoRegistro
                                    CI = dr["EstadoRegistro"].ToString(),
                                    // Convertimos el 1 o 0 de SQL a booleano de C#
                                    EstaAsignada = Convert.ToBoolean(dr["EstaAsignada"]),

                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<MesaDto>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Consultas obtenidos correctamente"
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

        public Respuesta<List<ResultadoVotacionDto>> ObtenerResultadosPorRecinto(int idRecinto)
        {
            try
            {
                List<ResultadoVotacionDto> rptLista = new List<ResultadoVotacionDto>();

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ObtenerResultadosPorRecinto", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        comando.Parameters.AddWithValue("@IdRecinto", idRecinto);
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new ResultadoVotacionDto()
                                {
                                    NombrePartido = dr["NombrePartido"].ToString(),
                                    Sigla = dr["Sigla"].ToString(),
                                    ColorHex = dr["ColorHex"].ToString(),
                                    TotalVotos = Convert.ToInt32(dr["TotalVotos"]),
                                    Orden = Convert.ToInt32(dr["Orden"])
                                });
                            }
                        }
                    }
                }

                return new Respuesta<List<ResultadoVotacionDto>>() { Estado = true, Data = rptLista };
            }
            catch (Exception ex)
            {
                return new Respuesta<List<ResultadoVotacionDto>>()
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message,
                    Data = null
                };
            }
        }

        public Respuesta<List<ResultadoVotacionDto>> ObtenerResultadosPorMesa(int idMesa)
        {
            try
            {
                List<ResultadoVotacionDto> rptLista = new List<ResultadoVotacionDto>();

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ObtenerResultadosPorMesa", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        comando.Parameters.AddWithValue("@IdMesa", idMesa);
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new ResultadoVotacionDto()
                                {
                                    NombrePartido = dr["NombrePartido"].ToString(),
                                    Sigla = dr["Sigla"].ToString(),
                                    ColorHex = dr["ColorHex"].ToString(),
                                    TotalVotos = Convert.ToInt32(dr["TotalVotos"]),
                                    Orden = Convert.ToInt32(dr["Orden"])
                                });
                            }
                        }
                    }
                }

                return new Respuesta<List<ResultadoVotacionDto>>() { Estado = true, Data = rptLista };
            }
            catch (Exception ex)
            {
                return new Respuesta<List<ResultadoVotacionDto>>()
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message,
                    Data = null
                };
            }
        }

        public Respuesta<List<ResultLocalidadDto>> ResultPorLocalidad()
        {
            try
            {
                List<ResultLocalidadDto> rptLista = new List<ResultLocalidadDto>();

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ObtenerGanadorPorLocalidad", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new ResultLocalidadDto()
                                {
                                    IdLocalidad = Convert.ToInt32(dr["IdLocalidad"]),
                                    NombreLocalidad = dr["NombreLocalidad"].ToString(),
                                    NombrePartido = dr["NombrePartido"].ToString(),
                                    Sigla = dr["Sigla"].ToString(),
                                    LogoUrl = dr["LogoUrl"].ToString(),
                                    ColorHex = dr["ColorHex"].ToString(),
                                    TotalVotos = Convert.ToInt32(dr["TotalVotos"])
                                });
                            }
                        }
                    }
                }

                return new Respuesta<List<ResultLocalidadDto>>() { Estado = true, Data = rptLista };
            }
            catch (Exception ex)
            {
                return new Respuesta<List<ResultLocalidadDto>>()
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message,
                    Data = null
                };
            }
        }

        public Respuesta<List<ResultadoVotacionDto>> DetalleResultLocalidad(int idLocalidad)
        {
            try
            {
                List<ResultadoVotacionDto> rptLista = new List<ResultadoVotacionDto>();

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ObtenerResultadosPorLocalidad", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        comando.Parameters.AddWithValue("@IdLocalidad", idLocalidad);
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new ResultadoVotacionDto()
                                {
                                    NombrePartido = dr["NombrePartido"].ToString(),
                                    Sigla = dr["Sigla"].ToString(),
                                    ColorHex = dr["ColorHex"].ToString(),
                                    TotalVotos = Convert.ToInt32(dr["TotalVotos"]),
                                    Orden = Convert.ToInt32(dr["Orden"])
                                });
                            }
                        }
                    }
                }

                return new Respuesta<List<ResultadoVotacionDto>>() { Estado = true, Data = rptLista };
            }
            catch (Exception ex)
            {
                return new Respuesta<List<ResultadoVotacionDto>>()
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message,
                    Data = null
                };
            }
        }

    }
}
