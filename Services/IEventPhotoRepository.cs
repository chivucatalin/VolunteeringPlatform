using VolunteeringPlatform.Entities;

namespace Volunteering_Platform.Services
{
    public interface IEventPhotoRepository
    {
        Task<IEnumerable<EventPhoto>> GetEventPhotosAsync(int? eventId);
        Task<EventPhoto?> GetEventPhotoAsync(Guid eventPhotoId);

        Task AddEventPhotoAsync(EventPhoto data);

        Task<bool> DeleteEventPhoto(Guid id);
        Task<bool> SaveChangesAsync();

    }
}
