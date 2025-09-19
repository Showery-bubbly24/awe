using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using YandexDisk.Client.Http;
using YandexDisk.Client.Protocol;

namespace VidApi.Controllers.Yandex
{
    [Controller]
    [Route("api/[controller]")]
    public class YandexGetLink : Controller
    {
        [HttpGet("YandexGetLink")]
        public async Task<IActionResult> YanGetVidLink(string getYanVidName = "Название видео(с расширением)")
        {
            // Токен OAuth (обязателен)
            var api = new DiskHttpApi("y0__xDVjoaDCBivkzog-tyNrBSkI-pBoAI7LYYqsivz5LZh9oXXrg");

            // Получение мета информации о файле
            Resource info = await api.MetaInfo.GetInfoAsync(new ResourceRequest { Path = $"/{getYanVidName}" });

            // Получение ссылки на скачивание
            var downloadLink = await api.Files.GetDownloadLinkAsync(info.Path);

            return Ok(downloadLink.Href);
        }
    }
}
