using Microsoft.AspNetCore.SignalR;                                         
using VolunteeringPlatform.Entities;
using Volunteering_Platform.Models;
using Volunteering_Platform.Services;
using VolunteeringPlatform.Services;
using AutoMapper;
using VolunteeringPlatform.Models;
using Microsoft.AspNet.SignalR.Messaging;

namespace Volunteering_Platform.Hubs
{
    public class ChatHub : Hub
    {
        private readonly IChatRoomService _chatRoomService;
        private readonly IUserRepository _repository;
        private readonly IMapper _mapper;
        private readonly IMessageService _messageService;
        public int UsersOnline;

        public ChatHub(IChatRoomService chatRoomService, IMessageService messageService, IUserRepository repository , IMapper mapper)
        {
            _chatRoomService = chatRoomService;
            _messageService = messageService;
            _repository = repository;
            _mapper = mapper;
        }

        public async Task AddChatRoom(string name,string username)
        {
            ChatRoomForCreationDto chatRoom = new ChatRoomForCreationDto()
            {
                Name = name,
                UserName = username
            };
       
            var nameExist = _repository.UsernameExist(chatRoom.Name);

            var usernameExist = _repository.UsernameExist(chatRoom.UserName);

            var chatRoomExist = _chatRoomService.ChatRoomExist(chatRoom.Name,chatRoom.UserName);

            if (await usernameExist == false || await nameExist == false || await chatRoomExist == true) return ;

            var chatRoomEntity = _mapper.Map<VolunteeringPlatform.Entities.ChatRoom>(chatRoom);
            await _chatRoomService.AddChatRoomAsync(chatRoomEntity);
            await _chatRoomService.SaveChangesAsync();

            await Clients.All.SendAsync("ReceiveRoom", chatRoomEntity);
        }

        public async Task AddMessage(Guid roomId , string contents,string name)
        {
            MessageForCreationDto message = new MessageForCreationDto()
            {
                RoomId = roomId,
                Contents = contents,
                UserName = name
            };

            var nameExist = _repository.UsernameExist(message.UserName);

            if (await nameExist == false) return ;

            var messageEntity = _mapper.Map<VolunteeringPlatform.Entities.Message>(message);
            await _messageService.AddMessageToRoomAsync(message.RoomId, messageEntity);
            await _messageService.SaveChangesAsync();

            await Clients.All.SendAsync("ReceiveMessage", message);


        }

        public override async Task OnConnectedAsync()
        {
            UsersOnline++;
            await Groups.AddToGroupAsync(Context.ConnectionId, "SignalR Users");
            await base.OnConnectedAsync();
        }

        public async Task<List<ChatRoom>> GetRooms(string name)
        {
            var chatRooms = (String.IsNullOrEmpty(name)) ?
                _chatRoomService.GetChatRoomsAsync() : _chatRoomService.GetChatRoomsAsync(name);

            return await chatRooms;

        }

        public async Task<List<VolunteeringPlatform.Entities.Message>> ClickedRoom(Guid roomId)
        {
            var messagesForRoom = _messageService.GetMessagesForChatRoomAsync(roomId);

            return await messagesForRoom;

        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            UsersOnline--;
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, "SignalR Users");
            await base.OnDisconnectedAsync(exception);
        }
    }
}
