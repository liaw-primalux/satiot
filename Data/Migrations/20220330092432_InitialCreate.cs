using Microsoft.EntityFrameworkCore.Migrations;

namespace SATIoT.Data.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AppWpObject",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ObjType = table.Column<string>(type: "TEXT", nullable: true),
                    ObjName = table.Column<string>(type: "TEXT", nullable: true),
                    ObjDesc = table.Column<string>(type: "TEXT", nullable: true),
                    ObjText = table.Column<string>(type: "TEXT", nullable: true),
                    Active = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppWpObject", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AppWpObject");
        }
    }
}
