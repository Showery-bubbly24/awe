using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VidApi.Helpers;

namespace VidApi.Controllers.RuTube
{
    [Controller]
    [Route("api/[controller]")]
    public class GetNameController : Controller
    {
        [HttpGet("GetVidName")]
        public IActionResult GetVidName()
        {
            return Ok(Helper.Database.VidStorageRutubes.Select(x => new
            {
                x.Namevid,
                x.Videoid

            }).ToList());
        }
    }
}
