using WebApp.API.Models;
using WebApp.API.Repository.DataBase;

namespace WebApp.API.Interfaces
{
    public interface IIncomeService
    {
        (bool, List<Notification>, List<income>) GetAllIncomes(string email);

        (bool, List<Notification>) CreateIncome(Income income);

        (bool, List<Notification>) UpdateIncome(Income updatedIncome);

        (bool, List<Notification>) DeleteIncome(Guid id);
    }
}
