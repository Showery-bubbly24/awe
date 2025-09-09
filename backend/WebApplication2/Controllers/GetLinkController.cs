using Microsoft.AspNetCore.Mvc;
using VidApi;

namespace WebApplication2.Controllers
{
    [Controller]
    [Route("api/[controller]")]
    public class GetControllerLink : Controller
    {
        [HttpGet("GetVid")]
        public IActionResult GetLink(string getVidName = "Название видео")
        {
            var result = Helper.Database.VidStorages
                .Where(x => x.Namevid == getVidName)
                .Select(x => new { x.Linkvid, x.Description }).ToList();

            return Ok(result);
        }
    }
}
