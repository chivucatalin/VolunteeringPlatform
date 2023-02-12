using AutoMapper;

namespace VolunteeringPlatform.Profiles
{
    //ce mapari dorim sa avem 
    public class EventProfile : Profile
    {
        public EventProfile()
        {
            CreateMap<Volunteering_Platform.Entities.Event, Models.EventDto>();
            CreateMap<Models.EventForCreationDto, Volunteering_Platform.Entities.Event>();
        }
    }
}
