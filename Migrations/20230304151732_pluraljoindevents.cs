using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VolunteeringPlatform.Migrations
{
    /// <inheritdoc />
    public partial class pluraljoindevents : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_JoinedEvent_Events_EventId",
                table: "JoinedEvent");

            migrationBuilder.DropForeignKey(
                name: "FK_JoinedEvent_Users_UserId",
                table: "JoinedEvent");

            migrationBuilder.DropPrimaryKey(
                name: "PK_JoinedEvent",
                table: "JoinedEvent");

            migrationBuilder.RenameTable(
                name: "JoinedEvent",
                newName: "JoinedEvents");

            migrationBuilder.RenameIndex(
                name: "IX_JoinedEvent_EventId",
                table: "JoinedEvents",
                newName: "IX_JoinedEvents_EventId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_JoinedEvents",
                table: "JoinedEvents",
                columns: new[] { "UserId", "EventId" });

            migrationBuilder.AddForeignKey(
                name: "FK_JoinedEvents_Events_EventId",
                table: "JoinedEvents",
                column: "EventId",
                principalTable: "Events",
                principalColumn: "EventId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_JoinedEvents_Users_UserId",
                table: "JoinedEvents",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_JoinedEvents_Events_EventId",
                table: "JoinedEvents");

            migrationBuilder.DropForeignKey(
                name: "FK_JoinedEvents_Users_UserId",
                table: "JoinedEvents");

            migrationBuilder.DropPrimaryKey(
                name: "PK_JoinedEvents",
                table: "JoinedEvents");

            migrationBuilder.RenameTable(
                name: "JoinedEvents",
                newName: "JoinedEvent");

            migrationBuilder.RenameIndex(
                name: "IX_JoinedEvents_EventId",
                table: "JoinedEvent",
                newName: "IX_JoinedEvent_EventId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_JoinedEvent",
                table: "JoinedEvent",
                columns: new[] { "UserId", "EventId" });

            migrationBuilder.AddForeignKey(
                name: "FK_JoinedEvent_Events_EventId",
                table: "JoinedEvent",
                column: "EventId",
                principalTable: "Events",
                principalColumn: "EventId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_JoinedEvent_Users_UserId",
                table: "JoinedEvent",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
