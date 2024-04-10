using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebCoursework.Migrations
{
    /// <inheritdoc />
    public partial class AddSelectedPlayerIds1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "SelectedPlayerIds",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SelectedPlayerIds",
                table: "AspNetUsers");
        }
    }
}
