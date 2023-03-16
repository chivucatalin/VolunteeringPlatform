using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Runtime.InteropServices;
using VolunteeringPlatform.DbContexts;
using VolunteeringPlatform.Entities;
using VolunteeringPlatform.Services;

namespace Volunteering_Platform.Services
{
    public class JoinedEventRepository : IJoinedEventRepository
    {
        private readonly VolunteeringPlatformContext _context;
        private readonly IEventRepository _eventRepository;

        public JoinedEventRepository(VolunteeringPlatformContext context, IEventRepository eventRepository)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _eventRepository = eventRepository ?? throw new ArgumentNullException(nameof(eventRepository));
        }

        public async Task<IEnumerable<JoinedEvent>?> GetJoinedEventsIdAsync(int id)
        {
            var collection = _context.JoinedEvents as IQueryable<JoinedEvent>;

            return await collection.Where(a => a.EventId == id).ToListAsync();
         
        }

        public async Task<IEnumerable<JoinedEvent>?> GetJoinedEventsUsernameAsync(string userName)
        {
            var collection = _context.JoinedEvents as IQueryable<JoinedEvent>;

            return await collection.Where(a => a.Username.Equals(userName)).ToListAsync();
        }
        public async Task<JoinedEvent?> GetJoinedEventAsync(string userName,int eventId)
        {

            return await _context.JoinedEvents.Where(c => (c.Username == userName && c.EventId == eventId) ).FirstOrDefaultAsync();

        }
        public async Task AddJoinedEventAsync (JoinedEvent data)
        {
            await _context.JoinedEvents.AddAsync(data);
            _eventRepository.ChangeNoVolunteers(data.EventId, false);
        }

        public async Task<bool> DeleteJoinedEvent (JoinedEvent data)
        {
            
            _context.Remove(data);

            _eventRepository.ChangeNoVolunteers(data.EventId, true);

            return true;

        }
        public async Task<bool> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync() >= 0;
        }
    }
}
