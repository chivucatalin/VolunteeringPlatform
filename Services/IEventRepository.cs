using VolunteeringPlatform.Entities;

namespace VolunteeringPlatform.Services
{
    //Creeam o clasa cu services pe care o injectez in controller care se ocupa de a lua evenimentele din baza de data,sa le stearga,etc
    public interface IEventRepository
    {
        Task<IEnumerable<Event>> GetEventsAsync();
        Task<(IEnumerable<Event>, PaginationMetadata)> GetEventsAsync(
            string? name,
            string? searchQuery,
            int? eventType,
            string? address,
            string? fromDate,
            string? toDate,
            int pageNumber, int pageSize);
        Task<Event?> GetEventAsync(int cityId);

        Task AddEventAsync(Event newEvent);

        void DeleteEvent(Event eventEntity);

        Task<bool> SaveChangesAsync();
    }
}
