using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace kommande_access_backend.Migrations
{
    /// <inheritdoc />
    public partial class AddProductsV2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 7,
                column: "Image",
                value: "https://perso.isima.fr/~aoxie/KASA/bose-quietcomfort-45.jpeg");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 7,
                column: "Image",
                value: "https://perso.isima.fr/~aoxie/KASA/bose-quietcomfort-45.jpg");
        }
    }
}
