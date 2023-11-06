using Microsoft.EntityFrameworkCore.Metadata.Internal;
using WebApp.API.Models;

namespace WebApp.API.Repository.DomainEntity
{
    public class RegistryDomain
    {
        public RegistryDomain(string email, string description, int type, int category, decimal price, DateTime date, DateTime includedDate)
        {
            Email = email;
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
        public string Email { get; set; }
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
            if (string.IsNullOrWhiteSpace(Email) || !IsValidEmail(Email))
            {
                Notifications.Add(new Notification { Message = "Invalid email." });
            }

            if (string.IsNullOrWhiteSpace(Description))
            {
                Notifications.Add(new Notification { Message = "Description is required." });
            }

            if (Type < 0)
            {
                Notifications.Add(new Notification { Message = "Invalid registry type." });
            }

            if (Category < 0)
            {
                Notifications.Add(new Notification { Message = "Invalid registry category." });
            }

            if (Price <= 0)
            {
                Notifications.Add(new Notification { Message = "Price must be greater than zero." });
            }

            if (Date == DateTime.MinValue)
            {
                Notifications.Add(new Notification { Message = "Registry date is required." });
            }

            if (IncludedDate == DateTime.MinValue)
            {
                Notifications.Add(new Notification { Message = "Included date is required." });
            }

        }
    }
}
