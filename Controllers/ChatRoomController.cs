using AutoMapper;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using Volunteering_Platform.Models;
using Volunteering_Platform.Services;
using VolunteeringPlatform.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace VolunteeringPlatform.Controllers
{
    //[EnableCors("CorsPolicy")]
    [ApiController]
    [Route("{controller}")]
    public class ChatRoomController : Controller
    {
        private readonly IChatRoomService _chatRoomService;
        private readonly IUserRepository _repository;
        private readonly IMapper _mapper;
        private readonly DateTime dateTime = new(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc);

        public ChatRoomController(IChatRoomService chatRoomService, IMapper mapper, IUserRepository repository)
        {
            _chatRoomService = chatRoomService;
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
            _mapper = mapper;
        }

        // GET: api/values
        [HttpGet]
        public async Task<IActionResult> Get(string? name)
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

            var chatRooms = (String.IsNullOrEmpty(name)) ?
                 _chatRoomService.GetChatRoomsAsync() : _chatRoomService.GetChatRoomsAsync(name);

            return Ok(chatRooms);
        }

        [HttpGet("{roomId}", Name = "GetRoom")]
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
            var chatRoom = await _chatRoomService.GetChatRoomAsync(roomId);

            if (chatRoom == null) return NotFound();

            return Ok(chatRoom);
        }



        // POST api/values
        [HttpPost]
        public async Task<ActionResult<ChatRoomDto>> Post([FromBody] ChatRoomForCreationDto chatRoom)
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

            if (chatRoom == null) return BadRequest();

            var nameExist = _repository.UsernameExist(chatRoom.Name);

            var usernameExist = _repository.UsernameExist(chatRoom.UserName);

            var chatRoomExist = _chatRoomService.ChatRoomExist(chatRoom.Name, chatRoom.UserName);

            if (await usernameExist == false || await nameExist == false || await chatRoomExist == true) return BadRequest();

            var chatRoomEntity = _mapper.Map<VolunteeringPlatform.Entities.ChatRoom>(chatRoom);
            await _chatRoomService.AddChatRoomAsync(chatRoomEntity);
            await _chatRoomService.SaveChangesAsync();

            var createdChatRoomToReturn =
               _mapper.Map<ChatRoomDto>(chatRoomEntity);

            return CreatedAtRoute("GetRoom",
            new
            {
                roomId = createdChatRoomToReturn.Id
            },
                 createdChatRoomToReturn);
        }
    }
}