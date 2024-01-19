using WebApp.API.Models;

namespace WebApp.API.Interfaces
{
    public interface IUserService
    {
        AuthenticationResult Login(LoginRequest request);
        ValueTuple<bool, List<Notification>> Register(User user);
        ValueTuple<bool, List<Notification>, User> GetUserById(Guid id);
        ValueTuple<bool, List<Notification>> ConfirmEmail(string email, string token);

    }
}
