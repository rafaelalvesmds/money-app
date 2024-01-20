using AutoMapper;
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
        private readonly IMapper _mapper;
        private readonly IEmailService _emailService;
        private readonly ITokenService _tokenService;


        public UserService(WebAppContext context, IMapper mapper, IEmailService emailService, ITokenService tokenService)
        {
            _context = context;
            _mapper = mapper;
            _emailService = emailService;
            _tokenService = tokenService;
        }

        public AuthenticationResult Login(LoginRequest request)
        {
            var userRequest = _context.users.SingleOrDefault(u => u.email == request.email);
            List<Notification> notifications = new List<Notification>();



            //password encryption
            if (userRequest == null || !BCrypt.Net.BCrypt.Verify(request.password, userRequest.password))
            {
                notifications.Add(new Notification { message = "Invalid credentials." });

                var result = new AuthenticationResult
                {
                    isAuthenticated = false,
                    user = new User(),
                    notifications = notifications,
                    token = ""
                };

                return result;
            }
            else if (!userRequest.confirmedEmail)
            {
                notifications.Add(new Notification { message = "confirm your email please." });

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
                var token = _tokenService.GenerateJwtToken(userRequest.email);

                notifications.Add(new Notification { message = "User successfully authenticated." });

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
                var notifications = new List<Notification> { new Notification { message = "User not found." } };
                return (false, notifications, null);
            }

            User userResult = _mapper.Map<User>(user);

            return (true, new List<Notification>(), userResult);
        }

        public ValueTuple<bool, List<Notification>> Register(User user)
        {
            UserDomain userDomain = _mapper.Map<UserDomain>(user);

            if (userDomain.HasNotifications())
                return (false, userDomain.Notifications);

            var existingUser = _context.users.SingleOrDefault(u => u.email == user.email);

            List<Notification> notifications = new List<Notification>();


            if (existingUser != null)
            {
                if (!existingUser.confirmedEmail)
                {
                    notifications.Add(new Notification { message = "Email already registered. To complete registration, please confirm your email." });
                    return (false, notifications);
                }

                notifications.Add(new Notification { message = "There is already a user with the same email." });
                return (false, notifications);
            }
            else
            {
                user userToRegister = _mapper.Map<User, user>(user);
                userToRegister.password = _tokenService.HashPassword(user.password);
                userToRegister.id = Guid.NewGuid();
                userToRegister.registrationDate = DateTime.UtcNow;
                userToRegister.confirmedEmail = false;

                _emailService.SendConfirmationEmail(userToRegister.email, userToRegister.name);

                _context.users.Add(userToRegister);
                _context.SaveChanges();

                notifications.Add(new Notification { message = "Confirm your email to complete your registration." });
                return (true, notifications);
            }
        }

        public ValueTuple<bool, List<Notification>> ConfirmEmail(string email,string token)
        {
            user existingUser = _context.users.SingleOrDefault(u => u.email == email);
            List<Notification> notifications = new List<Notification>();


            if (existingUser != null)
            {
                if(!existingUser.confirmedEmail)
                {
                    bool result = _tokenService.ValidateJwtToken(email, token);

                    if (result)
                    {
                        existingUser.confirmedEmail = true;
                        _context.SaveChanges();
                        notifications.Add(new Notification { message = "email confirmed successfully." });
                        return (true, notifications);
                    }
                    else
                    {
                        notifications.Add(new Notification { message = "expired token." });
                        return (false, notifications);
                    }
                } else
                    notifications.Add(new Notification { message = "email is already confirmed." });
                    return (false, notifications);

            } else
            {
                notifications.Add(new Notification { message = "email not registered." });
                return (false, notifications);
            }
        }

    }
}

