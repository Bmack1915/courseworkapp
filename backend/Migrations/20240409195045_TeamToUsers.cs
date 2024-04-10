using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebCoursework.Migrations
{
    /// <inheritdoc />
    public partial class TeamToUsers : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FantasyTeam");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "FantasyTeam",
                columns: table => new
                {
                    FantasyTeamId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    SelectedPlayerIds = table.Column<string>(type: "TEXT", nullable: false),
                    UserId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FantasyTeam", x => x.FantasyTeamId);
                });
        }
    }
}
