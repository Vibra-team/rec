using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using REC.Model;
using REC.Model.Filters;
using REC.Service.Contracts;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace REC.Web
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class SocialMediaController : BaseController
    {
        private readonly ISocialMediaChannelService svc;

        public SocialMediaController(ISocialMediaChannelService svc, IHttpContextAccessor httpContextAccessor)
            : base(httpContextAccessor)
        {
            this.svc = svc;
        }

        [HttpGet("{id}")]
        public Task<SocialMedias> Get(int id)
        {
            return this.svc.Get(id);
        }

        [HttpGet]
        public Page<SocialMedias> Get([FromQuery] SocialMediaFilter filter)
        {
            return this.svc.Get(filter);
        }

        [HttpPut("{id}")]
        public Task<SocialMedias> Put(int id, [FromBody]SocialMedias payload)
        {
            return this.svc.Update(id, payload);
        }

        [HttpPost()]
        public Task<SocialMedias> Put([FromBody] SocialMedias payload)
        {
            return this.svc.Add(payload);
        }

        [HttpDelete("{id}")]
        public bool Delete(int id)
        {
            this.svc.Remove(id);

            return true;
        }



    }
}
