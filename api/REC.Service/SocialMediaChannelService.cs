using REC.Data;
using REC.Data.Contracts;
using REC.Model;
using REC.Model.Enum;
using REC.Model.Filters;
using REC.Service.Contracts;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace REC.Service
{
    public class SocialMediaChannelService : ISocialMediaChannelService
    {
        public readonly ISocialMediaRepository repo;

        public SocialMediaChannelService(ISocialMediaRepository repo)
        {
            this.repo = repo;
        }

        public async Task<SocialMedias> Add(SocialMedias payload)
        {
            int id = await this.repo.Add(payload);
            payload.Id = id;

            return payload;
        }

        public Task<SocialMedias> Get(int id)
        {
            return this.repo.Get(id);
        }

        public Page<SocialMedias> Get(SocialMediaFilter filter)
        {
            filter.Pindex = filter.Pindex.HasValue ? filter.Pindex.Value : 0;
            filter.Psize = filter.Psize.HasValue ? filter.Psize.Value : 20;
            return repo.Get(filter);
        }

        public IEnumerable<SocialMedias> GetByMediaType(int IdMediaType)
        {
            return this.repo.Get().Where(o => o.Active == true && o.SocialMedia == (Model.Enum.SocialMedia)IdMediaType);
        }

        public void Remove(int id)
        {
            this.repo.Remove(id);
        }

        async public Task<SocialMedias> Update(int id, SocialMedias payload)
        {
            payload.Id = id;

            await this.repo.Update(payload);

            return payload;
        }
    }
}
