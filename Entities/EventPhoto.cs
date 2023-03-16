using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using VolunteeringPlatform.Entities;

namespace VolunteeringPlatform.Entities
{
    public class EventPhoto
    {
        public Guid Id { get; set; }

        [Required]
        public byte[] PhotoData { get; set; }

        public string PhotoDescription { get; set; }

        [ForeignKey("Event")]
        public int EventId { get; set; }
        public Event Event { get; set; }


    }
}
