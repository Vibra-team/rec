using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;

namespace REC.Web
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatusController : ControllerBase
    {
        public StatusController()
        {
        }

        [HttpGet]
        public DateTime Get()
        {
            return DateTime.Now;
        }
    }
}
