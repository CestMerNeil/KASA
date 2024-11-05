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
                Image = "https://perso.isima.fr/~aoxie/KASA/iphone-14-pro-max.jpg",
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
                Image = "https://perso.isima.fr/~aoxie/KASA/macbook-air-m2.jpg",
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
                Image = "https://perso.isima.fr/~aoxie/KASA/samsung-galaxy-s23-ultra.jpg",
                Clicks = 3321,
                Type = "phone"
            },
            new Product
            {
                Id = 4,
                SerialNumber = "SN10004",
                ProductName = "Amazon Kindle Paperwhite",
                Brand = "Amazon",
                Model = "Paperwhite",
                Description = "Amazon Kindle Paperwhite with 6-inch glare-free display, 8GB storage, and adjustable backlight.",
                Price = 129.99m,
                Image = "https://perso.isima.fr/~aoxie/KASA/amazon-kindle-paperwhite.jpg",
                Clicks = 1045,
                Type = "ebook"
            },
            new Product
            {
                Id = 5,
                SerialNumber = "SN10005",
                ProductName = "Apple AirPods Pro",
                Brand = "Apple",
                Model = "AirPods Pro",
                Description = "Apple AirPods Pro with active noise cancellation, adaptive transparency, and spatial audio.",
                Price = 249.99m,
                Image = "https://perso.isima.fr/~aoxie/KASA/apple-airpods-pro.png",
                Clicks = 3247,
                Type = "earbuds"
            },
            new Product
            {
                Id = 6,
                SerialNumber = "SN10006",
                ProductName = "ASUS ROG Zephyrus G14",
                Brand = "ASUS",
                Model = "ROG Zephyrus G14",
                Description = "ASUS ROG Zephyrus G14 gaming laptop with AMD Ryzen 9, NVIDIA GeForce RTX 3060, and 144Hz display.",
                Price = 1499.99m,
                Image = "https://perso.isima.fr/~aoxie/KASA/asus-rog-zephyrus-g14.jpg",
                Clicks = 2841,
                Type = "laptop"
            },
            new Product
            {
                Id = 7,
                SerialNumber = "SN10007",
                ProductName = "Bose QuietComfort 45",
                Brand = "Bose",
                Model = "QuietComfort 45",
                Description = "Bose QuietComfort 45 noise-cancelling wireless headphones with up to 24 hours of battery life.",
                Price = 329.99m,
                Image = "https://perso.isima.fr/~aoxie/KASA/bose-quietcomfort-45.jpeg",
                Clicks = 2305,
                Type = "headphones"
            },
            new Product
            {
                Id = 8,
                SerialNumber = "SN10008",
                ProductName = "Dell XPS 13",
                Brand = "Dell",
                Model = "XPS 13",
                Description = "Dell XPS 13 laptop with 13.4-inch FHD+ display, Intel Core i7 processor, and 16GB RAM.",
                Price = 1099.99m,
                Image = "https://perso.isima.fr/~aoxie/KASA/dell-xps-13.jpg",
                Clicks = 1940,
                Type = "laptop"
            },
            new Product
            {
                Id = 9,
                SerialNumber = "SN10009",
                ProductName = "Fitbit Charge 5",
                Brand = "Fitbit",
                Model = "Charge 5",
                Description = "Fitbit Charge 5 fitness tracker with built-in GPS, heart rate monitor, and stress management tools.",
                Price = 149.99m,
                Image = "https://perso.isima.fr/~aoxie/KASA/fitbit-charge-5.png",
                Clicks = 2540,
                Type = "wearable"
            },
            new Product
            {
                Id = 10,
                SerialNumber = "SN10010",
                ProductName = "Sony PlayStation 5",
                Brand = "Sony",
                Model = "PS5",
                Description = "Sony PlayStation 5 console with 825GB storage, Ray Tracing, and 4K graphics capability.",
                Price = 499.99m,
                Image = "https://perso.isima.fr/~aoxie/KASA/sony-playstation-5.jpg",
                Clicks = 8650,
                Type = "console"
            },
            new Product
            {
                Id = 11,
                SerialNumber = "SN10011",
                ProductName = "Google Pixel 7 Pro",
                Brand = "Google",
                Model = "Pixel 7 Pro",
                Description = "Google Pixel 7 Pro smartphone with Google Tensor G2, 6.7-inch QHD+ display, and 50MP camera.",
                Price = 899.99m,
                Image = "https://perso.isima.fr/~aoxie/KASA/google-pixel-7-pro.jpg",
                Clicks = 1235,
                Type = "phone"
            },
            new Product
            {
                Id = 12,
                SerialNumber = "SN10012",
                ProductName = "Microsoft Surface Pro 9",
                Brand = "Microsoft",
                Model = "Surface Pro 9",
                Description = "Microsoft Surface Pro 9 tablet with 13-inch PixelSense display, Intel Core i5, and 8GB RAM.",
                Price = 999.99m,
                Image = "https://perso.isima.fr/~aoxie/KASA/microsoft-surface-pro-9.jpg",
                Clicks = 1475,
                Type = "tablet"
            },
            new Product
            {
                Id = 13,
                SerialNumber = "SN10013",
                ProductName = "Oculus Quest 2",
                Brand = "Meta",
                Model = "Quest 2",
                Description = "Meta Oculus Quest 2 VR headset with 128GB storage and wireless standalone operation.",
                Price = 399.99m,
                Image = "https://perso.isima.fr/~aoxie/KASA/oculus-quest-2.jpg",
                Clicks = 3450,
                Type = "vr-headset"
            }
        );
    }
}
