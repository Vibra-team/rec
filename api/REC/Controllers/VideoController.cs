using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using REC.Model;
using REC.Service.Contracts;
using System;

namespace REC.Web
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class VideoController : BaseController
    {
        private readonly IVideoService svc;

        public VideoController(IVideoService svc, IHttpContextAccessor httpContextAccessor)
            : base(httpContextAccessor)
        {
            this.svc = svc;
        }

        [HttpGet("{idchannel}/{start}")]
        public PaginatedResult<Video> Get(int idchannel, DateTime start)
        {
            return this.svc.Get(idchannel, start);
        }

        [HttpGet("{idchannel}")]
        public PaginatedResult<Video> Get(int idchannel)
        {
            return this.svc.Get(idchannel);
        }

        [HttpGet("{idchannel}/detail/{id}")]
        public PaginatedResult<Video> Get(int idchannel, int id)
        {
            return this.svc.Get(idchannel, id);
        }
    }
}
