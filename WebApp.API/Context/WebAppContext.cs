using Microsoft.EntityFrameworkCore;
using WebApp.API.Repository.DataBase;

namespace WebApp.API.Context
{

    public class WebAppContext : DbContext
    {
        public WebAppContext(DbContextOptions<WebAppContext> options) : base(options) { }

        public DbSet<user> Users { get; set; }
        public DbSet<expense> Expense { get; set; }
    }

}

