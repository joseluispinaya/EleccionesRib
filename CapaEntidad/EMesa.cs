namespace CapaEntidad
{
    public class EMesa
    {
        public int IdMesa { get; set; }
        public int IdRecinto { get; set; }
        public int IdEleccion { get; set; }
        public int NumeroMesa { get; set; }
        public int CantidadInscritos { get; set; }

        public string NroMesaStr => $"Nro: {NumeroMesa:D3}";
        public string CantidadInStr => $"{CantidadInscritos} Votantes";
    }
}
