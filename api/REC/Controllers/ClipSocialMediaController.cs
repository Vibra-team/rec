using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using REC.Model;
using REC.Service.Contracts;
using System;
using System.Collections.Generic;

namespace REC.Web.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ClipSocialMediaController : BaseController
    {
        private readonly IClipSocialMediaService _svc;

        public ClipSocialMediaController(IClipSocialMediaService svc, IHttpContextAccessor httpContextAccessor)
            : base(httpContextAccessor)
        {
            this._svc = svc;
        }

        [HttpPut("{IdClip}")]
        public IActionResult Put(int IdClip, [FromBody] IEnumerable<int> payload)
        {
            try
            {
                this._svc.Add(IdClip, payload);
                return Ok();
            }
            catch (Exception) { throw; }
        }

        [HttpGet("{IdClip}")]
        public IEnumerable<ClipSocialMedia> Get(int IdClip)
        {
            return this._svc.Get(IdClip);
        }
    }
}
