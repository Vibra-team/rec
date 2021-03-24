using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using REC.Model;
using REC.Service.Contracts;
using System.Collections.Generic;

namespace REC.Web
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : BaseController
    {
        private readonly IUserService svc;

        public UserController(IUserService svc, IHttpContextAccessor httpContextAccessor)
            : base(httpContextAccessor)
        {
            this.svc = svc;
        }

        [HttpGet("{id}")]
        public User Get(int id)
        {
            return this.svc.Get(id);
        }

        [HttpGet]
        public IEnumerable<User> Get()
        {
            return this.svc.Get();
        }

        [HttpPost]
        public User Get([FromBody] User user)
        {
            return this.svc.Add(user);
        }

        [HttpPut]
        public User Put(int id, [FromBody] User user)
        {
            return this.svc.Update(id, user);
        }
    }
}
