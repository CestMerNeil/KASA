using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
    public DbSet<Product> Products { get; set; }
    
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasKey(p => p.Id); 

            entity.Property(p => p.ProductName)
                .IsRequired()
                .HasMaxLength(100); 
        });


        modelBuilder.Entity<Product>().HasData(
            new Product
            {
                Id = 1,
                SerialNumber = "SN10001",
                ProductName = "iPhone 14 Pro Max",
                Brand = "Apple",
                Model = "MQ8P3CH/A",
                Description = "Apple iPhone 14 Pro Max with 6.7-inch Super Retina XDR display, A16 Bionic chip, and 48MP camera system.",
                Price = 1199.99m,
                Image = "https://static.digitecgalaxus.ch/Files/6/8/2/2/9/0/1/0/iPhone_14_Pro_Max_Gold_PDP_Image_Position-4__WWEN.jpg",
                Clicks = 5634,
                Type = "phone"
            },
            new Product
            {
                Id = 2,
                SerialNumber = "SN10002",
                ProductName = "MacBook Air M2",
                Brand = "Apple",
                Model = "MLY13CH/A",
                Description = "13.6-inch MacBook Air powered by M2 chip, featuring 8GB RAM and 256GB SSD storage.",
                Price = 999.99m,
                Image = "https://xstore.md/images/product/2022/06/Apple-Macbook-Air-M2-Midnight-1.jpg",
                Clicks = 4270,
                Type = "laptop"
            },

            new Product
            {
                Id = 3,
                SerialNumber = "SN10003",
                ProductName = "Samsung Galaxy S23 Ultra",
                Brand = "Samsung",
                Model = "SM-S9180",
                Description = "Samsung Galaxy S23 Ultra with 6.8-inch QHD+ display, Snapdragon 8 Gen 2, and a 200MP quad-camera system.",
                Price = 1199.99m,
                Image = "https://cdn1.smartprix.com/rx-izLSMVlI0-w1200-h1200/zLSMVlI0.jpg",
                Clicks = 3321,
                Type = "phone"
            }
        );
    }
}
