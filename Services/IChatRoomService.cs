using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using VolunteeringPlatform.Entities;

namespace VolunteeringPlatform.Services
{
    public interface IChatRoomService
    {
        Task<List<ChatRoom>> GetChatRoomsAsync();

        Task<ChatRoom> GetChatRoomAsync(Guid roomId);
        Task<bool> AddChatRoomAsync(ChatRoom newChatRoom);

        Task<bool> SaveChangesAsync();
    }
}
