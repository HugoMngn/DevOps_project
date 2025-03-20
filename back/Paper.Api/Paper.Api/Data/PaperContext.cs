using Microsoft.EntityFrameworkCore;
using Paper.Api.Models;

namespace Paper.Api.Data
{
    public class PaperContext : DbContext
    {
        public PaperContext(DbContextOptions<PaperContext> options) : base(options) { }

        public DbSet<Product> Products { get; set; }
    }
}