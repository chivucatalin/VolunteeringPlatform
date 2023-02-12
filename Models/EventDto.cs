namespace VolunteeringPlatform.Models
{

    public enum EventTypes
    {
        Enviromental,
        Education,
        Social,
        Healthcare,
        Sports
    }

    //Clasa pe care o vom folosi pentru a trimite catre baza de date si a lucra in backend -se pot mapa
    public class EventDto
    {
        public int EventId { get; set; }

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
