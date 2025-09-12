using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VidApi.Context;

namespace VidApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly SaiiiiteeeeeeeeeeeeeeeeeeeeeeeeeeeeeContext _context;

        public AuthController(SaiiiiteeeeeeeeeeeeeeeeeeeeeeeeeeeeeContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            if (request is null || string.IsNullOrWhiteSpace(request.Username) || string.IsNullOrWhiteSpace(request.Password))
                return BadRequest(new { success = false, message = "Неверные данные запроса" });

            var user = await _context.Users
                .Include(u => u.TypeUser)
                .FirstOrDefaultAsync(u => u.LoginUser == request.Username);

            if (user == null)
                return Unauthorized(new { success = false, message = "Пользователь не найден" });

            if (user.PasswordUser != request.Password)
                return Unauthorized(new { success = false, message = "Неверный пароль" });

            return Ok(new
            {
                success = true,
                message = "Успешный вход",
                userId = user.UserId,
                login = user.LoginUser,
                role = user.TypeUser?.Name
            });
        }
    }

    public class LoginRequest
    {
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}
