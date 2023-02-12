using AutoMapper;
using Volunteering_Platform.Entities;
using VolunteeringPlatform.Models;
using VolunteeringPlatform.Services;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.IO;


//HTTP Requests pentru Evenimente

namespace VolunteeringPlatform.Controllers
{
    [ApiController]
    [Route("{controller}")]
    public class EventsController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IMailService _mailService;
        private readonly IEventRepository _repository;
        private readonly DateTime dateTime =new (1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc);
        const int maxEvents = 20;
        public EventsController(IEventRepository repository,
            IMapper mapper , IMailService mailService)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));

            _mailService = mailService ?? throw new ArgumentNullException(nameof(mailService));

            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<EventDto>>> GetEvents(
            string? name,
            string? searchQuery,
            int? eventType,
            string? address,
            string? fromDate,
            string? toDate,
            int pageNumber = 1, int pageSize = 4)
        {
            var stream = Request.Headers["JWT-Token"];

            if (stream.IsNullOrEmpty())
            {
                return Unauthorized();
            }

            var handler = new JwtSecurityTokenHandler();
            var jsonToken = handler.ReadToken(stream);

            if (jsonToken is not JwtSecurityToken tokenS)
            {
                return Unauthorized();
            }

            var jti = tokenS.Claims.First(claim => claim.Type == "exp").Value;
   
            var timeReq = dateTime.AddSeconds(Int64.Parse(jti)).ToLocalTime();

            if(new DateTime() > timeReq)
            {
                return Forbid();
            }

            if (pageSize > maxEvents)
            {
                pageSize = maxEvents;
            }

            var (eventEntities, paginationMetadata) = await _repository
                .GetEventsAsync(name, searchQuery, eventType, address, fromDate,toDate, pageNumber, pageSize);

            Response.Headers.Add("Pagination",
                JsonSerializer.Serialize(paginationMetadata));

            return Ok(_mapper.Map<IEnumerable<EventDto>>(eventEntities));
        }

        [HttpGet("{eventId}", Name = "GetEvent")]
        public async Task<IActionResult> GetEvent(int eventId)
        {
            var stream = Request.Headers["JWT-Token"];

            if(stream.IsNullOrEmpty())
            {
                return Unauthorized();
            }

            var handler = new JwtSecurityTokenHandler();
            var jsonToken = handler.ReadToken(stream);

            if (jsonToken is not JwtSecurityToken tokenS)
            {
                return Unauthorized();
            }

            var jti = tokenS.Claims.First(claim => claim.Type == "exp").Value;

            var timeReq = dateTime.AddSeconds(Int64.Parse(jti)).ToLocalTime();

            if (new DateTime() > timeReq)
            {
                return Forbid();
            }

            var eventEntity = await _repository.GetEventAsync(eventId);
            if (eventEntity == null) return NotFound();
            return Ok(_mapper.Map<EventDto>(eventEntity));
        }

        //Iau obiectul din body event for creation ce nu are id pe care il mappez la entitatea Event care GENEREAZA AUTOMAT id-ul
       
        [HttpPost]
        public async Task<ActionResult<EventDto>> CreateEvent(
            EventForCreationDto newEvent)
        {
            var stream = Request.Headers["JWT-Token"];

            if (stream.IsNullOrEmpty())
            {
                return Unauthorized();
            }

            var handler = new JwtSecurityTokenHandler();
            var jsonToken = handler.ReadToken(stream);

            if (jsonToken is not JwtSecurityToken tokenS)
            {
                return Unauthorized();
            }

            var jti = tokenS.Claims.First(claim => claim.Type == "exp").Value;

            var timeReq = dateTime.AddSeconds(Int64.Parse(jti)).ToLocalTime();

            if (new DateTime() > timeReq)
            {
                return Forbid();
            }

            var eventEntity = _mapper.Map<Volunteering_Platform.Entities.Event>(newEvent);
            await _repository.AddEventAsync(eventEntity);
            await _repository.SaveChangesAsync();
            var createdEventToReturn =
               _mapper.Map<Models.EventDto>(eventEntity);

            return CreatedAtRoute("GetEvent",
            new
            {
                     eventId = createdEventToReturn.EventId
            },
                 createdEventToReturn);
        }

        //Sterge evenimentul si ii trimitem detalli pe e-mail asociatiei

        [HttpDelete("{eventId}")]
        public async Task<ActionResult> DeleteEvent(
            int eventId)
        {
            var stream = Request.Headers["JWT-Token"];

            if (stream.IsNullOrEmpty())
            {
                return Unauthorized();
            }

            var handler = new JwtSecurityTokenHandler();
            var jsonToken = handler.ReadToken(stream);

            if (jsonToken is not JwtSecurityToken tokenS)
            {
                return Unauthorized();
            }

            var jti = tokenS.Claims.First(claim => claim.Type == "exp").Value;
            var admin = tokenS.Claims.First(claim => claim.Type == "admin").Value;

            var timeReq = dateTime.AddSeconds(Int64.Parse(jti)).ToLocalTime();

            if (new DateTime() > timeReq || Boolean.Parse(admin))
            {
                return Forbid();
            }


            var eventEntity = await _repository.GetEventAsync(eventId);
            if (eventEntity == null)
            {
                return NotFound();
            }

            _repository.DeleteEvent(eventEntity);

            await _repository.SaveChangesAsync();

            /*_mailService.Send("Viitor",
                "S-a sters ,ne ocupam mai tarziu !"); // mesaj la creator + asociatie ca s-a sters
            */

            return NoContent();
        }
    }

}
