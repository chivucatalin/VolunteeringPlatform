using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using VolunteeringPlatform.Models;
using VolunteeringPlatform.Services;
using Microsoft.AspNetCore.Cors;
using Volunteering_Platform.Models;
using AutoMapper;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;

namespace VolunteeringPlatform.Controllers
{
    //[EnableCors("CorsPolicy")]
    [ApiController]
    [Route("[controller]")]
    public class MessageController : Controller
    {
        private readonly IMessageService _messageService;
        private readonly IMapper _mapper;
        private readonly DateTime dateTime = new(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc);

        public MessageController(IMessageService messageService,IMapper mapper)
        {
            _messageService = messageService;
            _mapper = mapper;
        }

        // GET: api/values
        [HttpGet]
        public async Task<IActionResult> Get()
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

            var messagesForRoom = await _messageService.GetMessagesAsync();

            return Ok(messagesForRoom);
        }

        // GET values/5
        [HttpGet("{roomId}")]
        public async Task<IActionResult> Get(Guid roomId)
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

            if (roomId == Guid.Empty)
            {
                return NotFound();
            }

            var messagesForRoom = await _messageService.GetMessagesForChatRoomAsync(roomId);

            return Ok(messagesForRoom);
        }

        [HttpGet("{roomId}/{messageId}", Name ="GetMessage")]

        public async Task<IActionResult> Get(Guid roomId,Guid messageId)
        {
            var Entity = await _messageService.GetMessageFromChatRoomAsync(roomId,messageId);
            if (Entity == null) return NotFound();
            return Ok(_mapper.Map<MessageDto>(Entity));

         
        }

        // POST api/values
        [HttpPost]
        public async Task<ActionResult<MessageDto>> Post([FromBody] MessageForCreationDto message)
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

            var messageEntity = _mapper.Map<VolunteeringPlatform.Entities.Message>(message);
            await _messageService.AddMessageToRoomAsync(message.RoomId, messageEntity);
            await _messageService.SaveChangesAsync();

            var createdMessageToReturn =
               _mapper.Map<MessageDto>(messageEntity);

            return CreatedAtRoute("GetMessage",
            new
            {
                roomId= createdMessageToReturn.RoomId
                ,messageId = createdMessageToReturn.Id
            },
                 createdMessageToReturn);
        }
    }
}