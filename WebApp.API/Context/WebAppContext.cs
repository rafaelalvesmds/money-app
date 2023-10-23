using Microsoft.EntityFrameworkCore;
using WebApp.API.Models;

namespace WebApp.API.Context
{

    public class WebAppContext : DbContext
    {
        public WebAppContext(DbContextOptions<WebAppContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Expense> Expense { get; set; }
    }

}
