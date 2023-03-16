using VolunteeringPlatform.Entities;
using Microsoft.EntityFrameworkCore;

//Ce dorim sa aiba baza de data pe care o cream,DbSet<=>Tabel

namespace VolunteeringPlatform.DbContexts
{
    public class VolunteeringPlatformContext : DbContext
    {

        public DbSet<Event> Events { get; set; } = null!;

        public DbSet<User> Users { get; set; } = null!;

        public DbSet<Message> Messages { get; set; } = null!;

        public DbSet<ChatRoom> ChatRooms { get; set; } = null!;

        public DbSet<JoinedEvent> JoinedEvents { get; set; } = null!;

        public DbSet<EventPhoto> EventPhotos { get; set; } = null!;


        public VolunteeringPlatformContext(DbContextOptions<VolunteeringPlatformContext> options) 
            : base(options) 
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure foreign key relationship between ChatRooms and Messages

            modelBuilder.Entity<User>().HasData(
                    new User
                    {
                        Id = 1,
                        Username = "Perron",
                        Email = "chivu.catalin@yahoo.com",
                        Password = "�.QZC�i\u0001�Tb��t�\u0011",
                        isAdmin = true,
                        AssociationId = 1,
                    }
            );

            modelBuilder.Entity<Message>()
                .HasOne(m => m.ChatRoom)
                .WithMany(cr => cr.Messages)
                .HasForeignKey(m => m.RoomId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<User>()
                .HasIndex(u => u.Username)
                .IsUnique();

            modelBuilder.Entity<JoinedEvent>()
                .HasKey(je => new { je.Username, je.EventId });

            modelBuilder.Entity<JoinedEvent>()
                .HasOne(je => je.User)
                .WithMany(u => u.JoinedEvents)
                .HasForeignKey(je => je.Username)
                .HasPrincipalKey(u => u.Username);

            modelBuilder.Entity<JoinedEvent>()
                .HasOne(je => je.Event)
                .WithMany(e => e.JoinedEvents)
                .HasForeignKey(je => je.EventId);

            modelBuilder.Entity<EventPhoto>()
                .HasOne(p => p.Event)
                .WithMany(e => e.EventPhotos)
                .HasForeignKey(p => p.EventId)
                .OnDelete(DeleteBehavior.Cascade);



            modelBuilder.Entity<EventPhoto>()
                        .Property(ep => ep.PhotoData)
                        .HasColumnType("BLOB");

            base.OnModelCreating(modelBuilder);
        }

    }
}
