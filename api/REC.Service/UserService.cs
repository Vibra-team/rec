using REC.Data.Contracts;
using REC.Model;
using REC.Service.Contracts;
using System.Collections.Generic;

namespace REC.Service
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _repository;

        public UserService(IUserRepository repository)
        {
            this._repository = repository;
        }

        public User Add(User user)
        {
            return this._repository.Add(user);
        }

        public IEnumerable<User> Get()
        {
            return this._repository.Get();
        }

        public User Get(int id)
        {
            return this._repository.Get(id);
        }

        public User Update(int id, User user)
        {
            return this._repository.Update(id, user);
        }
    }
}
