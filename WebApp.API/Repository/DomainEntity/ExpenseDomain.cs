using WebApp.API.Models;

namespace WebApp.API.Repository.DomainEntity
{
    public class ExpenseDomain
    {
        public ExpenseDomain(string email, string name, int expenseType, decimal price, int month, int year)
        {
            Email = email;
            Name = name;
            ExpenseType = expenseType;
            Price = price;
            Month = month;
            Year = year;

            Notifications = new List<Notification>();

            Validate();
        }

        public int Id { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public int ExpenseType { get; set; }
        public decimal Price { get; set; }
        public int Month { get; set; }
        public int Year { get; set; }

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

            if (string.IsNullOrWhiteSpace(Name))
            {
                Notifications.Add(new Notification { Message = "Name is required." });
            }

            if (ExpenseType < 0)
            {
                Notifications.Add(new Notification { Message = "Invalid expense type." });
            }

            if (Price <= 0)
            {
                Notifications.Add(new Notification { Message = "Price must be greater than zero." });
            }

            if (Month < 1 || Month > 12)
            {
                Notifications.Add(new Notification { Message = "Invalid month." });
            }

            if (Year < DateTime.MinValue.Year || Year > DateTime.MaxValue.Year)
            {
                Notifications.Add(new Notification { Message = "Invalid year." });
            }
        }
    }
}
