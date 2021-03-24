using REC.Model;
using System.Collections.Generic;

namespace REC.Service.Contracts
{
    public interface IClipSocialMediaService
    {
        void Add(IEnumerable<ClipSocialMedia> socialmedias);

        void Add(int clipid, IEnumerable<int> socialmediasids);

        IEnumerable<ClipSocialMedia> Get(int IdClip);
    }
}
