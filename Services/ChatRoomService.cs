using Microsoft.AspNet.SignalR.Messaging;
using Microsoft.EntityFrameworkCore;
using VolunteeringPlatform.Entities;
using VolunteeringPlatform.DbContexts;

namespace VolunteeringPlatform.Services
{
    public class ChatRoomService : IChatRoomService
    {
        private readonly VolunteeringPlatformContext _context;

        public ChatRoomService(VolunteeringPlatformContext context)
        {
            _context = context;
        }

        public async Task<List<ChatRoom>> GetChatRoomsAsync()
        {
            var chatRooms = await _context.ChatRooms.ToListAsync<ChatRoom>();

            return chatRooms;
        }

        public async Task<List<ChatRoom>> GetChatRoomsAsync(string username)
        {
            var chatRooms = await _context.ChatRooms.Where(a => (a.Name == username || a.UserName == username)).ToListAsync<ChatRoom>();

            return chatRooms;
        }

        public async Task<ChatRoom> GetChatRoomAsync(Guid roomId)
        {
            var chatRoom = await _context.ChatRooms.Where(m => m.Id == roomId ).FirstOrDefaultAsync();

            return chatRoom;
        }
        public async Task<bool> AddChatRoomAsync(ChatRoom chatRoom)
        {
            chatRoom.Id = Guid.NewGuid();

            _context.ChatRooms.Add(chatRoom);

            var saveResults = await _context.SaveChangesAsync();

            return saveResults > 0;
        }

        public async Task<bool> ChatRoomExist(string Name, string UserName)
        {

            if (await _context.ChatRooms.Where(a => (a.Name == Name && a.UserName == UserName)).FirstOrDefaultAsync() != default)
                return true;

            if (await _context.ChatRooms.Where(a => (a.Name == UserName && a.UserName == Name)).FirstOrDefaultAsync() != default)
                return true;

            return false;


        }

        public async Task<bool> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync() >= 0;
        }
    }
}