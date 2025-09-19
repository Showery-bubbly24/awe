using System;
using System.Collections.Generic;

namespace VidApi.Models;

public partial class Posttable
{
    public int Postid { get; set; }

    public string? Title { get; set; }

    public int? Authorid { get; set; }

    public string? ImgUrl { get; set; }

    public string? Textpost { get; set; }

    public DateTime? Postdate { get; set; }

    public virtual Author? Author { get; set; }
}
