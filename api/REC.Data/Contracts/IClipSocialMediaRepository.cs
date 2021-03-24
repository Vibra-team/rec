using REC.Model;
using System.Collections.Generic;

namespace REC.Data.Contracts
{
    public interface IClipSocialMediaRepository
    {
        void Add(IEnumerable<ClipSocialMedia> medias);

        IEnumerable<ClipSocialMedia> Get(int IdClip);
    }
}
