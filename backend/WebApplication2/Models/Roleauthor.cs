using System;
using System.Collections.Generic;

namespace VidApi.Models;

public partial class Roleauthor
{
    public int Roleid { get; set; }

    public string? Rolename { get; set; }

    public virtual ICollection<Author> Authors { get; set; } = new List<Author>();
}
