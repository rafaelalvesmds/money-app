using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApp.API.Interfaces;
using WebApp.API.Models;

namespace WebApp.API.Controllers
{

    [Route("api/v1/[controller]/[action]")]
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

        [HttpGet("{id}")]
        public IActionResult GetUserById(Guid id)
        {
            var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == "sub");
            if (userIdClaim == null || userIdClaim.Value != id.ToString())
            {
                return Forbid();
            }

            var (success, notifications, user) = _loginService.GetUserById(id);

            if (!success)
            {
                return NotFound(new { Notifications = notifications });
            }

            var userResponse = new
            {
                id = user.id,
                nome = user.name,
                email = user.email,
                cellphone = user.cellphone
            };

            return Ok(userResponse);
        }
    }
}
