using Microsoft.EntityFrameworkCore;
using VolunteeringPlatform.Entities;
using VolunteeringPlatform.DbContexts;

namespace VolunteeringPlatform.Services
{
    public class MessageService : IMessageService
    {
        private readonly VolunteeringPlatformContext _context;

        public MessageService(VolunteeringPlatformContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<List<Message>> GetMessagesAsync()
        {
            var messages = await _context.Messages.ToListAsync<Message>();

            return messages;
        }

        public async Task<List<Message>> GetMessagesForChatRoomAsync(Guid roomId)
        {
            var messagesForRoom = await _context.Messages
                                      .Where(m => m.RoomId == roomId)
                                               .ToListAsync<Message>();

            return messagesForRoom;
        }

        public async Task<Message> GetMessageFromChatRoomAsync(Guid roomId, Guid messageId)
        {
            var message= await _context.Messages.Where(m => m.RoomId == roomId && m.Id == messageId).FirstOrDefaultAsync();

            return message;

        }

        public async Task<bool> AddMessageToRoomAsync(Guid roomId, Message message)
        {
            message.Id = Guid.NewGuid();
            message.RoomId = roomId;
            message.PostedAt = DateTimeOffset.Now;

            _context.Messages.Add(message);

            var saveResults = await _context.SaveChangesAsync();

            return saveResults > 0;
        }

        public async Task<bool> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync() >= 0;
        }
    }
}
