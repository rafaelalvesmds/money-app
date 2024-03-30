using System.Net;
using System.Net.Mail;
using WebApp.API.Interfaces;
using WebApp.API.Models;

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
            return $"http://moneyapp.com.br/login?email={email}&token={token}";

        }

        public void SendConfirmationEmail(string toAddress, string name)
        {
            string confirmationLink = GenerateConfirmationLink(toAddress);
            string subject = "Confirmação de email";

            string headerPath = "C:\\GitHub\\money-control-app\\WebApp.API\\Images\\header-email.png"; 

            string body = $@"
<html>
    <head>
        <style>
            body {{
                font-family: 'Helvetica Neue', 'Helvetica', Arial, sans-serif;
                margin: 0;
                padding: 0;
            }}

            p {{
                font-size: 16px;
                line-height: 1.5;
                color: #333;
                margin-bottom: 15px;
            }}

            a.button {{
                display: inline-block;
                font-size: 16px;
                cursor: pointer;
                text-align: center;
                text-decoration: none;
                color: #fff;
                background-color: #4CAF50;
                border: none;
                border-radius: 5px;
                box-shadow: 0 4px #999;
                padding: 10px 20px;
            }}

            a.button:hover {{
                background-color: #45a049;
            }}

            a.link {{
                color: blue;
            }}

            .container {{
                max-width: 600px;
                margin: 20px;
            }}
        </style>
    </head>
    <body>
        <div class=""container"">
            <p>Olá, {name} !</p>
            <p>Bem-vindo à nossa plataforma! Estamos muito felizes em tê-lo conosco! :)</p>
            <p>Por favor, clique no seguinte link para confirmar seu e-mail e prosseguir para o login:</p>
            <a href=""{confirmationLink}"" class=""button"">
                Confirmar Email
            </a>
            <p>Se o botão acima não funcionar, você também pode acessar o seguinte link:</p>
            <a href=""{confirmationLink}"" class=""link"">{confirmationLink}</a>
            <br>
            <p>Obrigado!</p>
        </div>
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
        static string GetImageBase64(string imagePath)
        {
            byte[] imageBytes = File.ReadAllBytes(imagePath);
            return Convert.ToBase64String(imageBytes);
        }
    }
}
