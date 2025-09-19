using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VidApi.Models;
using YandexDisk.Client.Http;
using YandexDisk.Client.Protocol;

namespace VidApi.Controllers.Posts
{
    [Route("api/[controller]")]
    [Controller]
    public class GetPostController : Controller
    {
        [HttpGet("GetPost")]
        public IActionResult GetPost()
        {
            return Ok(Helper.Database.Posttables.Select(x => new
            {
                x.Postid,
                x.Title,
                // Выводим логин автора, сравнивая 2 id (PostTable и Author)
                author = Helper.Database.Authors.Where(y => x.Authorid == y.Authorid)
                                                .Select(y => y.Authorname)
                                                .FirstOrDefault(),
                x.ImgUrl,
                x.Textpost,
                x.Postdate

            }).ToList());
        }
    }
}
