using System;
using System.Collections.Generic;

namespace VidApi.Models;

public partial class Video
{
    public int VideoId { get; set; }

    public string? NameVid { get; set; }

    public string? LinkVid { get; set; }

    public string? DescVid { get; set; }
}
