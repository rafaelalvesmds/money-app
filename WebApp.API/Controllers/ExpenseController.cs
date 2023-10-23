using Microsoft.AspNetCore.Mvc;
using WebApp.API.Interfaces;
using WebApp.API.Models;
using WebApp.API.Repository.DataBase;

namespace WebApp.API.Controllers
{
    [Route("api/expenses/[action]")]
    [ApiController]
    public class ExpenseController : ControllerBase
    {
        private readonly IExpenseService _expenseService;

        public ExpenseController(IExpenseService expenseService)
        {
            _expenseService = expenseService;
        }

        [HttpGet]
        public IActionResult GetExpenses(string email)
        {
            (bool, List<Notification>, List<expense>) result = _expenseService.GetAllExpenses(email);

            if (!result.Item1)
            {
                return BadRequest(new { Success = false, Notifications = result.Item2, Expenses = result.Item3 });
            }

            return Ok(new { Success = false, Notifications = result.Item2, Expenses = result.Item3 });
        }

        [HttpPost]
        public IActionResult CreateExpense([FromBody] Expense expense)
        {
            (bool, List<Notification>) result = _expenseService.CreateExpense(expense);

            if (!result.Item1)
            {
                return BadRequest(new { Success = false, Notifications = result.Item2 });
            }

            return Ok(new { Success = false, Notifications = result.Item2 });
        }

        [HttpPut]
        public IActionResult UpdateExpense(expense updatedExpense)
        {
            (bool, List<Notification>) result = _expenseService.UpdateExpense(updatedExpense);

            if (!result.Item1)
            {
                return BadRequest(new { Success = false, Notifications = result.Item2 });
            }

            return Ok(new { Success = false, Notifications = result.Item2 });
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteExpense(int id)
        {
            (bool, List<Notification>) result = _expenseService.DeleteExpense(id);

            if (!result.Item1)
            {
                return BadRequest(new { Success = false, Notifications = result.Item2 }); 
            }

            return Ok(new { Success = false, Notifications = result.Item2 });
        }
    }
}
