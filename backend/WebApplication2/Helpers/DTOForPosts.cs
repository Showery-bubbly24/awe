using VidApi.Models;

namespace VidApi.Helpers
{
    public class DTOForPosts
    {
        public int Postid { get; set; }

        public string? Title { get; set; }

        public int? Authorid { get; set; }

        public string? ImgUrl { get; set; }

        public string? Textpost { get; set; }

        public DateTime? Postdate { get; set; }

        public virtual Author? Author { get; set; }
    }
}
