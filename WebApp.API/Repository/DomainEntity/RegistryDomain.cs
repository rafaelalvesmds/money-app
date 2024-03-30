using Microsoft.EntityFrameworkCore.Metadata.Internal;
using WebApp.API.Models;

namespace WebApp.API.Repository.DomainEntity
{
    public class RegistryDomain
    {
        public RegistryDomain(Guid userId, string description, int type, int category, decimal price, DateTime date, DateTime includedDate)
        {
            UserId = userId;
            Description = description;
            Type = type;
            Category = category;
            Price = price;
            Date = date;
            IncludedDate = includedDate;

            Notifications = new List<Notification>();

            Validate();
        }

        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public string Description { get; set; }
        public int Type { get; set; }
        public int Category { get; set; }
        public decimal Price { get; set; }
        public DateTime Date { get; set; }
        public DateTime IncludedDate { get; set; }

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

            if (string.IsNullOrWhiteSpace(Description))
            {
                Notifications.Add(new Notification { message = "Description is required." });
            }

            if (UserId == Guid.Empty)
            {
                Notifications.Add(new Notification { message = "UserId is required." });
            }

            if (Type < 0)
            {
                Notifications.Add(new Notification { message = "Invalid registry type." });
            }

            if (Category < 0)
            {
                Notifications.Add(new Notification { message = "Invalid registry category." });
            }

            if (Price <= 0)
            {
                Notifications.Add(new Notification { message = "Price must be greater than zero." });
            }

            if (Date == DateTime.MinValue)
            {
                Notifications.Add(new Notification { message = "Registry date is required." });
            }

            if (IncludedDate == DateTime.MinValue)
            {
                Notifications.Add(new Notification { message = "Included date is required." });
            }

        }
    }
}
