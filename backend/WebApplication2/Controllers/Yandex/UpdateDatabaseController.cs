using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VidApi.Helpers;
using VidApi.Models;
using YandexDisk.Client.Http;
using YandexDisk.Client.Protocol;

namespace VidApi.Controllers.Yandex
{
    [Controller]
    [Route("api/[controller]")]
    public class UpdateDatabaseController : Controller
    {
        [HttpPost("UpdateDatabase")]
        public async Task<IActionResult> UpdateDatabase()
        {
            // Для id видео в бд
            int c = 0;
            // Для id фото в бд
            int g = 0;

            string cooldb = "Данные в базе актуальные";

            var api = new DiskHttpApi("y0__xDVjoaDCBivkzog-tyNrBSkI-pBoAI7LYYqsivz5LZh9oXXrg");

            // Получение информации с Яндекс диска
            Resource info = await api.MetaInfo.GetInfoAsync(new ResourceRequest { Path = "/" });

            // Обьявление переменных для видео
            List<string?> vidst = Helper.Database.Vidstorageyandices.Select(x => x.Namevideo).ToList();

            List<UpdateDatabaseClassVid> upd = new();

            List<string?> vidName = new();

            // Обьявление переменных для картинок
            List<string?> imagest = Helper.Database.Yandeximages.Select(x => x.Imagename).ToList();

            List<UpdateDatabaseClassImage> updim = new();

            List<string?> imageName = new();

            // Записываем видео
            foreach (var item in info.Embedded.Items)
            {
                if (item.MimeType == "video/mp4")
                {
                    UpdateDatabaseClassVid update = new();
                    vidName.Add(item.Name);
                    update.NameVid = item.Name;
                    update.LinkVid = await api.Files.GetDownloadLinkAsync(item.Path);
                    c += 1;
                    update.Id = c;
                    upd.Add(update);
                }
            }

            //Записываем Картинки
            foreach (var item in info.Embedded.Items)
            {
                if (item.MimeType == "image/png")
                {
                    UpdateDatabaseClassImage update = new();
                    imageName.Add(item.Name);
                    update.NameImage = item.Name;
                    update.LinkImage = await api.Files.GetDownloadLinkAsync(item.Path);
                    g += 1;
                    update.Id = g;
                    updim.Add(update);
                }
            }

            // Сравниваю данные из бд и Яндекс диска
            if (vidst != vidName || imagest != imageName)
            {
                // Удаляю данные из таблиц
                var deleteVid = Helper.Database.Vidstorageyandices.Where(x => x.Vidid >= 1);
                var deleteImg = Helper.Database.Yandeximages.Where(x => x.Imageid >= 1);

                // Чтобы не было warning
                if (deleteVid != null && deleteImg != null)
                {
                    // Перезаписываю таблицу видео
                    Helper.Database.Vidstorageyandices.RemoveRange(deleteVid);
                    Helper.Database.Yandeximages.RemoveRange(deleteImg);

                    // Добавление видео
                    Vidstorageyandex vid = new();
                    foreach(var item in upd)
                    {
                        vid.Namevideo = item.NameVid;
                        vid.Linkvideo = item.LinkVid!.Href.ToString();
                        vid.Vidid = item.Id;
                        Helper.Database.Vidstorageyandices.Add(vid);
                        Helper.Database.SaveChanges();
                    }

                    // Добавление картинок
                    Yandeximage img = new();
                    foreach (var item in updim)
                    {
                        img.Imagename = item.NameImage;
                        img.Imagelink = item.LinkImage!.Href.ToString();
                        img.Imageid = item.Id;
                        Helper.Database.Yandeximages.Add(img);
                        Helper.Database.SaveChanges();
                    }
                    return Ok();
                }
                else
                {
                    return Ok();
                }
            }
            return Ok(cooldb);
        }
    }
}
