using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDatos;
using CapaEntidad;

namespace CapaNegocio
{
    public class NMesa
    {
        #region "PATRON SINGLETON"
        private static NMesa instancia = null;
        private NMesa() { }
        public static NMesa GetInstance()
        {
            if (instancia == null)
            {
                instancia = new NMesa();
            }
            return instancia;
        }
        #endregion

        public Respuesta<List<EMesa>> ListaMesas(int IdRecinto, int IdEleccion)
        {
            return DMesa.GetInstance().ListaMesas(IdRecinto, IdEleccion);
        }

        public Respuesta<List<EMesa>> ListaMesasSelect(int IdRecinto, int IdEleccion)
        {
            return DMesa.GetInstance().ListaMesasSelect(IdRecinto, IdEleccion);
        }

        public Respuesta<bool> RegistrarMesas(EMesa oMesa)
        {
            return DMesa.GetInstance().RegistrarMesas(oMesa);
        }

        public Respuesta<List<MesaDto>> ListaMesasConDelegados(int IdRecinto, int IdEleccion)
        {
            return DMesa.GetInstance().ListaMesasConDelegados(IdRecinto, IdEleccion);
        }
    }
}
