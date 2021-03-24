using REC.Model;
using System.Collections.Generic;

namespace REC.Data.Contracts
{
    public interface IUserRepository
    {
        User Add(User user);

        IEnumerable<User> Get();

        User Get(int id);

        User Update(int id, User user);
    }
}
