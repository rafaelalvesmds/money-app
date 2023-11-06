using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace WebApp.API.Repository.DataBase
{
    [Table("registry", Schema = "management")]
    public class registry
    {
        [Key]
        public Guid id { get; set; }

        [Required]
        [StringLength(100)]
        public string email { get; set; }

        [Required]
        [StringLength(180)]
        public string description { get; set; }

        [Required]
        public int type { get; set; }
        [Required]
        public int category { get; set; }

        [Column(TypeName = "decimal(18, 2)")]
        public decimal price { get; set; }

        [Required]
        public DateTime includedDate { get; set; }

        [Required]
        public DateTime date { get; set; }
    }

}
