using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApp.API.Repository.DataBase
{
    [Table("incomeType", Schema = "domain")]
    public class incomeType
    {
        [Key]
        public int id { get; set; }

        [Required]
        [Column("name")]
        [StringLength(20)]
        public string name { get; set; }
    }
}
