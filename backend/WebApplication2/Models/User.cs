using System;
using System.Collections.Generic;

namespace VidApi.Models;

public partial class User
{
    public int UserId { get; set; }

    public string? LoginUser { get; set; }

    public string? PasswordUser { get; set; }

    public int? TypeUserId { get; set; }

    public virtual ICollection<Post> Posts { get; set; } = new List<Post>();

    public virtual TypeUser? TypeUser { get; set; }
}
