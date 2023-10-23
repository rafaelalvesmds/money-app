using WebApp.API.Models;
using WebApp.API.Repository.DataBase;

namespace WebApp.API.Interfaces
{
    public interface IExpenseService
    {
        ValueTuple<bool, List<Notification>, List<expense>> GetAllExpenses(string email);
        ValueTuple<bool, List<Notification>> CreateExpense(Expense expense);
        ValueTuple<bool, List<Notification>> UpdateExpense(expense updatedExpense);
        ValueTuple<bool, List<Notification>> DeleteExpense(int id);
    }
}
