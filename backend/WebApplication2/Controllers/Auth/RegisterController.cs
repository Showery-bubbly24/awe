using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VidApi.Context;
using VidApi.Helpers;
using VidApi.Models;

namespace VidApi.Controllers.Auth
{
    [ApiController]
    [Route("api/[controller]")]
    public class RegisterController : ControllerBase
    {
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            if (request is null || string.IsNullOrWhiteSpace(request.Username) || string.IsNullOrWhiteSpace(request.Password))
                return BadRequest(new { success = false, message = "Неверные данные запроса" });

            // Проверяем, есть ли пользователь с таким логином
            var exists = await Helper.Database.Authors.AnyAsync(u => u.Authorname == request.Username);
            if (exists)
                return Conflict(new { success = false, message = "Пользователь с таким логином уже существует" });

            var user = new Author
            {
                Authorname = request.Username,
                Password = request.Password,
                Roleid = request.TypeUserId
            };

            Helper.Database.Authors.Add(user);
            await Helper.Database.SaveChangesAsync();

            return Ok(new { success = true, message = "Пользователь создан", userId = user.Authorid });
        }
    }

    public class RegisterRequest
    {
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public int? TypeUserId { get; set; }
    }
}
