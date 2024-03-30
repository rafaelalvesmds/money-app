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
                    registry.userId,
                    registry.description,
                    registry.type,
                    registry.category,
                    registry.price,
                    registry.date,
                    registry.includedDate
                ));


            CreateMap<registryType, RegistryType>();
            CreateMap<RegistryType, registryType>();
            CreateMap<RegistryType, RegistryTypeDomain>()
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.name))
                .ForMember(dest => dest.Category, opt => opt.MapFrom(src => src.category))
                .ForMember(dest => dest.Color, opt => opt.MapFrom(src => src.color))
                .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.userId));

        }
    }
}
