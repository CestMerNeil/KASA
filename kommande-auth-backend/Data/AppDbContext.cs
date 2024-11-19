using kommande_auth_backend.Models;
using Microsoft.EntityFrameworkCore;

namespace kommande_auth_backend.Data;

public class AppDbContext : DbContext
{
    public DbSet<User> Users { get; set; }

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
        
    }

    public void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>(entity => entity.HasKey(u => u.Id));

        modelBuilder.Entity<User>().HasData(
            new GoogleUser
            {
                Id = "1",
                Name = "Antoine",
                Email = "antoine.viton@etu.uca.fr",
                PhoneNumber = "0600000000",
                Image=""
            },
            new BasicUser
            {
                Id = "2",
                Name = "Reynalde",
                Email = "test@test.com",
                Password = "test",
                PhoneNumber = "0611111111"
            }
        );
    }
}