using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VidApi.Context;
using VidApi.Models;

namespace VidApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RegisterController : ControllerBase
    {
        private readonly SaiiiiteeeeeeeeeeeeeeeeeeeeeeeeeeeeeContext _context;

        public RegisterController(SaiiiiteeeeeeeeeeeeeeeeeeeeeeeeeeeeeContext context)
        {
            _context = context;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            if (request is null || string.IsNullOrWhiteSpace(request.Username) || string.IsNullOrWhiteSpace(request.Password))
                return BadRequest(new { success = false, message = "Неверные данные запроса" });

            // Проверяем, существует ли выбранная роль
            var roleExists = await _context.TypeUsers.AnyAsync(t => t.TypeUserId == request.TypeUserId);
            if (!roleExists)
                return BadRequest(new { success = false, message = "Выбранная роль не найдена" });

            // Проверяем, есть ли пользователь с таким логином
            var exists = await _context.Users.AnyAsync(u => u.LoginUser == request.Username);
            if (exists)
                return Conflict(new { success = false, message = "Пользователь с таким логином уже существует" });

            var user = new User
            {
                LoginUser = request.Username,
                PasswordUser = request.Password, // пока без хеширования, можно заменить на хеш позже
                TypeUserId = request.TypeUserId
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new { success = true, message = "Пользователь создан", userId = user.UserId });
        }
    }

    public class RegisterRequest
    {
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public int? TypeUserId { get; set; }
    }
}
