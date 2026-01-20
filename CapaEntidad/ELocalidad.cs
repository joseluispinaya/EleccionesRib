namespace CapaEntidad
{
    public class ELocalidad
    {
        public int IdLocalidad { get; set; }
        public string Nombre { get; set; }
        public int NroRecintos { get; set; }

        public string CantiRecintos => 
            NroRecintos == 0 
            ? "0 Recintos" 
            : NroRecintos == 1 
                ? "1 Recinto" 
                : $"{NroRecintos} Recintos";
    }
}
