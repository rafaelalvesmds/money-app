using AutoMapper;
using WebApp.API.Models;
using WebApp.API.Repository.DataBase;
using WebApp.API.Repository.DomainEntity;

namespace WebApp.API.AutoMapper
{
    public class ManagementProfile : Profile
    {
        public ManagementProfile()
        {
            CreateMap<Registry, registry>();
            CreateMap<registry, Registry>();
            CreateMap<registry, RegistryDomain>();

            CreateMap<Registry, RegistryDomain>()
                .ConstructUsing(registry =>
                new RegistryDomain(
                    registry.email,
                    registry.description,
                    registry.type,
                    registry.category,
                    registry.price,
                    registry.date,
                    registry.includedDate
                ));
        }
    }
}
