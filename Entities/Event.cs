using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

//Clasa eveniment pe care o vom folosi pentru a lua diferite date din baza de date
namespace VolunteeringPlatform.Entities
{
    public enum EventTypes
    {
        Enviromental,
        Education,
        Social,
        Healthcare,
        Sports
    }
    public class Event
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int EventId { get; set; }

        [Required]
        [MaxLength(50)]
        public string EventName { get; set; } = string.Empty;

        [MaxLength(200)]
        public string? EventDescription { get; set; }

        [Required]
        public EventTypes EventType { get; set; }

        [Required]
        public string EventCity { get; set; } = string.Empty;

        [Required]
        [MaxLength(200)]
        public string EventAddress { get; set; } = string.Empty;

        public DateTime EventDate { get; set; }

        public int EventNoOfVolunteers { get; set; }

        public double? EventLongitude { get; set; }

        public double? EventLatitude { get; set; }

    }
}
