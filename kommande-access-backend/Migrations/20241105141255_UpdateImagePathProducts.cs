using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace kommande_access_backend.Migrations
{
    /// <inheritdoc />
    public partial class UpdateImagePathProducts : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                column: "Image",
                value: "https://perso.isima.fr/~aoxie/KASA/iphone-14-pro-max.jpg");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2,
                column: "Image",
                value: "https://perso.isima.fr/~aoxie/KASA/macbook-air-m2.jpg");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3,
                column: "Image",
                value: "https://perso.isima.fr/~aoxie/KASA/samsung-galaxy-s23-ultra.jpg");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                column: "Image",
                value: "https://static.digitecgalaxus.ch/Files/6/8/2/2/9/0/1/0/iPhone_14_Pro_Max_Gold_PDP_Image_Position-4__WWEN.jpg");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2,
                column: "Image",
                value: "https://xstore.md/images/product/2022/06/Apple-Macbook-Air-M2-Midnight-1.jpg");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3,
                column: "Image",
                value: "https://cdn1.smartprix.com/rx-izLSMVlI0-w1200-h1200/zLSMVlI0.jpg");
        }
    }
}
