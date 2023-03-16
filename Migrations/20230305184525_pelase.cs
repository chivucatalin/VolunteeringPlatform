using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VolunteeringPlatform.Migrations
{
    /// <inheritdoc />
    public partial class pelase : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_JoinedEvents_Users_UserId",
                table: "JoinedEvents");

            migrationBuilder.DropPrimaryKey(
                name: "PK_JoinedEvents",
                table: "JoinedEvents");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "JoinedEvents");

            migrationBuilder.AddColumn<string>(
                name: "Username",
                table: "JoinedEvents",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddUniqueConstraint(
                name: "AK_Users_Username",
                table: "Users",
                column: "Username");

            migrationBuilder.AddPrimaryKey(
                name: "PK_JoinedEvents",
                table: "JoinedEvents",
                columns: new[] { "Username", "EventId" });

            migrationBuilder.CreateIndex(
                name: "IX_Users_Username",
                table: "Users",
                column: "Username",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_JoinedEvents_Users_Username",
                table: "JoinedEvents",
                column: "Username",
                principalTable: "Users",
                principalColumn: "Username",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_JoinedEvents_Users_Username",
                table: "JoinedEvents");

            migrationBuilder.DropUniqueConstraint(
                name: "AK_Users_Username",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_Username",
                table: "Users");

            migrationBuilder.DropPrimaryKey(
                name: "PK_JoinedEvents",
                table: "JoinedEvents");

            migrationBuilder.DropColumn(
                name: "Username",
                table: "JoinedEvents");

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "JoinedEvents",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_JoinedEvents",
                table: "JoinedEvents",
                columns: new[] { "UserId", "EventId" });

            migrationBuilder.AddForeignKey(
                name: "FK_JoinedEvents_Users_UserId",
                table: "JoinedEvents",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
