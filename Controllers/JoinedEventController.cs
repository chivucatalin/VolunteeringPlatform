using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System;
using VolunteeringPlatform.Services;
using VolunteeringPlatform.Models;
using Volunteering_Platform.Models;
using VolunteeringPlatform.Entities;
using Volunteering_Platform.Services;
using VolunteeringPlatform.DbContexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using System.IO;

namespace VolunteeringPlatform.Controllers
{
    [ApiController]
    [Route("{controller}")]
    
    public class JoinedEventController:ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IJoinedEventRepository _repository;
     
        private readonly DateTime dateTime = new(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc);

        public JoinedEventController(IMapper mapper, IJoinedEventRepository repository)
        {
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
      
        }

        [HttpGet("{userName}/{eventId}", Name = "GetJoinedEvent")]
        public async Task<IActionResult> Get(string userName,int eventId)
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

            var entity = await _repository.GetJoinedEventAsync(userName, eventId);

            if (entity == null) return NoContent();

            return Ok(_mapper.Map<JoinedEventDto>(entity));

        }

        [HttpGet("ovload/{id}")]

        public async Task<ActionResult<IEnumerable<JoinedEventDto>>> Get(int id)
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

            var entities = await _repository.GetJoinedEventsIdAsync(id);

            return Ok(_mapper.Map<IEnumerable<JoinedEventDto>>(entities));

        }

        [HttpGet("{userName}")]
        public async Task<ActionResult<IEnumerable<JoinedEventDto>>> Get(string userName)
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

            var entities = await _repository.GetJoinedEventsUsernameAsync(userName);

            return Ok(_mapper.Map<IEnumerable<JoinedEventDto>>(entities));


        }

        [HttpPost]

        public async Task<ActionResult<JoinedEventDto>> CreateJoinedEvent(JoinedEventDto joinedEvent)
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

            var joinedEventEntity = _mapper.Map<JoinedEvent>(joinedEvent);

            await _repository.AddJoinedEventAsync(joinedEventEntity);
            await _repository.SaveChangesAsync();

            return CreatedAtRoute("GetJoinedEvent", new
            {
               userName=joinedEvent.Username,
               eventId=joinedEvent.EventId,
            },
                 joinedEvent);

        }

        
        [HttpDelete]
        public async Task<ActionResult> DeleteJoinedEvent(JoinedEvent data)
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



            if (await _repository.DeleteJoinedEvent(data))
            {
                await _repository.SaveChangesAsync();

                return Ok();
            }
            else return NotFound();


        }



    }
}
