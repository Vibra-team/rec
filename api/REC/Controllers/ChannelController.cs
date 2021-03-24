using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using REC.Model;
using REC.Model.Filters;
using REC.Service.Contracts;
using System.Collections.Generic;

namespace REC.Web
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ChannelController : BaseController
    {
        private readonly IChannelService svc;

        public ChannelController(IChannelService svc, IHttpContextAccessor httpContextAccessor)
            : base(httpContextAccessor)
        {
            this.svc = svc;
        }

        [HttpGet("{pindex}/{psize}")]
        public Page<Channel> Get(int pindex, int psize, [FromQuery] ChannelFilter filter)
        {
            return this.svc.Get(pindex, psize, filter);
        }

        [HttpGet]
        public IEnumerable<Channel> Get()
        {
            return this.svc.Get();
        }

        [HttpGet("{Id}")]
        public Channel Get(int Id)
        {
            return this.svc.Get(Id);
        }

        [HttpPost]
        public Channel Post([FromBody] Channel channel)
        {
            return this.svc.Add(channel);
        }

        [HttpPut("{Id}")]
        public Channel Put([FromBody] Channel channel, int Id)
        {
            channel.Id = Id;
            return this.svc.Update(channel);
        }
    }
}
