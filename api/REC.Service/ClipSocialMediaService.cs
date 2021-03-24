using REC.Data.Contracts;
using REC.Model;
using REC.Service.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace REC.Service
{
    public class ClipSocialMediaService : IClipSocialMediaService
    {
        private readonly IClipSocialMediaRepository _repo;

        public ClipSocialMediaService(IClipSocialMediaRepository repo)
        {
            this._repo = repo;
        }

        public void Add(IEnumerable<ClipSocialMedia> socialmedias)
        {
            _repo.Add(socialmedias);
        }

        public void Add(int clipid, IEnumerable<int> socialmedias)
        {
            List<ClipSocialMedia> smedias = new List<ClipSocialMedia>();

            foreach (var item in socialmedias)
            {
                smedias.Add(new ClipSocialMedia()
                {
                    IdClip = clipid,
                    IdSocialMedia = item
                });
            }

            _repo.Add(smedias);
        }

        public IEnumerable<ClipSocialMedia> Get(int IdClip)
        {
            return this._repo.Get(IdClip);
        }
    }
}
