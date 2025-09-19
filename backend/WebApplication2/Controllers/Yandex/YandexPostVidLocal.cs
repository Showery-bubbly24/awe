using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using VidApi.Models;
using YandexDisk.Client;
using YandexDisk.Client.Clients;
using YandexDisk.Client.Http;

namespace VidApi.Controllers.Yandex
{
    [Controller]
    [Route("api/[controller]")]
    public class YandexPostVidLocal : Controller
    {
        [HttpPost("YandexPostVidLocal")]
        public async Task<IActionResult> CreateVid(string getPath = "Путь до видео")
        {
            await UploadSample(getPath);
            return Ok();
        }

        async Task UploadSample(string getPath)
        {
            //You should have oauth token from Yandex Passport.
            //See https://tech.yandex.ru/oauth/
            string oauthToken = "y0__xDVjoaDCBivkzog-tyNrBSkI-pBoAI7LYYqsivz5LZh9oXXrg";

            // Create a client instance
            IDiskApi diskApi = new DiskHttpApi(oauthToken);

            //Upload file from local
            await diskApi.Files.UploadFileAsync(path: $"{getPath}",
                                                overwrite: false,
                                                localFile: $"{getPath}",
                                                cancellationToken: CancellationToken.None);
        }

        // Загрузка файлов осуществляется только с компа на котором запущена api (не тестил) (указывать путь к файлу возможно придется через localFile вручную)
    }
}
