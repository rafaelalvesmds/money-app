namespace WebApp.API.Interfaces
{
    public interface IEmailService
    {
        void SendConfirmationEmail(string toAddress, string name);

    }
}
