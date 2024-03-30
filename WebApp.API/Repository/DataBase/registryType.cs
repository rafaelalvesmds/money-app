using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApp.API.Repository.DataBase
{

    [Table("registryType", Schema = "management")]
    public class registryType
    {
         [Key]
         public int id { get; set; }

         [Required]
         [Column("name")]
         [StringLength(20)]
         public string name { get; set; }

         [Required]
         public int category { get; set; }

         [Required]
         public Guid? userId { get; set; }

        [Required]
        public string color { get; set; }
    }
}
