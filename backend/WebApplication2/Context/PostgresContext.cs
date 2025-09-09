using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using VidApi.Models;

namespace VidApi.Context;

public partial class PostgresContext : DbContext
{
    public PostgresContext()
    {
    }

    public PostgresContext(DbContextOptions<PostgresContext> options)
        : base(options)
    {
    }

    public virtual DbSet<VidStorage> VidStorages { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseNpgsql("Host=localhost;Database=postgres;Username=postgres;password=123");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<VidStorage>(entity =>
        {
            entity.HasKey(e => e.Videoid).HasName("newtable_pk");

            entity.ToTable("VidStorage");

            entity.Property(e => e.Videoid).HasColumnName("videoid");
            entity.Property(e => e.Description).HasColumnName("description");
            entity.Property(e => e.Linkvid).HasColumnName("linkvid");
            entity.Property(e => e.Namevid).HasColumnName("namevid");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
