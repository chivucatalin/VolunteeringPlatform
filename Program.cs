using VolunteeringPlatform;
using VolunteeringPlatform.DbContexts;
using VolunteeringPlatform.Services;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.EntityFrameworkCore;
using Serilog;
using Volunteering_Platform.Services;
using Volunteering_Platform.Hubs;
using Microsoft.AspNetCore.Mvc.Formatters;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Quartz;
using Quartz.Impl;
using Volunteering_Platform;
using Hangfire;
using Volunteering_Platform.Jobs;

Log.Logger = new LoggerConfiguration()
    .MinimumLevel.Debug()
    .WriteTo.Console()
    .WriteTo.File("logs/info.txt", rollingInterval: RollingInterval.Day)
    .CreateLogger();

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.



builder.Host.UseSerilog();
builder.Services.AddControllers(options =>
{
    options.ReturnHttpNotAcceptable = true;
}).AddNewtonsoftJson()
.AddXmlDataContractSerializerFormatters();

builder.Services.AddQuartz(q =>
{
    // Use a Scoped container to create jobs. I'll touch on this later
    q.UseMicrosoftDependencyInjectionScopedJobFactory();

    var jobKey = new JobKey("DeleteEventJob");

    var jobKey2 = new JobKey("DeleteLogJob");

    // Register the job with the DI container
    q.AddJob<DeleteEventJob>(opts => opts.WithIdentity(jobKey));

    q.AddJob<DeleteLogJob>(opts => opts.WithIdentity(jobKey2));

    // Create a trigger for the job
    q.AddTrigger(opts => opts
        .ForJob(jobKey) // link to the HelloWorldJob
        .WithIdentity("DeleteEventJob-trigger") // give the trigger a unique name
        .WithCronSchedule("0 30 22 1/1 * ? *")); // run every Sunday at 22:30 

    q.AddTrigger(opts => opts
        .ForJob(jobKey2) // link to the HelloWorldJob
        .WithIdentity("DeleteLogJob-trigger") // give the trigger a unique name
        .WithCronSchedule("0 30 22 1/1 * ? *")); // run every Monday at 8 Am

});
builder.Services.AddQuartzHostedService(opt =>
{
    opt.WaitForJobsToComplete = true;
});

ISchedulerFactory schedulerFactory = new StdSchedulerFactory();
IScheduler scheduler = await schedulerFactory.GetScheduler();

builder.Services.AddSignalR();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSingleton(scheduler);
builder.Services.AddHostedService<CustomQuartzHostedService>();
builder.Services.AddSingleton<FileExtensionContentTypeProvider>();
builder.Services.AddTransient<IMailService, MailService>();


builder.Services.AddDbContext<VolunteeringPlatformContext>(
    dbContextOptions => dbContextOptions.UseSqlite(
        builder.Configuration["ConnectionStrings:CityInfoDBConnectionString"]));


builder.Services.AddScoped<IEventRepository, EventRepository>();
builder.Services.AddScoped<IChatRoomService, ChatRoomService>();
builder.Services.AddScoped<IMessageService, MessageService>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IEventPhotoRepository, EventPhotoRepository>();
builder.Services.AddScoped<IJoinedEventRepository, JoinedEventRepository>();

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseCors(builder =>
{
    builder.WithOrigins("https://localhost:44413")
        .AllowAnyHeader()
        .WithMethods("GET", "POST" , "DELETE")
        .AllowCredentials();
});

app.UseRouting();


/*app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");*/

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
    endpoints.MapHub<ChatHub>("/chathub");
});



app.MapFallbackToFile("index.html");


app.Run();
