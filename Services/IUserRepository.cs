using System.Threading.Tasks;
using Volunteering_Platform.Entities;

using VolunteeringPlatform.Services;

namespace Volunteering_Platform.Services
{
    public interface IUserRepository
    {
        Task<User?> GetUserAsync(string username,string password);
        Task AddUserAsync(User newUser);
        Task<bool> UsernameExist(string username);

        Task<bool> EmailExist(string email);
        void DeleteUser(User user);
        Task<bool> SaveChangesAsync();

        string HashPassword(string username,string password);
        byte[] GenerateSalt(string username);

        string GenerateJWT(string username,bool admin,string email);
    }
}
