using REC.Model;
using REC.Model.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace REC.Service.Contracts
{
    public interface ISocialMediaChannelService
    {
        IEnumerable<SocialMedias> GetByMediaType(int IdMediaType);

        Task<SocialMedias> Get(int id);

        Page<SocialMedias> Get(SocialMediaFilter filter);

        Task<SocialMedias> Update(int id, SocialMedias payload);

        Task<SocialMedias> Add(SocialMedias payload);

        void Remove(int id);
    }
}
