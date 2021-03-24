using REC.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace REC.Service.Contracts
{
    public interface IUserService
    {
        User Add(User user);

        IEnumerable<User> Get();

        User Get(int id);

        User Update(int id, User user);
    }
}
