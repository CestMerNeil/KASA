using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System.IO;

namespace kommande_auth_backend.Data
{
    public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<AppDbContext>
    {
        public AppDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<AppDbContext>();

            // Configure ici votre chaîne de connexion
            optionsBuilder.UseSqlite("Data Source=../kommande-access-backend/products.db");

            return new AppDbContext(optionsBuilder.Options);
        }
    }
}
