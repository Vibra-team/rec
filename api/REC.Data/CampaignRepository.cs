using Dapper;
using Dapper.Contrib.Extensions;
using Microsoft.Extensions.Options;
using REC.Data.Contracts;
using REC.Model;
using System.Collections.Generic;
using System.Linq;

namespace REC.Data
{
    public class CampaignRepository : BaseRepository, ICampaignRepository
    {
        public CampaignRepository(IOptions<ConnOptions> config) : base(config) { }

        public Campaign Add(Campaign campaign)
        {
            var id = this.Context.Insert(campaign);
            campaign.Id = (int)id;
            campaign.SocialMedias.AsList().ForEach(sm => sm.IdCampaign = campaign.Id);

            this.Context.Insert(campaign.SocialMedias);

            return campaign;
        }

        public Campaign Get(int id)
        {
            var campaign = this.Context.Get<Campaign>(id);
            string query = @"SELECT CSM.*, CM.SocialMedia  FROM [CampaignSocialMedia] AS CSM
                    INNER JOIN SOCIALMEDIA AS CM ON CM.id = CSM.IdSocialMedia
                    WHERE CSM.idcampaign = @id";

            campaign.SocialMedias = this.Context
                .Query<CampaignSocialMedia>(query, new { id })
                .ToList();

            return campaign;
        }

        public IEnumerable<Campaign> GetAll(int? idchannel)
        {
            string query = @"SELECT C.* FROM [Campaign] AS C
                             WHERE  C.[IdChannel] = @idchannel OR @idchannel IS NULL;";

            return base.Context.Query<Campaign>(query, new { idchannel });
        }

        public IEnumerable<CampaignSocialMedia> GetSocialMedia(int idcampaign)
        {
            string query = "SELECT * FROM [CampaignSocialMedia] WHERE [IdCampaign] = @idcampaign";

            return base.Context.Query<CampaignSocialMedia>(query, new { idcampaign });
        }

        public Campaign Update(Campaign campaign)
        {
            campaign.CreatedAt = this.Context.Get<Campaign>(campaign.Id).CreatedAt;
            this.Context.Update(campaign);

            this.Context.Query("DELETE [CampaignSocialMedia] WHERE [idcampaign] = @idcampaign", new { idcampaign = campaign.Id });

            campaign.SocialMedias.AsList().ForEach(sm => sm.IdCampaign = campaign.Id);
            this.Context.Insert(campaign.SocialMedias);

            return campaign;
        }
    }
}
