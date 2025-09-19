using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Threading.Tasks;
using VidApi.Models;
using YandexDisk.Client;
using YandexDisk.Client.Clients;
using YandexDisk.Client.Http;
using YandexDisk.Client.Protocol;

namespace VidApi.Controllers.Yandex
{
    [Route("api/[controller]")]
    [Controller]
    public class YandexGetVidName : Controller
    {
        [HttpGet("YandexGetVidName")]
        public async Task<IActionResult> YanGetVidName()
        {
            var api = new DiskHttpApi("y0__xDVjoaDCBivkzog-tyNrBSkI-pBoAI7LYYqsivz5LZh9oXXrg");

            // Получение мета информации о файле
            var roodFolderData = await api.MetaInfo.GetInfoAsync(new ResourceRequest
            {
                Path = "/"
            });

            List<string> name = new();

            // Получение названий файлов
            foreach (var item in roodFolderData.Embedded.Items)
            {
                if (item.MimeType == "video/mp4")
                {
                    name.Add(item.Name);
                }
            }

            return Ok(name);
        }
    }
}
