using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
using VolunteeringPlatform.DbContexts;
using VolunteeringPlatform.Entities;

namespace Volunteering_Platform.Services
{
    public class EventPhotoRepository : IEventPhotoRepository
    {
        private readonly VolunteeringPlatformContext _context;

        public EventPhotoRepository(VolunteeringPlatformContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<EventPhoto>> GetEventPhotosAsync(int? eventId)
        {
            var eventPhotos = _context.EventPhotos as IQueryable<EventPhoto>;

            if (eventId != null)
            {
                eventPhotos = eventPhotos.Where(e => e.EventId == eventId);
            }

            var collection = await eventPhotos.ToListAsync();

            return collection;
        }

        public async Task<EventPhoto?> GetEventPhotoAsync(Guid photoId)
        {
            return await _context.EventPhotos.Where(e => e.Id == photoId).FirstOrDefaultAsync();
        }

        public async Task AddEventPhotoAsync(EventPhoto data)
        {
            await _context.EventPhotos.AddAsync(data);
        }

        public async Task<bool> DeleteEventPhoto(Guid id)
        {

            var photoToRemove = await _context.EventPhotos.FindAsync(id);

            if (photoToRemove != null)
            {
                // Remove the photo entity from the context
                _context.EventPhotos.Remove(photoToRemove);

                return true;
            }

            return false;

        }

        public async Task<bool> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync() >= 0;
        }

    }
    }
