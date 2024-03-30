using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApp.API.Migrations
{
    /// <inheritdoc />
    public partial class schema_inicial_regristyTypes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                schema: "management",
                table: "registryType",
                columns: new[] { "id", "name", "category", "userId", "color" },
                values: new object[,]
                {
                    { 0, "Automóvel", 1, new Guid(), "#3366CC" },
                    { 1, "Bem estar", 1, new Guid(), "#DC3912" },
                    { 2, "Educação", 1, new Guid(), "#FF9900" },
                    { 3, "Saúde", 1, new Guid(), "#109618" },
                    { 4, "Vestuário", 1, new Guid(), "#990099" },
                    { 5, "Moradia", 1, new Guid(), "#0099C6" },
                    { 6, "Lazer", 1, new Guid(), "#DD4477" },
                    { 7, "Salário", 2, new Guid(), "#66AA00" },
                    { 8, "Rendimentos", 2, new Guid(), "#B82E2E" },
                    { 9, "Lucros", 2, new Guid(), "#316395" },
                    { 10, "Aluguel", 2, new Guid(), "#994499" },
                    { 11, "Outras receitas", 2, new Guid(), "#22AA99" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            int[] idsToDelete = { 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 };

            foreach (int id in idsToDelete)
            {
                migrationBuilder.DeleteData(
                    schema: "management",
                    table: "registryType",
                    keyColumn: "id",
                    keyValue: id);
            }
        }
    }
}
