namespace CapaEntidad
{
    public class ERecinto
    {
        public int IdRecinto { get; set; }
        public int IdLocalidad { get; set; }
        public string Nombre { get; set; }
        public int NroMesas { get; set; }

        public string CantiMesas =>
            NroMesas == 0
            ? "0 Mesas"
            : NroMesas == 1
                ? "1 Mesa"
                : $"{NroMesas} Mesas";
    }
}
