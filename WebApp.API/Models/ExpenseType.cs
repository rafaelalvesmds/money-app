namespace WebApp.API.Models
{

    public class ExpenseType
    {
        public enum ExpenseTypeEnum
        {
            Home,
            Education,
            Electronics,
            Leisure,
            Restaurant,
            Health,
            Services,
            Supermarket,
            Transport,
            Clothing,
            Trip
        }

        public int id { get; set; }
        public string name { get; set; }
    }

}
