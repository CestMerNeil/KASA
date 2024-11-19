using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace kommande_auth_backend.Migrations
{
    /// <inheritdoc />
    public partial class UserTypeDatabase4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "BasicUser_Image",
                table: "Users",
                type: "TEXT",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BasicUser_Image",
                table: "Users");
        }
    }
}
