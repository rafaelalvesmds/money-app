using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApp.API.Migrations
{
    /// <inheritdoc />
    public partial class initial_load_domain : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData
                (
                    schema: "domain",
                    table: "expenseType",
                    columns: new string[] { "id", "name" },
                    values: new object[,]
                    {
                                    { 1, "Home" },
                                    { 2, "Education" },
                                    { 3, "Electronics" },
                                    { 4, "Leisure" },
                                    { 5, "Restaurant" },
                                    { 6, "Health" },
                                    { 7, "Services" },
                                    { 8, "Supermarket" },
                                    { 9, "Transport" },
                                    { 10, "Clothing" },
                                    { 11, "Trip" }
                    });

            migrationBuilder.InsertData
                (
                    schema: "domain",
                    table: "incomeType",
                    columns: new string[] { "id", "name" },
                    values: new object[,]
                    {
                                    { 1, "Investment" },
                                    { 2, "Gift" },
                                    { 3, "Salary" },
                                    { 4, "Others" },
                    });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "expenseType",
                schema: "domain");

            migrationBuilder.Sql("DELETE FROM domain.expenseType");


            migrationBuilder.DropTable(
                name: "incomeType",
                schema: "domain");

            migrationBuilder.Sql("DELETE FROM domain.incomeType");
        }
    }
}
