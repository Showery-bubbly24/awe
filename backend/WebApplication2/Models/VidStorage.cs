using System;
using System.Collections.Generic;

namespace VidApi.Models;

public partial class VidStorage
{
    public int Videoid { get; set; }

    public string Namevid { get; set; } = null!;

    public string Linkvid { get; set; } = null!;

    public string? Description { get; set; }
}
