using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volunteering_Platform.Entities;

namespace VolunteeringPlatform.Services
{
    public interface IMessageService
    {
        Task<List<Message>> GetMessagesAsync();
        Task<List<Message>> GetMessagesForChatRoomAsync(Guid roomId);

        Task<Message> GetMessageFromChatRoomAsync(Guid roomId,Guid messageId);
        Task<bool> AddMessageToRoomAsync(Guid roomId, Message message);

        Task<bool> SaveChangesAsync();
    }
}
