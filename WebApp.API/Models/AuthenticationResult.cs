namespace WebApp.API.Models
{
    public class AuthenticationResult
    {
        public bool isAuthenticated { get; set; }
        public User user { get; set; }
        public List<Notification> notifications { get; set; }
        public string token { get; set; }
    }

}
