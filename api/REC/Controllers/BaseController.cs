using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using REC.Model;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;

namespace REC.Web
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseController : ControllerBase
    {
        private IHttpContextAccessor _httpContextAccessor;

        protected User UserAD { get; set; }

        public BaseController(IHttpContextAccessor httpContextAccessor)
        {
            try
            {
                _httpContextAccessor = httpContextAccessor;
                var accessToken = _httpContextAccessor.HttpContext.Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
                var token = new JwtSecurityTokenHandler().ReadJwtToken(accessToken.ToString());
                var groupAD = "APP_REC_ADMIN";
                var uniqueName = token.Claims.First(c => c.Type == "unique_name")?.Value;
                UserAD = new User() { Name = uniqueName };
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
