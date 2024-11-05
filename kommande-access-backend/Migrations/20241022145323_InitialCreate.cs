using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace kommande_access_backend.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    SerialNumber = table.Column<string>(type: "TEXT", nullable: false),
                    ProductName = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    Brand = table.Column<string>(type: "TEXT", nullable: false),
                    Model = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: false),
                    Price = table.Column<decimal>(type: "TEXT", nullable: false),
                    Image = table.Column<string>(type: "TEXT", nullable: false),
                    Clicks = table.Column<int>(type: "INTEGER", nullable: false),
                    Type = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "Brand", "Clicks", "Description", "Image", "Model", "Price", "ProductName", "SerialNumber", "Type" },
                values: new object[,]
                {
                    { 1, "Apple", 5634, "Apple iPhone 14 Pro Max with 6.7-inch Super Retina XDR display, A16 Bionic chip, and 48MP camera system.", "https://static.digitecgalaxus.ch/Files/6/8/2/2/9/0/1/0/iPhone_14_Pro_Max_Gold_PDP_Image_Position-4__WWEN.jpg", "MQ8P3CH/A", 1199.99m, "iPhone 14 Pro Max", "SN10001", "phone" },
                    { 2, "Apple", 4270, "13.6-inch MacBook Air powered by M2 chip, featuring 8GB RAM and 256GB SSD storage.", "https://xstore.md/images/product/2022/06/Apple-Macbook-Air-M2-Midnight-1.jpg", "MLY13CH/A", 999.99m, "MacBook Air M2", "SN10002", "laptop" },
                    { 3, "Samsung", 3321, "Samsung Galaxy S23 Ultra with 6.8-inch QHD+ display, Snapdragon 8 Gen 2, and a 200MP quad-camera system.", "https://cdn1.smartprix.com/rx-izLSMVlI0-w1200-h1200/zLSMVlI0.jpg", "SM-S9180", 1199.99m, "Samsung Galaxy S23 Ultra", "SN10003", "phone" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Products");
        }
    }
}
