using Api.Domain;
using Api.Infra.Security;
using Api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text.Json;

namespace Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BaseController : ControllerBase
    {
        private IHttpContextAccessor _httpContextAccessor;

        public string CorrelationId { get; set; }
        public Usuario Usuario = new Usuario();

        public BaseController(IHttpContextAccessor httpContextAccessor)
        {
            try
            {
                _httpContextAccessor = httpContextAccessor;
                var accessToken = _httpContextAccessor.HttpContext.Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
                var token = new JwtSecurityTokenHandler().ReadJwtToken(accessToken.ToString());
                Usuario.Nome = token.Claims.First(c => c.Type == "unique_name")?.Value;
                Usuario.Role = token.Claims.First(c => c.Type == "role")?.Value;
                CorrelationId = _httpContextAccessor.HttpContext.Request.Headers["CorrelationId"].ToString();
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }


    }
}
