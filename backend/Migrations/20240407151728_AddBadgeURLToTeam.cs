using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebCoursework.Migrations
{
    /// <inheritdoc />
    public partial class AddBadgeURLToTeam : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "BadgeURL",
                table: "Team",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BadgeURL",
                table: "Team");
        }
    }
}
