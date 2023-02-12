using System.ComponentModel.DataAnnotations;

namespace Volunteering_Platform.Entities
{
    public class ChatRoom
    {
        public Guid Id { get; set; }
        [Required]
        public string Name { get; set; } = String.Empty;

    }
}
