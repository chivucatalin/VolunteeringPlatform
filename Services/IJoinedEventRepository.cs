using VolunteeringPlatform.Entities;

namespace VolunteeringPlatform.Services
{
    public interface IJoinedEventRepository
    {
        Task<IEnumerable<JoinedEvent>?> GetJoinedEventsIdAsync(int id);
        Task<IEnumerable<JoinedEvent>?> GetJoinedEventsUsernameAsync(string userName);
        Task<JoinedEvent?> GetJoinedEventAsync(string userName, int eventId);
        Task AddJoinedEventAsync(JoinedEvent data);
        Task<bool> DeleteJoinedEvent(JoinedEvent data);
        Task<bool> SaveChangesAsync();

    }
}
