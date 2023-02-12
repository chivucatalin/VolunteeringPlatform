using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.Security.Cryptography;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Volunteering_Platform.Entities;
using VolunteeringPlatform.DbContexts;

namespace Volunteering_Platform.Services
{
    public class UserRepository:IUserRepository
    {
 
        private readonly int hashSize = 16;
        private readonly VolunteeringPlatformContext _context;
        private readonly IConfiguration _configuration;

        public UserRepository(VolunteeringPlatformContext context, IConfiguration configuration)
        {
            _configuration= configuration ?? throw new ArgumentNullException(nameof(configuration));
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public string GenerateJWT(string username,bool admin,string email)
        {
            var claimsForToken = new List<Claim>
            {
                new Claim("username", username),
                new Claim("email", email),
                new Claim("admin", admin.ToString())
            };

            var jwtSecurityToken = new JwtSecurityToken(
                _configuration["Authentication:Issuer"],
                _configuration["Authentication:Audience"],
                claimsForToken,
                DateTime.UtcNow,
                DateTime.UtcNow.AddHours(1));

            var tokenToReturn = new JwtSecurityTokenHandler()
               .WriteToken(jwtSecurityToken);

            return tokenToReturn;
        }

        public async Task<User?> GetUserAsync(string username,string password)
        {
            return await _context.Users.Where(c => c.Username==username && c.Password==HashPassword(username,password)).FirstOrDefaultAsync();
        }

        public async Task<bool> UsernameExist(string username)
        {
            if (await _context.Users.Where(c => c.Username == username).FirstOrDefaultAsync() == default)
                return false;

            return true;
        }

        public async Task<bool> EmailExist(string email)
        {
            if (await _context.Users.Where(c => c.Email == email).FirstOrDefaultAsync() == default)
                return false;

            return true;
        }



        public async Task AddUserAsync(User newUser)
        {
            await _context.Users.AddAsync(newUser);
        }

        public void DeleteUser(User userEntity)
        {
            _context.Users.Remove(userEntity);
        }

        public byte[] GenerateSalt(string username)
        {
            return Encoding.ASCII.GetBytes(username);
        }
        public string HashPassword(string username,string inputId )
        {
            // Generate a random salt.
            var salt = GenerateSalt(username);
         

            // Generate a salted hash with pepper.
            Rfc2898DeriveBytes pbkdf2 = new(inputId + _configuration["hashPassword:pepper"], salt
                , Int32.Parse(_configuration["hashPassword:iterations"]));
            return Encoding.Default.GetString(pbkdf2.GetBytes(hashSize));
        }
        public async Task<bool> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync() >= 0;
        }


    }
}
