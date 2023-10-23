using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace WebApp.API.Repository.DataBase
{
    [Table("expense")]
    public class expense
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id { get; set; }

        [Required]
        [StringLength(100)]
        public string email { get; set; }

        [Required]
        [StringLength(180)]
        public string name { get; set; }

        [Required]
        public int expenseType { get; set; }

        [Column(TypeName = "decimal(18, 2)")] // Ajuste o tamanho de acordo com suas necessidades
        public decimal price { get; set; }

        [Required]
        public int mounth { get; set; }

        [Required]
        public int year { get; set; }
    }

}
