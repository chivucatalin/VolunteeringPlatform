using AutoMapper;

namespace Volunteering_Platform.Profiles
{
    public class UserProfile : Profile
    {

        public UserProfile() { 
        CreateMap<VolunteeringPlatform.Entities.User, VolunteeringPlatform.Models.UserDto>();

        CreateMap<VolunteeringPlatform.Models.UserForCreationDto, VolunteeringPlatform.Entities.User>();
        }
    }
}
