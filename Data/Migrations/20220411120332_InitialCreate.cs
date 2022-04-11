using Microsoft.EntityFrameworkCore.Migrations;

namespace SATIoT.Data.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AppObjassoc",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ParentType = table.Column<string>(type: "TEXT", nullable: true),
                    ParentId = table.Column<int>(type: "INTEGER", nullable: false),
                    ChildType = table.Column<string>(type: "TEXT", nullable: true),
                    ChildId = table.Column<int>(type: "INTEGER", nullable: false),
                    AssocText = table.Column<string>(type: "TEXT", nullable: true),
                    Active = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppObjassoc", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AppObject",
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
                    table.PrimaryKey("PK_AppObject", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AppObjassoc");

            migrationBuilder.DropTable(
                name: "AppObject");
        }
    }
}
