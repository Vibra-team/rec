using REC.Model;
using System;

namespace REC.Service.Contracts
{
    public interface IVideoService
    {
        PaginatedResult<Video> Get(int idchannel, DateTime start);

        PaginatedResult<Video> Get(int idchannel, int id);

        PaginatedResult<Video> Get(int idchannel);
    }
}
