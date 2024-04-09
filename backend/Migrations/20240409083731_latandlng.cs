using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebCoursework.Migrations
{
    /// <inheritdoc />
    public partial class latandlng : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "lat",
                table: "Team",
                type: "REAL",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "lng",
                table: "Team",
                type: "REAL",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "lat",
                table: "Team");

            migrationBuilder.DropColumn(
                name: "lng",
                table: "Team");
        }
    }
}
