using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace WebApp.API.Repository.DataBase
{
    [Table("expenses", Schema = "management")]
    public class expense
    {
        [Key]
        public Guid id { get; set; }

        [Required]
        [StringLength(100)]
        public string email { get; set; }

        [Required]
        [StringLength(180)]
        public string name { get; set; }

        [Required]
        public int expenseType { get; set; }

        [Column(TypeName = "decimal(18, 2)")]
        public decimal price { get; set; }

        [Required]
        public DateTime includedDate { get; set; }

        [Required]
        public DateTime expenseDate { get; set; }
    }

}
