namespace VidApi.Helpers
{
    public class UpdateDatabaseClassImage
    {
        public string? NameImage { get; set; }

        public YandexDisk.Client.Protocol.Link? LinkImage { get; set; }

        public int Id { get; set; }
    }
}
