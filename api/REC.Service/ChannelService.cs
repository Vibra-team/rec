using REC.Data.Contracts;
using REC.Model;
using REC.Model.Filters;
using REC.Service.Contracts;
using System.Collections.Generic;

namespace REC.Service
{
    /// <summary>
    /// 
    /// </summary>
    public class ChannelService : IChannelService
    {
        public readonly IChannelRepository repo;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="repo"></param>
        public ChannelService(IChannelRepository repo)
        {
            this.repo = repo;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="channel"></param>
        /// <returns></returns>
        public Channel Add(Channel channel)
        {
            return this.repo.Add(channel);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="IdMediaType"></param>
        /// <returns></returns>
        public Page<Channel> Get(int pindex, int psize, ChannelFilter filter)
        {
            return this.repo.Get(pindex, psize, filter);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        public Channel Get(int Id)
        {
            return this.repo.Get(Id);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public IEnumerable<Channel> Get()
        {
            return this.repo.Get();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="channel"></param>
        /// <returns></returns>
        public Channel Update(Channel channel)
        {
            return this.repo.Update(channel);
        }
    }
}
