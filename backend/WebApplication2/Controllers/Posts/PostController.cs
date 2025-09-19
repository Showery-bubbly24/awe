using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VidApi.Models;

namespace VidApi.Controllers.Posts
{
    [Route("api/[controller]")]
    [Controller]
    public class PostController : Controller
    {
        [HttpPost("Post")]
        public IActionResult Post(Posttable getPostInfo)
        {
            try
            {
                getPostInfo.Postid = Helper.Database.Posttables.Select(x => x.Postid).Max() + 1;
            }
            catch (Exception)
            {
                getPostInfo.Postid = 1;
            }
            Helper.Database.Posttables.Add(getPostInfo);
            Helper.Database.SaveChanges();
            return Ok();
        }
    }
}
