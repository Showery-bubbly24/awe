using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace VidApi.Controllers
{
    [Route("api/[controller]")]
    [Controller]
    public class DeleteController : Controller
    {
        [HttpDelete("Id")]
        public IActionResult PostCancellation(int GetDeleteId)
        {
            var delete = Helper.Database.VidStorages.Where(x => x.Videoid == GetDeleteId).FirstOrDefault();
            Helper.Database.VidStorages.Remove(delete);
            Helper.Database.SaveChanges();
            return Ok();
        }
    }
}
