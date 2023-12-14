using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DigitalOnboarding.Server.Migrations
{
    /// <inheritdoc />
    public partial class AddingAccountAgain : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Username",
                table: "Account",
                newName: "Email");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Email",
                table: "Account",
                newName: "Username");
        }
    }
}
