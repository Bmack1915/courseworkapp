using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebCoursework.Migrations
{
    /// <inheritdoc />
    public partial class FantasyTeam : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "FantasyTeamId",
                table: "Player",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "FantasyTeamId1",
                table: "Player",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "FantasyTeam",
                columns: table => new
                {
                    FantasyTeamId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    UserId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FantasyTeam", x => x.FantasyTeamId);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Player_FantasyTeamId",
                table: "Player",
                column: "FantasyTeamId");

            migrationBuilder.CreateIndex(
                name: "IX_Player_FantasyTeamId1",
                table: "Player",
                column: "FantasyTeamId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Player_FantasyTeam_FantasyTeamId",
                table: "Player",
                column: "FantasyTeamId",
                principalTable: "FantasyTeam",
                principalColumn: "FantasyTeamId");

            migrationBuilder.AddForeignKey(
                name: "FK_Player_FantasyTeam_FantasyTeamId1",
                table: "Player",
                column: "FantasyTeamId1",
                principalTable: "FantasyTeam",
                principalColumn: "FantasyTeamId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Player_FantasyTeam_FantasyTeamId",
                table: "Player");

            migrationBuilder.DropForeignKey(
                name: "FK_Player_FantasyTeam_FantasyTeamId1",
                table: "Player");

            migrationBuilder.DropTable(
                name: "FantasyTeam");

            migrationBuilder.DropIndex(
                name: "IX_Player_FantasyTeamId",
                table: "Player");

            migrationBuilder.DropIndex(
                name: "IX_Player_FantasyTeamId1",
                table: "Player");

            migrationBuilder.DropColumn(
                name: "FantasyTeamId",
                table: "Player");

            migrationBuilder.DropColumn(
                name: "FantasyTeamId1",
                table: "Player");
        }
    }
}
