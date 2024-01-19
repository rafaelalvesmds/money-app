using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace WebApp.API.Repository.DataBase
{
    [Table("users", Schema = "auth")]
    public class user
    {
        [Key]
        public Guid id { get; set; }

        [Required]
        [StringLength(180)]
        public string name { get; set; }

        [Required]
        [StringLength(100)]
        public string email { get; set; }

        [Required]
        [StringLength(64)]
        public string password { get; set; }

        [Range(0, 14)]
        public int? cellphone { get; set; }

        [Required]
        public DateTime registrationDate { get; set; }

        [Required]
        public bool confirmedEmail { get; set; }
    }

}
