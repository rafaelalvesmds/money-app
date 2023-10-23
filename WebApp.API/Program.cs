using Microsoft.EntityFrameworkCore;
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
builder.Services.AddTransient<ILoginService, LoginService>();
builder.Services.AddTransient<IExpenseService, ExpenseService>();


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

var app = builder.Build();

// Configure o pipeline de solicitação HTTP.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseCors();

app.MapControllers();

app.Run();
