using WebApp.API.Models;

namespace WebApp.API.Repository.DomainEntity
{
    public class RegistryTypeDomain
    {
        public RegistryTypeDomain(string name, int category, string color, Guid userId)
        {
            Name = name;
            Category = category;
            Color = color;
            UserId = userId;

            Notifications = new List<Notification>();

            Validate();
        }

        public string Name { get; set; }
        public int Category { get; set; }
        public string Color { get; set; }
        public Guid UserId { get; set; }

        public List<Notification> Notifications { get; private set; }

        public bool HasNotifications()
        {
            return Notifications.Count > 0;
        }

        private void Validate()
        {
            if (string.IsNullOrWhiteSpace(Name))
            {
                Notifications.Add(new Notification { message = "Name is required." });
            }

            if (Category != 1 && Category != 2)
            {
                Notifications.Add(new Notification { message = "Invalid registry category." });
            }

            if (string.IsNullOrWhiteSpace(Color))
            {
                Notifications.Add(new Notification { message = "Color is required." });
            }

            if (UserId == Guid.Empty)
            {
                Notifications.Add(new Notification { message = "UserId is required." });
            }
        }
    }
}
