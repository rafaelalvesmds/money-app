namespace WebApp.API.Models
{
    public class RegistryType
    {
        public int id { get; set; }
        public string name { get; set; }
        public int category { get; set; }
        public Guid? userId { get; set; }
        public string color { get; set; }
    }
}
