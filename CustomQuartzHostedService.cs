using Quartz;

namespace Volunteering_Platform
{
    public class CustomQuartzHostedService : IHostedService
    {
        private readonly IScheduler _scheduler;
        public CustomQuartzHostedService(IScheduler scheduler)
        {
            _scheduler = scheduler ?? throw new ArgumentNullException(nameof(scheduler));
        }
        public async Task StartAsync(CancellationToken cancellationToken)
        {
            await _scheduler.Start(cancellationToken);
        }
        public async Task StopAsync(CancellationToken cancellationToken)
        {
            await _scheduler.Shutdown(cancellationToken);
        }
    }
}
