using Microsoft.AspNetCore.Mvc;
using VidApi.Helpers;

namespace VidApi.Controllers.RuTube
{
    [Controller]
    [Route("api/[controller]")]
    public class GetControllerLink : Controller
    {
        [HttpGet("GetLink")]
        public IActionResult GetLink(string getVidName = "Название видео")
        {
            var result = Helper.Database.VidStorageRutubes
                .Where(x => x.Namevid == getVidName)
                .Select(x => new { x.Linkvid, x.Description })
                .ToList();

            return Ok(result);
        }
    }
}
