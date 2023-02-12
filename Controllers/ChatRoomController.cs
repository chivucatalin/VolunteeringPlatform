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

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace VolunteeringPlatform.Controllers
{
    [EnableCors("CorsPolicy")]
    [Route("[controller]")]
    public class ChatRoomController : Controller
    {
        private readonly IChatRoomService _chatRoomService;
        private readonly IMapper _mapper;

        public ChatRoomController(IChatRoomService chatRoomService,IMapper mapper)
        {
            _chatRoomService = chatRoomService;
            _mapper = mapper;
        }

        // GET: api/values
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var chatRooms = await _chatRoomService.GetChatRoomsAsync();

            return Ok(chatRooms);
        }

        [HttpGet("{roomId",Name ="GetRoom")]
        public async Task<IActionResult> Get(Guid roomId)
        {
            var chatRoom = await _chatRoomService.GetChatRoomAsync(roomId);

            if (chatRoom == null) return NotFound();

            return Ok(chatRoom);
        }

        // POST api/values
        [HttpPost]
        public async Task<ActionResult<ChatRoomDto>>  Post([FromBody]ChatRoomForCreationDto chatRoom)
        {
            var chatRoomEntity = _mapper.Map<Volunteering_Platform.Entities.ChatRoom>(chatRoom);
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