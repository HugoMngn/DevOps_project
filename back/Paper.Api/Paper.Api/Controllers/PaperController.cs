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
            new Product { Id = 1, Nom = "Papier 3", Texture = "Granuleux", Grammage = "1 gr", Couleur = "rouge" },
            new Product { Id = 2, Nom = "Papier 4", Texture = "Doux", Grammage = "10 gr", Couleur = "doré" },
           };

        private static int MaxId = 2;

        // GET: api/Product
        [HttpGet]
        public ActionResult<List<Product>> Get()
        {
            return Ok(ProductList);
        }

        // GET: api/Product/{id}
        [HttpGet("{id:int}")]
        public ActionResult<Product> GetById(int id)
        {
            var product = ProductList.FirstOrDefault(p => p.Id == id);
            if (product == null)
            {
                return NotFound(new { Message = $"Le produit avec l'ID {id} n'existe pas." });
            }
            return Ok(product);
        }

        // POST: api/Product
        [HttpPost]
        public ActionResult Post([FromBody] Product product)
        {
            if (product == null || string.IsNullOrEmpty(product.Nom))
            {
                return BadRequest(new { Message = "Les informations du produit sont invalides." });
            }

            MaxId++;
            product.Id = MaxId;
            ProductList.Add(product);
            return Created($"api/Product/{product.Id}", new { Id = product.Id });
        }

        // PUT: api/Product/{id}
        [HttpPut("{id:int}")]
        public ActionResult Put(int id, [FromBody] Product updatedProduct)
        {
            var existingProduct = ProductList.FirstOrDefault(p => p.Id == id);
            if (existingProduct == null)
            {
                return NotFound(new { Message = $"Le produit avec l'ID {id} n'existe pas." });
            }

            existingProduct.Nom = updatedProduct.Nom ?? existingProduct.Nom;
            existingProduct.Texture = updatedProduct.Texture ?? existingProduct.Texture;
            existingProduct.Grammage = updatedProduct.Grammage ?? existingProduct.Grammage;
            existingProduct.Couleur = updatedProduct.Couleur ?? existingProduct.Couleur;

            return NoContent(); // 204 No Content
        }

        // DELETE: api/Product/{id}
        [HttpDelete("{id:int}")]
        public ActionResult Delete(int id)
        {
            var product = ProductList.FirstOrDefault(p => p.Id == id);
            if (product == null)
            {
                return NotFound(new { Message = $"Le produit avec l'ID {id} n'existe pas." });
            }

            ProductList.Remove(product);
            return NoContent(); // 204 No Content
        }
    }
}
