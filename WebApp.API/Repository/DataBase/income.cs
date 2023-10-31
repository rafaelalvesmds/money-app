using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace WebApp.API.Repository.DataBase
{

    [Table("income", Schema = "management")]
    public class income
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
        public int incomeType { get; set; }

        [Column(TypeName = "decimal(18, 2)")]
        public decimal price { get; set; }

        [Required]
        public DateTime includedDate { get; set; }

        [Required]
        public DateTime incomeDate { get; set; }
    }

}
