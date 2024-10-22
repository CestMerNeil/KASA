var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

var products = new[]
{
    new Product(
        "SN10001",
        "iPhone 14 Pro Max",
        "Apple",
        "MQ8P3CH/A",
        "Apple iPhone 14 Pro Max with 6.7-inch Super Retina XDR display, A16 Bionic chip, and 48MP camera system.",
        1199.99m,
        "https://static.digitecgalaxus.ch/Files/6/8/2/2/9/0/1/0/iPhone_14_Pro_Max_Gold_PDP_Image_Position-4__WWEN.jpg",
        5634,
        "phone"
    ),
    new Product(
        "SN10002",
        "MacBook Air M2",
        "Apple",
        "MLY13CH/A",
        "13.6-inch MacBook Air powered by M2 chip, featuring 8GB RAM and 256GB SSD storage.",
        999.99m,
        "https://xstore.md/images/product/2022/06/Apple-Macbook-Air-M2-Midnight-1.jpg",
        4270,
        "laptop"
    ),
    new Product(
        "SN10003",
        "Samsung Galaxy S23 Ultra",
        "Samsung",
        "SM-S9180",
        "Samsung Galaxy S23 Ultra with 6.8-inch QHD+ display, Snapdragon 8 Gen 2, and a 200MP quad-camera system.",
        1199.99m,
        "https://cdn1.smartprix.com/rx-izLSMVlI0-w1200-h1200/zLSMVlI0.jpg",
        3321,
        "phone"
    ),
};

app.MapGet("/products", () =>
{
    return products;
})
.WithName("GetProducts")
.WithOpenApi();

app.UseHttpsRedirection();

app.Run();

record Product(string SerialNumber, string ProductName, string Brand, string Model, string Description, decimal Price, string Image, int Clicks, string Type);