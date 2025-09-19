using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VidApi.Helpers;

namespace VidApi.Controllers.RuTube
{
    [Route("api/[controller]")]
    [Controller]
    public class DeleteController : Controller
    {
        [HttpDelete("Id")]
        public IActionResult DeleteVid(int GetDeleteId)
        {
            var delete = Helper.Database.VidStorageRutubes.Where(x => x.Videoid == GetDeleteId).FirstOrDefault();
            if (delete != null)
            {
                Helper.Database.VidStorageRutubes.Remove(delete);
                Helper.Database.SaveChanges();
                return Ok();
            }
            else
            {
                return Ok();
            }

            //Сделал if/else чтобы warning не мазолил глаза
        }
    }
}
