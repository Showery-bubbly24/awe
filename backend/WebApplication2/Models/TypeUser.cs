using System;
using System.Collections.Generic;

namespace VidApi.Models;

public partial class TypeUser
{
    public int TypeUserId { get; set; }

    public string? Name { get; set; }

    public virtual ICollection<User> Users { get; set; } = new List<User>();
}
