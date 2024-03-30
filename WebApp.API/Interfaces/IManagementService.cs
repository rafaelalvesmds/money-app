using WebApp.API.Models;
using WebApp.API.Repository.DataBase;

namespace WebApp.API.Interfaces
{
    public interface IManagementService
    {
        ValueTuple<bool, List<Notification>, List<registry>> GetAllRegristries(Guid userId, DateTime date);
        ValueTuple<bool, List<Notification>> CreateRegistry(Registry registeredEvent);
        ValueTuple<bool, List<Notification>> UpdateRegistry(Registry registeredEvent);
        ValueTuple<bool, List<Notification>> DeleteRegistry(Guid id);
        ValueTuple<bool, List<Notification>, List<RegistryType>> GetAllRegistriesTypes(Guid userId);
        ValueTuple<bool, List<Notification>> CreateRegistryType(RegistryType registryType);
    }
}
