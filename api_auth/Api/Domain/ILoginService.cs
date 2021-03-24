using Api.Models;

namespace Api.Domain
{
    public interface ILoginService
    {
        Usuario Autentica(Credencial credencial);
    }
}
