using AutoMapper;

namespace VolunteeringPlatform.Profiles
{
    //ce mapari dorim sa avem 
    public class EventProfile : Profile
    {
        public EventProfile()
        {
            CreateMap<VolunteeringPlatform.Entities.Event, Models.EventDto>();
            CreateMap<Models.EventForCreationDto, VolunteeringPlatform.Entities.Event>();
        }
    }
}
