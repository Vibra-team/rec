using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using REC.Data;
using REC.Model;
using REC.Model.Filters;
using REC.Service.Contracts;
using System;
using System.IO;
using System.Threading.Tasks;

namespace REC.Web
{
    [DisableRequestSizeLimit]
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ClipController : BaseController
    {
        private readonly IClipService svc;
        private readonly ConnOptions _options;

        public ClipController(IOptions<ConnOptions> config, IClipService svc, IHttpContextAccessor httpContextAccessor)
            : base(httpContextAccessor)
        {
            this.svc = svc;
            this._options = config.Value;
        }

        [HttpPost]
        public Clip Post(Clip clip)
        {
            try
            {
                return this.svc.Add(clip, base.UserAD.Name);
            }
            catch (Exception) { throw; }
        }

        [HttpGet("{pindex}/{psize}")]
        public Page<Clip> Get(int psize, int pindex, [FromQuery] ClipFilter filter)
        {
            return this.svc.Get(pindex, psize, filter);
        }

        [HttpGet("{id}")]
        public Clip Get(int id)
        {
            return this.svc.Get(id);
        }

        [HttpGet("download/{idclip}")]
        public object Download(int idclip)
        {
            string url = this.svc.Download(idclip);

            return new { url };
        }

        [HttpPost("upload/{clipid}")]
        public async Task<IActionResult> Upload(int clipid, IFormFile file)
        {            
            if (file.Length > 0)
            {
                try
                {
                    string path = Path.Combine(this._options.UploadDirectory, $"{clipid}.mp4");
                    using (FileStream filestream = System.IO.File.Create(path))
                    {
                        await file.CopyToAsync(filestream);
                        filestream.Flush();                        
                        this.svc.UpdateStatus(clipid, 2);
                        return Ok();
                    }
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
            else
            {
                throw new Exception("Invalid or empty file.");
            }
        }
    }
}
