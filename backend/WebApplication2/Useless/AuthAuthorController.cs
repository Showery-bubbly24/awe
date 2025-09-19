using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VidApi.Context;
using VidApi.Helpers;
using VidApi.Models;

namespace VidApi.Useless
{
 /*   [Route("api/[controller]")]
    [Controller]
    public class AuthAuthorController : Controller
    {
        string Wrong = "Неверный логин или пароль";
        string Pusto = "Введите логин и пароль";
        [HttpGet("AuthController")]
        public IActionResult Auth(DannieAuthRegClass dannie)
        {
            using PostgresContext database = new PostgresContext();
            {
                Author author = new Author();
                if (dannie != null)
                {
                    author = database.Authors.Where(
                        x => x.Authorname == dannie.RegLogin
                        && x.Password == dannie.RegPassword
                        ).First();

                    if (author == null)
                    {
                        return Ok(Wrong);
                    }
                }

                else
                {
                    return Ok(Pusto);
                }
            }
            return View();
        }
    }*/
}
