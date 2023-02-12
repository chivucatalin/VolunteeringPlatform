using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using Volunteering_Platform.Services;
using VolunteeringPlatform.Models;
using VolunteeringPlatform.Services;
using System.Text.Json;

namespace VolunteeringPlatform.Controllers
{
    [ApiController]
    [Route("{controller}")]
    public class UsersController : ControllerBase
    {

        private readonly IMapper _mapper;
        private readonly IUserRepository _repository;
        private readonly IMailService _mailService;
        public UsersController(IMapper mapper, IUserRepository repository , IMailService mailService)
        {
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
            _mailService = mailService ?? throw new ArgumentNullException(nameof(mailService));
        }

        [HttpGet("{username}/{password}", Name = "GetUser")]
        public async Task<IActionResult> GetUser(string username,string password)
        {
            var userEntity = await _repository.GetUserAsync(username,password);
            if (userEntity == null) return NotFound();

            var jwt = _repository.GenerateJWT(userEntity.Username, userEntity.isAdmin, userEntity.Email);

            Response.Headers.Add("JWT-Token",
               JsonSerializer.Serialize(jwt));

            return Ok(_mapper.Map<UserDto>(userEntity));
        }

        [HttpHead("{email}")]

        public IActionResult SendVerificationCode(string email)
        {
            Random random = new Random();
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            string code = new string(Enumerable.Repeat(chars, 8)
              .Select(s => s[random.Next(s.Length)]).ToArray());

            _mailService.Send("Account Create Verification Code",
                "Please write this code in order to verify your e-mail : "+code, "chivu.catalin@yahoo.com");

            Response.Headers.Add("Verification-Code",
               code);

            return Ok();
        }

        [HttpPost]
        public async Task<ActionResult<UserDto>> CreateUser(
            UserForCreationDto newUser)
        {
            var usernameExist = _repository.UsernameExist(newUser.Username);
            var emailExist = _repository.EmailExist(newUser.Email);

            if (await usernameExist || await emailExist)
            {
                return Conflict();
            }
            newUser.Password = _repository.HashPassword(newUser.Username, newUser.Password);
            var userEntity = _mapper.Map<Volunteering_Platform.Entities.User>(newUser);
            await _repository.AddUserAsync(userEntity);
            await _repository.SaveChangesAsync();
            var createdUserToReturn =
               _mapper.Map<Models.UserDto>(userEntity);

            //aici plange
            return CreatedAtRoute("GetUser",
            new
            {
                username=createdUserToReturn.Username,
                password=createdUserToReturn.Password,
            },
                 createdUserToReturn);
        }

        [HttpDelete("{username}/{password}")]
        public async Task<ActionResult> DeleteUser(
            string username,string password)
        {
            var userEntity = await _repository.GetUserAsync(username,password);
            if (userEntity == null)
            {
                return NotFound();
            }

            _repository.DeleteUser(userEntity);

            await _repository.SaveChangesAsync();

            return NoContent();
        }
    }
}
