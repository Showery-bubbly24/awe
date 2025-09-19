using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace VidApi.Controllers.Posts
{
    [Route("api/[controller]")]
    [Controller]
    public class DeletePostController : Controller
    {
        [HttpDelete("DeletePost")]
        public IActionResult DeletePost(int GetDeleteId)
        {
            var delete = Helper.Database.Posttables.Where(x => x.Postid == GetDeleteId).FirstOrDefault();
            if (delete != null)
            {
                Helper.Database.Posttables.Remove(delete);
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
