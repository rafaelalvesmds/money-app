using AutoMapper;
using WebApp.API.Models;
using WebApp.API.Repository.DataBase;

namespace WebApp.API.AutoMapper
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<user, User>();
            CreateMap<User, user>();
        }
    }

}
