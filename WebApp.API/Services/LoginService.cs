using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WebApp.API.Context;
using WebApp.API.Interfaces;
using WebApp.API.Models;

namespace WebApp.API.Services
{
    public class LoginService : ILoginService
    {
        private readonly WebAppContext _context;
        private readonly IConfiguration _configuration;

        public LoginService(WebAppContext context, IConfiguration configuration) 
        {
            _context = context;
            _configuration = configuration;
        }

        public AuthenticationResult Login(LoginRequest request)
        {
            var user = _context.Users.SingleOrDefault(u => u.email == request.email && u.password == request.password);

            List<Notification> notifications = new List<Notification>();

            if (user == null)
            {
                notifications.Add(new Notification { Message = "Credenciais inválidas" });

                var result = new AuthenticationResult
                {
                    isAuthenticated = false,
                    user = new User(),
                    notifications = notifications,
                    token = ""
                };

                return result;
            }
            else
            {
                var token = GenerateJwtToken(user.email);

                notifications.Add(new Notification { Message = "Usuário autenticado com sucesso" });

                var successResult = new AuthenticationResult
                {
                    isAuthenticated = true,
                    user = user,
                    notifications = notifications,
                    token = token
                };

                return successResult;
            }
        }

        public string GenerateJwtToken(string username)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
            new Claim(JwtRegisteredClaimNames.Sub, username),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

            var token = new JwtSecurityToken(
                _configuration["Jwt:Issuer"],
                _configuration["Jwt:Issuer"],
                claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public ValueTuple<bool, List<Notification>> Register(User user)
        {
            var existingUser = _context.Users.SingleOrDefault(u => u.email == user.email);

            List<Notification> notifications = new List<Notification>();


            if (existingUser != null)
            {
                notifications.Add(new Notification { Message = "Já existe um usuário com o mesmo email." });
                return (false, notifications);
            } 
            else
            {
                _context.Users.Add(user);
                _context.SaveChanges();

                notifications.Add(new Notification { Message = "Usuário cadastrado com sucesso." });
                return (true, notifications);
            }
        }
    }
}

