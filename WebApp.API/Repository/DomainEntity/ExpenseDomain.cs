using Microsoft.EntityFrameworkCore.Metadata.Internal;
using WebApp.API.Models;

namespace WebApp.API.Repository.DomainEntity
{
    public class ExpenseDomain
    {
        public ExpenseDomain(string email, string name, int expenseType, decimal price, DateTime expenseDate, DateTime includedDate)
        {
            Email = email;
            Name = name;
            ExpenseType = expenseType;
            Price = price;
            ExpenseDate = expenseDate;
            IncludedDate = includedDate;

            Notifications = new List<Notification>();

            Validate();
        }

        public Guid Id { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public int ExpenseType { get; set; }
        public decimal Price { get; set; }
        public DateTime ExpenseDate { get; set; }
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

            if (ExpenseDate == DateTime.MinValue)
            {
                Notifications.Add(new Notification { Message = "Expense date is required." });
            }

            if (IncludedDate == DateTime.MinValue)
            {
                Notifications.Add(new Notification { Message = "Included date is required." });
            }

        }
    }
}
