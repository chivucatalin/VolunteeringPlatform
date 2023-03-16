using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VolunteeringPlatform.Entities
{
    public class ChatRoom
    {
        public Guid Id { get; set; }
        [Required]
        public string Name { get; set; } = String.Empty; //Cel care da mesajul
        public string UserName { get; set; } = String.Empty; // Cel care primeste mesajul

        [ForeignKey("RoomId")]
        public ICollection<Message>? Messages { get; set; }
    }
}
