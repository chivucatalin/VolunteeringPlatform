using AutoMapper;

namespace VolunteeringPlatform.Profiles
{
    public class JoinedEventProfile : Profile
    {
        public JoinedEventProfile()
        {
            CreateMap<Entities.JoinedEvent, Volunteering_Platform.Models.JoinedEventDto>();

            CreateMap<Volunteering_Platform.Models.JoinedEventDto, Entities.JoinedEvent>();

        }

    }
}
