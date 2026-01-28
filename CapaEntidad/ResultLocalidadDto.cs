namespace CapaEntidad
{
    public class ResultLocalidadDto
    {
        public int IdLocalidad { get; set; }
        public string NombreLocalidad { get; set; }
        public string NombrePartido { get; set; }
        public string Sigla { get; set; }
        public string LogoUrl { get; set; }
        public string ColorHex { get; set; }
        public int TotalVotos { get; set; }

        public string ImageFulP => string.IsNullOrEmpty(LogoUrl)
            ? $"/Imagenes/sinimagen.png"
            : LogoUrl;

        public string CantidadVotStr => $"{TotalVotos} Votos";
    }
}
