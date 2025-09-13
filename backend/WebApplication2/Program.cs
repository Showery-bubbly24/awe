

using Microsoft.EntityFrameworkCore;
using VidApi.Context;

var builder = WebApplication.CreateBuilder(args);

// Подключаем контроллеры и Swagger
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// ✅ Регистрируем DbContext для PostgreSQL
builder.Services.AddDbContext<SaiiiiteeeeeeeeeeeeeeeeeeeeeeeeeeeeeContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Разрешаем CORS для React-приложения
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy => policy
            .WithOrigins("http://localhost:3000")
            .AllowAnyMethod()
            .AllowAnyHeader());
});

var app = builder.Build();

// Настройка пайплайна
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseRouting();

app.UseCors("AllowReactApp");

app.UseAuthorization();

app.MapControllers();

app.Run();
