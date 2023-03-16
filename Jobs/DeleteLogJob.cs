using Quartz;

namespace Volunteering_Platform.Jobs
{
    [DisallowConcurrentExecution]
    public class DeleteLogJob : IJob
    {

        private readonly ILogger<DeleteLogJob> _logger;

        public DeleteLogJob(ILogger<DeleteLogJob> logger)
        {
            _logger = logger;
        }
        public  Task Execute(IJobExecutionContext context)
        {
            var lastWeekDate = DateTime.Now.AddDays(-7);
            string[] fileNames = Directory.GetFiles(Path.Combine(Directory.GetCurrentDirectory(), "logs"));
            
            foreach (string fileName in fileNames)
             {
                 DateTime createdAt = DateTime.ParseExact(fileName.Substring(4, 8), "yyyyMMdd", null);

                 if(createdAt<lastWeekDate) File.Delete(fileName);

             }
            _logger.LogInformation("Deleted FILES-DO NOT USE BEFORE YOU SAVE IT TO GITHUB");

            return Task.CompletedTask;

        }
    }
}
