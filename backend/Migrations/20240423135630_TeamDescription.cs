using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebCoursework.Migrations
{
    /// <inheritdoc />
    public partial class TeamDescription : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "description",
                table: "Team",
                type: "TEXT",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "description",
                table: "Team");
        }
    }
}
