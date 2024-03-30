using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApp.API.Interfaces;
using WebApp.API.Models;
using WebApp.API.Repository.DataBase;

namespace WebApp.API.Controllers
{

    [Route("api/v1/[controller]/[action]")]
    [ApiController]
    public class ManagementController : ControllerBase
    {
        private readonly IManagementService _managementService;

        public ManagementController(IManagementService managementService)
        {
            _managementService = managementService;
        }

        [HttpGet]
        [Authorize]
        public IActionResult GetAllRegristries([FromQuery] Guid userId, DateTime date)
        {
            (bool, List<Notification>, List<registry>) result = _managementService.GetAllRegristries(userId, date);

            if (!result.Item1)
                return BadRequest(new { Success = false, Notifications = result.Item2, Registry = result.Item3 });

            return Ok(new { Success = false, Notifications = result.Item2, Registry = result.Item3 });
        }

        [HttpPost]
        [Authorize]
        public IActionResult CreateRegistry([FromBody] Registry registry)
        {
            (bool, List<Notification>) result = _managementService.CreateRegistry(registry);

            if (!result.Item1)
                return BadRequest(new { Success = false, Notifications = result.Item2 });

            return Ok(new { Success = true, Notifications = result.Item2 });
        }

        [HttpPut]
        [Authorize]
        public IActionResult UpdateRegistry(Registry registry)
        {
            (bool, List<Notification>) result = _managementService.UpdateRegistry(registry);

            if (!result.Item1)
                return BadRequest(new { Success = false, Notifications = result.Item2 });

            return Ok(new { Success = true, Notifications = result.Item2 });
        }

        [HttpDelete("{id}")]
        [Authorize]
        public IActionResult DeleteRegistry(Guid id)
        {
            (bool, List<Notification>) result = _managementService.DeleteRegistry(id);

            if (!result.Item1)
                return BadRequest(new { Success = false, Notifications = result.Item2 });

            return Ok(new { Success = true, Notifications = result.Item2 });
        }

        [HttpGet]
        [Authorize]
        public IActionResult GetAllRegistriesTypes([FromQuery] Guid userId)
        {
            (bool, List<Notification>, List<RegistryType>) result = _managementService.GetAllRegistriesTypes(userId);

            if (!result.Item1)
                return BadRequest(new { Success = false, Notifications = result.Item2, Registry = result.Item3 });

            return Ok(new { Success = false, Notifications = result.Item2, Registry = result.Item3 });
        }

        [HttpPost]
        [Authorize]
        public IActionResult CreateRegistryType([FromBody] RegistryType registryType)
        {
            (bool success, List<Notification> notifications) = _managementService.CreateRegistryType(registryType);

            if (!success)
                return BadRequest(new { Success = false, Notifications = notifications });

            return Ok(new { Success = true, Notifications = notifications });
        }

    }
}
