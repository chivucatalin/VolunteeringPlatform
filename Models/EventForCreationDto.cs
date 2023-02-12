namespace VolunteeringPlatform.Models
{
    //Clasa pe care o vom folosi pentru a crea un eveniment in baza de date -In backend->se mapeaza in entitatea Event->se trimite la baza de date
    public class EventForCreationDto
    {
        public string EventName { get; set; } = string.Empty;

        public string? EventDescription { get; set; }

        public EventTypes EventType { get; set; }

        public string EventCity { get; set; } = string.Empty;

        public string EventAddress { get; set; } = string.Empty;

        public DateTime EventDate { get; set; }

        public int EventNoOfVolunteers { get; set; }

        public double? EventLongitude { get; set; }

        public double? EventLatitude { get; set; }
    }
}
