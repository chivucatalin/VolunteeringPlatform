namespace VolunteeringPlatform.Services
{
    public interface IMailService
    {
        //Creeam o clasa cu services pe care o injectez in controller care se ocupa de a trimite mails
        void Send(string subject, string message,string mailTo);
    }
}