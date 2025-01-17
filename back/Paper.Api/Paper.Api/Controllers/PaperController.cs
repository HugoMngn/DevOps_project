using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Paper.Api.Models;

namespace Paper.Api.Controllers
{
    [Route("api/Product")]
    [ApiController]
    public class ProductService : ControllerBase
    {

        private static List<Product> ProductList = new()
        {
            new Product { Id = 1, Nom = "Polo", Texture = "Jean", Grammage="1 gr", Couleur = "rouge"},
            new Product { Id = 2, Nom = "Sampras", Texture = "Pierre", Grammage ="10 gr", Couleur = "doré"},
        };
        private static int MaxId = 2;
        [HttpGet()]
        public List<Product> Get()
        {
            return ProductList;
        }

        [HttpPost]
        public ObjectResult Post([FromBody] Product Product)
        {
            MaxId++;
            Product.Id = MaxId;
            ProductList.Add(Product);
            return Created($"api/Product/{Product.Id}", new { Id = Product.Id});
        }
    }
}
