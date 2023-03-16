using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VolunteeringPlatform.Entities
{
    public class JoinedEvent
    {
        [Required]
        public string Username { get; set; } = String.Empty;

        [ForeignKey("Username")]
        public User? User { get; set; }

        [Required]
        public int EventId { get; set; }
        public Event? Event { get; set; }

    }
}
