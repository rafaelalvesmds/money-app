namespace WebApp.API.Interfaces
{
    public interface ITokenService
    {
        string GenerateJwtToken(string email);
        string HashPassword(string password);
        bool ValidateJwtToken(string email, string token);
    }
}
