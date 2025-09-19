namespace VidApi.Helpers
{
    public class UpdateDatabaseClassVid
    {
        public string? NameVid { get; set; }

        public YandexDisk.Client.Protocol.Link? LinkVid { get; set; }

        public int Id { get; set; }
    }
}
