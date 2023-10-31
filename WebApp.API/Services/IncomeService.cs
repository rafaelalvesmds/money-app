using AutoMapper;
using WebApp.API.Context;
using WebApp.API.Interfaces;
using WebApp.API.Models;
using WebApp.API.Repository.DataBase;
using WebApp.API.Repository.DomainEntity;

namespace WebApp.API.Services
{
    public class IncomeService : IIncomeService
    {
        private readonly WebAppContext _context;
        private readonly IMapper _mapper;

        public IncomeService(WebAppContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public (bool, List<Notification>, List<income>) GetAllIncomes(string email)
        {
            var incomesFromDatabase = _context.incomes.Where(i => i.email == email).ToList();

            var notifications = new List<Notification>();

            if (incomesFromDatabase.Count == 0)
            {
                notifications.Add(new Notification { Message = "No incomes found for the specified email." });
                return (true, notifications, incomesFromDatabase);
            }

            return (true, notifications, incomesFromDatabase);
        }

        public (bool, List<Notification>) CreateIncome(Income income)
        {
            IncomeDomain incomeDomain = _mapper.Map<IncomeDomain>(income);

            if (incomeDomain.HasNotifications())
            {
                return (false, incomeDomain.Notifications);
            }

            var notifications = new List<Notification>();

            var incomeToRegister = _mapper.Map<Income, income>(income);
            incomeToRegister.id = Guid.NewGuid();

            notifications.Add(new Notification { Message = "Registered income." });
            _context.incomes.Add(incomeToRegister);
            _context.SaveChanges();
            return (true, notifications);
        }

        public (bool, List<Notification>) UpdateIncome(Income updatedIncome)
        {
            IncomeDomain incomeDomain = _mapper.Map<IncomeDomain>(updatedIncome);

            var notifications = new List<Notification>();

            if (incomeDomain.HasNotifications())
            {
                return (false, incomeDomain.Notifications);
            }

            var existingIncome = _context.incomes.FirstOrDefault(i => i.id == updatedIncome.id);

            if (existingIncome == null)
            {
                notifications.Add(new Notification { Message = "Income not found" });
                return (false, notifications);
            }

            existingIncome.email = updatedIncome.email;
            existingIncome.description = updatedIncome.description;
            existingIncome.incomeType = updatedIncome.incomeType;
            existingIncome.price = updatedIncome.price;
            existingIncome.incomeDate = updatedIncome.incomeDate;

            notifications.Add(new Notification { Message = "Income updated" });

            _context.SaveChanges();
            return (true, notifications);
        }

        public (bool, List<Notification>) DeleteIncome(Guid id)
        {
            var notifications = new List<Notification>();
            var existingIncome = _context.incomes.FirstOrDefault(i => i.id == id);

            if (existingIncome == null)
            {
                notifications.Add(new Notification { Message = "Income not found" });
                return (false, notifications);
            }

            notifications.Add(new Notification { Message = "Income was successfully deleted" });

            _context.incomes.Remove(existingIncome);
            _context.SaveChanges();
            return (true, notifications);
        }
    }

}
