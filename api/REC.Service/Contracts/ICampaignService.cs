using REC.Model;
using System.Collections.Generic;

namespace REC.Service.Contracts
{
    public interface ICampaignService
    {
        IEnumerable<Campaign> GetAll(int? idchannel);

        Campaign Get(int id);

        Campaign Add(Campaign campaign);

        Campaign Update(Campaign campaign);
    }
}
