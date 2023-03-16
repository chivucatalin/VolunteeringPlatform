using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VolunteeringPlatform.Migrations
{
    /// <inheritdoc />
    public partial class ChangedChatRoomLogic : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserName",
                table: "ChatRooms",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserName",
                table: "ChatRooms");
        }
    }
}
