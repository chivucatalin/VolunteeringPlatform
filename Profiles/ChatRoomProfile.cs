using AutoMapper;

namespace Volunteering_Platform.Profiles
{
    public class ChatRoomProfile:Profile
    {
        public ChatRoomProfile()
        {
            CreateMap<VolunteeringPlatform.Entities.ChatRoom, Models.ChatRoomDto>();
            CreateMap<Models.ChatRoomForCreationDto, VolunteeringPlatform.Entities.ChatRoom>();

        }
    }
}
