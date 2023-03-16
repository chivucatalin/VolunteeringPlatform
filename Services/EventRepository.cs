using VolunteeringPlatform.DbContexts;
using VolunteeringPlatform.Entities;
using Microsoft.EntityFrameworkCore;
using System.Globalization;
using System.Runtime.CompilerServices;

namespace VolunteeringPlatform.Services
{
    public class EventRepository : IEventRepository
    {
        private readonly VolunteeringPlatformContext _context;

        public EventRepository(VolunteeringPlatformContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<IEnumerable<Event>> GetEventsAsync()
        {
            return await _context.Events.OrderBy(c => c.EventName).ToListAsync(); 
        }
        public async Task<(IEnumerable<Event>, PaginationMetadata)> GetEventsAsync(
            string? name,
            string? searchQuery,
            int? eventType,
            string? address,
            string? fromDate,
            string? toDate,
            int pageNumber, int pageSize,
            bool onlyJoined,
            string userName)
        {
            // collection to start from
            var collection = _context.Events as IQueryable<Event>;

            if (!string.IsNullOrWhiteSpace(name))
            {
                name = name.Trim();
                collection = collection.Where(c => c.EventName.ToLower().Contains(name));
            }

            if (!string.IsNullOrWhiteSpace(searchQuery))
            {
                searchQuery = searchQuery.Trim();
                collection = collection.Where(a => a.EventName.ToLower().Contains(searchQuery)
                    || (a.EventDescription != null && a.EventDescription.ToLower().Contains(searchQuery)));
            }

            if (!string.IsNullOrWhiteSpace(address))
            {
                address = address.Trim();
                collection = collection.Where(a => a.EventCity.ToLower().Contains(address)
                    || ( a.EventAddress.ToLower().Contains(address)));
            }

            if (eventType != null)
            {
                collection = collection.Where(a => (int) a.EventType==eventType);
            }

            if (!string.IsNullOrWhiteSpace(fromDate))
            {
                var _fromDate = DateTime.Parse(fromDate,  CultureInfo.InvariantCulture);
                Console.WriteLine(_fromDate);
                collection = collection.Where(a => a.EventDate >= _fromDate );
            }

            if (!string.IsNullOrWhiteSpace(toDate))
            {
                var _toDate = DateTime.Parse(toDate,  CultureInfo.InvariantCulture);
                collection = collection.Where(a => a.EventDate <= _toDate);
            }

            if (onlyJoined)
            {
                var joinedEvents = _context.JoinedEvents as IQueryable<JoinedEvent>;
                joinedEvents = joinedEvents.Where(a => a.Username.Equals(userName));

                collection = from obj in collection
                             join evt in joinedEvents on obj.EventId equals evt.EventId
                             select obj;
            }

            var totalItemCount = await collection.CountAsync();

            var paginationMetadata = new PaginationMetadata(
                totalItemCount, pageSize, pageNumber);

            var collectionToReturn = await collection.OrderBy(c => c.EventName)
                .Skip(pageSize * (pageNumber - 1))
                .Take(pageSize)
                .ToListAsync();

            return (collectionToReturn, paginationMetadata);
        }

        public async Task<Event?> GetEventAsync(int eventId)
        {
             return await _context.Events.Where(c => c.EventId == eventId).FirstOrDefaultAsync();
        }

        public async Task AddEventAsync(Event newEvent)
        {
            await _context.Events.AddAsync(newEvent);
        }

        public async void ChangeNoVolunteers(int eventId,bool type) // 1- adauga 0 -sterge
        {

            var eventEntity=await _context.Events.Where(c => c.EventId == eventId).FirstOrDefaultAsync();
            if( eventEntity != null)
            {
               eventEntity.EventNoOfVolunteers+= type ? 1 : -1;

                await SaveChangesAsync();
            }

        }

        public async Task<bool> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync() >= 0;
        }
        public void DeleteEvent(Event eventEntity)
        {
            _context.Events.Remove(eventEntity);
        }
    }
}
