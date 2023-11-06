using WebApp.API.Models;
using WebApp.API.Repository.DataBase;

namespace WebApp.API.Interfaces
{
    public interface IManagementService
    {
        ValueTuple<bool, List<Notification>, List<registry>> GetAllRegristries(string email);
        ValueTuple<bool, List<Notification>> CreateRegistry(Registry registeredEvent);
        ValueTuple<bool, List<Notification>> UpdateRegistry(Registry registeredEvent);
        ValueTuple<bool, List<Notification>> DeleteRegistry(Guid id);
    }
}
