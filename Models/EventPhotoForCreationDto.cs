using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using VolunteeringPlatform.Entities;

namespace Volunteering_Platform.Models
{
    public class EventPhotoForCreationDto
    {
        public byte[] PhotoData { get; set; }
        public string PhotoDescription { get; set; }
        public int EventId { get; set; }
        public Event Event { get; set; }
    }
}
