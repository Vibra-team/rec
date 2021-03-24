using Dapper.Contrib.Extensions;
using Microsoft.Extensions.Options;
using REC.Data.Contracts;
using REC.Model;
using System.Collections.Generic;

namespace REC.Data
{
    public class UserRepository : BaseRepository, IUserRepository
    {
        public UserRepository(IOptions<ConnOptions> config) : base(config) { }

        public User Add(User user)
        {
            var id = base.Context.Insert(user);

            return base.Context.Get<User>(id);
        }

        public IEnumerable<User> Get()
        {
            return base.Context.GetAll<User>();
        }

        public User Get(int id)
        {
            return base.Context.Get<User>(id);
        }

        public User Update(int id, User user)
        {
            user.Id = id;

            base.Context.Update(user);

            return user;
        }
    }
}
