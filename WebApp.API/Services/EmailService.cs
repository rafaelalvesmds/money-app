using System.Net;
using System.Net.Mail;
using WebApp.API.Interfaces;
using WebApp.API.Models;
using WebApp.API.Repository.DataBase;

namespace WebApp.API.Services
{
    public class EmailService : IEmailService
    {
        private readonly EmailSettings emailSettings;
        private readonly ITokenService _tokenService;


        public EmailService(IConfiguration configuration, ITokenService tokenService)
        {
            emailSettings = configuration.GetSection("EmailSettings").Get<EmailSettings>();
            _tokenService = tokenService;
        }

        public string GenerateConfirmationLink(string email) 
        {
            string token = _tokenService.GenerateJwtToken(email);
            return $"http://localhost:4200/login?email={email}&token={token}";

        }

        public void SendConfirmationEmail(string toAddress, string name)
        {
            string confirmationLink = GenerateConfirmationLink(toAddress);
            string subject = "Register Confirmation";
            string body = $@"
            <html>
                <body>
                    <p>Dear {name},</p>
                    <p>Welcome to our platform! We are delighted to have you with us.</p>
                    <p>Please click the following link to confirm your email and proceed to login:</p>
                    <a href=""{confirmationLink}""><button>Confirm Email</button></a>
                    <p>If the button above doesn't work, you can also copy and paste the following link into your browser:</p>
                    <p>{confirmationLink}</p>
                    <p>Thank you!</p>
                </body>
            </html>";

            using (SmtpClient client = new SmtpClient(emailSettings.SmtpServer, emailSettings.SmtpPort))
            {
                client.UseDefaultCredentials = false;
                client.Credentials = new NetworkCredential(emailSettings.SmtpUsername, emailSettings.SmtpPassword);
                client.EnableSsl = true;

                MailMessage mailMessage = new MailMessage();
                mailMessage.From = new MailAddress(emailSettings.SenderEmail, emailSettings.SenderName);
                mailMessage.To.Add(toAddress);
                mailMessage.Subject = subject;
                mailMessage.Body = body;
                mailMessage.IsBodyHtml = true;

                try
                {
                    client.Send(mailMessage);
                    Console.WriteLine("Email sent successfully!");
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error sending email: {ex.Message}");
                }
            }
        }
    }
}
