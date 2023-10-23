using AutoMapper;
using WebApp.API.Models;
using WebApp.API.Repository.DataBase;

namespace WebApp.API.AutoMapper
{
    public class ExpenseProfile : Profile
    {
        public ExpenseProfile()
        {
            CreateMap<Expense, expense>();
            CreateMap<expense, Expense>();
        }
    }
}
