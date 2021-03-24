using REC.Model;
using System;

namespace REC.Data.Contracts
{
    public interface IVideoRepository
    {
        PaginatedResult<Video> Get(int idchannel, DateTime start);

        PaginatedResult<Video> Get(int idchannel, int id);

        PaginatedResult<Video> Get(int idchannel);
    }
}
