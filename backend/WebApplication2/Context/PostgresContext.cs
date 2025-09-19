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

    public virtual DbSet<Author> Authors { get; set; }

    public virtual DbSet<Posttable> Posttables { get; set; }

    public virtual DbSet<Roleauthor> Roleauthors { get; set; }

    public virtual DbSet<VidStorageRutube> VidStorageRutubes { get; set; }

    public virtual DbSet<Vidstorageyandex> Vidstorageyandices { get; set; }

    public virtual DbSet<Yandeximage> Yandeximages { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseNpgsql("Host=localhost;Database=postgres;Username=postgres;password=123");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Author>(entity =>
        {
            entity.HasKey(e => e.Authorid).HasName("author_pk");

            entity.ToTable("author");

            entity.Property(e => e.Authorid).HasColumnName("authorid");
            entity.Property(e => e.Authorname).HasColumnName("authorname");
            entity.Property(e => e.Password).HasColumnName("password");
            entity.Property(e => e.Roleid).HasColumnName("roleid");

            entity.HasOne(d => d.Role).WithMany(p => p.Authors)
                .HasForeignKey(d => d.Roleid)
                .HasConstraintName("author_roleauthor_fk");
        });

        modelBuilder.Entity<Posttable>(entity =>
        {
            entity.HasKey(e => e.Postid).HasName("vidyandex_pk");

            entity.ToTable("posttable");

            entity.Property(e => e.Postid).HasColumnName("postid");
            entity.Property(e => e.Authorid).HasColumnName("authorid");
            entity.Property(e => e.ImgUrl).HasColumnName("img_url");
            entity.Property(e => e.Postdate)
                .HasColumnType("timestamp without time zone")
                .HasColumnName("postdate");
            entity.Property(e => e.Textpost).HasColumnName("textpost");
            entity.Property(e => e.Title).HasColumnName("title");

            entity.HasOne(d => d.Author).WithMany(p => p.Posttables)
                .HasForeignKey(d => d.Authorid)
                .HasConstraintName("posttable_author_fk");
        });

        modelBuilder.Entity<Roleauthor>(entity =>
        {
            entity.HasKey(e => e.Roleid).HasName("roleauthor_pk");

            entity.ToTable("roleauthor");

            entity.Property(e => e.Roleid).HasColumnName("roleid");
            entity.Property(e => e.Rolename)
                .HasColumnType("character varying")
                .HasColumnName("rolename");
        });

        modelBuilder.Entity<VidStorageRutube>(entity =>
        {
            entity.HasKey(e => e.Videoid).HasName("newtable_pk");

            entity.ToTable("VidStorageRutube");

            entity.Property(e => e.Videoid).HasColumnName("videoid");
            entity.Property(e => e.Description).HasColumnName("description");
            entity.Property(e => e.Linkvid).HasColumnName("linkvid");
            entity.Property(e => e.Namevid).HasColumnName("namevid");
        });

        modelBuilder.Entity<Vidstorageyandex>(entity =>
        {
            entity.HasKey(e => e.Vidid).HasName("vidstorageyandex_pk");

            entity.ToTable("vidstorageyandex");

            entity.Property(e => e.Vidid).HasColumnName("vidid");
            entity.Property(e => e.Linkvideo).HasColumnName("linkvideo");
            entity.Property(e => e.Namevideo).HasColumnName("namevideo");
        });

        modelBuilder.Entity<Yandeximage>(entity =>
        {
            entity.HasKey(e => e.Imageid).HasName("yandeximages_pk");

            entity.ToTable("yandeximages");

            entity.Property(e => e.Imageid).HasColumnName("imageid");
            entity.Property(e => e.Imagelink).HasColumnName("imagelink");
            entity.Property(e => e.Imagename).HasColumnName("imagename");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
