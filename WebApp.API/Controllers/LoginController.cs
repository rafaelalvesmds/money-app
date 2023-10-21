using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WebApp.API.Context;
using WebApp.API.Models;

namespace WebApp.API.Controllers
{


    [Route("api/auth")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly WebAppContext _context;

        public LoginController(IConfiguration configuration, WebAppContext context)
        {
            _configuration = configuration;
            _context = context;
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] User user)
        {
            // Verifique se já existe um usuário com o mesmo email no banco de dados.
            var existingUser = _context.Users.SingleOrDefault(u => u.email == user.email);

            if (existingUser != null)
            {
                return BadRequest("Já existe um usuário com o mesmo email.");
            }

            // Caso não exista um usuário com o mesmo email, crie o novo usuário.
            _context.Users.Add(user);
            _context.SaveChanges();

            return Ok("Usuário cadastrado com sucesso.");
        }


        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            // Lógica de autenticação aqui, verificando as credenciais no banco de dados.
            var user = _context.Users.SingleOrDefault(u => u.email == request.email && u.password == request.password);

            if (user == null)
            {
                return Unauthorized("Credenciais inválidas");
            }

            // Se as credenciais estiverem corretas, gere um token JWT.
            var token = GenerateJwtToken(user.email);

            return Ok(new { Token = token });
        }


        private string GenerateJwtToken(string username)
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
                expires: DateTime.Now.AddHours(1), // Defina a duração do token como necessário
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
