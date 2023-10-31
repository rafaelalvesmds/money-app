using Microsoft.AspNetCore.Mvc;
using WebApp.API.Interfaces;
using WebApp.API.Models;
using WebApp.API.Repository.DataBase;

namespace WebApp.API.Controllers
{
    [Route("api/v1/[controller]/[action]")]
    [ApiController]
    public class IncomeController : ControllerBase
    {
        private readonly IIncomeService _incomeService;

        public IncomeController(IIncomeService incomeService)
        {
            _incomeService = incomeService;
        }

        [HttpGet]
        public IActionResult GetIncomes([FromQuery] string email)
        {
            (bool, List<Notification>, List<income>) result = _incomeService.GetAllIncomes(email);

            if (!result.Item1)
            {
                return BadRequest(new { Success = false, Notifications = result.Item2, Incomes = result.Item3 });
            }

            return Ok(new { Success = true, Notifications = result.Item2, Incomes = result.Item3 });
        }

        [HttpPost]
        public IActionResult CreateIncome([FromBody] Income income)
        {
            (bool, List<Notification>) result = _incomeService.CreateIncome(income);

            if (!result.Item1)
            {
                return BadRequest(new { Success = false, Notifications = result.Item2 });
            }

            return Ok(new { Success = true, Notifications = result.Item2 });
        }

        [HttpPut]
        public IActionResult UpdateIncome(Income updatedIncome)
        {
            (bool, List<Notification>) result = _incomeService.UpdateIncome(updatedIncome);

            if (!result.Item1)
            {
                return BadRequest(new { Success = false, Notifications = result.Item2 });
            }

            return Ok(new { Success = true, Notifications = result.Item2 });
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteIncome(Guid id)
        {
            (bool, List<Notification>) result = _incomeService.DeleteIncome(id);

            if (!result.Item1)
            {
                return BadRequest(new { Success = false, Notifications = result.Item2 });
            }

            return Ok(new { Success = true, Notifications = result.Item2 });
        }
    }

}
