using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VolunteeringPlatform.Migrations
{
    /// <inheritdoc />
    public partial class deletedAdmin : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "AssociationId", "Email", "Password", "Username", "isAdmin" },
                values: new object[] { 1, 0, "chivu.catalin@yahoo.com", "kingata100", "Diellore", true });
        }
    }
}
