using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VolunteeringPlatform.Migrations
{
    /// <inheritdoc />
    public partial class RemovedAssociationApproved : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EventApproval",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "EventAssociationId",
                table: "Events");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "EventApproval",
                table: "Events",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "EventAssociationId",
                table: "Events",
                type: "INTEGER",
                nullable: true);
        }
    }
}
