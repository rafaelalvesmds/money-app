using Microsoft.AspNetCore.Mvc;
using WebApp.API.Context;
using WebApp.API.Models;

namespace WebApp.API.Controllers
{
    [Route("api/v1/[controller]/[action]")]
    [ApiController]
    public class DomainController : ControllerBase
    {
        private readonly WebAppContext _context; 

        public DomainController(WebAppContext context) 
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<IEnumerable<ExpenseType>> GetExpenseTypes()
        {
            var expenseTypes = _context.expenseType
                .Select(e => new ExpenseType
                {
                    id = e.id,
                    name = e.name
                })
                .ToList();

            return Ok(expenseTypes);
        }
    }
}
