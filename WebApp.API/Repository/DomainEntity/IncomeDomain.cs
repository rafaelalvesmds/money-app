using WebApp.API.Models;

namespace WebApp.API.Repository.DomainEntity
{
    public class IncomeDomain
    {
        public IncomeDomain(string email, string description, int incomeType, decimal price, DateTime incomeDate, DateTime includedDate)
        {
            Email = email;
            Description = description;
            IncomeType = incomeType;
            Price = price;
            IncomeDate = incomeDate;
            IncludedDate = includedDate;

            Notifications = new List<Notification>();

            Validate();
        }

        public Guid Id { get; set; }
        public string Email { get; set; }
        public string Description { get; set; }
        public int IncomeType { get; set; }
        public decimal Price { get; set; }
        public DateTime IncomeDate { get; set; }
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

            if (IncomeType < 0)
            {
                Notifications.Add(new Notification { Message = "Invalid income type." });
            }

            if (Price <= 0)
            {
                Notifications.Add(new Notification { Message = "Price must be greater than zero." });
            }

            if (IncomeDate == DateTime.MinValue)
            {
                Notifications.Add(new Notification { Message = "Income date is required." });
            }

            if (IncludedDate == DateTime.MinValue)
            {
                Notifications.Add(new Notification { Message = "Included date is required." });
            }
        }
    }

}
