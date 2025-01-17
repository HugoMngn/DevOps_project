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
            new Product { Id = 1, nom = "Polo", texture = "Jean", grammage="1 gr", couleur = "rouge"},
            new Product { Id = 2, nom = "Sampras", texture = "Pierre", grammage ="10 gr", couleur = "doré"},
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
