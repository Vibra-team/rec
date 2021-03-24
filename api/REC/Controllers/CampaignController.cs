using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using REC.Model;
using REC.Service.Contracts;
using System.Collections.Generic;

namespace REC.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CampaignController : BaseController
    {
        private readonly ICampaignService _svc;

        public CampaignController(ICampaignService svc, IHttpContextAccessor httpContextAccessor)
            : base(httpContextAccessor)
        {
            this._svc = svc;
        }

        [HttpGet("channel/{IdChannel?}")]
        public IEnumerable<Campaign> GetByChannel(int? IdChannel)
        {
            return this._svc.GetAll(IdChannel);
        }

        [HttpPost()]
        public Campaign Post(Campaign campaign)
        {
            campaign.Author = base.UserAD.Name;
            return this._svc.Add(campaign);
        }

        [HttpPut("{Id}")]
        public Campaign Put(int Id, [FromBody] Campaign campaign)
        {
            campaign.Id = Id;
            return this._svc.Update(campaign);
        }

        [HttpGet("{Id}")]
        public Campaign Get(int Id)
        {
            return this._svc.Get(Id);
        }
    }
}
