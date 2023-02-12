
namespace VolunteeringPlatform.Models
{
    public class MessageDto
    {
        public Guid Id { get; set; }
        public Guid RoomId { get; set; }
        public string Contents { get; set; } = String.Empty;
        public string UserName { get; set; } = String.Empty;
        public DateTimeOffset PostedAt { get; set; }
    }
}
