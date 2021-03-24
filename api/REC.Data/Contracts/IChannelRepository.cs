using REC.Model;
using REC.Model.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace REC.Data.Contracts
{
    /// <summary>
    /// Channel Repository Contract
    /// </summary>
    public interface IChannelRepository
    {
        /// <summary>
        /// Channel Collection
        /// </summary>
        /// <returns>Channel Collection</returns>
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
