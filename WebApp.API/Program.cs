using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
using WebApp.API.Context;
using WebApp.API.Interfaces;
using WebApp.API.Services;



var builder = WebApplication.CreateBuilder(args);

// Adicione serviços ao contêiner.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


// Configurar o AutoMapper e registrar os perfis de mapeamento
builder.Services.AddAutoMapper(typeof(Program)); // Registre os perfis do AutoMapper

// Adicione outros serviços necessários, como seu serviço de aplicação
builder.Services.AddTransient<IUserService, UserService>();
builder.Services.AddTransient<IManagementService, ManagementService>();


// Configure a conexão com o banco de dados PostgreSQL
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<WebAppContext>(options =>
    options.UseNpgsql(connectionString));

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

//builder.Services.AddSwaggerGen(c =>
//{
//    c.SwaggerDoc("v1", new OpenApiInfo { Title = "API V1", Version = "v1" });

    // Adicione a configuração para a autenticação Bearer (JWT)
//    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
//    {
//        Description = "JWT Authorization header using the Bearer scheme. Example: 'Bearer {token}'",
//        Name = "Authorization",
//        BearerFormat = "JWT",
//        In = ParameterLocation.Header,
//        Type = SecuritySchemeType.ApiKey
//    });

//    // Adicione a configuração para usar o esquema de segurança definido (Bearer)
//    c.AddSecurityRequirement(new OpenApiSecurityRequirement
//    {
//        {
//            new OpenApiSecurityScheme
//            {
//                Reference = new OpenApiReference
//                {
//                    Type = ReferenceType.SecurityScheme,
//                    Id = "Bearer"
//                }
//            },
//            new string[] {}
//        }
//    });
//});

//var configuration = new ConfigurationBuilder()
//    .SetBasePath(builder.Environment.ContentRootPath)
//    .AddJsonFile("appsettings.json")
//    .Build();

//builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
//    .AddJwtBearer(options =>
//    {
//        options.TokenValidationParameters = new TokenValidationParameters
//        {
//            ValidateIssuer = true,
//            ValidateAudience = true,
//            ValidateLifetime = true,
//            ValidateIssuerSigningKey = true,
//            ValidIssuer = configuration["Jwt:Issuer"],
//            ValidAudience = configuration["Jwt:Audience"],
//            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]))
//        };
//    });



var app = builder.Build();

// Configure o pipeline de solicitação HTTP.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.UseCors();

app.MapControllers();

app.Run();
