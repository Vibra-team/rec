using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
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
    public class SocialMediaChannelController : BaseController
    {
        private readonly ISocialMediaChannelService svc;

        public SocialMediaChannelController(ISocialMediaChannelService svc, IHttpContextAccessor httpContextAccessor)
            : base(httpContextAccessor)
        {
            this.svc = svc;
        }

        [HttpGet("{IdMediaType}")]
        public IEnumerable<SocialMedias> Get(int IdMediaType)
        {
            return this.svc.GetByMediaType(IdMediaType);
        }        
    }
}
