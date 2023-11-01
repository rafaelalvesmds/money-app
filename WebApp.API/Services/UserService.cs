using AutoMapper;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WebApp.API.Context;
using WebApp.API.Interfaces;
using WebApp.API.Models;
using WebApp.API.Repository.DataBase;
using WebApp.API.Repository.DomainEntity;

namespace WebApp.API.Services
{
    public class UserService : IUserService
    {
        private readonly WebAppContext _context;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;

        public UserService(WebAppContext context, IConfiguration configuration, IMapper mapper) 
        {
            _context = context;
            _configuration = configuration;
            _mapper = mapper;
        }

        public AuthenticationResult Login(LoginRequest request)
        {
            var userRequest = _context.users.SingleOrDefault(u => u.email == request.email);

            List<Notification> notifications = new List<Notification>();

            //password encryption
            if (userRequest == null || !BCrypt.Net.BCrypt.Verify(request.password, userRequest.password))
            {
                notifications.Add(new Notification { Message = "Invalid credentials." });

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
                var token = GenerateJwtToken(userRequest.email);

                notifications.Add(new Notification { Message = "User successfully authenticated." });


                var successResult = new AuthenticationResult
                {
                    isAuthenticated = true,
                    user = _mapper.Map<user, User>(userRequest),
                    notifications = notifications,
                    token = token
                };
                

                return successResult;
            }
        }

        public (bool, List<Notification>, User) GetUserById(Guid id)
        {
            var user = _context.users.SingleOrDefault(u => u.id == id);

            if (user == null)
            {
                var notifications = new List<Notification> { new Notification { Message = "User not found." } };
                return (false, notifications, null);
            }

            User userResult = _mapper.Map<User>(user);

            return (true, new List<Notification>(), userResult);
        }

        public ValueTuple<bool, List<Notification>> Register(User user)
        {
            UserDomain userDomain = _mapper.Map<UserDomain>(user);

            if (userDomain.HasNotifications())
            {
                return (false, userDomain.Notifications);
            }

            var existingUser = _context.users.SingleOrDefault(u => u.email == user.email);

            List<Notification> notifications = new List<Notification>();


            if (existingUser != null)
            {
                notifications.Add(new Notification { Message = "There is already a user with the same email." });
                return (false, notifications);
            } 
            else
            {
                user userToRegister = _mapper.Map<User, user>(user);
                userToRegister.password = HashPassword(user.password);
                userToRegister.id = Guid.NewGuid();
                userToRegister.registrationDate = DateTime.UtcNow;

                _context.users.Add(userToRegister);
                _context.SaveChanges();

                notifications.Add(new Notification { Message = "User registered successfully." });
                return (true, notifications);
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
                _configuration["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }
    }
}

