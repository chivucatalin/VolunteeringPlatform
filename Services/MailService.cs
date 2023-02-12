using System.Net;
using MailKit.Net.Smtp;
using MimeKit;

namespace VolunteeringPlatform.Services
{
    public class EmailMessage
    {
        public string To { get; set; }
        public string From { get; set; }
        public string Subject { get; set; }
        public string MessageText { get; set; }

        public MimeMessage GetMessage()
        {
            var body = MessageText;
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("test", From));
            message.To.Add(new MailboxAddress("test", To));
            message.Subject = Subject;
            message.Body = new TextPart("plain") { Text = body };
            return message;
        }
    }
    public class MailService : IMailService
    {
        private readonly string _mailTo = string.Empty ;
        private readonly string _mailFrom = string.Empty;
        private readonly string _mailFromPassword = string.Empty;
   

        public MailService(IConfiguration configuration)
        {
            _mailTo = configuration["mailSettings:mailToAddress"] ?? throw new ArgumentNullException(nameof(configuration));
            _mailFrom = configuration["mailSettings:mailFromAddress"] ?? throw new ArgumentNullException(nameof(configuration));
            _mailFromPassword = configuration["mailSettings:mailFromPassword"] ?? throw new ArgumentNullException(nameof(configuration));
        }

        public void Send(string _subject, string _message , string _mailTo)
        {
            var message = new EmailMessage()
            {
                From = _mailFrom,
                To = _mailTo,
                MessageText = _message,
                Subject = _subject
            };

            try
            {
                using (var client = new SmtpClient())
                {
                    client.Connect("smtp.gmail.com", 465, true);
                    client.Authenticate(message.From, _mailFromPassword);
                    client.Send(message.GetMessage());
                    client.Disconnect(true);
                }


            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }
    }
}
