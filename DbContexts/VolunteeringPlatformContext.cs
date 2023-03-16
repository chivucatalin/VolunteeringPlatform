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

        public VolunteeringPlatformContext(DbContextOptions<VolunteeringPlatformContext> options) 
            : base(options) 
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            base.OnModelCreating(modelBuilder);
        }

    }
}
