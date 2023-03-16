using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System;
using Volunteering_Platform.Models;
using Volunteering_Platform.Services;
using VolunteeringPlatform.Models;
using VolunteeringPlatform.Services;
using Org.BouncyCastle.Asn1.Ocsp;

namespace Volunteering_Platform.Controllers
{

    [ApiController]
    [Route("{controller}")]
    public class EventPhotoController: ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IEventPhotoRepository _repository;
        private readonly DateTime dateTime = new(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc);

        public EventPhotoController(IMapper mapper, IEventPhotoRepository repository)
        {
            _mapper = mapper;
            _repository = repository;
        }

        [HttpGet]

        public async Task<ActionResult<IEnumerable<EventPhotoDto>>> GetEventPhotos(int? id)
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

            var eventPhotos = await _repository.GetEventPhotosAsync(id);

            return Ok(_mapper.Map<IEnumerable<EventPhotoDto>>(eventPhotos));
        }

        [HttpGet("{photoId}",Name ="GetPhoto")]

        public async Task<ActionResult<IEnumerable<EventPhotoDto>>> GetEventPhoto(Guid photoId)
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

            var eventPhoto = await _repository.GetEventPhotoAsync(photoId);

            return Ok(_mapper.Map<EventPhotoDto>(eventPhoto));
        }

        [HttpPost("{eventId}/{description}")]
        public async Task<ActionResult<EventDto>> CreatePhoto(int eventId,string description
            ,[FromForm] IFormFile picture)
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
            if(picture == null || picture.Length == 0)
            {
                throw new ArgumentException("Picture cannot be null or empty");
            }

            using var memoryStream = new MemoryStream();
            await picture.CopyToAsync(memoryStream);

            var data=memoryStream.ToArray();

            var newEvent = new EventPhotoForCreationDto()
            {
                EventId = eventId,
                PhotoDescription = description,
                PhotoData = data
            };

            var eventPhotoEntity = _mapper.Map<VolunteeringPlatform.Entities.EventPhoto>(newEvent);
            await _repository.AddEventPhotoAsync(eventPhotoEntity);
            await _repository.SaveChangesAsync();
            var createdEventToReturn =
               _mapper.Map<Models.EventPhotoDto>(eventPhotoEntity);

            return CreatedAtRoute("GetPhoto",
            new
            {
                photoId = createdEventToReturn.Id
            },
                 createdEventToReturn);
        }

        [HttpDelete("{id}")]

        public async Task<ActionResult> DeletePhoto(Guid id)
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

            if (await _repository.DeleteEventPhoto(id))
            {
                await _repository.SaveChangesAsync();

                return Ok();
            }
            else return NotFound();





        }
    }
}
