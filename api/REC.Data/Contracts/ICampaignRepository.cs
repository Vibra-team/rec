using REC.Model;
using System.Collections.Generic;

namespace REC.Data.Contracts
{
    public interface ICampaignRepository
    {
        IEnumerable<Campaign> GetAll(int? idchannel);

        Campaign Get(int id);

        Campaign Add(Campaign campaign);

        Campaign Update(Campaign campaign);

        IEnumerable<CampaignSocialMedia> GetSocialMedia(int idcampaign);
    }
}
