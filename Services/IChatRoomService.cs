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
        Task<List<ChatRoom>> GetChatRoomsAsync(String username);
        Task<bool> AddChatRoomAsync(ChatRoom newChatRoom);
        Task<bool> ChatRoomExist(String name, String UserName);
        Task<bool> SaveChangesAsync();
    }
}
