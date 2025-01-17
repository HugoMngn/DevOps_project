namespace Paper.Api.Models
{
    public class Product
    {
        public int Id { get; set; }
        
        public string Nom { get; set; } = "";
        
        public string Texture { get; set; } = "";
        
        public string Grammage { get; set; } = "";
        
        public string Couleur { get; set; } = "";
    }
}
