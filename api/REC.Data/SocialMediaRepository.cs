using Dapper;
using Dapper.Contrib.Extensions;
using Microsoft.Extensions.Options;
using REC.Data.Contracts;
using REC.Model;
using REC.Model.Filters;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace REC.Data
{
    public class SocialMediaRepository : BaseRepository,
        ISocialMediaRepository
    {
        public SocialMediaRepository(IOptions<ConnOptions> config) : base(config) { }

        public Task<int> Add(SocialMedias payload)
        {
            return base.Context.InsertAsync(payload);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public Page<SocialMedias> Get(SocialMediaFilter filter)
        {
            Page<SocialMedias> result = new Page<SocialMedias>();
            result.PageIndex = filter.Pindex.Value;
            result.PageSize = filter.Psize.Value;

            string query = @"   SELECT [SM].* FROM [SocialMedia] AS [SM]
                                WHERE
                                       ([SM].[Name]        LIKE '%' + @Name + '%' OR @Name IS NULL)
                                AND    ([SM].[Active]      = @Active      OR @Active IS NULL)
                                AND    ([SM].[SocialMedia] = @SocialMedia OR @SocialMedia IS NULL)
                                ORDER BY [Name]                                
                                OFFSET @Psize * @Pindex ROWS FETCH NEXT @Psize ROWS ONLY;";

            string qcount = @"  SELECT COUNT([SM].Id) FROM [SocialMedia] AS [SM]
                                WHERE
                                       ([SM].[Name]        LIKE '%' + @Name + '%' OR @Name IS NULL)
                                AND    ([SM].[Active]      = @Active      OR @Active IS NULL)
                                AND    ([SM].[SocialMedia] = @SocialMedia OR @SocialMedia IS NULL)";

            var count = base.Context.ExecuteScalar(qcount, filter);

            result.Total = Convert.ToInt32(count);
            result.Result = this.Context.Query<SocialMedias>(query, filter);

            return result;
        }

        public IEnumerable<SocialMedias> Get()
        {
            return base.Context.GetAll<SocialMedias>();
        }

        public Task<SocialMedias> Get(int id)
        {
            return base.Context.GetAsync<SocialMedias>(id);
        }

        public void Remove(int id)
        {
            string command = @"UPDATE [SocialMedia] SET [Active] = 0 WHERE [Id] = @id";

            base.Context.Query(command, new { id });
        }

        public Task<bool> Update(SocialMedias payload)
        {
            return base.Context.UpdateAsync(payload);            
        }        
    }
}
