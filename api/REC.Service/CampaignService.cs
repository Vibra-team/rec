using REC.Data.Contracts;
using REC.Model;
using REC.Service.Contracts;
using System;
using System.Collections.Generic;

namespace REC.Service
{
    public class CampaignService : ICampaignService
    {
        public readonly ICampaignRepository _repository;

        public CampaignService(ICampaignRepository repository)
        {
            this._repository = repository;
        }

        public Campaign Add(Campaign campaign)
        {
            campaign.CreatedAt = DateTime.Now;
            return this._repository.Add(campaign);
        }

        public Campaign Get(int id)
        {
            return this._repository.Get(id);
        }

        public IEnumerable<Campaign> GetAll(int? idchannel)
        {
            return this._repository.GetAll(idchannel);
        }

        public Campaign Update(Campaign campaign)
        {
            return this._repository.Update(campaign);
        }
    }
}
