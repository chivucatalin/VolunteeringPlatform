using AutoMapper;

namespace Volunteering_Platform.Profiles
{
    public class EventPhotoProfile: Profile
    {
        public EventPhotoProfile()
        {
            CreateMap<VolunteeringPlatform.Entities.EventPhoto, Models.EventPhotoDto>();
            CreateMap<Models.EventPhotoForCreationDto, VolunteeringPlatform.Entities.EventPhoto>();
        }
    }
}
