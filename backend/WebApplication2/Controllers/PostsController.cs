using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VidApi.Context;
using VidApi.Models;

namespace VidApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PostsController : ControllerBase
    {
        private readonly SaiiiiteeeeeeeeeeeeeeeeeeeeeeeeeeeeeContext _context;

        public PostsController(SaiiiiteeeeeeeeeeeeeeeeeeeeeeeeeeeeeContext context)
        {
            _context = context;
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPost(int id)
        {
            var post = await _context.Posts.FindAsync(id);
            if (post == null) return NotFound("Пост не найден");
            return Ok(post);
        }
        /// <summary>
        /// Добавление поста
        /// </summary>
        [HttpPost("add")]
        public async Task<IActionResult> AddPost([FromBody] Post post)
        {
            if (!await _context.Users.AnyAsync(u => u.UserId == post.AuthorId))
                return BadRequest("Автор не найден");

            _context.Posts.Add(post);
            await _context.SaveChangesAsync();
            return Ok(post);
        }

        /// <summary>
        /// Удаление поста
        /// </summary>
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeletePost(int id)
        {
            var post = await _context.Posts.FindAsync(id);
            if (post == null)
                return NotFound("Пост не найден");

            _context.Posts.Remove(post);
            await _context.SaveChangesAsync();
            return Ok($"Пост {id} успешно удалён");
        }

        /// <summary>
        /// Редактирование поста
        /// </summary>
        [HttpPut("edit/{id}")]
        public async Task<IActionResult> EditPost(int id, [FromBody] Post updatedPost)
        {
            var post = await _context.Posts.FindAsync(id);
            if (post == null)
                return NotFound("Пост не найден");

            post.NamePost = updatedPost.NamePost;
            post.ImagePost = updatedPost.ImagePost;
            post.DescPost = updatedPost.DescPost;
            post.AuthorId = updatedPost.AuthorId;

            await _context.SaveChangesAsync();
            return Ok(post);
        }
    }
}
