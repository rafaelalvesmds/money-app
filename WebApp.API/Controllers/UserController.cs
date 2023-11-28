using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApp.API.Interfaces;
using WebApp.API.Models;

namespace WebApp.API.Controllers
{

    [Route("api/v1/[controller]/[action]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService) 
        {
            _userService = userService;
        }


        [HttpPost]
        public IActionResult Register([FromBody] User user)
        {
            var result = _userService.Register(user);

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
            var result = _userService.Login(request);

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
            var (success, notifications, user) = _userService.GetUserById(id);

            if (!success)
            {
                return NotFound(new { Notifications = notifications });
            }

            var userResponse = new
            {
                id = user.id,
                name = user.name,
                email = user.email,
                cellphone = user.cellphone
            };

            return Ok(userResponse);
        }
    }
}
