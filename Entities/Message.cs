using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VolunteeringPlatform.Entities
{
    public class Message
    {
        [Required]
        public Guid Id { get; set; }

        [Required]
        public string Contents { get; set; } = String.Empty;
        [Required]
        public string UserName { get; set; } = String.Empty;
        public DateTimeOffset PostedAt { get; set; }
        public Guid RoomId { get; set; }
        public ChatRoom ChatRoom { get; internal set; }
    }
}
