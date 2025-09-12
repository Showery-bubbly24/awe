using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using VidApi.Models;

namespace VidApi.Context;

public partial class SaiiiiteeeeeeeeeeeeeeeeeeeeeeeeeeeeeContext : DbContext
{
    public SaiiiiteeeeeeeeeeeeeeeeeeeeeeeeeeeeeContext()
    {
    }

    public SaiiiiteeeeeeeeeeeeeeeeeeeeeeeeeeeeeContext(DbContextOptions<SaiiiiteeeeeeeeeeeeeeeeeeeeeeeeeeeeeContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Post> Posts { get; set; }

    public virtual DbSet<TypeUser> TypeUsers { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<Video> Videos { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseNpgsql("Host=localhost; Database=SAIIIITEEEEEEEEEEEEEEEEEEEEEEEEEEEEE; Username=postgres; Password=SKALrawcn12s3");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Post>(entity =>
        {
            entity.HasKey(e => e.PostId).HasName("Posts_pkey");

            entity.Property(e => e.PostId).HasColumnName("post_id");
            entity.Property(e => e.AuthorId).HasColumnName("author_id");
            entity.Property(e => e.DescPost).HasColumnName("desc_post");
            entity.Property(e => e.ImagePost).HasColumnName("image_post");
            entity.Property(e => e.NamePost).HasColumnName("name_post");

            entity.HasOne(d => d.Author).WithMany(p => p.Posts)
                .HasForeignKey(d => d.AuthorId)
                .HasConstraintName("posts_users_fk");
        });

        modelBuilder.Entity<TypeUser>(entity =>
        {
            entity.HasKey(e => e.TypeUserId).HasName("TypeUser_pkey");

            entity.ToTable("TypeUser");

            entity.Property(e => e.TypeUserId).HasColumnName("type_user_id");
            entity.Property(e => e.Name).HasColumnName("name");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("Users_pkey");

            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.LoginUser).HasColumnName("login_user");
            entity.Property(e => e.PasswordUser).HasColumnName("password_user");
            entity.Property(e => e.TypeUserId).HasColumnName("type_user_id");

            entity.HasOne(d => d.TypeUser).WithMany(p => p.Users)
                .HasForeignKey(d => d.TypeUserId)
                .HasConstraintName("users_typeuser_fk");
        });

        modelBuilder.Entity<Video>(entity =>
        {
            entity.HasKey(e => e.VideoId).HasName("Video_pkey");

            entity.ToTable("Video");

            entity.Property(e => e.VideoId).HasColumnName("video_id");
            entity.Property(e => e.DescVid).HasColumnName("desc_vid");
            entity.Property(e => e.LinkVid).HasColumnName("link_vid");
            entity.Property(e => e.NameVid).HasColumnName("name_vid");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
