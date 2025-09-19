using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Net.Http;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using VidApi.Helpers;
using VidApi.Models;

namespace VidApi.Controllers.RuTube
{
    [Controller]
    [Route("api/[controller]")]
    public class PostVidController : Controller
    {
        [HttpPost("UpdateDatabase")]
        public async Task<IActionResult> CreateVid(string getVidLink = "Ссылка на видео")
        {
            var (title, description) = await GetInfo(getVidLink);
            VidStorageRutube vid = new();
            for (int i = 0; i < 1; i++)
            {
                vid.Videoid = Helper.Database.VidStorageRutubes.Select(x => x.Videoid).Max() + 1;
                vid.Namevid = title;
                vid.Linkvid = getVidLink;
                vid.Description = description;
                Helper.Database.VidStorageRutubes.Add(vid);
                Helper.Database.SaveChanges();
            }

            return Ok();
        }

        public static async Task<(string Title, string Description)> GetInfo(string getVidLink)
        {
            PostVidController post = new();
            using (HttpClient client = new HttpClient())
            {
                var html = await client.GetStringAsync(getVidLink);
                string title = ExtractMetaContent(html, "og:title");
                string description = ExtractMetaContent(html, "og:description");

                if (title == "Не найдено")
                {
                    title = ExtractTitleTag(html);
                }

                return (title, description);
            }
        }

        private static string ExtractMetaContent(string html, string propertyName)
        {
            string pattern = $"<meta\\s+property=\"{propertyName}\"\\s+content=\"([^\"]*)\"";
            var match = Regex.Match(html, pattern, RegexOptions.IgnoreCase);

            if (match.Success && match.Groups.Count > 1)
            {
                return match.Groups[1].Value;
            }

            // Другой паттерн
            pattern = $"<meta\\s+property='{propertyName}'\\s+content='([^']*)'";
            match = Regex.Match(html, pattern, RegexOptions.IgnoreCase);

            if (match.Success && match.Groups.Count > 1)
            {
                return match.Groups[1].Value;
            }

            return "Не найдено";
        }

        private static string ExtractTitleTag(string html)
        {
            // Поиск title тега
            var match = Regex.Match(html, "<title>(.*?)</title>", RegexOptions.IgnoreCase);

            if (match.Success && match.Groups.Count > 1)
            {
                return match.Groups[1].Value;
            }

            return "Не найдено";
        }
    }
}
