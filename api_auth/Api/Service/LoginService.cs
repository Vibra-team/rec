using Api.Domain;
using Api.Models;

namespace Api.Service
{
    public class LoginService : ILoginService
    {
        public Usuario Autentica(Credencial credencial)
        {
            if (credencial.Username == "thiago" && credencial.Password == "102030")
            {
                return new Usuario
                {
                    Nome = "Thiago S Adriano",
                    Role = "Admin"
                };
            }

            return null;


        }

    }
}
