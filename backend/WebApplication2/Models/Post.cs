using System;
using System.Collections.Generic;
using NpgsqlTypes;

namespace VidApi.Models;

public partial class Post
{
    public int PostId { get; set; }

    public string? NamePost { get; set; }

    public NpgsqlPath? ImagePost { get; set; }

    public string? DescPost { get; set; }

    public int? AuthorId { get; set; }

    public virtual User? Author { get; set; }
}
