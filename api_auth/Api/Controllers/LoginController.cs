using Api.Domain;
using Api.Infra.Security;
using Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Text.Json;

namespace Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly ILogger<LoginController> _logger;

        public LoginController(IConfiguration config, ILogger<LoginController> logger)
        {
            _config = config;
            _logger = logger;
        }
        [HttpPost]
        public IActionResult Post(
            [FromBody] Credencial credenciais,
            [FromServices] ILoginService loginService)
        {
            try
            {
                var validarUsuario = loginService.Autentica(credenciais);

                if (validarUsuario == null)
                    return NoContent();

                var correlationId = Guid.NewGuid();
                _logger.LogInformation($"{correlationId} Usuario logado:  {JsonSerializer.Serialize(validarUsuario)}");

                return Ok(new
                {
                    token = JwtToken.GenerateToken(validarUsuario, _config),
                    usuario = validarUsuario,
                    correlationId = correlationId
                }); ;
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

    }
}
