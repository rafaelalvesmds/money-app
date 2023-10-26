using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using static WebApp.API.Models.ExpenseType;

namespace WebApp.API.Repository.DataBase
{
    [Table("expenseType", Schema = "domain")]
    public class expenseType
    {
        [Key]
        public int id { get; set; }

        [Required]
        [Column("name")]
        [StringLength(20)]
        public string Name { get; set; }
    }
}
