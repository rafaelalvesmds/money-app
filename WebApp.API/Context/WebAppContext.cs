using Microsoft.EntityFrameworkCore;
using WebApp.API.Repository.DataBase;

namespace WebApp.API.Context
{
    public class WebAppContext : DbContext
    {
        public WebAppContext(DbContextOptions<WebAppContext> options) : base(options) { }

        public DbSet<user> users { get; set; }
        public DbSet<expense> expenses { get; set; }
        public DbSet<expenseType> expenseType { get; set; }
    }

}

