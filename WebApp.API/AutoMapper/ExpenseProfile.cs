using AutoMapper;
using WebApp.API.Models;
using WebApp.API.Repository.DataBase;
using WebApp.API.Repository.DomainEntity;

namespace WebApp.API.AutoMapper
{
    public class ExpenseProfile : Profile
    {
        public ExpenseProfile()
        {
            CreateMap<Expense, expense>();
            CreateMap<expense, Expense>();
            CreateMap<Expense, ExpenseDomain>();

            CreateMap<Expense, ExpenseDomain>()
                .ConstructUsing(expense =>
                new ExpenseDomain(
                    expense.email,
                    expense.name,
                    expense.expenseType,
                    expense.price,
                    expense.mounth,
                    expense.year
                ));
        }
    }
}
