using Dapper;
using Dapper.Contrib.Extensions;
using Microsoft.Extensions.Options;
using REC.Data.Contracts;
using REC.Model;
using REC.Model.Filters;
using System;
using System.Collections.Generic;
using System.Linq;

namespace REC.Data
{
    /// <summary>
    /// 
    /// </summary>
    public class ChannelRepository : BaseRepository, IChannelRepository
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="config"></param>
        public ChannelRepository(IOptions<ConnOptions> config): base(config) { }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="channel"></param>
        /// <returns></returns>
        public Channel Add(Channel channel)
        {
            int id = (int)base.Context.Insert<Channel>(channel);
            channel.Id = id;
            return channel;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public Page<Channel> Get(int pindex, int psize, ChannelFilter filter)
        {
            Page<Channel> result = new Page<Channel>();
            result.PageIndex = pindex;
            result.PageSize = psize;

            string query = @"   SELECT DISTINCT [Channel].* FROM [Channel]
                                WHERE [Channel].[ChannelType] = @ChannelType OR @ChannelType IS NULL
                                ORDER BY [Channel].[Name] ASC
                                OFFSET @Psize * @Pindex ROWS FETCH NEXT @Psize ROWS ONLY;";

            string qcount = @"  SELECT COUNT([Channel].Id) FROM [Channel]
                                WHERE [Channel].[ChannelType] = @ChannelType OR @ChannelType IS NULL;";

            var count = base.Context.ExecuteScalar(qcount, new { pindex, psize, filter.ChannelType });

            result.Total = Convert.ToInt32(count);
            result.Result = this.Context.Query<Channel>(query, new { pindex, psize, filter.ChannelType });

            return result;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        public Channel Get(int Id)
        {
            return base.Context.Get<Channel>(Id);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public IEnumerable<Channel> Get()
        {
            return base.Context.GetAll<Channel>();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="channel"></param>
        /// <returns></returns>
        public Channel Update(Channel channel)
        {
            base.Context.Update(channel);
            return channel;
        }
    }
}
