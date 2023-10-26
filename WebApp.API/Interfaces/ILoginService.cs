using WebApp.API.Models;

namespace WebApp.API.Interfaces
{
    public interface ILoginService
    {
        AuthenticationResult Login(LoginRequest request);
        string GenerateJwtToken(string username);
        ValueTuple<bool, List<Notification>> Register(User user);
        ValueTuple<bool, List<Notification>, User> GetUserById(Guid id);

    }
}
