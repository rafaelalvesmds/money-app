using Microsoft.AspNetCore.Mvc;
using WebApp.API.Interfaces;
using WebApp.API.Models;

namespace WebApp.API.Controllers
{
    [Route("api/auth/[action]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly ILoginService _loginService;

        public LoginController(ILoginService loginService) 
        {
            _loginService = loginService;
        }


        [HttpPost]  
        public IActionResult Register([FromBody] User user)
        {
            var result = _loginService.Register(user);

            if (result.Item1)
            {
                return Ok(new { Success = true, Notifications = result.Item2 });
            }
            else
            {
                return BadRequest(new { Success = false, Notifications = result.Item2 });
            }
        }


        [HttpPost]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            var result = _loginService.Login(request);

            if (result.isAuthenticated)
            {
                return Ok(result);
            }
            else 
            {
                return BadRequest(result);
            }
        }


    }
}
