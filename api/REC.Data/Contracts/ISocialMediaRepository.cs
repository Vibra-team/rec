using REC.Model;
using REC.Model.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace REC.Data.Contracts
{
    public interface ISocialMediaRepository
    {
        Page<SocialMedias> Get(SocialMediaFilter filter);        

        IEnumerable<SocialMedias> Get();

        Task<SocialMedias> Get(int id);

        Task<bool> Update(SocialMedias payload);

        Task<int> Add(SocialMedias payload);

        void Remove(int id);
    }
}
