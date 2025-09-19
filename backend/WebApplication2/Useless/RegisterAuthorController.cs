using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VidApi.Helpers;
using VidApi.Models;

namespace VidApi.Useless
{
/*    [Route("api/[controller]")]
    [Controller]
    public class RegisterAuthorController : Controller
    {
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Reg(DannieAuthRegClass dannie)
        {
            if (dannie.RegLogin == null || dannie.RegPassword == null)
            {
                string Pusto = "Введите логин и пароль";
                return Ok(Pusto);
            }
            else
            {
                Author author = new();
                author.Authorid = Helper.Database.Authors.Select(x => x.Authorid).Max() + 1;
                author.Authorname = dannie.RegLogin;
                author.Password = dannie.RegPassword;
                Helper.Database.Authors.Add(author);
                Helper.Database.SaveChanges();
                return Ok();
            }
        }
    }*/
}
