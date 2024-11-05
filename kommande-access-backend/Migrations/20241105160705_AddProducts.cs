using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace kommande_access_backend.Migrations
{
    /// <inheritdoc />
    public partial class AddProducts : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "Brand", "Clicks", "Description", "Image", "Model", "Price", "ProductName", "SerialNumber", "Type" },
                values: new object[,]
                {
                    { 4, "Amazon", 1045, "Amazon Kindle Paperwhite with 6-inch glare-free display, 8GB storage, and adjustable backlight.", "https://perso.isima.fr/~aoxie/KASA/amazon-kindle-paperwhite.jpg", "Paperwhite", 129.99m, "Amazon Kindle Paperwhite", "SN10004", "ebook" },
                    { 5, "Apple", 3247, "Apple AirPods Pro with active noise cancellation, adaptive transparency, and spatial audio.", "https://perso.isima.fr/~aoxie/KASA/apple-airpods-pro.png", "AirPods Pro", 249.99m, "Apple AirPods Pro", "SN10005", "earbuds" },
                    { 6, "ASUS", 2841, "ASUS ROG Zephyrus G14 gaming laptop with AMD Ryzen 9, NVIDIA GeForce RTX 3060, and 144Hz display.", "https://perso.isima.fr/~aoxie/KASA/asus-rog-zephyrus-g14.jpg", "ROG Zephyrus G14", 1499.99m, "ASUS ROG Zephyrus G14", "SN10006", "laptop" },
                    { 7, "Bose", 2305, "Bose QuietComfort 45 noise-cancelling wireless headphones with up to 24 hours of battery life.", "https://perso.isima.fr/~aoxie/KASA/bose-quietcomfort-45.jpg", "QuietComfort 45", 329.99m, "Bose QuietComfort 45", "SN10007", "headphones" },
                    { 8, "Dell", 1940, "Dell XPS 13 laptop with 13.4-inch FHD+ display, Intel Core i7 processor, and 16GB RAM.", "https://perso.isima.fr/~aoxie/KASA/dell-xps-13.jpg", "XPS 13", 1099.99m, "Dell XPS 13", "SN10008", "laptop" },
                    { 9, "Fitbit", 2540, "Fitbit Charge 5 fitness tracker with built-in GPS, heart rate monitor, and stress management tools.", "https://perso.isima.fr/~aoxie/KASA/fitbit-charge-5.png", "Charge 5", 149.99m, "Fitbit Charge 5", "SN10009", "wearable" },
                    { 10, "Sony", 8650, "Sony PlayStation 5 console with 825GB storage, Ray Tracing, and 4K graphics capability.", "https://perso.isima.fr/~aoxie/KASA/sony-playstation-5.jpg", "PS5", 499.99m, "Sony PlayStation 5", "SN10010", "console" },
                    { 11, "Google", 1235, "Google Pixel 7 Pro smartphone with Google Tensor G2, 6.7-inch QHD+ display, and 50MP camera.", "https://perso.isima.fr/~aoxie/KASA/google-pixel-7-pro.jpg", "Pixel 7 Pro", 899.99m, "Google Pixel 7 Pro", "SN10011", "phone" },
                    { 12, "Microsoft", 1475, "Microsoft Surface Pro 9 tablet with 13-inch PixelSense display, Intel Core i5, and 8GB RAM.", "https://perso.isima.fr/~aoxie/KASA/microsoft-surface-pro-9.jpg", "Surface Pro 9", 999.99m, "Microsoft Surface Pro 9", "SN10012", "tablet" },
                    { 13, "Meta", 3450, "Meta Oculus Quest 2 VR headset with 128GB storage and wireless standalone operation.", "https://perso.isima.fr/~aoxie/KASA/oculus-quest-2.jpg", "Quest 2", 399.99m, "Oculus Quest 2", "SN10013", "vr-headset" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 12);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 13);
        }
    }
}
