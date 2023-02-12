using VolunteeringPlatform;
using VolunteeringPlatform.DbContexts;
using VolunteeringPlatform.Services;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.EntityFrameworkCore;
using Serilog;
using Volunteering_Platform.Services;
using Volunteering_Platform.Hubs;

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

builder.Services.AddSignalR();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSingleton<FileExtensionContentTypeProvider>();
builder.Services.AddTransient<IMailService, MailService>();


builder.Services.AddDbContext<VolunteeringPlatformContext>(
    dbContextOptions => dbContextOptions.UseSqlite(
        builder.Configuration["ConnectionStrings:CityInfoDBConnectionString"]));


builder.Services.AddScoped<IEventRepository, EventRepository>();

builder.Services.AddScoped<IChatRoomService, ChatRoomService>();
builder.Services.AddScoped<IMessageService, MessageService>();

builder.Services.AddScoped<IUserRepository, UserRepository>();

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
app.UseRouting();


/*app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");*/

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
    endpoints.MapHub<ChatHub>("/chathub");
});

app.MapFallbackToFile("index.html"); ;

app.Run();
