using REC.Data;
using REC.Data.Contracts;
using REC.Model;
using REC.Model.Filters;
using REC.Service.Contracts;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace REC.Service
{
    public class ClipService : IClipService
    {
        private readonly IClipRepository _clipRepository;
        private readonly ICutRepository _cutRepository;
        private readonly ICampaignRepository _campaignRepository;

        public ClipService(IClipRepository clipRepository, ICutRepository cutRepository,
            ICampaignRepository campaignRepository)
        {
            this._clipRepository = clipRepository;
            this._cutRepository = cutRepository;
            this._campaignRepository = campaignRepository;
        }

        public Clip Add(Clip clip, string author)
        {
            if (clip.IdCampaign.HasValue)
            {
                var temp = new List<ClipSocialMedia>();

                var sm = this._campaignRepository.GetSocialMedia(clip.IdCampaign.Value);
                sm.ToList().ForEach(s => temp
                    .Add(new ClipSocialMedia() { IdSocialMedia = s.IdSocialMedia }));

                clip.SocialMedias = temp;
            }

            if (clip.Cuts != null && clip.Cuts.Count() > 0)
            {
                clip.Cuts
                    .ToList()
                    .ForEach(o => clip.Length += (decimal)(o.Finish - o.Start));
            }

            clip.CreatedAt = DateTime.Now;
            clip.Status = 1;
            clip.Author = author;
            clip = this._clipRepository.Add(clip);

            if (clip.Cuts != null)
            {
                clip.Cuts.ToList().ForEach(c => { c.IdClip = clip.Id; });
                this._cutRepository.Add(clip.Cuts);
            }

            return clip;
        }

        public string Download(int idclip)
        {
            return this._clipRepository.Download(idclip);
        }

        public Clip Get(int id)
        {
            return this._clipRepository.Get(id);
        }

        public Page<Clip> Get(int pindex, int psize, ClipFilter filter)
        {
            filter.Psize = psize;
            filter.Pindex = pindex - 1;

            int STATUS_PROCESSED = 2;

            var clips = this._clipRepository.Get(pindex, psize, filter);

            foreach (var item in clips.Result)
            {
                if (item.Status == STATUS_PROCESSED)
                {
                    if (item.SocialMedias.Any(sm => sm.Status != STATUS_PROCESSED))
                    {
                        item.Status = 3;
                    }
                }
            }

            return clips;
        }

        public string Upload(int idclip)
        {
            throw new NotImplementedException();
        }

        public void UpdateStatus(int idclip, int idstatus)
        {
            this._clipRepository.UpdateStatus(idclip, idstatus);
        }
    }
}
