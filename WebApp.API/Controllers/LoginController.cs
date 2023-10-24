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
                return Ok(new { success = true, notifications = result.Item2 });
            }
            else
            {
                return BadRequest(new { success = false, notifications = result.Item2 });
            }
        }


        [HttpPost]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            var result = _loginService.Login(request);

            if (result.isAuthenticated)
            {
                return Ok(new { sucess = true, userId = result.user.id, notifications = result.notifications, token  = result.token });
            }
            else 
            {
                return BadRequest(new { sucess = false, notifications = result.notifications });
            }
        }


        //public bool isAuthenticated { get; set; }
        //public User user { get; set; }
        //public List<Notification> notifications { get; set; }
        //public string token { get; set; }

    }
}
