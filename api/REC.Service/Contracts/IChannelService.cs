using REC.Model;
using REC.Model.Filters;
using System.Collections.Generic;

namespace REC.Service.Contracts
{
    /// <summary>
    /// 
    /// </summary>
    public interface IChannelService
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="pindex"></param>
        /// <param name="psize"></param>
        /// <returns></returns>
        Page<Channel> Get(int pindex, int psize, ChannelFilter filter);

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        IEnumerable<Channel> Get();

        /// <summary>
        /// Channel Details
        /// </summary>
        /// <param name="Id">Channel identification</param>
        /// <returns>Channel</returns>
        Channel Get(int Id);

        /// <summary>
        /// Persists a channel
        /// </summary>
        /// <param name="channel">Channel details</param>
        /// <returns>Data persisted</returns>
        Channel Add(Channel channel);

        /// <summary>
        /// Update a channel
        /// </summary>
        /// <param name="channel">Channel details</param>
        /// <returns>Data persisted</returns>
        Channel Update(Channel channel);
    }
}
