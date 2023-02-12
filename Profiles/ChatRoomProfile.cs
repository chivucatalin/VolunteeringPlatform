using AutoMapper;

namespace Volunteering_Platform.Profiles
{
    public class ChatRoomProfile:Profile
    {
        public ChatRoomProfile()
        {
            CreateMap<Entities.ChatRoom, Models.ChatRoomDto>();
            CreateMap<Models.ChatRoomForCreationDto, Entities.ChatRoom>();

        }
    }
}
