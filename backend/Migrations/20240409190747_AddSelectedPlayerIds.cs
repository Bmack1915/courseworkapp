using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebCoursework.Migrations
{
    /// <inheritdoc />
    public partial class AddSelectedPlayerIds : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Player_FantasyTeam_FantasyTeamId",
                table: "Player");

            migrationBuilder.DropForeignKey(
                name: "FK_Player_FantasyTeam_FantasyTeamId1",
                table: "Player");

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

            migrationBuilder.AddColumn<string>(
                name: "SelectedPlayerIds",
                table: "FantasyTeam",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SelectedPlayerIds",
                table: "FantasyTeam");

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
    }
}
