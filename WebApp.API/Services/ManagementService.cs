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

        public (bool, List<Notification>, List<registry>) GetAllRegristries(Guid userId, DateTime date)
        {
            var notifications = new List<Notification>();

            var registryDatabase = _context.registry
                .Where(e => e.userId == userId && e.date.Year == date.Year && e.date.Month == date.Month)
                .OrderBy(e => e.date)
                .ToList();

            if (registryDatabase.Count == 0)
            {
                notifications.Add(new Notification { message = "Nenhum registro encontrado." });
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

            notifications.Add(new Notification { message = "Registro criado com sucesso." });
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
                notifications.Add(new Notification { message = "Registro não encontrado." });
                return (false, notifications);
            }

            existingRegistry.userId = registry.userId;
            existingRegistry.description = registry.description;
            existingRegistry.type = registry.type;
            existingRegistry.category = registry.category;
            existingRegistry.price = registry.price;
            existingRegistry.date = registry.date;

            notifications.Add(new Notification { message = "Registro editado com sucesso." });

            _context.SaveChanges();
            return (true, notifications);
        }

        public (bool, List<Notification>) DeleteRegistry(Guid id)
        {
            var notifications = new List<Notification>();
            var existingRegistry = _context.registry.FirstOrDefault(e => e.id == id);

            if (existingRegistry == null)
            {
                notifications.Add(new Notification { message = "Registro não encontrado." });
                return (false, notifications);
            }

            notifications.Add(new Notification { message = "Registro deletado com sucesso." });

            _context.registry.Remove(existingRegistry);
            _context.SaveChanges();
            return (true, notifications);
        }

        public (bool, List<Notification>, List<RegistryType>) GetAllRegistriesTypes(Guid userId)
        {
            var notifications = new List<Notification>();
            var registryTypes = new List<RegistryType>();

            try
            {
                var databaseRegistryTypes = _context.registryType
                    .Where(rt => rt.userId == userId || rt.userId == Guid.Empty)
                    .ToList();

                registryTypes = _mapper.Map<List<RegistryType>>(databaseRegistryTypes);

                return (true, notifications, registryTypes);
            }
            catch (Exception ex)
            {
                notifications.Add(new Notification { message = $"Falha ao listar tipos de registros: {ex.Message}" });
                return (false, notifications, null);
            }
        }

        public (bool, List<Notification>) CreateRegistryType(RegistryType registryType)
        {
            var notifications = new List<Notification>();

            try
            {
                var newRegistryType = _mapper.Map<registryType>(registryType);

                var registryTypeDomain = _mapper.Map<RegistryTypeDomain>(registryType);

                if (registryTypeDomain.HasNotifications())
                {
                    notifications.AddRange(registryTypeDomain.Notifications);
                    return (false, notifications);
                }

                _context.registryType.Add(newRegistryType);
                _context.SaveChanges();

                notifications.Add(new Notification { message = "Tipo criado com sucesso." });
                return (true, notifications);
            }
            catch (Exception ex)
            {
                notifications.Add(new Notification { message = $"Falha ao criar tipo de registro: {ex.Message}" });
                return (false, notifications);
            }
        }


    }
}
