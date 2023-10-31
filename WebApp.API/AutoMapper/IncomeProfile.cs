using AutoMapper;
using WebApp.API.Models;
using WebApp.API.Repository.DataBase;
using WebApp.API.Repository.DomainEntity;

namespace WebApp.API.AutoMapper
{
    public class IncomeProfile : Profile
    {
        public IncomeProfile()
        {
            CreateMap<Income, income>();
            CreateMap<income, Income>();
            CreateMap<Income, IncomeDomain>();

            CreateMap<Income, IncomeDomain>()
                .ConstructUsing(income =>
                new IncomeDomain(
                    income.email,
                    income.description,
                    income.incomeType,
                    income.price,
                    income.incomeDate,
                    income.includedDate
                ));
        }
    }

}
