using System;
using System.Collections.Generic;

namespace VidApi.Models;

public partial class Author
{
    public int Authorid { get; set; }

    public string? Authorname { get; set; }

    public string? Password { get; set; }

    public int? Roleid { get; set; }

    public virtual ICollection<Posttable> Posttables { get; set; } = new List<Posttable>();

    public virtual Roleauthor? Role { get; set; }
}
