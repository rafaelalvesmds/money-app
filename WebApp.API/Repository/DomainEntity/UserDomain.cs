using WebApp.API.Models;

namespace WebApp.API.Repository.DomainEntity
{
    public class UserDomain
    {
        public UserDomain(string name, string email, string password, int? cellphone)
        {
            Name = name;
            Email = email;
            Password = password;
            Cellphone = cellphone;

            Notifications = new List<Notification>();

            Validate();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public int? Cellphone { get; set; }

        public List<Notification> Notifications { get; private set; }

        public bool HasNotifications()
        {
            return Notifications.Count > 0;
        }

        private bool IsValidEmail(string email)
        {
            try
            {
                var addr = new System.Net.Mail.MailAddress(email);
                return addr.Address == email;
            }
            catch
            {
                return false;
            }
        }

        private void Validate()
        {
            if (string.IsNullOrWhiteSpace(Name))
            {
                Notifications.Add(new Notification { Message = "Name is required." });
            }

            if (string.IsNullOrWhiteSpace(Email) || !IsValidEmail(Email))
            {
                Notifications.Add(new Notification { Message = "invalid email." });
            }

            if (string.IsNullOrWhiteSpace(Password))
            {
                Notifications.Add(new Notification { Message = "Password is required." });
            }

            if (Cellphone != null)
            {
                if (Cellphone < 0)
                {
                    Notifications.Add(new Notification { Message = "Invalid cellphone number." });
                }
                if (Cellphone > 9999999999) 
                {
                    Notifications.Add(new Notification { Message = "Cellphone number exceeds the maximum allowed value." });
                }
            }
        }
    }
}

