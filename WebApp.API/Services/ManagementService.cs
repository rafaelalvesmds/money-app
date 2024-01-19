using AutoMapper;
using WebApp.API.Context;
using WebApp.API.Interfaces;
using WebApp.API.Models;
using WebApp.API.Repository.DataBase;
using WebApp.API.Repository.DomainEntity;

namespace WebApp.API.Services
{
    public class ManagementService : IManagementService
    {
        private readonly WebAppContext _context;
        private readonly IMapper _mapper;

        public ManagementService(WebAppContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public (bool, List<Notification>, List<registry>) GetAllRegristries(string email, DateTime date)
        {
            var notifications = new List<Notification>();

            var registryDatabase = _context.registry
                .Where(e => e.email == email && e.date.Year == date.Year && e.date.Month == date.Month)
                .OrderBy(e => e.date)
                .ToList();

            if (registryDatabase.Count == 0)
            {
                notifications.Add(new Notification { message = "No registry found for the specified email, year, and month." });
                return (true, notifications, registryDatabase);
            }

            return (true, notifications, registryDatabase);
        }

        public (bool, List<Notification>) CreateRegistry(Registry registry)
        {
            RegistryDomain registryDomain = _mapper.Map<RegistryDomain>(registry);


            if (registryDomain.HasNotifications())
            {
                return (false, registryDomain.Notifications);
            }

            var notifications = new List<Notification>();

            var registryToRegister = _mapper.Map<Registry, registry>(registry);
            registryToRegister.id = Guid.NewGuid();

            notifications.Add(new Notification { message = "Registered event." });
            _context.registry.Add(registryToRegister);
            _context.SaveChanges();
            return (true, notifications);
        }

        public (bool, List<Notification>) UpdateRegistry(Registry registry)
        {
            RegistryDomain registryDomain = _mapper.Map<RegistryDomain>(registry);

            var notifications = new List<Notification>();

            if (registryDomain.HasNotifications())
                return (false, registryDomain.Notifications);

            var existingRegistry = _context.registry.FirstOrDefault(e => e.id == registry.id);

            if (existingRegistry == null)
            {
                notifications.Add(new Notification { message = "Registry not found" });
                return (false, notifications);
            }

            existingRegistry.email = registry.email;
            existingRegistry.description = registry.description;
            existingRegistry.type = registry.type;
            existingRegistry.category = registry.category;
            existingRegistry.price = registry.price;
            existingRegistry.date = registry.date;

            notifications.Add(new Notification { message = "Registry updated" });

            _context.SaveChanges();
            return (true, notifications);
        }

        public (bool, List<Notification>) DeleteRegistry(Guid id)
        {
            var notifications = new List<Notification>();
            var existingRegistry = _context.registry.FirstOrDefault(e => e.id == id);

            if (existingRegistry == null)
            {
                notifications.Add(new Notification { message = "Registry not found" });
                return (false, notifications);
            }

            notifications.Add(new Notification { message = "spent was successfully deleted" });

            _context.registry.Remove(existingRegistry);
            _context.SaveChanges();
            return (true, notifications);
        }
    }
}
