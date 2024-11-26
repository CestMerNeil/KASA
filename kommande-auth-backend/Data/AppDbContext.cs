using kommande_auth_backend.Models;
using Microsoft.EntityFrameworkCore;

namespace kommande_auth_backend.Data;

public class AppDbContext : DbContext
{
    public DbSet<User> Users { get; set; }

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
        
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>(
            entity =>
            { 
                entity.HasKey(u => u.Id);
                entity.HasIndex(u => u.Name).IsUnique();
            });
        
        modelBuilder.Entity<User>()
            .HasDiscriminator<string>("type")  
            .HasValue<User>("User")  
            .HasValue<BasicUser>("BasicUser") 
            .HasValue<GoogleUser>("GoogleUser"); 
    }
}