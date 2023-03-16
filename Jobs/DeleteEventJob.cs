using Microsoft.EntityFrameworkCore;
using Quartz;
using VolunteeringPlatform.DbContexts;

namespace Volunteering_Platform.Jobs
{
    [DisallowConcurrentExecution]
    public class DeleteEventJob : IJob
    {
        private readonly VolunteeringPlatformContext _database;
        private readonly ILogger<DeleteEventJob> _logger;
        public DeleteEventJob(ILogger<DeleteEventJob> logger,VolunteeringPlatformContext database)
        {
            _database = database;
            _logger = logger;
        }
        public async Task Execute(IJobExecutionContext context)
        {
             var currentDate = DateTime.Now;

             // Query the database to get all events with eventDate before current date
             var eventsToDelete = _database.Events.Where(e => e.EventDate < currentDate);

             // Delete all the events returned by the query
             _database.Events.RemoveRange(eventsToDelete);
             _logger.LogInformation("Deleted older events !");
             await _database.SaveChangesAsync();

        }
    }
}
