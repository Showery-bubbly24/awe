using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace VidApi.Controllers
{
    [Controller]
    [Route("api/[controller]")]
    public class GetNameController : Controller
    {
        [HttpGet("GetVidName")]
        public IActionResult GetVidName()
        {
            return Ok(Helper.Database.VidStorages.Select(x => new
            {
                x.Namevid,
                x.Videoid

            }).ToList());
        }
    }
}
