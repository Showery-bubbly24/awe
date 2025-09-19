using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VidApi.Context;
using VidApi.Helpers;

namespace VidApi.Controllers.Auth
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            if (request is null || string.IsNullOrWhiteSpace(request.Username) || string.IsNullOrWhiteSpace(request.Password))
                return BadRequest(new { success = false, message = "Неверные данные запроса" });

            var user = await Helper.Database.Authors
                .FirstOrDefaultAsync(u => u.Authorname == request.Username);

            if (user == null)
                return Unauthorized(new { success = false, message = "Пользователь не найден" });

            if (user.Password != request.Password)
                return Unauthorized(new { success = false, message = "Неверный пароль" });

            // role = 1 (User); role = 2 (Admin)
            return Ok(new
            {
                success = true,
                message = "Успешный вход",
                userId = user.Authorid,
                login = user.Authorname,
                role = user.Roleid
            });
        }
    }

    public class LoginRequest
    {
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}
