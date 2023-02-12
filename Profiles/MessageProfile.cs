using AutoMapper;

namespace Volunteering_Platform.Profiles
{
    public class MessageProfile:Profile
    {
        public MessageProfile()
        {
            CreateMap<Entities.Message, Models.MessageDto>();
            CreateMap<Models.MessageForCreationDto, Entities.Message>();
        }
    }
}
